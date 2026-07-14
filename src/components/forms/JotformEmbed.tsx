import { useEffect, useId, useState } from "react";

const RESERVED_HEIGHT_PX = 720;

function isJotformOrigin(origin: string): boolean {
  try {
    const host = new URL(origin).hostname;
    return host === "jotform.com" || host.endsWith(".jotform.com") || host.endsWith(".jotfor.ms");
  } catch {
    return false;
  }
}

interface JotformEmbedProps {
  src: string;
  title: string;
  className?: string;
  /** Reserved height before Jotform reports its size (reduces CLS). */
  reservedHeight?: number;
}

/**
 * Full-height Jotform iframe — listens for Jotform resize messages so the form
 * is not clipped. Shows a branded skeleton until the frame loads.
 */
export function JotformEmbed({
  src,
  title,
  className = "",
  reservedHeight = RESERVED_HEIGHT_PX,
}: JotformEmbedProps) {
  const reactId = useId().replace(/:/g, "");
  const iframeId = `JotFormIFrame-${reactId}`;
  const [height, setHeight] = useState<number | null>(null);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin === "string" && event.origin !== "null" && !isJotformOrigin(event.origin)) {
        return;
      }

      let nextHeight: number | null = null;

      if (typeof event.data === "string") {
        const args = event.data.split(":");
        if (args[0] === "setHeight" && args[1]) {
          const parsed = Number.parseInt(args[1], 10);
          if (!Number.isNaN(parsed) && parsed > 80) nextHeight = parsed;
        }
      } else if (event.data && typeof event.data === "object") {
        const data = event.data as { action?: string; height?: number | string };
        if (data.action === "setHeight" || data.height != null) {
          const parsed = typeof data.height === "number" ? data.height : Number.parseInt(String(data.height), 10);
          if (!Number.isNaN(parsed) && parsed > 80) nextHeight = parsed;
        }
      }

      if (nextHeight != null) {
        setHeight((prev) => (prev === nextHeight ? prev : nextHeight));
        setFrameReady(true);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const displayHeight = height ?? reservedHeight;

  return (
    <div className={`relative w-full ${className}`.trim()} style={{ minHeight: displayHeight }}>
      {!frameReady ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-xl border border-border/40 bg-card/90"
          aria-hidden
        >
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-muted/80 via-background/40 to-muted/60" />
          <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <div className="h-10 w-48 rounded-lg bg-muted" />
            <div className="h-3 w-64 max-w-full rounded bg-muted/80" />
            <div className="mt-4 h-11 w-full max-w-md rounded-xl bg-muted/70" />
            <div className="h-11 w-full max-w-md rounded-xl bg-muted/70" />
            <div className="h-11 w-full max-w-md rounded-xl bg-muted/70" />
            <p className="mt-6 text-sm font-medium text-muted-foreground">Loading form…</p>
          </div>
        </div>
      ) : null}
      <iframe
        id={iframeId}
        title={title}
        src={src}
        className="relative z-0 block w-full max-w-full border-0 bg-transparent"
        style={{
          width: "100%",
          height: displayHeight,
          minHeight: reservedHeight,
          opacity: frameReady ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
        scrolling="no"
        allow="geolocation; microphone; camera; fullscreen"
        onLoad={() => setFrameReady(true)}
      />
    </div>
  );
}

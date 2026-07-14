import { useEffect, useId, useState } from "react";

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
}

/**
 * Full-height Jotform iframe — listens for Jotform resize messages so the form
 * is not clipped by a fixed container height.
 */
export function JotformEmbed({ src, title, className = "" }: JotformEmbedProps) {
  const reactId = useId().replace(/:/g, "");
  const iframeId = `JotFormIFrame-${reactId}`;
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin === "string" && event.origin !== "null" && !isJotformOrigin(event.origin)) {
        return;
      }

      let nextHeight: number | null = null;

      if (typeof event.data === "string") {
        // Classic Jotform: "setHeight:1234" or "setHeight:1234:formId"
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
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      id={iframeId}
      title={title}
      src={src}
      className={`block w-full max-w-full border-0 bg-transparent ${className}`.trim()}
      style={{
        width: "100%",
        minHeight: height ? undefined : 480,
        height: height ?? undefined,
      }}
      scrolling="no"
      loading="lazy"
      allow="geolocation; microphone; camera; fullscreen"
    />
  );
}

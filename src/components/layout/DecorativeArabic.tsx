import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import arabicUrl from "@/assets/arabic.svg";

interface DecorativeArabicProps {
  className?: string;
  /** 0–1; keep low for ambient backgrounds */
  opacity?: number;
  /** `ambient` spans full viewport width; `bandLeft` for navy CTA bands */
  variant?: "ambient" | "bandLeft" | "full" | "corner";
  /** blue | red | neutral tint on light backgrounds */
  tint?: "blue" | "red" | "neutral";
}

const tintFilter: Record<NonNullable<DecorativeArabicProps["tint"]>, string> = {
  blue: "opacity-[var(--arabic-opacity)] [filter:brightness(0)_saturate(100%)_invert(8%)_sepia(90%)_saturate(1200%)_hue-rotate(198deg)_brightness(95%)_contrast(95%)]",
  red: "opacity-[var(--arabic-opacity)] [filter:brightness(0)_saturate(100%)_invert(12%)_sepia(85%)_saturate(2500%)_hue-rotate(318deg)_brightness(90%)_contrast(92%)]",
  neutral:
    "opacity-[var(--arabic-opacity)] [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(8%)_saturate(400%)_hue-rotate(182deg)_brightness(95%)_contrast(88%)]",
};

/** Full-width calligraphy watermark — subtle, tinted, edge-faded. */
export function DecorativeArabic({
  className,
  opacity = 0.028,
  variant = "ambient",
  tint = "neutral",
}: DecorativeArabicProps) {
  const style = { "--arabic-opacity": String(opacity) } as CSSProperties;
  const resolved = variant === "full" || variant === "corner" ? "ambient" : variant;

  if (resolved === "bandLeft") {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-none select-none", className)}
        style={style}
      >
        <div className="arabic-calligraphy-fade arabic-calligraphy-fade--band absolute inset-0">
          <img
            src={arabicUrl}
            alt=""
            className={cn(
              "absolute left-[-5%] top-1/2 w-[min(110vw,1400px)] max-w-none -translate-y-1/2 object-contain mix-blend-soft-light",
              tintFilter.neutral,
            )}
            style={{ opacity }}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 z-[0] w-[100vw] max-w-[100vw] -translate-x-1/2 select-none",
        className,
      )}
      style={style}
    >
      <div className="arabic-calligraphy-fade relative h-full w-full">
        <img
          src={arabicUrl}
          alt=""
          className={cn(
            "mx-auto block w-[min(118vw,1600px)] max-w-none object-contain",
            tintFilter[tint],
          )}
          loading="lazy"
        />
      </div>
    </div>
  );
}

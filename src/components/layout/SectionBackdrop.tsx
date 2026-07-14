import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { cn } from "@/lib/utils";

type DepthVariant = "hero" | "programs" | "about" | "teachers" | "testimonials" | "why";

interface SectionBackdropProps {
  depth: DepthVariant;
  /** Show full-viewport calligraphy watermark */
  arabic?: boolean;
  arabicTint?: "blue" | "red" | "neutral";
  arabicOpacity?: number;
  className?: string;
}

/** Layered radials + optional calligraphy for homepage sections. */
export function SectionBackdrop({
  depth,
  arabic = false,
  arabicTint = "neutral",
  arabicOpacity = 0.03,
  className,
}: SectionBackdropProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0 section-depth", `section-depth--${depth}`)} />
      {arabic && (
        <DecorativeArabic
          variant="ambient"
          tint={arabicTint}
          opacity={arabicOpacity}
          className="top-1/2 h-[min(80vh,720px)] -translate-y-1/2"
        />
      )}
    </div>
  );
}

import { memo } from "react";
import { cn } from "@/lib/utils";
import {
  programCardFallbackIndex,
  resolveProgramCardFallback,
  resolveProgramCardImage,
  resolveProgramCardSrcSet,
} from "@/lib/programCardImage";

type ProgramCardImageProps = {
  program: {
    mainImage?: { asset?: unknown; alt?: string } | unknown;
    slug?: string;
    _id?: string;
    title?: string;
  };
  className?: string;
  size?: "compact" | "listing";
};

/** CMS mainImage (preferred) or optimized local WebP fallback. */
function ProgramCardImageComponent({ program, className, size = "compact" }: ProgramCardImageProps) {
  const width = size === "listing" ? 700 : 640;
  const height = size === "listing" ? 438 : 400;
  const ratio = height / width;
  const fallbackIndex = programCardFallbackIndex(program);
  const localFallback = resolveProgramCardFallback(program, fallbackIndex);
  const hasCms = !!(
    program.mainImage &&
    typeof program.mainImage === "object" &&
    "asset" in program.mainImage &&
    (program.mainImage as { asset?: unknown }).asset
  );

  const src = resolveProgramCardImage(program, fallbackIndex, width, height);
  const srcSet =
    resolveProgramCardSrcSet(
      program,
      size === "listing" ? [400, 700, 1200] : [400, 700],
      (w) => Math.round(w * ratio),
      fallbackIndex,
    ) ?? localFallback.srcSet;

  const alt =
    (program.mainImage &&
      typeof program.mainImage === "object" &&
      "alt" in program.mainImage &&
      typeof (program.mainImage as { alt?: string }).alt === "string" &&
      (program.mainImage as { alt?: string }).alt) ||
    program.title ||
    "";

  const intrinsicW = hasCms ? width : localFallback.width;
  const intrinsicH = hasCms ? height : localFallback.height;

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={
          size === "listing"
            ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, min(28rem, 46vw)"
            : "(max-width: 640px) 86vw, 340px"
        }
        alt={alt}
        loading="lazy"
        decoding="async"
        width={intrinsicW}
        height={intrinsicH}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}

export const ProgramCardImage = memo(ProgramCardImageComponent);

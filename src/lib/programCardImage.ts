import { urlForSized, sanitySrcSet } from "@/lib/sanity";
import { programCardPhotos, type LocalPhoto } from "@/lib/siteAssets";

type ProgramImageSource = {
  mainImage?: unknown;
  slug?: string;
  _id?: string;
};

function isSanityImage(img: unknown): img is { asset: unknown } {
  return !!img && typeof img === "object" && "asset" in img && !!(img as { asset?: unknown }).asset;
}

function fallbackPhoto(fallbackIndex = 0): LocalPhoto {
  const len = programCardPhotos.length;
  return programCardPhotos[Math.abs(fallbackIndex) % len];
}

/**
 * Resolves a program card image URL: Sanity `mainImage` when set, otherwise a
 * stable optimized local fallback from `/src/assets/images`.
 */
export function resolveProgramCardImage(
  prog: ProgramImageSource,
  fallbackIndex = 0,
  width = 640,
  height = 400,
): string {
  const img = prog.mainImage;
  if (isSanityImage(img)) {
    return urlForSized(img as never, width, height);
  }
  return fallbackPhoto(fallbackIndex).src;
}

/** Srcset for CMS images or local WebP fallbacks. */
export function resolveProgramCardSrcSet(
  prog: ProgramImageSource,
  widths: number[],
  aspectHeight: (w: number) => number,
  fallbackIndex = 0,
): string | undefined {
  const img = prog.mainImage;
  if (isSanityImage(img)) {
    return sanitySrcSet(img as never, widths, aspectHeight);
  }
  return fallbackPhoto(fallbackIndex).srcSet;
}

export function resolveProgramCardFallback(prog: ProgramImageSource, fallbackIndex = 0): LocalPhoto {
  return fallbackPhoto(fallbackIndex);
}

/** Stable index from program id/slug so fallbacks don't reshuffle across re-renders. */
export function programCardFallbackIndex(prog: ProgramImageSource): number {
  const key = prog.slug || prog._id || "";
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

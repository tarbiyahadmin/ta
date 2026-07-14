import { urlForSized, sanitySrcSet } from "@/lib/sanity";
import { programCardPhotos } from "@/lib/siteAssets";

type ProgramImageSource = {
  mainImage?: unknown;
  slug?: string;
  _id?: string;
};

function isSanityImage(img: unknown): img is { asset: unknown } {
  return !!img && typeof img === "object" && "asset" in img && !!(img as { asset?: unknown }).asset;
}

/**
 * Resolves a program card image URL: Sanity `mainImage` when set, otherwise a
 * stable fallback from `/src/assets/mqi-images`.
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
  const len = programCardPhotos.length;
  const index = Math.abs(fallbackIndex) % len;
  return programCardPhotos[index];
}

/** Optional srcset when CMS image is present (empty string for local fallbacks). */
export function resolveProgramCardSrcSet(
  prog: ProgramImageSource,
  widths: number[],
  aspectHeight: (w: number) => number,
): string | undefined {
  const img = prog.mainImage;
  if (!isSanityImage(img)) return undefined;
  return sanitySrcSet(img as never, widths, aspectHeight);
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

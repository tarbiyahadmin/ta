/** Local optimized photo with responsive variants. */
export type LocalPhoto = {
  /** Default src (usually medium/hero width). */
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

export type LocalPhotoVariants = {
  w400: string;
  w700: string;
  w1200: string;
  w1800: string;
  /** Intrinsic height at the reference width (usually 1800). */
  heightAt1800: number;
};

export function makeLocalPhoto(
  variants: LocalPhotoVariants,
  defaultWidth: 400 | 700 | 1200 | 1800 = 1200,
): LocalPhoto {
  const map: Record<number, string> = {
    400: variants.w400,
    700: variants.w700,
    1200: variants.w1200,
    1800: variants.w1800,
  };
  const src = map[defaultWidth];
  const height = Math.round((variants.heightAt1800 * defaultWidth) / 1800);
  const srcSet = [400, 700, 1200, 1800].map((w) => `${map[w]} ${w}w`).join(", ");
  return { src, srcSet, width: defaultWidth, height };
}

/** Card-oriented photo (defaults to 700w). */
export function makeCardPhoto(variants: LocalPhotoVariants): LocalPhoto {
  return makeLocalPhoto(variants, 700);
}

/** Hero-oriented photo (defaults to 1800w). */
export function makeHeroPhoto(variants: LocalPhotoVariants): LocalPhoto {
  return makeLocalPhoto(variants, 1800);
}

/** Editorial / CTA photo (defaults to 1200w). */
export function makeEditorialPhoto(variants: LocalPhotoVariants): LocalPhoto {
  return makeLocalPhoto(variants, 1200);
}

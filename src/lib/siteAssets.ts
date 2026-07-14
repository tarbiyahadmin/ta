/**
 * Production local photography — optimized WebP under `/src/assets/images`.
 * Raw camera masters live in `/src/assets/mqi-images` (input for `npm run optimize:images`).
 */
import { makeCardPhoto, makeEditorialPhoto, makeHeroPhoto, type LocalPhoto, type LocalPhotoVariants } from "@/lib/localPhoto";

import dsc00759_w400 from "@/assets/images/photos/dsc00759-w400.webp";
import dsc00759_w700 from "@/assets/images/photos/dsc00759-w700.webp";
import dsc00759_w1200 from "@/assets/images/photos/dsc00759-w1200.webp";
import dsc00759_w1800 from "@/assets/images/photos/dsc00759-w1800.webp";

import dsc01554_w400 from "@/assets/images/photos/dsc01554-w400.webp";
import dsc01554_w700 from "@/assets/images/photos/dsc01554-w700.webp";
import dsc01554_w1200 from "@/assets/images/photos/dsc01554-w1200.webp";
import dsc01554_w1800 from "@/assets/images/photos/dsc01554-w1800.webp";

import dsc02156_w400 from "@/assets/images/photos/dsc02156-w400.webp";
import dsc02156_w700 from "@/assets/images/photos/dsc02156-w700.webp";
import dsc02156_w1200 from "@/assets/images/photos/dsc02156-w1200.webp";
import dsc02156_w1800 from "@/assets/images/photos/dsc02156-w1800.webp";

import dsc02163_w400 from "@/assets/images/photos/dsc02163-w400.webp";
import dsc02163_w700 from "@/assets/images/photos/dsc02163-w700.webp";
import dsc02163_w1200 from "@/assets/images/photos/dsc02163-w1200.webp";
import dsc02163_w1800 from "@/assets/images/photos/dsc02163-w1800.webp";

import dsc02164_w400 from "@/assets/images/photos/dsc02164-w400.webp";
import dsc02164_w700 from "@/assets/images/photos/dsc02164-w700.webp";
import dsc02164_w1200 from "@/assets/images/photos/dsc02164-w1200.webp";
import dsc02164_w1800 from "@/assets/images/photos/dsc02164-w1800.webp";

import dsc02173_w400 from "@/assets/images/photos/dsc02173-w400.webp";
import dsc02173_w700 from "@/assets/images/photos/dsc02173-w700.webp";
import dsc02173_w1200 from "@/assets/images/photos/dsc02173-w1200.webp";
import dsc02173_w1800 from "@/assets/images/photos/dsc02173-w1800.webp";

import dsc02176_w400 from "@/assets/images/photos/dsc02176-w400.webp";
import dsc02176_w700 from "@/assets/images/photos/dsc02176-w700.webp";
import dsc02176_w1200 from "@/assets/images/photos/dsc02176-w1200.webp";
import dsc02176_w1800 from "@/assets/images/photos/dsc02176-w1800.webp";

import dsc02189_w400 from "@/assets/images/photos/dsc02189-w400.webp";
import dsc02189_w700 from "@/assets/images/photos/dsc02189-w700.webp";
import dsc02189_w1200 from "@/assets/images/photos/dsc02189-w1200.webp";
import dsc02189_w1800 from "@/assets/images/photos/dsc02189-w1800.webp";

import img8904_w400 from "@/assets/images/photos/img_8904-w400.webp";
import img8904_w700 from "@/assets/images/photos/img_8904-w700.webp";
import img8904_w1200 from "@/assets/images/photos/img_8904-w1200.webp";
import img8904_w1800 from "@/assets/images/photos/img_8904-w1800.webp";

import img8936_w400 from "@/assets/images/photos/img_8936-w400.webp";
import img8936_w700 from "@/assets/images/photos/img_8936-w700.webp";
import img8936_w1200 from "@/assets/images/photos/img_8936-w1200.webp";
import img8936_w1800 from "@/assets/images/photos/img_8936-w1800.webp";

import img8998_w400 from "@/assets/images/photos/img_8998-w400.webp";
import img8998_w700 from "@/assets/images/photos/img_8998-w700.webp";
import img8998_w1200 from "@/assets/images/photos/img_8998-w1200.webp";
import img8998_w1800 from "@/assets/images/photos/img_8998-w1800.webp";

import grainUrl from "@/assets/images/textures/grain.webp";
import arabicUrl from "@/assets/images/svg/arabic.svg";
import siteLogoUrl from "@/assets/images/svg/logo-w256.webp";

function pack(
  w400: string,
  w700: string,
  w1200: string,
  w1800: string,
  heightAt1800: number,
): LocalPhotoVariants {
  return { w400, w700, w1200, w1800, heightAt1800 };
}

const dsc00759 = pack(dsc00759_w400, dsc00759_w700, dsc00759_w1200, dsc00759_w1800, 2700);
const dsc01554 = pack(dsc01554_w400, dsc01554_w700, dsc01554_w1200, dsc01554_w1800, 1200);
const dsc02156 = pack(dsc02156_w400, dsc02156_w700, dsc02156_w1200, dsc02156_w1800, 2700);
const dsc02163 = pack(dsc02163_w400, dsc02163_w700, dsc02163_w1200, dsc02163_w1800, 2700);
const dsc02164 = pack(dsc02164_w400, dsc02164_w700, dsc02164_w1200, dsc02164_w1800, 2700);
const dsc02173 = pack(dsc02173_w400, dsc02173_w700, dsc02173_w1200, dsc02173_w1800, 2700);
const dsc02176 = pack(dsc02176_w400, dsc02176_w700, dsc02176_w1200, dsc02176_w1800, 1200);
const dsc02189 = pack(dsc02189_w400, dsc02189_w700, dsc02189_w1200, dsc02189_w1800, 2700);
const img8904 = pack(img8904_w400, img8904_w700, img8904_w1200, img8904_w1800, 1200);
const img8936 = pack(img8936_w400, img8936_w700, img8936_w1200, img8936_w1800, 2700);
const img8998 = pack(img8998_w400, img8998_w700, img8998_w1200, img8998_w1800, 1200);

/** Primary hero — student photography */
export const heroImage: LocalPhoto = makeHeroPhoto(dsc00759);

/** Hero collage — four portraits (LCP candidate is index 0) */
export const heroCollagePhotos: readonly LocalPhoto[] = [
  makeHeroPhoto(dsc00759),
  makeHeroPhoto(dsc02156),
  makeHeroPhoto(dsc02163),
  makeHeroPhoto(dsc02176),
] as const;

/** Default editorial collage (About, Homepage about block) */
export const editorialPhotos: readonly LocalPhoto[] = [
  makeEditorialPhoto(dsc02189),
  makeEditorialPhoto(dsc02176),
  makeEditorialPhoto(dsc02156),
  makeEditorialPhoto(dsc01554),
] as const;

/** CTA band / banner photography */
export const ctaBandPhoto: LocalPhoto = makeEditorialPhoto(dsc02156);

/**
 * Program card fallbacks — lightweight unique set (max ~700w served via srcSet).
 * Curated to avoid redundant near-duplicates while keeping variety.
 */
export const programCardPhotos: readonly LocalPhoto[] = [
  makeCardPhoto(dsc00759),
  makeCardPhoto(dsc02156),
  makeCardPhoto(dsc02163),
  makeCardPhoto(img8904),
  makeCardPhoto(dsc02176),
  makeCardPhoto(dsc02164),
  makeCardPhoto(dsc02173),
  makeCardPhoto(img8936),
  makeCardPhoto(img8998),
  makeCardPhoto(dsc02189),
  makeCardPhoto(dsc01554),
] as const;

/** Gallery and carousel fallbacks */
export const galleryPhotos = programCardPhotos;

export { grainUrl, arabicUrl, siteLogoUrl };
export type { LocalPhoto };

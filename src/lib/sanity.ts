import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2024-01-01';
const token = import.meta.env.VITE_SANITY_TOKEN;

if (!projectId || !dataset) {
  console.warn('Sanity: VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET must be set in .env');
}

export const sanityClient = createClient({
  projectId: projectId ?? '',
  dataset: dataset ?? 'production',
  useCdn: true,
  apiVersion,
  ...(token ? { token } : {}),
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** CDN image URL with modern format, quality, and sizing. */
export function urlForSized(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality = 72,
  fit: 'crop' | 'max' = 'crop',
) {
  let pipeline = urlFor(source).width(width).quality(quality).auto('format');
  if (height != null) {
    pipeline = pipeline.height(height).fit(fit);
  }
  return pipeline.url();
}

/** Responsive srcset for Sanity images. */
export function sanitySrcSet(
  source: SanityImageSource,
  widths: number[],
  heightForWidth?: (w: number) => number | undefined,
  quality = 72,
  fit: 'crop' | 'max' = 'crop',
): string {
  return widths
    .map((w) => {
      const h = heightForWidth?.(w);
      return `${urlForSized(source, w, h, quality, fit)} ${w}w`;
    })
    .join(', ');
}

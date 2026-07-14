/**
 * Normalize Jotform URL for embedding or linking.
 * Accepts full URL (https://form.jotform.com/123) or form ID only.
 */
export function getJotformUrl(input: string | undefined): string | null {
  if (!input?.trim()) return null;
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://form.jotform.com/${trimmed}`;
}

/**
 * Embed URL that requests iframe-friendly behavior and height postMessages from Jotform.
 */
export function getJotformEmbedUrl(input: string | undefined): string | null {
  const url = getJotformUrl(input);
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("isIframeEmbed")) {
      parsed.searchParams.set("isIframeEmbed", "1");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

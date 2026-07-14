import type { CtaButton } from "@/lib/sanityQueries";
import { formPagePath } from "@/lib/routes";

/** Normalize CMS path values to a leading-slash internal path when possible. */
export function normalizeInternalPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/**
 * Resolves CTA href: prefers internal page (`to`), falls back to legacy form page.
 */
export function resolveCtaButtonTarget(
  btn: Pick<CtaButton, "to" | "formPage">,
): string | null {
  if (btn.to?.trim()) {
    return normalizeInternalPath(btn.to);
  }
  const formSlug = btn.formPage?.slug;
  if (formSlug) {
    return formPagePath(formSlug);
  }
  return null;
}

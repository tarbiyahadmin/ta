import { DecorativeArabic } from "@/components/layout/DecorativeArabic";

/** Global ambient depth — soft radials and calligraphy behind all pages. */
export function SiteAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="site-atmosphere__depth absolute inset-0" />
      <DecorativeArabic variant="ambient" tint="neutral" opacity={0.024} className="top-[6%] h-[88vh]" />
    </div>
  );
}

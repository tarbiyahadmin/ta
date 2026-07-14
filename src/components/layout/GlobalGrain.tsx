import { grainUrl } from "@/lib/siteAssets";

const grainTile = {
  backgroundImage: `url(${grainUrl})`,
  backgroundRepeat: "repeat",
  backgroundPosition: "center",
} as const;

/** Full-viewport film grain — highly visible texture across the entire site. */
export function GlobalGrain() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] mix-blend-multiply opacity-[0.32]"
        style={{ ...grainTile, backgroundSize: "160px 160px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] mix-blend-soft-light opacity-[0.26]"
        style={{ ...grainTile, backgroundSize: "240px 240px", backgroundPosition: "40px 60px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] mix-blend-overlay opacity-[0.14]"
        style={{ ...grainTile, backgroundSize: "110px 110px", backgroundPosition: "20px 30px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.1]"
        style={{ ...grainTile, backgroundSize: "320px 320px", backgroundPosition: "80px 120px" }}
      />
    </>
  );
}

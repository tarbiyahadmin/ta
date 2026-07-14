import grainUrl from "@/assets/grain.jpg";

/** Layered atmospheric hero background — matches page ground, soft fade into next section. */
export function HeroBackground() {
  const grainTile = {
    backgroundImage: `url(${grainUrl})`,
    backgroundRepeat: "repeat",
    backgroundSize: "180px 180px",
  } as const;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-atmosphere hero-atmosphere--base absolute inset-0" />
      <div className="hero-atmosphere hero-atmosphere--gray absolute inset-0" />
      <div className="hero-atmosphere hero-atmosphere--blue absolute inset-0" />
      <div className="hero-atmosphere hero-atmosphere--red absolute inset-0" />
      <div className="hero-atmosphere__glow hero-atmosphere__glow--left absolute rounded-full" />
      <div className="hero-atmosphere__glow hero-atmosphere__glow--right absolute rounded-full" />
      <div className="hero-atmosphere__glow hero-atmosphere__glow--center absolute rounded-full" />
      <div className="hero-atmosphere__grain absolute inset-0" style={grainTile} />
      <div className="hero-atmosphere__fade" />
    </div>
  );
}

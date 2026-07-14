import { motion } from "framer-motion";
import { heroCollagePhotos } from "@/lib/siteAssets";
import { cn } from "@/lib/utils";

const fadeIn = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const collageSizes = "(max-width: 768px) 55vw, min(420px, 38vw)";

/** Four-image hero composition — floats in the hero atmosphere, no card container. */
export function HeroCollage({ className }: { className?: string }) {
  const [hero, upper, lower, edge] = heroCollagePhotos;

  return (
    <div className={cn("hero-collage", className)} aria-hidden>
      <div className="hero-collage__ambient">
        <div className="hero-collage__radial hero-collage__radial--blue" />
        <div className="hero-collage__radial hero-collage__radial--red" />
        <div className="hero-collage__radial hero-collage__radial--gray" />
        <div className="hero-collage__glow hero-collage__glow--a" />
        <div className="hero-collage__glow hero-collage__glow--b" />
        <div className="hero-collage__blob hero-collage__blob--blue" />
        <div className="hero-collage__blob hero-collage__blob--red" />
        <div className="hero-collage__blob hero-collage__blob--gray" />
        <div className="hero-collage__ring hero-collage__ring--outer" />
        <div className="hero-collage__ring hero-collage__ring--mid" />
        <div className="hero-collage__ring hero-collage__ring--inner" />
        <div className="hero-collage__bubble hero-collage__bubble--1" />
        <div className="hero-collage__bubble hero-collage__bubble--2" />
        <div className="hero-collage__bubble hero-collage__bubble--3" />
        <div className="hero-collage__arc hero-collage__arc--1" />
        <div className="hero-collage__arc hero-collage__arc--2" />
        <div className="hero-collage__line hero-collage__line--diag" />
        <div className="hero-collage__dots" />
      </div>

      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="hero-collage__orb hero-collage__orb--hero"
      >
        <img
          src={hero.src}
          srcSet={hero.srcSet}
          sizes={collageSizes}
          alt=""
          width={hero.width}
          height={hero.height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="hero-collage__orb hero-collage__orb--upper"
      >
        <img
          src={upper.src}
          srcSet={upper.srcSet}
          sizes={collageSizes}
          alt=""
          width={upper.width}
          height={upper.height}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="hero-collage__orb hero-collage__orb--lower"
      >
        <img
          src={lower.src}
          srcSet={lower.srcSet}
          sizes={collageSizes}
          alt=""
          width={lower.width}
          height={lower.height}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="hero-collage__orb hero-collage__orb--edge"
      >
        <img
          src={edge.src}
          srcSet={edge.srcSet}
          sizes={collageSizes}
          alt=""
          width={edge.width}
          height={edge.height}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}

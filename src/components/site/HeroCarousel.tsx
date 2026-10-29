import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLink, ease } from "./motion";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

const slides = [
  {
    title: "Engineering the Art of Architecture",
    text: "Architectural aluminium and glazing solutions designed around precision, performance and modern design.",
    label: "Curtain-wall façades",
  },
  {
    title: "Façades That Define the Skyline",
    text: "Architectural façade systems and glazing solutions for contemporary developments.",
    label: "Structural glazing",
  },
  {
    title: "Precision in Every Frame",
    text: "Aluminium windows, doors and architectural systems built around quality and detail.",
    label: "Windows & doors",
  },
  {
    title: "BEMCO Aluminium & Glass",
    text: "From design and fabrication to installation, architectural glazing for contemporary buildings.",
    label: "Architectural glazing",
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const touchStart = useRef<number | null>(null);
  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);

  useEffect(() => {
    const t = setTimeout(() => go(1), 4000);
    return () => clearTimeout(t);
  }, [i]);

  const s = slides[i];
  if (!s) return null;
  return (
    <section
      className="homepage-hero relative h-[92svh] min-h-[560px] overflow-hidden bg-ink sm:min-h-[680px]"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const end = event.changedTouches[0]?.clientX;
        if (
          touchStart.current !== null &&
          end !== undefined &&
          Math.abs(end - touchStart.current) > 48
        ) {
          go(end < touchStart.current ? 1 : -1);
        }
        touchStart.current = null;
      }}
      aria-label="BEMCO architectural systems"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      <HeroBackgroundVideo />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

      <div className="container-x relative flex h-full flex-col justify-center pb-16 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="max-w-3xl"
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="eyebrow flex items-center gap-3 !text-brand-green"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="h-px w-8 bg-brand-green" /> BEMCO Aluminium & Glass · Riyadh
            </motion.div>
            <motion.h1
              className="display mt-6 text-5xl text-white sm:text-6xl lg:text-7xl"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              {s.title}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
            >
              {s.text}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              <ArrowLink to="/#expertise">Explore Our Expertise</ArrowLink>
              <ArrowLink to="/contact" variant="outline">
                Discuss Your Project
              </ArrowLink>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="container-x absolute inset-x-0 bottom-7 flex items-center justify-center text-white">
          <a
            href="#company"
            className="absolute left-10 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white sm:flex"
          >
            <span className="h-10 w-px bg-brand-green" /> Scroll to explore
          </a>
          <div className="flex items-center gap-3" aria-label="Featured slide controls">
            {slides.map((slide, k) => (
              <Button
                key={slide.label}
                variant="ghost"
                size="icon"
                onClick={() => setI(k)}
                aria-label={`Go to slide ${k + 1}: ${slide.label}`}
                aria-pressed={k === i}
                title={slide.label}
                className="h-9 w-9 rounded-full text-white hover:bg-white/15 hover:text-white"
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full border transition-colors ${k === i ? "animate-pulse border-brand-green bg-brand-green motion-reduce:animate-none" : "border-white/60 bg-transparent"}`}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

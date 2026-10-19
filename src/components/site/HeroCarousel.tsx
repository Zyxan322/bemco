import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/site";
import { ArrowLink, ease } from "./motion";

const slides = [
  { img: images.hero1, title: "Engineering the Art of Architecture", text: "Architectural aluminium and glazing solutions designed around precision, performance and modern design.", label: "Curtain-wall façades" },
  { img: images.hero2, title: "Façades That Define the Skyline", text: "Architectural façade systems and glazing solutions for contemporary developments.", label: "Structural glazing" },
  { img: images.hero3, title: "Precision in Every Frame", text: "Aluminium windows, doors and architectural systems built around quality and detail.", label: "Windows & doors" },
  { img: images.cta, title: "BEMCO Aluminium & Glass", text: "From design and fabrication to installation, architectural glazing for contemporary buildings.", label: "Architectural glazing" },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);

  const s = slides[i];
  if (!s) return null;
  return (
    <section className="relative h-[92svh] min-h-[640px] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} aria-label="BEMCO architectural systems" aria-roledescription="carousel">
      <AnimatePresence mode="sync">
        <motion.img
          key={s.img}
          src={s.img}
          alt={s.label}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08, x: reduce ? 0 : 30 }}
          animate={{ opacity: 1, scale: 1.02, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-veil" />
      <div className="absolute inset-0 bg-fade-up" />

      <div className="container-x relative flex h-full flex-col justify-center pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={i} className="max-w-3xl" exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
            <motion.div className="eyebrow flex items-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <span className="h-px w-8 bg-brand-green" /> BEMCO Aluminium & Glass · Riyadh
            </motion.div>
            <motion.h1 className="display mt-6 text-5xl text-ink sm:text-6xl lg:text-8xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}>
              {s.title}
            </motion.h1>
            <motion.p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.25 }}>
              {s.text}
            </motion.p>
            <motion.div className="mt-10 flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.4 }}>
              <ArrowLink to="/projects">Explore Our Projects</ArrowLink>
              <ArrowLink to="/contact" variant="outline">Request a Quotation</ArrowLink>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2" aria-label="Choose a hero photo">
          {slides.map((slide, k) => (
            <Button key={slide.img} variant="ghost" size="icon" onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}`} aria-pressed={k === i} title={slide.label} className="relative h-11 w-11 rounded-full hover:bg-primary/10">
              {k === i && <span aria-hidden="true" className="absolute h-5 w-5 rounded-full bg-primary/40 motion-safe:animate-ping" />}
              <span aria-hidden="true" className={`relative h-3 w-3 rounded-full border-2 transition-colors ${k === i ? "border-primary bg-primary" : "border-ink/40 bg-background/80"}`} />
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

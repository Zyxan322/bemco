import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronsLeftRight, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { capabilities, companyProfile, facts, images, products, projects } from "@/lib/site";
import { ArrowLink, Counter, Parallax, Reveal, SectionHead } from "./motion";

export function FactsStrip() {
  return (
    <div className="grid grid-cols-2 border-y border-border lg:grid-cols-4">
      {facts.map((f, i) => (
        <Reveal
          key={f.label}
          delay={i * 0.08}
          className="border-border p-8 even:border-l lg:border-l lg:first:border-l-0"
        >
          <div className="display text-4xl text-ink md:text-5xl">
            <Counter to={f.value} suffix={f.suffix} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{f.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function ProductGrid({
  category = "System",
  action = "Explore System",
}: {
  category?: string;
  action?: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <Reveal key={p.id} delay={(i % 3) * 0.08}>
          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="group relative block overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="text-xs font-semibold text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / {p.category || category}
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {action}{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-green transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectMosaic() {
  const spans = [
    "md:col-span-7 md:row-span-2",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
  ];
  return (
    <div className="grid auto-rows-[260px] gap-5 md:grid-cols-12 md:auto-rows-[300px]">
      {projects.map((p, i) => (
        <Reveal key={p.name} delay={(i % 3) * 0.08} className={spans[i] ?? ""}>
          <Link
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group relative block h-full overflow-hidden rounded-2xl"
          >
            <Parallax
              src={p.img}
              alt={p.name}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              strength={30}
            />
            <div className="absolute inset-x-3 bottom-3 glass flex items-end justify-between rounded-xl border border-border/60 p-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {String(i + 1).padStart(2, "0")} · {p.location}
                </div>
                <span className="absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-white">
                  Image pending review
                </span>
                <h3 className="mt-1 text-xl font-bold text-ink">{p.name}</h3>
              </div>
              <ArrowUpRight className="h-5 w-5 text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const scroll = (d: number) =>
    ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.7, behavior: "smooth" });
  return (
    <div>
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none]"
      >
        {projects.map((p, index) => (
          <Reveal
            key={p.name}
            delay={(index % 3) * 0.07}
            className="w-[78vw] shrink-0 snap-start sm:w-[380px]"
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group relative block aspect-[3/4] h-full w-full overflow-hidden rounded-2xl"
            >
              <img
                src={p.img}
                alt={`${p.name}, ${p.location}`}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-ink/5" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                  {p.type}
                </div>
                <span className="absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-white">
                  Image pending review
                </span>
                <h3 className="mt-1 text-2xl font-bold">{p.name}</h3>
                <p className="text-sm text-white/70">{p.location}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4 text-white">
        <div className="relative h-px flex-1 bg-white/20">
          <motion.div
            className="absolute inset-y-0 left-0 bg-brand-green"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
        <Link
          to="/projects"
          className="hidden text-sm font-semibold text-white/75 transition-colors hover:text-white sm:block"
        >
          All projects <ArrowUpRight className="ml-1 inline h-4 w-4" />
        </Link>
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous projects"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-brand-green hover:bg-brand-green hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next projects"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-brand-green hover:bg-brand-green hover:text-ink"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

const steps = [
  { t: "Consultation", d: "Understanding the project, drawings and requirements." },
  { t: "Design & Engineering", d: "Selecting and engineering the right system." },
  { t: "Fabrication", d: "Precision manufacturing in our Riyadh factory." },
  { t: "Quality Checks", d: "Inspection of profiles, glazing and finish." },
  { t: "Installation & Handover", d: "On-site installation and project handover." },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />
      <motion.div
        style={{ scaleX: isMobile ? 1 : scaleX }}
        className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-primary lg:block"
      />
      <div className="absolute bottom-0 left-6 top-0 w-px bg-border lg:hidden" />
      <motion.div
        style={{ scaleY: isMobile ? 1 : scaleX }}
        className="absolute bottom-0 left-6 top-0 w-px origin-top bg-primary lg:hidden"
      />
      <div className="grid gap-10 lg:grid-cols-5">
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.1} className="relative pl-20 lg:pl-0">
            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-sm font-bold text-primary lg:relative">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-lg font-bold text-ink lg:mt-8">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <Parallax
        src={images.cta}
        alt="Modern glass building at golden hour"
        className="absolute inset-0"
        strength={70}
      />
      <div className="absolute inset-0 bg-veil" />
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <h2 className="display text-4xl text-ink md:text-6xl">
            Have an Architectural Project in Mind?
          </h2>
          <p className="mt-6 text-lg text-foreground/75">
            Tell us about your project and let’s discuss the right aluminium and glazing solution.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {companyProfile.available ? (
              <a
                href={companyProfile.path}
                download={companyProfile.filename}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white"
              >
                <Download className="h-4 w-4" /> Download Our Profile
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-describedby="cta-profile-status"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-primary/50 px-6 py-3.5 text-sm font-semibold text-white"
              >
                <Download className="h-4 w-4" /> Company profile unavailable
              </button>
            )}
            <ArrowLink to="/contact" variant="outline">
              Discuss Your Project
            </ArrowLink>
          </div>
          <p id="cta-profile-status" className="mt-3 text-sm text-muted-foreground">
            {companyProfile.available
              ? "Download the approved BEMCO company profile."
              : `The approved PDF is not available yet. Add it at public${companyProfile.path}.`}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Unverified facade before and after image comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-border shadow-soft"
    >
      <img
        src={images.after}
        alt="Unverified image labelled after; project association not confirmed"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src={images.before}
        alt="Unverified image labelled before; project association not confirmed"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <span className="glass absolute left-4 top-4 rounded-full border border-border/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink">
        Before · verify
      </span>
      <span className="glass absolute right-4 top-4 rounded-full border border-border/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink">
        After · verify
      </span>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-card" />
        <div className="glass absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border shadow-soft text-ink">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function CapabilitiesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((c, i) => (
        <Reveal key={c.title} delay={(i % 3) * 0.08}>
          <div className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="text-xs font-semibold text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / Service
              </div>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-green transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export { SectionHead };

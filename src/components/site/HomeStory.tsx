import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  capabilities,
  companyProfile,
  companyProfileContent,
  companyStatistics,
  images,
} from "@/lib/site";
import { submitEnquiry } from "@/lib/enquiry";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FactsStrip, Timeline } from "@/components/site/Sections";
import { ArrowLink, Parallax, Reveal, SectionHead } from "./motion";

export function HomeCapabilities() {
  return (
    <section id="services" className="scroll-mt-24 bg-ink py-24 text-white md:py-32">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-brand-green">What we do</p>
            <h2 className="display mt-5 text-4xl text-white md:text-5xl">
              One partner for the building envelope.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              From aluminium systems and glazing to façade fabrication and installation, BEMCO
              brings connected capabilities to architectural projects.
            </p>
          </Reveal>
          <ArrowLink to="/services" variant="outline">
            Explore services
          </ArrowLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.slice(0, 5).map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 0.08}>
              <Link
                to="/services"
                className="group relative block min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img
                  src={item.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-4 text-xs font-bold tracking-[0.2em] text-brand-green">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">{item.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <Link
              to="/services"
              className="group flex min-h-[330px] flex-col justify-between rounded-2xl border border-brand-green/35 bg-primary p-7 transition-colors hover:bg-primary/90"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-white/70">
                06 · CONNECTED DELIVERY
              </span>
              <div>
                <h3 className="text-2xl font-bold">From concept to site.</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Explore BEMCO’s systems and capabilities, and find the right starting point for
                  your project.
                </p>
                <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function MissionStatement() {
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const motionDisabled = reduceMotion || isMobile;
  const visualSlides = [
    {
      src: images.hero1,
      alt: "Modern commercial building with a glazed façade",
      label: "Architectural façades",
    },
    {
      src: images.hero2,
      alt: "Glass and aluminium building envelope",
      label: "Glass & aluminium systems",
    },
    {
      src: images.hero3,
      alt: "Architectural façade image",
      label: "Project delivery",
    },
  ];
  const selectedImage = visualSlides[activeImage] ?? visualSlides[0]!;
  const changeImage = (direction: number) => {
    setActiveImage((current) => (current + direction + visualSlides.length) % visualSlides.length);
  };

  return (
    <section
      id="mission"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#102432] py-20 text-white md:py-28"
    >
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl"
      />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="group [perspective:1400px]">
            <motion.div
              whileHover={{
                rotateY: motionDisabled ? 0 : -4,
                rotateX: motionDisabled ? 0 : 2,
                scale: motionDisabled ? 1 : 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 18,
                duration: motionDisabled ? 0 : undefined,
              }}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl [transform-style:preserve-3d]"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={motionDisabled ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: motionDisabled ? 0 : 0.55 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-ink/10" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                    BEMCO · Riyadh
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    {selectedImage.label}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => changeImage(-1)}
                    aria-label="Previous mission image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-ink/25 text-white backdrop-blur transition hover:border-brand-green hover:bg-brand-green hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeImage(1)}
                    aria-label="Next mission image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-ink/25 text-white backdrop-blur transition hover:border-brand-green hover:bg-brand-green hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div
                aria-live="polite"
                className="absolute right-6 top-6 rounded-full border border-white/25 bg-ink/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"
              >
                0{activeImage + 1} / 0{visualSlides.length}
              </div>
            </motion.div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow !text-brand-green">Our mission</p>
          <h2 className="display mt-5 text-4xl leading-tight text-white md:text-5xl">
            {companyProfileContent.missionTitle}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/70">
            {companyProfileContent.mission} {companyProfileContent.missionDetails}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArrowLink to="/services" variant="outline">
              Explore our capabilities
            </ArrowLink>
            <a
              href="#vision"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white/75 transition-colors hover:text-brand-green"
            >
              Continue to our vision{" "}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function VisionStatement() {
  return (
    <section id="vision" className="scroll-mt-20 bg-[#eff5f6] py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow">Our vision</p>
          <h2 className="display mt-5 text-4xl text-ink md:text-6xl">
            {companyProfileContent.visionTitle}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {companyProfileContent.vision} {companyProfileContent.visionDetails}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ArrowLink to="/services" variant="text">
              Explore our capabilities
            </ArrowLink>
            <a
              href="#mission"
              className="group inline-flex items-center gap-2 px-0 py-1 text-sm font-semibold text-primary"
            >
              Back to our mission{" "}
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </a>
          </div>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Parallax
              src={images.hero3}
              alt="Architectural glazing and aluminium façade"
              className="absolute inset-0"
              strength={28}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
            <span className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-ink/35 px-4 py-2 text-sm text-white backdrop-blur">
              Architecture · Engineering · Delivery
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const expertise = [
  {
    title: "Design & coordination",
    text: "Translate project requirements into coordinated aluminium, glazing and façade solutions, with design and engineering considered together.",
    img: images.detail,
    alt: "Architectural aluminium detail",
  },
  {
    title: "Façade systems",
    text: "Explore system options for building envelopes, including curtain-wall assemblies and architectural glazing.",
    img: images.hero2,
    alt: "Curtain-wall façade",
  },
  {
    title: "Aluminium fabrication",
    text: "BEMCO’s Riyadh operation supports the fabrication of aluminium windows, doors and façade components.",
    img: images.hero3,
    alt: "Aluminium window and façade systems",
  },
  {
    title: "Glass & glazing",
    text: "Glass panels and glazing are part of BEMCO’s architectural aluminium and façade offering.",
    img: images.skylight,
    alt: "Glazed architectural structure",
  },
  {
    title: "Installation & inspection",
    text: "Project delivery continues on site, where installation and quality checks contribute to the completed work.",
    img: images.hero1,
    alt: "Architectural façade",
  },
];

export function ExpertiseExplorer() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const selected = expertise[active];
  if (!selected) return null;
  const move = (direction: number) =>
    setActive((current) => (current + direction + expertise.length) % expertise.length);
  return (
    <section id="expertise" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Our expertise"
          title="Connected thinking. Practical capability."
          text="Explore the disciplines that come together across BEMCO’s aluminium, glass and façade work."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div
              role="tablist"
              aria-label="BEMCO areas of expertise"
              className="flex flex-col border-y border-border"
            >
              {expertise.map((item, index) => (
                <button
                  key={item.title}
                  id={`expertise-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="expertise-panel"
                  onClick={() => setActive(index)}
                  className={`flex min-h-16 items-center justify-between gap-4 border-b border-border px-2 text-left transition-colors last:border-b-0 hover:text-primary ${active === index ? "text-primary" : "text-foreground/65"}`}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-widest text-primary/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{item.title}</span>
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${active === index ? "translate-x-1" : ""}`}
                  />
                </button>
              ))}
              <div className="flex justify-end gap-2 py-4">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous expertise"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next expertise"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              id="expertise-panel"
              role="tabpanel"
              aria-labelledby={`expertise-tab-${active}`}
              className="relative min-h-[380px] overflow-hidden rounded-3xl bg-ink text-white"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.title}
                  initial={isMobile ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: isMobile ? 0 : 0.3 }}
                  className="absolute inset-0"
                >
                  <img
                    src={selected.img}
                    alt={selected.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-55"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                    <p className="eyebrow !text-brand-green">
                      0{active + 1} / 0{expertise.length}
                    </p>
                    <h3 className="mt-4 text-3xl font-bold">{selected.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-white/75">{selected.text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CurtainWallFeature() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white md:py-32">
      <Parallax
        src={images.hero2}
        alt="Contemporary high-rise curtain-wall façade"
        className="absolute inset-0 opacity-45"
        strength={22}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/45" />
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.08]"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <Reveal>
          <p className="eyebrow !text-brand-green">Façade systems</p>
          <h2 className="display mt-5 max-w-3xl text-4xl text-white md:text-6xl">
            Curtain walls & structural glazing.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Curtain walls form a non-structural outer envelope fixed to a building’s structure.
            Structural glazing uses engineered glass-to-frame connections to create a more
            continuous glazed appearance. System selection and details depend on project design and
            specifications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArrowLink to="/products#geode-mx">Explore GEODE MX</ArrowLink>
            <ArrowLink to="/contact" variant="outline">
              Discuss your façade project
            </ArrowLink>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-2xl border border-white/15 bg-ink/55 p-6 backdrop-blur-sm md:p-8">
            <p className="eyebrow !text-brand-green">Illustrative delivery sequence</p>
            <ol className="mt-6 space-y-4">
              {[
                "Technical coordination",
                "Shop drawings",
                "Fabrication",
                "Installation",
                "Inspection",
              ].map((stage, index) => (
                <li
                  key={stage}
                  className="flex items-center gap-4 text-sm font-medium text-white/85"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-green/70 text-xs text-brand-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {stage}
                  {index < 4 && <ArrowRight className="ml-auto h-4 w-4 text-brand-green" />}
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/55">
              Illustrative only. Project work must follow approved drawings, engineering
              specifications, manufacturer documentation and site safety requirements.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const journey = [
  {
    title: "Understand",
    text: "We start with your brief, drawings and project requirements.",
  },
  {
    title: "Plan & coordinate",
    text: "We review system options and coordinate the project scope.",
  },
  {
    title: "Make",
    text: "We prepare aluminium and glazing products to the agreed requirements.",
  },
  {
    title: "Deliver",
    text: "Installation, quality checks and handover follow the project plan.",
  },
];

export function ProjectJourney() {
  return (
    <section id="company" className="scroll-mt-24 bg-[#f4f6f7] py-20 md:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ink">Our process</p>
          <h2 className="display mt-5 text-4xl text-ink md:text-5xl">
            From first conversation to finished work.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            A straightforward overview of how we work with you through an architectural aluminium
            and glazing project.
          </p>
        </Reveal>
        <ol className="mt-12 grid gap-y-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {journey.map((step, index) => (
            <li key={step.title} className="relative h-full">
              <Reveal delay={index * 0.08} className="h-full border-t border-primary/30 pt-5">
                <span className="text-xs font-bold tracking-[0.18em] text-ink">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink">{step.text}</p>
              </Reveal>
              {index < journey.length - 1 && (
                <>
                  <ArrowDown
                    aria-hidden="true"
                    className="absolute -bottom-6 left-1/2 h-4 w-4 -translate-x-1/2 text-primary lg:hidden"
                  />
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute right-[-1.65rem] top-6 hidden h-4 w-4 text-primary lg:block"
                  />
                </>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-10 border-t border-border pt-5 text-xs leading-relaxed text-ink">
          Project scope and sequence vary; work follows the approved project information and
          applicable site requirements.
        </p>
      </div>
    </section>
  );
}

export function WhyBemco() {
  const strengths = [
    {
      title: "Connected disciplines",
      text: "Design, engineering, fabrication and installation are part of BEMCO’s stated offering.",
    },
    {
      title: "Based in Riyadh",
      text: "A Saudi-based team working across architectural aluminium, glass and façade projects.",
    },
    {
      title: "Focused on the brief",
      text: "System and delivery choices are considered in the context of each project’s requirements.",
    },
  ];
  return (
    <section className="bg-primary py-24 text-white md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow !text-white/75">Why BEMCO</p>
          <h2 className="display mt-5 text-4xl text-white md:text-6xl">
            Capability that connects the details.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            A coordinated approach to architectural aluminium and glazing—from early technical
            decisions through fabrication and site delivery.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/20 md:grid-cols-3">
          {strengths.map((strength, index) => (
            <Reveal key={strength.title} delay={index * 0.08}>
              <article className="h-full bg-primary p-7 md:p-9">
                <span className="text-sm font-bold tracking-[0.2em] text-brand-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-xl font-bold">{strength.title}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{strength.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualityAndIndustries() {
  const applications = [
    {
      label: "Commercial",
      img: images.hero1,
    },
    {
      label: "Healthcare",
      img: images.hero2,
    },
    {
      label: "Hospitality",
      img: images.cta,
    },
    {
      label: "Institutional",
      img: images.hero3,
    },
  ];
  return (
    <>
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Quality & workmanship</p>
            <h2 className="display mt-5 text-4xl text-ink md:text-5xl">
              Care in the work. Attention to the finish.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              BEMCO’s stated focus on quality products, customer satisfaction and continual
              improvement informs how we approach architectural aluminium, glass and façade work.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Project-specific inspection, materials and site safety requirements should be
              confirmed against the approved project documentation. No certifications or standards
              are claimed here.
            </p>
            <div className="mt-8">
              <ArrowLink to="/quality" variant="text">
                Our quality approach
              </ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Parallax
                src={images.detail}
                alt="Close-up of an architectural aluminium frame"
                className="absolute inset-0"
                strength={20}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <span className="absolute bottom-6 left-6 text-sm font-medium text-white">
                Designed for the project. Made for the place.
              </span>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-[#eff5f6] py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            eyebrow="Industries & applications"
            title="Different briefs. Thoughtful façade solutions."
            text="Selected project categories represented in BEMCO’s current portfolio."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((application, index) => (
              <Reveal key={application.label} delay={index * 0.06}>
                <Link
                  to="/projects"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
                >
                  <img
                    src={application.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-bold">{application.label}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutCompany({ includeReach = true }: { includeReach?: boolean }) {
  return (
    <>
      <section className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <p className="eyebrow">Company overview · Building Experts Co. for Metal Industries</p>
          <h2 className="display mt-5 text-4xl text-ink md:text-5xl">
            An aluminium and glass partner, based in Riyadh.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {companyProfileContent.overview}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Its expertise includes curtain wall systems, aluminum windows and doors, structural
            glazing, aluminum cladding, frameless glass systems, skylights and related metal works.
            BEMCO coordinates engineering, fabrication and installation to support project quality,
            finish and specifications.
          </p>
          <div className="mt-8">
            <ArrowLink to="/services">Explore our services</ArrowLink>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Parallax
              src={images.hero1}
              alt="Modern architectural façade"
              className="absolute inset-0"
              strength={25}
            />
          </div>
        </Reveal>
      </section>
      {includeReach && (
        <section className="bg-[#eff5f6] py-20 md:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="eyebrow">Our reach</p>
              <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
                Growing through partnerships.
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.06}>
                <article className="border-t-2 border-primary pt-5">
                  <h3 className="text-xl font-bold text-ink">A Saudi foundation</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    BEMCO is based in Riyadh and reports established partnerships with domestic
                    companies.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.12}>
                <article className="border-t-2 border-brand-green pt-5">
                  <h3 className="text-xl font-bold text-ink">Regional ambition</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    The company reports expanding its market to cities including Jeddah, Dammam,
                    Taif, Jizan and Rafha, as well as the Middle East and Gulf area.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.18} className="sm:col-span-2">
                <article className="border-t-2 border-primary pt-5">
                  <h3 className="text-xl font-bold text-ink">Quality and partnership</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    BEMCO’s published company overview highlights quality management, professional
                    teams, customer-oriented service and sincere, honest business partnerships.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function CompanyProfileDownload() {
  return (
    <section id="company-profile" className="bg-[#eff5f6] py-12">
      <Reveal className="container-x">
        <div className="flex flex-col gap-5 rounded-2xl border border-primary/15 bg-white p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="eyebrow">Company profile</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">BEMCO company profile</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The company profile PDF is not present in the project files yet. Add the approved file
              at <code className="rounded bg-muted px-1.5 py-0.5">public{companyProfile.path}</code>{" "}
              to enable downloads.
            </p>
          </div>
          {companyProfile.available ? (
            <a
              href={companyProfile.path}
              download={companyProfile.filename}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
            >
              <Download className="h-4 w-4" /> Download company profile
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-describedby="profile-download-status"
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-primary/40 px-6 py-3.5 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" /> Profile PDF unavailable
            </button>
          )}
          <span id="profile-download-status" className="sr-only">
            {companyProfile.available
              ? "Download the BEMCO company profile PDF."
              : `The company profile PDF is missing from public${companyProfile.path}.`}
          </span>
        </div>
      </Reveal>
    </section>
  );
}

export function ServicesOverview() {
  const serviceDetails = [
    {
      id: "consult",
      number: "01",
      title: "Consultation & project coordination",
      text: "Discuss project briefs, drawings, system options and the technical coordination needed for an aluminium and glazing project.",
      image: images.detail,
      alt: "Architectural aluminium frame detail",
      link: "/quotation",
      action: "Discuss a project",
    },
    {
      id: "design-engineering",
      number: "02",
      title: "Design & engineering",
      text: "Design and engineer architectural aluminium, glass and façade solutions to suit project requirements.",
      image: images.hero2,
      alt: "Glass and aluminium building façade",
      link: "/quotation",
      action: "Discuss a project",
    },
    {
      id: "manufacturing",
      number: "03",
      title: "Manufacturing & fabrication",
      text: "Manufacture and fabricate aluminium window, door and glass-panel products at BEMCO’s Riyadh facility.",
      image: images.hero3,
      alt: "Aluminium window and façade systems",
      link: "/manufacturing",
      action: "Explore manufacturing",
    },
    {
      id: "installation",
      number: "04",
      title: "Installation & project delivery",
      text: "Installation is among BEMCO’s stated capabilities; the exact scope and sequence are confirmed for each project.",
      image: images.skylight,
      alt: "Glazed architectural structure",
      link: "/contact",
      action: "Discuss delivery",
    },
  ];
  return (
    <section className="container-x py-16 md:py-24">
      <Reveal className="mb-10 max-w-2xl">
        <p className="eyebrow">BEMCO service areas</p>
        <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
          Practical support for aluminium and glazing projects.
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Explore the work BEMCO offers. The final scope is agreed for each project against its
          requirements and specifications.
        </p>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {serviceDetails.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.06}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-soft">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#eaf2f6]">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-ink/45 px-3 py-1 text-xs font-bold tracking-[0.15em] text-white backdrop-blur-sm">
                  {service.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-ink">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.text}
                </p>
                <Link
                  to={service.link}
                  className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  {service.action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ManufacturingOverview() {
  return (
    <>
      <section className="bg-[#eff5f6] py-16 md:py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Riyadh manufacturing"
            title="Capacity supported by investment."
            text="BEMCO reports investing in advanced manufacturing machinery and technology to support its aluminium window, door and glass-panel production."
          />
          <div className="mt-10">
            <FactsStrip />
          </div>
        </div>
      </section>
      <section className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Parallax
              src={images.detail}
              alt="Close-up of an aluminium system"
              className="absolute inset-0"
              strength={20}
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Manufacture & delivery</p>
          <h2 className="display mt-5 text-4xl text-ink md:text-5xl">
            From project requirements to finished systems.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            BEMCO describes its services as consultation, design, engineering and product
            manufacture, with installation among its architectural aluminium and façade
            capabilities.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The process below is a general overview. Actual sequencing, materials and inspections
            depend on approved project information and site conditions.
          </p>
          <div className="mt-8">
            <ArrowLink to="/contact">Talk to our team</ArrowLink>
          </div>
        </Reveal>
      </section>
      <section className="bg-ink py-20 text-white md:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-brand-green">Typical workflow</p>
            <h2 className="display mt-5 text-4xl text-white md:text-5xl">A coordinated journey.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              A high-level illustration of how requirements can progress through design,
              manufacturing and site delivery.
            </p>
          </Reveal>
          <div className="mt-12">
            <Timeline />
          </div>
        </div>
      </section>
    </>
  );
}

export function QualityDetails() {
  const commitments = [
    [
      "Quality management",
      "BEMCO’s published company profile identifies quality management as a focus of its business.",
    ],
    [
      "Continual improvement",
      "The company describes an objective of remaining competitive through investment in manufacturing equipment and technology.",
    ],
    [
      "Customer relationships",
      "Its company overview emphasizes customer-oriented service and sincere, honest business partnerships.",
    ],
  ];
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Quality approach</p>
          <h2 className="display mt-5 text-4xl text-ink md:text-5xl">
            Quality is part of the whole project.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            BEMCO’s published materials highlight quality products, quality management, customer
            satisfaction and continual improvement.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Inspection plans, safety controls and compliance requirements are project-specific and
            must be confirmed against approved drawings, specifications, manufacturer information
            and applicable site procedures.
          </p>
        </Reveal>
        <div className="space-y-4">
          {commitments.map(([title, description], index) => (
            <Reveal key={title} delay={index * 0.07}>
              <article className="rounded-2xl border border-border bg-white p-6 md:p-8">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
              </article>
            </Reveal>
          ))}
          <p className="px-2 text-sm text-muted-foreground">
            No third-party certifications or specific standards are claimed on this page.
          </p>
        </div>
      </div>
    </section>
  );
}

const commonQuestions = [
  {
    question: "What does BEMCO do?",
    answer:
      "BEMCO describes its work as consultation, design, engineering and manufacture of architectural aluminium and glass products, with façade systems and installation among its capabilities.",
  },
  {
    question: "What product systems can I ask about?",
    answer:
      "The current BEMCO product catalogue lists SAPHIR, TITANE PH, GEODE MX, OPALE CA, SAPHIR & TOPAZE and TECHNAL. The appropriate system depends on the project brief and specifications.",
  },
  {
    question: "Where is BEMCO based?",
    answer:
      "BEMCO is based in Riyadh, Saudi Arabia. Its company overview also describes domestic partnerships and expansion into other Saudi cities and the Gulf region.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Contact BEMCO by phone or email with your project location, requirements and any available drawings or specifications. The team can then discuss the appropriate next steps.",
  },
];

export function FrequentlyAskedQuestions({ includeContact = false }: { includeContact?: boolean }) {
  return (
    <section className="bg-[#eff5f6] py-20 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="eyebrow">FAQs</p>
          <h2 className="display mt-5 text-3xl text-ink md:text-4xl">A few useful answers.</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Have a project-specific question? Our team can help clarify the scope.
          </p>
          {includeContact && (
            <div className="mt-6">
              <ArrowLink to="/contact" variant="text">
                Contact BEMCO
              </ArrowLink>
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="border-t border-border">
            {commonQuestions.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-5 text-base font-semibold text-ink hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactEnquiry({ product }: { product?: string }) {
  const submitEnquiryFn = useServerFn(submitEnquiry);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(event.currentTarget);
    setSubmitting(true);
    setNotice(null);
    try {
      await submitEnquiryFn({
        data: {
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          subject: product ? `Product enquiry: ${product}` : String(formData.get("subject") ?? ""),
          message: [
            product ? `Product / system: ${product}` : "",
            String(formData.get("message") ?? ""),
          ]
            .filter(Boolean)
            .join("\n\n"),
          website: String(formData.get("website") ?? ""),
        },
      });
      setNotice({ type: "success", message: "Thank you. Your enquiry has been sent to BEMCO." });
      form.reset();
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your enquiry. Please try again or contact BEMCO directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[0.75fr_1.25fr]">
      <Reveal>
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2 className="display mt-5 text-4xl text-ink md:text-5xl">
            Tell us about your project.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Share your contact details and enquiry. Your message will be sent securely to BEMCO.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <p>
              <span className="font-semibold text-ink">Phone</span>
              <br />
              <a
                className="text-primary transition-colors duration-200 hover:underline"
                href="tel:+966554455348"
              >
                +966 55 44 55 348
              </a>
            </p>
            <p>
              <span className="font-semibold text-ink">Email</span>
              <br />
              <a
                className="text-primary transition-colors duration-200 hover:underline"
                href="mailto:info@bemcoalu.com"
              >
                info@bemcoalu.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-ink">Office</span>
              <br />
              <span className="text-muted-foreground">
                Istanbol St., Mashael Area, Riyadh, Kingdom of Saudi Arabia
              </span>
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <form
          onSubmit={submit}
          className="space-y-5 rounded-3xl border border-border bg-white p-6 shadow-soft md:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-ink">
              Full name *
              <input
                name="name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Email address
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Company <span className="font-normal text-muted-foreground">(optional)</span>
              <input
                name="company"
                maxLength={120}
                autoComplete="organization"
                className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Phone <span className="font-normal text-muted-foreground">(optional)</span>
              <input
                name="phone"
                type="tel"
                maxLength={40}
                autoComplete="tel"
                className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
          <label className="block text-sm font-semibold text-ink">
            Subject / enquiry type *
            <select
              name="subject"
              required
              defaultValue={product ? "Products & systems" : ""}
              className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="" disabled>
                Select an enquiry type
              </option>
              <option>General enquiry</option>
              <option>Project enquiry</option>
              <option>Quotation request</option>
              <option>Products & systems</option>
              <option>Manufacturing</option>
            </select>
          </label>
          {product && (
            <label className="block text-sm font-semibold text-ink">
              Product / system
              <input
                name="product"
                value={product}
                readOnly
                className="mt-2 block w-full rounded-xl border border-input bg-muted px-4 py-3 font-normal text-muted-foreground"
              />
            </label>
          )}
          <label className="block text-sm font-semibold text-ink">
            How can we help?
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              className="mt-2 block w-full resize-y rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            Leave this field empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            {submitting ? "Sending enquiry…" : "Send enquiry"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
          <p
            role={notice?.type === "error" ? "alert" : "status"}
            aria-live={notice?.type === "error" ? "assertive" : "polite"}
            className={`text-sm ${notice?.type === "error" ? "text-destructive" : "text-primary"}`}
          >
            {notice?.message}
          </p>
        </form>
      </Reveal>
    </section>
  );
}

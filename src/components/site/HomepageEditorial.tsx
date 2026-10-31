import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ceoPortrait from "@/assets/ceo-portrait.webp";
import overviewImage from "@/assets/project-1.webp";
import { useIsMobile } from "@/hooks/use-mobile";
import { companyProfileContent, companyStatistics, contact, images } from "@/lib/site";
import { ArrowLink, Counter, Parallax, Reveal } from "./motion";

export function HomepageCompanyOverview() {
  return (
    <section className="homepage-motion homepage-overview relative overflow-hidden bg-white py-10 md:py-14">
      <div className="container-x">
        <div className="mb-5 flex items-center gap-5 border-b border-border pb-3">
          <span className="text-xs font-semibold tracking-[0.22em] text-primary">
            BEMCO / COMPANY OVERVIEW
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="hidden text-xs uppercase tracking-[0.16em] text-muted-foreground sm:block">
            Riyadh · Saudi Arabia
          </span>
        </div>
        <div className="homepage-overview-grid grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_210px] md:gap-7 lg:grid-cols-[1.65fr_0.75fr] lg:gap-12">
          <Reveal>
            <p className="eyebrow">Building Experts Co. for Metal Industries</p>
            <h2 className="display mt-3 max-w-2xl text-3xl leading-[1.08] text-ink sm:text-4xl md:text-[2.7rem]">
              Engineering the details behind better buildings.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {companyProfileContent.overview}
            </p>
            <div className="homepage-overview-facts mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border pt-4">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Established
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  January <Counter to={companyStatistics.foundedYear} />
                </p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Based in
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">{contact.addressShort}</p>
              </div>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-ink"
              >
                Discover BEMCO{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <figure className="homepage-overview-photo relative ml-auto w-full max-w-[210px] lg:max-w-[300px]">
              <div className="homepage-overview-image relative aspect-[4/3] overflow-hidden bg-[#e8edf0]">
                <img
                  src={overviewImage}
                  alt="Architectural façade project photography from BEMCO's image library"
                  loading="lazy"
                  className="homepage-overview-img h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white sm:bottom-7 sm:left-7">
                  Aluminium · Glass · Façades
                </span>
              </div>
              <figcaption className="mt-2 flex items-start justify-between gap-3 border-t border-ink/15 pt-2 text-[0.65rem] leading-relaxed text-muted-foreground max-md:sr-only">
                <span>Architectural project photography</span>
                <span className="text-right">
                  Project and image association pending confirmation
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HomepageMission() {
  const isMobile = useIsMobile();
  return (
    <section
      id="mission"
      className="homepage-motion homepage-mission relative isolate scroll-mt-20 overflow-hidden bg-[#102432] py-10 text-white md:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[9%] hidden w-px bg-white/10 lg:block"
      />
      <div className="container-x relative">
        <div className="flex items-center gap-5 border-b border-white/15 pb-3">
          <span className="text-xs font-semibold tracking-[0.24em] text-brand-green">
            01 / PURPOSE
          </span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="hidden text-xs uppercase tracking-[0.2em] text-white/45 sm:block">
            BEMCO · Riyadh
          </span>
        </div>
        <div className="relative grid gap-5 pt-5 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:pt-7 lg:gap-12">
          <Reveal>
            <div className="space-y-4">
              <p className="display select-none text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.8] tracking-[-0.08em] text-white/[0.09]">
                MISSION
              </p>
              <p className="eyebrow !text-brand-green">Our mission</p>
              <p className="max-w-sm text-xs leading-relaxed text-white/55">
                Professional engineering, precise fabrication and quality installation.
              </p>
            </div>
            <h2 className="homepage-mission-statement display mt-6 max-w-4xl text-2xl leading-[1.2] text-white sm:text-3xl md:text-4xl">
              {companyProfileContent.missionTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">
              {companyProfileContent.mission}
            </p>
            <details className="group mt-3 max-w-3xl border-t border-white/15 pt-3 text-sm leading-relaxed text-white/65">
              <summary className="w-fit cursor-pointer text-xs font-semibold text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green">
                Read the complete mission
              </summary>
              <p className="mt-3">{companyProfileContent.missionDetails}</p>
            </details>
            <div className="mt-5 flex items-center gap-4">
              <motion.span
                aria-hidden="true"
                initial={false}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: isMobile ? 0 : 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isMobile ? 0 : 0.2,
                }}
                className="homepage-mission-rule h-[2px] w-16 origin-left bg-brand-green"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Quality · Precision · Trust
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <motion.figure
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: isMobile ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="homepage-mission-visual relative mx-auto aspect-[4/3] w-full overflow-hidden bg-ink shadow-[0_18px_45px_rgba(2,6,23,0.28)]"
            >
              <Parallax
                src={images.hero2}
                alt="BEMCO mission: precision engineering and fabrication in aluminum and glass systems"
                className="absolute inset-0"
                strength={12}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081922] via-[#081922]/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#081922] to-transparent p-4 pt-12 text-white">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-brand-green">
                  Precision crafted
                </span>
                <span className="text-[0.6rem] text-white/70">BEMCO · 01</span>
              </figcaption>
            </motion.figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HomepageVision() {
  return (
    <section
      id="vision"
      className="homepage-motion homepage-vision relative scroll-mt-20 overflow-hidden bg-[#eff5f6] py-10 md:py-14"
    >
      <div className="container-x">
        <div className="mb-5 flex items-center gap-5 border-b border-ink/15 pb-3">
          <span className="text-xs font-semibold tracking-[0.24em] text-primary">
            02 / DIRECTION
          </span>
          <span className="h-px flex-1 bg-ink/15" />
          <span className="text-xs uppercase tracking-[0.2em] text-ink/45">Looking ahead</span>
        </div>
        <div className="homepage-vision-grid grid items-center gap-5 md:grid-cols-[0.9fr_1.1fr] md:gap-7 lg:gap-12">
          <Reveal delay={0.12}>
            <figure className="homepage-vision-visual relative mx-auto aspect-[4/3] w-full overflow-hidden bg-ink shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <Parallax
                src={images.hero3}
                alt="Modern glazed building façade"
                className="homepage-vision-parallax absolute inset-0"
                strength={10}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-12 text-white">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-brand-green">
                  Engineering for the built environment
                </span>
                <span className="text-[0.6rem] text-white/70">BEMCO · 02</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Our vision</p>
            <h2 className="display mt-3 max-w-3xl text-3xl leading-[1.08] text-ink sm:text-4xl md:text-[2.7rem]">
              {companyProfileContent.visionTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {companyProfileContent.vision}
            </p>
            <details className="group mt-3 max-w-xl border-t border-ink/15 pt-3 text-sm leading-relaxed text-muted-foreground">
              <summary className="w-fit cursor-pointer text-xs font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Read the complete vision
              </summary>
              <p className="mt-3">{companyProfileContent.visionDetails}</p>
            </details>
            <div className="mt-5">
              <ArrowLink to="/services" variant="text">
                Explore our capabilities
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CeoMessage() {
  const isMobile = useIsMobile();
  return (
    <section className="homepage-motion homepage-ceo relative overflow-hidden bg-white py-10 md:py-14">
      <div className="container-x">
        <div className="mb-5 flex items-center gap-5 border-b border-border pb-3">
          <span className="text-xs font-semibold tracking-[0.24em] text-primary">LEADERSHIP</span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            BEMCO Aluminum &amp; Glass
          </span>
        </div>
        <div className="homepage-ceo-grid grid items-start gap-6 md:grid-cols-[1fr_220px] md:gap-8 lg:grid-cols-[1fr_250px] lg:gap-12">
          <Reveal delay={0.08}>
            <p className="eyebrow">Message from the CEO</p>
            <h2 className="display mt-3 text-2xl text-ink sm:text-3xl md:text-4xl">
              Built on quality, precision and trust.
            </h2>
            <p className="homepage-ceo-copy mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              At BEMCO Aluminum &amp; Glass, we believe that every successful project begins with a
              commitment to quality, precision, and trust.
            </p>
            <details className="homepage-ceo-full group mt-3 max-w-3xl border-t border-border pt-3">
              <summary className="w-fit cursor-pointer list-none text-xs font-semibold text-primary transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                <span className="group-open:hidden">Read the full CEO message</span>
                <span className="hidden group-open:inline">Close full message</span>
              </summary>
              <div className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">
                <p>
                  Since our establishment, we have focused on strengthening our technical
                  capabilities, improving our fabrication processes, and building lasting
                  relationships with our clients, consultants, contractors, and business partners.
                </p>
                <p>
                  We understand that every project comes with unique requirements and expectations.
                  Through teamwork, technical expertise, and a quality-driven approach, we strive to
                  turn architectural concepts into practical, reliable, and visually refined
                  solutions.
                </p>
                <p>
                  As we continue to develop our capabilities, we remain committed to continuous
                  improvement, responsible project execution, and client satisfaction. I would like
                  to thank our valued clients, partners, and dedicated team for their continued
                  trust and contribution to our journey.
                </p>
              </div>
            </details>
            <p className="mt-4 border-t border-border pt-3 text-sm font-semibold text-ink">
              Eng. Mudassar Sulehri
              <span className="mt-1 block font-normal text-muted-foreground">
                Chief Executive Officer, BEMCO Aluminum &amp; Glass
              </span>
            </p>
          </Reveal>
          <Reveal>
            <motion.figure
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: isMobile ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="homepage-ceo-portrait relative mx-auto w-full max-w-[220px] md:max-w-none"
            >
              <div className="homepage-ceo-frame absolute -bottom-2 -left-2 right-3 top-3 border border-primary/40" />
              <img
                src={ceoPortrait}
                alt="Eng. Mudassar Sulehri, Chief Executive Officer of BEMCO Aluminum & Glass"
                loading="lazy"
                className="homepage-ceo-img relative aspect-[4/5] w-full object-cover object-[center_28%]"
              />
              <figcaption className="relative flex flex-col items-start gap-1 border-b border-primary bg-ink px-3 py-3 text-white">
                <span className="text-xs font-semibold">Eng. Mudassar Sulehri</span>
                <span className="text-left text-[0.65rem] leading-relaxed text-white/70">
                  Chief Executive Officer
                  <br />
                  BEMCO Aluminum &amp; Glass
                </span>
              </figcaption>
            </motion.figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

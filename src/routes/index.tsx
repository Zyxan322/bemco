import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import {
  BeforeAfter,
  CtaBand,
  FactsStrip,
  ProductGrid,
  ProjectCarousel,
  SectionHead,
} from "@/components/site/Sections";
import { ArrowLink } from "@/components/site/motion";
import {
  CurtainWallFeature,
  ExpertiseExplorer,
  HomeCapabilities,
  MissionStatement,
  ProjectJourney,
  QualityAndIndustries,
  VisionStatement,
  WhyBemco,
} from "@/components/site/HomeStory";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "BEMCO Aluminium & Glass | Architectural Façades, Riyadh" },
      {
        name: "description",
        content:
          "Architectural aluminium, glazing and façade systems designed, fabricated and installed from Riyadh.",
      },
      { property: "og:title", content: "BEMCO Aluminium & Glass" },
      {
        property: "og:description",
        content: "Architectural aluminium and glazing systems from Riyadh.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroCarousel />
      <ProjectJourney />
      <section className="bg-[#f4f6f7] py-8 md:py-12">
        <div className="container-x">
          <FactsStrip />
        </div>
      </section>
      <HomeCapabilities />
      <MissionStatement />
      <VisionStatement />
      <ExpertiseExplorer />
      <section className="bg-[#eff5f6] py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            eyebrow="Our Services"
            title="Excellence in architecture & engineering"
            text="We consult, design, engineer and fabricate aluminium, glass and façade systems for projects across Saudi Arabia."
          />
          <div className="mt-12">
            <ProductGrid category="Service" action="Explore Service" />
          </div>
        </div>
      </section>
      <CurtainWallFeature />
      <section className="container-x py-24">
        <SectionHead
          eyebrow="Transformation"
          title="Before & After"
          text="Drag the slider to see what a BEMCO facade system does to a building — from bare structure to a finished architectural envelope."
        />
        <div className="mt-12">
          <BeforeAfter />
        </div>
      </section>
      <section className="overflow-hidden bg-ink py-24 md:py-32">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow !text-brand-green">Selected work</p>
              <h2 className="display mt-5 text-4xl text-white md:text-5xl">
                Projects shaped around place.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/65">
                Explore selected projects from BEMCO’s portfolio.
              </p>
            </div>
            <ArrowLink to="/projects" variant="outline">
              View all projects
            </ArrowLink>
          </div>
          <ProjectCarousel />
        </div>
      </section>
      <WhyBemco />
      <QualityAndIndustries />
      <CtaBand />
    </>
  );
}

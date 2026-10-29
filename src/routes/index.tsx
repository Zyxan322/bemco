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
import { ArrowLink, Reveal } from "@/components/site/motion";
import {
  CeoMessage,
  HomepageCompanyOverview,
  HomepageMission,
  HomepageVision,
} from "@/components/site/HomepageEditorial";
import {
  CurtainWallFeature,
  ExpertiseExplorer,
  HomeCapabilities,
  ProjectJourney,
  QualityAndIndustries,
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
      <HomepageCompanyOverview />
      <HomepageMission />
      <HomepageVision />
      <CeoMessage />
      <section className="bg-[#f4f6f7] py-12 md:py-16">
        <div className="container-x">
          <SectionHead
            eyebrow="Company statistics"
            title="BEMCO at a glance."
            text="Company figures reported in BEMCO’s existing company information."
          />
          <div className="mt-8">
            <FactsStrip />
          </div>
        </div>
      </section>
      <section className="container-x py-20 md:py-28">
        <SectionHead
          eyebrow="Products & systems"
          title="Architectural systems for project requirements."
          text="Explore BEMCO’s listed aluminium, glass and façade product systems."
        />
        <div className="mt-12">
          <ProductGrid category="System" action="Explore System" />
        </div>
      </section>
      <HomeCapabilities />
      <section className="overflow-hidden bg-ink py-24 md:py-32">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <p className="eyebrow !text-brand-green">Featured projects</p>
              <h2 className="display mt-5 text-4xl text-white md:text-5xl">
                Projects shaped around place.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/65">
                Explore selected project listings from BEMCO’s portfolio. Project image associations
                are marked for review where not yet verified.
              </p>
            </Reveal>
            <ArrowLink to="/projects" variant="outline">
              View all projects
            </ArrowLink>
          </div>
          <ProjectCarousel />
        </div>
      </section>
      <section className="container-x py-24">
        <SectionHead
          eyebrow="Image review"
          title="Before & after comparison"
          text="The current image files do not include project provenance. These images are marked for BEMCO review and are not presented as verified project work."
        />
        <div className="mt-12">
          <Reveal>
            <BeforeAfter />
          </Reveal>
        </div>
      </section>
      <ProjectJourney />
      <ExpertiseExplorer />
      <CurtainWallFeature />
      <WhyBemco />
      <QualityAndIndustries />
      <CtaBand />
    </>
  );
}

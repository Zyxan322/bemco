import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, ProductGrid, SectionHead } from "@/components/site/Sections";
import { PageHero } from "@/components/site/motion";
import { images } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Our Services | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content: "Explore BEMCO's aluminium, glass and façade systems, from SAPHIR and GEODE MX to OPALE CA and TECHNAL.",
      },
      { property: "og:title", content: "Our Services | BEMCO Aluminium & Glass" },
      {
        property: "og:description",
        content: "Explore BEMCO's aluminium, glass and façade systems, from SAPHIR and GEODE MX to OPALE CA and TECHNAL.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="We shape the life of tomorrow."
        text="We consult, design, engineer and fabricate aluminium, glass and façade systems for projects across Saudi Arabia."
        img={images.hero2}
      />
      <section className="container-x py-24">
        <SectionHead
          eyebrow="Architecture & Engineering"
          title="Explore our systems"
          text="Discover the aluminium and glazing systems we design and manufacture for contemporary buildings."
        />
        <div className="mt-12">
          <ProductGrid category="Service" action="Explore Service" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

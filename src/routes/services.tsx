import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/Sections";
import { PageHero } from "@/components/site/motion";
import { images } from "@/lib/site";
import { FrequentlyAskedQuestions, ServicesOverview } from "@/components/site/HomeStory";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Our Services | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content:
          "Explore BEMCO's aluminium, glass and façade systems, from SAPHIR and GEODE MX to OPALE CA and TECHNAL.",
      },
      { property: "og:title", content: "Our Services | BEMCO Aluminium & Glass" },
      {
        property: "og:description",
        content:
          "Explore BEMCO's aluminium, glass and façade systems, from SAPHIR and GEODE MX to OPALE CA and TECHNAL.",
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
        title="Aluminium, glass & façade solutions."
        text="BEMCO consults, designs, engineers and manufactures products for architectural projects, with installation among its stated capabilities."
        img={images.hero2}
      />
      <ServicesOverview />
      <FrequentlyAskedQuestions includeContact />
      <CtaBand />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { companyStatistics, images } from "@/lib/site";
import { ManufacturingOverview } from "@/components/site/HomeStory";
export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Manufacturing | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content: `A factory of more than ${companyStatistics.factoryAreaSqm.toLocaleString("en-US")} m² with capacity of ${companyStatistics.annualProductionCapacitySqm.toLocaleString("en-US")} m² of windows and doors a year.`,
      },
      { property: "og:title", content: "Manufacturing | BEMCO" },
      {
        property: "og:description",
        content: `A factory of more than ${companyStatistics.factoryAreaSqm.toLocaleString("en-US")} m² with capacity of ${companyStatistics.annualProductionCapacitySqm.toLocaleString("en-US")} m² of windows and doors a year.`,
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Riyadh-based manufacturing."
        text="BEMCO's reported factory area and annual processing capacity are shown below, alongside its manufacturing capabilities."
        img={images.hero3}
      />
      <ManufacturingOverview />
      <CtaBand />
    </>
  ),
});

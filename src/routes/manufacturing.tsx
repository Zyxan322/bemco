import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { ManufacturingOverview } from "@/components/site/HomeStory";
export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Manufacturing | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content:
          "A factory of more than 2,000 m² with capacity of 45,000 m² of windows and doors a year.",
      },
      { property: "og:title", content: "Manufacturing | BEMCO" },
      {
        property: "og:description",
        content:
          "A factory of more than 2,000 m² with capacity of 45,000 m² of windows and doors a year.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Riyadh-based manufacturing."
        text="BEMCO reports a factory area exceeding 2,000 m² and annual production capacity of 45,000 m² for windows and doors, including glass panels."
        img={images.hero3}
      />
      <ManufacturingOverview />
      <CtaBand />
    </>
  ),
});

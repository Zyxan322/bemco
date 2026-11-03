import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { ProjectsPortfolio } from "@/components/site/ProjectsPortfolio";
export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Our Projects | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content:
          "Explore BEMCO's commercial, industrial, healthcare, education and residential projects in Saudi Arabia.",
      },
      { property: "og:title", content: "Our Projects | BEMCO" },
      {
        property: "og:description",
        content:
          "Explore BEMCO's commercial, industrial, healthcare, education and residential projects in Saudi Arabia.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="BEMCO Project Portfolio"
        title="Our Projects"
        text="Selected Projects & Completed Works"
        img={images.hero2}
      />
      <section className="container-x py-16 md:py-24">
        <p className="max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Our portfolio showcases BEMCO&apos;s expertise in architectural aluminum and glass
          solutions across commercial, residential, healthcare, educational, and institutional
          developments. Each project reflects our commitment to quality, precision, and
          architectural excellence.
        </p>
        <div className="mt-10">
          <ProjectsPortfolio />
        </div>
      </section>
      <CtaBand />
    </>
  ),
});

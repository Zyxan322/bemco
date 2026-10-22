import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { projects } from "@/lib/site";
import { ProjectCarousel, ProjectMosaic, SectionHead } from "@/components/site/Sections";
export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Our Projects | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content: "Façade and glazing work across Riyadh, Al-Ahsa, Abha and beyond.",
      },
      { property: "og:title", content: "Our Projects | BEMCO" },
      {
        property: "og:description",
        content: "Façade and glazing work across Riyadh, Al-Ahsa, Abha and beyond.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Our Projects"
        text="Explore selected architectural aluminium, glass and façade projects from BEMCO’s portfolio."
        img={projects[0]!.img}
      />
      <section className="container-x py-20 md:py-28">
        <SectionHead
          eyebrow="Selected work"
          title="Projects across a range of building types."
          text="Project names and locations are presented as currently listed in BEMCO’s portfolio."
        />
        <div className="mt-12">
          <ProjectMosaic />
        </div>
      </section>
      <section className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Explore the portfolio"
            title="A closer look at selected projects."
          />
          <div className="mt-10">
            <ProjectCarousel />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  ),
});

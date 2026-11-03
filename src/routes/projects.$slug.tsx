import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero, Reveal } from "@/components/site/motion";
import { CtaBand, SectionHead } from "@/components/site/Sections";
import { projects } from "@/lib/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.project.name} | BEMCO Projects` },
      {
        name: "description",
        content: `${loaderData.project.category} project in ${loaderData.project.location}, featured in BEMCO's company profile.`,
      },
      { property: "og:title", content: `${loaderData.project.name} | BEMCO Projects` },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") {
        setActiveImage((index) => (index === null ? null : (index + 1) % project.images.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((index) =>
          index === null ? null : (index - 1 + project.images.length) % project.images.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, project.images.length]);

  const nextImage = () =>
    setActiveImage((index) => (index === null ? null : (index + 1) % project.images.length));
  const previousImage = () =>
    setActiveImage((index) =>
      index === null ? null : (index - 1 + project.images.length) % project.images.length,
    );

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        text={project.location}
        img={project.images[0]}
      />
      <section className="container-x py-14 md:py-20">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All projects
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Project overview</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-4xl">{project.name}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-3xl leading-relaxed text-muted-foreground md:text-lg">
              Featured in BEMCO&apos;s company profile, this {project.category.toLowerCase()} project
              is located in {project.location}. The gallery shows the supplied project imagery.
              BEMCO provides architectural aluminum, glass, and façade solutions; contact the team
              for confirmed details about this project&apos;s scope.
            </p>
          </Reveal>
        </div>

        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5 border-y border-border py-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </dt>
            <dd className="mt-2 font-semibold text-ink">{project.category}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Location
            </dt>
            <dd className="mt-2 flex items-center gap-2 font-semibold text-ink">
              <MapPin aria-hidden="true" className="h-4 w-4 text-primary" />
              {project.location}
            </dd>
          </div>
        </dl>

        <div className="mt-12">
          <SectionHead
            eyebrow="Project gallery"
            title="In pictures"
            text="Photographs supplied with BEMCO's company profile."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.images.map((image, index) => (
              <Reveal key={image} delay={(index % 3) * 0.06}>
                <button
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View ${project.name} photo ${index + 1}`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <img
                    src={image}
                    alt={`${project.name} — project photo ${index + 1}`}
                    width={1200}
                    height={900}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <Link
          to="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
        >
          Enquire about a project <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>

      <section className="bg-[#eff5f6] py-16 md:py-20">
        <div className="container-x">
          <SectionHead eyebrow="Explore more" title="Related projects" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedProjects.map((related, index) => (
              <Reveal key={related.slug} delay={index * 0.07}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: related.slug }}
                  className="group flex h-full items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-primary"
                >
                  <img
                    src={related.images[0]}
                    alt=""
                    width={96}
                    height={72}
                    loading="lazy"
                    className="h-20 w-24 shrink-0 rounded-lg object-cover"
                  />
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {related.category}
                    </span>
                    <span className="mt-1 block font-bold text-ink group-hover:text-primary">
                      {related.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {related.location}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} image gallery`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close image gallery"
            className="absolute right-4 top-4 z-10 rounded-full border border-white/30 p-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          {project.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 p-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-8"
              >
                <ChevronLeft aria-hidden="true" className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 p-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8"
              >
                <ChevronRight aria-hidden="true" className="h-6 w-6" />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-6xl">
            <img
              src={project.images[activeImage]}
              alt={`${project.name} — project photo ${activeImage + 1}`}
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/75">
              {project.name} · {activeImage + 1} / {project.images.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

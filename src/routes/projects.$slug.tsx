import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/motion";
import { CtaBand, SectionHead } from "@/components/site/Sections";
import { images, projects } from "@/lib/site";
import { Reveal } from "@/components/site/motion";

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
        content: `${loaderData.project.type} project listed in ${loaderData.project.location} in BEMCO's current portfolio.`,
      },
      { property: "og:title", content: `${loaderData.project.name} | BEMCO Projects` },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${project.type} · Project listing`}
        title={project.name}
        text={`A ${project.type.toLowerCase()} project listed in ${project.location} in BEMCO’s current portfolio.`}
        img={images.hero2}
      />
      <section className="container-x py-16 md:py-24">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                <img
                  src={project.img}
                  alt={`${project.name} project image; project association pending verification`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-2 text-xs font-semibold text-white">
                  Image pending BEMCO verification
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The project image is shown for review only. Its association with this project has
                not been independently confirmed.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-ink">Project overview</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                BEMCO’s current project listing identifies this as a {project.type.toLowerCase()}{" "}
                project in {project.location}. Further project-specific information has not been
                provided in the existing website content.
              </p>
            </section>
            <dl className="grid gap-5 border-y border-border py-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Industry
                </dt>
                <dd className="mt-2 font-semibold text-ink">{project.type}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Location
                </dt>
                <dd className="mt-2 flex items-center gap-2 font-semibold text-ink">
                  <MapPin className="h-4 w-4 text-primary" /> {project.location}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Client
                </dt>
                <dd className="mt-2 text-muted-foreground">
                  Client details are not verified in the available project information.
                </dd>
              </div>
            </dl>
            <section>
              <h2 className="text-xl font-bold text-ink">Scope & engineering</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Project-specific scope, engineering solutions and technical specifications have not
                been supplied. Contact BEMCO for confirmed details.
              </p>
            </section>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
            >
              Enquire about a project <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
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
                  className="block rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {related.type}
                  </span>
                  <h3 className="mt-2 font-bold text-ink">{related.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{related.location}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

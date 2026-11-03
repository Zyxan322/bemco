import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { projectCategories, projects, type ProjectCategory } from "@/lib/site";
import { Reveal } from "./motion";

type ProjectFilter = ProjectCategory | "All Projects";

export function ProjectsPortfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All Projects");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return projects.filter(
      (project) =>
        (activeFilter === "All Projects" || project.category === activeFilter) &&
      [project.name, project.location, project.category]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    );
  }, [activeFilter, query]);

  const filters: ProjectFilter[] = ["All Projects", ...projectCategories];

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                activeFilter === filter
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-ink hover:border-primary hover:text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Search projects by name, location, or category</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, location, or category"
            className="h-12 w-full rounded-full border border-border bg-white pl-11 pr-5 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
      </p>

      {filteredProjects.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 0.06}>
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={project.images[0]}
                    alt={`${project.name}, ${project.location}`}
                    width={1200}
                    height={900}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
                    {project.category}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug text-ink">
                    {project.name}
                  </h2>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                    {project.location}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View Project Details
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center">
          <h2 className="text-xl font-bold text-ink">No projects found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different project name or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter("All Projects");
              setQuery("");
            }}
            className="mt-5 text-sm font-semibold text-primary hover:underline"
          >
            Clear search and filters
          </button>
        </div>
      )}
    </>
  );
}

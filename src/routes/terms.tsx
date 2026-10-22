import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { ArrowLink, Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Terms of Use | BEMCO Aluminium & Glass" },
      { name: "description", content: "Terms for using the BEMCO website." },
      { property: "og:title", content: "Terms of Use | BEMCO" },
      { property: "og:description", content: "Terms for using the BEMCO website." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Terms of Use"
        title="Using this website"
        text="Please keep these general website terms in mind when browsing BEMCO’s information and contacting the company."
        img={images.detail}
      />
      <section className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-[0.65fr_1.35fr]">
        <Reveal>
          <p className="eyebrow">Website information</p>
          <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
            A starting point for a project conversation.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Website descriptions are general information and do not replace project-specific design,
            engineering or contractual documents.
          </p>
          <div className="mt-7">
            <ArrowLink to="/contact" variant="text">
              Discuss your project
            </ArrowLink>
          </div>
        </Reveal>
        <div className="space-y-8">
          {[
            [
              "General information",
              "Product and service descriptions are provided for general information. Availability, system configuration, technical suitability, performance and scope must be confirmed for each project against applicable specifications and approved documentation.",
            ],
            [
              "Project enquiries",
              "Submitting an enquiry or contacting BEMCO does not by itself create a contract, quotation acceptance or commitment to undertake work. Any agreed scope and terms should be documented separately by the parties.",
            ],
            [
              "Accuracy and updates",
              "BEMCO may update website information over time. The company makes reasonable efforts to keep descriptions useful, but visitors should confirm current information directly before relying on it for a project decision.",
            ],
            [
              "Website content and links",
              "The BEMCO name, logo, original text and media are presented for company information. Third-party websites linked from this site are governed by their own terms and privacy practices.",
            ],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article className="border-b border-border pb-7">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  ),
});

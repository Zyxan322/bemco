import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { BeforeAfter, CtaBand, FactsStrip, ProductGrid, ProjectCarousel, ProjectMosaic, SectionHead, Timeline } from "@/components/site/Sections";
import { ArrowLink, Parallax } from "@/components/site/motion";
import { images } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "BEMCO Aluminium & Glass | Architectural Façades, Riyadh" }, { name: "description", content: "Architectural aluminium, glazing and façade systems designed, fabricated and installed from Riyadh." }, { property: "og:title", content: "BEMCO Aluminium & Glass" }, { property: "og:description", content: "Architectural aluminium and glazing systems from Riyadh." }] }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroCarousel />
      <section className="container-x grid items-center gap-12 py-28 lg:grid-cols-2">
        <Parallax src={images.detail} alt="Aluminium frame detail" className="aspect-[4/5] rounded-2xl" />
        <div>
          <SectionHead eyebrow="Welcome to BEMCO" title="Built on Precision. Defined by Quality." text="Founded in January 2017, Building Experts Co. for Metal Industries designs, engineers, fabricates and installs façade systems and architectural aluminium & glass across Saudi Arabia and the Gulf." />
          <div className="mt-8"><ArrowLink to="/about">Discover BEMCO</ArrowLink></div>
        </div>
      </section>
      <section className="container-x pb-24"><FactsStrip /></section>
      <section className="container-x py-24">
        <SectionHead eyebrow="Our Services" title="Excellence in architecture & engineering" text="We consult, design, engineer and fabricate aluminium, glass and façade systems for projects across Saudi Arabia." />
        <div className="mt-12"><ProductGrid category="Service" action="Explore Service" /></div>
      </section>
      <section className="container-x py-24">
        <SectionHead eyebrow="Transformation" title="Before & After" text="Drag the slider to see what a BEMCO facade system does to a building — from bare structure to a finished architectural envelope." />
        <div className="mt-12"><BeforeAfter /></div>
      </section>
      <section className="container-x py-24"><SectionHead eyebrow="Signature Projects" title="Selected work" /><div className="mt-12"><ProjectMosaic /></div><div className="mt-10"><ArrowLink to="/projects">View All Projects</ArrowLink></div></section>
      <section className="container-x py-24"><SectionHead eyebrow="General project workflow" title="How we work" /><div className="mt-14"><Timeline /></div></section>
      <section className="container-x py-24"><SectionHead eyebrow="Featured" title="Featured projects" /><div className="mt-12"><ProjectCarousel /></div></section>
      <CtaBand />
    </>
  );
}

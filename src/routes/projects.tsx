import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { ProjectMosaic } from "@/components/site/Sections";
export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "Our Projects | BEMCO Aluminium & Glass" }, { name: "description", content: "Façade and glazing work across Riyadh, Al-Ahsa, Abha and beyond." }, { property: "og:title", content: "Our Projects | BEMCO" }, { property: "og:description", content: "Façade and glazing work across Riyadh, Al-Ahsa, Abha and beyond." }] }),
  component: () => (<><PageHero eyebrow="Our Projects" title="Our Projects" text="Façade and glazing work across Riyadh, Al-Ahsa, Abha and beyond." img={images.cta} /><section className="container-x py-24"><ProjectMosaic /></section><CtaBand /></>),
});

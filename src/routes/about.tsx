import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { FactsStrip } from "@/components/site/Sections";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "About Us | BEMCO Aluminium & Glass" }, { name: "description", content: "Building Experts Co. for Metal Industries, founded in January 2017 in Riyadh." }, { property: "og:title", content: "About Us | BEMCO" }, { property: "og:description", content: "Building Experts Co. for Metal Industries, founded in January 2017 in Riyadh." }] }),
  component: () => (<><PageHero eyebrow="About Us" title="About Us" text="Building Experts Co. for Metal Industries, founded in January 2017 in Riyadh." img={images.hero1} /><section className="container-x py-24"><FactsStrip /></section><CtaBand /></>),
});

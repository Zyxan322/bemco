import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";

export const Route = createFileRoute("/quality")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "Quality | BEMCO Aluminium & Glass" }, { name: "description", content: "Quality products, customer satisfaction and continual improvement." }, { property: "og:title", content: "Quality | BEMCO" }, { property: "og:description", content: "Quality products, customer satisfaction and continual improvement." }] }),
  component: () => (<><PageHero eyebrow="Quality" title="Quality" text="Quality products, customer satisfaction and continual improvement." img={images.detail} /><CtaBand /></>),
});

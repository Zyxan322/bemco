import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "Terms of Use | BEMCO Aluminium & Glass" }, { name: "description", content: "Terms for using the BEMCO website." }, { property: "og:title", content: "Terms of Use | BEMCO" }, { property: "og:description", content: "Terms for using the BEMCO website." }] }),
  component: () => (<><PageHero eyebrow="Terms of Use" title="Terms of Use" text="Terms for using the BEMCO website." img={images.detail} /><CtaBand /></>),
});

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "Privacy Policy | BEMCO Aluminium & Glass" }, { name: "description", content: "How BEMCO handles information you share with us." }, { property: "og:title", content: "Privacy Policy | BEMCO" }, { property: "og:description", content: "How BEMCO handles information you share with us." }] }),
  component: () => (<><PageHero eyebrow="Privacy Policy" title="Privacy Policy" text="How BEMCO handles information you share with us." img={images.detail} /><CtaBand /></>),
});

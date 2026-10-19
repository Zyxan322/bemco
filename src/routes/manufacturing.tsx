import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { Timeline } from "@/components/site/Sections";
export const Route = createFileRoute("/manufacturing")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "Manufacturing | BEMCO Aluminium & Glass" }, { name: "description", content: "A factory of more than 2,000 m² with capacity of 45,000 m² of windows and doors a year." }, { property: "og:title", content: "Manufacturing | BEMCO" }, { property: "og:description", content: "A factory of more than 2,000 m² with capacity of 45,000 m² of windows and doors a year." }] }),
  component: () => (<><PageHero eyebrow="Manufacturing" title="Manufacturing" text="A factory of more than 2,000 m² with capacity of 45,000 m² of windows and doors a year." img={images.hero3} /><section className="container-x py-24"><Timeline /></section><CtaBand /></>),
});

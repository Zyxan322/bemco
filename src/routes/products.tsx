import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { ProductGrid } from "@/components/site/Sections";
export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: "Products & Systems | BEMCO Aluminium & Glass" }, { name: "description", content: "SAPHIR, TITANE PH, GEODE MX, OPALE CA, SAPHIR & TOPAZE and Technal systems." }, { property: "og:title", content: "Products & Systems | BEMCO" }, { property: "og:description", content: "SAPHIR, TITANE PH, GEODE MX, OPALE CA, SAPHIR & TOPAZE and Technal systems." }] }),
  component: () => (<><PageHero eyebrow="Products & Systems" title="Products & Systems" text="SAPHIR, TITANE PH, GEODE MX, OPALE CA, SAPHIR & TOPAZE and Technal systems." img={images.hero2} /><section className="container-x py-24"><ProductGrid /></section><CtaBand /></>),
});

import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { ProductGrid } from "@/components/site/Sections";
import { FrequentlyAskedQuestions } from "@/components/site/HomeStory";
export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Products & Systems | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content: "SAPHIR, TITANE PH, GEODE MX, OPALE CA, SAPHIR & TOPAZE and Technal systems.",
      },
      { property: "og:title", content: "Products & Systems | BEMCO" },
      {
        property: "og:description",
        content: "SAPHIR, TITANE PH, GEODE MX, OPALE CA, SAPHIR & TOPAZE and Technal systems.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== "/products" && pathname !== "/products/") return <Outlet />;

  return (
    <>
      <PageHero
        eyebrow="Products & Systems"
        title="Systems for architectural aluminium & glazing."
        text="Explore the product families listed by BEMCO. Confirm project suitability, configuration and performance requirements with the project team."
        img={images.hero2}
      />
      <section className="container-x py-20 md:py-28">
        <ProductGrid />
      </section>
      <section className="bg-ink py-20 text-white md:py-24">
        <div className="container-x grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow !text-brand-green">System selection</p>
            <h2 className="display mt-5 text-3xl text-white md:text-4xl">
              Start with the project requirements.
            </h2>
          </div>
          <p className="leading-relaxed text-white/70">
            Opening type, building interfaces, visual intent, glazing and project specifications all
            inform a suitable system choice. Product information is a starting point; final
            selection should be checked against approved project documentation.
          </p>
        </div>
      </section>
      <FrequentlyAskedQuestions includeContact />
      <CtaBand />
    </>
  );
}

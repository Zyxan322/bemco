import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images, products } from "@/lib/site";
import { ContactEnquiry, FrequentlyAskedQuestions } from "@/components/site/HomeStory";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: products.find((product) => product.name === search.product)?.name,
  }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact Us | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content:
          "Call +966 55 44 55 348 or email info@bemcoalu.com — Istanbol St., Mashael Area, Riyadh.",
      },
      { property: "og:title", content: "Contact Us | BEMCO" },
      {
        property: "og:description",
        content:
          "Call +966 55 44 55 348 or email info@bemcoalu.com — Istanbol St., Mashael Area, Riyadh.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { product } = Route.useSearch();
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let’s discuss your project."
        text="Contact BEMCO in Riyadh to discuss your architectural aluminium, glazing or façade requirements."
        img={images.skylight}
      />
      <ContactEnquiry product={product} />
      <FrequentlyAskedQuestions />
      <CtaBand />
    </>
  );
}

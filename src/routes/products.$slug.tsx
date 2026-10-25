import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CtaBand } from "@/components/site/Sections";
import { Reveal } from "@/components/site/motion";
import { products } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((item) => item.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.product.name} | BEMCO Products & Systems` },
      { name: "description", content: loaderData.product.desc },
      { property: "og:title", content: `${loaderData.product.name} | BEMCO` },
      { property: "og:description", content: loaderData.product.desc },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const relatedProducts = product.related
    .map((id) => products.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <>
      <section className="product-detail-hero relative isolate overflow-hidden bg-[#eff5f6] py-12 md:py-16">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            <Link
              to="/products"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Products &amp; Systems
            </Link>
            <ChevronRight aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            <span aria-current="page" className="font-semibold text-ink">
              {product.name}
            </span>
          </nav>
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
            <Reveal>
              <p className="eyebrow">{product.category}</p>
              <h1 className="display mt-4 text-4xl text-ink md:text-6xl">{product.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {product.desc}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  search={{ product: product.name }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
                >
                  Request information <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#product-features"
                  className="inline-flex items-center rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  Explore system details
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <figure className="product-detail-image relative ml-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden bg-ink">
                <img
                  src={product.img}
                  alt={`${product.name} catalogue image`}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  {product.name} · {product.category}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 md:grid-cols-[0.65fr_1.35fr] md:py-20">
        <div>
          <p className="eyebrow">Product overview</p>
          <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
            {product.name} from the BEMCO catalogue.
          </h2>
        </div>
        <p className="max-w-3xl self-center text-base leading-relaxed text-muted-foreground md:text-lg">
          {product.desc} Confirm the applicable configuration and project suitability with BEMCO
          against the project requirements.
        </p>
      </section>

      {product.features.length > 0 && (
        <section id="product-features" className="bg-ink py-14 text-white md:py-20">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow !text-brand-green">Published product information</p>
              <h2 className="display mt-4 text-3xl text-white md:text-4xl">
                {product.name} details
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {product.features.map((feature, index) => (
                <Reveal key={feature} delay={index * 0.06}>
                  <article className="product-detail-feature h-full border-t border-white/20 px-1 py-5 transition-colors">
                    <span className="text-xs font-semibold tracking-[0.16em] text-brand-green">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-base font-semibold leading-relaxed text-white">
                      {feature}
                    </h3>
                  </article>
                </Reveal>
              ))}
            </div>
            {product.specifications.length > 0 && (
              <div className="mt-10 max-w-2xl">
                <h3 className="text-lg font-semibold text-white">Available specification</h3>
                <dl className="mt-4 divide-y divide-white/15 border-y border-white/15">
                  {product.specifications.map((specification) => (
                    <div
                      key={specification.label}
                      className="grid gap-2 py-4 sm:grid-cols-[1fr_1fr]"
                    >
                      <dt className="text-sm text-white/60">{specification.label}</dt>
                      <dd className="text-sm font-semibold text-white">{specification.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/60">
              Product information is limited to details in BEMCO’s current catalogue. Final
              specifications and configuration should be confirmed with the BEMCO team.
            </p>
            <Link
              to="/contact"
              search={{ product: product.name }}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Enquire about {product.name} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="container-x py-14 md:py-20">
          <Reveal>
            <p className="eyebrow">Explore the catalogue</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
              Related products &amp; systems
            </h2>
          </Reveal>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                to="/products/$slug"
                params={{ slug: related.slug }}
                className="group border-t border-border p-4 transition-colors hover:border-primary"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {related.category}
                </p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <h3 className="font-bold text-ink">{related.name}</h3>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{related.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}

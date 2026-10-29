import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageHero, Reveal } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images, products } from "@/lib/site";
import { submitEnquiry } from "@/lib/enquiry";

const projectTypes = [
  "Commercial building",
  "Residential development",
  "Hospitality",
  "Healthcare",
  "Institutional",
  "Industrial",
  "Other",
];

const serviceOptions = [
  "Curtain wall & façade systems",
  "Structural glazing",
  "Aluminium windows & doors",
  "Glass panels & skylights",
  "Fabrication & installation",
  "Technical consultation",
];

function QuotationRequest() {
  const submitEnquiryFn = useServerFn(submitEnquiry);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const services = data.getAll("services");
    const selectedProducts = data.getAll("products");
    const message = [
      "BEMCO quotation request",
      "",
      `Contact name: ${data.get("name")}`,
      `Work email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      "",
      `Project name: ${data.get("projectName")}`,
      `Project type: ${data.get("projectType")}`,
      `Project location: ${data.get("location")}`,
      `Project stage: ${data.get("stage") || "Not specified"}`,
      `Approximate area: ${data.get("area") ? `${data.get("area")} m²` : "Not specified"}`,
      `Services of interest: ${services.length ? services.join(", ") : "To be discussed"}`,
      `Product systems of interest: ${selectedProducts.length ? selectedProducts.join(", ") : "To be discussed"}`,
      "",
      "Project brief:",
      String(data.get("brief")),
    ].join("\n");

    setSubmitting(true);
    setNotice(null);
    try {
      await submitEnquiryFn({
        data: {
          name: String(data.get("name") ?? ""),
          company: String(data.get("company") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          subject: `Quotation request: ${String(data.get("projectName") ?? "")}`,
          message,
          website: String(data.get("website") ?? ""),
        },
      });
      setNotice({ type: "success", message: "Your quotation request has been sent to BEMCO." });
      form.reset();
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your request. Please try again or contact BEMCO directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Project quotation"
        title="Let’s understand your project."
        text="Share the project scope, location and systems you are considering. BEMCO’s team can review the information and follow up with you."
        img={images.hero2}
      />
      <section className="bg-[#f4f6f7] py-16 md:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="lg:sticky lg:top-28">
            <aside>
              <p className="eyebrow">Quotation request</p>
              <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
                A few project details help us get started.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                This is different from a general contact enquiry: use this form to outline a project
                and indicate the scope you would like BEMCO to consider.
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  "Tell us what kind of building or project you have.",
                  "Select the services and product systems you want to discuss.",
                  "Include your location and any known project area.",
                  "Add relevant context to your project brief.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
                Prefer to talk first? Call{" "}
                <a
                  href="tel:+966554455348"
                  className="font-semibold text-primary transition-colors duration-200 hover:underline"
                >
                  +966 55 44 55 348
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:info@bemcoalu.com"
                  className="font-semibold text-primary transition-colors duration-200 hover:underline"
                >
                  info@bemcoalu.com
                </a>
                .
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="space-y-8 rounded-3xl border border-border bg-white p-6 shadow-soft md:p-10"
            >
              <fieldset className="space-y-5">
                <legend className="text-xl font-bold text-ink">1. Your contact details</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-ink">
                    Name *
                    <input
                      name="name"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink">
                    Work email *
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink">
                    Company
                    <input
                      name="company"
                      maxLength={120}
                      autoComplete="organization"
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink">
                    Phone
                    <input
                      name="phone"
                      type="tel"
                      maxLength={40}
                      autoComplete="tel"
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-5 border-t border-border pt-7">
                <legend className="text-xl font-bold text-ink">2. Project information</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-ink">
                    Project name *
                    <input
                      name="projectName"
                      required
                      maxLength={80}
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink">
                    Project type *
                    <select
                      name="projectType"
                      required
                      defaultValue=""
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        Select project type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-ink">
                    Project location *
                    <input
                      name="location"
                      required
                      placeholder="City, country"
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="text-sm font-semibold text-ink">
                    Current project stage
                    <select
                      name="stage"
                      defaultValue=""
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select if known</option>
                      <option>Concept / planning</option>
                      <option>Design development</option>
                      <option>Tender / quotation</option>
                      <option>Under construction</option>
                      <option>Other / not sure</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-ink sm:col-span-2">
                    Approximate façade or system area (m²)
                    <input
                      name="area"
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      className="mt-2 block w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-xs"
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-5 border-t border-border pt-7">
                <legend className="text-xl font-bold text-ink">3. Scope to discuss</legend>
                <p className="text-sm text-muted-foreground">
                  Select any that apply, or leave blank if you would like guidance.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {serviceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-sm text-foreground transition-colors hover:border-primary"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        className="mt-0.5 h-4 w-4 accent-primary"
                      />
                      {service}
                    </label>
                  ))}
                </div>
                <fieldset>
                  <legend className="text-sm font-semibold text-ink">
                    Product system (optional)
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {products.map((product) => (
                      <label
                        key={product.id}
                        className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary"
                      >
                        <input
                          type="checkbox"
                          name="products"
                          value={product.name}
                          className="h-3.5 w-3.5 accent-primary"
                        />
                        {product.name}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-sm font-semibold text-ink">
                  Project brief *
                  <textarea
                    name="brief"
                    required
                    minLength={10}
                    maxLength={4000}
                    rows={5}
                    placeholder="Describe the work you would like BEMCO to review."
                    className="mt-2 block w-full resize-y rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </fieldset>

              <label
                aria-hidden="true"
                className="absolute -left-[10000px] h-px w-px overflow-hidden"
              >
                Leave this field empty
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="border-t border-border pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-60"
                >
                  {submitting ? "Sending request…" : "Send quotation request"}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Your request is sent securely to BEMCO for follow-up. Do not include sensitive
                  personal or financial information.
                </p>
                <p
                  role={notice?.type === "error" ? "alert" : "status"}
                  aria-live={notice?.type === "error" ? "assertive" : "polite"}
                  className={`mt-3 text-sm ${notice?.type === "error" ? "text-destructive" : "text-primary"}`}
                >
                  {notice?.message}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export const Route = createFileRoute("/quotation")({
  head: () => ({
    meta: [
      { title: "Request a Quotation | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content:
          "Share your architectural aluminium, glass or façade project details with BEMCO in Riyadh.",
      },
      { property: "og:title", content: "Request a Quotation | BEMCO" },
      {
        property: "og:description",
        content: "Share your project scope and requirements with BEMCO.",
      },
    ],
  }),
  component: QuotationRequest,
});

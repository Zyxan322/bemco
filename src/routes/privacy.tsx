import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { images } from "@/lib/site";
import { ArrowLink, Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Privacy Policy | BEMCO Aluminium & Glass" },
      { name: "description", content: "How BEMCO handles information you share with us." },
      { property: "og:title", content: "Privacy Policy | BEMCO" },
      { property: "og:description", content: "How BEMCO handles information you share with us." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Privacy & enquiries"
        text="A straightforward overview of information you choose to share when contacting BEMCO."
        img={images.detail}
      />
      <section className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-[0.65fr_1.35fr]">
        <Reveal>
          <p className="eyebrow">Last reviewed · October 2026</p>
          <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
            Your information, used to respond.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            This page describes the contact options currently provided on this website.
          </p>
          <div className="mt-7">
            <ArrowLink to="/contact" variant="text">
              Contact BEMCO
            </ArrowLink>
          </div>
        </Reveal>
        <div className="space-y-8">
          {[
            [
              "Information you provide",
              "If you use the enquiry form, your browser prepares an email addressed to info@bemcoalu.com using your default email application. The form does not submit information to or store it on this website.",
            ],
            [
              "How enquiries are used",
              "Information you send directly by email or phone is used by BEMCO to review and respond to your enquiry and to communicate about the related business discussion.",
            ],
            [
              "Your choices",
              "You may contact BEMCO directly by phone or email instead of using the enquiry form. Do not include sensitive personal information that is not needed to discuss your project.",
            ],
            [
              "Questions about privacy",
              "For questions about information you have sent to BEMCO, contact info@bemcoalu.com. Information shared by email may remain in the email systems used by you and the recipient.",
            ],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article className="border-b border-border pb-7">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/motion";
import { CtaBand } from "@/components/site/Sections";
import { companyStatistics, images } from "@/lib/site";
import { FactsStrip } from "@/components/site/Sections";
import {
  AboutCompany,
  CompanyProfileDownload,
  MissionStatement,
  VisionStatement,
} from "@/components/site/HomeStory";
import { CeoMessage } from "@/components/site/HomepageEditorial";
import { Reveal } from "@/components/site/motion";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Us | BEMCO Aluminium & Glass" },
      {
        name: "description",
        content: `Building Experts Co. for Metal Industries, founded in January ${companyStatistics.foundedYear} in Riyadh.`,
      },
      { property: "og:title", content: "About Us | BEMCO" },
      {
        property: "og:description",
        content: `Building Experts Co. for Metal Industries, founded in January ${companyStatistics.foundedYear} in Riyadh.`,
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="About Us"
        title="Building Experts Co. for Metal Industries."
        text="A Saudi Arabia-based company specializing in architectural aluminum and glass systems."
        img={images.hero1}
      />
      <section className="bg-[#f4f6f7] py-12">
        <div className="container-x">
          <FactsStrip />
        </div>
      </section>
      <nav aria-label="About BEMCO sections" className="container-x py-10">
        <Reveal className="grid gap-3 sm:grid-cols-3">
          {[
            { href: "#company-story", label: "Company story" },
            { href: "#mission", label: "Our mission" },
            { href: "#vision", label: "Our vision" },
          ].map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ x: 4 }}
              className="group flex items-center justify-between rounded-xl border border-border bg-white px-5 py-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <span>
                <span className="mr-3 text-xs font-bold tracking-widest text-primary">
                  0{index + 1}
                </span>
                {item.label}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          ))}
        </Reveal>
      </nav>
      <div id="company-story">
        <AboutCompany />
      </div>
      <CeoMessage />
      <CompanyProfileDownload />
      <MissionStatement />
      <VisionStatement />
      <CtaBand />
    </>
  ),
});

import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/bemco-logo.webp";
import { contact, nav } from "@/lib/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { ease } from "./motion";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const path = useRouterState({ select: (s) => s.location.pathname });
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top bar: contact details */}
        <div
          className={`overflow-hidden bg-brand-green text-ink transition-all duration-500 ${scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}`}
          aria-hidden={scrolled}
        >
          <div className="container-x flex h-10 items-center justify-between gap-6 text-[0.75rem] font-semibold sm:text-[0.8rem]">
            <div className="flex items-center gap-5">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" /> {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="hidden items-center gap-2 whitespace-nowrap transition-colors hover:text-primary sm:flex"
              >
                <Mail className="h-3.5 w-3.5" /> {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="hidden items-center gap-2 whitespace-nowrap lg:flex">
                <Clock className="h-3.5 w-3.5" /> {contact.hours}
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{contact.address}</span>
                <span className="sm:hidden">{contact.addressShort}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main bar: logo, nav, CTA */}
        <div
          className={`border-b border-border bg-card transition-all duration-500 ${scrolled ? "shadow-soft" : ""}`}
        >
          <div
            className={`container-x flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? "h-16" : "h-24"}`}
          >
            <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="BEMCO home">
              <img
                src={logo}
                alt="BEMCO Aluminum logo"
                className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-14"}`}
              />
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-extrabold tracking-wide text-ink">BEMCO</span>
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Aluminium & Glass
                </span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
              {nav.map((n) => {
                const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`group relative px-3 py-2 text-[0.82rem] font-semibold transition-colors ${active ? "text-primary" : "text-ink/80 hover:text-ink"}`}
                  >
                    {n.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-green transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/quotation"
                className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ink md:inline-flex"
              >
                Request a Quotation{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="glass rounded-full border border-border p-2.5 text-ink xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] glass xl:hidden"
            initial={isMobile ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0 : 0.3 }}
          >
            <div className="container-x flex h-24 items-center justify-between">
              <img src={logo} alt="BEMCO Aluminum logo" className="h-12 w-auto" />
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-border bg-card p-2.5"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-x mt-6 flex flex-col" aria-label="Mobile">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={isMobile ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: isMobile ? 0 : 0.05 * i,
                    duration: isMobile ? 0 : 0.4,
                    ease,
                  }}
                >
                  <Link
                    to={n.to}
                    className="display flex items-center justify-between border-b border-border py-4 text-3xl text-ink"
                    activeProps={{ className: "text-primary" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label} <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/quotation"
                className="mt-8 rounded-full bg-primary px-6 py-4 text-center font-semibold text-primary-foreground"
              >
                Request a Quotation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

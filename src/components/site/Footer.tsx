import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/Bemco Logo.png";
import { companyStatistics, contact, nav, products } from "@/lib/site";
import { Counter } from "./motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <img src={logo} alt="BEMCO Aluminum logo" className="h-20 w-auto" loading="lazy" />
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            Building Experts Co. for Metal Industries — design, engineering, fabrication and
            installation of façade systems and architectural aluminium & glass, since{" "}
            <Counter to={companyStatistics.foundedYear} />.
          </p>
        </div>
        <div className="md:col-span-2">
          <h3 className="eyebrow">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-foreground/80 hover:text-primary">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="eyebrow">Systems</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {products.map((p) => (
              <li key={p.id}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="text-foreground/80 hover:text-primary"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-primary">
                <Phone className="h-4 w-4 text-primary" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {contact.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x relative">
        <div className="display select-none text-[18vw] leading-none text-ink/[0.04]">BEMCO</div>
      </div>
      <div className="container-x relative flex flex-col justify-between gap-4 border-t border-border py-8 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} BEMCO Aluminum & Glass. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}

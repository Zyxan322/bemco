import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import detail from "@/assets/detail.jpg";
import skylight from "@/assets/skylight.jpg";
import cta from "@/assets/cta.jpg";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";
import project1 from "@/assets/WhatsApp Image 2026-10-18 at 1.54.56 AM.jpeg";
import project2 from "@/assets/WhatsApp Image 2026-10-18 at 1.54.56 AM (1).jpeg";
import project3 from "@/assets/WhatsApp Image 2026-10-18 at 1.54.57 AM.jpeg";
import project4 from "@/assets/WhatsApp Image 2026-10-18 at 1.54.57 AM (1).jpeg";
import project5 from "@/assets/WhatsApp Image 2026-10-18 at 1.54.57 AM (2).jpeg";
import project6 from "@/assets/WhatsApp Image 2026-10-18 at 1.54.58 AM.jpeg";

export const images = { hero1, hero2, hero3, detail, skylight, cta, before, after };

export const contact = {
  phone: "+966 55 44 55 348",
  phoneHref: "tel:+966554455348",
  email: "info@bemcoalu.com",
  emailHref: "mailto:info@bemcoalu.com",
  address: "Istanbol St., Mashael Area, Riyadh, Kingdom of Saudi Arabia",
  addressShort: "Mashael Area, Riyadh",
  hours: "Sat–Thu, 8:00–18:00",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products & Systems" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/projects", label: "Our Projects" },
  { to: "/quality", label: "Quality" },
  { to: "/contact", label: "Contact Us" },
] as const;

// Figures as stated on bemcoaluksa.com / company profile.
export const facts = [
  { value: 2017, suffix: "", label: "Founded in January" },
  { value: 2000, suffix: "+ m²", label: "Factory area" },
  { value: 51, suffix: "+", label: "Workforce" },
  { value: 45000, suffix: " m²", label: "Annual windows & doors capacity, incl. glass panels" },
];

export const products = [
  {
    id: "saphir",
    name: "SAPHIR",
    desc: "Compatible and mixable door, casement and sliding window suites.",
    img: hero3,
  },
  {
    id: "titane-ph",
    name: "TITANE PH",
    desc: "Technal exclusive handle with optional signature logo on the pad handle.",
    img: detail,
  },
  {
    id: "geode-mx",
    name: "GEODE MX",
    desc: "Curtain wall with grid, horizontal or vertical line effects and structural glazing toggle. Infills from 6 to 42 mm.",
    img: hero2,
  },
  {
    id: "opale-ca",
    name: "OPALE CA",
    desc: "A unique structure for a wide range of personalised aesthetics.",
    img: skylight,
  },
  {
    id: "saphir-topaze",
    name: "SAPHIR & TOPAZE",
    desc: "Compatible and mixable door, casement and sliding window suites.",
    img: hero1,
  },
  {
    id: "technal",
    name: "TECHNAL",
    desc: "Technal systems with the exclusive pad handle and optional signature logo.",
    img: cta,
  },
];

export const projects = [
  { name: "Hadab Tower", location: "Riyadh", type: "Commercial", img: project1 },
  { name: "Sheikh Abdul Rahman Tower", location: "Al-Ahsa", type: "Commercial", img: project2 },
  { name: "Abha Hotel", location: "Abha", type: "Hospitality", img: project3 },
  { name: "Philippine Embassy", location: "Riyadh", type: "Institutional", img: project4 },
  { name: "Qwqaa Medical City", location: "Saudi Arabia", type: "Healthcare", img: project5 },
  { name: "Al Dawoud Building", location: "Saudi Arabia", type: "Commercial", img: project6 },
];

export const capabilities = [
  {
    title: "Architectural aluminium systems",
    desc: "Design, engineering and fabrication of aluminium systems for modern buildings.",
    img: detail,
  },
  {
    title: "Glass panels & glazing",
    desc: "Glass panels produced and fitted alongside our window and door systems.",
    img: hero2,
  },
  {
    title: "Aluminium doors & windows",
    desc: "Casement, sliding and door suites built for performance and finish.",
    img: hero3,
  },
  {
    title: "Curtain-wall façades",
    desc: "Façade systems for towers and commercial developments.",
    img: hero1,
  },
  {
    title: "Skylights",
    desc: "Glazed roof structures that bring daylight deep into buildings.",
    img: skylight,
  },
  {
    title: "Fabrication & installation",
    desc: "From our Riyadh factory to installation on site.",
    img: detail,
  },
];

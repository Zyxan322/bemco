import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import detail from "@/assets/detail.webp";
import skylight from "@/assets/skylight.webp";
import cta from "@/assets/cta.webp";
import before from "@/assets/before.png";
import after from "@/assets/after.png";
import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import project3 from "@/assets/project-3.webp";
import project4 from "@/assets/project-4.webp";
import project5 from "@/assets/project-5.webp";
import project6 from "@/assets/project-6.webp";
import companyProfilePdf from "@/assets/BEMCO Profile (1).pdf?url";

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

export const companyProfile = {
  path: companyProfilePdf,
  filename: "BEMCO-Company-Profile.pdf",
  available: true,
} as const;

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

// Figures reported in BEMCO's existing company information.
export const companyStatistics = {
  foundedYear: 2017,
  factoryAreaSqm: 2000,
  workforce: 51,
  annualProductionCapacitySqm: 45000,
} as const;

export const companyProfileContent = {
  overview:
    "BEMCO Aluminum & Glass, operating under Building Experts Co. for Metal Industries, is a Saudi Arabia-based company specializing in architectural aluminum and glass solutions. The company focuses on the design, engineering, fabrication and installation of aluminum and glazing systems for construction projects.",
  missionTitle: "Turning Architectural Designs into Practical Solutions",
  mission:
    "Our mission is to deliver reliable aluminum and glass systems through professional engineering, precise fabrication and quality installation.",
  missionDetails:
    "We strive to understand the specific requirements of every project and coordinate our work in line with approved drawings, technical specifications and client expectations. Through skilled workmanship, effective planning and collaboration between engineering, production and site teams, we aim to maintain consistent standards, meet project requirements and provide dependable service throughout the project lifecycle.",
  visionTitle: "Shaping the Future of Architectural Aluminum & Glass",
  vision:
    "To strengthen BEMCO Aluminum & Glass as a trusted provider of architectural aluminum, glazing and façade solutions in Saudi Arabia. We aspire to contribute to modern construction through innovative system solutions, advanced manufacturing practices and a consistent focus on quality.",
  visionDetails:
    "Our vision is to continuously develop our technical capabilities, enhance our production processes and build lasting relationships with clients, consultants and contractors. We aim to support evolving architectural requirements by delivering solutions that combine visual appeal, functionality and dependable performance.",
} as const;

export const facts = [
  { value: companyStatistics.foundedYear, suffix: "", label: "Founded in January" },
  { value: companyStatistics.factoryAreaSqm, suffix: "+ m²", label: "Reported factory area" },
  { value: companyStatistics.workforce, suffix: "", label: "Total listed manpower" },
  {
    value: companyStatistics.annualProductionCapacitySqm,
    suffix: "+ m²",
    label: "Reported annual capacity",
  },
];

export const products = [
  {
    id: "saphir",
    slug: "saphir",
    name: "SAPHIR",
    category: "Window & door system",
    desc: "Compatible and mixable door, casement and sliding window suites.",
    img: hero3,
    features: [
      "Door suites",
      "Casement window suites",
      "Sliding window suites",
      "Compatible and mixable suites",
    ],
    specifications: [],
    related: ["saphir-topaze", "opale-ca", "titane-ph"],
  },
  {
    id: "titane-ph",
    slug: "titane-ph",
    name: "TITANE PH",
    category: "Handle",
    desc: "Technal exclusive handle with optional signature logo on the pad handle.",
    img: detail,
    features: ["Technal exclusive handle", "Optional signature logo on the pad handle"],
    specifications: [],
    related: ["technal", "saphir", "saphir-topaze"],
  },
  {
    id: "geode-mx",
    slug: "geode-mx",
    name: "GEODE MX",
    category: "Curtain wall",
    desc: "Curtain wall with grid, horizontal or vertical line effects and structural glazing toggle. Infills from 6 to 42 mm.",
    img: hero2,
    features: [
      "Grid, horizontal or vertical line effects",
      "Structural glazing toggle",
      "Infills from 6 to 42 mm",
    ],
    specifications: [{ label: "Infill range", value: "6–42 mm" }],
    related: ["opale-ca", "saphir", "technal"],
  },
  {
    id: "opale-ca",
    slug: "opale-ca",
    name: "OPALE CA",
    category: "Curtain wall",
    desc: "A unique structure for a wide range of personalised aesthetics.",
    img: skylight,
    features: ["A structure designed for a wide range of personalised aesthetics"],
    specifications: [],
    related: ["geode-mx", "saphir", "saphir-topaze"],
  },
  {
    id: "saphir-topaze",
    slug: "saphir-topaze",
    name: "SAPHIR & TOPAZE",
    category: "Window & door system",
    desc: "Compatible and mixable door, casement and sliding window suites.",
    img: hero1,
    features: [
      "Door suites",
      "Casement window suites",
      "Sliding window suites",
      "Compatible and mixable suites",
    ],
    specifications: [],
    related: ["saphir", "opale-ca", "titane-ph"],
  },
  {
    id: "technal",
    slug: "technal",
    name: "TECHNAL",
    category: "Product system",
    desc: "Technal systems with the exclusive pad handle and optional signature logo.",
    img: cta,
    features: ["Exclusive pad handle", "Optional signature logo"],
    specifications: [],
    related: ["titane-ph", "saphir", "geode-mx"],
  },
];

export const projects = [
  {
    slug: "hadab-tower",
    name: "Hadab Tower",
    location: "Riyadh",
    type: "Commercial",
    img: project1,
  },
  {
    slug: "sheikh-abdul-rahman-tower",
    name: "Sheikh Abdul Rahman Tower",
    location: "Al-Ahsa",
    type: "Commercial",
    img: project2,
  },
  { slug: "abha-hotel", name: "Abha Hotel", location: "Abha", type: "Hospitality", img: project3 },
  {
    slug: "philippine-embassy",
    name: "Philippine Embassy",
    location: "Riyadh",
    type: "Institutional",
    img: project4,
  },
  {
    slug: "qwqaa-medical-city",
    name: "Qwqaa Medical City",
    location: "Saudi Arabia",
    type: "Healthcare",
    img: project5,
  },
  {
    slug: "al-dawoud-building",
    name: "Al Dawoud Building",
    location: "Saudi Arabia",
    type: "Commercial",
    img: project6,
  },
];

export const capabilities = [
  {
    title: "Consultation & project coordination",
    desc: "Discuss project briefs, drawings, system options and technical coordination requirements.",
    img: detail,
  },
  {
    title: "Design & engineering",
    desc: "Design and engineer architectural aluminium, glass and façade solutions for projects.",
    img: hero2,
  },
  {
    title: "Manufacturing",
    desc: "Manufacture aluminium windows, doors and glass panels at BEMCO's Riyadh facility.",
    img: hero3,
  },
  {
    title: "Fabrication & installation",
    desc: "Connect product fabrication with on-site installation as part of the agreed project scope.",
    img: hero1,
  },
  {
    title: "Quality checks & handover",
    desc: "Coordinate inspection and handover with the approved project information and site requirements.",
    img: detail,
  },
];

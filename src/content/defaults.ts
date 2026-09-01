/**
 * Canonical fallback content for the 4First Technologies marketing site
 * (web-unwrapped-3d).
 *
 * Every route renders from Supabase (via `src/lib/cms.ts`) when a row exists,
 * and falls back to these values when it doesn't — so an empty table, a failed
 * fetch, or a bad deploy never blanks the live site. Keep these in sync with the
 * CMS seed (`ft-digital-admin/supabase/migrations/0003_seed_content.sql`).
 */

import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

// ── Site settings ──────────────────────────────────────────────────────────

export interface SiteSettings {
  contact_email: string;
  contact_phone: string;
  linkedin_url: string;
  studio_address: string;
  hours: string;
  footer_tagline: string;
  og_image_url: string;
  metrics: { n: string; l: string }[];
  ticker: string[];
  socials: { label: string; href: string }[];
}

export const SITE_SETTINGS: SiteSettings = {
  contact_email: "4firsttechnologieslimited@gmail.com",
  contact_phone: "+234 906 476 8335",
  linkedin_url: "https://www.linkedin.com/company/4firsttechnologieslimited/",
  studio_address:
    "Head Office: Imo Digital City Limited, 23 Egbu Road, Owerri, Imo State, Nigeria.",
  hours: "Mon – Fri · 09:00 – 18:00 WAT",
  footer_tagline: "Smarter Tech, Safer World.",
  og_image_url: "https://4firsttechnologies.com/main-logo.png",
  metrics: [
    { n: "04", l: "Practice areas" },
    { n: "100%", l: "In-house engineering" },
    { n: "NG", l: "Rooted, global-ready" },
    { n: "2026", l: "Building since" },
  ],
  ticker: [
    "Signal, not noise.",
    "Certainty at the point of use.",
    "Built in Owerri.",
    "Shipped everywhere.",
  ],
  socials: [{ label: "Linktree", href: "https://linktr.ee/4firsttechnologieslimited" }],
};

// ── Pages (meta + hero) ────────────────────────────────────────────────────

export interface PageHero {
  eyebrow?: string | undefined;
  /** Plain text. Wrap the accent phrase in [[double brackets]] — see renderHeading(). */
  heading?: string | undefined;
  intro?: string[] | undefined;
}

export interface PageMeta {
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  canonical: string;
  hero: PageHero;
}

export const HOME_META: PageMeta = {
  meta_title: "4First Technologies — Smarter Tech, Safer World",
  meta_description:
    "Nigerian technology company building intelligent systems, secure infrastructure and AI-backed products that remove guesswork from everyday decisions.",
  og_title: "4First Technologies — Smarter Tech, Safer World",
  og_description:
    "Intelligent systems, product engineering, cybersecurity and advisory, built in Owerri, shipped everywhere.",
  canonical: "/",
  hero: {
    eyebrow: "4First Technologies Limited · Owerri, NG",
    heading: "Intelligent systems that eliminate [[uncertainty]] in everyday use.",
    intro: [
      "We're a Nigerian technology company building the invisible layer between people and their decisions — software, AI and secure infrastructure that removes the guesswork from work, mobility, and daily life.",
    ],
  },
};

export const PAGE_META: Record<string, PageMeta> = {
  home: HOME_META,
  about: {
    meta_title: "About — 4First Technologies",
    meta_description:
      "4First Technologies is a Nigerian engineering company based in Owerri, building software and embedded systems from cloud platforms to the firmware on the device.",
    og_title: "About — 4First Technologies",
    og_description:
      "An engineering company that builds across the full stack: software platforms, embedded systems, and the secure infrastructure between them.",
    canonical: "/about",
    hero: {
      eyebrow: "§ About — 01",
      heading: "Software, down to the [[silicon]].",
      intro: [
        "4First Technologies Limited is a Nigerian technology company developing innovative IoT solutions for the energy and healthcare sectors. Our flagship product, 4FG-Monitor, is a smart cylinder monitoring device that provides real-time visibility into the quantity of LPG or oxygen remaining in a cylinder. It uses weight-based sensing and GSM connectivity to deliver accurate readings and alerts, helping households, businesses, hospitals, and gas retailers improve safety, efficiency, and resource management.",
        "Beyond the device, we are building a digital gas platform that connects consumers, gas retailers, distributors, and service providers. The platform enables smarter refill planning, gas transactions, and data-driven management of the LPG ecosystem.",
        "Our vision is to build intelligent infrastructure that makes critical gas resources more visible, predictable, accessible, and easier to manage across Africa.",
      ],
    },
  },
  services: {
    meta_title: "Services — 4First Technologies",
    meta_description:
      "Four practices: intelligent systems, product engineering, cybersecurity, and advisory. Built by 4First Technologies.",
    og_title: "Services — 4First Technologies",
    og_description: "Intelligent systems, product engineering, cybersecurity, advisory.",
    canonical: "/services",
    hero: {
      eyebrow: "§ Services",
      heading: "Four practices, one [[operating system]].",
      intro: [
        "We're organised around the disciplines that most often collide in real products. Engineering, AI and cybersecurity aren't handed off between vendors — they're practised on the same team, at the same table.",
      ],
    },
  },
  work: {
    meta_title: "Work — 4First Technologies",
    meta_description:
      "A selection of ongoing and shipped work from 4First Technologies — intelligent systems built in Nigeria.",
    og_title: "Work — 4First Technologies",
    og_description: "Selected engagements and in-house products.",
    canonical: "/work",
    hero: {
      eyebrow: "§ Selected work",
      heading: "Systems in [[production]].",
      intro: [
        "A running index of what we've built, what we're building and where we've been useful. Some engagements are under NDA — reach out for a deeper conversation.",
      ],
    },
  },
  contact: {
    meta_title: "Contact — 4First Technologies",
    meta_description:
      "Get in touch with 4First Technologies. Based in Owerri, Nigeria. We reply within two working days.",
    og_title: "Contact — 4First Technologies",
    og_description: "Start a project or send a note.",
    canonical: "/contact",
    hero: {
      eyebrow: "§ Contact",
      heading: "Say the [[quiet]] part loud.",
      intro: [
        "Tell us the problem in plain language. If it's the kind of thing we can help with, you'll hear from a founder within two working days.",
      ],
    },
  },
  mission: {
    meta_title: "Our Mission — 4First Technologies",
    meta_description:
      "Our mission is to engineer innovative, accessible, and scalable technology solutions that solve real-world problems and accelerate Africa's transition into a digitally enabled economy.",
    og_title: "Our Mission — 4First Technologies",
    og_description:
      "Solving real-world problems, connecting people and businesses, and accelerating Africa's digital transformation.",
    canonical: "/mission",
    hero: {
      eyebrow: "§ Our Mission",
      heading: "Technology that [[creates]] the future.",
      intro: [
        "At 4First Technologies Limited, our mission is to develop and deploy innovative, accessible and impactful technology solutions that solve real-world problems, improve everyday experiences, strengthen businesses and institutions and contribute meaningfully to the digital transformation of Africa.",
        "We are committed to moving technology beyond ideas and prototypes into practical, scalable products and services that people, businesses, governments and communities can rely on.",
      ],
    },
  },
  vision: {
    meta_title: "Our Vision — 4First Technologies",
    meta_description:
      "To become a leading African technology innovation company, building intelligent, accessible, and scalable solutions that connect people, businesses, devices, and institutions.",
    og_title: "Our Vision — 4First Technologies",
    og_description:
      "A future where innovative technology makes everyday life smarter, industries more efficient, and communities safer.",
    canonical: "/vision",
    hero: {
      eyebrow: "§ Our Vision",
      heading: "A [[smarter]], safer world, built from Africa.",
      intro: [
        "At 4First Technologies Limited, our vision is to become a leading African technology company that builds innovative, intelligent and scalable solutions capable of transforming how people, businesses, industries and institutions operate and interact with technology.",
        "We envision a future where technology is not merely a tool used by a few, but an accessible infrastructure for solving everyday problems, creating economic opportunities, improving safety and enabling smarter decision-making across Africa and beyond.",
      ],
    },
  },
  products: {
    meta_title: "Products — 4First Technologies",
    meta_description:
      "4FG-Monitor — a smart, weight-based LPG and oxygen cylinder monitoring device from 4First Technologies. Real-time levels, low-gas alerts, and GSM connectivity for homes, hospitals, and gas retailers.",
    og_title: "Products — 4First Technologies",
    og_description:
      "4FG-Monitor: real-time cylinder monitoring for LPG and oxygen, built for Africa.",
    canonical: "/products",
    hero: {
      eyebrow: "§ Products",
      heading: "4FG-Monitor: Gas you can [[see]].",
      intro: [
        "Our flagship IoT device turns a sealed, opaque LPG or oxygen cylinder into something you can actually monitor — real-time levels, low-gas alerts, and usage history, delivered over cellular connectivity to a device that can't be hot-fixed from a laptop once it's on the wall.",
      ],
    },
  },
};

/**
 * Split a heading on a `[[accent]]` marker and wrap that span in the primary
 * colour. Falls back to plain text when there's no marker.
 */
export function renderHeading(
  heading: string | undefined,
  accentClassName = "text-primary",
): ReactNode {
  if (!heading) return null;
  const parts = heading.split(/\[\[(.+?)\]\]/);
  if (parts.length === 1) return heading;
  return createElement(
    Fragment,
    null,
    ...parts.map((part, i) =>
      i % 2 === 1
        ? createElement("span", { key: i, className: accentClassName }, part)
        : part,
    ),
  );
}

/** A guaranteed PageMeta for a slug, falling back to the home page. */
export function getPageMeta(slug: string): PageMeta {
  return PAGE_META[slug] ?? HOME_META;
}

/** Build the `head()` meta/links arrays for a route from a (possibly partial) PageMeta. */
export function buildPageHead(slug: string, m?: PageMeta | null) {
  const p = m ?? getPageMeta(slug);
  return {
    meta: [
      { title: p.meta_title },
      { name: "description", content: p.meta_description },
      { property: "og:title", content: p.og_title },
      { property: "og:description", content: p.og_description },
      { property: "og:url", content: p.canonical },
    ],
    links: [{ rel: "canonical", href: p.canonical }],
  };
}

// ── Collections ────────────────────────────────────────────────────────────

export interface Step {
  n: string;
  t: string;
  d: string;
}
export interface Discipline {
  n: string;
  title: string;
  tag: string;
  body: string;
}
export interface Point {
  n: string;
  title: string;
  body: string;
}
export interface Service {
  n: string;
  title: string;
  tag: string;
  body: string;
  deliverables: string[];
}
export interface WorkCase {
  year: string;
  kind: string;
  tag: string;
  title: string;
  body: string;
}
export interface TimelineRow {
  y: string;
  t: string;
  d: string;
}
export interface VisionPoint {
  n: string;
  title: string;
  body: string;
  quote?: string | undefined;
  chain?: string | undefined;
  list?: string[] | undefined;
}
export interface Feature {
  label: string;
}
export interface Prose {
  eyebrow?: string | undefined;
  heading?: string | undefined;
  body?: string | undefined;
  quote?: string | undefined;
  footnote?: string | undefined;
}

// Home
export const HOME_PRINCIPLES: Step[] = [
  {
    n: "01",
    t: "Certainty over cleverness",
    d: "Systems that give a straight answer beat systems that impress. We optimise for the moment the user stops guessing.",
  },
  {
    n: "02",
    t: "Intelligence as infrastructure",
    d: "AI isn't a feature, it's the wiring. We embed it where decisions happen, not where demos look good.",
  },
  {
    n: "03",
    t: "Built for African context",
    d: "Bandwidth-aware, resilient, secure. Products that hold up between Owerri and Lagos, not just on staging.",
  },
  {
    n: "04",
    t: "Cybersecurity as a first move",
    d: "Every system we ship is threat-modelled before it's beautified. Trust compounds; regret is expensive.",
  },
];

export const HOME_CAPABILITIES: Step[] = [
  {
    n: "01",
    t: "Intelligent Systems",
    d: "LLM-backed workflows, decision engines, autonomous processes.",
  },
  {
    n: "02",
    t: "Product Engineering",
    d: "Web, mobile, and backend platforms — shipped and maintained.",
  },
  { n: "03", t: "Cybersecurity", d: "Threat modelling, hardening, and incident-ready operations." },
  {
    n: "04",
    t: "Advisory",
    d: "Technology strategy for founders and mid-market operators.",
  },
];

export const HOME_PRINCIPLES_INTRO: Prose[] = [
  { eyebrow: "§ 01 — Operating principles", heading: "We build for the moment after the decision." },
];

export const HOME_CAPABILITIES_INTRO: Prose[] = [
  { eyebrow: "§ 02 — Capabilities", heading: "Four disciplines. One system of thought." },
];

export const HOME_ENGAGE: Prose[] = [
  {
    eyebrow: "§ 03 — Engage",
    heading: "Have a system worth removing the doubt from?",
  },
];

// About
export const ABOUT_DISCIPLINES: Discipline[] = [
  {
    n: "01",
    title: "Software Platforms",
    tag: "Web · Mobile · Cloud",
    body: "The systems people actually touch, web and mobile applications, APIs, and the backend platforms behind them. We design for the network conditions our users really have: bandwidth-aware frontends, resilient sync, and infrastructure that degrades gracefully instead of failing loudly.",
  },
  {
    n: "02",
    title: "Embedded Systems",
    tag: "Firmware · Sensors · Edge",
    body: "Software that lives on hardware. Microcontroller firmware, sensor integration, power-conscious design, and the discipline of shipping code that can't be hot-fixed from a laptop. When a device is on a wall in Owerri, it has to work — offline, on battery, in heat.",
  },
  {
    n: "03",
    title: "Connected Devices & IoT",
    tag: "Telemetry · OTA · Fleets",
    body: "The layer that joins the two: device provisioning, telemetry pipelines, over-the-air updates, and fleet monitoring. We treat every deployed device as a production system, observable, updatable, and accounted for from first boot to end of life.",
  },
  {
    n: "04",
    title: "Intelligent & Secure Systems",
    tag: "AI · Decision Engines · Security",
    body: "Intelligence embedded where decisions happen, anomaly detection on sensor streams, LLM-backed workflows, automated alerting. All of it threat-modelled first, because a connected device that isn't secured is a liability with an antenna.",
  },
];

export const ABOUT_BUILD_INTRO: Prose[] = [
  { eyebrow: "§ 02 — What we build", heading: "Four disciplines, one signal path." },
];

export const ABOUT_ENGINEERING: Prose[] = [
  {
    eyebrow: "§ 03 — How we engineer",
    heading: "Constraints are the curriculum.",
    body: "Building for devices in the field teaches habits that make every system better — including the ones that only ever live in the cloud.",
  },
];

export const ABOUT_CONVICTIONS: Point[] = [
  {
    n: "01",
    title: "Hardware honesty",
    body: "Embedded software doesn't get the luxury of 'refresh and try again.' We design for constrained memory, unreliable power, and field conditions. And we let that discipline sharpen our cloud software too.",
  },
  {
    n: "02",
    title: "The whole signal path",
    body: "One team owns the journey from sensor reading to dashboard pixel. No hand-offs between a firmware vendor, a backend shop, and an app agency — the seams are where systems fail.",
  },
  {
    n: "03",
    title: "Built for African context",
    body: "Intermittent connectivity, hard power cycles, dust and heat. Our systems are designed to hold state locally, sync when they can, and never leave the user guessing about what's real.",
  },
  {
    n: "04",
    title: "Security before shine",
    body: "Secure boot, signed updates, least-privilege APIs, threat-modelled architectures. Every layer is hardened before it's beautified — trust compounds; regret is expensive.",
  },
];

export const ABOUT_TIMELINE_INTRO: Prose[] = [
  { eyebrow: "§ 04 — Timeline", heading: "Short history, long horizon." },
];

export const ABOUT_TIMELINE: TimelineRow[] = [
  {
    y: "2026",
    t: "Founded",
    d: "Established in Owerri with a mandate to build intelligent, resilient systems — software platforms and the embedded devices they speak to, engineered by one team.",
  },
];

// Services
export const SERVICES_LIST: Service[] = [
  {
    n: "01",
    title: "Intelligent Systems",
    tag: "AI · Automation · Decision Engines",
    body: "We embed intelligence at the point of decision. LLM-backed workflows, retrieval systems and autonomous processes that turn ambiguous inputs into clear next steps.",
    deliverables: [
      "Custom AI copilots & agents",
      "Retrieval-augmented knowledge systems",
      "Workflow automation & decision engines",
      "Model evaluation & prompt engineering",
    ],
  },
  {
    n: "02",
    title: "Product Engineering",
    tag: "Web · Mobile · Platform",
    body: "End-to-end product build from a napkin sketch to a live, monitored, scalable platform. We own the stack: frontend, backend, infra and the operational cadence that keeps it healthy.",
    deliverables: [
      "Web & mobile applications",
      "APIs, backend platforms & integrations",
      "Cloud infrastructure & DevOps",
      "Design systems & interaction design",
    ],
  },
  {
    n: "03",
    title: "Cybersecurity",
    tag: "Defence · Assurance · Response",
    body: "Security is our co-founder practice. Threat modelling, hardening and incident-ready operations for teams that can't afford to guess whether their systems are safe.",
    deliverables: [
      "Threat modelling & risk assessment",
      "Application & infrastructure hardening",
      "Security operations & monitoring",
      "Incident response readiness",
    ],
  },
  {
    n: "04",
    title: "Advisory",
    tag: "Strategy · Architecture · Diligence",
    body: "For founders and operators making bet-the-company technology decisions. We help you choose what to build, what to buy and what to walk away from.",
    deliverables: [
      "Technology strategy & roadmapping",
      "Architecture review & selection",
      "Technical due diligence",
      "Fractional CTO engagements",
    ],
  },
];

export const SERVICES_PROCESS: Step[] = [
  {
    n: "01",
    t: "Frame",
    d: "We define the problem in plain language the decision, the user, the constraint.",
  },
  { n: "02", t: "Build", d: "Small, senior team. Working software in weeks, not slides in months." },
  {
    n: "03",
    t: "Harden",
    d: "Security, observability, and load-tested behaviour baked in never bolted on.",
  },
  {
    n: "04",
    t: "Operate",
    d: "We stay after launch. Systems get maintained by the people who built them.",
  },
];

export const SERVICES_PROCESS_INTRO: Prose[] = [
  { eyebrow: "§ Process", heading: "How the work moves." },
];

// Work
export const WORK_CASES: WorkCase[] = [
  {
    year: "2026",
    kind: "Internal product",
    tag: "Intelligent Systems",
    title: "In-house intelligent workflow engine",
    body: "A decision engine that turns fragmented operational inputs into a single, actionable next step for field teams. Currently in private pilot.",
  },
  {
    year: "2025",
    kind: "Partner engagement",
    tag: "Cybersecurity",
    title: "Cybersecurity hardening program",
    body: "Threat modelling and infrastructure hardening for a regional mobility platform. Reduced exposed surface area by an order of magnitude within one quarter.",
  },
  {
    year: "2025",
    kind: "Partner engagement",
    tag: "Product Engineering",
    title: "Product platform for a media venture",
    body: "Full-stack platform build; web, backend and deployment pipeline for a sister-brand transtech venture serving urban commuters.",
  },
  {
    year: "2024",
    kind: "Advisory",
    tag: "Advisory",
    title: "Technology advisory · early-stage founder",
    body: "Architecture selection, vendor triage and hiring plan for a founder preparing to move from prototype to first paying customers.",
  },
];

export const WORK_NDA: Prose[] = [
  {
    eyebrow: "§ Under NDA",
    body: "We can talk about most of it in a room. Not all of it on a page.",
  },
];

// Mission
export const MISSION_STATEMENT: Prose[] = [
  {
    eyebrow: "§ Core mission statement",
    quote:
      "Our mission is to engineer innovative, accessible, and scalable technology solutions that solve real-world problems, connect people and businesses, transform traditional industries, improve safety and efficiency and accelerate Africa's transition into a digitally enabled economy.",
    footnote:
      "At 4First Technologies Limited, we are building with the belief that technology should not simply follow the future, it should help create it.",
  },
];

export const MISSION_POINTS_INTRO: Prose[] = [
  { eyebrow: "§ Our mission in detail", heading: "Twelve commitments, one direction." },
];

export const MISSION_POINTS: Point[] = [
  {
    n: "01",
    title: "Solve real-world problems through technology",
    body: "We identify challenges affecting individuals, businesses, industries and communities and transform them into opportunities for technological innovation. Our focus is not technology for its own sake, but technology that delivers measurable value and addresses genuine needs.",
  },
  {
    n: "02",
    title: "Build innovative products for Africa and emerging markets",
    body: "We aim to design products that are relevant to our environment, affordable, accessible and capable of solving challenges unique to African markets while maintaining the quality and scalability required for global adoption.",
  },
  {
    n: "03",
    title: "Connect the physical world with the digital world",
    body: "Through technologies such as IoT, cloud computing, mobile applications, automation, embedded systems, artificial intelligence and data-driven platforms, we seek to create solutions that allow physical assets, businesses, people and digital systems to communicate and work together seamlessly. Our 4FG Digital Gas Platform and 4FG-Monitor, for example, represent this mission by connecting physical gas cylinders and gas businesses to digital monitoring, ordering, logistics and consumer services.",
  },
  {
    n: "04",
    title: "Make technology accessible and useful",
    body: "We believe technological innovation should not be limited to large corporations or highly developed markets. Our mission is to develop solutions that can be understood, accessed and utilized by ordinary individuals, small businesses, institutions and larger organizations.",
  },
  {
    n: "05",
    title: "Digitize traditional industries and services",
    body: "We seek to modernize sectors that still depend heavily on manual processes by introducing digital platforms, automation, monitoring, analytics and intelligent systems. We see significant opportunities to transform areas such as energy, logistics, healthcare, education, agriculture, commerce and public services.",
  },
  {
    n: "06",
    title: "Improve efficiency, transparency, and accountability",
    body: "Our solutions are designed to reduce unnecessary manual processes, improve access to information, create reliable digital records and enable organizations to make better decisions using accurate and timely data.",
  },
  {
    n: "07",
    title: "Create connected ecosystems rather than isolated products",
    body: "We do not simply build standalone applications. Our long-term mission is to develop interconnected ecosystems in which users, businesses, service providers, logistics companies, institutions and technology platforms can interact efficiently.",
  },
  {
    n: "08",
    title: "Empower businesses through digital transformation",
    body: "We help businesses adopt technology not merely as an operational tool but as a strategic advantage. Our solutions are intended to help organizations improve customer experience, increase operational efficiency, expand their reach, access better data and create new revenue opportunities.",
  },
  {
    n: "09",
    title: "Promote safety and reliability through technology",
    body: "Where technology can prevent accidents, reduce risks, provide early warnings or improve monitoring. We aim to make safety an integral part of our product development philosophy. Our approach to products such as 4FG-Monitor reflects our belief that technology should not only make things easier but also make them safer and more reliable.",
  },
  {
    n: "10",
    title: "Build for scalability and sustainability",
    body: "We develop with the future in mind. Our products are designed to evolve as users, markets, technologies and business requirements change. We seek to build sustainable technology businesses rather than short-term solutions.",
  },
  {
    n: "11",
    title: "Create opportunities through innovation",
    body: "We believe technology can create jobs, businesses, entrepreneurship opportunities and new economic value. By building digital ecosystems, we aim to create opportunities for developers, engineers, logistics providers, vendors, entrepreneurs and other participants in the technology value chain.",
  },
  {
    n: "12",
    title: "Collaborate to achieve greater impact",
    body: "We recognize that meaningful transformation cannot be achieved alone. We seek strategic partnerships with government institutions, private companies, investors, technology organizations, communities, researchers and other stakeholders whose capabilities and resources can help scale our solutions and increase their impact.",
  },
];

// Vision
export const VISION_STATEMENT: Prose[] = [
  {
    eyebrow: "§ Vision statement",
    quote:
      "\"To become a leading African technology innovation company, building intelligent, accessible and scalable solutions that connect people, businesses, devices and institutions; transform industries; create economic opportunities; improve safety and efficiency; and shape a smarter, more digitally enabled world.\"",
  },
];

export const VISION_POINTS_INTRO: Prose[] = [
  { eyebrow: "§ Our vision in detail", heading: "Twelve horizons, one direction." },
];

export const VISION_POINTS: VisionPoint[] = [
  {
    n: "01",
    title: "To become a leading technology innovation company in Africa",
    body: "We envision 4First Technologies Limited becoming a respected technology company originating from Africa and competing confidently on a global stage. Our ambition is to build products that demonstrate that world-class technology and innovation can be conceived, engineered, tested, deployed and scaled from Africa. We want 4First to be recognized not only as a technology service provider, but as a product-driven technology company that owns, develops and scales its own intellectual property and digital platforms.",
  },
  {
    n: "02",
    title: "To build technology that solves meaningful problems",
    body: "Our vision is centered around impact. We want to identify problems that affect individuals, businesses, communities, and industries and build technology capable of solving those problems efficiently. Whether the challenge involves energy, logistics, healthcare, education, commerce, agriculture, security, business operations, or public services, we envision 4First as a company that continuously asks the question below a mindset that will remain at the heart of our innovation.",
    quote: "What problem exists, and how can technology solve it better?",
  },
  {
    n: "03",
    title: "To create intelligent and connected ecosystems",
    body: "We envision a future where physical infrastructure and digital platforms are deeply connected. Through IoT, artificial intelligence, cloud computing, mobile technologies, embedded systems, automation, data analytics and other emerging technologies, we want to create ecosystems where devices, people, businesses and institutions can communicate seamlessly. Our 4FG Digital Gas Platform is an example of this vision rather than simply creating a device that measures the contents of an LPG cylinder, we envision a full ecosystem, an approach that can be applied to other industries too.",
    chain:
      "Gas Cylinder → 4FG-Monitor → Consumer → Mobile App → Gas Supplier → Logistics Provider → Delivery → Digital Records",
  },
  {
    n: "04",
    title: "To digitally transform traditional industries",
    body: "We envision 4First playing a significant role in transforming industries that have historically depended on manual processes and fragmented systems. We believe some of Africa's greatest technological opportunities lie in digitizing existing industries rather than simply creating entirely new ones. Our goal is to introduce technology that makes these industries:",
    list: [
      "More efficient",
      "More transparent",
      "More accessible",
      "More data-driven",
      "More connected",
      "More customer-focused",
      "More sustainable",
    ],
  },
  {
    n: "05",
    title: "To make technology accessible to everyone",
    body: "Our vision is not to build technology exclusively for large corporations. We want our technology to be practical, affordable, easy to use and adaptable to different environments, serving:",
    list: [
      "Individuals",
      "Families",
      "Small and medium-sized businesses",
      "Enterprises",
      "Government institutions",
      "Schools",
      "Hospitals",
      "Communities",
      "Service providers",
      "Other organizations",
    ],
  },
  {
    n: "06",
    title: "To create a safer and smarter world",
    body: "Our long-term vision is closely connected to our belief that technology should improve the quality and safety of people's lives. We envision products that can help people monitor, predict, detect, automate and respond to potential problems before they become serious. This is particularly relevant to our IoT products, where real-time monitoring can provide information that would otherwise be unavailable to users. Our philosophy is captured by our brand direction:",
    quote: "Smarter Tech, Safer World.",
  },
  {
    n: "07",
    title: "To become a trusted technology partner for government and institutions",
    body: "We envision 4First becoming a trusted partner for governments, institutions and organizations seeking to modernize their operations and services. Our goal is to participate meaningfully in the development of digitally enabled communities and institutions across Africa, contributing technology and expertise to initiatives involving:",
    list: [
      "Digital transformation",
      "Smart infrastructure",
      "Public service delivery",
      "Data management",
      "Automation",
      "IoT deployments",
      "Digital platforms",
      "Monitoring systems",
      "Technology-enabled economic development",
    ],
  },
  {
    n: "08",
    title: "To build scalable African products for global markets",
    body: "We do not want our products to be limited by geographical boundaries. Our vision is to identify challenges that exist in Africa and other emerging markets, develop solutions around them and eventually take those solutions to international markets, designing our technology from the beginning with scalability, interoperability, security, reliability and international standards in mind.",
    chain: "Local Problem → African Solution → Global Product",
  },
  {
    n: "09",
    title: "To build a strong culture of research and innovation",
    body: "We envision 4First as an organization where innovation is continuous. We want our teams to constantly research emerging technologies, experiment with new ideas, test assumptions, develop prototypes, learn from failures and improve existing products. We believe the ability to continuously learn and innovate will determine our long-term competitiveness.",
    chain:
      "Research → Ideation → Prototyping → Testing → Validation → Deployment → Improvement → Scale",
  },
  {
    n: "10",
    title: "To create economic opportunities",
    body: "Our vision extends beyond building technology. We envision 4First contributing to economic development by creating opportunities for the people and businesses within our ecosystems. As our platforms grow, we want thousands of people and businesses to be able to participate in the value created by our technology:",
    list: [
      "Engineers",
      "Developers",
      "Designers",
      "Researchers",
      "Entrepreneurs",
      "Logistics providers",
      "Technology partners",
      "Vendors",
      "Businesses",
      "Other ecosystem participants",
    ],
  },
  {
    n: "11",
    title: "To build sustainable technology businesses",
    body: "We envision 4First becoming a financially sustainable and commercially successful technology company. Innovation must ultimately create sustainable value so our vision is to develop products with viable business models that allow us to continuously build long-term technology businesses, not short-term projects:",
    list: [
      "Invest in research",
      "Improve our products",
      "Expand our infrastructure",
      "Attract talented people",
      "Enter new markets",
      "Support our customers",
      "Develop new technologies",
    ],
  },
  {
    n: "12",
    title: "To establish a portfolio of transformative products",
    body: "Our vision is for 4First to eventually operate a portfolio of technology products addressing different sectors. Rather than being dependent on one product or one industry, we envision a company with multiple technology platforms and solutions that collectively contribute to our larger mission. The 4FG ecosystem can represent our work in energy and IoT, while future products can address other sectors such as healthcare, logistics, agriculture, education, security, commerce and enterprise technology.",
  },
];

export const VISION_LONGTERM: Prose[] = [
  {
    eyebrow: "§ Our long-term vision",
    heading: "More than a technology company, [[an innovation ecosystem]].",
    body: "Ultimately, we envision 4First Technologies Limited becoming more than a technology company. We envision it becoming an innovation ecosystem — a company that identifies problems, develops technology, creates products, connects stakeholders, creates economic opportunities, and contributes to the digital transformation of Africa.\n\nWe want to build a company whose products are used in people's homes, businesses, hospitals, schools, industries, communities, and institutions. We want to build technology that people can trust, afford, understand, and benefit from.",
  },
];

export const VISION_ONELINE: Prose[] = [
  {
    eyebrow: "§ In one line",
    quote:
      "\"We envision a future where innovative technology makes everyday life smarter, industries more efficient, businesses more connected, and communities safer.\"",
    footnote: "Smarter Tech, Safer World.",
  },
];

// Products
export const PRODUCTS_PROBLEM: Prose[] = [
  {
    eyebrow: "§ The problem",
    heading: "Cylinders don't tell you when they're about to run out.",
    body: "LPG and oxygen cylinders are sealed and opaque — the only signal most people get that gas is running low is the flame sputtering out mid-meal, or a ward running short on oxygen with no warning. That's a safety problem for hospitals, a planning problem for retailers, and a daily inconvenience for households. 4FG-Monitor replaces that uncertainty with a live number.",
  },
];

export const PRODUCTS_HOW_INTRO: Prose[] = [
  { eyebrow: "§ How it works", heading: "Sensor to dashboard, one signal path." },
];

export const PRODUCTS_HOW: Step[] = [
  {
    n: "01",
    t: "Weigh",
    d: "The cylinder sits on a load-cell base plate. The device continuously measures total weight and derives net gas or oxygen remaining from the known tare weight.",
  },
  {
    n: "02",
    t: "Transmit",
    d: "Readings are pushed over GSM to the cloud platform — no home Wi-Fi, router, or app pairing required. It works the same in a rural clinic as it does in a city apartment.",
  },
  {
    n: "03",
    t: "Alert",
    d: "As levels approach empty, the platform triggers alerts to the user and, where connected, to the retailer or distributor — so a refill can be arranged before the cylinder actually runs dry.",
  },
  {
    n: "04",
    t: "Manage",
    d: "Usage history, consumption rate, and refill patterns are logged over time, turning a single sensor reading into a picture of how gas is actually being used.",
  },
];

export const PRODUCTS_AUDIENCES_INTRO: Prose[] = [
  { eyebrow: "§ Who it's for", heading: "One device, four kinds of urgency." },
];

export const PRODUCTS_AUDIENCES: Point[] = [
  {
    n: "01",
    title: "Households",
    body: "Know exactly how much cooking gas is left without lifting the cylinder or guessing by flame strength. Get a warning before you're mid-meal with an empty tank.",
  },
  {
    n: "02",
    title: "Hospitals & clinics",
    body: "Medical oxygen cannot run out unnoticed. 4FG-Monitor gives facilities staff a live view of oxygen reserves across wards, with alerts that reach the right person before a cylinder is critical.",
  },
  {
    n: "03",
    title: "Gas retailers & distributors",
    body: "See real-time consumption across customer sites instead of waiting for a phone call. Plan delivery routes around actual need, reduce emergency runs, and catch churn before a customer switches supplier.",
  },
  {
    n: "04",
    title: "Businesses & institutions",
    body: "Restaurants, bakeries, and any operation running on bulk LPG get accountable, auditable consumption data instead of relying on staff estimates or manual checks.",
  },
];

export const PRODUCTS_BEYOND: Prose[] = [
  {
    eyebrow: "§ Beyond the device",
    heading: "The digital gas platform.",
    body: "4FG-Monitor is the sensor layer of a wider platform connecting consumers, retailers, distributors, and service providers — turning individual cylinder readings into smarter refill planning and a more accountable LPG ecosystem across Africa.",
  },
];

export const PRODUCTS_PLATFORM: Feature[] = [
  { label: "Consumer and retailer web dashboards" },
  { label: "Live cylinder-level view per device" },
  { label: "Low-level and critical-level alerting" },
  { label: "Historical consumption & refill analytics" },
  { label: "Multi-site fleet view for distributors" },
  { label: "API-ready telemetry for integration" },
];

export const PRODUCTS_CTA: Prose[] = [
  {
    eyebrow: "§ Get 4FG-Monitor",
    body: "For households, hospitals, retailers, and distributors — talk to us about deployment.",
  },
];

// Contact
export const CONTACT_INTERESTS: Feature[] = [
  { label: "Intelligent systems" },
  { label: "Product engineering" },
  { label: "Cybersecurity" },
  { label: "Advisory" },
];

/** Keyed lookup used by `cms.ts` when merging DB rows over defaults. */
export const COLLECTION_DEFAULTS: Record<string, unknown[]> = {
  "home.principlesIntro": HOME_PRINCIPLES_INTRO,
  "home.principles": HOME_PRINCIPLES,
  "home.capabilitiesIntro": HOME_CAPABILITIES_INTRO,
  "home.capabilities": HOME_CAPABILITIES,
  "home.engage": HOME_ENGAGE,
  "about.buildIntro": ABOUT_BUILD_INTRO,
  "about.disciplines": ABOUT_DISCIPLINES,
  "about.engineering": ABOUT_ENGINEERING,
  "about.convictions": ABOUT_CONVICTIONS,
  "about.timelineIntro": ABOUT_TIMELINE_INTRO,
  "about.timeline": ABOUT_TIMELINE,
  "services.list": SERVICES_LIST,
  "services.processIntro": SERVICES_PROCESS_INTRO,
  "services.process": SERVICES_PROCESS,
  "work.cases": WORK_CASES,
  "work.nda": WORK_NDA,
  "mission.statement": MISSION_STATEMENT,
  "mission.pointsIntro": MISSION_POINTS_INTRO,
  "mission.points": MISSION_POINTS,
  "vision.statement": VISION_STATEMENT,
  "vision.pointsIntro": VISION_POINTS_INTRO,
  "vision.points": VISION_POINTS,
  "vision.longterm": VISION_LONGTERM,
  "vision.oneline": VISION_ONELINE,
  "products.problem": PRODUCTS_PROBLEM,
  "products.howIntro": PRODUCTS_HOW_INTRO,
  "products.how": PRODUCTS_HOW,
  "products.audiencesIntro": PRODUCTS_AUDIENCES_INTRO,
  "products.audiences": PRODUCTS_AUDIENCES,
  "products.beyond": PRODUCTS_BEYOND,
  "products.platform": PRODUCTS_PLATFORM,
  "products.cta": PRODUCTS_CTA,
  "contact.interests": CONTACT_INTERESTS,
};

/**
 * Read the single item of a one-row "prose" collection, falling back to the
 * first entry of the matching default array (and finally an empty Prose).
 */
export function proseOne(items: unknown[] | undefined, fallbackList: Prose[]): Prose {
  const first = (items ?? [])[0] as Prose | undefined;
  return first ?? (fallbackList[0] as Prose | undefined) ?? {};
}

/** Split a prose `body` string into paragraphs on blank lines. */
export function paragraphs(body: string | undefined | null): string[] {
  if (!body) return [];
  return body
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
}

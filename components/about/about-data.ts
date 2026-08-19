/* ──────────────────────────────────────────────────────────────
   Content for /about-us/, from the client brief "About Us page.docx"
   (18 Aug 2026). Copy is theirs; the three corrections their brief
   records are already applied here (no "31 years", no 50 µm claim,
   no international OEM in the client list).
   ────────────────────────────────────────────────────────────── */

export type Role = { label: string; value: string };
export type Milestone = { year: string; title: string; body?: string; weight: 0 | 1 | 2 };
export type PortfolioItem = { name: string; body: string; src: string; ratio: string; tall: boolean };
export type Pillar = { n: string; title: string; body: string; proof: string };
export type ImageSlot = { src?: string; alt?: string; need: string };

/* PENDING MQS SIGN-OFF
   · Founder naming. Their brief calls the 1994 founder "Dr. K. Srinivasa Rao" and
     today's Managing Director "Dr. Srinivasa Rao Kollu", and flags it itself:
     "If these are the same person the page reads as though they are two people."
     One form is used below, on the reading that it is one person. Confirm before
     launch; it is a one-line change either way.
   · No resolution or pixel-size figure appears on this page. Four conflicting
     values exist across the site and engineering has not issued an authoritative
     one, so the claim is held rather than guessed.
   · Client marks are set in type, not shown as logos. Permissions have not been
     obtained and several of these are defence and space organisations.
   · The Hon. Minister in the award caption is deliberately unnamed. */

export const HERO = {
  eyebrow: "About MQS Technologies",
  heading: "Our Story",
  lead: "Test, measurement and inspection solutions for mission-critical industries, ensuring product quality, process reliability and regulatory compliance since 1994.",
};

export const STORY = {
  heading: "From Repairing Instruments to Building Them.",
  paras: [
    "MQS Technologies is a test, measurement and inspection solutions company that develops advanced solutions for non-destructive testing, automated inspection and electrical test validation, enabling mission-critical industries to ensure product quality, process reliability and regulatory compliance.",
    "Founded in 1994 by Dr. K. Srinivasa Rao (M.Tech and Ph.D. in Tomography, IIT Madras), MQS began as a diagnostic equipment service provider in the healthcare sector. Over time, deep technical expertise and a commitment to quality led the company to expand into aerospace and defence, designing and building custom automated test equipment, X-ray inspection systems and bespoke electronic solutions.",
    "What began as a service mission has since evolved into a full-fledged design and manufacturing enterprise built on three pillars: technical depth, customer-focused customization, and indigenous innovation.",
    "From printed circuit boards to propulsion systems, MQS products help clients inspect, test and validate with confidence, when it matters most.",
  ],
  today: "Today the founder serves as Managing Director, with Mr. Kotnis Kollu leading operations as CEO.",
};

/* The through-line their brief asks to surface rather than bury: a doctorate in
   tomography, and a company that now manufactures tomography systems. */
export const FOUNDER = {
  claim: "A doctorate in tomography.",
  claimSub: "M.Tech and Ph.D. in Tomography, IIT Madras.",
  result: "A tomography systems manufacturer.",
  resultSub:
    "Industrial CT systems designed and built in Hyderabad, and a SIDM Champion Award for indigenization in high-energy CT.",
  roles: [
    { label: "Managing Director", value: "Dr. K. Srinivasa Rao, founder" },
    { label: "Chief Executive Officer", value: "Mr. Kotnis Kollu, operations" },
  ] as Role[],
};

/* weight drives type size and rule colour, not a card treatment:
   2 = chapter opening, 1 = notable, 0 = certification year, kept quiet. */
export const MILESTONES: Milestone[] = [
  { year: "1994", title: "Foundation.", body: "Founded as MedeQuip Services, repair and maintenance for diagnostic and test equipment in healthcare.", weight: 2 },
  { year: "1996-99", title: "Into aerospace and defence.", body: "Partnerships with leading OEMs, foundation laid for custom servicing.", weight: 1 },
  { year: "2010-11", title: "India's first indigenous DR system.", body: "Entered NDT. Delivered India's first indigenous simultaneous loading and inspection digital radiography system for high-throughput applications.", weight: 2 },
  { year: "2011", title: "ISO 9001:2008 certified.", weight: 0 },
  { year: "2017", title: "Rocket motor inspection for ISRO.", body: "High-energy rocket motor inspection system delivered. ISO 9001:2015 secured.", weight: 1 },
  { year: "2020", title: "Rebranded as MQS Technologies Pvt. Ltd.", body: "Portfolio and solution offerings strengthened.", weight: 0 },
  { year: "2022", title: "ISO 13485:2016 for healthcare equipment servicing.", body: "Support expanded across verticals with AI-enhanced systems.", weight: 0 },
  { year: "2025", title: "Growth and scale.", body: "150+ employees, 8 cities, 100+ installations. SIDM Champion Award for indigenization of high-energy CT.", weight: 1 },
];

/* Six supplied files at six different sizes and qualities. Each keeps its own
   native ratio so nothing is upscaled or force-cropped to a common cell. */
export const PORTFOLIO = {
  heading: "Design, Inspection, Testing, Compliance.",
  lead: "We design and manufacture end-to-end systems that support every stage of the product lifecycle.",
  items: [
    { name: "Digital Radiography Systems", body: "Real-time, high-resolution industrial X-ray inspection.", src: "/assets/about-line-dr.jpg", ratio: "1050 / 1400", tall: true },
    { name: "Industrial CT Systems", body: "3D imaging, internal flaw detection and metrology.", src: "/assets/about-line-ct.png", ratio: "605 / 557", tall: false },
    { name: "Automated Test Equipment", body: "Electrical and functional validation of complex assemblies.", src: "/assets/about-line-ate.jpg", ratio: "846 / 1200", tall: true },
    { name: "ADR Software", body: "AI-enabled imaging intelligence for fast, accurate quality assurance.", src: "/assets/about-line-adr.png", ratio: "1600 / 900", tall: false },
    { name: "Precision Sub-Assemblies", body: "High-performance mechanical components for industrial use.", src: "/assets/about-line-sub.png", ratio: "354 / 570", tall: true },
    { name: "Industrial Electronics", body: "Custom control and measurement systems for OEMs and R&D centres.", src: "/assets/about-line-elec.png", ratio: "415 / 409", tall: false },
  ] as PortfolioItem[],
};

export const PURPOSE = {
  heading: "What Drives Us",
  items: [
    { label: "Mission", body: "To empower every industry in the nation with guaranteed quality assurance. From defence to manufacturing, we want to create meaningful change in the way quality is measured, and to witness the world's inspection automation revolution." },
    { label: "Vision", body: "To become the world's most efficient industrial solutions and services provider. We look for new ways to use our expertise, discover new opportunities and promote innovation, turning challenges into opportunities through indigenous engineering." },
    { label: "Values", body: "Hard work, patience and the drive to innovate form our core value system. Working towards a self-sustaining India through indigenous innovation." },
  ],
};

export const PILLARS = {
  heading: "The Pillars That Define Us",
  lead: "Our strength lies not just in what we build, but how we build it, why we build it, and the trust we deliver through every system.",
  items: [
    { n: "01", title: "Precision Engineering", body: "Systems designed for high accuracy, micro-level flaw detection and repeatable performance, from aerospace castings to multilayer PCBs.", proof: "Microfocus and high-energy options across the range." },
    { n: "02", title: "Uncompromising Quality", body: "Every product built to perform in demanding environments and meet stringent global standards.", proof: "ISO 9001 certified, 40+ AERB approvals, Class B compliance." },
    { n: "03", title: "Tailored Innovation", body: "No two inspection needs are the same. Our systems are fully customized to match your exact application, process and workflow.", proof: "100+ custom systems across defence, automotive, healthcare and heavy industry." },
    { n: "04", title: "Low Downtime by Design", body: "Modular hardware, smart diagnostics and responsive support ensure minimal disruption to your production line.", proof: "Boom-mounted designs, remote troubleshooting, AMC and lifecycle coverage." },
    { n: "05", title: "Regulatory Mastery", body: "We understand the certifications and standards that matter, and build compliance into every system from day one.", proof: "AERB, ASTM, ISO, ASME, pre-audit readiness built in." },
    { n: "06", title: "Proven Track Record", body: "With three decades of experience, we are trusted by India's most demanding organisations to solve complex inspection challenges.", proof: "See the client list below." },
  ] as Pillar[],
};

export const CLIENTS = {
  heading: "Who We Work With",
  lead: "Trusted by India's leading aerospace, defence, automotive and heavy engineering organisations.",
  names: ["ISRO", "DRDO", "BDL", "HAL", "BEL", "BHEL", "IGCAR", "NFC", "BrahMos Aerospace", "Ratnamani Metals"],
  note: "Set in type by design. Client marks are not shown.",
};

export const AWARD = {
  eyebrow: "Recognition",
  title: "SIDM Champion Award 2025",
  body: "Received from the Hon. Minister for indigenization in High-Energy CT Systems.",
  date: "7 October 2025",
};

/* The brief's FINAL CTA. Not rendered on the page: ContactSection follows and
   already closes it, so this would have been a second CTA on top of the first.
   Kept here so the brief's copy stays traceable. */
export const CTA = {
  heading: "Want to Learn More About MQS?",
  lead: "Our engineers are ready to discuss how we can solve your inspection challenges.",
};

export const IMAGES: Record<"hero" | "award" | "founder" | "facility", ImageSlot> = {
  hero: {
    src: "/assets/about-hero.jpg",
    alt: "MQS application engineers operating a digital radiography inspection system with results displayed on the review workstation",
    need: "Supplied at 7008 × 4672, any crop including full bleed.",
  },
  award: {
    src: "/assets/award-sidm.jpg",
    alt: "MQS Technologies leadership receiving the SIDM Champion Award 2025 for indigenization in high-energy CT systems",
    need: "Supplied at 1400 × 932, wide group shot, no tight crop.",
  },
  founder: {
    src: "/assets/about-founder.jpg",
    alt: "Portrait of the founder of MQS Technologies",
    need: "Supplied at only 413 × 531, so never displayed wider than 200px.",
  },
  facility: {
    need: "Facility or manufacturing floor at the Hyderabad plant, wide, systems in build. Deliver 2560 × 1100.",
  },
};

export const META = {
  title: "About MQS Technologies — Inspection & Test Systems Manufacturer Since 1994",
  description:
    "Founded in 1994 in Hyderabad, MQS Technologies designs and manufactures X-ray, CT, NDT and automated test systems for aerospace, defence, automotive and electronics. 150+ engineers, 100+ installations.",
};

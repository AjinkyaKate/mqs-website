/* ──────────────────────────────────────────────────────────────
   About page content — /about-us/
   Ported verbatim from the design project "MQS About — Concept 04
   Responsive" (77311f34-c26a-40a2-af51-b798797a5102), whose canvas
   imports `MQS About Page.dc.html` at three authored breakpoints
   (wide / tablet / mobile).

   Copy, figures and section order are the designer's, reproduced exactly.
   Anything the design asserts that MQS has not confirmed is listed under
   PENDING MQS SIGN-OFF below rather than quietly softened.

   PENDING MQS SIGN-OFF
   · Leadership names and titles. The design names two people:
     "Dr. K. Srinivasa Rao Kollu, Managing Director" and "Mr. Kotnis Kollu,
     Chief Executive Officer". The earlier brief gave the founder as
     "Dr. K. Srinivasa Rao" / "Dr. Srinivasa Rao Kollu" and named no CEO.
     Real people's names and titles — confirm both spellings and both roles
     before go-live.
   · "8 Cities". The brief and the current site say six Indian cities.
   · "40+ AERB approvals", "150+ Employees", "100+ Installations", "30+ Years"
     are carried from the brief and still unverified against a source document.
   · Timeline facts not in the brief: ISO 9001 in 2011, ISO 13485 in 2022,
     and the 2017 rocket motor inspection system for ISRO.
   · The SIDM award caption deliberately does not name the Hon. Minister.
   · Client marks are set in type, not shown as logos. The 32 cleaned
     customer logos in public/assets/logos/ are NOT used by this design.
   ────────────────────────────────────────────────────────────── */

export type Stat = { target: number | null; fromYear?: number; suffix: string; label: string };
export type PortfolioItem = { n: string; name: string; desc: string; short: string; src: string; alt: string };
export type TimelineItem = { year: string; title: string; desc: string; major: boolean };
export type Pillar = { n: string; name: string; desc: string; proof: string };
export type Person = { name: string; role: string };
export type ClientLogo = { name: string; src: string; w: number; h: number };
export type ImageSlot = { src: string; alt: string; need: string };

export const HERO = {
  /* Not rendered: removed from the hero at the client's request. Kept so the
     design's copy stays traceable. */
  eyebrow: "About MQS Technologies",
  title: "Our story.",
  lead:
    "Test, measurement and inspection solutions for mission-critical industries — ensuring product quality, process reliability and regulatory compliance since 1994.",
};

/* Founded 1994. Years is derived in the browser rather than written as a
   literal, matching the home page's StatsStrip: the client asked for the fixed
   figure to go because it goes stale every January, and the design's "30+" was
   already understating it (1994 to 2026 is 32). */
export const FOUNDED = 1994;

export const STATS: Stat[] = [
  { target: null, fromYear: FOUNDED, suffix: "+", label: "Years" },
  { target: 150, suffix: "+", label: "Employees" },
  { target: 8, suffix: "", label: "Cities" },
  { target: 200, suffix: "+", label: "Installations" },
];

export const ORIGIN = {
  year: "1994",
  caption: "Hyderabad. A service contract and a workshop.",
  heading: "From repairing instruments to building them.",
  paras: [
    "MQS started inside other people's machines — servicing healthcare diagnostic equipment. That is where the company learned what fails, why it fails, and what a serviceable machine looks like.",
    "Aerospace and defence customers brought problems with no catalogue answer. Custom engineering became X-ray inspection, then industrial CT, then automated test equipment — and MQS became a design and manufacturing company.",
  ],
  /* Shorter second paragraph, authored for the mobile composition. */
  paraMobile:
    "Custom engineering became X-ray inspection, then industrial CT, then automated test equipment — and MQS became a design and manufacturing company.",
  paraMobileFirst:
    "MQS started inside other people's machines — servicing healthcare diagnostic equipment. That is where the company learned what fails, and what a serviceable machine looks like.",
};

export const LEADERSHIP = {
  /* The claim is set with "Ph.D. in Tomography" in cyan. */
  claimBefore: "A ",
  claimAccent: "Ph.D. in Tomography",
  claimAfter: " — and a factory that builds tomography systems.",
  people: [
    { name: "Dr. K. Srinivasa Rao Kollu", role: "Managing Director" },
    { name: "Mr. Kotnis Kollu", role: "Chief Executive Officer" },
  ] as Person[],
};

export const AWARD = {
  eyebrow: "Recognition · October 2025",
  title: "SIDM Champion Award 2025.",
  body:
    "For indigenization in High-Energy CT Systems — capability previously imported, now designed and manufactured in India.",
};

export const PORTFOLIO = {
  eyebrow: "What we build",
  heading: "MQS solution portfolio.",
  flow: "Non-Destructive Testing · ATE · Contract Manufacturing",
  items: [
    {
      n: "NDT · 01",
      name: "Digital Radiography Systems",
      desc: "Real-time and static DR for castings, welds and assemblies, with simultaneous loading and inspection.",
      short: "Real-time and static DR for castings, welds and assemblies.",
      /* Studio render supplied by the client, replacing the factory floor
         photograph (about-line-dr.jpg, still on disk) whose shed background
         and roof structure competed with the overlaid heading. */
      src: "/assets/about-dr-mqxc102.jpg",
      alt: "MQXC 102 digital radiography system",
    },
    {
      n: "NDT · 02",
      name: "Industrial CT Systems",
      desc: "High-energy computed tomography for internal geometry, porosity and density mapping.",
      short: "High-energy CT for internal geometry and porosity.",
      src: "/assets/about-line-ct.png",
      alt: "Industrial CT system",
    },
    {
      n: "ATE · 01",
      name: "Automated Test Equipment",
      desc: "Functional and environmental test rigs, built to spec.",
      short: "Functional and environmental test rigs, built to spec.",
      src: "/assets/about-line-ate.jpg",
      alt: "Automated test equipment racks",
    },
    {
      n: "NDT · 03",
      name: "ADR Software",
      desc: "Automated defect recognition and ASTM reporting.",
      short: "Automated defect recognition and ASTM reporting.",
      /* An actual radiograph rather than a screenshot of the software UI: it
         shows what automated defect recognition is run against. Supplied as a
         PNG with a genuine transparent surround, so the specimen sits directly
         on the cell's navy ground. */
      src: "/assets/about-adr-radiograph.png",
      alt: "Radiograph of a machined linkage, the kind of image MQS ADR software inspects",
    },
    {
      n: "CM · 01",
      name: "Precision Sub-Assemblies",
      desc: "Close-tolerance assemblies for defence programmes.",
      short: "Close-tolerance assemblies for defence programmes.",
      src: "/assets/about-line-sub.png",
      alt: "Precision sub-assembly",
    },
    {
      n: "CM · 02",
      name: "Industrial Electronics",
      desc: "Custom boards and control electronics, built in-house.",
      short: "Custom boards and control electronics, built in-house.",
      src: "/assets/about-line-elec.png",
      alt: "Industrial electronics assembly",
    },
  ] as PortfolioItem[],
};

export const TEAM = {
  statement:
    "Every system on this page was designed, built, installed and is serviced by the people in this photograph.",
  /* Shorter statement authored for mobile, where the photograph sits above
     the text rather than behind it and "in this photograph" no longer reads. */
  statementMobile:
    "Every system here was designed, built, installed and is serviced by our own engineers.",
  note:
    "Mechanics, radiation enclosure, motion control, electronics and acquisition software — all developed under one roof in Hyderabad.",
};

export const TIMELINE = {
  eyebrow: "Company timeline",
  heading: "Three decades. Built one milestone at a time.",
  /* Not rendered: the "Turning point" label is removed at the client's
     request. Kept so the design's copy stays traceable. */
  majorLabel: "Turning point",
  items: [
    {
      year: "1994",
      title: "MQS is founded in Hyderabad.",
      desc: "Servicing healthcare diagnostic equipment — the apprenticeship that taught the company how instruments fail.",
      major: true,
    },
    {
      year: "1996–99",
      title: "Expansion into aerospace and defence.",
      desc: "First inspection and test contracts with national programmes.",
      major: false,
    },
    {
      year: "2010–11",
      title: "India's first indigenous simultaneous loading and inspection Digital Radiography system.",
      desc: "The moment MQS stopped servicing other people's machines and started building its own.",
      major: true,
    },
    {
      year: "2011",
      title: "ISO 9001 certification.",
      desc: "Quality management system certified across design and manufacture.",
      major: false,
    },
    {
      year: "2017",
      title: "Rocket motor inspection system for ISRO.",
      desc: "Large-format radiography for solid propellant motor assemblies.",
      major: false,
    },
    {
      year: "2020",
      title: "Rebranded as MQS Technologies.",
      desc: "Design, manufacturing and service consolidated under one identity.",
      major: false,
    },
    {
      year: "2022",
      title: "ISO 13485 certification and capacity expansion.",
      desc: "Medical device quality system added; manufacturing floor extended.",
      major: false,
    },
    {
      year: "2025",
      title: "150+ employees. 8 cities. 200+ installations.",
      desc: "SIDM Champion Award for indigenization in High-Energy CT Systems.",
      major: true,
    },
  ] as TimelineItem[],
};

export const PILLARS = {
  heading: "The pillars that define us.",
  items: [
    { n: "01", name: "Precision Engineering", desc: "Systems designed around the tolerance the part demands, not the tolerance the catalogue offers.", proof: "100+ custom systems delivered" },
    { n: "02", name: "Uncompromising Quality", desc: "A documented quality system across design, build, installation and service.", proof: "ISO 9001 · ISO 13485" },
    { n: "03", name: "Tailored Innovation", desc: "Every system specified against the customer's own test method and part geometry.", proof: "In-house design office" },
    { n: "04", name: "Low Downtime by Design", desc: "Serviceable architecture, spares planning and remote diagnostics from day one.", proof: "Remote troubleshooting" },
    { n: "05", name: "Regulatory Mastery", desc: "Radiation, materials and safety codes handled as part of delivery, not afterwards.", proof: "Compliance-led delivery" },
    { n: "06", name: "Proven Track Record", desc: "Three decades of installations still in service across eight cities.", proof: "AMC & lifecycle support" },
  ] as Pillar[],
};

export const PURPOSE = {
  eyebrow: "What drives us",
  heading: "Empower industries through reliable quality assurance and inspection automation.",
  items: [
    { label: "Vision", body: "Become a highly efficient global industrial solutions and services provider, driven by indigenous innovation." },
    { label: "Values", body: "Hard work, patience, innovation and technological self-reliance." },
  ],
};

export const CLIENTS = {
  heading: "Who we work with.",
  lead: "Trusted by leading aerospace, defence, automotive and heavy engineering organisations.",
  /* The design set ten client names in Archivo type and showed no marks. At the
     client's request the wall now uses the 32 supplied logos instead. The
     original ten names are kept here only as a record of the design's copy. */
  designNames: ["ISRO", "DRDO", "BDL", "HAL", "BEL", "BHEL", "IGCAR", "NFC", "BrahMos Aerospace", "Ratnamani Metals"],
};

/* The 32 customer logos supplied by MQS, background-keyed to transparent PNG.
   w/h are the real pixel dimensions of each file, passed to next/image so it
   can size each mark without layout shift.

   PENDING MQS SIGN-OFF on display names: the marks are the visual, and these
   names are the alt text, but a few are inferred from the supplied filenames
   and may not be the full legal entity — Aruna, Gulf, Oswal, Solar, Turbo and
   AMNS in particular. */
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "AMNS", src: "/assets/logos/amns.png", w: 267, h: 111 },
  { name: "Apollo Tyres", src: "/assets/logos/apollo-tyres.png", w: 526, h: 200 },
  { name: "Aruna", src: "/assets/logos/aruna.png", w: 600, h: 93 },
  { name: "Bharat Dynamics Limited", src: "/assets/logos/bdl.png", w: 143, h: 71 },
  { name: "Bharat Electronics Limited", src: "/assets/logos/bel.png", w: 163, h: 52 },
  { name: "BHEL", src: "/assets/logos/bhel.png", w: 124, h: 97 },
  { name: "Boeing", src: "/assets/logos/boeing.png", w: 600, h: 137 },
  { name: "BrahMos Aerospace", src: "/assets/logos/brahmos.png", w: 202, h: 200 },
  { name: "Department of Atomic Energy", src: "/assets/logos/dae.png", w: 196, h: 200 },
  { name: "DRDO", src: "/assets/logos/drdo.png", w: 199, h: 200 },
  { name: "GE Aerospace", src: "/assets/logos/ge-aerospace.png", w: 600, h: 142 },
  { name: "Gulf", src: "/assets/logos/gulf.png", w: 112, h: 102 },
  { name: "Hindustan Aeronautics Limited", src: "/assets/logos/hal.png", w: 482, h: 190 },
  { name: "IGCAR", src: "/assets/logos/igcar.png", w: 200, h: 200 },
  { name: "Indian Air Force", src: "/assets/logos/indian-air-force.png", w: 98, h: 111 },
  { name: "Isgec", src: "/assets/logos/isgec.png", w: 206, h: 112 },
  { name: "ISRO", src: "/assets/logos/isro.png", w: 123, h: 118 },
  { name: "JSW Steel", src: "/assets/logos/jsw-steel.png", w: 600, h: 172 },
  { name: "Larsen & Toubro", src: "/assets/logos/lt.png", w: 600, h: 124 },
  { name: "Mahabal Metals", src: "/assets/logos/mahabal-metals.png", w: 197, h: 42 },
  { name: "MIDHANI", src: "/assets/logos/midhani.png", w: 313, h: 200 },
  { name: "Ordnance Factory Board", src: "/assets/logos/ordnance-factory-board.png", w: 136, h: 200 },
  { name: "Oswal", src: "/assets/logos/oswal.png", w: 400, h: 200 },
  { name: "Rane", src: "/assets/logos/rane.png", w: 301, h: 200 },
  { name: "Ratnamani Metals", src: "/assets/logos/ratnamani.png", w: 253, h: 100 },
  { name: "Rockman", src: "/assets/logos/rockman.png", w: 229, h: 115 },
  { name: "SAMEER", src: "/assets/logos/sameer.png", w: 323, h: 200 },
  { name: "Solar", src: "/assets/logos/solar.png", w: 82, h: 98 },
  { name: "Spark Minda", src: "/assets/logos/spark-minda.png", w: 209, h: 57 },
  { name: "Tata Advanced Systems", src: "/assets/logos/tata-advanced-systems.png", w: 429, h: 131 },
  { name: "Thermax", src: "/assets/logos/thermax.png", w: 161, h: 200 },
  { name: "Turbo", src: "/assets/logos/turbo.png", w: 296, h: 152 },
];


export const IMAGES: Record<"hero" | "team" | "award" | "founder", ImageSlot> = {
  hero: {
    src: "/assets/about-hero.jpg",
    alt: "MQS engineers operating a digital radiography inspection system",
    need: "Supplied at 7008 × 4672. Used full bleed for the hero.",
  },
  team: {
    src: "/assets/mqs-multimeter-service.jpg",
    alt: "An MQS engineer testing a system's control electronics with a digital multimeter",
    need:
      "Supplied at 6240 × 4160 as Service Overview/Preventive Maintenance Plans.jpg. " +
      "Chosen because the hero photograph was previously used twice on this page. " +
      "MQS have supplied only three photographs containing people and the other two " +
      "are already used elsewhere on the site, so more facility photography is worth requesting.",
  },
  award: {
    src: "/assets/award-sidm-2025.jpg",
    alt: "MQS Technologies receiving the SIDM Champion Award 2025",
    need:
      "Client supplied a clearer 1537 × 1023 frame, used here, replacing a heavily " +
      "compressed 1400 × 932 version. Still marginal for a full-bleed band above a " +
      "1537px viewport, so 2560 wide is worth requesting. Note the homepage " +
      "NewsSection still points at the older, softer award-sidm.jpg.",
  },
  founder: {
    src: "/assets/about-founder.jpg",
    alt: "Dr. K. Srinivasa Rao Kollu, Managing Director",
    need: "Supplied at only 413 × 531. The design displays it full width on mobile, where it upscales. Request 1200 wide.",
  },
};

export const META = {
  title: "About MQS Technologies — Our Story",
  description:
    "Founded in 1994, MQS Technologies designs and manufactures digital radiography, industrial CT, automated test and inspection systems for aerospace, defence, automotive and electronics.",
};

/* Content for the industry detail pages, consumed by IndustryDetail.tsx.
   Grounded in the Industries Overview + product documents. MQS product
   names are real; compliance claims are the conservative set (industry-
   specific standards to be added only on MQS confirmation). */

export type SystemRef = { name: string; desc: string; href: string };
export type PartRef = { title: string; desc: string };
export type IndustryData = {
  slug: string;
  name: string;
  headline: string;
  intro: [string, string];
  heroImage?: string;
  defects: string[];
  partsHeading: string;
  parts: PartRef[];
  systems: SystemRef[];
  extra?: { heading: string; blurb: string; items: string[] };
  confidential?: string;
  standards: string[];
  metaTitle: string;
  metaDescription: string;
};

const STANDARDS = [
  "AERB-compliant, type-approved systems for radiation safety",
  "ASTM-aligned inspection workflows, including ASTM E2422 where AI-driven software is used",
  "Traceable inspection records and reporting support for customer audits",
  "Digital image archives with repeatable, recallable inspection programs",
];

export const aerospace: IndustryData = {
  slug: "aerospace-defence",
  name: "Aerospace & Defence",
  headline: "Inspect with confidence, because failure is not an option.",
  intro: [
    "Turbine parts, rotor blades, structural assemblies, nozzles and composite layups — where a micro-crack, an inclusion or a bond failure has consequences that reach far beyond the factory.",
    "MQS configures radiographic and CT inspection around the part, the specified sensitivity and the traceability your quality system and your customer's programme demand.",
  ],
  defects: ["Micro-cracks & fatigue initiation", "Porosity & shrinkage", "Inclusions & foreign material", "Delamination & disbonds", "Fill, void & placement in energetics", "Wall-thickness & dimensional variation"],
  partsHeading: "What we inspect.",
  parts: [
    { title: "Turbine & engine components", desc: "Blades, discs, nozzles and cast hot-section parts screened for porosity, inclusions and wall-thickness variation." },
    { title: "Rotor blades", desc: "Full-length digital radiography of helicopter and turbine rotor blades on long-format gantries." },
    { title: "Structural castings & forgings", desc: "Airframe castings, forgings and machined structures inspected for internal defects before assembly." },
    { title: "Composite & bonded structures", desc: "Layups, honeycomb and bonded joints checked for delamination, disbonds and resin-poor zones." },
    { title: "Energetics & ordnance", desc: "Fuze, warhead and propellant assemblies inspected for fill, voids and component placement." },
  ],
  systems: [
    { name: "High-Energy X-ray", desc: "Penetration through dense, thick-section aerospace castings and assemblies.", href: "/products/high-energy-xray" },
    { name: "MQCT", desc: "3D computed tomography for internal defect mapping and dimensional metrology.", href: "/products" },
    { name: "Microfocus CT", desc: "Sub-micron detail on high-value, small-feature components.", href: "/products" },
    { name: "MQXC Cabinet DR", desc: "AERB-compliant cabinet digital radiography from 160–450 kV.", href: "/products/mqxc-series" },
    { name: "Rotor Blade DR", desc: "Long-format gantry configured for full-length rotor-blade inspection.", href: "/products" },
  ],
  extra: {
    heading: "Platforms we support.",
    blurb: "Programme-specific procedures and acceptance criteria across defence and civil platforms.",
    items: ["Fixed wing", "Fighter aircraft", "Rotary wing", "Missiles & munitions", "Space & launch", "Ground systems"],
  },
  confidential:
    "We don't publish aerospace scan results. Customer radiographs, part geometries and acceptance data stay under NDA — which is usually why programmes choose us. The imagery on this page shows our systems, never a customer part.",
  standards: STANDARDS,
  metaTitle: "Aerospace & Defence X-Ray & CT Inspection | MQS Technologies",
  metaDescription:
    "Radiographic and CT inspection for turbine parts, rotor blades, structural castings, composites and energetics — to customer-specified sensitivity, with full traceability. Engineered in Hyderabad.",
};

export const automotive: IndustryData = {
  slug: "automotive",
  name: "Automotive & EV",
  headline: "Inspect faster. Reduce scrap. Deliver safer vehicles.",
  intro: [
    "Cast housings, brake components, powertrain parts and battery assemblies — inspected at production speed, because a zero-defect target means checking parts, not samples.",
    "From automated inline radiography to CT metrology, MQS matches throughput to takt time without giving up defect sensitivity or a recallable image record.",
  ],
  heroImage: "/assets/mqxc-app-wheel.jpg",
  defects: ["Gas & shrinkage porosity", "Weld lack-of-fusion & cracks", "Electrode misalignment & overhang", "Foreign particles & contamination", "Inclusions", "Dimensional & assembly errors"],
  partsHeading: "What we inspect.",
  parts: [
    { title: "Aluminium & structural castings", desc: "Porosity grading beneath machined faces on housings, knuckles, manifolds and structural castings." },
    { title: "Brake, steering & safety parts", desc: "100% inspection with a traceable, recallable image record for safety-critical components." },
    { title: "Powertrain & driveline", desc: "Welds, gears and assemblies checked for internal integrity and joint quality." },
    { title: "EV battery cells & modules", desc: "Electrode alignment, anode overhang, foreign particles and internal defects across cells, modules and busbars." },
    { title: "Wheels", desc: "Inline radiography for alloy and steel wheels at production cadence." },
  ],
  systems: [
    { name: "MQS-PRISM", desc: "Production digital radiography with AI-assisted defect recognition and pass/fail calling.", href: "/products" },
    { name: "MQXC Cabinet DR", desc: "AERB-compliant cabinet digital radiography from 160–450 kV.", href: "/products/mqxc-series" },
    { name: "MQCT", desc: "Industrial CT for porosity analysis and dimensional metrology.", href: "/products" },
    { name: "MQWR 160U", desc: "Inline wheel radiography for 10–26 inch alloy and steel wheels.", href: "/products" },
  ],
  standards: STANDARDS,
  metaTitle: "Automotive & EV X-Ray & CT Inspection | MQS Technologies",
  metaDescription:
    "Inline X-ray, digital radiography and CT for castings, brake and safety parts, powertrain and EV battery inspection — at production speed with AI defect recognition and full traceability.",
};

export const electronics: IndustryData = {
  slug: "electronics",
  name: "Electronics & Semiconductors",
  headline: "Inspect what the eye cannot see.",
  intro: [
    "BGA voids, head-in-pillow, bridging and PTH fill issues — defects that pass visual inspection, survive functional test, and come back as field returns.",
    "MQS brings sub-micron microfocus X-ray, 2.5D board inspection and CT to the defects that hide under packages and inside joints.",
  ],
  heroImage: "/assets/ind-electronics.jpg",
  defects: ["Solder voids & voiding %", "Head-in-pillow & opens", "Bridging & shorts", "PTH fill defects", "Die-attach voids & wire-bond breaks", "Delamination"],
  partsHeading: "What we inspect.",
  parts: [
    { title: "PCB & solder joints", desc: "Void quantification in solder, head-in-pillow, bridging and PTH fill on fine-pitch assemblies." },
    { title: "BGA & leadless packages", desc: "Hidden voids and opens under BGA, QFN and leadless packages." },
    { title: "Semiconductor packages", desc: "Die-attach voids, wire-bond breaks and delamination at sub-micron voxel sizes." },
    { title: "Connectors & PTH", desc: "Plated-through-hole fill and barrel integrity on multilayer boards." },
    { title: "Component counting", desc: "AI component counting across reels, trays and tubes for inventory accuracy." },
  ],
  systems: [
    { name: "MQX.tracE", desc: "2.5D board X-ray with fine feature recognition for BGA, QFN and solder-joint analysis.", href: "/products" },
    { name: "MQX.tracE CT", desc: "Volumetric CT of populated boards for buried-via and interconnect failure analysis.", href: "/products" },
    { name: "MQX.gINti", desc: "AI component counting across reels, trays and tubes at high accuracy.", href: "/products" },
    { name: "Microfocus CT", desc: "Sub-micron voxel package-level failure analysis.", href: "/products" },
  ],
  standards: STANDARDS,
  metaTitle: "Electronics & Semiconductor X-Ray Inspection | MQS Technologies",
  metaDescription:
    "Microfocus X-ray, 2.5D AXI and CT for BGA voids, head-in-pillow, PTH fill, die-attach and package failure analysis — plus AI component counting. Sub-micron detail.",
};

export const INDUSTRIES = { aerospace, automotive, electronics };

/* ──────────────────────────────────────────────────────────────
   Content for the service detail pages.
   One entry per service, all five sharing the ServiceDetailData shape, so a new
   page is a data edit rather than a layout edit. Slot list matches the "Content
   slots per service" annotation in templates/mqs-service-detail/.

   Only CT Inspection is filled: it is the one service with source copy today
   (MQS's CT services page). The other four need a content brief from MQS
   against this same shape before their routes can ship.
   ────────────────────────────────────────────────────────────── */

export type Fact = { label: string; value: string };
export type TitledItem = { title: string; body: string };
export type ProofStat = { figure: string; unit: string; label: string };

/* An image slot. `src` empty means no authentic photograph exists yet, and the
   page renders a labelled placeholder stating `need` rather than a stand-in. */
export type ImageSlot = { src?: string; alt?: string; need: string };

export type ServiceDetailData = {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: [string, string];
  lead: string;
  intro: string;
  facts: Fact[];
  caps: TitledItem[];
  inHouse: Fact[];
  includes: Fact[];
  deliverables: TitledItem[];
  proofStats: ProofStat[];
  proofNote: string;
  value: { industry: string; apps: string }[];
  midRequest: { title: string; body: string };
  /* Not rendered: ContactSection closes the page. Kept so the copy stays traceable. */
  closing: { headline: string; lead: string };
  resource: { title: string; meta: string; cta: string; href: string };
  images: { hero: ImageSlot; facility: ImageSlot; proof: ImageSlot };
};

/* PENDING MQS SIGN-OFF on this page's copy:
   · Turnaround. The content doc lists it as an open question ("not stated
     anywhere in the source material... worth agreeing a figure the service team
     can hold to"). The design template proposed "3 to 5 working days"; that is
     not a figure MQS has given us, so it is not published here. Replace the
     Turnaround fact once they commit to a number.
   · "One off, batch or ongoing" and "NDA on request" are reasonable but
     unconfirmed.
   · "What the service includes" and the industry/application pairs are written
     from the source page, not quoted from it.
   · The datasheet in `resource` does not exist yet, so the resource strip is
     switched off at the route. */

export const ctInspection: ServiceDetailData = {
  name: "CT Inspection Services",
  slug: "/services/ct-inspection",
  metaTitle: "CT Inspection Services — Industrial CT Scanning Services India | MQS Technologies",
  metaDescription:
    "Send us the part. Non-destructive industrial CT scanning services in India for defect detection, failure analysis, reverse engineering, dimensional measurement and CAD comparison. Conventional X-ray to 450 kV plus CT, in house at Hyderabad.",
  headline: ["See Inside in 3D.", "Validate with Confidence."],
  lead: "Fast, non-destructive CT scanning for defect detection, reverse engineering, metrology and failure analysis, on objects from microns to feet in size.",
  intro:
    "Computed tomography is the most advanced X-ray inspection technique available. It is a completely non-destructive, non-contact method for obtaining internal and external information on almost any object, from microns to feet in size. We scan the component you send us, reconstruct it as a measurable 3D volume, and return documented findings against your drawing or acceptance criteria.",
  facts: [
    { label: "Turnaround", value: "Confirmed with your scan plan" },
    { label: "Object size", value: "Microns to feet" },
    { label: "Engagement", value: "One off, batch or ongoing" },
    { label: "Confidentiality", value: "NDA on request" },
  ],
  caps: [
    {
      title: "CT inspection in 2D, 3D and full CT",
      body: "Radiography for a fast look, full tomography when the answer has to be volumetric.",
    },
    {
      title: "Failure analysis",
      body: "Cracks, voids, delamination and joint failures located and described, without cutting the part.",
    },
    {
      title: "Reverse engineering and product development",
      body: "Scan data turned into surface or solid geometry for redesign and legacy parts.",
    },
    {
      title: "Dimensional measurement and CAD comparison",
      body: "Internal and external features measured, then compared against your nominal model.",
    },
    {
      title: "Defect detection and quality validation",
      body: "Porosity, inclusions, contamination and assembly errors screened against your criteria.",
    },
    {
      title: "Material characterisation and metrology",
      body: "Density variation, wall thickness and material distribution quantified.",
    },
  ],
  inHouse: [
    { label: "X-ray capability", value: "Conventional up to 450 kV plus CT system" },
    { label: "Detector", value: "High-energy digital flat panel" },
    { label: "Handling", value: "Fully automated object handling" },
    { label: "Software", value: "MQS Imaging Suite" },
    { label: "Facility", value: "Lead shielded cabinet" },
  ],
  includes: [
    { label: "Scan planning", value: "Orientation, energy and resolution set to the feature of interest" },
    { label: "Inspection", value: "2D radiography, 3D CT or both, per requirement" },
    { label: "Analysis", value: "Defect review, measurement and CAD comparison" },
    { label: "Reporting", value: "Findings against your drawing or acceptance criteria" },
    { label: "Review", value: "Engineer to engineer walkthrough of the result" },
  ],
  deliverables: [
    {
      title: "2D radiographs",
      body: "Calibrated projection images of the areas under inspection, annotated where findings apply.",
    },
    {
      title: "3D CT volume and slices",
      body: "The reconstructed volume plus slice sets on the planes that matter, ready for your own review.",
    },
    {
      title: "Measurement reports",
      body: "Dimensional results on internal and external features, with the method stated.",
    },
    {
      title: "CAD comparison and metrology",
      body: "Scan against nominal deviation output, wall thickness and material distribution.",
    },
  ],
  proofStats: [
    { figure: "450", unit: "kV", label: "Conventional X-ray capability, in house" },
    { figure: "0", unit: "cuts", label: "Non-destructive: the part goes back as it arrived" },
    { figure: "6", unit: "areas", label: "From 2D radiography through to CAD comparison" },
  ],
  proofNote: "Capability figures. Sample result imagery to be supplied per service.",
  value: [
    { industry: "Defence", apps: "Ordnance sections, control assemblies, potted electronics" },
    { industry: "Aerospace", apps: "Castings, blades, composite bonds, additive parts" },
    { industry: "Automotive", apps: "Cylinder heads, housings, e-drive assemblies, welds" },
    { industry: "Electronics", apps: "Solder joints, BGA voiding, connectors, potting quality" },
    { industry: "Foundry and casting", apps: "Porosity and shrinkage, gating validation" },
    { industry: "R and D and academia", apps: "Prototype validation, material studies, reverse engineering" },
  ],
  midRequest: {
    title: "Have a part ready to send?",
    body: "Send the part with your drawing or acceptance criteria and we will confirm scan plan and turnaround before work starts.",
  },
  closing: {
    headline: "Have a Part You Want to Scan?",
    lead: "Tell us what you need to know about the component and our engineers will confirm approach, turnaround and reporting before anything is scanned.",
  },
  resource: {
    title: "CT Inspection Services datasheet",
    meta: "PDF, capability and submission guide",
    cta: "Download datasheet",
    href: "#contact",
  },
  images: {
    hero: {
      src: "/assets/prod-mqct.jpg",
      alt: "MQCT 225AB computed tomography system with the cabinet open",
      need: "Engineer at the CT inspection station, cabinet open or part being loaded. Full bleed, deliver 2880×1240. No demo-license or watermarked exports.",
    },
    facility: {
      need: "Facility: CT cabinet, manipulator or operator console in use. 21:9 desktop, 4:3 mobile, deliver 2560×1100.",
    },
    proof: {
      need: "Sample result: CT slice, 3D reconstruction or annotated radiograph cleared for publication. 4:3, deliver 1600×1200. No third-party software watermarks.",
    },
  },
};

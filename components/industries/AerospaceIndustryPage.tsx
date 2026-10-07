import Image from "next/image";
import AerospacePlatformGuide from "./AerospacePlatformGuide";

const needs = [
  ["01", "Complex internal geometry", "See turbine parts, housings, nozzles and structural assemblies without sectioning the component."],
  ["02", "Small defects, found early", "Identify cracks, porosity clusters, inclusions and bond issues before they become larger quality problems."],
  ["03", "Different thicknesses", "Move from fine electronics and compact components to dense, thick-section assemblies."],
  ["04", "Multi-material structures", "Evaluate bonded interfaces, layered materials and reinforcement without cutting the part."],
  ["05", "Development to production", "Support R&D, qualification, failure analysis and repeatable production QA with one inspection strategy."],
  ["06", "Traceable evidence", "Create repeatable results, image archives and reports that support technical review and audits."],
];

const concerns = [
  ["Porosity & voids", "Reveal internal cavities, clusters and density variation."],
  ["Cracks & discontinuities", "Identify structural breaks and hidden discontinuities."],
  ["Inclusions", "Detect foreign material and internal anomalies."],
  ["Bond & interface issues", "Evaluate bonded interfaces and layered structures."],
  ["Misalignment", "Check the position and relationship of internal features."],
  ["Internal geometry", "Use CT when layer separation, geometry review or metrology is required."],
];

const process = [
  ["01", "Part", "Geometry, material and thickness"],
  ["02", "Inspection goal", "Defect type, resolution and evidence needed"],
  ["03", "Imaging chain", "Source, detector and CT or DR configuration"],
  ["04", "Handling & software", "Manipulator, automation, analysis and reporting"],
  ["05", "Engineered system", "A proven platform or configured solution"],
];

const platforms = [
  {
    name: "Fixed-wing aircraft",
    scope: "Engine and propulsion components, wing structures, fuselage frames, landing gear, control surfaces and tail sections.",
    systems: "MQX.NeVa-M · MQX.NeVa · MQX.drIS",
  },
  {
    name: "Fighter aircraft",
    scope: "Nose cones, avionics, wing-root structures, dense propulsion components, mounted assemblies and rear structures.",
    systems: "High-Energy X-ray & CT · MQX.NeVa · MQX.drIS",
  },
  {
    name: "Rotorcraft",
    scope: "Avionics assemblies, rotor hubs, gearbox housings, powertrain components and tail structural sections.",
    systems: "High-Energy X-ray & CT · MQX.NeVa · MQX.NeVa-M",
  },
  {
    name: "Rockets",
    scope: "Payload fairings, interstage joints, motor casings, propellant sections and dense propulsion nozzles.",
    systems: "High-Energy X-ray & CT",
  },
];

const resources = [
  ["High-Energy X-ray & CT", "Deep-penetration inspection systems", "/brochures/high-energy-xray.pdf"],
  ["MQX.NeVa", "Industrial computed tomography", "/brochures/mqct-industrial-ct.pdf"],
  ["MQX.NeVa-M", "Microfocus CT and fine-detail inspection", "/brochures/microfocus-xray.pdf"],
  ["MQX.drIS", "Cabinet-based digital radiography", "/brochures/mqxc-cabinet-dr.pdf"],
  ["Shell & ammunition inspection", "Application-focused inspection solutions", "/brochures/shell-ammunition-inspection.pdf"],
];

const shell = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>;
}

export default function AerospaceIndustryPage() {
  return (
    <main className="bg-[#F4F8FA] text-[#41586A]">
      <section className="relative min-h-[720px] overflow-hidden bg-[#071C28] max-md:min-h-[680px]">
        <Image
          src="/assets/ind-aerospace.jpg"
          alt="Aircraft engine in an aerospace maintenance facility"
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0B5470]/30 mix-blend-color" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,35,.98)_0%,rgba(6,30,42,.88)_43%,rgba(5,22,32,.24)_78%,rgba(5,22,32,.18)_100%)] max-md:bg-[linear-gradient(180deg,rgba(5,22,32,.20)_0%,rgba(5,22,32,.92)_58%,#071C28_100%)]" />

        <div className={`${shell} relative z-10 flex min-h-[720px] items-end pb-20 pt-32 max-md:min-h-[680px] max-md:pb-12`}>
          <div className="max-w-[790px]">
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Aerospace industry</p>
            <p className="t-caption mb-0 mt-6 text-white/65">Custom requirements. Engineered solution.</p>
            <h1 className="t-display mb-0 mt-4 max-w-[13ch] text-white">See Deeper. Validate Earlier. Fly with Confidence.</h1>
            <p className="t-lead mb-0 mt-7 max-w-[63ch] text-white/75">
              From propulsion systems to avionics and structural assemblies, MQS engineers X-ray and CT solutions around the part,
              the defect, the material and the workflow.
            </p>
            <a href="#contact" className="group t-button mt-9 inline-flex h-[52px] items-center gap-3 bg-[#16C1F3] px-7 text-[#08283A] no-underline transition-colors hover:bg-[#0FA5D2]">
              Talk to an Expert <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Industry overview</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Critical Parts. Invisible Risks. Clear Answers.</h2>
          </div>
          <div className="space-y-5">
            <p className="t-lead m-0">
              Aerospace platforms operate under demanding performance and safety requirements. Porosity, cracks, inclusions,
              bond failures and dimensional deviations can remain hidden while still affecting reliability.
            </p>
            <p className="t-body m-0 text-[#5F7688]">
              MQS supports aerospace applications with High-Energy X-ray and CT systems, MQX.NeVa industrial CT, MQX.NeVa-M
              microfocus CT and MQX.drIS cabinet-based digital radiography. The right configuration follows the component size,
              material, wall thickness, defect target and inspection workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <div>
              <p className="t-eyebrow m-0 text-[#0A6A88]">What aerospace teams need</p>
              <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Inspection evidence that keeps pace with the programme.</h2>
            </div>
            <p className="t-lead m-0">One inspection strategy may need to support research, qualification, investigation and routine production QA.</p>
          </div>
          <div className="mt-12 grid border-t border-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {needs.map(([number, title, copy], index) => (
              <article key={title} className={`border-b border-[#D3DFE7] py-8 md:px-8 ${index % 2 ? "md:border-l" : ""} lg:border-l lg:[&:nth-child(3n+1)]:border-l-0`}>
                <span className="t-eyebrow text-[#0A6A88]">{number}</span>
                <h3 className="t-h4 mb-0 mt-5 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={`${shell} grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#071C28]">
            <Image
              src="/assets/inset-turbine.jpg"
              alt="Turbine component representing flight-critical aerospace inspection"
              fill
              quality={90}
              sizes="(min-width:1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Why MQS</p>
            <h2 className="t-h2 mb-0 mt-5 text-white">Built Around the Mission. Not Around a Catalogue.</h2>
            <p className="t-lead mb-0 mt-7 text-white/75">
              Aerospace programmes need more than a machine specification. MQS starts with the component and inspection objective,
              then selects a proven platform and configures only what the application requires.
            </p>
            <p className="t-body mb-0 mt-5 text-white/60">
              Source, detector, manipulation, shielding, automation, software and reporting are engineered as one inspection workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Inspection concerns</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[17ch] text-[#0B2A3A]">See the defects that matter.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {concerns.map(([title, copy]) => (
              <article key={title} className="min-h-[210px] bg-[#F4F8FA] p-8">
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body mb-0 mt-5 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Application engineering</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-[#0B2A3A]">Your Component Defines the Solution.</h2>
            <p className="t-lead m-0">The inspection system should follow the engineering problem—not force the problem into a fixed machine.</p>
          </div>
          <div className="mt-12 grid border-y border-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {process.map(([number, title, copy], index) => (
              <article key={title} className={`border-b border-[#D3DFE7] py-7 md:px-7 ${index % 2 ? "md:border-l" : ""} lg:border-b-0 lg:border-l lg:first:border-l-0`}>
                <span className="t-eyebrow text-[#0A6A88]">{number}</span>
                <h3 className="t-h4 mb-0 mt-5 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="applications" className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Product highlights</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-[#0B2A3A]">One aircraft. Multiple inspection decisions.</h2>
            <p className="t-lead m-0">Select a labelled inspection area to see how MQS maps the component and risk to the right imaging workflow.</p>
          </div>
          <AerospacePlatformGuide />
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Application coverage</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">One programme. Many inspection challenges.</h2>
          <div className="mt-12 grid border-t border-[#D3DFE7] md:grid-cols-2 lg:mt-16">
            {platforms.map((platform, index) => (
              <article key={platform.name} className={`border-b border-[#D3DFE7] py-9 md:px-9 ${index % 2 ? "md:border-l" : ""}`}>
                <span className="t-caption text-[#0A6A88]">0{index + 1}</span>
                <h3 className="t-h3 mb-0 mt-5 text-[#0B2A3A]">{platform.name}</h3>
                <p className="t-body mb-0 mt-5 text-[#5F7688]">{platform.scope}</p>
                <p className="t-caption mb-0 mt-7 border-t border-[#D3DFE7] pt-5 text-[#0A6A88]">{platform.systems}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">Safe, traceable inspection</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-white">Evidence designed for technical review.</h2>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-3 lg:mt-16">
            {[
              ["Radiation safety", "AERB-aligned safety architecture for shielded inspection systems."],
              ["Inspection standards", "ASTM-aligned workflows where applicable to the component and inspection objective."],
              ["Traceability", "Inspection records and reporting that support customer review and audits."],
            ].map(([title, copy]) => (
              <article key={title} className="min-h-[230px] bg-[#0E3448] p-8">
                <h3 className="t-h4 m-0 text-white">{title}</h3>
                <p className="t-body mb-0 mt-7 text-white/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Resources</p>
          <div className="mt-5 flex flex-col gap-5 border-b border-[#D3DFE7] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="t-h2 m-0 max-w-[14ch] text-[#0B2A3A]">Technical details for your review.</h2>
            <p className="t-body m-0 max-w-[46ch] text-[#5F7688]">Move from an application to the relevant platform information, or share the component with our engineering team.</p>
          </div>
          <div className="grid md:grid-cols-2">
            {resources.map(([name, description, href], index) => (
              <a key={name} href={href} className={`group border-b border-[#D3DFE7] py-7 text-[#0B2A3A] no-underline md:px-7 ${index % 2 ? "md:border-l" : ""}`}>
                <span className="t-caption text-[#0A6A88]">PDF brochure</span>
                <span className="mt-3 flex items-center justify-between gap-6">
                  <span>
                    <strong className="t-h4 block">{name}</strong>
                    <span className="t-body-sm mt-2 block text-[#5F7688]">{description}</span>
                  </span>
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-6 bg-[#E9F0F4] p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="t-h4 m-0 max-w-[38ch] text-[#0B2A3A]">Bring us the inspection challenge.</p>
              <p className="t-body-sm mb-0 mt-3 max-w-[62ch] text-[#5F7688]">Share the component size, material, thickness, defect target and inspection workflow.</p>
            </div>
            <a href="#contact" className="group t-button inline-flex h-[52px] shrink-0 items-center justify-center gap-3 bg-[#0E3A52] px-7 text-white no-underline hover:bg-[#0A2B3D]">Talk to an Expert <Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

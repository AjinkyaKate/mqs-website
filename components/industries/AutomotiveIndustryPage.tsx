import Image from "next/image";

const challenges = [
  ["01", "Production speed", "Inspection must keep pace with the line."],
  ["02", "Complex castings", "Internal geometry may require multiple viewing angles."],
  ["03", "EV and electronics", "Smaller features demand finer internal visibility."],
  ["04", "Scrap and rework", "Earlier defect detection protects downstream value."],
  ["05", "Traceability", "Inspection results must become usable digital evidence."],
];

const positioning = [
  "Proven standard platforms for faster project definition",
  "Custom engineering around the part, defect and throughput requirement",
  "Indigenous design ownership with premium engineering capability",
  "Integrated imaging, automation, software and production workflow",
];

const applications = [
  {
    number: "01",
    part: "Engine assemblies",
    systems: [
      ["MQS.PRISM", "/brochures/mqs-prism.pdf", "High-throughput digital radiography configurable around production inspection needs."],
      ["MQX.NeVa", "/products/mqx-neva", "3D CT for internal geometry review and application-specific analysis."],
    ],
  },
  {
    number: "02",
    part: "Crankshafts",
    systems: [
      ["MQX.drIS Cabinet DR", "/products/mqx-dris", "Flexible 2D inspection configured around component size and inspection objective."],
      ["MQX.NeVa", "/products/mqx-neva", "3D CT where deeper internal detail or dimensional understanding is required."],
    ],
  },
  {
    number: "03",
    part: "Pistons",
    systems: [
      ["MQX.drIS Cabinet DR", "/products/mqx-dris", "2D inspection for porosity and internal defects, configured to the application."],
      ["Microfocus X-ray / CT", "/products/mqx-neva", "Finer detail where smaller defects require higher-resolution imaging."],
    ],
  },
  {
    number: "04",
    part: "Valves",
    systems: [["Microfocus X-ray / CT", "/products/mqx-neva", "Detailed inspection for fine cracks and voids."]],
  },
  {
    number: "05",
    part: "Brake calipers",
    systems: [
      ["MQS.PRISM", "/brochures/mqs-prism.pdf", "Production-focused digital radiography for repeatable inspection at scale."],
      ["MQX.NeVa", "/products/mqx-neva", "3D CT for porosity mapping, internal analysis and root-cause investigation."],
    ],
  },
  {
    number: "06",
    part: "Steering knuckles",
    systems: [["MQS.PRISM", "/brochures/mqs-prism.pdf", "High-throughput inspection configured for production environments."]],
  },
  {
    number: "07",
    part: "Alloy wheels",
    systems: [["MQWR 160U", "/brochures/mqwr-160u-wheel-inspection.pdf", "A dedicated inline solution engineered for alloy-wheel inspection."]],
  },
  {
    number: "08",
    part: "Under brackets",
    systems: [
      ["MQX.drIS Cabinet DR", "/products/mqx-dris", "Flexible batch inspection for varied automotive components."],
      ["MQS.PRISM", "/brochures/mqs-prism.pdf", "Higher-throughput inspection where production speed is the priority."],
    ],
  },
];

const resources = [
  ["MQS.PRISM", "Digital radiography for production inspection", "/brochures/mqs-prism.pdf"],
  ["MQWR 160U", "Inline alloy-wheel inspection", "/brochures/mqwr-160u-wheel-inspection.pdf"],
  ["MQX.drIS", "Cabinet digital radiography systems", "/brochures/mqxc-cabinet-dr.pdf"],
  ["MQX.NeVa", "Industrial computed tomography systems", "/brochures/mqct-industrial-ct.pdf"],
];

const shell = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>;
}

export default function AutomotiveIndustryPage() {
  return (
    <main className="bg-[#F4F8FA] text-[#41586A]">
      <section className="relative min-h-[720px] overflow-hidden bg-[#0B2A3A] max-md:min-h-[680px]">
        <Image
          src="/assets/industries/automotive/exploded-car.png"
          alt="Exploded-view automotive structure showing the internal assemblies inspected by X-ray and CT"
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover object-[64%_center] max-md:object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,42,58,.97)_0%,rgba(11,42,58,.88)_40%,rgba(11,42,58,.28)_75%,rgba(11,42,58,.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(11,42,58,.2)_0%,rgba(11,42,58,.94)_58%,#0B2A3A_100%)]" />
        <div className={`${shell} relative z-10 flex min-h-[720px] items-end pb-20 pt-32 max-md:min-h-[680px] max-md:pb-12`}>
          <div className="max-w-[760px]">
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Automotive industry</p>
            <p className="t-caption mb-0 mt-6 text-white/65">Custom requirements. Engineered solution.</p>
            <h1 className="t-display mb-0 mt-4 max-w-[12ch] text-white">See Inside. Decide Faster. Build Safer Vehicles.</h1>
            <p className="t-lead mb-0 mt-7 max-w-[61ch] text-white/75">
              From proven standard platforms to application-specific X-ray and CT systems, MQS engineers the configuration
              around your component, defect type, throughput and production workflow.
            </p>
            <a href="#contact" className="t-button mt-9 inline-flex h-[52px] items-center gap-3 bg-[#16C1F3] px-7 text-[#08283A] no-underline transition-colors hover:bg-[#0FA5D2]">
              Talk to an Expert <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Industry overview</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Built on Proven Platforms. Engineered for Your Application.</h2>
          </div>
          <div className="space-y-5">
            <p className="t-lead m-0">
              Automotive production is moving toward faster, more traceable quality control. Cast housings, brake components,
              powertrain parts and critical assemblies may contain porosity, cracks, inclusions or misalignment that cannot be
              seen from the outside.
            </p>
            <p className="t-body m-0 text-[#5F7688]">
              Digital radiography and CT let teams look inside without cutting the component open, helping them make quicker
              decisions, reduce unnecessary scrap and build stronger inspection records. MQS starts with proven platforms and
              adapts the source, detector, part handling, shielding, automation, software and workflow integration to the job.
            </p>
          </div>
        </div>
        <div className={`${shell} mt-12 grid border-y border-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-4`}>
          {positioning.map((item, index) => (
            <div key={item} className="border-b border-[#D3DFE7] py-7 md:px-7 md:[&:nth-child(even)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
              <span className="t-eyebrow text-[#0A6A88]">0{index + 1}</span>
              <p className="t-body mb-0 mt-4 font-medium text-[#0B2A3A]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <div>
              <p className="t-eyebrow m-0 text-[#0A6A88]">Challenges and needs</p>
              <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Different Parts. Different Defects. Different Inspection Needs.</h2>
            </div>
            <p className="t-lead m-0">
              A production line needs an inspection system that responds to the part and its risk—not a generic machine that
              forces the application into one fixed workflow.
            </p>
          </div>
          <div className="mt-12 grid border-t border-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {challenges.map(([number, title, copy], index) => (
              <article key={title} className={`border-b border-[#D3DFE7] py-7 md:px-7 ${index % 2 ? "md:border-l" : ""} lg:border-l lg:first:border-l-0`}>
                <span className="t-eyebrow text-[#0A6A88]">{number}</span>
                <h3 className="t-h4 mb-0 mt-5 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={`${shell} grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <Image
              src="/assets/ind-auto-wheel-hub.jpg"
              alt="Radiograph of an alloy wheel hub showing its internal casting structure"
              fill
              quality={90}
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Why MQS</p>
            <h2 className="t-h2 mb-0 mt-5 text-white">Indigenous Engineering. Premium by Design.</h2>
            <p className="t-lead mb-0 mt-7 text-white/75">
              For MQS, indigenization means design ownership, application know-how and the freedom to engineer around the
              customer requirement. Standard systems provide a proven foundation. Where the application demands more, MQS can
              configure the imaging chain, manipulator, shielding, automation, software and system integration around the
              inspection objective.
            </p>
            <p className="t-body mb-0 mt-5 text-white/60">
              The result is a solution selected for technical fit and performance—not a one-size-fits-all machine.
            </p>
          </div>
        </div>
      </section>

      <section id="applications" className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <div>
              <p className="t-eyebrow m-0 text-[#0A6A88]">MQS solution applications</p>
              <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">One vehicle. Eight inspection decisions.</h2>
            </div>
            <p className="t-lead m-0">Start with the component. The recommended platform follows from the defect, scale and required throughput.</p>
          </div>

          <figure className="relative mt-12 aspect-[3/2] overflow-hidden bg-[#303940] lg:mt-16">
            <Image
              src="/assets/industries/automotive/exploded-car.png"
              alt="Automotive structure used to map components to MQS inspection systems"
              fill
              quality={90}
              sizes="(min-width:1440px) 1220px, 100vw"
              className="object-cover"
            />
            <figcaption className="t-caption absolute bottom-0 left-0 bg-[#0B2A3A]/90 px-5 py-4 text-white/75">Component-to-system guide</figcaption>
          </figure>

          <div className="mt-8 grid border-t border-[#D3DFE7] lg:grid-cols-2">
            {applications.map((application, index) => (
              <article key={application.part} className={`border-b border-[#D3DFE7] py-8 lg:px-8 ${index % 2 ? "lg:border-l" : ""}`}>
                <div className="flex items-baseline gap-4">
                  <span className="t-eyebrow text-[#0A6A88]">{application.number}</span>
                  <h3 className="t-h3 m-0 text-[#0B2A3A]">{application.part}</h3>
                </div>
                <div className="mt-6 space-y-5">
                  {application.systems.map(([name, href, description]) => (
                    <div key={name} className="grid gap-2 sm:grid-cols-[170px_1fr] sm:gap-6">
                      <a href={href} className="group t-caption flex items-center gap-2 text-[#0A6A88] no-underline hover:underline">{name} <Arrow /></a>
                      <p className="t-body-sm m-0 text-[#5F7688]">{description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Certifications and compliance</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">Engineered for Safe, Traceable Production.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-3 lg:mt-16">
            <article className="flex min-h-[260px] flex-col justify-between bg-white p-8">
              <div className="relative h-20 w-full"><Image src="/assets/industries/automotive/aerb.jpg" alt="Atomic Energy Regulatory Board" fill sizes="300px" className="object-contain object-left" /></div>
              <p className="t-body mb-0 mt-8 text-[#41586A]">AERB-compliant and type-approved systems for radiation safety.</p>
            </article>
            <article className="flex min-h-[260px] flex-col justify-between bg-white p-8">
              <div className="relative h-20 w-full"><Image src="/assets/industries/automotive/astm.png" alt="ASTM International" fill sizes="300px" className="object-contain object-left" /></div>
              <p className="t-body mb-0 mt-8 text-[#41586A]">Inspection workflows aligned with ASTM E2422 where applicable.</p>
            </article>
            <article className="flex min-h-[260px] flex-col justify-between bg-white p-8">
              <div className="relative h-20 w-full"><Image src="/assets/industries/automotive/iso-9001.jpg" alt="ISO 9001:2015" fill sizes="300px" className="object-contain object-left" /></div>
              <p className="t-body mb-0 mt-8 text-[#41586A]">Digital traceability and reporting to support customer audits.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Resources</p>
          <div className="mt-5 flex flex-col gap-5 border-b border-[#D3DFE7] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="t-h2 m-0 max-w-[14ch] text-[#0B2A3A]">Technical details for your review.</h2>
            <p className="t-body m-0 max-w-[46ch] text-[#5F7688]">Download the relevant product brochure, or send us the component and inspection objective.</p>
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
            <p className="t-h4 m-0 max-w-[38ch] text-[#0B2A3A]">Have a standard requirement or a custom inspection challenge?</p>
            <a href="#contact" className="t-button group inline-flex h-[52px] shrink-0 items-center justify-center gap-3 bg-[#0E3A52] px-7 text-white no-underline hover:bg-[#0A2B3D]">Talk to an Expert <Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

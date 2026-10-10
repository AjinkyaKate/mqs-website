import Image from "next/image";

/* Copy from Heavy_Engineering_Industry_Website_Page_Final.docx (client,
   October 2026). Every table in the source is shown as cards, per the client's
   review ("wherever there's a table put cards"). Designer notes in the source
   ("the attached MQS material…", "use real MQS inspection…", the resources
   instruction) are rewritten as page copy rather than shown verbatim. */

const needs = [
  ["01", "Detect internal weld defects", "Porosity, lack of fusion, inclusions and cracks must be visible before the component moves forward."],
  ["02", "Handle changing pipe geometry", "Diameter, wall thickness, material and weld location all influence the imaging setup."],
  ["03", "Inspect at production speed", "Real time imaging and repeatable manipulation help quality control keep pace with manufacturing."],
  ["04", "Maintain consistent image quality", "Source to detector geometry, positioning and software controls need to produce repeatable results."],
  ["05", "Create traceability", "Images, measurements and inspection records should support review, reporting and customer documentation."],
  ["06", "Work to relevant standards", "Inspection workflows need to align with the applicable weld and radiography requirements."],
];

const process = [
  ["01", "Component & Weld", "Diameter, wall thickness, material, weld type"],
  ["02", "Inspection Goal", "Defect target, sensitivity, evidence needed"],
  ["03", "Imaging Chain", "X ray source, detector and image quality"],
  ["04", "Handling & Shielding", "Cabinet, bunker or modular integration"],
  ["05", "Engineered System", "Standard platform or configured solution"],
];

const architectures = [
  ["Cabinet Based Digital Radiography", "Controlled inspection where a self shielded system fits the part size and workflow.", "Lead shielding, source and detector geometry, manipulator, interlocks and operator controls."],
  ["Bunker Based System", "Larger parts, tubular weld joints or layouts where the inspection equipment operates inside a shielded room.", "Source and detector selection, manipulator, positioning, control station and bunker integration."],
  ["Open / Modular Integration", "Existing shielded rooms or production cells that need a flexible inspection mechanism rather than a complete cabinet.", "Modular motion system, alignment, fixtures, automation and interface with the customer environment."],
];

const solutions = [
  ["Straight Pipe Butt Welds", "Real time Digital Radiography with automated positioning and image acquisition.", "High speed inspection with clear visibility of internal weld conditions."],
  ["Steel Tubular Butt Weld Joints", "Digital Radiography configurations shown with 225 kV and 320 kV sources, flat panel detection and dedicated manipulation.", "Repeatable inspection of tubular weld joints with controlled geometry."],
  ["SAW Pipes", "Digital Radiography for longitudinal, spiral and circumferential or repair welds.", "Fast weld inspection with digital image review and traceable results."],
  ["Custom Weld Inspection Cells", "Cabinet, bunker or open modular architecture selected around the part and production environment.", "A system that fits the component, shielding concept, handling and throughput requirement."],
];

const reference = [
  ["Wall thickness", "8 – 18 mm", "8 mm minimum to 18 mm maximum"],
  ["Pipe diameter", "25 – 100 mm", "25 mm minimum to 100 mm maximum"],
  ["Material examples", "SS · Alloy · Carbon", "Stainless steel, alloy and carbon"],
];

const radiographs = [
  ["Raw image", "/assets/industries/heavy-engineering/radiograph-raw.png", "Raw radiograph of a pipe butt weld"],
  ["8 mm filtered, defects visible", "/assets/industries/heavy-engineering/radiograph-filtered-defects.png", "Filtered radiograph of an 8 mm pipe weld with defects visible"],
  ["Negative image, 1T hole visible", "/assets/industries/heavy-engineering/radiograph-negative-1t.png", "Negative radiograph of a pipe weld with the 1T IQI hole visible"],
];

const concerns = [
  ["Porosity", "Gas pockets and internal voids within the weld region."],
  ["Lack of fusion", "Areas where weld material has not fused as intended."],
  ["Inclusions", "Foreign or nonmetallic material trapped within the weld."],
  ["Cracks", "Internal discontinuities that may not be visible from the surface."],
  ["Weld geometry and position", "Image evidence that supports location, measurement and review of the inspected region."],
];

const evidence = [
  ["Defect identification and annotation", "/assets/industries/heavy-engineering/software-defect-annotation.jpg"],
  ["Length and dimensional measurement", "/assets/industries/heavy-engineering/software-length-measurement.jpg"],
  ["Signal to noise evaluation", "/assets/industries/heavy-engineering/software-snr.jpg"],
  ["Image comparison for inspection review", "/assets/industries/heavy-engineering/software-image-comparison.jpg"],
];

const suite = [
  ["Dynamic & Static Imaging", "Support live real time imaging and still image acquisition for detailed inspection."],
  ["Measurement Tools", "Length, area and free hand measurements support dimensional review and documentation."],
  ["Automatic Enhancement", "Image enhancement filters improve visibility and help operators review subtle indications."],
  ["Overlay & ROI", "Compare images visually and focus analysis on selected regions of interest."],
  ["Detector Quality Tools", "Bad pixel mapping, detector calibration, DIP calculation and SNR measurement support image integrity."],
  ["Standards Support", "ASTM E2422 tools for digital radiographic detector validation and performance assurance."],
];

const standards = [
  ["ISO 17636", "Weld inspection workflows reference ISO 17636."],
  ["ISO 10893-7 · ISO / EN 17636-2:2013", "SAW pipe inspection references ISO 10893-7 and ISO / EN 17636-2:2013, with ASTM requirements where applicable."],
  ["ASTM E2422", "MQS Imaging Suite includes ASTM E2422 tools for detector validation and performance assurance."],
  ["Radiation safety", "System architecture can incorporate radiation shielding, interlocks, emergency controls and the safety provisions required for the selected installation concept."],
  ["Traceability", "Digital images and software measurements support inspection records, review and traceability."],
];

const platforms = [
  ["Standard Platform", "Best when the part size, source energy, shielding and handling requirement fit an established architecture. Configuration focuses on the application specific setup."],
  ["Custom Engineered Configuration", "Best when geometry, line integration, bunker layout, manipulation, automation, fixtures or software workflow require a system designed around the customer environment."],
];

/* Only the pipe inspection brochure exists in /public/brochures today. The other
   three documents are listed in the client brief but not yet supplied, so they
   route to the enquiry form until the PDFs arrive. */
const resources: [string, string, string | null][] = [
  ["Butt Weld / Straight Pipe Inspection", "Application brochure", "/brochures/pipe-inspection-dr.pdf"],
  ["Steel Tubular Butt Weld Inspection", "Solution brief", null],
  ["SAW Pipe Digital Radiography", "Application brochure", null],
  ["MQS Imaging Suite", "Software overview", null],
];

const shell = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>;
}

export default function HeavyEngineeringIndustryPage() {
  return (
    <main className="bg-[#F4F8FA] text-[#41586A]">
      {/* Hero. The client asked for a pipe image here until their header video
          arrives; this is the dark welding photograph already in the asset set,
          which holds up under the scrim where the light product renders do not. */}
      <section className="relative min-h-[720px] overflow-hidden bg-[#071C28] max-md:min-h-[680px]">
        <Image
          src="/assets/inset-welder.jpg"
          alt="Welder working inside a large steel pipe section"
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,35,.98)_0%,rgba(6,30,42,.88)_43%,rgba(5,22,32,.22)_78%,rgba(5,22,32,.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(5,22,32,.18)_0%,rgba(5,22,32,.92)_58%,#071C28_100%)]" />

        <div className={`${shell} relative z-10 flex min-h-[720px] items-end pb-20 pt-32 max-md:min-h-[680px] max-md:pb-12`}>
          <div className="max-w-[800px]">
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Heavy engineering</p>
            <p className="t-caption mb-0 mt-6 text-white/65">Custom requirements. Engineered solution.</p>
            <h1 className="t-display mb-0 mt-4 max-w-[13ch] text-white">Inspect the Weld. Trust the Structure.</h1>
            <p className="t-lead mb-0 mt-7 max-w-[63ch] text-white/75">
              From straight pipe butt welds to SAW pipe joints, MQS engineers Digital Radiography solutions around the weld geometry, wall thickness, defect target, throughput and production environment.
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
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Weld Quality Has to Hold Up in the Real World.</h2>
          </div>
          <div className="space-y-5">
            <p className="t-lead m-0">
              Heavy engineering depends on the integrity of welded pipes, tubular joints and fabricated structures. Porosity, lack of fusion, inclusions and cracks can remain hidden below the surface, while production teams still need fast decisions and consistent inspection records.
            </p>
            <p className="t-body m-0 text-[#5F7688]">
              MQS develops Digital Radiography systems for weld inspection in production and quality environments, combining X ray sources, flat panel detectors, manipulation, shielding and imaging software into a system configured around the application.
            </p>
          </div>
        </div>
        <div className={`${shell} mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16`}>
          <figure className="m-0">
            <div className="relative aspect-[1703/923] overflow-hidden bg-[#E9EDF0]">
              <Image src="/assets/product-pipe.png" alt="MQS real time Digital Radiography system for straight pipe butt weld inspection" fill quality={90} sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="t-caption mt-4 text-[#5F7688]">Representative MQS real time Digital Radiography solution for straight pipe butt weld inspection</figcaption>
          </figure>
          <div className="border-l-4 border-[#16C1F3] bg-[#F4F8FA] p-8">
            <p className="t-h4 m-0 text-[#0B2A3A]">Standard where it works. Custom where it matters.</p>
            <p className="t-body mb-0 mt-4 text-[#5F7688]">
              MQS can start with a proven cabinet, bunker or modular architecture and configure the source, detector, manipulator, shielding, software and handling around the inspection requirement.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">What heavy engineering QA teams need</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[20ch] text-[#0B2A3A]">What Heavy Engineering QA Teams Need from Inspection.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {needs.map(([number, title, copy]) => (
              <article key={title} className="bg-white p-8">
                <span className="t-eyebrow text-[#0A6A88]">{number}</span>
                <h3 className="t-h4 mb-0 mt-5 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">Application engineering</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-white">Your Weld Defines the Inspection.</h2>
            <p className="t-lead m-0 text-white/70">
              The inspection system should follow the weld and production requirement, not the other way around. MQS starts with the pipe or component, the defect target and the workflow, then selects or configures the imaging and handling architecture.
            </p>
          </div>
        </div>
        <div className={`${shell} mt-14 grid border-y border-white/15 md:grid-cols-2 lg:mt-20 lg:grid-cols-5`}>
          {process.map(([number, title, copy], index) => (
            <article key={title} className={`border-b border-white/15 py-7 md:px-7 ${index % 2 ? "md:border-l" : ""} lg:border-b-0 lg:border-l lg:first:border-l-0`}>
              <span className="t-eyebrow text-[#5AD1F7]">{number}</span>
              <h3 className="t-h4 mb-0 mt-5 text-white">{title}</h3>
              <p className="t-body-sm mb-0 mt-3 text-white/60">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Indigenous engineering</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Indigenous Engineering. Premium by Design.</h2>
          </div>
          <p className="t-lead m-0">
            For MQS, indigenization means design ownership, application engineering and the ability to adapt the complete system around the customer requirement. It is not a low cost positioning. The value is in engineering control, integration capability and long term support.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Deployment architectures</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">One Inspection Need. Three Ways to Deploy.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
            {architectures.map(([title, fit, configures], index) => (
              <article key={title} className="flex flex-col border-t-4 border-[#16C1F3] bg-white p-8">
                <span className="t-eyebrow text-[#0A6A88]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mb-0 mt-5 text-[#0B2A3A]">{title}</h3>
                <p className="t-caption mb-0 mt-8 text-[#0A6A88]">Best suited for</p>
                <p className="t-body-sm mb-0 mt-2 text-[#41586A]">{fit}</p>
                <p className="t-caption mb-0 mt-6 border-t border-[#D3DFE7] pt-6 text-[#0A6A88]">What MQS configures</p>
                <p className="t-body-sm mb-0 mt-2 text-[#5F7688]">{configures}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">Solutions</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-white">MQS Solutions for Heavy Engineering.</h2>
            <p className="t-lead m-0 text-white/70">Each solution starts from a weld and pipe application MQS already inspects, from straight pipe butt welds to complete inspection cells.</p>
          </div>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-2 lg:mt-16">
            {solutions.map(([title, approach, value], index) => (
              <article key={title} className="flex flex-col bg-[#0E3448] p-8 lg:p-10">
                <span className="t-eyebrow text-[#5AD1F7]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mb-0 mt-5 text-white">{title}</h3>
                <p className="t-caption mb-0 mt-8 text-[#5AD1F7]">MQS inspection approach</p>
                <p className="t-body mb-0 mt-2 text-white/75">{approach}</p>
                <p className="t-caption mb-0 mt-6 border-t border-white/15 pt-6 text-[#5AD1F7]">Inspection value</p>
                <p className="t-body mb-0 mt-2 text-white/65">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Reference application</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[20ch] text-[#0B2A3A]">Real Time Butt Weld Inspection.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-3 lg:mt-16">
            {reference.map(([label, value, detail]) => (
              <article key={label} className="bg-[#F4F8FA] p-8">
                <p className="t-eyebrow m-0 text-[#0A6A88]">{label}</p>
                <p className="mb-0 mt-5 text-[clamp(30px,3vw,40px)] font-semibold leading-none tracking-[-0.03em] text-[#0B2A3A]">{value}</p>
                <p className="t-body-sm mb-0 mt-4 text-[#5F7688]">{detail}</p>
              </article>
            ))}
          </div>
          <p className="t-caption mb-0 mt-4 text-[#5F7688]">Reference range for the real time butt weld inspection application.</p>

          <div className="mt-14 grid gap-px bg-[#D3DFE7] md:grid-cols-3 lg:mt-20">
            {radiographs.map(([title, src, alt]) => (
              <figure key={title} className="m-0 flex flex-col bg-[#071C28]">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={src} alt={alt} fill quality={90} sizes="(min-width:768px) 33vw, 100vw" className="object-contain" />
                </div>
                <figcaption className="t-h4 mt-auto bg-[#F4F8FA] px-7 py-6 text-[#0B2A3A]">{title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Inspection concerns</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-[#0B2A3A]">See the Defects That Matter.</h2>
            <p className="t-lead m-0">
              The value of radiography is not simply producing an image. It is revealing the internal conditions that matter to weld quality and making them clear enough for a repeatable decision.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {concerns.map(([title, copy]) => (
              <article key={title} className="bg-white p-7">
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Inspection evidence</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[20ch] text-[#0B2A3A]">Real Inspection Evidence.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16">
            {evidence.map(([title, src]) => (
              <figure key={title} className="m-0 bg-[#F4F8FA]">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#071C28]">
                  <Image src={src} alt={`MQS Imaging Suite: ${title.toLowerCase()}`} fill quality={90} sizes="(min-width:768px) 50vw, 100vw" className="object-contain" />
                </div>
                <figcaption className="t-h4 px-7 py-6 text-[#0B2A3A]">{title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={`${shell} grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#5AD1F7]">MQS Imaging Suite</p>
            <h2 className="t-h2 mb-0 mt-5 text-white">From Image to Evidence.</h2>
            <p className="t-lead mb-0 mt-7 text-white/75">
              MQS Imaging Suite supports image acquisition, processing and review so operators can move from radiographic capture to a documented inspection decision within one workflow.
            </p>
          </div>
          <figure className="m-0">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#071C28]">
              <Image src="/assets/industries/heavy-engineering/imaging-suite.jpg" alt="MQS Imaging Suite acquisition and review screen" fill quality={90} sizes="(min-width:1024px) 52vw, 100vw" className="object-contain" />
            </div>
            <figcaption className="t-caption mt-4 text-white/55">MQS Imaging Suite for acquisition, processing, measurement and inspection review</figcaption>
          </figure>
        </div>
        <div className={`${shell} mt-14 lg:mt-20`}>
          <div className="grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {suite.map(([title, copy]) => (
              <article key={title} className="bg-[#0E3448] p-8">
                <h3 className="t-h4 m-0 text-white">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-white/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className={`${shell} mt-14 lg:mt-20`}>
          <div className="border-l-4 border-[#16C1F3] bg-white/5 p-8 lg:p-10">
            <p className="t-h3 m-0 text-white">Imaging That Supports the Decision.</p>
            <p className="t-body mb-0 mt-4 max-w-[80ch] text-white/70">
              The software layer matters because the same inspection must be repeatable across operators, shifts and customer reviews. Measurement, enhancement, detector validation and image comparison tools help convert radiographic data into usable inspection evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Standards, safety & traceability</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[20ch] text-[#0B2A3A]">Built for Standards, Safety and Traceability.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {standards.map(([title, copy]) => (
              <article key={title} className="bg-[#F4F8FA] p-7">
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Proven platforms</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-[#0B2A3A]">Proven Platforms. Configured for Your Requirement.</h2>
            <p className="t-lead m-0">
              Not every heavy engineering application needs a completely custom machine. Where a standard cabinet or manipulation platform fits the job, MQS can use it as the foundation. Where the pipe size, weld position, shielding concept, line layout or throughput requires something different, the system can be configured around the application.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
            {platforms.map(([title, copy], index) => (
              <article key={title} className={`p-8 lg:p-10 ${index ? "bg-[#0B2A3A] text-white" : "border border-[#D3DFE7] bg-white"}`}>
                <h3 className={`t-h3 m-0 ${index ? "text-white" : "text-[#0B2A3A]"}`}>{title}</h3>
                <p className={`t-body mb-0 mt-5 ${index ? "text-white/70" : "text-[#5F7688]"}`}>{copy}</p>
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
            <p className="t-body m-0 max-w-[46ch] text-[#5F7688]">Move directly from the inspection challenge to the relevant technical material.</p>
          </div>
          <div className="grid md:grid-cols-2">
            {resources.map(([name, kind, href], index) => (
              <a key={name} href={href ?? "#contact"} className={`group border-b border-[#D3DFE7] py-7 text-[#0B2A3A] no-underline md:px-7 ${index % 2 ? "md:border-l" : ""}`}>
                <span className="t-caption text-[#0A6A88]">{href ? `PDF · ${kind}` : `${kind} · Available on request`}</span>
                <span className="mt-3 flex items-center justify-between gap-6">
                  <strong className="t-h4 block">{name}</strong>
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-6 bg-[#E9F0F4] p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="t-h4 m-0 max-w-[38ch] text-[#0B2A3A]">Bring Us the Weld. We’ll Engineer the Inspection.</p>
              <p className="t-body-sm mb-0 mt-3 max-w-[62ch] text-[#5F7688]">
                Share the pipe diameter, wall thickness, material, weld type, defect target, throughput and installation environment. MQS can recommend a standard platform or engineer the Digital Radiography system around the production requirement.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group t-button inline-flex h-[52px] items-center justify-center gap-3 bg-[#0E3A52] px-7 text-white no-underline hover:bg-[#0A2B3D]">Talk to an Expert <Arrow /></a>
              <a href="#contact" className="group t-button inline-flex h-[52px] items-center justify-center gap-3 border border-[#0E3A52] px-7 text-[#0E3A52] no-underline hover:bg-white">Request a Demo <Arrow /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";

const needs = [
  ["01", "See hidden solder defects", "Reveal BGA and QFN voids, cracks, bridging and head-in-pillow conditions that visual inspection can miss."],
  ["02", "Resolve overlap", "Separate layered boards and stacked features when a single 2D view leaves internal structures ambiguous."],
  ["03", "Keep pace with production", "Support fast, repeatable decisions without turning inspection into a production queue."],
  ["04", "Reduce destructive analysis", "Build internal evidence before cutting a board or introducing additional rework risk."],
  ["05", "Standardize decisions", "Use measurement, pass/fail criteria and repeatable workflows to reduce operator subjectivity."],
  ["06", "Protect inventory flow", "Count reel components accurately to prevent material mismatch and line stoppages."],
  ["07", "Create traceability", "Retain inspection images, measurements and reports for process analysis, customer review and audits."],
];

const process = [
  ["01", "Board & package", "PCB size, package type and density"],
  ["02", "Inspection goal", "Defect type, resolution and evidence"],
  ["03", "Imaging mode", "2D, 2.5D, CT or inline 3D"],
  ["04", "Automation & data", "Handling, reporting and ERP / SPC"],
  ["05", "Engineered solution", "Standard platform or configured system"],
];

const capabilities = [
  ["Fast 2.5D screening", "Inspect solder joints quickly, with oblique views when straight 2D imaging is not enough."],
  ["3D CT slicing", "Separate overlapping features and inspect internal layers without destructive sectioning."],
  ["Inline 2D / 2.5D / 3D", "Inspect within the production flow with automated defect analysis and board handling."],
  ["Measurement & reporting", "Apply measurement tools, pass/fail support and evidence-ready reporting."],
  ["Traceability & integration", "Retain results and connect inspection data to production systems where configured."],
  ["AI component counting", "Count components on reels quickly to support material planning and inventory accuracy."],
];

const concerns = [
  ["BGA / QFN voiding", "Internal void pattern, size and distribution within solder or die-attach regions."],
  ["Head in pillow & bridging", "Connection anomalies hidden beneath packages."],
  ["PTH fill", "Barrel fill and void percentage for through-hole solder joints."],
  ["Bond wires & die attach", "Internal package features, bond-wire condition and die-attach voiding."],
  ["Layer overlap", "CT slices that separate stacked features and reveal the true internal structure."],
  ["Cracks / delamination", "Internal discontinuities that may not be visible from the surface."],
  ["Inventory mismatch", "X-ray-based component counting for reel inventory and planning."],
];

const solutions = [
  {
    name: "MQX.gINti",
    mode: "AI component counting",
    copy: "Fast, accurate SMT reel counts that support inventory planning and reduce material-related line stoppages.",
    image: "/assets/product-ginti.jpg",
    href: "/brochures/mqx-ginti.pdf",
  },
  {
    name: "MQX.tracE",
    mode: "2.5D PCB X-ray inspection",
    copy: "Fast inspection of BGA, QFN, PTH and common SMT defect conditions without damaging the assembly.",
    image: "/assets/product-trace.png",
    href: "/products/mqx-trace",
  },
  {
    name: "MQX.tracE CT",
    mode: "2D screening with 3D CT",
    copy: "Layer-by-layer analysis, root-cause confirmation and traceable reporting when overlap creates ambiguity.",
    image: "/assets/product-trace-ct.png",
    href: "/brochures/mqx-trace-ct.pdf",
  },
  {
    name: "MQX.tracE | IN-3D",
    mode: "Inline 2D / 2.5D / 3D",
    copy: "Automated inspection and board handling inside the production flow rather than at an offline station.",
    image: "/assets/product-trace-in3d.png",
    href: "/brochures/mqx-trace-in-3d.pdf",
  },
  {
    name: "MQX.NeVa-M",
    mode: "Microfocus CT",
    copy: "Finer internal detail for package analysis, R&D and failure investigation beyond routine board screening.",
    image: "/assets/prod-mqct-pcb.jpg",
    href: "/products/mqx-neva",
  },
];

const evidence = [
  ["QFN / die-attach voiding", "/assets/prod-trace-qfp-voids.jpg", "X-ray view showing voiding in an electronics package"],
  ["Automated PTH measurement", "/assets/prod-trace-pth-measured.jpg", "Measured through-hole fill and void analysis"],
  ["QFP bond-wire detail", "/assets/prod-trace-qfp-field.jpg", "X-ray inspection showing QFP package and bond-wire detail"],
  ["3D CT layer review", "/assets/prod-trace-board-full.jpg", "Computed tomography view of a populated circuit board"],
];

const resources = [
  ["MQX.tracE", "2.5D PCB X-ray inspection brochure", "/brochures/mqx-trace.pdf"],
  ["MQX.tracE CT", "3D CT inspection brochure", "/brochures/mqx-trace-ct.pdf"],
  ["MQX.tracE | IN-3D", "Inline 2D / 2.5D / 3D inspection flyer", "/brochures/mqx-trace-in-3d.pdf"],
  ["MQX.NeVa-M", "Microfocus CT brochure", "/brochures/microfocus-xray.pdf"],
  ["MQX.gINti", "AI X-ray component counter flyer", "/brochures/mqx-ginti.pdf"],
];

const shell = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>;
}

export default function ElectronicsIndustryPage() {
  return (
    <main className="bg-[#F4F8FA] text-[#41586A]">
      <section className="relative min-h-[720px] overflow-hidden bg-[#071C28] max-md:min-h-[680px]">
        <Image
          src="/assets/ind-electronics-alt.jpg"
          alt="Technician positioning a semiconductor package on a printed circuit board"
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0B5470]/25 mix-blend-color" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,35,.98)_0%,rgba(6,30,42,.88)_43%,rgba(5,22,32,.22)_78%,rgba(5,22,32,.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(5,22,32,.18)_0%,rgba(5,22,32,.92)_58%,#071C28_100%)]" />

        <div className={`${shell} relative z-10 flex min-h-[720px] items-end pb-20 pt-32 max-md:min-h-[680px] max-md:pb-12`}>
          <div className="max-w-[800px]">
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Electronics & semiconductors</p>
            <p className="t-caption mb-0 mt-6 text-white/65">Custom requirements. Engineered solution.</p>
            <h1 className="t-display mb-0 mt-4 max-w-[13ch] text-white">See Inside the Board. Stop Defects Before They Travel.</h1>
            <p className="t-lead mb-0 mt-7 max-w-[63ch] text-white/75">
              From SMT production to failure analysis, MQS X-ray and CT solutions reveal hidden solder, package and interconnect defects without damaging the assembly.
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
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Smaller Packages. Denser Boards. Less Room for Uncertainty.</h2>
          </div>
          <div className="space-y-5">
            <p className="t-lead m-0">
              Electronics manufacturing is moving toward higher density, finer-pitch packages, multilayer assemblies and faster production cycles.
            </p>
            <p className="t-body m-0 text-[#5F7688]">
              Defects such as voiding, bridging, head in pillow, lifted leads and insufficient solder fill can remain invisible to visual inspection and surface later as rework, yield loss or field failure. X-ray and CT reveal those internal connections without cutting the board.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">What electronics QA teams need</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">Inspection evidence that keeps production moving.</h2>
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
            <Image src="/assets/inset-electronics.jpg" alt="Close-up assembly of a semiconductor package on a PCB" fill quality={90} sizes="(min-width:1024px) 52vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#0B5470]/20 mix-blend-color" />
          </div>
          <div>
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Application engineering</p>
            <h2 className="t-h2 mb-0 mt-5 text-white">Your Board Defines the Inspection.</h2>
            <p className="t-lead mb-0 mt-7 text-white/75">
              MQS starts with the board, package and defect target, then selects or configures the imaging chain, handling, automation and software needed to answer it.
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
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Built for production. Built for analysis.</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-[#0B2A3A]">Use the right depth of answer at the right stage.</h2>
            <p className="t-lead m-0">Production screening, root-cause analysis, process control and material planning ask different questions.</p>
          </div>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {capabilities.map(([title, copy]) => (
              <article key={title} className="min-h-[220px] bg-[#F4F8FA] p-8">
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body mb-0 mt-5 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Inspection concerns</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[17ch] text-[#0B2A3A]">See the defects that matter.</h2>
          <div className="mt-12 grid border-t border-[#D3DFE7] lg:mt-16 lg:grid-cols-2">
            {concerns.map(([title, copy], index) => (
              <article key={title} className={`border-b border-[#D3DFE7] py-7 lg:px-8 ${index % 2 ? "lg:border-l" : ""}`}>
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">MQS electronics portfolio</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-white">One electronics line. Different inspection questions.</h2>
            <p className="t-lead m-0 text-white/70">Move from fast screening to CT analysis, inline automation and inventory control using the platform matched to the question.</p>
          </div>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-2 lg:mt-16">
            {solutions.map((solution, index) => (
              <a key={solution.name} href={solution.href} className={`group grid min-h-[520px] bg-[#0E3448] text-white no-underline ${index === solutions.length - 1 ? "md:col-span-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" : ""}`}>
                <div className={`relative min-h-[300px] overflow-hidden bg-white ${index === solutions.length - 1 ? "lg:min-h-[420px]" : ""}`}>
                  <Image src={solution.image} alt={solution.name} fill quality={90} sizes="(min-width:1024px) 50vw, 100vw" className="object-contain p-7 transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <p className="t-eyebrow m-0 text-[#5AD1F7]">{solution.mode}</p>
                    <h3 className="t-h3 mb-0 mt-5 text-white">{solution.name}</h3>
                    <p className="t-body mb-0 mt-5 text-white/65">{solution.copy}</p>
                  </div>
                  <span className="t-button mt-8 inline-flex items-center gap-3 text-[#5AD1F7]">Explore solution <Arrow /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Inspection evidence</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">See the evidence, not just the part.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16">
            {evidence.map(([title, src, alt]) => (
              <figure key={title} className="m-0 bg-[#F4F8FA]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#071C28]">
                  <Image src={src} alt={alt} fill quality={90} sizes="(min-width:768px) 50vw, 100vw" className="object-contain" />
                </div>
                <figcaption className="t-h4 px-7 py-6 text-[#0B2A3A]">{title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Indigenous engineering</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Proven Platforms. Configured for Your Process.</h2>
          </div>
          <div>
            <p className="t-lead m-0">Standard where it works. Custom where it matters.</p>
            <p className="t-body mb-0 mt-5 text-[#5F7688]">
              MQS starts with a proven inspection platform, then adapts imaging, handling, automation, analysis, reporting and integration where the process requires it. Design ownership and long-term engineering support let the system evolve with the production line.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Resources</p>
          <div className="mt-5 flex flex-col gap-5 border-b border-[#D3DFE7] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="t-h2 m-0 max-w-[14ch] text-[#0B2A3A]">Technical details for your review.</h2>
            <p className="t-body m-0 max-w-[46ch] text-[#5F7688]">Move directly from the inspection question to the relevant platform information.</p>
          </div>
          <div className="grid md:grid-cols-2">
            {resources.map(([name, description, href], index) => (
              <a key={name} href={href} className={`group border-b border-[#D3DFE7] py-7 text-[#0B2A3A] no-underline md:px-7 ${index % 2 ? "md:border-l" : ""}`}>
                <span className="t-caption text-[#0A6A88]">PDF brochure</span>
                <span className="mt-3 flex items-center justify-between gap-6">
                  <span><strong className="t-h4 block">{name}</strong><span className="t-body-sm mt-2 block text-[#5F7688]">{description}</span></span>
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-6 bg-[#E9F0F4] p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="t-h4 m-0 max-w-[38ch] text-[#0B2A3A]">Bring us the board. We’ll engineer the inspection.</p>
              <p className="t-body-sm mb-0 mt-3 max-w-[62ch] text-[#5F7688]">Share the package, defect target, throughput requirement and traceability need.</p>
            </div>
            <a href="#contact" className="group t-button inline-flex h-[52px] shrink-0 items-center justify-center gap-3 bg-[#0E3A52] px-7 text-white no-underline hover:bg-[#0A2B3D]">Talk to an Expert <Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

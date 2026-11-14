import Image from "next/image";

const shell = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

const highlights = [
  ["Portable & Battery-Powered", "Portable field X-ray system with image viewing and battery operation."],
  ["Modular X-Ray Architecture", "Designed around a modular X-ray source architecture."],
  ["Remote Operation", "Wired and wireless operation concepts for stand-off use."],
  ["Fast Readiness", "Designed for rapid setup and field deployment."],
  ["Rugged Transport", "Ruggedized transport concept for demanding environments."],
  ["Field Endurance & Protection", "Designed around field endurance and environmental protection targets."],
];

const applications = [
  ["Counter-IED Inspection", "Inspection of IEDs hidden in conduits, boxes, bags and other unsuspecting objects."],
  ["Security Screening", "Screening of luggage, parcels and packages for concealed power sources, wiring and electronic components."],
  ["Vehicle / Cavity Checks", "Inspection of cavities, partitions and hidden spaces for batteries, microphones, bugs and wiring."],
  ["Military Field Use", "Rapid deployment by two-person teams in all-weather conditions and difficult terrain."],
  ["Forensics & Evidence Review", "Non-intrusive viewing of internal layouts before safe handling or dismantling."],
  ["Training & Maintenance", "System usage tracking, BITE diagnostics and field-restorable software to support long-term operation."],
];

const software = [
  "Pseudo-colour mapping and organic / inorganic differentiation",
  "Brightness, contrast, smoothing and sharpening controls",
  "Split-screen display of at least two images",
  "Image rotation, tilt and on-screen measurement",
  "Stitching of multiple X-ray images for larger objects",
  "Emboss / 3D-effect viewing and deep zoom capability",
  "Image storage, export, offline antivirus protection and future software upgrade path",
  "Pattern analysis / library support and AI-assisted interpretation",
];

const controlFeatures = [
  ["Rugged Control Unit", "Rugged laptop-based control environment."],
  ["Daylight-Readable Display", "Full HD display designed for field use."],
  ["Connectivity", "USB, HDMI, Ethernet and fibre connectivity options."],
  ["Image Tools", "Measurement, stitching and 360-degree rotation tools."],
  ["Deep Zoom", "Up to 600% zoom capability."],
  ["AI Features", "Pattern recognition and IED analysis capabilities."],
];

const primarySpecs = [
  ["X-Ray Source", "Type", "Constant Potential"],
  ["X-Ray Source", "Energy", "150 kVp"],
  ["X-Ray Source", "Beam Angle", "40 degrees"],
  ["X-Ray Source", "Startup Time", "90 sec"],
  ["X-Ray Source", "Safety", "Non-radioactive, interlock, audio-visual alerts"],
  ["Remote Operation", "Wired", "50 m"],
  ["Remote Operation", "Wireless", "100 m"],
  ["Power System", "Battery", "3 hrs operation and spare battery"],
  ["Power System", "Charging", "230V AC (+10%) single phase 50 Hz (+5%)"],
  ["Imaging Panel", "Dead Space", "5 mm"],
  ["Imaging Panel", "Acquisition Time", "30 sec"],
  ["Imaging Panel", "Mounting", "Adjustable for uneven surfaces"],
  ["Software", "Image Processing", "Contrast enhancement, sharpening, pseudo colour"],
  ["Software", "Tools", "Measurement, stitching, 360-degree rotation"],
  ["Software", "Zoom", "600%"],
  ["Software", "AI Features", "Pattern recognition, IED analysis"],
];

const fieldSpecs = [
  ["Control Unit", "System", "Rugged laptop"],
  ["Control Unit", "Specs", "i7 / equivalent, 16 GB RAM, 1 TB SSD"],
  ["Control Unit", "Display", "Full HD (1920 × 1080), daylight readable"],
  ["Control Unit", "Connectivity", "USB, HDMI, Ethernet, fibre"],
  ["Portability", "Weight", "40 kg"],
  ["Portability", "Handling", "Portable, wheeled case"],
  ["Portability", "Build", "Waterproof, dustproof, rugged"],
  ["Environment", "Temperature", "-15°C to +50°C"],
  ["Environment", "Humidity", "90%"],
  ["Environment", "Altitude", "4500 m"],
  ["Environment", "Protection", "IP65"],
  ["Maintainability", "Design", "Modular, PCB replacement"],
  ["Maintainability", "Diagnostics", "Built-In Test Equipment (BITE)"],
  ["Maintainability", "Software", "Field upgradeable"],
  ["Reliability", "Service Life", "8 years"],
  ["Reliability", "Compliance", "MIL-STD, Radiation Safety"],
];

const fieldReady = [
  ["Stand-Off Operation", "Wired and wireless remote-operation options support inspection from a distance."],
  ["Battery Operation", "Three-hour operating target with a spare battery is listed in the technical configuration."],
  ["Rugged Build", "Waterproof, dustproof and rugged construction is specified for field use."],
  ["Environmental Range", "Specified operation from -15°C to +50°C, at 90% humidity and altitude up to 4500 m."],
  ["Built-In Diagnostics", "BITE diagnostics support maintainability and field support."],
  ["Field Upgradeability", "Software is designed to remain field upgradeable as requirements evolve."],
];

const xrayImages = [
  {
    src: "/assets/products/mqs-vigil/concealed-cable-device.jpg",
    alt: "Digital X-ray image revealing wiring and electronic parts inside an enclosed package",
    caption: "Inspection through enclosed packaging",
  },
  {
    src: "/assets/products/mqs-vigil/concealed-container.jpg",
    alt: "Digital X-ray image revealing a container and connected concealed components",
    caption: "Detection of concealed internal components",
  },
  {
    src: "/assets/products/mqs-vigil/multiple-concealed-items.jpg",
    alt: "Digital X-ray image showing multiple cables, electronic parts and concealed objects",
    caption: "High-clarity digital X-ray output",
  },
  {
    src: "/assets/products/mqs-vigil/concealed-bottle.jpg",
    alt: "Digital X-ray image showing a concealed bottle-shaped object",
    caption: "Non-intrusive field inspection",
  },
];

function Arrow() {
  return <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>;
}

function SpecTable({ rows, label }: { rows: string[][]; label: string }) {
  const categorySpan = (index: number) => {
    let span = 1;
    while (index + span < rows.length && rows[index + span][0] === rows[index][0]) span += 1;
    return span;
  };

  return (
    <div className="overflow-x-auto border border-[#D3DFE7] bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="bg-[#0E3A52] text-white">
            {["Category", "Feature", "Specification / Capability"].map((heading) => (
              <th key={heading} scope="col" className="t-caption px-5 py-4 font-medium">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([category, feature, value], index) => {
            const startsCategory = index === 0 || rows[index - 1][0] !== category;
            return (
              <tr key={`${category}-${feature}`} className={index % 2 ? "bg-[#F4F8FA]" : "bg-white"}>
                {startsCategory && (
                  <td
                    rowSpan={categorySpan(index)}
                    className="t-body-sm align-top border-t border-r border-[#D3DFE7] bg-[#E9F0F4] px-5 py-4 font-semibold text-[#0B2A3A]"
                  >
                    {category}
                  </td>
                )}
                <td className="t-body-sm border-t border-[#D3DFE7] px-5 py-4 text-[#41586A]">{feature}</td>
                <td className="t-body-sm border-t border-[#D3DFE7] px-5 py-4 text-[#41586A]">{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function MqsVigil() {
  return (
    <main className="bg-[#F4F8FA] text-[#41586A]">
      <section id="overview" className="relative min-h-[700px] overflow-hidden bg-[#071C28] pt-[76px]">
        <Image
          src="/assets/products/mqs-vigil/field-deployment-client.jpg"
          alt="MQS.VIGIL portable X-ray equipment deployed in a field environment"
          fill preload quality={90} sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,35,.98)_0%,rgba(7,31,44,.91)_42%,rgba(5,22,32,.38)_72%,rgba(5,22,32,.16)_100%)] max-md:bg-[linear-gradient(180deg,rgba(5,22,32,.18)_0%,rgba(5,22,32,.94)_58%,#071C28_100%)]" />
        <div className={`${shell} relative z-[2] flex min-h-[624px] flex-col justify-end pb-16 pt-28 md:pb-20 lg:pb-24`}>
          <div className="max-w-[760px]">
            <p className="t-eyebrow m-0 text-[#5AD1F7]">MQS.VIGIL</p>
            <p className="t-caption mb-0 mt-6 text-white/65">Portable real-time X-ray viewing system</p>
            <h1 className="t-display mb-0 mt-5 max-w-[12ch] text-white">Portable. Remote. Field-Ready.</h1>
            <p className="t-lead mb-0 mt-7 max-w-[65ch] text-white/78">
              MQS Vigil is a portable, battery-powered digital X-ray viewing system designed for rapid field deployment.
              It combines an X-ray source, detector panel, control interface and rugged display unit to deliver real-time
              X-ray images of suspicious, concealed or hard-to-access objects.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/contact" className="group t-button inline-flex h-[52px] items-center gap-3 bg-[#16C1F3] px-7 text-[#08283A] no-underline transition-colors hover:bg-white">
                Talk to an Expert <Arrow />
              </a>
              <a href="/brochures/mqs-vigil.pdf" target="_blank" rel="noopener noreferrer" className="group t-button inline-flex h-[52px] items-center gap-3 border border-white/55 px-7 text-white no-underline transition-colors hover:bg-white/10">
                Download Brochure <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Key system highlights</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-[#0B2A3A]">Ready When the Inspection Cannot Wait.</h2>
            <p className="t-lead m-0">
              Designed for mobility, fast setup and reliable operation in demanding environments, MQS Vigil supports safer
              inspection and quicker decision-making in security, tactical and field-screening applications.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {highlights.map(([title, copy], index) => (
              <article key={title} className="min-h-[220px] bg-[#F4F8FA] p-8">
                <span className="t-eyebrow text-[#0A6A88]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mb-0 mt-5 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-4 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Typical applications</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[19ch] text-[#0B2A3A]">Built for Security, Tactical and Field-Screening Applications.</h2>
          <div className="mt-12 grid border-t border-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {applications.map(([title, copy], index) => (
              <article key={title} className={`border-b border-[#D3DFE7] py-8 md:px-8 ${index % 2 ? "md:border-l" : ""} lg:border-l lg:[&:nth-child(3n+1)]:border-l-0`}>
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-4 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">See inside without opening</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-white">Make the Internal Layout Visible Before Handling.</h2>
            <p className="t-lead m-0 text-white/70">
              Digital X-ray imaging gives operators a non-intrusive view of enclosed or concealed contents before an object
              is opened, handled or dismantled.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
            {xrayImages.map((image) => (
              <figure key={image.src} className="m-0 overflow-hidden border border-white/15 bg-white">
                <div className="relative aspect-square">
                  <Image src={image.src} alt={image.alt} fill quality={90} sizes="(min-width:768px) 50vw, 100vw" className="object-contain" />
                </div>
                <figcaption className="t-caption border-t border-[#D3DFE7] px-5 py-4 text-[#0A6A88]">{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Software</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Software That Helps Turn the Image into a Decision.</h2>
            <p className="t-lead mb-0 mt-7">
              MQS Vigil includes image-processing and viewing tools designed to help operators review, compare, measure and
              document digital X-ray images in the field.
            </p>
          </div>
          <div className="border-t border-[#D3DFE7]">
            {software.map((item, index) => (
              <div key={item} className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#D3DFE7] py-5">
                <span className="t-caption text-[#0A6A88]">{String(index + 1).padStart(2, "0")}</span>
                <p className="t-body m-0 text-[#41586A]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Operator and control environment</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">Field Control Without Giving Up Review Capability.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {controlFeatures.map(([title, copy]) => (
              <article key={title} className="min-h-[190px] bg-white p-8">
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-4 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
          <a href="#specifications" className="group t-button mt-10 inline-flex h-[52px] items-center gap-3 bg-[#16C1F3] px-7 text-[#08283A] no-underline transition-colors hover:bg-[#0E3A52] hover:text-white">
            View Specifications <Arrow />
          </a>
        </div>
      </section>

      <section id="specifications" className="scroll-mt-24 bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Technical specifications</p>
          <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">System Configuration.</h2>
          <div className="mt-10">
            <SpecTable rows={primarySpecs} label="MQS Vigil system configuration specifications" />
          </div>
          <h3 className="t-h3 mb-0 mt-16 text-[#0B2A3A]">Control Unit, Portability and Environment.</h3>
          <div className="mt-8">
            <SpecTable rows={fieldSpecs} label="MQS Vigil control, portability and environmental specifications" />
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">Field-ready design</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[20ch] text-white">Designed Around Mobility, Maintainability and Remote Operation.</h2>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {fieldReady.map(([title, copy]) => (
              <article key={title} className="min-h-[210px] bg-[#0E3448] p-8">
                <h3 className="t-h4 m-0 text-white">{title}</h3>
                <p className="t-body-sm mb-0 mt-4 text-white/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <div className="grid gap-8 border-t-4 border-[#16C1F3] bg-[#E9F0F4] p-8 md:p-12 lg:grid-cols-[minmax(0,7fr)_minmax(260px,4fr)] lg:items-end lg:gap-16">
            <div>
              <p className="t-eyebrow m-0 text-[#0A6A88]">MQS Vigil at a glance</p>
              <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Talk to MQS About Your Field X-Ray Requirement.</h2>
              <p className="t-body mb-0 mt-6 max-w-[70ch] text-[#5F7688]">
                Discuss the inspection environment, stand-off requirement, object size, field conditions and workflow with
                the MQS team to identify the appropriate configuration and accessory set.
              </p>
              <p className="t-body-sm mb-0 mt-5 text-[#5F7688]">
                Specifications and features may evolve as the final configuration is confirmed. Contact MQS for additional
                options and accessory choices.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="/contact" className="group t-button inline-flex h-[52px] items-center justify-center gap-3 bg-[#0E3A52] px-7 text-white no-underline hover:bg-[#0A2B3D]">
                Talk to an Expert <Arrow />
              </a>
              <a href="/brochures/mqs-vigil.pdf" target="_blank" rel="noopener noreferrer" className="group t-button inline-flex h-[52px] items-center justify-center gap-3 border border-[#0E3A52] px-7 text-[#0E3A52] no-underline hover:bg-white">
                Download Brochure <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

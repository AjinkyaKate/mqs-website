import Image from "next/image";

/* Copy from MQS_Defence_Capabilities_Website_Page.docx (client, October 2026).
   Editorial notes in the source ("the brochure identifies…", "the source
   material documents…", the resources instruction) are rewritten as page copy
   rather than shown verbatim. */

const verification = [
  ["Is the component internally sound?", "Digital Radiography and CT", "Internal condition of fuzes, shells and ammunition without destructive sectioning."],
  ["Does the assembly function as intended?", "Automated Test Equipments", "Electrical, electronic and electromechanical performance, fault diagnosis and final functional verification."],
];

const needs = [
  ["01", "Repeatable inspection of components with different geometries, calibres and internal configurations."],
  ["02", "Automation that reduces operator dependence while supporting higher throughput and consistent execution."],
  ["03", "Functional verification of assemblies and subsystems during design, production, integration and maintenance."],
  ["04", "Traceable test and inspection outputs that support engineering review and quality records."],
  ["05", "Engineering flexibility when an off the shelf inspection or test system does not fit the requirement."],
];

const pillars = [
  ["01", "Fuze Inspection Systems", "Custom built indigenous digital radiography systems for electronic and mechanical fuzes, including automated configurations and swivel mechanisms for faster inspection cycles.", "#fuze"],
  ["02", "Shell & Ammunition Inspection", "Digital X-ray systems for ammunition of different calibres, with automated handling, shell rotation, indexing and configurable inspection presets.", "#shell"],
  ["03", "Automated Test Equipments", "Custom functional test systems for critical defence assemblies and subsystems where standard test equipment cannot meet the test objective or interface requirement.", "#ate"],
];

const fuzeFeatures = [
  ["Electronic & Mechanical Fuzes", "Digital radiography for internal inspection without cutting or dismantling the fuze."],
  ["Automated Handling", "Selected systems use a swivel mechanism to improve cycle time and support higher productivity."],
  ["Custom Configuration", "Cabinet and manipulator architecture can be customized to suit the user requirement and selected source configuration."],
];

const shellFeatures = [
  ["Dual Station Architecture", "One station is used for X-raying while the second station supports shell rotation and indexing."],
  ["Preset Inspection Sequences", "Configured presets can automate the inspection sequence for shells of different diameters."],
  ["Configurable X-ray Range", "Source options from 160 kV through 450 kV, with high energy configurations from 2 MeV to 6 MeV for applications that need greater penetration."],
];

const shellCapabilities = [
  ["Digital Radiography / CT analysis", "Provides internal visibility and analysis without destructive sectioning."],
  ["Rotation & indexing", "Presents the shell through controlled orientations for repeatable inspection."],
  ["Configurable cabinet & manipulator", "Supports adaptation to component size, handling and inspection workflow."],
  ["100% duty cycle source configurations", "Supports repeated or production oriented inspection workflows where the selected source is configured accordingly."],
];

const testApplications = [
  ["Anti tank missile launcher tester", "Final testing during assembly and pre firing", "Functional test, response time and launch mechanism."],
  ["Spin test equipment", "Validation of a mechanical fuze", "Shutter assembly opening time and speed."],
  ["Wire spool unwinding test setup", "Missile wire spool performance while unwinding", "Resistance and tension measurement at high speed."],
  ["Gyro test rack", "Inner gimbal of a gyro used in an anti tank missile", "Drift parameters and gyro stabilization rate."],
  ["Torpedo tester", "Final testing and integration stage testing", "Functional verification of the torpedo and sub assemblies."],
  ["Wire harness tester", "Critical airborne wire harness", "Continuity, isolation resistance and insulation strength."],
];

const architectures = [
  ["Microcontroller based", "Embedded test system with customized interface, display and optional reporting."],
  ["PC based", "Software driven system using analog and digital measurement sources for high speed testing, real time acquisition and visualization."],
];

const process = [
  ["01", "Requirement", "Component, interface, material, geometry"],
  ["02", "Verification objective", "Internal integrity, functional test, fault diagnosis or both"],
  ["03", "Architecture", "X-ray/CT source, detector, manipulator or ATE measurement architecture"],
  ["04", "Automation & software", "Handling, controls, fixtures, sequences, analysis and reporting"],
  ["05", "Engineered system", "A standard platform where suitable, or a custom engineered configuration"],
];

const ateAttributes = [
  ["Maintainable Architecture", "COTS modules can be used to support operation and maintainability."],
  ["Upgradeable by Design", "Flexible architecture can be developed for future requirement changes."],
  ["Lower Operator Dependence", "Automation can reduce reliance on manual skill and improve repeatability."],
  ["Self Test & Diagnostics", "ATE can include self test during startup."],
  ["Rugged / Portable Options", "Portable or battery operated configurations can be considered depending on the usage environment."],
  ["Defence Requirement Alignment", "ATE can be designed to meet stringent defence requirements such as JSS 55555 where applicable."],
  ["Reporting & Storage", "Custom reports and built in storage can preserve large numbers of test results."],
  ["User Configurable Conditions", "Test conditions can be preset or made configurable to match the test procedure."],
];

const capabilityMap = [
  ["Electronic / mechanical fuzes", "Fuze Inspection System", "Digital radiography of internal construction and assembly condition."],
  ["Mechanical fuze functional validation", "ATE: Spin test equipment", "Opening time and speed of the shutter assembly."],
  ["Artillery shells / ammunition", "Shell & Ammunition Inspection", "Automated X-ray inspection with rotation and indexing."],
  ["Missile launcher", "ATE", "Final functional testing, response time and launch mechanism verification."],
  ["Gyro subsystem", "ATE", "Drift parameter measurement and stabilization rate."],
  ["Torpedo and integration assemblies", "ATE", "Functional verification during final testing and integration."],
  ["Critical airborne wire harness", "ATE", "Continuity, isolation resistance and insulation strength."],
];

const reasons = [
  ["Custom Engineering", "Systems can be developed around user requirements when standard equipment does not fit the application."],
  ["In House Multidisciplinary Capability", "Electronics, electrical, mechanical, instrumentation, software and electromechanical engineering can be combined in one solution."],
  ["Inspection + Functional Test", "X-ray / CT and ATE address different but complementary verification questions."],
  ["Automation & Software", "Custom controls, sequences, user interfaces, analysis and reporting can be integrated into the system."],
  ["Lifecycle Orientation", "Flexible architectures and service capability support maintainability and future evolution."],
  ["Application Experience", "MQS has delivered defence applications across fuzes, ammunition, missile launchers, missiles, torpedoes, gyros and wire harnesses."],
];

const resources = [
  ["Fuze Inspection Systems", "Digital radiography for electronic and mechanical fuzes", "/brochures/fuze-inspection-system.pdf"],
  ["Shell & Ammunition Inspection", "Cabinet and LINAC based X-ray inspection for ammunition", "/brochures/shell-ammunition-inspection.pdf"],
  ["Automated Test Equipments", "Custom functional test systems for defence assemblies", "/brochures/automated-test-equipment.pdf"],
];

const shell = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>;
}

/* The client asked for cards instead of tables (WhatsApp review, Oct 2026).
   Each card keeps the table's column labels as small eyebrows so the
   question → capability → outcome reading order survives. */
function VerificationCards({ rows }: { rows: string[][] }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
      {rows.map(([question, capability, outcome], index) => (
        <article key={question} className="flex flex-col border-t-4 border-[#16C1F3] bg-[#F4F8FA] p-8 lg:p-10">
          <span className="t-eyebrow text-[#0A6A88]">Question {String(index + 1).padStart(2, "0")}</span>
          <h3 className="t-h3 mb-0 mt-5 text-[#0B2A3A]">{question}</h3>
          <div className="mt-auto pt-10">
            <p className="t-caption m-0 text-[#0A6A88]">MQS capability</p>
            <p className="t-h4 mb-0 mt-2 text-[#0B2A3A]">{capability}</p>
            <p className="t-caption mb-0 mt-6 border-t border-[#D3DFE7] pt-6 text-[#0A6A88]">What it helps establish</p>
            <p className="t-body mb-0 mt-2 text-[#5F7688]">{outcome}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function TestApplicationCards({ rows }: { rows: string[][] }) {
  return (
    <div className="mt-8 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
      {rows.map(([system, application, verified], index) => (
        <article key={system} className="flex flex-col bg-[#0E3448] p-8">
          <span className="t-eyebrow text-[#5AD1F7]">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="t-h4 mb-0 mt-5 text-white">{system}</h3>
          <p className="t-caption mb-0 mt-6 text-[#5AD1F7]">Application</p>
          <p className="t-body-sm mb-0 mt-2 text-white/75">{application}</p>
          <p className="t-caption mb-0 mt-5 border-t border-white/15 pt-5 text-[#5AD1F7]">What is verified</p>
          <p className="t-body-sm mb-0 mt-2 text-white/65">{verified}</p>
        </article>
      ))}
    </div>
  );
}

/* The capability map grouped by pillar: X-ray inspection on one side, ATE on
   the other, so the split between "is it sound" and "does it work" reads at
   a glance instead of row by row. */
function CapabilityMapCards({ rows }: { rows: string[][] }) {
  const xray = rows.filter(([, capability]) => !capability.startsWith("ATE"));
  const ate = rows.filter(([, capability]) => capability.startsWith("ATE"));
  const card = ([assembly, capability, role]: string[]) => (
    <article key={assembly} className="bg-[#0E3448] p-7">
      <h4 className="t-h4 m-0 text-white">{assembly}</h4>
      <span className="t-caption mt-4 inline-block bg-white/10 px-3 py-1.5 text-[#5AD1F7]">{capability}</span>
      <p className="t-body-sm mb-0 mt-4 text-white/65">{role}</p>
    </article>
  );
  return (
    <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-8">
      <div>
        <p className="t-eyebrow m-0 border-b border-white/15 pb-4 text-[#5AD1F7]">X-ray inspection · Is it sound?</p>
        <div className="mt-6 grid gap-px bg-white/15">{xray.map(card)}</div>
      </div>
      <div>
        <p className="t-eyebrow m-0 border-b border-white/15 pb-4 text-[#5AD1F7]">Automated Test Equipments · Does it work?</p>
        <div className="mt-6 grid gap-px bg-white/15 md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2">{ate.map(card)}</div>
      </div>
    </div>
  );
}

function FeatureList({ items, dark = false }: { items: string[][]; dark?: boolean }) {
  const line = dark ? "border-white/15" : "border-[#D3DFE7]";
  return (
    <div className={`mt-10 border-t ${line}`}>
      {items.map(([title, copy]) => (
        <article key={title} className={`border-b ${line} py-6`}>
          <h3 className={`t-h4 m-0 ${dark ? "text-white" : "text-[#0B2A3A]"}`}>{title}</h3>
          <p className={`t-body mb-0 mt-3 ${dark ? "text-white/65" : "text-[#5F7688]"}`}>{copy}</p>
        </article>
      ))}
    </div>
  );
}

export default function DefenceIndustryPage() {
  return (
    <main className="bg-[#F4F8FA] text-[#41586A]">
      {/* Hero. The supplied renders are all on white, which washes out under the
          scrim, so the hero uses the navy version of the same LINAC shell
          inspection system (also the /industries hero) until a defence
          photograph or film is supplied. */}
      <section className="relative min-h-[720px] overflow-hidden bg-[#071C28] max-md:min-h-[680px]">
        <Image
          src="/assets/ind-hero-linac.jpg"
          alt="MQS LINAC based digital radiography system for large calibre shell inspection"
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,35,.98)_0%,rgba(6,30,42,.88)_43%,rgba(5,22,32,.22)_78%,rgba(5,22,32,.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(5,22,32,.18)_0%,rgba(5,22,32,.92)_58%,#071C28_100%)]" />

        <div className={`${shell} relative z-10 flex min-h-[720px] items-end pb-20 pt-32 max-md:min-h-[680px] max-md:pb-12`}>
          <div className="max-w-[800px]">
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Defence capabilities</p>
            <p className="t-caption mb-0 mt-6 text-white/65">Custom requirements. Engineered solution.</p>
            <h1 className="t-display mb-0 mt-4 max-w-[13ch] text-white">See Inside. Test Function. Prove Readiness.</h1>
            <p className="t-lead mb-0 mt-7 max-w-[63ch] text-white/75">
              MQS combines industrial X-ray inspection with custom Automated Test Equipments to help defence manufacturers verify both internal integrity and functional performance across fuzes, ammunition and mission critical assemblies.
            </p>
            <a href="#contact" className="group t-button mt-9 inline-flex h-[52px] items-center gap-3 bg-[#16C1F3] px-7 text-[#08283A] no-underline transition-colors hover:bg-[#0FA5D2]">
              Talk to an Engineer <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Industry overview</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Two Questions. One Engineering Partner.</h2>
          </div>
          <p className="t-lead m-0">
            Defence quality cannot be reduced to one inspection method. Some risks are hidden inside the component. Others appear only when the assembly is powered, actuated or tested in sequence. MQS addresses both.
          </p>
        </div>
        <div className={shell}>
          <VerificationCards rows={verification} />
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">What defence programs need</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">Defence Programs Need More Than a Standard Machine.</h2>
          <div className="mt-12 grid border-t border-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {needs.map(([number, copy], index) => (
              <article key={number} className={`border-b border-[#D3DFE7] py-8 md:px-8 ${index % 2 ? "md:border-l" : ""} lg:border-l lg:[&:nth-child(3n+1)]:border-l-0`}>
                <span className="t-eyebrow text-[#0A6A88]">{number}</span>
                <p className="t-body mb-0 mt-5 text-[#41586A]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">Capability pillars</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-white">Three Defence Capability Pillars.</h2>
            <p className="t-lead m-0 text-white/70">
              The capabilities are complementary. X-ray and CT reveal internal condition. Automated Test Equipments verify function and performance. Together, they support a broader verification strategy for defence manufacturing.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-3 lg:mt-16">
            {pillars.map(([number, title, copy, href]) => (
              <a key={title} href={href} className="group flex min-h-[320px] flex-col justify-between bg-[#0E3448] p-8 text-white no-underline lg:p-10">
                <div>
                  <span className="t-eyebrow text-[#5AD1F7]">{number}</span>
                  <h3 className="t-h3 mb-0 mt-5 text-white">{title}</h3>
                  <p className="t-body mb-0 mt-5 text-white/65">{copy}</p>
                </div>
                <span className="t-button mt-8 inline-flex items-center gap-3 text-[#5AD1F7]">Read more <Arrow /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="fuze" className="scroll-mt-24 bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <div className="relative aspect-[1400/1123] overflow-hidden bg-white">
            <Image src="/assets/product-fuze.png" alt="MQS fuze inspection cabinet with loading and unloading conveyors" fill quality={90} sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Fuze Inspection Systems</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">See Inside the Fuze. Inspect with Repeatability.</h2>
            <p className="t-lead mb-0 mt-7">
              MQS has developed custom built indigenous fuze inspection systems for digital radiography of electronic and mechanical fuzes. The platform can be engineered around the fuze geometry, required X-ray configuration and inspection workflow.
            </p>
            <FeatureList items={fuzeFeatures} />
            <p className="t-body-sm mb-0 mt-8 bg-[#E9F0F4] p-6 text-[#41586A]">
              <strong className="text-[#0B2A3A]">Where it fits:</strong> artillery fuze and multi model hand grenade inspection requirements where repeatability, automation and internal visibility are important.
            </p>
          </div>
        </div>
      </section>

      <section id="shell" className="scroll-mt-24 py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid items-start gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Shell & Ammunition Inspection</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Different Calibres. One Engineered Inspection Workflow.</h2>
            <p className="t-lead mb-0 mt-7">
              MQS develops X-ray inspection solutions for ammunition across different calibres, with the system architecture selected according to shell size, material thickness, inspection depth and production requirement.
            </p>
            <p className="t-body mb-0 mt-5 text-[#5F7688]">
              The solutions can be supplied in two broad configurations: cabinet based systems for suitable shell sizes and energy ranges, and LINAC based systems installed in shielded bunkers for larger, denser or higher penetration applications. MQS systems can also incorporate automated handling, shell rotation, indexing and preset inspection sequences to support repeatable inspection across different diameters and production workflows.
            </p>
          </div>
          <div className="relative aspect-[860/715] overflow-hidden bg-white">
            <Image src="/assets/industries/defence/shell-inspection-system.jpg" alt="MQS shell inspection system with conveyor and the range of ammunition calibres it inspects" fill quality={90} sizes="(min-width:1024px) 42vw, 100vw" className="object-contain" />
          </div>
        </div>

        <div className={`${shell} mt-16 lg:mt-24`}>
          <div className="grid items-center gap-10 bg-white lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
            <div className="relative aspect-[1864/844] overflow-hidden bg-white">
              <Image src="/assets/product-shell.png" alt="MQS LINAC based digital radiography system for 155 mm shell inspection" fill quality={90} sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <div className="p-8 lg:p-10">
              <p className="t-eyebrow m-0 text-[#0A6A88]">LINAC based Digital Radiography</p>
              <h3 className="t-h3 mb-0 mt-5 text-[#0B2A3A]">For Large Calibre and High Penetration Applications.</h3>
              <p className="t-body mb-0 mt-5 text-[#5F7688]">
                Where conventional cabinet based X-ray is not sufficient, MQS can engineer LINAC based Digital Radiography systems in shielded bunkers for high penetration inspection of large calibre ammunition. The LINAC solution is designed for high throughput inspection and traceability of 155 mm shells.
              </p>
            </div>
          </div>
        </div>

        <div className={`${shell} mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <FeatureList items={shellFeatures} />
          <div className="lg:pt-10">
            <h3 className="t-h3 m-0 text-[#0B2A3A]">Engineered Around the Ammunition Requirement.</h3>
            <p className="t-body mb-0 mt-5 text-[#5F7688]">
              The final system is not limited to a single fixed configuration. Source, detector, cabinet and manipulator choices can be matched to the user requirement, allowing MQS to start with proven architectures and configure the inspection system around the application.
            </p>
          </div>
        </div>

        <div className={shell}>
          <p className="t-eyebrow m-0 mt-16 text-[#0A6A88] lg:mt-24">How the system supports the application</p>
          <div className="mt-8 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:grid-cols-4">
            {shellCapabilities.map(([title, copy], index) => (
              <article key={title} className="bg-white p-8">
                <span className="t-eyebrow text-[#0A6A88]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mb-0 mt-5 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ate" className="scroll-mt-24 bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={`${shell} grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Where Automated Test Equipments fit</p>
            <h2 className="t-h2 mb-0 mt-5 text-white">Verifying Function, Not Just Internal Integrity.</h2>
            <p className="t-lead mb-0 mt-7 text-white/75">
              Automated Test Equipments complement MQS’s X-ray and CT inspection capabilities by verifying how critical defence assemblies and systems perform and function. While X-ray inspection reveals what is happening inside a component, ATE is used to test electrical, electronic, electromechanical and functional performance during design, production, integration and maintenance.
            </p>
            <p className="t-body mb-0 mt-5 text-white/60">
              MQS develops customized ATE for applications where standard test equipment cannot address the complete requirement. These systems can support fault diagnosis, functional verification, production testing and final acceptance of critical assemblies, while reducing dependence on manual testing and improving repeatability. MQS has more than 25 years of experience developing customized test equipment for defence applications, including missile assemblies, missile launchers, fuzes, propellants, ignitors, missiles and torpedoes.
            </p>
          </div>
          <div className="relative aspect-[700/555] overflow-hidden bg-white">
            <Image src="/assets/industries/defence/ate-test-racks.jpg" alt="MQS Automated Test Equipment racks for sensor and EDU testing" fill quality={90} sizes="(min-width:1024px) 42vw, 100vw" className="object-contain" />
          </div>
        </div>

        <div className={`${shell} mt-16 lg:mt-24`}>
          <p className="t-h3 m-0 max-w-[24ch] text-white">X-ray Verifies What Is Inside. ATE Verifies What It Does.</p>
          <p className="t-eyebrow mb-0 mt-14 text-[#5AD1F7]">Typical defence test applications</p>
          <TestApplicationCards rows={testApplications} />

          <p className="t-eyebrow mb-0 mt-16 text-[#5AD1F7] lg:mt-20">Two ATE architectures</p>
          <div className="mt-8 grid gap-px bg-white/15 md:grid-cols-2">
            {architectures.map(([title, copy]) => (
              <article key={title} className="bg-[#0E3448] p-8 lg:p-10">
                <h3 className="t-h3 m-0 text-white">{title}</h3>
                <p className="t-body mb-0 mt-5 text-white/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Application engineering</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-[#0B2A3A]">From Requirement to Engineered Solution.</h2>
            <p className="t-lead m-0">
              MQS starts with the defence requirement first, then engineers the inspection or test architecture around it. The goal is technical fit, repeatability and long term usability, not forcing the application into a fixed catalogue configuration.
            </p>
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

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={`${shell} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
          <div>
            <p className="t-eyebrow m-0 text-[#0A6A88]">Indigenous engineering</p>
            <h2 className="t-h2 mb-0 mt-5 text-[#0B2A3A]">Indigenous Engineering. Premium by Design.</h2>
          </div>
          <div>
            <p className="t-body m-0 text-[#5F7688]">
              For MQS, indigenization means engineering ownership and the ability to configure the system around the mission requirement. It brings together X-ray integration, electronics, electrical engineering, instrumentation, mechanics, software and automation so the final solution can be adapted, supported and evolved without reducing the requirement to a lowest cost substitute.
            </p>
            <p className="t-lead mb-0 mt-8">Standard where it works. Custom where it matters.</p>
            <p className="t-body mb-0 mt-5 text-[#5F7688]">
              Proven architectures provide a strong starting point. When the requirement changes in geometry, penetration, manipulation, test interface, automation, software or reporting, MQS can engineer the configuration around the application.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">ATE design attributes</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[20ch] text-[#0B2A3A]">Built for Defence Applications.</h2>
          <div className="mt-12 grid gap-px bg-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {ateAttributes.map(([title, copy]) => (
              <article key={title} className="min-h-[200px] bg-[#F4F8FA] p-8">
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-4 text-[#5F7688]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A3A] py-20 text-white md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#5AD1F7]">Capability map</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
            <h2 className="t-h2 m-0 text-white">One Defence Program. Multiple Verification Needs.</h2>
            <p className="t-lead m-0 text-white/70">
              A defence program may need internal inspection, functional testing, or both. The capability map below shows how the three MQS pillars can support different verification questions.
            </p>
          </div>
          <CapabilityMapCards rows={capabilityMap} />
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-[120px]">
        <div className={shell}>
          <p className="t-eyebrow m-0 text-[#0A6A88]">Why MQS</p>
          <h2 className="t-h2 mb-0 mt-5 max-w-[18ch] text-[#0B2A3A]">Why MQS for Defence Engineering?</h2>
          <div className="mt-12 grid border-t border-[#D3DFE7] md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {reasons.map(([title, copy], index) => (
              <article key={title} className={`border-b border-[#D3DFE7] py-8 md:px-8 ${index % 2 ? "md:border-l" : ""} lg:border-l lg:[&:nth-child(3n+1)]:border-l-0`}>
                <h3 className="t-h4 m-0 text-[#0B2A3A]">{title}</h3>
                <p className="t-body-sm mb-0 mt-3 text-[#5F7688]">{copy}</p>
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
            <p className="t-body m-0 max-w-[46ch] text-[#5F7688]">Move directly from the capability to the relevant product information.</p>
          </div>
          <div className="grid md:grid-cols-3">
            {resources.map(([name, description, href], index) => (
              <a key={name} href={href} className={`group border-b border-[#D3DFE7] py-7 text-[#0B2A3A] no-underline md:px-7 ${index ? "md:border-l" : ""}`}>
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
              <p className="t-h4 m-0 max-w-[38ch] text-[#0B2A3A]">Bring Us the Component. Bring Us the Test Requirement.</p>
              <p className="t-body-sm mb-0 mt-3 max-w-[62ch] text-[#5F7688]">
                Share the component, interface, inspection objective, test parameters and workflow. MQS can recommend a proven platform or engineer a configuration around the requirement.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group t-button inline-flex h-[52px] items-center justify-center gap-3 bg-[#0E3A52] px-7 text-white no-underline hover:bg-[#0A2B3D]">Talk to an Engineer <Arrow /></a>
              <a href="#contact" className="group t-button inline-flex h-[52px] items-center justify-center gap-3 border border-[#0E3A52] px-7 text-[#0E3A52] no-underline hover:bg-white">Request a Demo <Arrow /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

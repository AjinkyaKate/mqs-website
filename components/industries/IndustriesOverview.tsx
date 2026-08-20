/* ──────────────────────────────────────────────────────────────
   Industries — /industries/
   Built from the "Industries V4 Chapters" design (project 2e7d7293), the
   selected direction of five explored. Structure: navy hero with a three-cell
   image mosaic, a statement band, then the three primary industries as
   numbered chapters beside a sticky chapter index, followed by Also Served,
   the routing matrix, compliance, and the closing enquiry block.

   The site's own SiteHeaderFull and Footer replace the design's, and
   ContactSection follows this component, so the design's header and footer are
   not rebuilt here.

   THE DESIGN IS DESKTOP-ONLY. It declares min-width:1200px and carries no
   media queries at all, so every small-screen decision below is ours, not the
   designer's: fluid clamp() type rather than authored steps, the chapter index
   becoming a sticky chip row, the three-column spec tables collapsing to one
   column (the 1px gap over a hairline ground turns the column rules into row
   rules for free), and each multi-column band stacking.

   TWO DEPARTURES, both carried over from decisions already taken:

   1 · No breadcrumb. The design opens with "Home / Industries" on the navy
       band, but the client had breadcrumbs removed from /services and
       /about-us, so one is not reintroduced here.
   2 · No per-chapter "Explore ..." buttons. The design ends each chapter with
       a navy button to that industry's detail page. Phase 1 is locked to a
       single /industries/ page and those routes are deleted, so the buttons
       are dropped; the chapter itself is the destination. The routing matrix
       rows are plain rows rather than links for the same reason.

   Server component. ChapterNav is the only client island.
   ────────────────────────────────────────────────────────────── */

import Image from "next/image";
import ChapterNav, { type Chapter } from "./ChapterNav";

const NAVY = "#0B2A3A";
const NAVY_2 = "#0E3A52";
const CYAN = "#16C1F3";
const CYAN_INK = "#0A6A88";
const PAGE = "#F4F8FA";
const INSET = "#E9F0F4";
const WHITE = "#FFFFFF";
const BODY = "#41586A";
const MUTED = "#5F7688";
const HAIR = "#D3DFE7";
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";
const EASE = "cubic-bezier(.22,.61,.36,1)";

/* Page inset, matching the design's 55px at 1440 and easing down from there. */
const GUT = "px-[var(--ind-inset)]";
const SHELL = `mx-auto w-full max-w-[1330px] ${GUT}`;

const eyebrow = (color: string) => ({
  margin: 0,
  font: `500 13px/1.2 ${SANS}`,
  letterSpacing: ".09em",
  textTransform: "uppercase" as const,
  color,
});
const label = (color: string) => ({
  margin: 0,
  font: `500 14px/1.2 ${SANS}`,
  letterSpacing: ".045em",
  textTransform: "uppercase" as const,
  color,
});
const lead = (color: string) => ({ margin: 0, font: `400 18px/1.6 ${SANS}`, color, textWrap: "pretty" as const });
const body = (color: string) => ({ margin: 0, font: `400 16px/1.55 ${SANS}`, color, textWrap: "pretty" as const });

const btn = (bg: string, color: string, border?: string) => ({
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  minHeight: 52,
  padding: "0 26px",
  background: bg,
  color,
  border: border ?? "0",
  font: `500 14px/1.2 ${SANS}`,
  letterSpacing: ".045em",
  textTransform: "uppercase" as const,
  textDecoration: "none" as const,
  transition: `background 200ms ${EASE}, color 200ms ${EASE}`,
});

/* ── content ──────────────────────────────────────────────── */

const HERO = {
  eyebrow: "Industries we serve",
  title: "Every Sector Fails Differently. So Does Every Inspection.",
  lead: "A turbine blade, a brake caliper and a BGA solder joint all hide their defects — but not in the same way, at the same scale, or at the same production speed.",
};

const STATEMENT = {
  title: "The Defect You Cannot See Is the One That Ships.",
  paras: [
    "External inspection catches what is on the surface. Porosity in a casting, a void in a solder joint, a debond inside a composite layup — these pass visual checks and fail in service, usually at the customer.",
    "Industrial X-ray and CT let you look inside without cutting the part open. Instead of destroying a sample to judge a batch, you inspect the part you are about to ship — and keep the record.",
  ],
};

type Col = { head: string; items: string[]; accent?: boolean };
type Ch = {
  num: string;
  label: string;
  id: string;
  title: string;
  lead: string;
  cols: Col[];
  note?: string;
};

const CHAPTERS: Ch[] = [
  {
    num: "01",
    label: "Aerospace & Defence",
    id: "ch-aero",
    title: "Aerospace & Defence",
    lead: "Inspect with confidence, because failure is not an option. Turbine parts, rotor blades, structural assemblies, nozzles and composite layups — where a micro-crack, an inclusion or a bond failure has consequences that reach far beyond the factory.",
    /* The design keeps this line behind a toggle, defaulting on. It explains
       why the chapter shows a system rather than a radiograph. */
    note: "We don't publish aerospace scan results. Our customers' programmes stay their own — which is usually why they chose us.",
    cols: [
      { head: "Typical components", items: ["Turbine parts", "Rotor blades", "Structural assemblies", "Nozzles", "Composite layups"] },
      { head: "Typical defects", items: ["Micro-cracks", "Inclusions", "Bond failure / debond", "Internal structural defects"] },
      { head: "Systems used", items: ["High-Energy X-ray", "MQCT", "Microfocus CT", "MQXC Cabinet DR", "Rotor Blade DR"], accent: true },
    ],
  },
  {
    num: "02",
    label: "Automotive & EV",
    id: "ch-auto",
    title: "Automotive & EV",
    lead: "Inspect faster. Reduce scrap. Deliver safer vehicles. Cast housings, brake components, powertrain parts and battery assemblies — inspected at production speed, because a zero-defect target means checking parts, not samples.",
    cols: [
      { head: "Typical components", items: ["Cast housings", "Brake calipers and discs", "Alloy wheels", "Powertrain and steering parts", "EV cells and modules"] },
      { head: "Inspection requirements", items: ["Porosity detection", "Casting quality to spec", "Electrode alignment", "High-throughput 100% checks", "Traceability"] },
      { head: "Systems used", items: ["MQS-PRISM", "MQXC Cabinet DR", "MQCT", "MQWR 160U"], accent: true },
    ],
  },
  {
    num: "03",
    label: "Electronics & Semiconductors",
    id: "ch-elec",
    title: "Electronics & Semiconductors",
    lead: "Inspect what the eye cannot see. BGA voids, head-in-pillow, bridging and PTH fill issues — defects that pass visual inspection, survive functional test, and come back as field returns.",
    cols: [
      { head: "Typical components", items: ["PCB assemblies", "Solder joints and BGAs", "Plated through holes", "SMT assemblies", "Semiconductor packages"] },
      { head: "Typical defects", items: ["BGA voids", "Head-in-pillow", "Solder bridging", "PTH fill issues", "Hidden package defects"] },
      { head: "Systems used", items: ["MQX.tracE", "MQX.tracE CT", "MQX.gINti", "Microfocus CT"], accent: true },
    ],
  },
];

const NAV_CHAPTERS: Chapter[] = CHAPTERS.map((c) => ({ num: c.num, label: c.label, id: c.id }));

const ALSO_SERVED: [string, string][] = [
  ["Energy & Power", "Weld integrity and thick-section castings in pressure-retaining components"],
  ["Foundry & Castings", "Porosity, shrinkage and inclusion classification against customer specification"],
  ["Additive Manufacturing", "Layer integrity, internal lattice validation and CT metrology on printed parts"],
  ["Research & Scientific", "Material characterisation and one-off investigation across mixed sample types"],
];

const ROUTES: [string, string, string][] = [
  ["Turbine and engine components", "Micro-defects in high-value parts", "Microfocus CT · MQCT"],
  ["Thick castings and dense assemblies", "Penetration through the section", "High-Energy X-ray"],
  ["Aluminium castings at volume", "Throughput without missing porosity", "MQS-PRISM · MQXC"],
  ["Brake, steering and safety parts", "100% inspection with traceability", "MQXC Cabinet DR · MQCT"],
  ["EV battery cells and modules", "Electrode alignment and internal defects", "MQCT · Microfocus CT"],
  ["PCBs and solder joints", "Hidden voids under packages", "MQX.tracE · MQX.tracE CT"],
  ["SMT component reels", "Inventory count accuracy", "MQX.gINti"],
  ["Welds and pressure components", "Root penetration and weld integrity", "MQXC 320/450 · High-Energy"],
];

const COMPLIANCE: [string, string][] = [
  ["AERB", "Type-approved radiation safety"],
  /* The client's brief flags the E2422 citation as needing confirmation. */
  ["ASTM", "Aligned workflows, incl. E2422"],
  ["Traceability", "Audit-ready inspection records"],
  ["Archive", "Recallable programs and images"],
];

/* ── pieces ───────────────────────────────────────────────── */

/* The design's labelled placeholder, for the one hero cell MQS have not
   supplied a photograph for. */
function Slot({ caption, className }: { caption: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`} style={{ background: NAVY_2 }}>
      <div className="pointer-events-none absolute inset-5" style={{ border: "1px solid rgba(255,255,255,.12)" }} />
      <p
        className="relative max-w-[300px] p-6 text-center"
        style={{ font: `500 11px/1.7 ${SANS}`, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}
      >
        {caption}
      </p>
    </div>
  );
}

function MosaicCaption({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute ${small ? "left-4 bottom-3.5" : "left-6 bottom-5"}`}
      style={{
        font: `500 ${small ? 11 : 13}px/1.2 ${SANS}`,
        letterSpacing: ".09em",
        textTransform: "uppercase",
        color: "#fff",
        textShadow: small ? "0 1px 10px rgba(11,42,58,.9)" : undefined,
      }}
    >
      {children}
    </div>
  );
}

/* Three columns split by 1px gaps over a hairline ground. Collapsing to one
   column turns those column rules into row rules with no extra CSS. */
function SpecTable({ cols }: { cols: Col[] }) {
  return (
    <div
      className="mt-11 grid grid-cols-1 md:grid-cols-3"
      style={{ gap: 1, background: HAIR }}
    >
      {cols.map((c, i) => (
        <div
          key={c.head}
          className={`py-5 md:py-0 ${i === 0 ? "md:pr-6" : i === cols.length - 1 ? "md:pl-6" : "md:px-6"}`}
          style={{ background: PAGE }}
        >
          <div style={{ ...eyebrow(MUTED), paddingBottom: 14 }}>{c.head}</div>
          <div style={{ font: `400 16px/1.9 ${SANS}`, color: c.accent ? CYAN_INK : NAVY }}>
            {c.items.map((it) => (
              <div key={it}>{it}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChapterHead({ c }: { c: Ch }) {
  return (
    <div className="flex items-start gap-5 md:gap-7">
      <div
        style={{
          font: `600 clamp(44px, 24.7px + 4.95vw, 96px)/.85 ${DISPLAY}`,
          letterSpacing: "-.04em",
          color: HAIR,
        }}
      >
        {c.num}
      </div>
      <div className="pt-1.5">
        <p style={eyebrow(CYAN_INK)}>Primary industry</p>
        <h2
          className="m-0 mt-3"
          style={{
            font: `600 clamp(26px, 19.3px + 1.71vw, 44px)/1.1 ${SANS}`,
            letterSpacing: "-.022em",
            color: NAVY,
            textWrap: "pretty",
          }}
        >
          {c.title}
        </h2>
        <p className="mt-3.5 max-w-[56ch]" style={lead(BODY)}>{c.lead}</p>
      </div>
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────── */

export default function IndustriesOverview() {
  return (
    <main
      style={{ "--ind-inset": "clamp(20px, 3.8vw, 55px)", background: PAGE, color: BODY, fontFamily: SANS } as React.CSSProperties}
    >
      {/* ── hero ── */}
      <section style={{ background: NAVY, paddingTop: 52 }}>
        <div className={SHELL}>
          <div className="grid grid-cols-1 items-end gap-8 pb-11 pt-12 lg:grid-cols-[minmax(0,6.5fr)_minmax(0,4.5fr)] lg:gap-16">
            <div>
              <p style={eyebrow(CYAN)}>{HERO.eyebrow}</p>
              <h1
                className="m-0 mt-5"
                style={{
                  font: `600 clamp(32px, 19.4px + 3.24vw, 66px)/1.02 ${SANS}`,
                  letterSpacing: "-.028em",
                  color: "#fff",
                  textWrap: "pretty",
                }}
              >
                {HERO.title}
              </h1>
            </div>
            <div>
              <p style={lead("rgba(255,255,255,.8)")}>{HERO.lead}</p>
              <div className="mt-7 flex flex-col gap-3.5 sm:flex-row">
                <a href="#chapters" style={btn(CYAN, NAVY)} className="hover:!bg-[#0FA6D4]">Find Your Industry</a>
                <a href="#contact" style={btn("transparent", "#fff", "1px solid rgba(255,255,255,.28)")} className="hover:!bg-white/10">
                  Talk to an Expert
                </a>
            </div>
            </div>
          </div>

          {/* three-cell mosaic: dominant cell plus two stacked */}
          <div className="grid grid-cols-1 gap-3 pb-3 lg:h-[520px] lg:grid-cols-[2fr_1fr] lg:grid-rows-2">
            {/* MQS have not supplied the design's IMG-01, so this keeps the
                design's labelled placeholder rather than a stand-in. */}
            <Slot
              caption="IMG-01 needed · turbine blade or cast part mid-inspection, 1800×1200"
              className="min-h-[240px] lg:row-span-2 lg:min-h-0"
            />
            <div className="relative min-h-[200px] lg:min-h-0" style={{ background: NAVY_2 }}>
              <Image
                src="/assets/ind-auto-wheel-hub.jpg"
                alt="Radiograph of an alloy wheel hub"
                fill
                quality={90}
                sizes="(min-width:1024px) 33vw, 100vw"
                className="object-cover"
              />
              <MosaicCaption small>Automotive</MosaicCaption>
            </div>
            <div className="relative min-h-[200px] lg:min-h-0" style={{ background: NAVY_2 }}>
              <Image
                src="/assets/ind-elec-bga.jpg"
                alt="Radiograph of a BGA solder ball array"
                fill
                quality={90}
                sizes="(min-width:1024px) 33vw, 100vw"
                className="object-cover"
              />
              <MosaicCaption small>Electronics</MosaicCaption>
            </div>
          </div>
        </div>
      </section>

      {/* ── statement ── */}
      <section style={{ background: WHITE, borderBottom: `1px solid ${HAIR}` }}>
        <div className={`${SHELL} grid grid-cols-1 items-start gap-10 py-20 lg:grid-cols-2 lg:gap-[72px] lg:py-24`}>
          <h2
            className="m-0"
            style={{
              font: `600 clamp(28px, 21.3px + 1.71vw, 46px)/1.1 ${SANS}`,
              letterSpacing: "-.02em",
              color: NAVY,
              textWrap: "pretty",
            }}
          >
            {STATEMENT.title}
          </h2>
          <div className="flex flex-col gap-[18px]">
            <p style={lead(BODY)}>{STATEMENT.paras[0]}</p>
            <p style={body(MUTED)}>{STATEMENT.paras[1]}</p>
          </div>
        </div>
      </section>

      {/* ── chapters ── */}
      <section id="chapters" style={{ background: PAGE }}>
        <div className={`${SHELL} grid grid-cols-1 items-start gap-0 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16`}>
          <ChapterNav chapters={NAV_CHAPTERS} note="Four further industries are served — listed after the chapters." />

          <div>
            {CHAPTERS.map((c, i) => (
              <div
                key={c.id}
                id={c.id}
                className="scroll-mt-[110px] pb-20 pt-14 md:pb-24 md:pt-20"
                style={{ borderBottom: i === CHAPTERS.length - 1 ? 0 : `1px solid ${HAIR}` }}
              >
                <ChapterHead c={c} />

                {/* chapter 01 — the rotor blade DR system, contained on white */}
                {c.id === "ch-aero" && (
                  <>
                    <div className="relative mt-11 aspect-[21/9]" style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
                      <Image
                        src="/assets/ind-aero-rotor-dr.jpg"
                        alt="MQS rotor blade digital radiography system with long-format gantry, travelling X-ray source and flat panel detector"
                        fill
                        quality={90}
                        sizes="(min-width:1024px) 70vw, 100vw"
                        className="object-contain p-4"
                      />
                    </div>
                    {c.note && (
                      <p className="mt-4 max-w-[68ch]" style={{ ...body(MUTED), fontStyle: "italic" }}>{c.note}</p>
                    )}
                  </>
                )}

                {/* chapter 02 — a wide radiograph beside a squarer one */}
                {c.id === "ch-auto" && (
                  <div className="mt-11 grid grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr]">
                    <div className="relative aspect-[16/10]" style={{ background: INSET, border: `1px solid ${HAIR}` }}>
                      <Image
                        src="/assets/ind-auto-brake-caliper.jpg"
                        alt="CT volume of a brake caliper with measurement scale"
                        fill
                        quality={90}
                        sizes="(min-width:768px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[1/1.02]" style={{ background: INSET, border: `1px solid ${HAIR}` }}>
                      <Image
                        src="/assets/ind-auto-battery-module.jpg"
                        alt="CT cross-section of a cylindrical battery cell showing electrode winding"
                        fill
                        quality={90}
                        sizes="(min-width:768px) 28vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* chapter 03 — full-width radiograph with the design's annotation chip */}
                {c.id === "ch-elec" && (
                  <div className="relative mt-11 aspect-[21/9]" style={{ background: NAVY }}>
                    <Image
                      src="/assets/svc-ct-voids.jpg"
                      alt="CT analysis showing internal voids in a plated through-hole array"
                      fill
                      quality={90}
                      sizes="(min-width:1024px) 70vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      className="pointer-events-none absolute left-4 top-4 md:left-6 md:top-5"
                      style={{
                        padding: "6px 10px",
                        background: "rgba(11,42,58,.86)",
                        border: `1px solid ${CYAN}`,
                        font: `500 11px/1.2 ${SANS}`,
                        letterSpacing: ".045em",
                        textTransform: "uppercase",
                        color: "#fff",
                      }}
                    >
                      PTH fill — voids in three of four holes
                    </div>
                  </div>
                )}

                <SpecTable cols={c.cols} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── also served ── */}
      <section style={{ background: WHITE, borderTop: `1px solid ${HAIR}` }}>
        <div className={`${SHELL} py-16 md:py-[84px]`}>
          <h2 className="m-0" style={{ font: `500 clamp(24px, 21px + .55vw, 32px)/1.2 ${SANS}`, letterSpacing: "-.015em", color: NAVY }}>
            Also Served
          </h2>
          <div className="mt-7" style={{ borderTop: `1px solid ${HAIR}` }}>
            {ALSO_SERVED.map(([name, desc]) => (
              <a
                key={name}
                href="/contact"
                className="grid grid-cols-1 items-center gap-2 py-5 no-underline transition-colors duration-200 hover:bg-[#F4F8FA] md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)_auto] md:gap-8"
                style={{ borderBottom: `1px solid ${HAIR}` }}
              >
                <span style={{ font: `500 20px/1.25 ${SANS}`, color: NAVY }}>{name}</span>
                <span style={body(MUTED)}>{desc}</span>
                <span style={label(CYAN_INK)}>Contact →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── routing matrix ── */}
      <section id="matrix" style={{ background: NAVY }}>
        <div className={`${SHELL} py-16 md:py-[100px]`}>
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-[72px]">
            <h2
              className="m-0"
              style={{ font: `600 clamp(26px, 19.3px + 1.71vw, 44px)/1.1 ${SANS}`, letterSpacing: "-.02em", color: "#fff", textWrap: "pretty" }}
            >
              Find the System by What You Make.
            </h2>
            <p style={lead("rgba(255,255,255,.8)")}>
              You arrive knowing your part and your problem. This is the shortest route from either to the right configuration.
            </p>
          </div>
          <div className="mt-12">
            <div
              className="hidden pb-3.5 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,3.4fr)] md:gap-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,.3)", ...eyebrow("rgba(255,255,255,.7)") }}
            >
              <span>If you inspect…</span>
              <span>The core problem is…</span>
              <span>Start with</span>
            </div>
            {/* Plain rows, not links: the design points each at a detail page and
                Phase 1 has none. */}
            {ROUTES.map(([part, problem, system]) => (
              <div
                key={part}
                className="grid grid-cols-1 gap-1.5 py-5 md:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,3.4fr)] md:items-center md:gap-8"
                style={{ borderBottom: "1px solid rgba(255,255,255,.16)" }}
              >
                <span style={{ font: `500 19px/1.3 ${SANS}`, color: "#fff", textWrap: "pretty" }}>{part}</span>
                <span style={body("rgba(255,255,255,.72)")}>{problem}</span>
                <span style={{ font: `500 14px/1.4 ${SANS}`, letterSpacing: ".02em", color: CYAN }}>{system}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── compliance ── */}
      <section style={{ background: PAGE }}>
        <div className={`${SHELL} grid grid-cols-1 items-center gap-8 py-16 md:py-[72px] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14`}>
          <h2 className="m-0" style={{ font: `500 clamp(22px, 19px + .55vw, 30px)/1.2 ${SANS}`, letterSpacing: "-.015em", color: NAVY, textWrap: "pretty" }}>
            Built to Pass the Audit, Not Just the Inspection.
          </h2>
          <div className="grid grid-cols-2 gap-6 pt-5 lg:grid-cols-4" style={{ borderTop: `1px solid ${HAIR}` }}>
            {COMPLIANCE.map(([head, detail]) => (
              <div key={head}>
                <div style={{ font: `600 14px/1.2 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_INK }}>{head}</div>
                <p className="mt-2.5" style={{ font: `400 15px/1.55 ${SANS}`, color: MUTED }}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── closing enquiry ── */}
      <section style={{ background: INSET }}>
        <div className={`${SHELL} grid grid-cols-1 items-end gap-10 py-20 md:py-24 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16`}>
          <div>
            <h2
              className="m-0"
              style={{ font: `600 clamp(28px, 20.6px + 1.9vw, 48px)/1.08 ${SANS}`, letterSpacing: "-.025em", color: NAVY, textWrap: "pretty" }}
            >
              Not Sure Which Applies to You?
            </h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2" style={eyebrow(MUTED)}>
              <span>Part size</span>
              <span>Material</span>
              <span>Thickness</span>
              <span>Defect sought</span>
            </div>
          </div>
          <div>
            <p style={lead(BODY)}>
              Share those four and our application engineers will recommend the right configuration — and will say so if a simpler
              system would do the job.
            </p>
            <div className="mt-7 flex flex-col gap-3.5 sm:flex-row">
              <a href="#contact" style={btn(NAVY, "#fff")} className="hover:!bg-[#12496A]">Talk to an Expert</a>
              <a href="#contact" style={btn("transparent", NAVY, `1px solid ${HAIR}`)} className="hover:!bg-white">Request a Demo</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

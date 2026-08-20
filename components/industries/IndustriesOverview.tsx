/* ──────────────────────────────────────────────────────────────
   Industries — /industries/
   Built from the developer handoff "Concept 1a — Alternating layout, final
   for build" (design project 2e7d7293), whose source of truth is
   IndustriesPage.jsx.

   This SUPERSEDES the earlier "V4 Chapters" build of this page. The designer
   re-explored the page from scratch and landed somewhere different, so the
   sticky chapter index is gone and the three primary industries are now
   alternating text/image blocks. ChapterNav.tsx is deleted with it.

   Section order: hero → why inspection matters (with the paired
   external/internal comparison) → primary industries → also served →
   routing matrix → compliance → closing CTA. The site's own header, footer
   and ContactSection replace the handoff's.

   The handoff's scale is measured at four delivered widths (desktop ≥1360,
   laptop 1024-1359, tablet 700-1023, mobile <700) and called final, so those
   values live as .ind-page custom properties in globals.css declared at
   exactly those thresholds. Layout uses the handoff's own breakpoints rather
   than Tailwind's defaults.

   One structural adaptation: the reference picks its layout in JavaScript,
   measuring its own width with a ResizeObserver and passing a `bp` prop down.
   That is a canvas device for showing four fixed frames side by side. Here
   the layout is chosen by CSS, so the page server-renders correctly at any
   width with no JS. The only client island is the mobile routing accordion,
   which genuinely needs state.

   TWO DEPARTURES, both carried over from decisions already taken:

   1 · No breadcrumb. The handoff puts "Home / Industries" in the hero, but
       the client had breadcrumbs removed from /services and /about-us.
   2 · No per-industry "Explore ..." links, and the routing table's rows are
       not links. Both point at pages Phase 1 does not build. Also Served rows
       keep their links because /contact/ is real, and the mobile accordion
       keeps its per-row "Talk to an Expert" for the same reason.
   ────────────────────────────────────────────────────────────── */

import Image from "next/image";
import RoutingAccordion from "./RoutingAccordion";

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

/* max 1330 centred, inset 55 / 48 / 40 / 24 */
const SHELL = "mx-auto w-full max-w-[1330px] px-[var(--ind-gut)]";

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
const bodyType = (color: string) => ({ margin: 0, font: `400 16px/1.55 ${SANS}`, color, textWrap: "pretty" as const });
const h2Type = (color: string) => ({
  margin: 0,
  font: `600 var(--ind-h2)/1.1 ${SANS}`,
  letterSpacing: "-.015em",
  color,
  textWrap: "pretty" as const,
});

const btn = (bg: string, color: string, border?: string) => ({
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  gap: 10,
  height: 52,
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

/* ── content, from the handoff ─────────────────────────────── */

type Industry = {
  n: string;
  name: string;
  lead: string;
  systems: string[];
  image?: { src: string; alt: string; fit: "cover" | "contain"; ground: string };
  need?: string;
  note?: string;
  figcaption?: string;
};

const INDUSTRIES: Industry[] = [
  {
    n: "01",
    name: "Aerospace & Defence",
    lead: "Inspect with confidence, because failure is not an option. Turbine parts, rotor blades, structural assemblies, nozzles and composite layups — where a micro-crack, an inclusion or a bond failure has consequences that reach far beyond the factory.",
    systems: ["High-Energy X-ray", "MQCT", "Microfocus CT", "MQXC Cabinet DR", "Rotor Blade DR"],
    image: {
      src: "/assets/ind-aero-rotor-dr.jpg",
      alt: "MQS rotor blade digital radiography system with long-format gantry, travelling X-ray source and flat panel detector",
      fit: "contain",
      ground: INSET,
    },
    note: "We don't publish aerospace scan results. Our customers' programmes stay their own — which is usually why they chose us.",
  },
  {
    n: "02",
    name: "Automotive & EV",
    lead: "Inspect faster. Reduce scrap. Deliver safer vehicles. Cast housings, brake components, powertrain parts and battery assemblies — inspected at production speed, because a zero-defect target means checking parts, not samples.",
    systems: ["MQS-PRISM", "MQXC Cabinet DR", "MQCT", "MQWR 160U"],
    image: {
      src: "/assets/ind-auto-wheel-hub.jpg",
      alt: "Radiograph of an alloy wheel hub showing internal casting structure",
      fit: "cover",
      ground: INSET,
    },
    figcaption: "Alloy wheel radiograph — porosity assessment",
  },
  {
    n: "03",
    name: "Electronics & Semiconductors",
    lead: "Inspect what the eye cannot see. BGA voids, head-in-pillow, bridging and PTH fill issues — defects that pass visual inspection, survive functional test, and come back as field returns.",
    systems: ["MQX.tracE", "MQX.tracE CT", "MQX.gINti", "Microfocus CT"],
    /* The handoff ships the same PTH radiograph here as in the internal-view
       figure above. Kept as designed so both captions stay accurate. */
    image: {
      src: "/assets/svc-ct-voids.jpg",
      alt: "CT analysis showing internal voids in a plated through-hole array",
      fit: "cover",
      ground: NAVY,
    },
    figcaption: "Plated through holes — voids visible in fill",
  },
];

const ALSO: [string, string][] = [
  ["Energy & Power", "Weld integrity and thick-section castings in pressure-retaining components"],
  ["Foundry & Castings", "Porosity, shrinkage and inclusion classification against customer specification"],
  ["Additive Manufacturing", "Layer integrity, internal lattice validation and CT metrology on printed parts"],
  ["Research & Scientific", "Material characterisation and one-off investigation across mixed sample types"],
];

const ROUTES = [
  ["Turbine and engine components", "Micro-defects in high-value parts", "Microfocus CT · MQCT"],
  ["Thick castings and dense assemblies", "Penetration through the section", "High-Energy X-ray"],
  ["Aluminium castings at volume", "Throughput without missing porosity", "MQS-PRISM · MQXC"],
  ["Brake, steering and safety parts", "100% inspection with traceability", "MQXC Cabinet DR · MQCT"],
  ["EV battery cells and modules", "Electrode alignment and internal defects", "MQCT · Microfocus CT"],
  ["PCBs and solder joints", "Hidden voids under packages", "MQX.tracE · MQX.tracE CT"],
  ["SMT component reels", "Inventory count accuracy", "MQX.gINti"],
  ["Welds and pressure components", "Root penetration and weld integrity", "MQXC 320/450 · High-Energy"],
] as const;

const COMPLIANCE: [string, string][] = [
  ["AERB", "Compliant and type-approved systems for radiation safety"],
  /* The content doc flags the E2422 citation as needing confirmation. */
  ["ASTM", "Aligned inspection workflows, including E2422 where AI software is used"],
  ["Traceability", "Inspection records and reporting support for customer audits"],
  ["Digital archive", "Repeatable, recallable inspection programs and image history"],
];

/* ── pieces ───────────────────────────────────────────────── */

/* The handoff's labelled drop target, for the slots MQS have not filled. */
function Slot({ caption, ratio, faint = false }: { caption: string; ratio?: string; faint?: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ aspectRatio: ratio, background: NAVY_2, ...(ratio ? {} : { position: "absolute", inset: 0 }) }}
    >
      <div className="pointer-events-none absolute inset-5" style={{ border: "1px solid rgba(255,255,255,.12)" }} />
      <p
        className="relative max-w-[420px] p-6 text-center"
        style={{
          font: `500 11px/1.7 ${SANS}`,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: faint ? "rgba(255,255,255,.32)" : "rgba(255,255,255,.45)",
        }}
      >
        {caption}
      </p>
    </div>
  );
}

function Photo({ src, alt, fit, ground, ratio, sizes }: {
  src: string; alt: string; fit: "cover" | "contain"; ground: string; ratio: string; sizes: string;
}) {
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: ratio, background: ground }}>
      <Image src={src} alt={alt} fill quality={90} sizes={sizes} className={fit === "contain" ? "object-contain p-4" : "object-cover"} />
    </div>
  );
}

/* ── 1 · hero ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative flex min-h-[660px] overflow-hidden max-[1023px]:min-h-[520px] max-[639px]:min-h-0" style={{ background: NAVY }}>
      {/* The handoff's IMG-01 is a composite of part types across sectors, which
          MQS have not supplied. This stands in with the seven-axis DR LINAC
          system, unused elsewhere on the site: it shows real MQS equipment
          rather than an abstract pattern, it is sector-neutral on a page that
          gives three industries equal weight, and its dark ground survives the
          scrim (94% falling to 62%) where the lighter product renders wash out.
          IMG-01 stays on the request list. */}
      <Image
        src="/assets/ind-hero-linac.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrim matched to the /services hero at the client's request: 92% falling
          to 10% left-to-right, so the system stays legible on the right instead
          of being flattened to a tint, and a top-to-bottom variant on mobile
          where the copy sits over the middle of the frame. Safe on this image,
          which measures the same mean luminance across its right third as the
          services photograph does. */}
      <div
        className="pointer-events-none absolute inset-0 max-[639px]:hidden"
        style={{ background: "linear-gradient(90deg,rgba(11,42,58,.92) 0%,rgba(11,42,58,.74) 45%,rgba(11,42,58,.1) 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden max-[639px]:block"
        style={{ background: "linear-gradient(180deg,rgba(11,42,58,.35) 0%,rgba(11,42,58,.9) 55%)" }}
      />
      {/* Copy block matched to the /services hero: bottom-aligned rather than
          vertically centred, on the same 120/72 padding, so the two pages open
          the same way. The shell stays capped at 1330 and centred, unlike
          /services which runs full-bleed off a 55px inset, because every
          section below this one on this page is on the capped shell and the
          hero would otherwise sit further left than all of them. */}
      <div className={`relative z-[2] flex w-full flex-col self-end pb-[72px] pt-[120px] max-[639px]:pb-10 max-[639px]:pt-[200px] ${SHELL}`}>
        {/* A one-word eyebrow, as on /services. This is not the handoff's
            "Industries we serve" line, which the client had removed. */}
        <p style={{ ...eyebrow(CYAN), marginBottom: 26 }}>Industries</p>
        <h1
          className="m-0 max-w-[920px]"
          style={{ font: `600 var(--ind-h1)/.98 ${SANS}`, letterSpacing: "-.03em", color: "#fff", textWrap: "pretty" }}
        >
          Every Sector Fails Differently.
          <br />
          So Does Every Inspection.
        </h1>
        <p
          className="max-w-[600px] max-[1023px]:max-w-none"
          style={{ ...lead("rgba(255,255,255,.78)"), margin: "26px 0 0" }}
        >
          A turbine blade, a brake caliper and a BGA solder joint all hide their defects, but not in the same way, at the
          same scale, or at the same production speed. MQS configures inspection around the part, the defect and the line it
          comes off.
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5 max-[639px]:mt-7 max-[639px]:flex-col max-[639px]:gap-2.5">
          <a href="#routing" style={btn(CYAN, NAVY)} className="hover:!bg-[#0FA6D4] max-[639px]:!w-full">Find Your Industry</a>
          <a href="#contact" style={btn("transparent", "#fff", "1px solid rgba(255,255,255,.28)")} className="hover:!bg-white/10 max-[639px]:!w-full">
            Talk to an Expert
          </a>
        </div>
        {/* The handoff's four-criteria strip (The Part / The Defect / The
            Material / The Production Requirement) is removed at the client's
            request. */}
      </div>
    </section>
  );
}

/* ── 2 · why inspection matters ───────────────────────────── */

function Why() {
  return (
    <section style={{ background: PAGE }}>
      <div className={`${SHELL} py-[var(--ind-sect)]`}>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <h2 style={h2Type(NAVY)}>The Defect You Cannot See Is the One That Ships.</h2>
          <div className="flex flex-col gap-[18px]">
            <p style={lead(BODY)}>
              External inspection catches what is on the surface. Porosity in a casting, a void in a solder joint, a debond
              inside a composite layup — these pass visual checks and fail in service, usually at the customer.
            </p>
            <p style={bodyType(MUTED)}>
              Industrial X-ray and CT let you look inside without cutting the part open. Instead of destroying a sample to
              judge a batch, you inspect the part you are about to ship — and keep the record.
            </p>
          </div>
        </div>

        {/* the argument made visually: the same class of part, outside then inside */}
        <div className="mt-8 grid grid-cols-1 min-[700px]:mt-16 min-[700px]:grid-cols-2" style={{ gap: 1, background: HAIR }}>
          <figure className="m-0" style={{ background: WHITE }}>
            <Slot caption="fin-external needed · external view of a PCB assembly on the line, 1200×750" ratio="16 / 10" />
            <figcaption className="flex justify-between gap-4 px-5 py-4" style={label(MUTED)}>
              <span>External view</span>
              <span style={{ color: NAVY }}>Passes</span>
            </figcaption>
          </figure>
          <figure className="m-0" style={{ background: WHITE }}>
            <Photo
              src="/assets/svc-ct-voids.jpg"
              alt="Radiograph of a plated through-hole array with voids visible in the fill"
              fit="cover"
              ground={NAVY}
              ratio="16 / 10"
              sizes="(min-width:700px) 50vw, 100vw"
            />
            <figcaption className="flex justify-between gap-4 px-5 py-4" style={label(MUTED)}>
              <span>Internal view — MQS</span>
              <span style={{ color: CYAN_INK }}>Voids detected</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ── 3 · primary industries, alternating ──────────────────── */

function IndustryBlock({ item, index }: { item: Industry; index: number }) {
  /* The handoff alternates text | image, image | text, text | image, and only
     from laptop up; tablet and mobile stack image under text. */
  const imageFirst = index === 1;
  const cols = imageFirst
    ? "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
    : "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]";

  return (
    <div className={`grid grid-cols-1 items-start gap-7 pt-14 lg:gap-[72px] lg:pt-24 ${cols}`}>
      <div className={imageFirst ? "lg:order-2" : ""}>
        <div style={{ font: `600 var(--ind-num)/.9 ${DISPLAY}`, letterSpacing: "-.04em", color: INSET }}>{item.n}</div>
        <p className="mt-2" style={eyebrow(CYAN_INK)}>Primary industry</p>
        <h3
          className="m-0 mt-3.5"
          style={{ font: `600 var(--ind-h3)/1.12 ${SANS}`, letterSpacing: "-.015em", color: NAVY, textWrap: "pretty" }}
        >
          {item.name}
        </h3>
        <p className="mt-4 max-w-[48ch]" style={lead(BODY)}>{item.lead}</p>
        <div className="mt-7" style={{ borderTop: `1px solid ${HAIR}`, paddingTop: 18 }}>
          <p style={eyebrow(MUTED)}>Systems used</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {item.systems.map((s) => (
              <span key={s} className="px-3 py-2" style={{ background: INSET, font: `500 14px/1.2 ${SANS}`, letterSpacing: ".02em", color: NAVY }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={imageFirst ? "lg:order-1" : ""}>
        {item.image ? (
          <Photo
            src={item.image.src}
            alt={item.image.alt}
            fit={item.image.fit}
            ground={item.image.ground}
            ratio="4 / 3"
            sizes="(min-width:1024px) 55vw, 100vw"
          />
        ) : (
          <Slot caption={item.need ?? "Photograph needed"} ratio="4 / 3" />
        )}
        {item.note && <p className="mt-4 max-w-[58ch]" style={{ ...bodyType(MUTED), fontStyle: "italic" }}>{item.note}</p>}
        {item.figcaption && <p className="mt-3.5" style={{ ...eyebrow(MUTED), letterSpacing: ".045em" }}>{item.figcaption}</p>}
      </div>
    </div>
  );
}

function Primary() {
  return (
    <section style={{ background: WHITE, borderTop: `1px solid ${HAIR}` }}>
      <div className={SHELL}>
        <div className="pt-[var(--ind-sect)]">
          <div className="flex flex-wrap items-baseline justify-between gap-8 pb-6" style={{ borderBottom: `1px solid ${HAIR}` }}>
            <h2 style={h2Type(NAVY)}>Where MQS Systems Work.</h2>
            <span style={eyebrow(MUTED)}>Three primary industries</span>
          </div>
        </div>
        {INDUSTRIES.map((item, i) => (
          <IndustryBlock key={item.n} item={item} index={i} />
        ))}
        <div style={{ height: "var(--ind-sect)" }} />
      </div>
    </section>
  );
}

/* ── 4 · also served ──────────────────────────────────────── */

function Also() {
  return (
    <section style={{ background: PAGE, borderTop: `1px solid ${HAIR}` }}>
      <div className={`${SHELL} py-12 min-[700px]:py-[100px]`}>
        <div className="flex flex-wrap items-baseline justify-between gap-8">
          <h2 className="m-0" style={{ font: `500 var(--ind-h2)/1.2 ${SANS}`, letterSpacing: "-.015em", color: NAVY }}>
            Also Served
          </h2>
          <span className="hidden min-[700px]:inline" style={eyebrow(MUTED)}>
            Enquiries handled by our application engineers
          </span>
        </div>
        <div className="mt-5 min-[700px]:mt-9" style={{ borderBottom: `1px solid ${HAIR}` }}>
          {ALSO.map(([name, need]) => (
            <a
              key={name}
              href="/contact"
              className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 py-[18px] no-underline transition-colors duration-200 hover:bg-white min-[700px]:grid-cols-[minmax(0,3fr)_minmax(0,6fr)_auto] min-[700px]:gap-8 min-[700px]:py-[26px]"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              <span className="min-[700px]:!text-[22px]" style={{ font: `500 18px/1.2 ${SANS}`, letterSpacing: "-.01em", color: NAVY }}>
                {name}
              </span>
              <span className="col-start-1 min-[700px]:col-auto min-[700px]:!text-[16px]" style={{ font: `400 15px/1.55 ${SANS}`, color: MUTED }}>
                {need}
              </span>
              <span
                className="col-start-2 row-start-1 flex items-center gap-2 min-[700px]:col-auto min-[700px]:row-auto"
                style={label(CYAN_INK)}
              >
                Contact
                <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5 · routing matrix ───────────────────────────────────── */

function Routing() {
  return (
    <section id="routing" style={{ background: WHITE, borderTop: `1px solid ${HAIR}` }}>
      <div className={`${SHELL} py-[var(--ind-sect)]`}>
        <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <h2 style={h2Type(NAVY)}>Find the System by What You Make.</h2>
          <p style={lead(BODY)}>
            You arrive knowing your part and your problem. This is the shortest route from either one to the right MQS
            configuration.
          </p>
        </div>

        {/* tablet and up: the table. Rows are not links, because the systems
            they would route to are not Phase 1 pages. */}
        <div className="mt-7 hidden min-[700px]:mt-14 min-[700px]:block">
          <div
            className="grid gap-x-6 gap-y-2 pb-4 min-[700px]:grid-cols-[minmax(0,4fr)_minmax(0,4fr)] min-[1024px]:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,3.4fr)] min-[1024px]:gap-8"
            style={{ borderBottom: `1px solid ${NAVY}`, ...eyebrow(NAVY) }}
          >
            <span>If you inspect…</span>
            <span>The core problem is…</span>
            <span className="hidden min-[1024px]:inline">Start with</span>
          </div>
          {ROUTES.map(([part, problem, system]) => (
            <div
              key={part}
              className="grid items-center gap-x-6 gap-y-2 py-5 min-[700px]:grid-cols-[minmax(0,4fr)_minmax(0,4fr)] min-[1024px]:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,3.4fr)] min-[1024px]:gap-8"
              style={{ borderBottom: `1px solid ${HAIR}` }}
            >
              <span style={{ font: `500 19px/1.3 ${SANS}`, color: NAVY, textWrap: "pretty" }}>{part}</span>
              <span style={bodyType(MUTED)}>{problem}</span>
              <span
                className="col-span-2 min-[1024px]:col-span-1"
                style={{ font: `500 14px/1.4 ${SANS}`, letterSpacing: ".02em", color: CYAN_INK }}
              >
                {system}
              </span>
            </div>
          ))}
        </div>

        {/* mobile: the handoff's guided accordion */}
        <div className="mt-7 min-[700px]:hidden">
          <RoutingAccordion routes={ROUTES} />
        </div>
      </div>
    </section>
  );
}

/* ── 6 · compliance ───────────────────────────────────────── */

function Compliance() {
  return (
    <section style={{ background: PAGE, borderTop: `1px solid ${HAIR}` }}>
      <div className={`${SHELL} py-12 min-[700px]:py-[88px]`}>
        <h2
          className="m-0 max-w-[34ch]"
          style={{ font: `500 var(--ind-h2)/1.2 ${SANS}`, letterSpacing: "-.015em", color: NAVY, textWrap: "pretty" }}
        >
          Built to Pass the Audit, Not Just the Inspection.
        </h2>
        <div
          className="mt-6 grid grid-cols-1 min-[700px]:mt-11 min-[700px]:grid-cols-2 min-[1024px]:grid-cols-4"
          style={{ borderTop: `1px solid ${HAIR}` }}
        >
          {COMPLIANCE.map(([k, v], i) => (
            <div
              key={k}
              className={`py-5 ${i % 2 === 1 ? "min-[700px]:border-l min-[700px]:pl-7" : ""} ${i > 0 ? "min-[1024px]:border-l min-[1024px]:pl-7" : "min-[1024px]:border-l-0 min-[1024px]:pl-0"} min-[700px]:border-b-0`}
              style={{ borderBottom: `1px solid ${HAIR}`, borderColor: HAIR }}
            >
              <div style={{ font: `600 15px/1.2 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_INK }}>{k}</div>
              <p className="mt-3" style={bodyType(MUTED)}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── closing CTA ──
   The handoff closes on a navy "Next step / Not Sure Which Applies to You?"
   band with the four criteria and two buttons. Removed at the client's
   request. ContactSection follows this component and carries the enquiry
   form, so the page still ends on a call to action. */

export default function IndustriesOverview() {
  return (
    <main className="ind-page" style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      <Hero />
      <Why />
      <Primary />
      <Also />
      <Routing />
      <Compliance />
    </main>
  );
}

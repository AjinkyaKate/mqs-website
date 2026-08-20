import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  BODY, CYAN_INK, HAIR, MUTED, NAVY, PAGE, WHITE,
  T_BODY, T_EYEBROW, TR_EYEBROW,
} from "@/components/mqct-concepts/system";

/* ──────────────────────────────────────────────────────────────
   MQCT Concepts Board — /products/mqct-series/concepts/

   Implementation of "MQCT Concepts Board.dc.html" from the Claude Design
   project 3d4c5876-6e4b-4895-9fea-873d13bdd860. The board is a review contact
   sheet: five complete concept pages, each shown at desktop 1440 and mobile
   390, with the rationale, sequence, image plan and key difference for each.

   The design's frames are iframes of the five concept files. Here they are
   iframes of the five real routes, so what is reviewed is the built page
   rather than a mock of it. Each concept's sections use container queries, so
   a 390-wide frame renders the true mobile layout rather than a scaled
   screenshot.

   Frame heights are measured, not guessed: the design carried a uniform
   12600 / 19100 for all five, which leaves dead space under the shorter
   concepts and clips the taller ones.

   The board is wider than any viewport, by design: showing 1440 at 1:1 next
   to 390 needs about 1900px. It is a canvas, so it scrolls horizontally. One
   addition to the imported design: each concept links out to its own route,
   because these previews are now live pages and reviewing one at the reader's
   real viewport is more useful than reviewing it in a frame.
   ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "MQCT Series, five layout concepts | MQS Technologies",
  description:
    "Review board: five complete page structures for the MQCT Series product page, each shown at desktop 1440 and mobile 390, built on one MQS design system.",
  robots: { index: false, follow: false },
};

/* Measured heights, in px, of each route's full document at 1440 and 390. */
type Concept = {
  ref: string;
  slug: string;
  title: string;
  rationale: string;
  sequence: string;
  images: string;
  difference: string;
  h1440: number;
  h390: number;
};

const CONCEPTS: Concept[] = [
  {
    ref: "1a",
    slug: "decision-journey",
    title: "Concept 01 · Decision Journey",
    rationale:
      "Ordered by the questions a quality engineer actually asks, in order: what is it, why CT over radiography, what it measures, which model, how it is built, proof, then commercials. Split hero keeps the headline and both CTAs above the fold with the open-frame system beside them; the four energy proof points sit in a hairline strip welded under the hero.",
    sequence:
      "Hero and proof strip, then Why CT (7-question comparison), CT analysis and metrology, Model range, System architecture, Why MQCT, Real-world results, Applications, Specifications, CT service, CTA.",
    images:
      "Hero: open-frame microfocus system. Analysis: wall thickness, porosity, bracket indications at full width. Models: high precision CT, cabinet, LINAC rail system, MQCT-D slot pending. Architecture: cabinet with doors open, A to E callouts. Results: PCB and battery slots pending, casting trio live.",
    difference:
      "The only concept where the comparison argument comes before any hardware or specification detail, built to convert a radiography user.",
    h1440: 11137,
    h390: 16809,
  },
  {
    ref: "1b",
    slug: "product-anatomy",
    title: "Concept 02 · Product Anatomy",
    rationale:
      "The machine is the protagonist. A welded two-block hero puts the copy on a light neutral panel against a full-bleed white equipment panel, the way the design system treats cut-out equipment photography, and the architecture section runs immediately after the hero so the buyer sees what they are purchasing before any argument is made.",
    sequence:
      "Hero (equipment panel) and energy strip, then System architecture, Capability strip, Model range, Why CT, CT analysis, Results, Specifications, Applications, CT service, CTA.",
    images:
      "Hero and architecture: cabinet with motorized doors open, labelled as naming-pending. Models: high precision CT, cabinet, LINAC, MQCT-D slot. Analysis and results: the three casting scans.",
    difference:
      "Hardware and safety construction lead; the CT versus 2D argument sits mid-page as reinforcement rather than as the opening pitch.",
    h1440: 10932,
    h390: 16641,
  },
  {
    ref: "1c",
    slug: "results-first",
    title: "Concept 03 · Results First",
    rationale:
      "Lead with what CT reveals. A full-bleed wall-thickness scan carries the hero behind a left-to-right navy scrim, the one dark opening in the set, captioned so the image is never presented as decoration, and the analysis stories follow immediately at full editorial width.",
    sequence:
      "Full-bleed CT hero and compact proof strip, then CT analysis (wall thickness, porosity, indications), PCB and battery results, Why CT, System architecture, Model range, Why MQCT, Specifications, Applications, CT service, CTA.",
    images:
      "Hero: wall thickness map, full bleed. Analysis: all three casting scans large. Results: PCB and battery slots pending, casting trio live. Hardware appears only from the architecture section onward.",
    difference:
      "The most visually distinctive route, and the only one where no equipment photograph appears above the fold.",
    h1440: 11160,
    h390: 16604,
  },
  {
    ref: "1d",
    slug: "technical-buyer",
    title: "Concept 04 · Technical Buyer",
    rationale:
      "Built for engineers and procurement who arrive knowing what they need. The hero is compressed to one band with the energy figures parked in a hairline block, a sticky section bar gives direct access to every part of the page, and a requirement-to-model matrix answers the configuration question before the marketing sections begin.",
    sequence:
      "Compact hero, sticky section nav, requirement-to-model matrix, then Model range, Capability strip, CT analysis, Why CT, Specifications, Applications, Results, System architecture, CT service, CTA.",
    images:
      "No hero photograph, by design; equipment imagery appears in the model range and the architecture section, CT scans in analysis and results.",
    difference:
      "The only concept with persistent in-page navigation and a selection matrix; text density is highest and hero imagery lowest.",
    h1440: 11290,
    h390: 17535,
  },
  {
    ref: "1e",
    slug: "find-measure-improve",
    title: "Concept 05 · Find, Measure, Improve",
    rationale:
      "A workflow-led story. The hero pairs the system with its CT output in two welded panels, then a three-step band, find, measure, improve, frames every later section as part of one loop that ends in a corrected process rather than a scrapped part.",
    sequence:
      "Hero (equipment plus CT output) and energy strip, then Find, Measure, Improve, Why CT, CT analysis, System architecture, Model range, Results, Applications, Why MQCT, Specifications, CT service, CTA.",
    images:
      "Hero: open-frame system and porosity output side by side. Workflow: bracket indications, wall thickness, porosity, one per step. Architecture and models as elsewhere.",
    difference:
      "Equipment and result imagery are set against each other from the first screen, and the page is organised by process stage rather than by product fact.",
    h1440: 12109,
    h390: 18388,
  },
];

const meta: CSSProperties = { margin: 0, font: T_BODY, fontSize: 15, color: MUTED, maxWidth: "100ch", textWrap: "pretty" };

function Frame({ slug, label, width, height }: { slug: string; label: string; width: number; height: number }) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      <figcaption style={{ font: T_EYEBROW, letterSpacing: TR_EYEBROW, textTransform: "uppercase", color: CYAN_INK }}>
        {label}
      </figcaption>
      <div style={{ width, border: `1px solid ${HAIR}`, background: WHITE }}>
        <iframe
          src={`/products/mqct-series/concepts/${slug}`}
          title={`${slug} at ${width}`}
          loading="lazy"
          scrolling="no"
          className="mqctc-frame"
          style={{ width, height }}
        />
      </div>
    </figure>
  );
}

export default function ConceptsBoardPage() {
  return (
    <section style={{ background: PAGE, padding: "64px 55px", display: "flex", flexDirection: "column", gap: 48 }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
        <p style={{ margin: 0, font: T_EYEBROW, letterSpacing: TR_EYEBROW, textTransform: "uppercase", color: CYAN_INK }}>
          Turn 1 · MQCT Series product page
        </p>
        <h1 style={{ margin: 0, font: `600 46px/1.1 var(--font-sans)`, letterSpacing: "-0.03em", color: NAVY }}>
          Five page structures, one MQS design system.
        </h1>
        <p style={{ margin: 0, font: `400 18px/1.6 var(--font-sans)`, color: BODY, textWrap: "pretty" }}>
          Each concept is a complete page, header to footer, shown at desktop 1440 and mobile 390. Typography, the light
          neutral grounds, selective navy bands, cyan accent, hairline grid, square corners and CTA patterns are identical
          across all five; only sequence, hierarchy and section treatment change. References:{" "}
          {CONCEPTS.map((c, i) => (
            <span key={c.ref}>
              <a href={`#${c.ref}`} style={{ color: CYAN_INK }}>{c.ref}</a> {c.title.split("· ")[1]}
              {i < CONCEPTS.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <p style={meta}>
          Two content items are held open on purpose: the cabinet render is labelled MQCT 225AB while the architecture
          calls it MQCT-X (flagged on the page, not silently resolved), and no validated PCB, battery or MQCT-D imagery
          was supplied, so those slots are labelled drop targets rather than invented visuals.
        </p>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 72, alignItems: "flex-start" }}>
        {CONCEPTS.map((c) => (
          <div key={c.ref} id={c.ref} style={{ display: "flex", flexDirection: "column", gap: 20, scrollMarginTop: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 1000 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ background: NAVY, color: WHITE, font: `600 13px/1 var(--font-display)`, letterSpacing: ".08em", padding: "8px 10px" }}>
                  {c.ref}
                </span>
                <h2 style={{ margin: 0, font: `500 30px/1.2 var(--font-sans)`, letterSpacing: "-0.02em", color: NAVY }}>
                  {c.title}
                </h2>
                <a href={`/products/mqct-series/concepts/${c.slug}`} style={{ font: T_EYEBROW, letterSpacing: TR_EYEBROW, textTransform: "uppercase", color: CYAN_INK }}>
                  Open full page
                </a>
              </div>
              <p style={{ margin: 0, font: T_BODY, color: BODY, maxWidth: "100ch", textWrap: "pretty" }}>
                <strong style={{ color: NAVY }}>Rationale.</strong> {c.rationale}
              </p>
              <p style={meta}><strong style={{ color: NAVY }}>Sequence.</strong> {c.sequence}</p>
              <p style={meta}><strong style={{ color: NAVY }}>Images.</strong> {c.images}</p>
              <p style={meta}><strong style={{ color: NAVY }}>Key difference.</strong> {c.difference}</p>
            </div>
            <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
              <Frame slug={c.slug} label="Desktop 1440" width={1440} height={c.h1440} />
              <Frame slug={c.slug} label="Mobile 390" width={390} height={c.h390} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

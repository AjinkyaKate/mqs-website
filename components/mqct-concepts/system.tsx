import type { CSSProperties, ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   MQCT concept boards — shared design-system layer.

   Imported from the Claude Design project "MQCT Concepts Board"
   (3d4c5876-6e4b-4895-9fea-873d13bdd860), which composes five concept
   pages out of thirteen shared section components on top of the MACHIN
   design system plus the MQS brand layer (mqs-theme.css).

   Values below are the resolved token values, not guesses:
   tokens/typography.css gives the type roles, tokens/spacing.css gives the
   control metrics, and mqs-theme.css maps the semantic tokens onto the MQS
   palette. Resolving them here rather than referencing --type-* keeps these
   routes independent of the site's own token layer, which uses different names.

   These routes are for client review of layout direction. They are not wired
   into the site navigation and carry noindex.
   ────────────────────────────────────────────────────────────── */

/* mqs-theme.css */
export const NAVY = "#0B2A3A";
export const NAVY_DEEP = "#08222F"; /* the dark section ground used by Results and CTA */
export const CYAN = "#16C1F3";
export const CYAN_HOVER = "#0FA6D4";
export const CYAN_INK = "#0A6A88";
export const PAGE = "#F4F8FA";
export const INSET = "#E9F0F4";
export const WHITE = "#FFFFFF";
export const BODY = "#41586A";
export const MUTED = "#5F7688";
export const HAIR = "#D3DFE7";
export const HAIR_SOFT = "#E1EAF0";
export const ON_DARK = "rgba(255,255,255,.16)";

/* Status hues introduced by this design for the CT comparison. See the note in
   sections.tsx: this reverses the earlier no-semantic-colour decision. */
export const OK = "#3FBF7F";
export const PART = "#E0A33C";
export const NO = "#E05B4B";
export const CYAN_QUIET = "#EAF7FD";
export const FLAG = "#8A5A00";

/* tokens/typography.css */
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";
export const T_EYEBROW = `500 13px/1.2 ${SANS}`;
export const T_LABEL = `500 14px/1.2 ${SANS}`;
export const T_BODY = `400 16px/1.55 ${SANS}`;
export const T_LEAD = `400 18px/1.55 ${SANS}`;
export const TR_EYEBROW = ".09em";
export const TR_LABEL = ".045em";

/* tokens/spacing.css: --layout-content 1330, --layout-gutter 55 */
export const GUTTER = "clamp(24px,3.9cqi,55px)";
export const SHELL: CSSProperties = {
  maxWidth: 1330,
  margin: "0 auto",
  padding: `0 ${GUTTER}`,
};

export const eyebrow = (color = CYAN_INK): CSSProperties => ({
  margin: 0,
  font: T_EYEBROW,
  letterSpacing: TR_EYEBROW,
  textTransform: "uppercase",
  color,
});

export const microLabel = (color = MUTED): CSSProperties => ({
  margin: 0,
  font: T_EYEBROW,
  fontSize: 11,
  letterSpacing: TR_EYEBROW,
  textTransform: "uppercase",
  color,
});

export const bodyText = (color = BODY, size?: number): CSSProperties => ({
  margin: 0,
  font: T_BODY,
  ...(size ? { fontSize: size } : null),
  color,
  textWrap: "pretty",
});

export const lead = (color = BODY): CSSProperties => ({
  margin: 0,
  font: T_LEAD,
  lineHeight: 1.6,
  color,
  textWrap: "pretty",
});

/* Section headings. The design sets each one's clamp explicitly, so the size
   is a parameter rather than a fixed scale step. */
export const h2 = (clampSize: string, color = NAVY): CSSProperties => ({
  margin: 0,
  font: `500 ${clampSize} ${SANS}`,
  letterSpacing: "-0.025em",
  color,
  textWrap: "pretty",
});

export const h3 = (clampSize: string, color = NAVY): CSSProperties => ({
  margin: 0,
  font: `500 ${clampSize} ${SANS}`,
  letterSpacing: "-0.015em",
  color,
  textWrap: "pretty",
});

export const figure = (clampSize: string, color = NAVY): CSSProperties => ({
  margin: 0,
  font: `600 ${clampSize} ${DISPLAY}`,
  letterSpacing: "-0.03em",
  color,
});

/* ── core components, matching _ds_bundle.js ── */

/* Button, variant primary, size md: --control-height 48, --control-pad-x 24,
   --surface-brand cyan on --text-on-brand navy. */
export function Btn({ children, href = "#contact" }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="mqctc-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        height: 48,
        padding: "0 24px",
        background: CYAN,
        color: NAVY,
        font: T_LABEL,
        letterSpacing: TR_LABEL,
        textTransform: "uppercase",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

/* The concepts pair the primary button with a hand-rolled outline link rather
   than the DS outline variant, because it sits on light grounds. */
export function GhostBtn({
  children,
  href = "#specifications",
  onDark = false,
}: {
  children: ReactNode;
  href?: string;
  onDark?: boolean;
}) {
  return (
    <a
      href={href}
      className={onDark ? "mqctc-ghost-dark" : "mqctc-ghost"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        padding: "0 24px",
        border: `1px solid ${onDark ? "rgba(255,255,255,.5)" : NAVY}`,
        color: onDark ? WHITE : NAVY,
        font: T_LABEL,
        letterSpacing: TR_LABEL,
        textTransform: "uppercase",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

/* Chip, tone inset: --control-height-sm 40, --space-4 16, --size-body-sm 15. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 40,
        padding: "0 16px",
        background: INSET,
        color: BODY,
        fontFamily: "var(--font-sans)",
        fontSize: 15,
      }}
    >
      {children}
    </span>
  );
}

/* The numbered/lettered marker used by the anatomy callouts and cards. */
export function Marker({ children, size = 26 }: { children: ReactNode; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        background: CYAN,
        color: NAVY,
        font: `600 13px/1 var(--font-display)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto",
      }}
    >
      {children}
    </span>
  );
}

/* Section wrapper. Every concept section is a container query root, which is
   what lets the board render a true 390 layout inside a 390 iframe. */
export function Band({
  id,
  ground,
  padY,
  topRule = true,
  children,
  style,
}: {
  id?: string;
  ground: string;
  padY: string;
  topRule?: boolean | "dark";
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        containerType: "inline-size",
        background: ground,
        padding: `${padY} 0`,
        ...(topRule
          ? { borderTop: `1px solid ${topRule === "dark" ? ON_DARK : HAIR}` }
          : null),
        ...style,
      }}
    >
      <div style={SHELL}>{children}</div>
    </section>
  );
}

/* A section header: eyebrow plus heading on the left, supporting lead on the
   right, bottom-aligned. Used by six of the shared sections. */
export function BandHead({
  eyebrowText,
  heading,
  headingSize,
  headingWidth,
  supporting,
  onDark = false,
  gapBelow = "clamp(32px,3.4cqi,48px)",
}: {
  eyebrowText: string;
  heading: string;
  headingSize: string;
  headingWidth?: string;
  supporting?: string;
  onDark?: boolean;
  gapBelow?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "clamp(20px,3cqi,64px)",
        alignItems: "flex-end",
        marginBottom: gapBelow,
      }}
    >
      <div style={{ flex: "1 1 460px" }}>
        <p style={{ ...eyebrow(onDark ? CYAN : CYAN_INK), marginBottom: 18 }}>{eyebrowText}</p>
        <h2 style={{ ...h2(headingSize, onDark ? WHITE : NAVY), maxWidth: headingWidth ?? "22ch" }}>
          {heading}
        </h2>
      </div>
      {supporting && (
        <p
          style={{
            ...lead(onDark ? "rgba(255,255,255,.78)" : BODY),
            flex: "1 1 340px",
            maxWidth: "54ch",
          }}
        >
          {supporting}
        </p>
      )}
    </div>
  );
}

/* ── image-slot ──
   The design uses <image-slot> for the four images MQS has not supplied in a
   publishable form. image-slot.js is a canvas-time drag-and-drop scaffold, so
   only its rendered placeholder state is meaningful here. Keeping these as
   visible labelled slots is the point: the design brief is explicit that an
   unsupplied image is shown as a drop target, never filled with a stand-in. */
export function ImageSlot({
  label,
  onDark = false,
}: {
  label: string;
  onDark?: boolean;
}) {
  const stroke = onDark ? "rgba(255,255,255,.28)" : "#B9CBD8";
  return (
    <div
      role="img"
      aria-label={`Image pending: ${label}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "clamp(20px,3cqi,36px)",
        textAlign: "center",
        background: onDark ? "rgba(255,255,255,.03)" : PAGE,
        outline: `1px dashed ${stroke}`,
        outlineOffset: -10,
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        stroke={onDark ? "rgba(255,255,255,.5)" : MUTED} strokeWidth="1.4" strokeLinecap="square">
        <path d="M3 4h18v16H3z" />
        <path d="M3 16l5-5 4 4 3-3 6 6" />
        <circle cx="8.5" cy="8.5" r="1.6" />
      </svg>
      <p
        style={{
          margin: 0,
          font: T_BODY,
          fontSize: 13,
          lineHeight: 1.55,
          color: onDark ? "rgba(255,255,255,.62)" : MUTED,
          maxWidth: "44ch",
          textWrap: "pretty",
        }}
      >
        {label}
      </p>
      <span style={microLabel(onDark ? "rgba(255,255,255,.4)" : "#8FA6B5")}>Image slot</span>
    </div>
  );
}

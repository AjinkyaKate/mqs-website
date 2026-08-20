"use client";

import { useActionState, useRef, useState, type CSSProperties } from "react";
import FormSelect from "./FormSelect";
import { submitEnquiry } from "@/lib/actions/enquiry";
import type { EnquiryFormState } from "@/lib/schemas";

/* ──────────────────────────────────────────────────────────────
   Enquiry form — from "MQS-Contact-Responsive.dc.html" and the
   "CONTACT US — Webpage Build Reference" it was drawn from.

   Eight required fields, four optional. The reference is explicit that the
   source document marked eleven required and that it was cut to eight on
   purpose: application, part material and part size are useful to engineering
   but not worth the submissions they cost, and most people who fill the
   free-text box mention them anyway. So the optional group carries its own
   heading, "Optional, helps us answer faster", rather than an asterisk.

   Fields are bottom-rule only and take the cyan rule on focus, matching
   FormSelect, which is reused here for all five dropdowns rather than
   reimplementing the design's bare <select>: it already gives a native picker
   on mobile and a hairline panel on desktop at the same 48px rhythm.

   Wired to submitEnquiry, so submissions land in the same Enquiry table and
   admin view as every other form on the site. Entered values come back on a
   failed validation, which the reference requires: "nobody refills this form
   twice".
   ────────────────────────────────────────────────────────────── */

const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88";
const ERR = "#A33A2A";
const SANS = "var(--font-sans)";
const EASE = "cubic-bezier(.22,.61,.36,1)";

const microLabel: CSSProperties = {
  font: `500 13px/1.2 ${SANS}`,
  letterSpacing: ".045em",
  textTransform: "uppercase",
  color: BODY,
};

const INDUSTRY = ["Aerospace & Defence", "Automotive", "Electronics", "Other"];
const REQUIREMENT = ["X-ray inspection", "CT inspection", "Automated test equipment", "Services", "Other"];
const APPLICATION = ["Casting defects", "Weld inspection", "PCB inspection", "Metrology", "Failure analysis", "Reel counting", "Other"];
const MATERIAL = ["Aluminium", "Steel", "Composite", "Plastic", "Electronics", "Other"];
const PART_SIZE = ["Small, fits in a cabinet", "Medium", "Large, needs a walk-in cell"];

function Field({
  label, name, type = "text", required, multiline, rows, placeholder, span, error, defaultValue,
}: {
  label: string; name: string; type?: string; required?: boolean; multiline?: boolean;
  rows?: number; placeholder?: string; span?: boolean; error?: string; defaultValue?: string;
}) {
  const control: CSSProperties = {
    width: "100%",
    border: 0,
    borderBottom: `1px solid ${error ? ERR : HAIR}`,
    background: "transparent",
    padding: "0 0 12px",
    minHeight: 44,
    font: `400 16px/1.55 ${SANS}`,
    color: INK,
    outline: "none",
    borderRadius: 0,
    transition: `border-color 200ms ${EASE}`,
    ...(multiline ? { resize: "vertical" as const, minHeight: 96, paddingTop: 8 } : null),
  };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 12, ...(span ? { gridColumn: "1 / -1" } : null) }}>
      <span style={microLabel}>{label}{required ? "*" : ""}</span>
      {multiline ? (
        <textarea name={name} rows={rows ?? 4} required={required} placeholder={placeholder}
          defaultValue={defaultValue} className="mqs-input" style={control} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder}
          defaultValue={defaultValue} className="mqs-input" style={control} />
      )}
      {error && <span style={{ font: `400 13px/1.4 ${SANS}`, color: ERR }}>{error}</span>}
    </label>
  );
}

function SelectField({ label, name, options, required, error, defaultValue }: {
  label: string; name: string; options: string[]; required?: boolean; error?: string; defaultValue?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={microLabel}>{label}{required ? "*" : ""}</span>
      {/* Keyed on the returned value: when the server hands values back after a
          failed validation the key changes and FormSelect remounts with the
          choice restored, and while the user is typing the key is stable so
          their own selection is never clobbered. */}
      <FormSelect key={`${name}-${defaultValue ?? ""}`} name={name} placeholder="Select" options={options} defaultValue={defaultValue} />
      {error && <span style={{ font: `400 13px/1.4 ${SANS}`, color: ERR }}>{error}</span>}
    </div>
  );
}

export default function ContactForm() {
  const [state, action, pending] = useActionState<EnquiryFormState, FormData>(submitEnquiry, { success: false });
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const err = (k: string) => e[k]?.[0];

  if (state.success) {
    return (
      <div id="enquiry-form" className="mqs-rise" style={{
        background: WHITE, border: `1px solid ${HAIR}`, borderTop: `2px solid ${CYAN}`,
        padding: "var(--formpad)", display: "flex", flexDirection: "column", gap: 16,
      }}>
        <span aria-hidden style={{ width: 40, height: 40, background: CYAN, color: INK, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M4 12l5 5L20 6" /></svg>
        </span>
        <h2 style={{ margin: 0, font: `600 28px/1.15 ${SANS}`, letterSpacing: "-.02em", color: INK }}>Enquiry received</h2>
        <p style={{ margin: 0, font: `400 16px/1.6 ${SANS}`, color: BODY }} role="status">
          {state.message ?? "Thanks, our team will contact you shortly."}
        </p>
        <p style={{ margin: 0, font: `400 14px/1.6 ${SANS}`, color: MUTED }}>
          If it is urgent, call <a href="tel:+914023811122" style={{ color: CYAN_L }}>+91 40 2381 1122</a> during office hours.
        </p>
      </div>
    );
  }

  return (
    <form
      id="enquiry-form"
      action={action}
      noValidate
      className="mqs-rise"
      style={{
        background: WHITE, border: `1px solid ${HAIR}`, borderTop: `2px solid ${CYAN}`,
        padding: "var(--formpad)", display: "flex", flexDirection: "column", gap: 28,
        animationDelay: "140ms",
      }}
    >
      <input type="hidden" name="sourcePage" value="/contact" />
      {/* Honeypot. The reference asks for spam protection that is not a visible
          puzzle, so this field is hidden from sight and from assistive tech, and
          anything arriving in it is treated as a bot. */}
      <div aria-hidden style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 style={{ margin: 0, font: `600 28px/1.15 ${SANS}`, letterSpacing: "-.02em", color: INK }}>Get in touch</h2>
        <p style={{ margin: 0, font: `400 16px/1.6 ${SANS}`, color: BODY }}>
          Share your application and we&rsquo;ll respond with the right recommendations.
        </p>
      </div>

      {state.message && !state.success && (
        <p role="alert" style={{ margin: 0, background: "#F6EBE7", borderLeft: `2px solid ${ERR}`, padding: "12px 14px", font: `400 14px/1.55 ${SANS}`, color: ERR }}>
          {state.message}
        </p>
      )}

      {/* Group 1 — basic details */}
      <div style={{ display: "grid", gridTemplateColumns: "var(--fieldcols)", gap: 24 }}>
        <Field label="Full name" name="name" required error={err("name")} defaultValue={v.name} />
        <Field label="Company name" name="company" required error={err("company")} defaultValue={v.company} />
        <Field label="Email" name="email" type="email" required error={err("email")} defaultValue={v.email} />
        <Field label="Phone" name="phone" type="tel" required error={err("phone")} defaultValue={v.phone} />
        <Field label="City, country" name="cityCountry" required span error={err("cityCountry")} defaultValue={v.cityCountry} />
      </div>

      {/* Group 2 — your requirement */}
      <div style={{ display: "grid", gridTemplateColumns: "var(--fieldcols)", gap: 24 }}>
        <SelectField label="Industry" name="industry" options={INDUSTRY} required error={err("industry")} defaultValue={v.industry} />
        <SelectField label="Requirement type" name="requirementType" options={REQUIREMENT} required error={err("requirementType")} defaultValue={v.requirementType} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Field
          label="What do you need to inspect or test?"
          name="message"
          required
          multiline
          rows={4}
          placeholder="Part type, material, section thickness, what you're trying to find, and throughput if relevant."
          error={err("message")}
          defaultValue={v.message}
        />
        <span style={{ font: `400 13px/1.5 ${SANS}`, color: MUTED }}>
          The more specific you are here, the more useful our first reply will be.
        </span>
      </div>

      {/* Group 3 — optional */}
      <div style={{ borderTop: `1px solid ${HAIR}`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        <span style={{ font: `500 13px/1.2 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase", color: MUTED }}>
          Optional, helps us answer faster
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "var(--fieldcols)", gap: 24 }}>
          <SelectField label="Application" name="application" options={APPLICATION} defaultValue={v.application} />
          <SelectField label="Part material" name="partMaterial" options={MATERIAL} defaultValue={v.partMaterial} />
          <SelectField label="Part size range" name="partSize" options={PART_SIZE} defaultValue={v.partSize} />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={microLabel}>Drawing, photo or specification</span>
            <input
              ref={fileRef}
              name="attachment"
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              onChange={(ev) => setFileName(ev.target.files?.[0]?.name ?? null)}
              style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mqs-attach"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                border: `1px solid ${err("attachment") ? ERR : HAIR}`, background: INSET,
                padding: "10px 14px", minHeight: 44, cursor: "pointer", textAlign: "left",
                font: `400 14px/1.4 ${SANS}`, color: fileName ? INK : MUTED, borderRadius: 0,
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {fileName ?? "PDF, JPG or PNG · up to 10 MB"}
              </span>
              <span style={{ font: `500 13px/1.2 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_L, flex: "0 0 auto" }}>
                {fileName ? "Change" : "Attach"}
              </span>
            </button>
            {err("attachment") && <span style={{ font: `400 13px/1.4 ${SANS}`, color: ERR }}>{err("attachment")}</span>}
          </div>
        </div>
      </div>

      {/* Consent and DPDP notice */}
      <div style={{ borderTop: `1px solid ${HAIR}`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ display: "flex", gap: 12, alignItems: "flex-start", font: `400 16px/1.6 ${SANS}`, color: BODY, cursor: "pointer" }}>
          <input type="checkbox" name="consent" style={{ width: 20, height: 20, margin: "3px 0 0", accentColor: CYAN, flex: "0 0 auto" }} />
          <span>I agree to be contacted by MQS Technologies regarding this enquiry.</span>
        </label>
        {err("consent") && <span style={{ font: `400 13px/1.4 ${SANS}`, color: ERR }}>{err("consent")}</span>}
        {/* The reference links "Privacy Policy" here. That page does not exist on
            the site yet, so the phrase is plain text rather than a dead link,
            matching how the careers form already words it. Make it a link the
            moment /privacy-policy ships. */}
        <p style={{ margin: 0, font: `400 13px/1.6 ${SANS}`, color: MUTED, textWrap: "pretty" }}>
          We use these details only to respond to your enquiry and retain them for 24 months. You can ask us to delete them
          at any time by writing to <a href="mailto:sales@mqstechnologies.in" style={{ color: CYAN_L }}>sales@mqstechnologies.in</a>.
          Full details are in our privacy policy.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mqs-submit"
        style={{
          height: 56, width: "100%", background: CYAN, color: INK, border: 0, borderRadius: 0,
          font: `500 14px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase",
          cursor: pending ? "progress" : "pointer", opacity: pending ? 0.6 : 1,
          transition: `background 200ms ${EASE}, opacity 200ms ${EASE}`,
        }}
      >
        {pending ? "Sending…" : "Submit Enquiry"}
      </button>
    </form>
  );
}

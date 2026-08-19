"use client";

import { useActionState, useRef, useState } from "react";
import { submitApplication } from "@/lib/actions/application";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   Careers — ported from `MQS Careers A - Editorial.dc.html`.
   Editorial / narrative layout on the site design system (palette 2B
   + site font). Hero → Why MQS → Life at MQS → Values → Teams →
   Hiring → Apply form. Openings are data-driven: an empty list shows
   the honest "talent pool" state rather than fabricated vacancies.
   The form posts to submitApplication: zod-validated, resume written to Vercel
   Blob with private access, stored as an Application row and readable in the
   admin panel. Client-side file checks stay as a fast first pass; the server
   repeats them, since a client check is a courtesy and not a control.
   (was: functional UI only)
   submission backend is wired separately.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", PAGE = "#F4F8FA", NAVY = "#0E3A52";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88", CYAN_D = "#5AD1F7";
const ERROR = "#B02A1F";
const SANS = "var(--font-sans)";

const eyebrow = (color: string) => ({ font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color });
const h2 = (color: string) => ({ margin: 0, font: `600 clamp(28px,3.8vw,46px)/1.08 ${SANS}`, letterSpacing: "-.025em", color });

const LIFE_INTRO = "We are a multidisciplinary engineering team that values ownership, curiosity and execution. Work here blends design thinking with real-world manufacturing and customer impact — so you see your work go live, not stay in slides.";
const LIFE: [string, string][] = [
  ["Engineering-first environment", "Build, test, improve, repeat."],
  ["Hands-on learning", "Exposure to full systems, field use-cases and real customer requirements."],
  ["Mentorship & growth", "Guidance from senior engineers and functional leads."],
  ["Certification & skill support", "Support for relevant training and certifications, based on role."],
  ["Cross-functional collaboration", "Mechanical, electronics, software, applications and service, working together."],
];

const VALUES: [string, string][] = [
  ["Precision & Accountability", "Quality is non-negotiable."],
  ["Customer-driven engineering", "Build for real-world outcomes."],
  ["Ownership", "Take responsibility, finish what you start."],
  ["Continuous improvement", "Learn fast, iterate faster."],
  ["Integrity & Safety", "Trust and a safety-first mindset."],
];

const TEAMS: [string, string][] = [
  ["Mechanical", "Cabinets, manipulators, granite bases, shielding and part-handling mechanisms."],
  ["Electronics", "Control units, power electronics, embedded platforms and system integration."],
  ["Software", "MQS Imaging Suite, acquisition and control, image processing and AI inspection tools."],
  ["Applications", "Customer parts, inspection technique development, demonstrations and training."],
  ["Service", "Installation, commissioning, preventive maintenance and breakdown support in the field."],
  ["Sales", "Technical consultation with quality and manufacturing teams across India."],
  ["Operations", "Production planning, supply chain, quality systems and documentation."],
];

const STEPS: [string, string][] = [
  ["Apply", "Submit your resume through the form below."],
  ["Screening", "An initial conversation about your background and interests."],
  ["Technical discussion", "With the functional lead for the relevant team."],
  ["Offer", "Role, compensation and start date confirmed."],
];

// Live vacancies. Empty by default → the talent-pool state renders (never a
// fabricated "current openings" list). Add { title, team, meta } to publish roles.
const OPENINGS: { title: string; team: string; meta: string }[] = [];

const DEPARTMENTS = ["Mechanical", "Electronics", "Software", "Applications", "Service", "Sales", "Operations", "Other"];
const EXPERIENCE = ["0 – 2 years", "2 – 5 years", "5 – 10 years", "10 – 15 years", "15+ years"];

type FieldProps = { label: string; name: string; type?: string; placeholder?: string; required?: boolean };
function fieldLabel(label: string, required?: boolean) {
  return (
    <span style={{ font: `500 11px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: MUTED }}>
      {label} {required && <span style={{ color: CYAN_L }}>*</span>}
    </span>
  );
}

function TextField({ label, name, type = "text", placeholder, required }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      {fieldLabel(label, required)}
      <input type={type} name={name} placeholder={placeholder} className="careers-field" />
    </label>
  );
}

function SelectField({ label, name, placeholder, options, required }: { label: string; name: string; placeholder: string; options: string[]; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      {fieldLabel(label, required)}
      <select name={name} defaultValue="" className="careers-field">
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

// City suggestions for the location typeahead (India-focused + a few global hubs).
const CITIES = [
  "Hyderabad, Telangana", "Warangal, Telangana", "Bengaluru, Karnataka", "Mysuru, Karnataka",
  "Mangaluru, Karnataka", "Hubballi, Karnataka", "Chennai, Tamil Nadu", "Coimbatore, Tamil Nadu",
  "Madurai, Tamil Nadu", "Tiruchirappalli, Tamil Nadu", "Salem, Tamil Nadu", "Pune, Maharashtra",
  "Mumbai, Maharashtra", "Nagpur, Maharashtra", "Nashik, Maharashtra", "Thane, Maharashtra",
  "Aurangabad, Maharashtra", "New Delhi, Delhi", "Gurugram, Haryana", "Faridabad, Haryana",
  "Noida, Uttar Pradesh", "Ghaziabad, Uttar Pradesh", "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh",
  "Ahmedabad, Gujarat", "Vadodara, Gujarat", "Surat, Gujarat", "Rajkot, Gujarat",
  "Kolkata, West Bengal", "Visakhapatnam, Andhra Pradesh", "Vijayawada, Andhra Pradesh",
  "Tirupati, Andhra Pradesh", "Kochi, Kerala", "Thiruvananthapuram, Kerala", "Kozhikode, Kerala",
  "Indore, Madhya Pradesh", "Bhopal, Madhya Pradesh", "Jaipur, Rajasthan", "Jodhpur, Rajasthan",
  "Udaipur, Rajasthan", "Chandigarh", "Amritsar, Punjab", "Ludhiana, Punjab", "Jalandhar, Punjab",
  "Bhubaneswar, Odisha", "Patna, Bihar", "Ranchi, Jharkhand", "Raipur, Chhattisgarh",
  "Dehradun, Uttarakhand", "Guwahati, Assam",
  "Dubai, UAE", "Singapore", "London, United Kingdom", "Munich, Germany", "Detroit, United States",
];

function LocationField() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const matches = (() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const starts = CITIES.filter((c) => c.toLowerCase().startsWith(s));
    const incl = CITIES.filter((c) => !c.toLowerCase().startsWith(s) && c.toLowerCase().includes(s));
    return [...starts, ...incl].slice(0, 7);
  })();

  const choose = (c: string) => { setQ(c); setOpen(false); setActive(-1); };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(matches[active]); }
    else if (e.key === "Escape") { setOpen(false); setActive(-1); }
  };

  return (
    <label className="flex flex-col gap-2" style={{ position: "relative" }}>
      {fieldLabel("Current location", true)}
      <input
        type="text" name="location" autoComplete="off" value={q}
        placeholder="Start typing your city…"
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => q && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKey}
        role="combobox" aria-expanded={open && matches.length > 0} aria-autocomplete="list"
        className="careers-field"
      />
      {open && matches.length > 0 && (
        <div role="listbox" style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20, marginTop: 2, background: "#fff", border: `1px solid ${HAIR}`, boxShadow: "0 12px 28px rgba(11,42,58,.14)", maxHeight: 240, overflowY: "auto" }}>
          {matches.map((c, i) => (
            <div
              key={c} role="option" aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); choose(c); }}
              onMouseEnter={() => setActive(i)}
              style={{ padding: "11px 14px", cursor: "pointer", font: `400 15px/1.3 ${SANS}`, color: INK, background: i === active ? "#EAF6FB" : "#fff", borderBottom: i < matches.length - 1 ? `1px solid ${HAIR}` : "none" }}
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </label>
  );
}

export default function Careers() {
  const [file, setFile] = useState<File | null>(null);
  const [fileErr, setFileErr] = useState("");
  const [consent, setConsent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(submitApplication, { success: false });
  const err = (k: string) => state.errors?.[k]?.[0];
  const hasOpenings = OPENINGS.length > 0;

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const okType = /\.(pdf|docx)$/i.test(f.name);
    const okSize = f.size <= 5 * 1024 * 1024;
    if (!okType || !okSize) {
      setFile(null);
      setFileErr("PDF or DOCX only, up to 5 MB.");
      return;
    }
    setFileErr("");
    setFile(f);
  };

  const btn = (bg: string, color: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", height: 48, padding: "0 30px", border: 0, background: bg, color,
    font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", cursor: "pointer",
    transition: `background 200ms ${EASE},color 200ms ${EASE}`,
  });

  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      {/* HERO */}
      <section style={{ position: "relative", width: "100%", minHeight: "clamp(560px,64vw,720px)", display: "flex", alignItems: "flex-end", overflow: "hidden", background: NAVY }}>
        <Image src="/assets/careers-hero.jpg" alt="The MQS Technologies engineering team in the Hyderabad office" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ pointerEvents: "none", background: "linear-gradient(90deg,rgba(11,42,58,.90) 0%,rgba(11,42,58,.74) 42%,rgba(11,42,58,.24) 100%)" }} />
        <div className="relative mx-auto w-full" style={{ maxWidth: 1330, padding: "clamp(96px,10vw,150px) clamp(24px,4vw,55px) clamp(48px,6vw,88px)" }}>
          <div className="flex flex-col" style={{ maxWidth: 760, gap: "clamp(16px,2vw,22px)" }}>
            <h1 style={{ margin: 0, font: `600 clamp(34px,5.4vw,64px)/1.02 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>Join the Team Behind High-Trust Inspection.</h1>
            <p style={{ margin: 0, maxWidth: 600, font: `400 clamp(17px,1.6vw,21px)/1.5 ${SANS}`, color: "rgba(255,255,255,.86)" }}>Build inspection systems that protect quality, safety and performance.</p>
            <p style={{ margin: 0, maxWidth: 640, font: `400 15px/1.6 ${SANS}`, color: "rgba(255,255,255,.68)" }}>At MQS Technologies we build advanced X-ray, CT, NDT, ATE and inspection solutions for mission-critical industries. If you are driven by engineering challenges, hands-on problem solving, and building products that matter, you will feel at home here.</p>
            <div className="flex flex-wrap items-center" style={{ gap: 16, marginTop: 8 }}>
              <a href="#apply" style={btn(CYAN, "#08283A")} className="hover:!bg-white hover:!text-[#0B2A3A]">Submit Your Resume</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MQS */}
      <section style={{ background: "#fff", borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(64px,9vw,140px) clamp(24px,4vw,55px)", gap: "clamp(24px,3vw,36px)" }}>
          <div style={eyebrow(CYAN_L)}>Why MQS</div>
          <h2 style={{ margin: 0, font: `600 clamp(30px,4.6vw,56px)/1.06 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>Your Work Ships. And Then It Flies.</h2>
          <p style={{ margin: 0, maxWidth: 720, font: `400 clamp(16px,1.5vw,19px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>The systems built here inspect rocket motors, aircraft structures, brake components and battery cells. When an engineer at MQS solves a problem, the result leaves the building, gets installed on a customer floor, and is used to decide whether a safety-critical part is fit to ship. That is a short feedback loop for an engineering job — shorter than most, and it is the reason people stay.</p>
        </div>
      </section>

      {/* LIFE AT MQS */}
      <section style={{ background: PAGE }}>
        <div className="mx-auto relative" style={{ width: "100%", maxWidth: 1440, aspectRatio: "3/2", maxHeight: 640 }}>
          <Image src="/assets/careers-life.jpg" alt="Engineers at work in the MQS Technologies office" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(28px,3vw,44px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div style={eyebrow(CYAN_L)}>Life at MQS</div>
            <h2 style={h2(INK)}>An Engineering-First Team.</h2>
            <p style={{ margin: "6px 0 0", maxWidth: 720, font: `400 clamp(16px,1.5vw,19px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>{LIFE_INTRO}</p>
          </div>
          <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIR}` }}>
            {LIFE.map(([title, desc], i) => (
              <div key={i} className="grid" style={{ gridTemplateColumns: "64px 1fr", gap: "clamp(16px,3vw,32px)", padding: "clamp(20px,2.4vw,30px) 0", borderBottom: `1px solid ${HAIR}` }}>
                <div style={{ font: `500 13px/1.2 ${SANS}`, letterSpacing: ".045em", color: CYAN_L }}>{String(i + 1).padStart(2, "0")}</div>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  <div style={{ font: `600 clamp(17px,1.5vw,20px)/1.3 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{title}</div>
                  <p style={{ margin: 0, font: `400 15px/1.55 ${SANS}`, color: BODY, textWrap: "pretty" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(28px,3vw,44px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div style={eyebrow(CYAN_D)}>Culture &amp; values</div>
            <h2 style={h2("#fff")}>What We Value.</h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 1, background: "rgba(255,255,255,.14)" }}>
            {VALUES.map(([t, d]) => (
              <div key={t} className="flex flex-col" style={{ background: NAVY, padding: "clamp(22px,2.4vw,30px)", gap: 10 }}>
                <h3 style={{ margin: 0, font: `600 19px/1.2 ${SANS}`, letterSpacing: "-.025em", color: "#fff" }}>{t}</h3>
                <p style={{ margin: 0, font: `400 15px/1.55 ${SANS}`, color: "rgba(255,255,255,.72)" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section style={{ background: "#fff", borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(28px,3vw,40px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div style={eyebrow(CYAN_L)}>Teams we hire into</div>
            <h2 style={h2(INK)}>Where You Might Fit.</h2>
          </div>

          {hasOpenings ? (
            <div className="flex flex-col" style={{ border: `1px solid ${HAIR}` }}>
              <div className="flex items-center justify-between" style={{ gap: 16, padding: "16px clamp(18px,2vw,24px)", background: PAGE, borderBottom: `1px solid ${HAIR}`, font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase", color: INK }}>
                <span>Current openings</span>
              </div>
              {OPENINGS.map((o) => (
                <a key={o.title} href="#apply" className="grid hover:!bg-[#F4F8FA]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: "6px 20px", alignItems: "baseline", padding: "clamp(16px,2vw,20px) clamp(18px,2vw,24px)", borderBottom: `1px solid ${HAIR}`, color: INK, transition: `background 200ms ${EASE}` }}>
                  <span style={{ font: `600 17px/1.3 ${SANS}`, letterSpacing: "-.025em" }}>{o.title}</span>
                  <span style={{ font: `400 14px/1.5 ${SANS}`, color: BODY }}>{o.team}</span>
                  <span style={{ font: `500 11px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_L }}>{o.meta}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col" style={{ border: `1px solid ${HAIR}`, borderTop: `2px solid ${CYAN}`, padding: "clamp(24px,3vw,34px)", background: PAGE, gap: 12 }}>
              <div style={eyebrow(CYAN_L)}>Current openings</div>
              <p style={{ margin: 0, maxWidth: 560, font: `400 clamp(16px,1.4vw,18px)/1.55 ${SANS}`, color: INK }}>No positions are posted right now. We still read every resume — join the talent pool and we will contact you when a role opens in your discipline.</p>
              <a href="#apply" className="hover:!bg-[#0B2A3A] hover:!text-white" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", height: 44, marginTop: 6, padding: "0 22px", border: `1px solid ${INK}`, color: INK, font: `500 12px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", transition: `background 200ms ${EASE},color 200ms ${EASE}` }}>Join the talent pool</a>
            </div>
          )}

          <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIR}` }}>
            {TEAMS.map(([name, desc]) => (
              <div key={name} className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: "4px 32px", padding: "clamp(18px,2vw,26px) 0", borderBottom: `1px solid ${HAIR}` }}>
                <div style={{ font: `600 18px/1.25 ${SANS}`, letterSpacing: "-.025em", color: INK }}>{name}</div>
                <p style={{ margin: 0, font: `400 15px/1.55 ${SANS}`, color: BODY }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING */}
      <section style={{ background: PAGE, borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(28px,3vw,44px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div style={eyebrow(CYAN_L)}>How hiring works</div>
            <h2 style={h2(INK)}>Four Steps, No Surprises.</h2>
          </div>
          <div className="flex flex-col">
            {STEPS.map(([t, d], i) => (
              <div key={t} className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "8px 40px", padding: "clamp(22px,2.6vw,32px) 0", borderTop: `1px solid ${HAIR}`, borderBottom: i === STEPS.length - 1 ? `1px solid ${HAIR}` : undefined }}>
                <div className="flex items-baseline" style={{ gap: 16 }}>
                  <span style={{ font: `600 clamp(30px,3.4vw,42px)/1 ${SANS}`, letterSpacing: "-.025em", color: CYAN }}>{i + 1}</span>
                  <h3 style={{ margin: 0, font: `600 20px/1.2 ${SANS}`, letterSpacing: "-.025em", color: INK }}>{t}</h3>
                </div>
                <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: BODY }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" style={{ background: "#fff" }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(32px,4vw,52px)" }}>
          <div className="flex flex-col" style={{ gap: 18, maxWidth: 680 }}>
            <div style={eyebrow(CYAN_L)}>Apply</div>
            <h2 style={h2(INK)}>Join Our Talent Pool.</h2>
            <p style={{ margin: 0, font: `400 clamp(16px,1.4vw,18px)/1.6 ${SANS}`, color: BODY }}>Join MQS and work on engineering solutions that support automotive, aerospace and defence, electronics and advanced manufacturing. Share your resume and our team will reach out when something relevant opens.</p>
          </div>

          <form action={formAction} encType="multipart/form-data" noValidate className="flex flex-col" style={{ gap: "clamp(28px,3vw,40px)", borderTop: `2px solid ${CYAN}`, paddingTop: "clamp(28px,3vw,40px)" }}>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(24px,3vw,36px)" }}>
              <TextField label="Full name" name="fullname" placeholder="Priya Raghavan" required />
              <TextField label="Email" name="email" type="email" placeholder="you@company.com" required />
              <TextField label="Phone" name="phone" type="tel" placeholder="+91" required />
              <LocationField />
              <SelectField label="Department" name="department" placeholder="Select a department" options={DEPARTMENTS} required />
              <SelectField label="Total experience" name="experience" placeholder="Select a range" options={EXPERIENCE} />
              <TextField label="Current company" name="company" placeholder="Employer" />
              <TextField label="LinkedIn" name="linkedin" type="url" placeholder="linkedin.com/in/…" />
            </div>

            <label className="flex flex-col gap-2">
              {fieldLabel("Message")}
              <textarea name="message" rows={4} placeholder="What have you built, and what would you like to work on here?" className="careers-field careers-field--area" />
            </label>

            {/* Resume upload */}
            <div className="flex flex-col" style={{ gap: 12 }}>
              {fieldLabel("Resume", true)}
              <div className="flex flex-wrap items-center" style={{ gap: 16, padding: "clamp(16px,2vw,20px)", border: `1px solid ${file ? INK : fileErr ? ERROR : HAIR}`, background: PAGE }}>
                <button type="button" onClick={() => fileRef.current?.click()} className="hover:!bg-[#0B2A3A] hover:!text-white" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", border: `1px solid ${INK}`, background: "transparent", color: INK, font: `500 12px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", cursor: "pointer", transition: `background 200ms ${EASE},color 200ms ${EASE}` }}>
                  {file ? "Replace file" : "Choose file"}
                </button>
                <input ref={fileRef} name="resume" type="file" accept=".pdf,.docx" onChange={onFile} style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
                {file ? (
                  <div className="flex items-center" style={{ gap: 12, font: `400 14px/1.4 ${SANS}`, color: INK }}>
                    <span>{file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB</span>
                    <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }} style={{ border: 0, background: "transparent", font: `500 11px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_L, cursor: "pointer" }}>Remove</button>
                  </div>
                ) : (
                  <div style={{ font: `400 14px/1.5 ${SANS}`, color: MUTED }}>PDF or DOCX, up to 5 MB</div>
                )}
              </div>
              {(fileErr || err("resume")) && <div className="flex items-center" style={{ gap: 8, font: `400 13px/1.4 ${SANS}`, color: ERROR }}><span style={{ width: 6, height: 6, background: ERROR }} />{fileErr || err("resume")}</div>}
            </div>

            {/* Consent + DPDP privacy notice */}
            <div className="flex flex-col" style={{ gap: 12 }}>
              <label className="flex items-start" style={{ gap: 14, cursor: "pointer" }}>
                <span className="flex flex-none items-center justify-center" style={{ width: 22, height: 22, marginTop: 2, border: `1px solid ${consent ? CYAN_L : INK}`, background: consent ? CYAN_L : "#fff", transition: `background 150ms ${EASE},border-color 150ms ${EASE}` }}>
                  {consent && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="square"><path d="M4 12l5 5L20 6" /></svg>}
                </span>
                <input type="checkbox" name="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} />
                <span style={{ font: `400 14px/1.55 ${SANS}`, color: BODY, maxWidth: 640 }}>
                  I agree to be contacted by MQS Technologies regarding relevant opportunities. <span style={{ color: CYAN_L }}>*</span>
                </span>
              </label>
              <p style={{ margin: 0, paddingLeft: 36, maxWidth: 660, font: `400 13px/1.6 ${SANS}`, color: MUTED }}>
                We collect the details and resume you submit only to assess your application, keep them for 12 months, and delete them after that. You can ask us to delete your data at any time by emailing <a href="mailto:sales@mqstechnologies.in" style={{ color: CYAN_L }}>sales@mqstechnologies.in</a>. Full details are in our privacy policy.
              </p>
              {err("consent") && <div className="flex items-center" style={{ gap: 8, paddingLeft: 36, font: `400 13px/1.4 ${SANS}`, color: ERROR }}><span style={{ width: 6, height: 6, background: ERROR }} />{err("consent")}</div>}
            </div>

            <div className="flex flex-col" style={{ gap: 16 }}>
              <div className="flex flex-wrap items-center" style={{ gap: 20 }}>
                <button type="submit" disabled={pending} style={{ ...btn(CYAN, "#08283A"), opacity: pending ? 0.6 : 1, cursor: pending ? "default" : "pointer" }} className="hover:!bg-[#0B2A3A] hover:!text-white">
                  {pending ? "Submitting…" : "Submit Resume"}
                </button>
                {Object.keys(state.errors ?? {}).length > 0 && (
                  <span style={{ font: `400 14px/1.5 ${SANS}`, color: ERROR }}>Please check the highlighted fields.</span>
                )}
              </div>
              {state.message && (
                <div className="flex items-start" style={{ gap: 12, padding: "16px 18px", border: `1px solid ${state.success ? CYAN_L : ERROR}`, background: state.success ? "#EAF6FB" : "#FBEEEC", maxWidth: 660 }}>
                  <span className="flex-none" style={{ width: 8, height: 8, marginTop: 7, background: state.success ? CYAN_L : ERROR }} />
                  <p style={{ margin: 0, font: `400 15px/1.55 ${SANS}`, color: state.success ? INK : ERROR }}>{state.message}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

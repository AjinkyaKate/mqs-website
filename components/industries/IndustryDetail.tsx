/* ──────────────────────────────────────────────────────────────
   Industry detail page — reusable template driven by IndustryData.
   Hero → overview + defects → what we inspect → [confidentiality] →
   systems → [platforms] → compliance → CTA. Aerospace omits the hero
   radiograph (system-only, per NDA). Palette 2B + site font. Static.
   ────────────────────────────────────────────────────────────── */

import type { IndustryData } from "./industries-data";

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", PAGE = "#F4F8FA", NAVY = "#0E3A52";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88", CYAN_D = "#5AD1F7";
const SANS = "var(--font-sans)";

const eyebrow = (color: string) => ({ font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color });
const h2 = (color: string) => ({ margin: 0, font: `600 clamp(26px,3.4vw,42px)/1.08 ${SANS}`, letterSpacing: "-.025em", color });
const chip = { padding: "7px 12px", background: "#fff", border: `1px solid ${HAIR}`, font: `500 12px/1.2 ${SANS}`, color: INK };

const btn = (bg: string, color: string, border?: string): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: bg, color, border: border ?? "0",
  font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", transition: `background 200ms ${EASE},color 200ms ${EASE}`,
});

export default function IndustryDetail({ data }: { data: IndustryData }) {
  const d = data;
  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: NAVY, minHeight: "clamp(440px,50vw,580px)", display: "flex", alignItems: "flex-end" }}>
        {d.heroImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "grayscale(1)", opacity: 0.24 }} />
            <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 85% 15%, rgba(22,193,243,.12) 0%, rgba(14,58,82,0) 55%)" }} />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.92) 0%,rgba(11,42,58,.78) 48%,rgba(11,42,58,.5) 100%)" }} />
        <div className="relative mx-auto w-full" style={{ maxWidth: 1330, padding: "clamp(96px,10vw,150px) clamp(24px,4vw,55px) clamp(44px,5vw,72px)" }}>
          <div className="flex flex-col" style={{ maxWidth: 820, gap: "clamp(14px,1.8vw,20px)" }}>
            <a href="/industries" style={{ ...eyebrow(CYAN_D), width: "fit-content" }} className="hover:!text-white">← Industries</a>
            <h1 style={{ margin: 0, font: `600 clamp(32px,4.8vw,56px)/1.05 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>{d.name}</h1>
            <p style={{ margin: 0, maxWidth: 640, font: `500 clamp(17px,1.6vw,21px)/1.45 ${SANS}`, color: CYAN_D }}>{d.headline}</p>
            <p style={{ margin: 0, maxWidth: 680, font: `400 clamp(15px,1.4vw,18px)/1.6 ${SANS}`, color: "rgba(255,255,255,.82)", textWrap: "pretty" }}>{d.intro[0]}</p>
            <div className="flex flex-wrap" style={{ gap: 12, marginTop: 8 }}>
              <a href="#contact" style={btn(CYAN, "#08283A")} className="hover:!bg-white hover:!text-[#0B2A3A]">Talk to an Expert</a>
              <a href="#systems" style={btn("rgba(255,255,255,.1)", "#fff", "1px solid rgba(255,255,255,.28)")} className="hover:!bg-white/20">See the systems</a>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW + DEFECTS */}
      <section style={{ background: "#fff", borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto grid items-start" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,120px) clamp(24px,4vw,55px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(420px,100%),1fr))", gap: "clamp(32px,5vw,72px)" }}>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <div style={eyebrow(CYAN_L)}>Overview</div>
            <p style={{ margin: 0, font: `400 clamp(16px,1.5vw,19px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>{d.intro[1]}</p>
          </div>
          <div className="flex flex-col" style={{ gap: 16 }}>
            <div style={eyebrow(MUTED)}>Defects we catch</div>
            <div className="flex flex-wrap" style={{ gap: 8 }}>
              {d.defects.map((x) => <span key={x} style={chip}>{x}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE INSPECT */}
      <section style={{ background: PAGE }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(28px,3vw,44px)" }}>
          <div className="flex flex-col" style={{ gap: 16 }}>
            <div style={eyebrow(CYAN_L)}>Applications</div>
            <h2 style={h2(INK)}>{d.partsHeading}</h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(16px,1.6vw,24px)" }}>
            {d.parts.map((p) => (
              <div key={p.title} className="flex flex-col" style={{ background: "#fff", border: `1px solid ${HAIR}`, borderTop: `2px solid ${CYAN}`, padding: "clamp(20px,2vw,26px)", gap: 10 }}>
                <h3 style={{ margin: 0, font: `600 18px/1.25 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{p.title}</h3>
                <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIDENTIALITY (aerospace) */}
      {d.confidential && (
        <section style={{ background: "#fff", borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto" style={{ maxWidth: 1000, padding: "clamp(40px,5vw,72px) clamp(24px,4vw,55px)" }}>
            <div style={{ borderLeft: `2px solid ${CYAN}`, padding: "6px 0 6px clamp(20px,2.5vw,28px)" }}>
              <div style={{ ...eyebrow(CYAN_L), marginBottom: 10 }}>Confidentiality</div>
              <p style={{ margin: 0, font: `400 clamp(16px,1.5vw,19px)/1.6 ${SANS}`, color: INK, textWrap: "pretty" }}>{d.confidential}</p>
            </div>
          </div>
        </section>
      )}

      {/* SYSTEMS */}
      <section id="systems" style={{ background: PAGE }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(28px,3vw,44px)" }}>
          <div className="flex flex-col" style={{ gap: 16 }}>
            <div style={eyebrow(CYAN_L)}>Systems used</div>
            <h2 style={h2(INK)}>Configured for {d.name}.</h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(16px,1.6vw,24px)" }}>
            {d.systems.map((s) => (
              <a key={s.name} href={s.href} className="group flex flex-col hover:!border-[#0A6A88]" style={{ background: "#fff", border: `1px solid ${HAIR}`, padding: "clamp(20px,2vw,26px)", gap: 12, color: INK, transition: `border-color 200ms ${EASE}` }}>
                <h3 className="transition-colors duration-200 group-hover:!text-[#0A6A88]" style={{ margin: 0, font: `600 19px/1.2 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{s.name}</h3>
                <p style={{ margin: 0, flex: 1, font: `400 15px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>{s.desc}</p>
                <span className="flex items-center transition-colors duration-200 group-hover:!text-[#16C1F3]" style={{ gap: 10, font: `500 12px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_L }}>
                  View system<span style={{ width: 18, height: 1, background: "currentColor" }} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS (aerospace) */}
      {d.extra && (
        <section style={{ background: "#fff", borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(48px,6vw,88px) clamp(24px,4vw,55px)", gap: "clamp(24px,3vw,36px)" }}>
            <div className="flex flex-wrap items-baseline justify-between" style={{ gap: 16 }}>
              <h2 style={{ margin: 0, font: `600 clamp(22px,2.5vw,32px)/1.12 ${SANS}`, letterSpacing: "-.025em", color: INK }}>{d.extra.heading}</h2>
              <p style={{ margin: 0, maxWidth: 420, font: `400 14px/1.6 ${SANS}`, color: MUTED }}>{d.extra.blurb}</p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(200px,100%),1fr))", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
              {d.extra.items.map((it) => (
                <div key={it} className="flex items-center" style={{ background: "#fff", minHeight: 84, padding: "clamp(18px,2vw,24px)", font: `600 16px/1.3 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{it}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPLIANCE */}
      <section style={{ background: NAVY, color: "#fff" }}>
        <div className="mx-auto grid items-start" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(380px,100%),1fr))", gap: "clamp(32px,5vw,72px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div style={eyebrow(CYAN_D)}>Compliance &amp; standards</div>
            <h2 style={{ margin: 0, font: `600 clamp(26px,3.2vw,40px)/1.08 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>Built to Pass the Audit.</h2>
          </div>
          <ul className="m-0 list-none p-0 flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,.14)" }}>
            {d.standards.map((c) => (
              <li key={c} className="grid" style={{ gridTemplateColumns: "auto 1fr", gap: 16, padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,.14)" }}>
                <span style={{ width: 6, height: 6, marginTop: 9, background: CYAN }} />
                <span style={{ font: `400 clamp(15px,1.4vw,17px)/1.6 ${SANS}`, color: "rgba(255,255,255,.86)" }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col items-center text-center" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,120px) clamp(24px,4vw,55px)", gap: 22 }}>
          <h2 style={{ margin: 0, maxWidth: 720, font: `600 clamp(26px,3.6vw,44px)/1.08 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>Bring us a part from your line.</h2>
          <p style={{ margin: 0, maxWidth: 600, font: `400 clamp(16px,1.5vw,19px)/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>Send the part size, material, thickness and the defect you are chasing. Our application engineers will recommend the right {d.name} configuration — and scan a sample so you can see it.</p>
          <div className="flex flex-wrap justify-center" style={{ gap: 14, marginTop: 6 }}>
            <a href="#contact" style={btn(CYAN, "#08283A")} className="hover:!bg-[#0B2A3A] hover:!text-white">Talk to an Expert</a>
            <a href="#contact" style={btn("transparent", INK, `1px solid ${INK}`)} className="hover:!bg-[#0B2A3A] hover:!text-white">Request a Demo</a>
          </div>
        </div>
      </section>
    </main>
  );
}

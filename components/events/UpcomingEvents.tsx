"use client";

import { useState } from "react";

const EVENTS = [
  {
    dates: "16–18 Sept 2026",
    event: "Productronica India 2026",
    city: "BIEC, Bengaluru",
    showing: "MQX.tracE 2D and 3D CT, and MQX.gINTi reel counting",
  },
  {
    dates: "15–17 Nov 2026",
    event: "ISNT 2026",
    city: "Hyderabad",
    showing: "The full MQS NDT portfolio, presented on home ground",
  },
  {
    dates: "30 Nov–2 Dec 2026",
    event: "Tube India 2026",
    city: "Mumbai",
    showing: "Pipe and tube inspection, including weld-integrity solutions",
  },
  {
    dates: "10–12 Dec 2026",
    event: "ALUCAST 2026",
    city: "Yashobhoomi, New Delhi",
    showing: "MQX.PRISM, MQWR 160U wheel inspection and ADR software",
  },
];

const VISIBLE_LIMIT = 4;
const CYAN = "#16C1F3";
const INK = "#09283A";
const MUTED = "#536B78";
const HAIRLINE = "#D8E4E9";

export default function UpcomingEvents() {
  const [expanded, setExpanded] = useState(false);
  const visibleEvents = expanded ? EVENTS : EVENTS.slice(0, VISIBLE_LIMIT);
  const hasMore = EVENTS.length > VISIBLE_LIMIT;

  return (
    <section id="events" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-24 lg:px-[55px] lg:py-[120px]" style={{ background: "#F4F8FA" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 9% 12%, rgba(22,193,243,.11), transparent 28%), radial-gradient(circle at 94% 88%, rgba(10,106,136,.08), transparent 30%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[42%] hidden w-px lg:block" style={{ background: "linear-gradient(180deg, transparent, rgba(9,40,58,.12) 18%, rgba(9,40,58,.12) 82%, transparent)" }} />

      <div className="relative z-[1] grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-0.5 w-8" style={{ background: CYAN, boxShadow: "0 0 16px rgba(22,193,243,.45)" }} />
            <div className="t-eyebrow" style={{ color: CYAN }}>Upcoming events</div>
          </div>
          <h2 className="t-h2 m-0 max-w-[650px]" style={{ color: INK }}>
            Meet MQS at the next <span style={{ color: "#087FA4" }}>industry exhibition</span>.
          </h2>
          <p className="t-body m-0 max-w-[560px]" style={{ color: MUTED }}>
            Can’t make it to a show? We can bring a demonstration to you, or scan a sample part and send you the results.
          </p>
          <div className="t-caption inline-flex items-center gap-2 border bg-white px-3 py-2" style={{ color: INK, borderColor: HAIRLINE }}>
            <span aria-hidden="true" className="h-2 w-2" style={{ background: CYAN }} />
            2026 exhibition calendar
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <a href="/contact" className="t-button inline-flex h-12 items-center px-6 no-underline transition-colors hover:bg-[#0FA5D2]" style={{ background: CYAN, color: "#08283A" }}>
              Book a meeting
              <span aria-hidden="true" className="ml-3">→</span>
            </a>
            <a href="/products" className="t-button inline-flex h-12 items-center border bg-white px-6 no-underline transition-colors hover:bg-[#E8F1F4]" style={{ color: INK, borderColor: "#BFCFD6" }}>
              See our products
              <span aria-hidden="true" className="ml-3">→</span>
            </a>
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="t-caption" style={{ color: CYAN }}>Confirmed schedule</div>
              <p className="t-body m-0 mt-1" style={{ color: MUTED }}>Four opportunities to see MQS systems up close.</p>
            </div>
            <div className="t-caption whitespace-nowrap" style={{ color: "#71848E" }}>04 events</div>
          </div>

          <div className="flex flex-col gap-4">
            {visibleEvents.map((item, index) => (
              <article key={item.event} className="group relative grid overflow-hidden border bg-white shadow-[0_8px_28px_rgba(9,40,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#AFCBD6] hover:shadow-[0_14px_36px_rgba(9,40,58,0.10)] sm:grid-cols-[150px_1fr]" style={{ borderColor: HAIRLINE }}>
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100" style={{ background: CYAN }} />
                <div className="flex flex-row items-center justify-between gap-5 border-b px-5 py-5 sm:flex-col sm:items-start sm:justify-center sm:border-b-0 sm:border-r sm:px-6" style={{ borderColor: HAIRLINE }}>
                  <span className="t-caption" style={{ color: index === 0 ? "#087FA4" : "#8798A1" }}>0{index + 1}</span>
                  <p className="t-body m-0 font-semibold" style={{ color: INK }}>{item.dates}</p>
                </div>
                <div className="flex flex-col gap-4 px-5 py-6 sm:px-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="t-h4 m-0" style={{ color: INK }}>{item.event}</h3>
                    <span className="t-caption border px-3 py-1.5" style={{ color: "#425D6A", borderColor: HAIRLINE, background: "#F5F9FA" }}>{item.city}</span>
                  </div>
                  <div>
                    <div className="t-caption mb-1.5" style={{ color: "#087FA4" }}>On display</div>
                    <p className="t-body m-0" style={{ color: MUTED }}>{item.showing}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <button type="button" onClick={() => setExpanded((value) => !value)} className="t-button mt-7 text-left" style={{ color: CYAN }} aria-expanded={expanded}>
              {expanded ? "Show fewer events" : "View all events"}
            </button>
          )}
          <p className="t-caption m-0 mt-7" style={{ color: "#71848E" }}>Confirmed MQS participation · All dates 2026</p>
        </div>
      </div>
    </section>
  );
}

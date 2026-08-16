"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CTAButton from "./CTAButton";
import { ArrowRight, ChevronDown } from "./icons";
import { linkFor } from "@/components/nav/nav-links";

const EASE = "cubic-bezier(0.22,0.61,0.36,1)";
const EASE_ARR = [0.22, 0.61, 0.36, 1] as const;
const CYAN = "#16C1F3";
const RULE = "1px solid rgba(255,255,255,.14)";
// Desktop inset geometry (%). Grid rules derive from this so they always frame the image.
const INSET_TOP = 26.67;
const INSET_LEFT = 55.97;
const INSET_W = 27.78;
const INSET_H = 66.67;
const INSET_RIGHT = INSET_LEFT + INSET_W; // 83.75
const INSET_BOTTOM = INSET_TOP + INSET_H; // 83.56
// Inset is aspect-locked to the image (1336×2000). Its real bottom edge, in a
// 100vh section, is: top(vh) + width(vw) / aspect. Line + specs anchor to this
// so the line hugs the image and the spec sits just below it at any viewport.
const IMG_H_VW = INSET_W * (2000 / 1336); // full-aspect image height, in vw
// Cap the height so wide/short desktop windows can't push the image (and the
// spec below it) past 100vh, where the section's overflow:hidden would clip it.
const IMG_H = `min(${IMG_H_VW.toFixed(3)}vw, 82vh)`;
const IMG_BOTTOM = `calc(${INSET_TOP}vh + ${IMG_H})`;
const SMALL_HEADER_GRADIENT =
  "linear-gradient(180deg, rgba(11,42,58,.90) 0%, rgba(11,42,58,.62) 60%, rgba(11,42,58,.28) 100%)";
const SCRIM_DESKTOP =
  "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.46) 46%, rgba(0,0,0,.20) 100%)";
const SCRIM_SMALL =
  "linear-gradient(180deg, rgba(0,0,0,.34) 0%, rgba(0,0,0,.60) 46%, rgba(0,0,0,.84) 100%)";

type NavItem = { name: string; children?: string[]; mega?: boolean };

const NAV: NavItem[] = [
  { name: "About" },
  { name: "Products", children: ["Digital Radiography", "Industrial CT", "Microfocus X-ray", "High-Energy X-ray", "PCB X-ray", "ATE Systems"] },
  { name: "Industries", children: ["Aerospace & Defence", "Automotive", "Electronics", "Energy"] },
  { name: "Services", children: ["CT Inspection Services", "Industrial Electronics", "Precision Sub-Assemblies", "Preventive Maintenance", "Repair & Support"] },
  { name: "All pages", mega: true, children: ["Company", "Products", "Industries", "Resources"] },
];

// Mobile/tablet menu with expandable submenus.
type MobileItem = { name: string; href?: string; children?: string[] };
const MOBILE_MENU: MobileItem[] = [
  { name: "About", href: "#about" },
  { name: "Products", children: ["Digital Radiography", "Industrial CT", "Microfocus X-ray", "High-Energy X-ray", "PCB X-ray", "ATE Systems"] },
  { name: "Industries", children: ["Aerospace & Defence", "Automotive", "Electronics", "Energy"] },
  { name: "Services", children: ["CT Inspection Services", "Industrial Electronics", "Precision Sub-Assemblies", "Preventive Maintenance", "Repair & Support"] },
  { name: "Careers", href: "#careers" },
  { name: "Contact", href: "#contact" },
];

const MEGA: [string, string[]][] = [
  ["Company", ["About", "Leadership", "Clients", "Careers"]],
  ["Products", ["Digital Radiography", "Industrial CT", "Microfocus X-ray", "High-Energy X-ray", "PCB X-ray", "ATE Systems"]],
  ["Services", ["CT Inspection Services", "Industrial Electronics", "Precision Sub-Assemblies", "Preventive Maintenance", "Repair & Support"]],
  ["Resources", ["Case Studies", "News", "Industries", "Downloads", "FAQ"]],
];

const SPECS = [
  { label: "Voltage range", value: "160–225 kV" },
  { label: "Modality", value: "DR & CT" },
  { label: "Certification", value: "AERB type-approved" },
];

const LABEL: CSSProperties = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase" };
const rise = (d: number): CSSProperties => ({ animation: `mqsRise 420ms ${EASE} both`, animationDelay: `${d}ms` });

export default function Hero() {
  const [w, setW] = useState(1440);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false); // true while panel is open or animating closed
  const [expanded, setExpanded] = useState<string | null>(null);
  const [menuLeft, setMenuLeft] = useState<number | null>(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activatedRef = useRef(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onResize = () => {
      setW(window.innerWidth || 1440);
      setOpenMenu(null);
      setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (headerRef.current?.contains(t)) return;
      if ((t as Element)?.closest?.("[data-mqs-panel]")) return;
      setOpenMenu(null);
    };
    setW(window.innerWidth || 1440);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  // Scroll-aware header: white bar on scroll-up, hidden on scroll-down.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 10) {
        setHeaderHidden(false);
        setHeaderSolid(activatedRef.current);
      } else if (y < lastY) {
        setHeaderSolid(true);
        setHeaderHidden(false);
      } else if (y > lastY) {
        setHeaderHidden(true);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) setExpanded(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const on = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reducedMotion) return;
    v.muted = true;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    const onTouch = () => tryPlay();
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });
    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [reducedMotion]);

  const isDesktop = w >= 1024;
  const isTablet = w >= 768 && w < 1024;
  const isPhone = w < 768;
  const isSmall = !isDesktop;
  const gut = isDesktop ? 55 : isTablet ? 40 : 24;
  const navH = isDesktop ? 76 : isTablet ? 72 : 60;
  const ctaW = isDesktop ? 234 : isTablet ? 190 : 128;
  const logoH = isDesktop ? 58 : isTablet ? 46 : 34;

  const openItem = NAV.find((n) => n.name === openMenu) || null;
  const megaOpen = !!(openItem && openItem.mega && isDesktop);
  const dropdownOpen = !!(openItem && !openItem.mega && openItem.children && isDesktop);

  // menuActive stays true through the panel's open AND its close animation
  // (menuMounted is cleared on AnimatePresence exit-complete), so the header
  // stays white for the whole interaction instead of snapping back mid-close.
  const menuActive = mobileOpen || menuMounted;
  const inkHeader = headerSolid || menuActive; // dark logo/bars/nav on white
  const headerHide = headerHidden && !menuActive;

  const toggleLeft = (e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLElement;
    const hdr = btn.closest("header");
    if (!hdr) return null;
    return Math.round(btn.getBoundingClientRect().left - hdr.getBoundingClientRect().left);
  };

  // Hover-intent for desktop dropdowns (small delay bridges nav → panel).
  const cancelDropClose = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
  };
  const scheduleDropClose = () => {
    cancelDropClose();
    dropTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  // ── grid rules ────────────────────────────────────────────
  const gridRules: CSSProperties[] = (isDesktop
    ? [
        { left: `${INSET_LEFT}%`, top: 0, bottom: 0, borderLeft: RULE },
        { left: `${INSET_RIGHT}%`, top: 0, bottom: 0, borderLeft: RULE },
        { left: 0, right: 0, top: `${INSET_TOP}vh`, borderTop: RULE },
        { left: 0, right: 0, top: IMG_BOTTOM, borderTop: RULE },
      ]
    : [
        { left: "62%", top: navH, bottom: 0, borderLeft: RULE },
        { left: 0, right: 0, top: navH + (isTablet ? 150 : 96), borderTop: RULE },
        { left: 0, right: 0, bottom: isTablet ? 232 : 168, borderTop: RULE },
      ]
  ).map((s) => ({ position: "absolute", pointerEvents: "none", ...s }));

  // ── specs ─────────────────────────────────────────────────
  const desktopSpecPos = [
    { left: "57.2%", top: `calc(${INSET_TOP}vh - 80px)` },
    { left: "84.9%", top: `calc(${INSET_TOP}vh + ${IMG_H} - 90px)` },
    { left: "57.2%", top: `calc(${INSET_TOP}vh + ${IMG_H} + 16px)` },
  ];
  const shownSpecs = isDesktop ? SPECS : isTablet ? SPECS : SPECS.slice(0, 1);
  const specStyle = (i: number): CSSProperties =>
    isDesktop
      ? { position: "absolute", maxWidth: 280, ...desktopSpecPos[i], ...rise(220 + i * 80) }
      : { maxWidth: 300, ...rise(220 + i * 80) };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        // Grow taller than the viewport when the inset image + the spec below it
        // would otherwise run past 100vh (wide/short desktop windows).
        minHeight: isDesktop ? `max(100vh, calc(${IMG_BOTTOM} + 148px))` : "100vh",
        overflow: "hidden",
        background: "#0B2A3A",
      }}
    >

      {/* 1 — background: still poster + video (steel-navy duotone, matches Industries) */}
      <Image src="/assets/hero-poster.jpg" alt="Precision drive components under inspection" fill priority sizes="100vw" className="object-cover" style={{ filter: "grayscale(1)" }} />
      {!reducedMotion && !videoError && (
        <video
          ref={(el) => {
            videoRef.current = el;
            if (el) {
              // Force the attributes iOS needs for inline muted autoplay.
              el.muted = true;
              el.defaultMuted = true;
              el.setAttribute("muted", "");
              el.setAttribute("playsinline", "");
              el.setAttribute("webkit-playsinline", "");
            }
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero-poster.jpg"
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: videoReady ? 1 : 0, transition: "opacity 600ms ease", filter: "grayscale(1)" }}
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* 1b — steel-navy duotone tint over the background (grayscale above + navy mix-blend-color) */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "#12405C", mixBlendMode: "color" }} />

      {/* 2 — scrim */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: isDesktop ? SCRIM_DESKTOP : SCRIM_SMALL }} />

      {/* 3 — hairline grid */}
      {gridRules.map((s, i) => (
        <div key={i} style={s} />
      ))}

      {/* 4 — inset (desktop) */}
      {isDesktop && (
        <div className="group" style={{ position: "absolute", left: `${INSET_LEFT}%`, top: `${INSET_TOP}vh`, width: `${INSET_W}%`, height: IMG_H, overflow: "hidden", ...rise(160) }}>
          <Image src="/assets/inset-operator.jpg" alt="Technician operating an industrial inspection machine on the production floor" fill sizes="28vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06]" />
        </div>
      )}

      {/* 5 — header (fixed) */}
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 50,
          height: navH,
          display: "flex",
          alignItems: "stretch",
          background: menuActive ? "#F4F8FA" : headerSolid ? "#FFFFFF" : isSmall ? SMALL_HEADER_GRADIENT : "transparent",
          borderBottom: `1px solid ${inkHeader ? "rgba(16,16,16,.08)" : "rgba(255,255,255,.14)"}`,
          transform: headerHide ? "translateY(-100%)" : "translateY(0)",
          transition: `transform 320ms ${EASE}, background 240ms ease, border-color 240ms ease`,
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", paddingLeft: gut, flex: "none" }} aria-label="MQS Technologies">
          <Image
            src={inkHeader ? "/assets/mqs-logo-2a-light.png" : "/assets/mqs-logo-2a-dark.png"}
            alt="MQS Technologies"
            width={124}
            height={60}
            priority
            style={{ height: logoH, width: "auto", display: "block" }}
          />
        </a>

        {isDesktop && (
          <nav style={{ flex: "1 1 auto", minWidth: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "clamp(18px, 2.2vw, 36px)", paddingRight: "clamp(18px, 2.5vw, 36px)" }}>
            {NAV.map((item) => {
              const on = openMenu === item.name;
              const hasKids = !!item.children;
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-haspopup={hasKids}
                  aria-expanded={on}
                  onClick={(e) => {
                    if (!hasKids) return e.preventDefault();
                    setMenuLeft(toggleLeft(e));
                    setOpenMenu((v) => (v === item.name ? null : item.name));
                  }}
                  onMouseEnter={(e) => {
                    if (hasKids) {
                      cancelDropClose();
                      setMenuLeft(toggleLeft(e));
                      setOpenMenu(item.name);
                    } else {
                      scheduleDropClose();
                    }
                  }}
                  onMouseLeave={scheduleDropClose}
                  style={{ ...LABEL, display: "flex", alignItems: "center", gap: 6, fontSize: 15, whiteSpace: "nowrap", color: on ? (inkHeader ? "#0A6A88" : CYAN) : inkHeader ? "#0B2A3A" : "#FFFFFF", transition: `color 200ms ${EASE}`, cursor: "pointer" }}
                >
                  <span>{item.name}</span>
                  {hasKids && (
                    <span style={{ display: "inline-flex", transform: on ? "rotate(180deg)" : "rotate(0deg)", transition: `transform 200ms ${EASE}` }}>
                      <ChevronDown size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {isSmall && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 18 }}>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setOpenMenu(null);
                if (!mobileOpen) {
                  activatedRef.current = true;
                  setHeaderSolid(true);
                  setMenuMounted(true);
                }
                setMobileOpen((v) => !v);
              }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}
            >
              {(() => {
                const bg = mobileOpen || inkHeader ? "#0B2A3A" : "#FFFFFF";
                const t: CSSProperties = { position: "absolute", left: 0, height: 2, background: bg, transition: `transform 200ms ${EASE}, opacity 150ms ${EASE}, background 200ms ${EASE}` };
                return (
                  <span style={{ position: "relative", display: "block", width: 22, height: 16 }}>
                    <span style={{ ...t, top: 0, width: 22, transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
                    <span style={{ ...t, top: 7, width: 22, opacity: mobileOpen ? 0 : 1 }} />
                    <span style={{ ...t, top: 14, width: mobileOpen ? 22 : 14, transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
                  </span>
                );
              })()}
            </button>
          </div>
        )}

        {isDesktop && (
          <a href="#contact" style={{ ...LABEL, width: ctaW, flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: inkHeader ? "#0E3A52" : CYAN, color: inkHeader ? "#FFFFFF" : "#08283A", fontSize: 15, transition: `background 200ms ${EASE}, color 200ms ${EASE}` }} className={inkHeader ? "hover:!bg-[#0A2B3D]" : "hover:!bg-[#0FA5D2]"}>
            Contact us
          </a>
        )}
      </header>

      {/* 6 — mega panel (desktop) */}
      {megaOpen && (
        <div data-mqs-panel onMouseEnter={cancelDropClose} onMouseLeave={scheduleDropClose} style={{ position: "fixed", top: navH, left: 0, right: 0, zIndex: 40, background: "#FFFFFF", borderBottom: `3px solid #0C87AD`, animation: `mqsPanel 200ms ${EASE} both` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "48px 55px 44px" }}>
            {MEGA.map(([title, links], i) => (
              <div key={title} style={{ padding: "0 32px", borderRight: i < 3 ? "1px solid rgba(16,16,16,.08)" : "none" }}>
                <div style={{ ...LABEL, color: "#6B6B6B", marginBottom: 20 }}>{title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {links.map((l) => (
                    <a key={l} href={linkFor(title, l)} style={{ font: "var(--type-body)", color: "#0B2A3A" }} className="transition-colors duration-200 hover:!text-[#0A6A88]">
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "22px 55px", borderTop: "1px solid rgba(16,16,16,.08)", background: "#F4F8FA" }}>
            <span style={{ ...LABEL, color: "#6B6B6B" }}>Grouped in four families</span>
            <a href="/products" style={{ ...LABEL, display: "flex", alignItems: "center", gap: 10, color: "#0A6A88" }}>
              <span>Explore all systems</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}

      {/* 7 — dropdown (Services / Equipment) */}
      {dropdownOpen && openItem?.children && (
        <div data-mqs-panel onMouseEnter={cancelDropClose} onMouseLeave={scheduleDropClose} style={{ position: "fixed", top: navH, left: menuLeft ?? 600, zIndex: 40, minWidth: 320, background: "#FFFFFF", animation: `mqsPanel 200ms ${EASE} both` }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {openItem.children.map((l) => (
              <a key={l} href={linkFor(openItem.name, l)} style={{ display: "block", padding: "12px 28px", font: "var(--type-body)", color: "#0B2A3A" }} className="transition-colors duration-200 hover:!bg-[#F4F8FA] hover:!text-[#0A6A88]">
                {l}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 8 — mobile / tablet menu: panel BELOW the header, reveals top→bottom, retracts bottom→top */}
      <AnimatePresence onExitComplete={() => setMenuMounted(false)}>
        {mobileOpen && isSmall && (
          <motion.div
            key="mobile-menu"
            data-mqs-panel
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.34, ease: EASE_ARR }}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              top: navH,
              maxHeight: `calc(100vh - ${navH}px)`,
              zIndex: 45,
              background: "#F4F8FA",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              padding: `${isTablet ? 36 : 24}px ${gut}px ${isTablet ? 40 : 30}px`,
            }}
          >
            <nav style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: isTablet ? 6 : 4 }}>
              {MOBILE_MENU.map((item) => {
                const on = expanded === item.name;
                const hasKids = !!item.children;
                const rowPad = isTablet ? 10 : 8;
                const labelStyle: CSSProperties = { ...LABEL, fontSize: isTablet ? 14 : 13, letterSpacing: "0.045em", transition: `color 200ms ${EASE}` };
                return (
                  <div key={item.name}>
                    {hasKids ? (
                      <button
                        type="button"
                        aria-expanded={on}
                        onClick={() => setExpanded((v) => (v === item.name ? null : item.name))}
                        style={{ width: "100%", display: "block", padding: `${rowPad}px 0`, textAlign: "left", background: "none", border: 0, cursor: "pointer" }}
                      >
                        <span style={{ ...labelStyle, color: on ? "#0A6A88" : "#0B2A3A" }}>{item.name}</span>
                      </button>
                    ) : (
                      <a href={item.href || "#"} style={{ display: "block", padding: `${rowPad}px 0`, ...labelStyle, color: "#0B2A3A" }} className="hover:!text-[#0A6A88]">
                        {item.name}
                      </a>
                    )}
                    {hasKids && (
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: EASE_ARR }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ display: "flex", flexDirection: "column", paddingLeft: 16, paddingBottom: 8 }}>
                              {item.children!.map((c) => (
                                <a key={c} href={linkFor(item.name, c)} style={{ display: "block", padding: `${isTablet ? 7 : 5}px 0`, font: "var(--type-body)", fontFamily: "var(--font-sans)", fontSize: isTablet ? 15 : 14, color: "#4A4A4A", transition: `color 200ms ${EASE}` }} className="hover:!text-[#0A6A88]">
                                  {c}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>
            <a
              href="#contact"
              style={{ ...LABEL, flexShrink: 0, marginTop: isTablet ? 40 : 30, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", justifyContent: "center", height: isTablet ? 56 : 50, padding: `0 ${isTablet ? 34 : 28}px`, background: "#0E3A52", color: "#FFFFFF", fontSize: isTablet ? 17 : 16 }}
              className="hover:!bg-[#0A2B3D]"
            >
              Contact us
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9 — content flow */}
      <div
        style={
          isDesktop
            ? { display: "contents" }
            : { position: "relative", zIndex: 5, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: `${navH + (isTablet ? 32 : 56)}px ${gut}px 40px` }
        }
      >
        <div
          style={
            isDesktop
              ? { position: "absolute", left: gut, top: "33.3%", width: "min(700px, calc(55.97vw - 95px))", zIndex: 5 }
              : { position: "relative", zIndex: 5, display: "flex", flexDirection: "column", flex: "1 1 auto", minHeight: 0 }
          }
        >
          <div className="t-eyebrow" style={{ color: "#FFFFFF", ...(isPhone ? { fontSize: 11 } : {}) }}>Precision inspection since 1994</div>
          <h1 className="t-display" style={{ color: "#FFFFFF", textWrap: "balance", margin: isPhone ? "18px 0 0" : "26px 0 0", ...(isDesktop ? { fontSize: 56 } : isPhone ? { fontSize: 40 } : {}), ...rise(60) }}>
            See beyond. Test beyond. Build beyond.
          </h1>
          <p className="t-lead" style={{ margin: "24px 0 0", maxWidth: 520, color: "rgba(255,255,255,.72)", ...rise(140) }}>
            Advanced non-destructive testing, automated inspection and electrical test validation for mission-critical industries.
          </p>
          <div
            style={
              isPhone
                ? { display: "flex", flexDirection: "column", gap: 12, marginTop: 30 }
                : { display: "flex", gap: 16, marginTop: isDesktop ? 48 : 40, flexWrap: "wrap" }
            }
          >
            <CTAButton variant="primary" href="/products" fullWidth={isPhone}>
              Explore solutions
            </CTAButton>
            <CTAButton variant="outline" href="#contact" withArrow fullWidth={isPhone}>
              Request a demo
            </CTAButton>
          </div>

          {isSmall && (
            <div style={{ marginTop: isTablet ? 32 : 28, flex: "1 1 auto", minHeight: isTablet ? 380 : 190, overflow: "hidden", position: "relative" }}>
              <Image src="/assets/inset-operator.jpg" alt="Technician operating an industrial inspection machine on the production floor" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "50% 50%" }} />
            </div>
          )}
        </div>

        <div
          style={
            isDesktop
              ? { display: "contents" }
              : {
                  position: "relative",
                  zIndex: 5,
                  marginTop: isTablet ? 0 : "auto",
                  paddingTop: isTablet ? 26 : 48,
                  display: "grid",
                  gridTemplateColumns: isTablet ? "repeat(3, 1fr)" : "1fr",
                  gap: isTablet ? 28 : 16,
                }
          }
        >
          {shownSpecs.map((s, i) => (
            <div key={s.label} style={specStyle(i)}>
              <div style={{ ...LABEL, color: "#FFFFFF" }}>{s.label}</div>
              <div className="t-body" style={{ color: "#FFFFFF", marginTop: 8 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

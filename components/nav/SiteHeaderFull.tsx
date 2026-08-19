"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "../hero/icons";
import { linkFor } from "./nav-links";

/* Full site header — the same navbar as the home hero, extracted so every
   page shares one navbar. Fixed overlay: transparent over a dark hero at the
   top, solid white on scroll-up, hidden on scroll-down. Palette 2B. */

const EASE = "cubic-bezier(0.22,0.61,0.36,1)";
const EASE_ARR = [0.22, 0.61, 0.36, 1] as const;
const CYAN = "#16C1F3";
const SMALL_HEADER_GRADIENT =
  "linear-gradient(180deg, rgba(11,42,58,.90) 0%, rgba(11,42,58,.62) 60%, rgba(11,42,58,.28) 100%)";
const LABEL: CSSProperties = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase" };

type NavItem = { name: string; href?: string; children?: string[]; mega?: boolean };
const NAV: NavItem[] = [
  { name: "About", href: "/about-us" },
  { name: "Products", children: ["Products overview", "MQXC Series", "High-Energy X-Ray"] },
  { name: "Industries", children: ["Industries overview", "Aerospace & Defence", "Automotive", "Electronics"] },
  { name: "Services", href: "/services" },
  { name: "All pages", mega: true, children: ["Company", "Products", "Industries", "Resources"] },
];
const MOBILE_MENU: NavItem[] = [
  { name: "About", href: "/about-us" },
  { name: "Products", children: ["Products overview", "MQXC Series", "High-Energy X-Ray"] },
  { name: "Industries", children: ["Industries overview", "Aerospace & Defence", "Automotive", "Electronics"] },
  { name: "Services", href: "/services" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];
const MEGA: [string, string[]][] = [
  ["Company", ["About", "Recognition", "Clients", "Careers", "Contact"]],
  ["Products", ["Products overview", "MQXC Series", "High-Energy X-Ray"]],
  ["Industries", ["Industries overview", "Aerospace & Defence", "Automotive", "Electronics"]],
  ["Services", ["Services overview", "CT Inspection Services"]],
];


export default function SiteHeaderFull() {
  const [w, setW] = useState(1440);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [menuLeft, setMenuLeft] = useState<number | null>(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
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

  const isDesktop = w >= 1024;
  const isTablet = w >= 768 && w < 1024;
  const isSmall = !isDesktop;
  const gut = isDesktop ? 55 : isTablet ? 40 : 24;
  const navH = isDesktop ? 76 : isTablet ? 72 : 60;
  const ctaW = isDesktop ? 234 : isTablet ? 190 : 128;
  const logoH = isDesktop ? 58 : isTablet ? 46 : 34;

  const openItem = NAV.find((n) => n.name === openMenu) || null;
  const megaOpen = !!(openItem && openItem.mega && isDesktop);
  const dropdownOpen = !!(openItem && !openItem.mega && openItem.children && isDesktop);
  const menuActive = mobileOpen || menuMounted;
  const inkHeader = headerSolid || menuActive;
  const headerHide = headerHidden && !menuActive;

  const toggleLeft = (e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLElement;
    const hdr = btn.closest("header");
    if (!hdr) return null;
    return Math.round(btn.getBoundingClientRect().left - hdr.getBoundingClientRect().left);
  };
  const cancelDropClose = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
  };
  const scheduleDropClose = () => {
    cancelDropClose();
    dropTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const navItemStyle = (on: boolean): CSSProperties => ({
    ...LABEL,
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 15,
    whiteSpace: "nowrap",
    color: on ? (inkHeader ? "#0A6A88" : CYAN) : inkHeader ? "#0B2A3A" : "#FFFFFF",
    transition: `color 200ms ${EASE}`,
    cursor: "pointer",
    background: "none",
    border: 0,
    textDecoration: "none",
  });

  return (
    <>
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
              if (!hasKids) {
                return (
                  <a key={item.name} href={item.href || "/"} onMouseEnter={scheduleDropClose} onMouseLeave={scheduleDropClose} style={navItemStyle(on)}>
                    <span>{item.name}</span>
                  </a>
                );
              }
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-haspopup
                  aria-expanded={on}
                  onClick={(e) => {
                    setMenuLeft(toggleLeft(e));
                    setOpenMenu((v) => (v === item.name ? null : item.name));
                  }}
                  onMouseEnter={(e) => {
                    cancelDropClose();
                    setMenuLeft(toggleLeft(e));
                    setOpenMenu(item.name);
                  }}
                  onMouseLeave={scheduleDropClose}
                  style={navItemStyle(on)}
                >
                  <span>{item.name}</span>
                  <span style={{ display: "inline-flex", transform: on ? "rotate(180deg)" : "rotate(0deg)", transition: `transform 200ms ${EASE}` }}>
                    <ChevronDown size={14} />
                  </span>
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
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, background: "none", border: 0 }}
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
          <a href="/contact" style={{ ...LABEL, width: ctaW, flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: inkHeader ? "#0E3A52" : CYAN, color: inkHeader ? "#FFFFFF" : "#08283A", fontSize: 15, textDecoration: "none", transition: `background 200ms ${EASE}, color 200ms ${EASE}` }} className={inkHeader ? "hover:!bg-[#0A2B3D]" : "hover:!bg-[#0FA5D2]"}>
            Contact us
          </a>
        )}
      </header>

      {/* mega panel */}
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

      {/* dropdown */}
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

      {/* mobile / tablet menu */}
      <AnimatePresence onExitComplete={() => setMenuMounted(false)}>
        {mobileOpen && isSmall && (
          <motion.div
            key="mobile-menu"
            data-mqs-panel
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.34, ease: EASE_ARR }}
            style={{ position: "fixed", left: 0, right: 0, top: navH, maxHeight: `calc(100vh - ${navH}px)`, zIndex: 45, background: "#F4F8FA", overflowY: "auto", display: "flex", flexDirection: "column", padding: `${isTablet ? 36 : 24}px ${gut}px ${isTablet ? 40 : 30}px` }}
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
                      <button type="button" aria-expanded={on} onClick={() => setExpanded((v) => (v === item.name ? null : item.name))} style={{ width: "100%", display: "block", padding: `${rowPad}px 0`, textAlign: "left", background: "none", border: 0, cursor: "pointer" }}>
                        <span style={{ ...labelStyle, color: on ? "#0A6A88" : "#0B2A3A" }}>{item.name}</span>
                      </button>
                    ) : (
                      <a href={item.href || "/"} style={{ display: "block", padding: `${rowPad}px 0`, ...labelStyle, color: "#0B2A3A" }} className="hover:!text-[#0A6A88]">
                        {item.name}
                      </a>
                    )}
                    {hasKids && (
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: EASE_ARR }} style={{ overflow: "hidden" }}>
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
            <a href="/contact" style={{ ...LABEL, flexShrink: 0, marginTop: isTablet ? 40 : 30, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", justifyContent: "center", height: isTablet ? 56 : 50, padding: `0 ${isTablet ? 34 : 28}px`, background: "#0E3A52", color: "#FFFFFF", fontSize: isTablet ? 17 : 16, textDecoration: "none" }} className="hover:!bg-[#0A2B3D]">
              Contact us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

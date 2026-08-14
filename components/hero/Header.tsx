"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp } from "./icons";
import { megaFamilies, topNav } from "./nav-data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Esc closes any open panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fade = reduce ? {} : { duration: 0.2, ease: EASE };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="relative flex h-[60px] items-center border-b border-white/[0.14] md:h-[72px] min-[1400px]:h-[76px]">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center pl-6 md:pl-10 min-[1400px]:pl-[55px]"
          aria-label="MQS Technologies"
        >
          <Image
            src="/assets/mqs-logo-2a-dark.png"
            alt="MQS Technologies"
            width={124}
            height={60}
            priority
            style={{ width: "auto" }}
            className="h-[34px] md:h-[46px] min-[1400px]:h-[58px]"
          />
        </a>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-9 pr-9 min-[1400px]:flex">
          {topNav.map((item) => {
            const isMega = !!item.mega;
            const active = isMega && megaOpen;
            return (
              <button
                key={item.label}
                onClick={() => isMega && setMegaOpen((v) => !v)}
                className={`label group flex items-center gap-1.5 text-[15px] tracking-[0.045em] transition-colors duration-200 ${
                  active ? "text-[#16C1F3]" : "text-white hover:text-[#16C1F3]"
                }`}
              >
                {item.label}
                {(item.mega || item.family) &&
                  (active ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </button>
            );
          })}
        </nav>

        {/* Hamburger (below desktop) */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="ml-auto mr-4 flex h-11 w-[22px] flex-col justify-center gap-[5px] min-[1400px]:hidden"
        >
          {mobileOpen ? (
            <span className="relative block h-[22px] w-[22px]">
              <span className="absolute top-1/2 left-0 h-[2px] w-[22px] -translate-y-1/2 rotate-45 bg-white" />
              <span className="absolute top-1/2 left-0 h-[2px] w-[22px] -translate-y-1/2 -rotate-45 bg-white" />
            </span>
          ) : (
            <>
              <span className="h-[2px] w-[22px] bg-white" />
              <span className="h-[2px] w-[22px] bg-white" />
              <span className="h-[2px] w-[14px] bg-white" />
            </>
          )}
        </button>

        {/* CONTACT US — welded to the right edge, full header height */}
        <a
          href="#"
          className="label flex h-full w-[128px] items-center justify-center bg-[#16C1F3] text-[13px] tracking-[0.045em] text-[#08283A] transition-colors duration-200 hover:bg-[#0FA5D2] md:w-[190px] md:text-[14px] min-[1400px]:w-[234px] min-[1400px]:text-[15px]"
        >
          Contact Us
        </a>
      </div>

      {/* Desktop mega panel */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={fade}
            className="absolute inset-x-0 top-full hidden border-b-[3px] border-[#16C1F3] bg-white min-[1400px]:block"
          >
            <div className="grid grid-cols-4 px-[55px] pt-12 pb-11">
              {megaFamilies.map((fam, i) => (
                <div
                  key={fam.title}
                  className={`px-8 ${i < 3 ? "border-r border-[rgba(16,16,16,0.08)]" : ""}`}
                >
                  <p className="label mb-5 text-[13px] tracking-[0.045em] text-[#6B6B6B]">
                    {fam.title}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {fam.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="text-[16px] text-[#1B1B1B] transition-colors duration-200 hover:text-[#16C1F3]"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-[rgba(16,16,16,0.08)] bg-[#F6F6F6] px-[55px] py-[22px]">
              <span className="label text-[13px] tracking-[0.045em] text-[#6B6B6B]">
                28 Pages · Grouped in four families
              </span>
              <a
                href="#"
                className="label flex items-center gap-2 text-[13px] tracking-[0.045em] text-[#16C1F3]"
              >
                Explore all equipment
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile / tablet accordion panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            className="fixed inset-x-0 top-[60px] bottom-0 z-40 overflow-y-auto bg-[#231E21] md:top-[72px] min-[1400px]:hidden"
          >
            {topNav.map((item) => {
              const fam = megaFamilies.find((f) => f.title === item.family);
              const isOpen = expanded === item.label;
              return (
                <div
                  key={item.label}
                  className="border-b border-white/[0.14]"
                >
                  <button
                    onClick={() =>
                      fam
                        ? setExpanded((v) => (v === item.label ? null : item.label))
                        : undefined
                    }
                    className={`label flex w-full items-center justify-between px-6 py-[9px] text-left text-[15px] tracking-[0.045em] md:px-10 md:py-[13px] md:text-[18px] ${
                      isOpen ? "text-[#16C1F3]" : "text-white"
                    }`}
                  >
                    {item.label}
                    {fam ? (
                      isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )
                    ) : (
                      <ArrowRight size={16} className="text-white/60" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {fam && isOpen && (
                      <motion.ul
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={fade}
                        className="ml-6 overflow-hidden border-l-2 border-[#16C1F3] bg-white/[0.05] md:ml-10"
                      >
                        {fam.links.map((l) => (
                          <li key={l}>
                            <a
                              href="#"
                              className="flex items-center justify-between px-6 py-[7px] text-[13.5px] text-white/80 md:py-[9px] md:text-[15px]"
                            >
                              {l}
                              <ArrowRight size={14} className="text-white/40" />
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

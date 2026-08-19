"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Section reveal — fade + 24px rise, 280ms ease-out, on first intersection
   only (MqsServices.dc handoff → Motion). The observer is an enhancement:
   a mount timer guarantees the reveal lands even where IO never fires, so
   content can never stay hidden. Honours prefers-reduced-motion. */

export default function Reveal({
  children,
  delay = 0,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  /* prefers-reduced-motion is handled in globals.css, which drops the
     transition entirely — the reveal then lands as a straight cut. */
  useEffect(() => {
    const el = ref.current;
    const t = setTimeout(() => setOn(true), 400);
    let io: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting || e.intersectionRatio > 0) {
              setOn(true);
              clearTimeout(t);
              io?.disconnect();
            }
          }
        },
        { rootMargin: "0px 0px -5% 0px", threshold: 0 },
      );
      io.observe(el);
    }
    return () => {
      clearTimeout(t);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(24px)",
        transition: `opacity 280ms ease-out ${delay}ms, transform 280ms ease-out ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

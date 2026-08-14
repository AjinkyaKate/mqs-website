"use client";

import { ReactLenis } from "lenis/react";
import { PropsWithChildren, useEffect, useState } from "react";

/**
 * Lenis smooth scrolling, disabled when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: PropsWithChildren) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

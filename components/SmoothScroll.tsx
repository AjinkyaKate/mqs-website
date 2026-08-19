"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

const ReactLenis = dynamic(
  () => import("lenis/react").then((m) => m.ReactLenis),
  { ssr: false }
);

/**
 * Lenis smooth scrolling, disabled for admin routes and reduced motion.
 */
export default function SmoothScroll({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion || pathname.startsWith("/admin")) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

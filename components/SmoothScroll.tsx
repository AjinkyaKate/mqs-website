"use client";

import { usePathname } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";
import type Lenis from "lenis";

/**
 * Lenis smooth scrolling, attached imperatively.
 *
 * This component sits in the root layout and wraps every page, so it must never
 * gate its children. It previously rendered them inside a next/dynamic import
 * with `ssr: false`, which told Next not to render that subtree on the server.
 * Because the subtree was the whole site, no page server-rendered any DOM:
 * /about-us shipped 65 KB containing one div and thirteen scripts, with the copy
 * present only as serialized payload. That cost the site its crawlable HTML and
 * broke every cross-page anchor, since a browser landing on /#contact found no
 * target and never scrolled.
 *
 * Children are now returned directly and unconditionally, so they render on the
 * server. Lenis is created in an effect against the document instead of wrapping
 * anything, and the import stays inside the effect so it is not in the initial
 * bundle either. `anchors: true` hands in-page anchor clicks to Lenis so they
 * scroll smoothly rather than being swallowed.
 *
 * Skipped on /admin and when the visitor prefers reduced motion, re-evaluated if
 * that preference changes.
 */
export default function SmoothScroll({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | undefined;
    let disposed = false;

    const attach = () => {
      if (disposed || instance || query.matches) return;
      void import("lenis").then(({ default: LenisCtor }) => {
        if (disposed || query.matches) return;
        instance = new LenisCtor({
          lerp: 0.1,
          smoothWheel: true,
          autoRaf: true,
          anchors: true,
        });
      });
    };

    const detach = () => {
      instance?.destroy();
      instance = undefined;
    };

    const onPreferenceChange = () => (query.matches ? detach() : attach());

    attach();
    query.addEventListener("change", onPreferenceChange);

    return () => {
      disposed = true;
      query.removeEventListener("change", onPreferenceChange);
      detach();
    };
  }, [pathname]);

  return <>{children}</>;
}

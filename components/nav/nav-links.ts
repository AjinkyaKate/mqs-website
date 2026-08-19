/* Resolve a nav dropdown/menu child label to a real route.
   Shared by SiteHeaderFull (inner pages) and the Hero inline header (home),
   so both navbars route identically. Industry labels route to their detail
   pages; a few known labels route to their pages; the rest fall back to the
   catalog (or the Industries hub when the parent is "Industries"). */

export const HREF_MAP: Record<string, string> = {
  /* Industries. Phase 1 is a single /industries/ page, so there are no child
     routes and Industries is a plain top-level link rather than a dropdown. The
     page's own industry sections and routing matrix do the routing. */
  "Industries overview": "/industries",
  Industries: "/industries",

  /* Products. Two detail pages exist. The rest of the catalogue is reachable from
     /products; category labels with no page behind them are not in the nav.
     Add children here as each product page lands. */
  "Products overview": "/products",
  "MQXC Series": "/products/mqxc-series",
  "High-Energy X-Ray": "/products/high-energy-xray",

  About: "/about-us",
  Careers: "/careers",
  Contact: "/contact",
  /* Recognition and Clients are sections rather than pages. Both point at the
     page, not the anchor: SmoothScroll wraps the app in a next/dynamic component
     with ssr:false, so no page server-renders its DOM and a browser landing on a
     cross-page anchor finds no target and never scrolls. Verified on production:
     /#contact leaves scrollY at 0 with the target at 8019px. Restore the #clients
     and #recognition fragments once that is fixed. */
  Recognition: "/about-us",
  Clients: "/about-us",
  /* Services. Phase 1 is a single /services/ page; the brief's five detail pages
     are not being built, so Services is a plain top-level link. The page's own
     three-family block and Service Finder do the routing. */
  "Services overview": "/services",
};

export const linkFor = (parent: string, label: string): string =>
  HREF_MAP[label] ?? (parent === "Industries" ? "/industries" : "/products");

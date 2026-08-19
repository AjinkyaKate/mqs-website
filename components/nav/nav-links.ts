/* Resolve a nav dropdown/menu child label to a real route.
   Shared by SiteHeaderFull (inner pages) and the Hero inline header (home),
   so both navbars route identically. Industry labels route to their detail
   pages; a few known labels route to their pages; the rest fall back to the
   catalog (or the Industries hub when the parent is "Industries"). */

export const HREF_MAP: Record<string, string> = {
  /* Industries. Three detail pages exist. Energy, Foundry, Additive Manufacturing
     and Research are named across the product pages but have no content of their
     own (the client's Industries brief flags this as a decision needed), so they
     are not in the nav. */
  "Industries overview": "/industries",
  Industries: "/industries",
  "Aerospace & Defence": "/industries/aerospace-defence",
  Automotive: "/industries/automotive",
  Electronics: "/industries/electronics",

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
  /* Services. The brief specifies five detail pages; only CT Inspection is built,
     so Services is a plain top-level link to the hub rather than a dropdown of
     four entries with no pages behind them. The hub's own three-family block and
     Service Finder do the routing. Re-add children as each page lands:
     /services/precision-sub-assemblies/, /services/industrial-electronics/,
     /services/preventive-maintenance/, /services/repair-support/. */
  "Services overview": "/services",
  "CT Inspection Services": "/services/ct-inspection",
};

export const linkFor = (parent: string, label: string): string =>
  HREF_MAP[label] ?? (parent === "Industries" ? "/industries" : "/products");

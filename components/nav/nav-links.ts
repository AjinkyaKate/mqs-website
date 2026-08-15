/* Resolve a nav dropdown/menu child label to a real route.
   Shared by SiteHeaderFull (inner pages) and the Hero inline header (home),
   so both navbars route identically. Industry labels route to their detail
   pages; a few known labels route to their pages; the rest fall back to the
   catalog (or the Industries hub when the parent is "Industries"). */

export const HREF_MAP: Record<string, string> = {
  "Aerospace & Defence": "/industries/aerospace-defence",
  Automotive: "/industries/automotive",
  Electronics: "/industries/electronics",
  Energy: "/industries",
  Industries: "/industries",
  About: "/#about",
  Careers: "/careers",
  Contact: "/#contact",
  "High-Energy X-ray": "/products/high-energy-xray",
};

export const linkFor = (parent: string, label: string): string =>
  HREF_MAP[label] ?? (parent === "Industries" ? "/industries" : "/products");

/* Sends a GA4 event when the GA script is on the page, and does nothing
   otherwise, so forms can call it unconditionally. */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

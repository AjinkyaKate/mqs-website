/* Records a named event in whichever analytics scripts are on the page (Umami
   and/or Google Analytics) and does nothing otherwise, so forms can call it
   unconditionally. */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    umami?: { track: (name: string, data?: Record<string, string>) => void };
  }
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  window.umami?.track(name, params);
}

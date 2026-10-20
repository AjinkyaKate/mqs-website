"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/* Loads gtag.js for the measurement ID set in the admin. Admin pages are
   skipped so the team's own visits don't count as site traffic. */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}

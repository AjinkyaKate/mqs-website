"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import type { TrackingIds } from "@/lib/site-settings";

/* Umami Cloud's tracker unless a self-hosted Umami is configured. */
const UMAMI_SCRIPT = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js";

/* Loads the analytics scripts for the IDs set in Admin > Settings. Admin pages
   are skipped so the team's own visits don't count as site traffic. */
export default function SiteAnalytics({ gaId, umamiId }: TrackingIds) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {umamiId && <Script src={UMAMI_SCRIPT} data-website-id={umamiId} strategy="afterInteractive" />}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
    </>
  );
}

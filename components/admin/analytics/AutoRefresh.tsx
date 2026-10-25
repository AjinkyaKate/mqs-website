"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* Re-renders the page on the server every interval so the realtime panel
   stays current without a manual reload. Paused while the tab is hidden. */
export default function AutoRefresh({ seconds = 60, updatedAt }: { seconds?: number; updatedAt: string }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, seconds * 1000);
    return () => clearInterval(id);
  }, [router, seconds]);

  return (
    <span className="text-xs text-gray-400">
      Updated {new Date(updatedAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" })}, refreshes every minute
    </span>
  );
}

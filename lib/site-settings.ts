import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";

export const SETTINGS_TAG = "site-settings";
export const GA_KEY = "ga-measurement-id";
export const UMAMI_KEY = "umami-website-id";

/* GA4 measurement IDs look like G-ABC123XYZ and Umami website IDs are UUIDs.
   Anything else is rejected on save, and also ignored on read so a bad row can
   never inject into a script tag. */
export const GA_ID_PATTERN = /^G-[A-Z0-9]{4,16}$/;
export const UMAMI_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export type TrackingIds = { gaId: string | null; umamiId: string | null };

async function readTrackingIds(): Promise<TrackingIds> {
  try {
    const rows = await prisma.siteSetting.findMany({ where: { key: { in: [GA_KEY, UMAMI_KEY] } } });
    const value = (key: string) => rows.find((r) => r.key === key)?.value ?? null;
    const ga = value(GA_KEY);
    const umami = value(UMAMI_KEY);
    return {
      gaId: ga && GA_ID_PATTERN.test(ga) ? ga : null,
      umamiId: umami && UMAMI_ID_PATTERN.test(umami) ? umami : null,
    };
  } catch {
    return { gaId: null, umamiId: null };
  }
}

/* The root layout reads this on every page, so it is cached and only refetched
   when the admin saves (revalidateTag on SETTINGS_TAG). Like getSiteImage, an
   unreachable database or a missing table must not take the site down: no
   setting just means no analytics. */
export const getTrackingIds = unstable_cache(readTrackingIds, ["tracking-ids"], { tags: [SETTINGS_TAG] });

/* Uncached, for admin pages, which should always show what is actually stored. */
export const getTrackingIdsFresh = readTrackingIds;

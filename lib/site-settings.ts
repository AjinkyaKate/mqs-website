import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";

export const SETTINGS_TAG = "site-settings";
export const GA_KEY = "ga-measurement-id";

/* GA4 measurement IDs look like G-ABC123XYZ. Anything else is rejected on save,
   and also ignored on read so a bad row can never inject into the script tag. */
export const GA_ID_PATTERN = /^G-[A-Z0-9]{4,16}$/;

/* The root layout reads this on every page, so it is cached and only refetched
   when the admin saves (revalidateTag on SETTINGS_TAG). Like getSiteImage, an
   unreachable database or a missing table must not take the site down: no
   setting just means no analytics. */
export const getGaMeasurementId = unstable_cache(
  async () => {
    try {
      const row = await prisma.siteSetting.findUnique({ where: { key: GA_KEY } });
      return row && GA_ID_PATTERN.test(row.value) ? row.value : null;
    } catch {
      return null;
    }
  },
  [GA_KEY],
  { tags: [SETTINGS_TAG] }
);

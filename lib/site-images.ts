import { prisma } from "@/lib/db";

/* A site-image override is decoration: every caller has a static fallback baked
   into the component. So a database that is unreachable must not take the page
   down. Before this, an unavailable database returned 500 on the home page,
   because it is force-dynamic and reads this on every request. */
export async function getSiteImage(slot: string) {
  try {
    return await prisma.siteImage.findUnique({ where: { slot } });
  } catch {
    return null;
  }
}

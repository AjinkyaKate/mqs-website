import { prisma } from "@/lib/db";

export async function getSiteImage(slot: string) {
  return prisma.siteImage.findUnique({ where: { slot } });
}

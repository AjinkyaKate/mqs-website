"use server";

import { del } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function saveSiteImage(slot: string, url: string, alt: string) {
  const authed = await verifySession();
  if (!authed) return { error: "Unauthorized" };

  // Delete old blob if replacing
  const existing = await prisma.siteImage.findUnique({ where: { slot } });
  if (existing && existing.url !== url) {
    try {
      await del(existing.url);
    } catch {
      // Old blob may already be gone
    }
  }

  await prisma.siteImage.upsert({
    where: { slot },
    update: { url, alt },
    create: { slot, url, alt },
  });

  return { success: true };
}

export async function deleteSiteImage(slot: string) {
  const authed = await verifySession();
  if (!authed) return { error: "Unauthorized" };

  const existing = await prisma.siteImage.findUnique({ where: { slot } });
  if (!existing) return { error: "Not found" };

  try {
    await del(existing.url);
  } catch {
    // Blob may already be gone
  }

  await prisma.siteImage.delete({ where: { slot } });
  return { success: true };
}

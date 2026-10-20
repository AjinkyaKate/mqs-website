"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { GA_ID_PATTERN, GA_KEY, SETTINGS_TAG } from "@/lib/site-settings";

export type SettingsFormState = { success: boolean; message?: string };

export async function saveAnalyticsSettings(
  _prev: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const authed = await verifySession();
  if (!authed) return { success: false, message: "Unauthorized" };

  const gaId = String(formData.get("gaId") ?? "").trim().toUpperCase();

  try {
    if (gaId === "") {
      // An empty field switches analytics off.
      await prisma.siteSetting.deleteMany({ where: { key: GA_KEY } });
    } else {
      if (!GA_ID_PATTERN.test(gaId)) {
        return { success: false, message: "That doesn't look like a GA4 Measurement ID. It should start with G-, for example G-ABC123XYZ." };
      }
      await prisma.siteSetting.upsert({
        where: { key: GA_KEY },
        update: { value: gaId },
        create: { key: GA_KEY, value: gaId },
      });
    }
  } catch {
    return { success: false, message: "Could not save. The settings table may not exist yet in this database." };
  }

  revalidateTag(SETTINGS_TAG, "max");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: gaId ? `Saved. Google Analytics (${gaId}) is now on across the site.` : "Google Analytics is now off.",
  };
}

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { GA_ID_PATTERN, GA_KEY, SETTINGS_TAG, UMAMI_ID_PATTERN, UMAMI_KEY } from "@/lib/site-settings";

export type SettingsFormState = { success: boolean; message?: string };

/* Saves one setting; an empty value deletes the row, which switches it off. */
async function saveSetting(key: string, value: string) {
  if (value === "") {
    await prisma.siteSetting.deleteMany({ where: { key } });
  } else {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
}

export async function saveAnalyticsSettings(
  _prev: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const authed = await verifySession();
  if (!authed) return { success: false, message: "Unauthorized" };

  const gaId = String(formData.get("gaId") ?? "").trim().toUpperCase();
  const umamiId = String(formData.get("umamiId") ?? "").trim().toLowerCase();

  if (gaId && !GA_ID_PATTERN.test(gaId)) {
    return { success: false, message: "That doesn't look like a GA4 Measurement ID. It should start with G-, for example G-ABC123XYZ." };
  }
  if (umamiId && !UMAMI_ID_PATTERN.test(umamiId)) {
    return { success: false, message: "The Umami Website ID should look like 3f2a9c1e-1b2c-4d5e-8f90-123456789abc. It is under Settings, Websites, Edit in Umami." };
  }

  try {
    await saveSetting(GA_KEY, gaId);
    await saveSetting(UMAMI_KEY, umamiId);
  } catch {
    return { success: false, message: "Could not save. The settings table may not exist yet in this database." };
  }

  revalidateTag(SETTINGS_TAG, "max");
  revalidatePath("/", "layout");

  const on = [umamiId && "Umami", gaId && "Google Analytics"].filter(Boolean);
  return { success: true, message: on.length ? `Saved. ${on.join(" and ")} tracking is on across the site.` : "Saved. Tracking is off." };
}

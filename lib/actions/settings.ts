"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { GA_ID_PATTERN, GA_KEY, GA_PROPERTY_KEY, GA_PROPERTY_PATTERN, SETTINGS_TAG } from "@/lib/site-settings";

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
  const propertyId = String(formData.get("propertyId") ?? "").trim();

  if (gaId && !GA_ID_PATTERN.test(gaId)) {
    return { success: false, message: "That doesn't look like a GA4 Measurement ID. It should start with G-, for example G-ABC123XYZ." };
  }
  if (propertyId && !GA_PROPERTY_PATTERN.test(propertyId)) {
    return { success: false, message: "The Property ID should be a number only, for example 412345678. It is shown in Google Analytics under Admin, Property details." };
  }

  try {
    await saveSetting(GA_KEY, gaId);
    await saveSetting(GA_PROPERTY_KEY, propertyId);
  } catch {
    return { success: false, message: "Could not save. The settings table may not exist yet in this database." };
  }

  revalidateTag(SETTINGS_TAG, "max");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: gaId ? `Saved. Google Analytics (${gaId}) is now on across the site.` : "Saved. Google Analytics tracking is off.",
  };
}

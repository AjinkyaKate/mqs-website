import { prisma } from "@/lib/db";
import { GA_KEY, getGaPropertyId } from "@/lib/site-settings";
import { serviceAccountEmail } from "@/lib/ga-data";
import AnalyticsSettingsForm from "@/components/admin/AnalyticsSettingsForm";

export default async function AdminSettingsPage() {
  // Read uncached here so the page always shows what is actually stored.
  let gaId: string | null = null;
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: GA_KEY } });
    gaId = row?.value ?? null;
  } catch {
    // Table not created yet; the form still renders and save reports the problem.
  }
  const propertyId = await getGaPropertyId();

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">
        Settings
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Site-wide settings. Changes go live immediately.
      </p>

      <div className="mt-8 max-w-2xl">
        <AnalyticsSettingsForm currentId={gaId} currentPropertyId={propertyId} serviceEmail={serviceAccountEmail()} />
      </div>
    </div>
  );
}

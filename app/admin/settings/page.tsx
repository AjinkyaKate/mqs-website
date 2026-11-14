import { getTrackingIdsFresh } from "@/lib/site-settings";
import { umamiConfigured } from "@/lib/umami";
import AnalyticsSettingsForm from "@/components/admin/AnalyticsSettingsForm";

export default async function AdminSettingsPage() {
  const { gaId, umamiId } = await getTrackingIdsFresh();

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">
        Settings
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Site-wide settings. Changes go live immediately.
      </p>

      <div className="mt-8 max-w-2xl">
        <AnalyticsSettingsForm umamiId={umamiId} gaId={gaId} apiConfigured={umamiConfigured()} />
      </div>
    </div>
  );
}

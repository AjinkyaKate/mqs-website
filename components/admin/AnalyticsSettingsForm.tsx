"use client";

import { useActionState } from "react";
import { saveAnalyticsSettings, type SettingsFormState } from "@/lib/actions/settings";

export default function AnalyticsSettingsForm({ currentId }: { currentId: string | null }) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(saveAnalyticsSettings, { success: false });

  return (
    <form action={formAction} className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-base font-semibold text-[#0B2A3A]">Google Analytics</h2>
      <p className="mt-1 text-sm text-gray-500">
        Paste the GA4 Measurement ID from Google Analytics (Admin, Data streams, Web). Leave it empty to switch analytics off.
      </p>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className={`h-2 w-2 rounded-full ${currentId ? "bg-green-500" : "bg-gray-300"}`} />
        <span className="text-gray-700">{currentId ? `On, tracking ${currentId}` : "Off"}</span>
      </div>

      <label htmlFor="gaId" className="mt-5 block text-sm font-medium text-gray-700">
        Measurement ID
      </label>
      <input
        id="gaId"
        name="gaId"
        defaultValue={currentId ?? ""}
        placeholder="G-XXXXXXXXXX"
        autoComplete="off"
        className="mt-1 w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 font-mono text-sm uppercase focus:border-[#0B2A3A] focus:outline-none"
      />

      <p className="mt-3 text-xs text-gray-500">
        Form submissions are also sent to Google Analytics as events: <code>generate_lead</code> for enquiries and{" "}
        <code>job_application</code> for careers. Mark them as key events in GA to see them as conversions.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 rounded-md bg-[#0B2A3A] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save"}
      </button>

      {state.message && (
        <p className={`mt-3 text-sm ${state.success ? "text-green-700" : "text-red-600"}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}

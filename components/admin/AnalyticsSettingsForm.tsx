"use client";

import { useActionState } from "react";
import { saveAnalyticsSettings, type SettingsFormState } from "@/lib/actions/settings";

type Props = {
  currentId: string | null;
  currentPropertyId: string | null;
  serviceEmail: string | null;
};

function Check({ done, children }: { done: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full text-[10px] font-bold ${
          done ? "bg-green-500 text-white" : "border border-gray-300 text-transparent"
        }`}
        aria-label={done ? "Done" : "Not done"}
      >
        ✓
      </span>
      <span className="text-gray-700">{children}</span>
    </li>
  );
}

export default function AnalyticsSettingsForm({ currentId, currentPropertyId, serviceEmail }: Props) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(saveAnalyticsSettings, { success: false });

  return (
    <form action={formAction} className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-base font-semibold text-[#0B2A3A]">Google Analytics</h2>
      <p className="mt-1 text-sm text-gray-500">
        Tracks visitors on the website and shows the numbers in the Analytics tab of this admin.
      </p>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className={`h-2 w-2 rounded-full ${currentId ? "bg-green-500" : "bg-gray-300"}`} />
        <span className="text-gray-700">{currentId ? `Tracking on, sending to ${currentId}` : "Tracking off"}</span>
      </div>

      <label htmlFor="gaId" className="mt-5 block text-sm font-medium text-gray-700">
        Measurement ID
      </label>
      <p className="text-xs text-gray-500">Google Analytics, Admin, Data streams, Web stream. Starts with G-. Sends visits to Google.</p>
      <input
        id="gaId"
        name="gaId"
        defaultValue={currentId ?? ""}
        placeholder="G-XXXXXXXXXX"
        autoComplete="off"
        className="mt-1.5 w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 font-mono text-sm uppercase focus:border-[#0B2A3A] focus:outline-none"
      />

      <label htmlFor="propertyId" className="mt-5 block text-sm font-medium text-gray-700">
        Property ID
      </label>
      <p className="text-xs text-gray-500">Google Analytics, Admin, Property details. A number only. Lets this admin read the reports.</p>
      <input
        id="propertyId"
        name="propertyId"
        defaultValue={currentPropertyId ?? ""}
        placeholder="412345678"
        inputMode="numeric"
        autoComplete="off"
        className="mt-1.5 w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-[#0B2A3A] focus:outline-none"
      />

      <div className="mt-6 rounded-md bg-[#F1F5F9] p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Analytics tab setup</p>
        <ul className="mt-3 space-y-2 text-sm">
          <Check done={!!serviceEmail}>Reporting access configured on the server</Check>
          <Check done={!!currentPropertyId}>Property ID saved</Check>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-gray-300" />
            <span className="text-gray-700">
              In Google Analytics, Admin, Property access management, add{" "}
              {serviceEmail ? (
                <code className="break-all rounded bg-white px-1.5 py-0.5 text-[12px] text-[#0B2A3A]">{serviceEmail}</code>
              ) : (
                "the reporting service account"
              )}{" "}
              with the <strong>Viewer</strong> role.
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-4 text-xs text-gray-500">
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

"use client";

import { useActionState } from "react";
import { saveAnalyticsSettings, type SettingsFormState } from "@/lib/actions/settings";

type Props = {
  umamiId: string | null;
  gaId: string | null;
  apiConfigured: boolean;
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

const input = "mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-[#0B2A3A] focus:outline-none";

export default function AnalyticsSettingsForm({ umamiId, gaId, apiConfigured }: Props) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(saveAnalyticsSettings, { success: false });

  return (
    <form action={formAction} className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-base font-semibold text-[#0B2A3A]">Website analytics</h2>
      <p className="mt-1 text-sm text-gray-500">
        Umami counts visitors as they arrive and powers the Analytics tab. Google Analytics is optional, for Google&apos;s own tools.
      </p>

      <label htmlFor="umamiId" className="mt-6 block text-sm font-medium text-gray-700">
        Umami Website ID
      </label>
      <p className="text-xs text-gray-500">In Umami: Settings, Websites, Edit. Looks like 3f2a9c1e-1b2c-4d5e-8f90-123456789abc.</p>
      <input id="umamiId" name="umamiId" defaultValue={umamiId ?? ""} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" autoComplete="off" className={`${input} max-w-md`} />

      <div className="mt-4 rounded-md bg-[#F1F5F9] p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Analytics tab setup</p>
        <ul className="mt-3 space-y-2 text-sm">
          <Check done={!!umamiId}>Umami Website ID saved (starts tracking visits)</Check>
          <Check done={apiConfigured}>Umami API key configured on the server (lets this admin read the numbers)</Check>
        </ul>
      </div>

      <label htmlFor="gaId" className="mt-6 block text-sm font-medium text-gray-700">
        Google Analytics Measurement ID <span className="font-normal text-gray-400">(optional)</span>
      </label>
      <p className="text-xs text-gray-500">Google Analytics, Admin, Data streams, Web stream. Starts with G-.</p>
      <input id="gaId" name="gaId" defaultValue={gaId ?? ""} placeholder="G-XXXXXXXXXX" autoComplete="off" className={`${input} max-w-xs uppercase`} />

      <p className="mt-5 text-xs text-gray-500">
        Form submissions are recorded as <code>generate_lead</code> (enquiries) and <code>job_application</code> (careers) events in both tools.
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

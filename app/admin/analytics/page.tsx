import Link from "next/link";
import { getGaPropertyId } from "@/lib/site-settings";
import { getDashboard, getRealtimeUsers, GaError, serviceAccountEmail, serviceAccountKeyStatus, type Dashboard } from "@/lib/ga-data";
import AnalyticsDashboard from "@/components/admin/analytics/AnalyticsDashboard";

const RANGES = [7, 28, 90] as const;

type SearchParams = Promise<{ range?: string }>;

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 max-w-2xl rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-base font-semibold text-[#0B2A3A]">{title}</h2>
      <div className="mt-2 space-y-2 text-sm text-gray-600">{children}</div>
    </div>
  );
}

function SetupNotice({ error }: { error: GaError | null }) {
  const email = serviceAccountEmail();
  const grant = (
    <p>
      In Google Analytics go to Admin, Property access management, and add{" "}
      {email ? <code className="break-all rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[12px]">{email}</code> : "the reporting service account"} with the{" "}
      <strong>Viewer</strong> role. It can take a few minutes to apply.
    </p>
  );

  if (!error) {
    return (
      <Notice title="Connect Google Analytics">
        <p>Add the GA4 Property ID on the Settings page to see website traffic here.</p>
        <p>
          <Link href="/admin/settings" className="font-medium text-[#0A6A88] underline">
            Go to Settings
          </Link>
        </p>
      </Notice>
    );
  }
  switch (error.kind) {
    case "not-configured": {
      const status = serviceAccountKeyStatus();
      return (
        <Notice title="Reporting access is not set up on the server">
          <p>The site needs a Google service account key to read reports. This is a one-time step for the website developer.</p>
          <p className="text-xs text-gray-500">
            {status === "missing" && "GA_SERVICE_ACCOUNT_JSON is not set for this environment. Add it in Vercel and redeploy."}
            {status === "invalid-json" && "GA_SERVICE_ACCOUNT_JSON is set but is not valid JSON. Paste the whole key file again, from { to }."}
            {status === "missing-fields" && "GA_SERVICE_ACCOUNT_JSON is missing client_email or private_key. Use the JSON key file downloaded from Google Cloud."}
          </p>
        </Notice>
      );
    }
    case "key-rejected":
      return (
        <Notice title="Google rejected the service account key">
          <p>The key may have been deleted or replaced in Google Cloud. Create a new JSON key, update GA_SERVICE_ACCOUNT_JSON in Vercel and redeploy.</p>
          <p className="text-xs text-gray-400">{error.message}</p>
        </Notice>
      );
    case "no-access":
      return <Notice title="Google Analytics has not given this admin access yet">{grant}</Notice>;
    case "api-disabled":
      return (
        <Notice title="The Google Analytics Data API is turned off">
          <p>Enable the &quot;Google Analytics Data API&quot; in the Google Cloud project that owns the service account, then reload this page.</p>
        </Notice>
      );
    case "bad-property":
      return (
        <Notice title="Google Analytics did not recognise the Property ID">
          <p>Check the Property ID on the Settings page. It is the number under Admin, Property details, not the G- measurement ID.</p>
          {grant}
        </Notice>
      );
    default:
      return (
        <Notice title="Could not load analytics right now">
          <p>Google Analytics returned an error. Try again in a few minutes.</p>
          <p className="text-xs text-gray-400">{error.message}</p>
        </Notice>
      );
  }
}

export default async function AnalyticsPage({ searchParams }: { searchParams: SearchParams }) {
  const { range } = await searchParams;
  const days = RANGES.find((r) => String(r) === range) ?? 28;
  const propertyId = await getGaPropertyId();

  let data: Dashboard | null = null;
  let live: number | null = null;
  let error: GaError | null = null;
  if (propertyId) {
    try {
      [data, live] = await Promise.all([getDashboard(propertyId, days), getRealtimeUsers(propertyId).catch(() => null)]);
    } catch (e) {
      error = e instanceof GaError ? e : new GaError("other", e instanceof Error ? e.message : "Unknown error");
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Website traffic from Google Analytics.</p>
        </div>
        {data && (
          <div className="flex items-center gap-3">
            {live !== null && (
              <span className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {live} on the site now
              </span>
            )}
            <nav className="flex rounded-md border border-gray-200 bg-white p-0.5 text-xs" aria-label="Date range">
              {RANGES.map((r) => (
                <Link
                  key={r}
                  href={`/admin/analytics?range=${r}`}
                  aria-current={r === days ? "page" : undefined}
                  className={`rounded px-3 py-1.5 font-medium ${r === days ? "bg-[#0B2A3A] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {r} days
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {!data ? <SetupNotice error={error} /> : <AnalyticsDashboard data={data} days={days} propertyId={propertyId!} />}
    </div>
  );
}

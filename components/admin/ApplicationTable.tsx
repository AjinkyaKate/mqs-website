"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState, useTransition } from "react";
import { updateApplicationStatus } from "@/lib/actions/application";

type Application = {
  id: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  experience: string;
  company: string;
  linkedin: string;
  message: string;
  resumeName: string;
  resumeSize: number;
  consentAt: string;
  createdAt: string;
};

type Props = {
  applications: Application[];
  filters: { status: string; department: string; q: string };
};

const STATUSES = ["all", "new", "reviewed", "shortlisted", "archived"] as const;
const DEPARTMENTS = ["all", "Mechanical", "Electronics", "Software", "Applications", "Service", "Sales", "Operations", "Other"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  reviewed: "bg-gray-100 text-gray-800",
  shortlisted: "bg-green-100 text-green-800",
  archived: "bg-zinc-100 text-zinc-500",
};

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const day = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export default function ApplicationTable({ applications, filters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`/admin/applications?${params.toString()}`);
  }

  function handleStatusChange(id: string, status: string) {
    startTransition(async () => {
      await updateApplicationStatus(id, status);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="h-10 rounded-none border border-gray-300 bg-white px-3 text-sm text-[#0B2A3A]"
          aria-label="Filter by status"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === "all" ? "All statuses" : s}</option>
          ))}
        </select>
        <select
          value={filters.department}
          onChange={(e) => updateFilter("department", e.target.value)}
          className="h-10 rounded-none border border-gray-300 bg-white px-3 text-sm text-[#0B2A3A]"
          aria-label="Filter by department"
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d === "all" ? "All departments" : d}</option>
          ))}
        </select>
        <input
          defaultValue={filters.q}
          onKeyDown={(e) => { if (e.key === "Enter") updateFilter("q", (e.target as HTMLInputElement).value); }}
          placeholder="Search name, email or company"
          className="h-10 w-64 rounded-none border border-gray-300 bg-white px-3 text-sm text-[#0B2A3A]"
          aria-label="Search applications"
        />
        <span className="text-sm text-gray-500">
          {applications.length} {applications.length === 1 ? "application" : "applications"}
        </span>
      </div>

      {applications.length === 0 ? (
        <p className="border border-gray-200 bg-white p-6 text-sm text-gray-500">
          No applications match these filters.
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 bg-white">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Experience</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">Resume</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <Fragment key={a.id}>
                  <tr className="border-t border-gray-100 align-top">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                        className="text-left font-medium text-[#0B2A3A] underline-offset-2 hover:underline"
                      >
                        {a.name}
                      </button>
                      <div className="text-xs text-gray-500">{a.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{a.department}</td>
                    <td className="px-4 py-3 text-gray-700">{a.experience || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">{day(a.createdAt)}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`/api/applications/${a.id}/resume`}
                        className="text-[#0A6A88] underline-offset-2 hover:underline"
                      >
                        {a.resumeName}
                      </a>
                      <div className="text-xs text-gray-500">{mb(a.resumeSize)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        className={`rounded-none px-2 py-1 text-xs font-medium ${STATUS_COLORS[a.status] ?? "bg-gray-100 text-gray-800"}`}
                        aria-label={`Status for ${a.name}`}
                      >
                        {STATUSES.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {expanded === a.id && (
                    <tr className="border-t border-gray-100 bg-gray-50">
                      <td colSpan={6} className="px-4 py-4">
                        <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                          {[
                            ["Phone", a.phone],
                            ["Location", a.location],
                            ["Current company", a.company],
                            ["LinkedIn", a.linkedin],
                            ["Consent given", day(a.consentAt)],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <dt className="text-xs uppercase tracking-wider text-gray-500">{k}</dt>
                              <dd className="mt-1 text-[#0B2A3A]">{v || "—"}</dd>
                            </div>
                          ))}
                        </dl>
                        {a.message && (
                          <div className="mt-4">
                            <div className="text-xs uppercase tracking-wider text-gray-500">Message</div>
                            <p className="mt-1 max-w-3xl whitespace-pre-line text-[#0B2A3A]">{a.message}</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

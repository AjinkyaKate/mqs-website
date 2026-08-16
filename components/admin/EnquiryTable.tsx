"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState, useTransition } from "react";
import { updateEnquiryStatus } from "@/lib/actions/enquiry";

type Enquiry = {
  id: string;
  source: string;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  company: string;
  industry: string | null;
  application: string | null;
  message: string | null;
  partMaterial: string | null;
  defectType: string | null;
  appDetails: string | null;
  sourcePage: string | null;
  createdAt: string;
};

type Props = {
  enquiries: Enquiry[];
  filters: { status: string; source: string; q: string };
};

const STATUSES = ["all", "new", "read", "replied", "closed"] as const;
const SOURCES = ["all", "contact", "product"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  read: "bg-gray-100 text-gray-800",
  replied: "bg-green-100 text-green-800",
  closed: "bg-zinc-100 text-zinc-500",
};

export default function EnquiryTable({ enquiries, filters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/enquiries?${params.toString()}`);
  }

  function handleStatusChange(id: string, status: string) {
    startTransition(async () => {
      await updateEnquiryStatus(id, status);
      router.refresh();
    });
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="h-9 rounded border border-gray-300 bg-white px-3 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.source}
          onChange={(e) => updateFilter("source", e.target.value)}
          className="h-9 rounded border border-gray-300 bg-white px-3 text-sm"
        >
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All sources" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search name, email, company..."
          defaultValue={filters.q}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateFilter("q", e.currentTarget.value);
          }}
          className="h-9 w-64 rounded border border-gray-300 bg-white px-3 text-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No enquiries found
                </td>
              </tr>
            )}
            {enquiries.map((e) => (
              <Fragment key={e.id}>
                <tr
                  onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                  className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                    {new Date(e.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{e.name}</td>
                  <td className="px-4 py-3 text-gray-600">{e.email}</td>
                  <td className="px-4 py-3 text-gray-600">{e.company}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      {e.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={e.status}
                      onClick={(ev) => ev.stopPropagation()}
                      onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                      className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[e.status] || ""}`}
                    >
                      {STATUSES.filter((s) => s !== "all").map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                {expanded === e.id && (
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:grid-cols-3">
                        {e.phone && <Detail label="Phone" value={e.phone} />}
                        {e.industry && <Detail label="Industry" value={e.industry} />}
                        {e.application && <Detail label="Application" value={e.application} />}
                        {e.partMaterial && <Detail label="Part / Material" value={e.partMaterial} />}
                        {e.defectType && <Detail label="Defect Type" value={e.defectType} />}
                        {e.sourcePage && <Detail label="Source Page" value={e.sourcePage} />}
                        {e.message && (
                          <div className="col-span-full">
                            <span className="text-xs text-gray-500">Message</span>
                            <p className="mt-0.5 whitespace-pre-wrap text-gray-800">{e.message}</p>
                          </div>
                        )}
                        {e.appDetails && (
                          <div className="col-span-full">
                            <span className="text-xs text-gray-500">Application Details</span>
                            <p className="mt-0.5 whitespace-pre-wrap text-gray-800">{e.appDetails}</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"}
      </p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-gray-500">{label}</span>
      <p className="mt-0.5 text-gray-800">{value}</p>
    </div>
  );
}

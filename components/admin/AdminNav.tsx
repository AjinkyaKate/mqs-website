"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  {
    href: "/admin/enquiries",
    label: "Enquiries",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    href: "/admin/applications",
    label: "Applications",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6M9 15h6M9 11h3"/>
      </svg>
    ),
  },
  {
    href: "/admin/images",
    label: "Site Images",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    href: "/admin/blog",
    label: "Blog",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
];

export default function AdminNav({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded text-gray-600 transition-colors hover:bg-gray-100"
          aria-label="Menu"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-14 z-50 border-b border-gray-200 bg-white p-3 shadow-lg">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#0B2A3A] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              );
            })}
          </div>
        )}
      </>
    );
  }

  return (
    <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-4">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
        Manage
      </p>
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
              active
                ? "bg-white/15 text-white"
                : "text-white/55 hover:bg-white/8 hover:text-white/85"
            }`}
          >
            <span className={active ? "text-[#16C1F3]" : "text-white/40"}>{item.icon}</span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

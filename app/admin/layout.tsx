import type { Metadata } from "next";
import Image from "next/image";
import { verifySession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import AdminNav from "@/components/admin/AdminNav";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin — MQS Technologies",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await verifySession();

  if (!authed) {
    return <>{children}</>;
  }

  const newCount = await prisma.enquiry.count({ where: { status: "new" } });

  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 flex-col bg-[#0B2A3A] md:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <Image
            src="/assets/mqs-logo-2a-dark.png"
            alt="MQS Technologies"
            width={100}
            height={48}
            className="h-8 w-auto"
          />
        </div>

        {/* Nav */}
        <AdminNav />

        {/* Footer */}
        <div className="border-t border-white/10 p-3">
          <a
            href="/"
            className="flex items-center gap-2 rounded px-3 py-2 text-xs text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View site
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </form>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
          <Image
            src="/assets/mqs-logo-2a-light.png"
            alt="MQS Technologies"
            width={80}
            height={38}
            className="h-7 w-auto"
          />
          <div className="flex items-center gap-2">
            <a
              href="/admin/enquiries?status=new"
              className="relative flex h-9 w-9 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              title={`${newCount} new enquiries`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {newCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {newCount}
                </span>
              )}
            </a>
            <AdminNav mobile />
          </div>
        </header>

        {/* Desktop top bar */}
        <header className="hidden h-14 items-center justify-end border-b border-gray-200 bg-white px-6 md:flex">
          <a
            href="/admin/enquiries?status=new"
            className="relative flex h-9 w-9 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title={`${newCount} new enquiries`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            {newCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {newCount}
              </span>
            )}
          </a>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

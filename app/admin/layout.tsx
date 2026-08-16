import type { Metadata } from "next";
import Image from "next/image";
import { verifySession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import AdminNav from "@/components/admin/AdminNav";

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

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
          <Image
            src="/assets/mqs-logo-2a-light.png"
            alt="MQS Technologies"
            width={80}
            height={38}
            className="h-7 w-auto"
          />
          <AdminNav mobile />
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

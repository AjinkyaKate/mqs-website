import type { Metadata } from "next";
import { verifySession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";

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
      <aside className="hidden w-56 flex-col bg-[#0B2A3A] text-white md:flex">
        <div className="flex h-16 items-center px-5 font-[family-name:var(--font-archivo)] text-lg font-bold tracking-tight">
          MQS Admin
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
          <a
            href="/admin/enquiries"
            className="rounded px-3 py-2 text-sm transition-colors hover:bg-white/10"
          >
            Enquiries
          </a>
        </nav>
        <form action={logoutAction} className="p-3">
          <button
            type="submit"
            className="w-full rounded px-3 py-2 text-left text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            Logout
          </button>
        </form>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

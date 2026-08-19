import { prisma } from "@/lib/db";
import ApplicationTable from "@/components/admin/ApplicationTable";

type SearchParams = Promise<{ status?: string; department?: string; q?: string }>;

export default async function ApplicationsPage({ searchParams }: { searchParams: SearchParams }) {
  const { status, department, q } = await searchParams;

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (department && department !== "all") where.department = department;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { company: { contains: q, mode: "insensitive" } },
    ];
  }

  const applications = await prisma.application.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-2 font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">
        Applications
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Resumes are stored privately and download through this panel only. The careers page tells
        applicants their data is kept for 12 months, so archive and delete accordingly.
      </p>
      <ApplicationTable
        applications={JSON.parse(JSON.stringify(applications))}
        filters={{ status: status || "all", department: department || "all", q: q || "" }}
      />
    </div>
  );
}

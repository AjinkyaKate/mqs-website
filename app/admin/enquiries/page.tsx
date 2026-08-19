import { prisma } from "@/lib/db";
import EnquiryTable from "@/components/admin/EnquiryTable";

type SearchParams = Promise<{ status?: string; source?: string; q?: string }>;

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const { status, source, q } = params;

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (source && source !== "all") where.source = source;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { company: { contains: q, mode: "insensitive" } },
    ];
  }

  const enquiries = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-6 font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">
        Enquiries
      </h1>
      <EnquiryTable
        enquiries={JSON.parse(JSON.stringify(enquiries))}
        filters={{ status: status || "all", source: source || "all", q: q || "" }}
      />
    </div>
  );
}

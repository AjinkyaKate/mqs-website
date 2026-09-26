import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { publicJob } from "@/lib/erp-jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const job = await prisma.jobOpening.findFirst({
      where: {
        OR: [{ id }, { externalId: id }],
        published: true,
        status: "open",
        AND: [{ OR: [{ closesAt: null }, { closesAt: { gte: new Date() } }] }],
      },
    });
    if (!job) return NextResponse.json({ error: "Job opening not found" }, { status: 404 });
    return NextResponse.json({ job: publicJob(job) }, { headers: { "Cache-Control": "no-store" } });
  } catch (caught) {
    console.error("[public-job]", caught);
    return NextResponse.json({ error: "Unable to load job opening" }, { status: 500 });
  }
}

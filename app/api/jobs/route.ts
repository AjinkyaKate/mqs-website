import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { publicJob } from "@/lib/erp-jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const department = request.nextUrl.searchParams.get("department")?.trim();
  const location = request.nextUrl.searchParams.get("location")?.trim();
  const now = new Date();

  try {
    const jobs = await prisma.jobOpening.findMany({
      where: {
        published: true,
        status: "open",
        OR: [{ closesAt: null }, { closesAt: { gte: now } }],
        ...(department ? { department: { equals: department, mode: "insensitive" as const } } : {}),
        ...(location ? { location: { contains: location, mode: "insensitive" as const } } : {}),
      },
      orderBy: [{ openedAt: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(
      { jobs: jobs.map(publicJob), count: jobs.length },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (caught) {
    console.error("[public-jobs]", caught);
    return NextResponse.json({ error: "Unable to load job openings" }, { status: 500 });
  }
}

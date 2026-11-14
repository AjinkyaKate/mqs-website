import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ERP_SYNC_TOKEN_ENV, isAuthorizedSyncRequest } from "@/lib/erp-jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request: Request, { params }: { params: Promise<{ externalId: string }> }) {
  const requestId = randomUUID();
  if (!process.env[ERP_SYNC_TOKEN_ENV]) {
    return NextResponse.json({ success: false, error: "Integration is not configured", requestId }, { status: 503 });
  }
  if (!isAuthorizedSyncRequest(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", requestId },
      { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
    );
  }

  try {
    const { externalId } = await params;
    const current = await prisma.jobOpening.findUnique({ where: { externalId } });
    if (!current) {
      return NextResponse.json({ success: false, error: "Job opening not found", requestId }, { status: 404 });
    }

    const job = await prisma.jobOpening.update({
      where: { externalId },
      data: { status: "closed", published: false },
      select: { externalId: true, status: true, published: true },
    });
    revalidatePath("/careers");
    return NextResponse.json({ success: true, job, requestId });
  } catch (caught) {
    console.error(`[erp-job-delete:${requestId}]`, caught);
    return NextResponse.json(
      { success: false, error: "Unable to close job opening", requestId },
      { status: 500 },
    );
  }
}

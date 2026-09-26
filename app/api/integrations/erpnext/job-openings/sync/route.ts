import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  ERP_SYNC_TOKEN_ENV,
  MAX_SYNC_BODY_BYTES,
  isAuthorizedSyncRequest,
  parseSyncBody,
} from "@/lib/erp-jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function error(message: string, status: number, requestId: string) {
  return NextResponse.json({ success: false, error: message, requestId }, { status });
}

export async function POST(request: Request) {
  const requestId = randomUUID();

  if (!process.env[ERP_SYNC_TOKEN_ENV]) {
    console.error(`[erp-job-sync:${requestId}] ${ERP_SYNC_TOKEN_ENV} is not configured`);
    return error("Integration is not configured", 503, requestId);
  }
  if (!isAuthorizedSyncRequest(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", requestId },
      { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_SYNC_BODY_BYTES) return error("Request body is too large", 413, requestId);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return error("Content-Type must be application/json", 415, requestId);
  }

  try {
    const rawText = await request.text();
    if (Buffer.byteLength(rawText, "utf8") > MAX_SYNC_BODY_BYTES) {
      return error("Request body is too large", 413, requestId);
    }
    let rawBody: unknown;
    try {
      rawBody = JSON.parse(rawText);
    } catch {
      return error("Request body must be valid JSON", 400, requestId);
    }

    const jobs = parseSyncBody(rawBody);
    const results = await prisma.$transaction(async (tx) => {
      const synced: { externalId: string; status: string; published: boolean; action: "created" | "updated" | "skipped" }[] = [];
      for (const job of jobs) {
        const current = await tx.jobOpening.findUnique({ where: { externalId: job.externalId } });
        if (
          current?.sourceUpdatedAt &&
          job.sourceUpdatedAt &&
          current.sourceUpdatedAt.getTime() > job.sourceUpdatedAt.getTime()
        ) {
          synced.push({ externalId: job.externalId, status: current.status, published: current.published, action: "skipped" });
          continue;
        }

        const saved = await tx.jobOpening.upsert({
          where: { externalId: job.externalId },
          create: job,
          update: job,
        });
        synced.push({
          externalId: saved.externalId,
          status: saved.status,
          published: saved.published,
          action: current ? "updated" : "created",
        });
      }
      return synced;
    });

    revalidatePath("/careers");
    return NextResponse.json({ success: true, synchronized: results.length, jobs: results, requestId });
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "Invalid synchronization request";
    if (
      message.startsWith("jobs[") ||
      message.startsWith("Unsupported status") ||
      message.startsWith("At least one") ||
      message.startsWith("A maximum") ||
      message.startsWith("Each job")
    ) {
      return error(message, 400, requestId);
    }
    console.error(`[erp-job-sync:${requestId}]`, caught);
    return error("Unable to synchronize job openings", 500, requestId);
  }
}

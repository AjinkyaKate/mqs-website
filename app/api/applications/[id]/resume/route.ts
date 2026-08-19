import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";

/* Authenticated resume download. Resumes are stored as private blobs, so this is
   the only way to read one: the pathname in the database is not a URL and cannot
   be opened directly. Personal data, so the session check comes first. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await verifySession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const application = await prisma.application.findUnique({ where: { id } });
  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const result = await get(application.resumePath, { access: "private" });
    if (!result?.stream) {
      return NextResponse.json({ error: "Resume file is no longer available" }, { status: 404 });
    }
    return new NextResponse(result.stream as unknown as BodyInit, {
      headers: {
        "Content-Type": result.headers.get("content-type") ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${application.resumeName.replace(/"/g, "")}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Resume file is no longer available" }, { status: 404 });
  }
}

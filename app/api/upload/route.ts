import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const authed = await verifySession();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  const jsonResponse = await handleUpload({
    body,
    request: req,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
      ],
      maximumSizeInBytes: 5 * 1024 * 1024, // 5MB
    }),
    onUploadCompleted: async () => {
      // Could save to DB here, but we do it client-side after upload
    },
  });

  return NextResponse.json(jsonResponse);
}

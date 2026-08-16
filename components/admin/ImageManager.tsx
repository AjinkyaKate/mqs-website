"use client";

import { useRef, useState, useTransition } from "react";
import { saveSiteImage, deleteSiteImage } from "@/lib/actions/images";

const DEFAULT_IMAGES: Record<string, { src: string; alt: string }> = {
  "hero-bg": { src: "/assets/hero-poster.jpg", alt: "Hero background" },
  "hero-inset": { src: "/assets/inset-operator.jpg", alt: "Hero inset" },
};

// Minimum dimensions and aspect ratio tolerance per slot
const SLOT_RULES: Record<string, { minW: number; minH: number; ratio: number; ratioLabel: string }> = {
  "hero-bg": { minW: 1920, minH: 1080, ratio: 16 / 9, ratioLabel: "16:9" },
  "hero-inset": { minW: 668, minH: 1000, ratio: 668 / 1000, ratioLabel: "2:3 (portrait)" },
};
const RATIO_TOLERANCE = 0.15;

function validateImage(file: File, slot: string): Promise<string | null> {
  const rules = SLOT_RULES[slot];
  if (!rules) return Promise.resolve(null);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const ratio = w / h;
      const ratioDiff = Math.abs(ratio - rules.ratio) / rules.ratio;

      if (w < rules.minW || h < rules.minH) {
        resolve(`Image too small: ${w}×${h}px. Minimum required: ${rules.minW}×${rules.minH}px.`);
      } else if (ratioDiff > RATIO_TOLERANCE) {
        resolve(`Wrong aspect ratio (${ratio.toFixed(2)}). Expected ${rules.ratioLabel} (${rules.ratio.toFixed(2)}). Please crop your image.`);
      } else {
        resolve(null);
      }
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve("Could not read image dimensions.");
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageManager({
  slot,
  label,
  description,
  currentUrl,
  currentAlt,
}: {
  slot: string;
  label: string;
  description: string;
  currentUrl?: string;
  currentAlt?: string;
}) {
  const fallback = DEFAULT_IMAGES[slot];
  const [liveUrl, setLiveUrl] = useState<string | null>(currentUrl ?? null);
  const [newPreview, setNewPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState(currentAlt ?? "");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const displayUrl = liveUrl ?? fallback?.src;
  const displayAlt = liveUrl ? (currentAlt || label) : (fallback?.alt || label);
  const isCustom = !!liveUrl;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateImage(file, slot);
    if (error) {
      setMessage({ type: "err", text: error });
      setNewPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setNewPreview(URL.createObjectURL(file));
    setMessage(null);
  }

  async function handleUpload() {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setMessage({ type: "err", text: "Select a file first" });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      // Upload directly to Vercel Blob from browser (dynamic import to avoid Turbopack issue)
      const { upload: blobUpload } = await import("@vercel/blob/client");
      const ext = file.name.split(".").pop() || "jpg";
      const blob = await blobUpload(`site/${slot}.${ext}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      // Save URL to database
      const res = await saveSiteImage(slot, blob.url, alt);
      if (res.error) {
        setMessage({ type: "err", text: res.error });
      } else {
        setMessage({ type: "ok", text: "Uploaded — live on site now" });
        setLiveUrl(blob.url);
        setNewPreview(null);
        setEditing(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Upload failed" });
    } finally {
      setUploading(false);
    }
  }

  function handleRevert() {
    startTransition(async () => {
      const res = await deleteSiteImage(slot);
      if (res.error) {
        setMessage({ type: "err", text: res.error });
      } else {
        setLiveUrl(null);
        setNewPreview(null);
        setAlt("");
        setEditing(false);
        setMessage({ type: "ok", text: "Reverted to default image" });
        if (inputRef.current) inputRef.current.value = "";
      }
    });
  }

  function handleCancel() {
    setNewPreview(null);
    setEditing(false);
    setMessage(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const busy = uploading || isPending;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#0B2A3A]">{label}</h2>
          <p className="mt-0.5 text-xs text-gray-400">{description}</p>
        </div>
        {isCustom ? (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            Custom
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
            Default
          </span>
        )}
      </div>

      {/* Current live image */}
      <div className="mt-4">
        <p className="mb-1.5 text-xs font-medium text-gray-500">Currently live</p>
        <div className="relative aspect-video w-full overflow-hidden rounded border border-gray-100 bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={displayUrl} alt={displayAlt} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Change UI */}
      {!editing ? (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => { setEditing(true); setMessage(null); }}
            className="rounded bg-[#0B2A3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0E3A52]"
          >
            Change Image
          </button>
          {isCustom && (
            <button
              type="button"
              onClick={handleRevert}
              disabled={busy}
              className="rounded border border-amber-200 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50 disabled:opacity-50"
            >
              Revert to Default
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-3 rounded-lg border border-blue-100 bg-blue-50/30 p-4">
          <p className="text-xs font-medium text-blue-700">Upload new image</p>

          {newPreview && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">Preview</p>
              <div className="relative aspect-video w-full overflow-hidden rounded border border-blue-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={newPreview} alt="Preview" className="h-full w-full object-cover" />
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-3 file:rounded file:border-0 file:bg-[#0B2A3A] file:px-3 file:py-1.5 file:text-sm file:text-white file:cursor-pointer hover:file:bg-[#0E3A52]"
          />

          <input
            type="text"
            placeholder="Alt text (accessibility)"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="block w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#16C1F3] focus:outline-none"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleUpload}
              disabled={busy || !newPreview}
              className="rounded bg-[#0B2A3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0E3A52] disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Upload & Go Live"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={busy}
              className="rounded border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && (
        <p className={`mt-3 text-sm ${message.type === "ok" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}

import { prisma } from "@/lib/db";
import ImageManager from "@/components/admin/ImageManager";

const SLOTS = [
  { slot: "hero-bg", label: "Hero Background", desc: "Main hero background — minimum 1920×1080px, 16:9 landscape" },
];

export default async function AdminImagesPage() {
  const images = await prisma.siteImage.findMany();
  const imageMap = Object.fromEntries(images.map((img) => [img.slot, img]));

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">
        Site Images
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Upload or replace images used across the site. Changes go live immediately.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {SLOTS.map(({ slot, label, desc }) => (
          <ImageManager
            key={slot}
            slot={slot}
            label={label}
            description={desc}
            currentUrl={imageMap[slot]?.url}
            currentAlt={imageMap[slot]?.alt}
          />
        ))}
      </div>
    </div>
  );
}

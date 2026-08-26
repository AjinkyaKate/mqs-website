"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const photo = "/assets/application-fork-casting-photo.jpg";
const radiograph = "/assets/application-fork-casting-radiograph.jpg";

export default function XRayTorch() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [beam, setBeam] = useState({ x: 50, y: 50 });
  const [fullView, setFullView] = useState(false);

  const moveBeam = useCallback((clientX: number, clientY: number) => {
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setBeam({
      x: Math.max(0, Math.min(100, ((clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(0, Math.min(100, ((clientY - bounds.top) / bounds.height) * 100)),
    });
  }, []);

  return (
    <div className="overflow-hidden bg-[#071D29]">
      <div
        ref={stageRef}
        className="relative aspect-square w-full touch-none overflow-hidden bg-[#DDE6EB]"
        onPointerMove={(event) => moveBeam(event.clientX, event.clientY)}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          moveBeam(event.clientX, event.clientY);
        }}
      >
        <Image src={photo} alt="Aluminium casting photographed before inspection" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ clipPath: fullView ? "circle(75% at 50% 50%)" : `circle(clamp(70px, 18vw, 150px) at ${beam.x}% ${beam.y}%)` }}
        >
          <Image src={radiograph} alt="Digital radiograph visible through an interactive inspection beam" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        </div>
        {!fullView && (
          <div
            className="pointer-events-none absolute h-[clamp(140px,36vw,300px)] w-[clamp(140px,36vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 shadow-[0_0_0_999px_rgba(8,40,58,.10),inset_0_0_28px_rgba(90,209,247,.35)]"
            style={{ left: `${beam.x}%`, top: `${beam.y}%` }}
            aria-hidden="true"
          />
        )}
        <div className="t-caption pointer-events-none absolute left-4 top-4 border border-white/35 bg-[#071D29]/80 px-3 py-2 text-white backdrop-blur-sm sm:left-5 sm:top-5">
          Move the beam to inspect within
        </div>
        <button
          type="button"
          aria-pressed={fullView}
          onClick={() => setFullView((value) => !value)}
          className="t-button absolute bottom-4 right-4 min-h-11 border border-white/50 bg-[#0B2A3A]/90 px-4 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0B2A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5AD1F7] sm:bottom-5 sm:right-5"
        >
          {fullView ? "Back to beam" : "Show full radiograph"}
        </button>
      </div>

    </div>
  );
}

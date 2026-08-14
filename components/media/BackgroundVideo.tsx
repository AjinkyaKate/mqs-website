"use client";

import { useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────
   BackgroundVideo — a muted, looping, cover-filled local <video>
   used as a section background. Forces muted inline autoplay
   (React can drop the `muted` attribute), and plays only while the
   band is in view. Native <video> autoplays reliably on mobile.
   Respects prefers-reduced-motion (stays paused on the poster).

   Optional `playing` prop lets a caller (e.g. a play/pause button)
   gate playback: the video plays only when `playing` AND in view.
   Omit it and the video plays whenever it's in view.
   Decorative → aria-hidden.
   ────────────────────────────────────────────────────────────── */

export default function BackgroundVideo({
  src,
  poster,
  className = "",
  playing = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  playing?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const want = useRef(playing);
  want.current = playing;

  const apply = () => {
    const v = ref.current;
    if (!v) return;
    if (want.current && inView.current) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  };

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      (entries) => {
        inView.current = entries[0].isIntersecting;
        apply();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

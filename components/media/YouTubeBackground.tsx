"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   YouTubeBackground — a YouTube video used as a seamless, muted,
   looping COVER-FILL background (no YouTube chrome, no branding,
   pointer-events off) so it blends like a native background <video>.

   • driven by the YouTube IFrame API (youtube-nocookie host)
   • cover-sized via JS so the 16:9 video fills any container with
     no letterboxing (ResizeObserver keeps it covered)
   • plays only when `playing` AND the band is scrolled into view;
     pauses when either is false — so it starts on scroll-in and the
     caller's play/pause button toggles it
   ────────────────────────────────────────────────────────────── */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
function loadAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  });
  return apiPromise;
}

export default function YouTubeBackground({
  videoId,
  playing,
  start = 0,
  className = "",
}: {
  videoId: string;
  playing: boolean;
  /** seconds to skip at the head; the loop also restarts here */
  start?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const ready = useRef(false);
  const inView = useRef(false);
  const want = useRef(playing);
  want.current = playing;
  // veil stays opaque (navy) until the video is actually playing, hiding
  // YouTube's unstarted thumbnail + centre play-button; then it fades out.
  const [revealed, setRevealed] = useState(false);

  const apply = () => {
    const p = playerRef.current;
    if (!p || !ready.current) return;
    try {
      if (want.current && inView.current) p.playVideo();
      else p.pauseVideo();
    } catch {
      /* player not ready */
    }
  };

  const cover = () => {
    const wrap = wrapRef.current;
    const p = playerRef.current;
    if (!wrap || !p?.getIframe) return;
    let iframe: HTMLIFrameElement | null = null;
    try {
      iframe = p.getIframe();
    } catch {
      return;
    }
    if (!iframe) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (!w || !h) return;
    // proper 16:9 cover — centred, no over-zoom. YouTube's unstarted
    // thumbnail + centre play-button are hidden by the veil below, which
    // fades once the video is actually playing (playing state has no chrome).
    const scale = Math.max(w / 16, h / 9);
    const iw = Math.ceil(16 * scale);
    const ih = Math.ceil(9 * scale);
    Object.assign(iframe.style, {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: `${iw}px`,
      height: `${ih}px`,
      maxWidth: "none",
      border: "0",
      pointerEvents: "none",
    });
  };

  useEffect(() => {
    let cancelled = false;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;

    loadAPI().then(() => {
      if (cancelled || !targetRef.current) return;
      playerRef.current = new window.YT.Player(targetRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          start,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
        },
        events: {
          onReady: (e: any) => {
            ready.current = true;
            e.target.mute();
            cover();
            apply();
          },
          onStateChange: (e: any) => {
            // reveal the video once it's actually playing (no chrome then)
            if (e.data === window.YT.PlayerState.PLAYING) setRevealed(true);
            // manual loop that restarts past the intro (`start`), not at 0
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(start, true);
              e.target.playVideo();
            }
          },
        },
      });

      io = new IntersectionObserver(
        (entries) => {
          inView.current = entries[0].isIntersecting;
          apply();
        },
        { threshold: 0.25 },
      );
      ro = new ResizeObserver(() => cover());
      if (wrapRef.current) {
        io.observe(wrapRef.current);
        ro.observe(wrapRef.current);
      }
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      ro?.disconnect();
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* noop */
      }
      playerRef.current = null;
      ready.current = false;
    };
  }, [videoId, start]);

  useEffect(() => {
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`} style={{ pointerEvents: "none" }} aria-hidden="true">
      <div ref={targetRef} />
      {/* navy veil — hides YouTube's unstarted thumbnail + play-button until playing */}
      <div
        className="absolute inset-0"
        style={{
          background: "#0B2A3A",
          opacity: revealed ? 0 : 1,
          transition: "opacity 500ms cubic-bezier(.22,.61,.36,1)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * React sets `muted` as a property, not an HTML attribute, so server-rendered
 * markup arrives unmuted and browsers refuse to autoplay it. Muting and
 * starting playback from the client fixes that. It also pauses off-screen.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover saturate-50"
      poster={poster}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}

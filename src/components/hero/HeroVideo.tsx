"use client";

import { useEffect, useRef, useState } from "react";
import { heroVideo } from "@/content/club";
import { asset } from "@/lib/asset";

/**
 * Der Clubclip als Hero.
 *
 * Das Material ist hochkant (720×1280). Statt es auf Desktopbreite
 * hochzuskalieren (unscharf), steht es als vertikale Kinofläche im Raum —
 * die Seiten füllt ein stark unscharfer Lichtabdruck desselben Bildes.
 * Auf dem Telefon deckt der Clip den Screen nativ formatfüllend.
 *
 * Steuerung: Der Clip pausiert automatisch, sobald der Hero aus dem
 * Sichtfeld ist, und lässt sich jederzeit anhalten (WCAG 2.2.2).
 * Bei `prefers-reduced-motion` startet er gar nicht erst.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(prefersReduced);

    if (prefersReduced) {
      video.pause();
      setPlaying(false);
      return;
    }

    // Außerhalb des Sichtfelds nicht dekodieren — spart Akku und Hauptthread.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused && video.dataset.userPaused !== "true") {
            void video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.dataset.userPaused = "false";
      void video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.dataset.userPaused = "true";
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {/* Lichtabdruck: füllt auf Desktop die Fläche neben der Hochkantfläche. */}
      <div
        data-hero-ambient
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        style={{
          backgroundImage: `url(${asset(heroVideo.ambient)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(96px) saturate(1.15) brightness(0.46)",
          transform: "scale(1.35)",
          opacity: 0.16,
        }}
      />

      {/* Die eigentliche Videofläche. Position im Ruhezustand: rechts,
          62 % Höhe. Die Ankunft (formatfüllend, mittig) setzt GSAP. */}
      <div
        data-hero-video-panel
        className="absolute z-20 overflow-hidden
                   inset-0
                   md:inset-auto md:top-[18svh] md:right-[7vw] md:h-[64svh] md:w-[36svh]
                   md:rounded-[3px]
                   md:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]
                   md:ring-1 md:ring-ivory/12"
        style={{ willChange: "transform" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={asset(heroVideo.poster)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Clubaufnahme aus dem Black Medusa: Logowand, DJ-Pult, Tanzfläche und Lichtanlage"
          style={{ filter: "saturate(0.86) contrast(1.12) brightness(0.8)" }}
        >
          <source src={asset(heroVideo.webm)} type="video/webm" />
          <source src={asset(heroVideo.mp4)} type="video/mp4" />
        </video>

        {/* Gradierung: hält das bunte Laserlicht im dunklen Farbklima. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(118% 78% at 50% 46%, transparent 30%, rgba(5,4,6,0.42) 76%, rgba(5,4,6,0.88) 100%)",
          }}
        />
        {/* Schleier, den die Scrollchoreografie hochzieht, wenn das Video zurücktritt. */}
        <div
          data-hero-veil
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-void opacity-[0.86] md:opacity-[0.5]"
        />
      </div>

      {/* Bild-Steuerung — bewusst klein, aber echt bedienbar. */}
      <button
        type="button"
        onClick={toggle}
        data-hero-videoctl
        className="absolute right-2 top-[4.25rem] z-40 flex h-11 items-center gap-2 px-3
                   text-[0.625rem] font-bold tracking-[0.2em] text-mute
                   transition-colors hover:text-ivory md:bottom-7 md:right-7 md:top-auto"
      >
        <span
          aria-hidden="true"
          className="flex h-2.5 w-2.5 items-center justify-center"
        >
          {playing ? (
            <svg viewBox="0 0 10 10" width="10" height="10">
              <path d="M2 1v8M8 1v8" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          ) : (
            <svg viewBox="0 0 10 10" width="10" height="10">
              <path d="M2 1l7 4-7 4z" fill="currentColor" />
            </svg>
          )}
        </span>
        {playing ? "CLIP PAUSIEREN" : reduced ? "CLIP ABSPIELEN" : "CLIP STARTEN"}
      </button>
    </>
  );
}

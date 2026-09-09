"use client";

import { useEffect, useRef, useState } from "react";
import type { EventArtwork } from "@/content/events";
import { asset } from "@/lib/asset";

/**
 * Das Event-Artwork als Bewegtbild — bildschirmfüllend wie der Clubclip im
 * Hero, nicht als Videoelement mit Rändern.
 *
 * Wie der Bildschirm gedeckt wird, entscheidet das Seitenverhältnis des
 * Geräts; die Regeln stehen in globals.css bei `.event-fill`.
 *
 * Gestartet wird der Clip nicht von seiner eigenen Sichtbarkeit, sondern von
 * der Hero-Choreografie: genau dann, wenn die Clubwelt zu verpuffen beginnt.
 * So fällt der Impact mit dem Übergang zusammen, statt ihn anzukündigen.
 */
export default function EventClip({
  artwork,
  active,
}: {
  artwork: EventArtwork;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const warmed = useRef(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* ERSTLAST.
     Der Clip liegt eine Bildschirmhöhe tiefer und wird erst beim Verlassen
     des Hero gebraucht — trotzdem zöge er als `preload="auto"` rund ein
     Megabyte in genau dem Moment, in dem das Hero-Video die Leitung
     braucht. Deshalb kommt er, wenn der Browser Luft hat: Dann ist er
     gepuffert, bevor jemand dort ankommt, ohne den ersten Bildschirm zu
     verzögern. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    const warm = () => {
      if (warmed.current || !videoRef.current) return;
      warmed.current = true;
      videoRef.current.preload = "auto";
      videoRef.current.load();
    };

    /* Zwei Sekunden: Bis dahin hat das Hero-Video seinen Vorlauf und der
       erste Bildschirm steht. Bewusst ein einfacher Timer statt
       requestIdleCallback — der ist nicht überall da, und diese Entscheidung
       ist es nicht wert, dafür eine Fallunterscheidung zu pflegen. */
    const id = window.setTimeout(warm, 2200);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const onEnded = () => {
      video.loop = true;
      void video.play().catch(() => {});
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    if (!active) {
      video.pause();
      video.loop = false;
      return;
    }
    /* Wer schneller unten ist als der Leerlauf: jetzt sofort laden. */
    if (!warmed.current) {
      warmed.current = true;
      video.preload = "auto";
    }
    video.loop = false;
    try {
      video.currentTime = 0;
    } catch {
      /* Noch keine Metadaten: Der Browser startet ohnehin bei 0. */
    }
    void video.play().catch(() => {
      /* Blockiert der Browser die Wiedergabe, bleibt das Standbild stehen —
         es trägt dieselbe Information wie die Animation. */
    });
  }, [active, reduced]);

  const stage = "event-fill absolute inset-0 z-10 h-full w-full";

  /** Der Lichtabdruck neben dem Hochformat: kein Hintergrund, das Bild selbst. */
  const spill = (
    <div
      aria-hidden="true"
      className="event-spill pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `url(${asset(artwork.poster)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(90px) saturate(1.2) brightness(0.42)",
        transform: "scale(1.5)",
      }}
    />
  );

  if (reduced || (!artwork.mp4 && !artwork.webm)) {
    return (
      <>
        {spill}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(artwork.poster)} alt={artwork.description} className={stage} />
      </>
    );
  }

  return (
    <>
      {spill}
      <video
        ref={videoRef}
        className={stage}
        muted
        playsInline
        preload="metadata"
        aria-label={artwork.description}
      >
        {artwork.webm && <source src={asset(artwork.webm)} type="video/webm" />}
        {artwork.mp4 && <source src={asset(artwork.mp4)} type="video/mp4" />}
      </video>
    </>
  );
}

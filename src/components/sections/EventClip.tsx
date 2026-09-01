"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/content/event";
import { asset } from "@/lib/asset";

/**
 * Das Event-Creative als Bewegtbild.
 *
 * Kein Hintergrundvideo und kein Videoplayer: eine Motion-Graphic, die im
 * Vordergrund steht, einmal läuft und danach auf ihrem Schlussbild stehen
 * bleibt — dem Bild mit der vollständigen Eventinformation.
 *
 * Deshalb bewusst ohne Bedienelemente: Vier Sekunden liegen unter der
 * Schwelle, ab der bewegte Inhalte eine Pausiermöglichkeit brauchen. Wer
 * zurückscrollt, sieht die Animation erneut von vorn.
 *
 * Bei `prefers-reduced-motion` läuft nichts — dann steht das Schlussbild
 * sofort da, ohne Informationsverlust.
 */
export default function EventClip() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const { clip } = event;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* Blockiert der Browser das Abspielen, bleibt das Poster stehen —
               es trägt dieselbe Information wie die Animation. */
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  /* Die Bühne wird über die HÖHE bemessen, nicht über die Breite: Das
     Creative trägt bis an den unteren Rand Text (Tischbuchung, Adresse).
     Randlos über die volle Breite wäre auf dem Telefon zwar größer, würde
     dieses Ende aber aus dem Bild schieben. Nie beschnitten, nie verzerrt. */
  const stage =
    "relative mx-auto aspect-[9/16] h-[min(calc(100svh-5rem),40rem)] w-auto bg-black " +
    "md:h-[min(78svh,46rem)] md:shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]";

  if (reduced || (!clip.mp4 && !clip.webm)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(clip.poster)}
        alt={clip.description}
        className={`${stage} object-contain`}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={`${stage} object-contain`}
      poster={asset(clip.poster)}
      muted
      playsInline
      preload="metadata"
      aria-label={clip.description}
    >
      {clip.webm && <source src={asset(clip.webm)} type="video/webm" />}
      {clip.mp4 && <source src={asset(clip.mp4)} type="video/mp4" />}
    </video>
  );
}

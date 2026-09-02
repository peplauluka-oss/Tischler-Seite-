"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/content/event";
import { asset } from "@/lib/asset";

/**
 * Das Event-Creative als Bewegtbild — bildschirmfüllend wie der Clubclip
 * im Hero, nicht als Videoelement mit Rändern.
 *
 * Die ausgelieferte Fassung ist 9:20 und bringt ihre weichen Ränder selbst
 * mit (siehe content/event.ts), deshalb deckt sie jedes Telefon vollflächig.
 *
 * Der Clip wird nicht von seiner eigenen Sichtbarkeit gestartet, sondern von
 * der Hero-Choreografie: Genau in dem Moment, in dem die Hero-Welt zu
 * verpuffen beginnt, läuft er ab Sekunde null los. So fällt der goldene
 * Impact mit dem Übergang zusammen — er ist der Übergang und kündigt ihn
 * nicht an. Scrollt man zurück, beginnt er beim nächsten Mal wieder von vorn.
 *
 * Nach dem einen ungeteilten Durchlauf geht er in die Schleife. Bewusst ohne
 * Bedienelemente: Vier Sekunden liegen unter der Schwelle, ab der bewegte
 * Inhalte eine Pausiermöglichkeit brauchen. Bei `prefers-reduced-motion`
 * steht das Motiv sofort da — ohne Informationsverlust.
 */
export default function EventClip({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const { clip } = event;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    /* Erst der eine große Durchlauf, danach die Schleife: Der Impact soll
       einmal ungeteilt wirken, das Plakat danach in Bewegung bleiben. */
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

  /* Wie der Bildschirm gedeckt wird, entscheidet das Seitenverhältnis des
     Geräts — die Regeln dazu stehen in globals.css bei `.event-fill`. */
  const stage = "event-fill absolute inset-0 z-10 h-full w-full";

  /** Der Lichtabdruck neben dem Hochformat: kein Hintergrund, das Bild selbst. */
  const spill = (
    <div
      aria-hidden="true"
      className="event-spill pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `url(${asset(clip.poster)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(90px) saturate(1.2) brightness(0.42)",
        transform: "scale(1.5)",
      }}
    />
  );

  if (reduced || (!clip.mp4 && !clip.webm)) {
    return (
      <>
        {spill}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(clip.poster)} alt={clip.description} className={stage} />
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
        preload="auto"
        aria-label={clip.description}
      >
        {clip.webm && <source src={asset(clip.webm)} type="video/webm" />}
        {clip.mp4 && <source src={asset(clip.mp4)} type="video/mp4" />}
      </video>
    </>
  );
}

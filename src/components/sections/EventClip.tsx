"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/content/event";
import { asset } from "@/lib/asset";

/**
 * Das Event-Creative als Bewegtbild — der Moment selbst, kein eingebettetes
 * Video.
 *
 * Der Clip bleibt verdeckt, solange die Bühne noch hereinschiebt: Schwarz,
 * volle Fläche. Erst wenn der Bildschirm ihm gehört, steht er da und läuft
 * von der ersten Sekunde an. Der goldene Impact des Creatives ist damit der
 * Übergang aus dem Hero — es braucht keinen zweiten, nachgebauten Effekt und
 * keine halb abgespielte Animation im Anschnitt.
 *
 * Nach dem einen ungeteilten Durchlauf geht er in die Schleife. Bewusst ohne
 * Bedienelemente: Vier Sekunden liegen unter der Schwelle, ab der bewegte
 * Inhalte eine Pausiermöglichkeit brauchen. Bei `prefers-reduced-motion`
 * steht das Motiv sofort da — ohne Informationsverlust.
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

    /* Erst der eine große Durchlauf, danach die Schleife: Der Impact soll
       einmal ungeteilt wirken, das Plakat danach in Bewegung bleiben. */
    const onEnded = () => {
      video.loop = true;
      void video.play().catch(() => {});
    };
    video.addEventListener("ended", onEnded);

    let started = false;
    let safety: number | undefined;

    const start = () => {
      if (!started) {
        started = true;
        window.clearTimeout(safety);
        video.dataset.armed = "true";
        try {
          video.currentTime = 0;
        } catch {
          /* Noch keine Metadaten: Der Browser startet ohnehin bei 0. */
        }
      }
      void video.play().catch(() => {
        /* Blockiert der Browser die Wiedergabe, bleibt das Standbild stehen —
           es trägt dieselbe Information wie die Animation. */
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        /* Ab hier gehört der Bildschirm dem Creative — jetzt, und keinen
           Pixel früher, schlägt es auf. */
        if (entry.intersectionRatio >= 0.8 || entry.boundingClientRect.top <= 2) {
          start();
          return;
        }
        /* Ungewöhnliche Viewports (Browserleisten, Zoom) erreichen die
           Schwelle womöglich nie — dann zählt schlicht, dass die Bühne den
           Blick hat. */
        if (entry.intersectionRatio >= 0.5 && !started && safety === undefined) {
          safety = window.setTimeout(start, 2500);
        }
        if (entry.intersectionRatio <= 0.15) {
          video.pause();
        }
      },
      { threshold: [0, 0.15, 0.5, 0.8, 1] },
    );

    observer.observe(video);
    return () => {
      window.clearTimeout(safety);
      video.removeEventListener("ended", onEnded);
      observer.disconnect();
    };
  }, []);

  /* Breite führt auf dem Telefon, Höhe auf dem Desktop — je nachdem, was
     zuerst an die Bildschirmkante stößt. `object-contain` garantiert, dass
     nichts abgeschnitten wird, falls beides einmal knapp wird. */
  const stage =
    "relative z-10 mx-auto block h-full w-full object-contain md:w-auto";

  if (reduced || (!clip.mp4 && !clip.webm)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset(clip.poster)} alt={clip.description} className={stage} />
    );
  }

  return (
    <video
      ref={videoRef}
      className={`event-clip ${stage}`}
      muted
      playsInline
      preload="auto"
      aria-label={clip.description}
    >
      {clip.webm && <source src={asset(clip.webm)} type="video/webm" />}
      {clip.mp4 && <source src={asset(clip.mp4)} type="video/mp4" />}
    </video>
  );
}

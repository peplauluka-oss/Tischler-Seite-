"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/content/event";
import { asset } from "@/lib/asset";

/**
 * Das Event-Creative als Bewegtbild — bildschirmfüllender Moment, kein
 * eingebettetes Video.
 *
 * Auf dem Telefon nimmt der Clip die volle Breite, auf großen Schirmen die
 * volle Höhe. Beschnitten wird er nie: Das Creative trägt bis an den unteren
 * Rand Text (Tischbuchung, Adresse). Was neben dem Hochformat frei bleibt,
 * füllt der Clip mit seinem eigenen Licht — nicht mit Layout.
 *
 * Er läuft einmal und bleibt auf dem Schlussbild stehen. Bewusst ohne
 * Bedienelemente: Vier Sekunden liegen unter der Schwelle, ab der bewegte
 * Inhalte eine Pausiermöglichkeit brauchen. Bei `prefers-reduced-motion`
 * steht das Schlussbild sofort da — ohne Informationsverlust.
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* Blockiert der Browser die Wiedergabe, bleibt das Schlussbild
               stehen — es trägt dieselbe Information wie die Animation. */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => {
      video.removeEventListener("ended", onEnded);
      observer.disconnect();
    };
  }, []);

  /* Breite führt auf dem Telefon, Höhe auf dem Desktop — je nachdem, was
     zuerst an die Bildschirmkante stößt. `object-contain` garantiert, dass
     nichts abgeschnitten wird, falls beides einmal knapp wird. */
  const stage =
    "relative mx-auto block h-full w-full object-contain md:w-auto";

  if (reduced || (!clip.mp4 && !clip.webm)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset(clip.poster)} alt={clip.description} className={stage} />
    );
  }

  return (
    <video
      ref={videoRef}
      className={stage}
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

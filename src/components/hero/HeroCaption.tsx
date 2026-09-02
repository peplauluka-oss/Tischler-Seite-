"use client";

import { QuietLink, ReserveButton } from "@/components/ui/Cta";
import { club } from "@/content/club";
import { event } from "@/content/event";

/**
 * DIE AUSSAGE IM HERO.
 *
 * Der Clip allein macht noch keinen Auftritt — ohne Worte bleibt er ein
 * Video, das zufällig oben steht. Deshalb liegt hier eine Behauptung drin,
 * und zwar die einzige, die dieser Laden wirklich von anderen unterscheidet:
 * Balkan, Türkçe, Arabic. „Drei Sprachen“ ist kein Bild, das erfunden wurde
 * — die Zeile darunter nennt sie beim Namen.
 *
 * Reihenfolge: Wer wir sind und wo → die Aussage → woraus sie besteht →
 * die Handlung. Nichts davon ist ein Textblock über dem Video; die Zeilen
 * sitzen in der dunklen Hälfte des Bildes und gehören zur Komposition.
 */
export default function HeroCaption() {
  return (
    <div className="w-full max-w-[44rem]">
      <div data-reveal="kicker" className="hero-reveal flex items-center gap-3">
        <span className="h-px w-7 bg-ember" aria-hidden="true" />
        <span className="label">
          {club.name} · {club.district}
        </span>
      </div>

      <h1
        data-reveal="claim"
        /* Bis 1024 liegt die Zeile über dem formatfüllenden Bild, darüber
           steht sie neben der Videofläche — dort begrenzt deren Kante die
           Spalte, nicht der Bildschirm. */
        className="display display-stack mt-5 text-ivory md:mt-7
                   text-[clamp(2.6rem,10.5vw,5.25rem)]
                   lg:text-[clamp(3rem,7.3vw,6.5rem)]"
      >
        {["Die Nacht spricht", "drei Sprachen."].map((line) => (
          <span key={line} className="hero-reveal block overflow-hidden pb-[0.05em]">
            <span data-claim-line className="block">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p
        data-reveal="sub"
        className="hero-reveal mt-5 text-[0.75rem] font-bold uppercase tracking-[0.3em] text-mute md:mt-6 md:text-[0.8125rem]"
      >
        {event.music}
      </p>

      <div
        data-reveal="cta"
        className="hero-reveal mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8 md:mt-10"
      >
        <ReserveButton className="w-full sm:w-auto" />
        <QuietLink target="event" label="Zum Event" />
      </div>
    </div>
  );
}

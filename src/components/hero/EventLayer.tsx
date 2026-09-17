"use client";

import Countdown from "@/components/hero/Countdown";
import { GuestlistButton, TableLink } from "@/components/ui/Cta";
import { asset } from "@/lib/asset";
import { club } from "@/content/club";
import {
  eventDate,
  eventFullTitle,
  type MedusaEvent,
} from "@/content/events";

/**
 * DER EVENT-ZUSTAND DES HERO.
 *
 * Keine eigene Section: Diese Ebene liegt im selben Viewport wie das
 * Clubvideo, nur darunter. Die Hero-Welt reißt beim Scrollen auf — und was
 * darunter zum Vorschein kommt, ist bereits fertig gezeichnet. Deshalb gibt
 * es zwischen beiden Zuständen keinen schwarzen Frame und keinen Sprung.
 *
 * Danach bleibt die Bühne stehen und entwickelt sich weiter: Erst gehört der
 * Bildschirm dem Artwork allein, dann tritt es einen Schritt zurück und die
 * Angaben zur Nacht steigen darüber auf. Beides passiert in demselben
 * Viewport — die Information ist Teil des Takeovers, kein Abschnitt danach.
 *
 * Gesteuert wird das von der Hero-Timeline (siehe Hero.tsx, CUE.eventInfo);
 * hier stehen nur die Ebenen und ihre Ruhezustände.
 */
export default function EventLayer({
  event,
  upcoming,
  active,
}: {
  event: MedusaEvent;
  upcoming: boolean;
  active: boolean;
}) {
  const date = eventDate(event);
  const lead = event.occasion ?? event.headliner ?? "Clubnacht";
  const second = event.occasion ? event.headliner : null;

  return (
    <div
      data-event-layer
      className={`absolute inset-0 z-10 overflow-hidden bg-black ${
        active ? "" : "pointer-events-none"
      }`}
    >
      {/* Die vollständige Information einmal maschinenlesbar — das Bild
          allein sagt Screenreadern und Suchmaschinen nichts. */}
      <h2 className="sr-only">
        {eventFullTitle(event)} — {date.long}, Einlass {date.time} Uhr
      </h2>

      {/* DAS BILD DER NACHT.
          Eine Aufnahme aus dem Laden, randlos — kein Plakat in einem Rahmen,
          kein zweiter, unscharfer Abzug dahinter. Welchen Beschnitt ein
          Gerät bekommt, entscheidet sein Seitenverhältnis: Hochkant steht
          die schmale Fassung oben und läuft nach unten ins Dunkel aus, damit
          die beiden nicht am Rand abgeschnitten werden; ab Querformat deckt
          die ganze Aufnahme die Bühne. Geladen wird nur die Fassung, die das
          Gerät auch zeigt — deshalb <picture> und nicht zwei Bilder. Die
          Maße stehen in globals.css bei `.event-frame`. */}
      <div data-event-art className="absolute inset-0">
        <picture className="event-frame">
          <source
            media="(min-aspect-ratio: 1/1)"
            srcSet={asset(event.artwork.quer.src)}
            width={event.artwork.quer.width}
            height={event.artwork.quer.height}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(event.artwork.hoch.src)}
            alt=""
            width={event.artwork.hoch.width}
            height={event.artwork.hoch.height}
            className="event-photo"
          />
        </picture>
        <div aria-hidden="true" className="event-frame event-scrim" />
      </div>

      {/* Die Einordnung während des reinen Bildmoments. Sie sitzt im weichen
          Rand über dem Motiv und verdeckt nichts. */}
      <div
        data-event-tag
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center
                   px-5 pb-8 pt-[max(1.1rem,3.5svh)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,4,6,0.82) 0%, rgba(5,4,6,0.42) 45%, rgba(5,4,6,0) 100%)",
        }}
      >
        <span className="flex items-center gap-3">
          <span className="h-px w-6 bg-ember" />
          <span className="label" style={{ color: "var(--color-ivory)" }}>
            {upcoming ? "Next Event" : "Letzte Nacht"}
          </span>
        </span>
      </div>

      {/* DIE ANGABEN ZUR NACHT.
          Reihenfolge nach dem, was den Gast zuerst interessiert: Anlass,
          dann wer spielt, dann wann. Das Line-up steht klein darunter, die
          Handlung zuletzt — und der Countdown ganz am Rand, weil er ein
          Lebenszeichen ist und keine Überschrift. */}
      <div
        data-event-info
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5
                   pb-[max(1.4rem,env(safe-area-inset-bottom))] pt-28 md:px-[7vw] md:pb-10 md:pt-32"
        style={{
          background:
            "linear-gradient(0deg, rgba(5,4,6,0.97) 0%, rgba(5,4,6,0.93) 42%, rgba(5,4,6,0.6) 70%, rgba(5,4,6,0) 100%)",
        }}
      >
        <div className="pointer-events-auto mx-auto w-full max-w-[1560px]">
          <span className="label label-accent">
            {upcoming ? "Next Event" : "Letzte Nacht"}
          </span>

          <h3 className="display display-stack mt-2 max-w-[16ch] text-[clamp(2.25rem,9vw,5rem)] text-ivory">
            {lead}
          </h3>

          {second && (
            <p
              className="display mt-1 text-[clamp(1.5rem,6vw,3rem)] leading-[0.9]"
              style={{ color: "var(--color-gold)" }}
            >
              mit {second}
            </p>
          )}

          <p className="display mt-3 text-[clamp(1rem,3.6vw,1.5rem)] text-mute">
            <time dateTime={date.iso}>{date.short}</time> · Einlass {date.time}
          </p>

          {(event.support.length > 0 || event.music) && (
            <p className="mt-3 max-w-[42ch] text-[0.75rem] leading-relaxed text-mute md:text-[0.8125rem]">
              {[...event.support, event.music].filter(Boolean).join(" · ")}
            </p>
          )}

          {/* Die Konditionen der Nacht — was am Einlass gilt und was es an
              Tischen gibt. Dieselbe Zeile wie das Line-up, nur eine Stufe
              heller: Es ist die Angabe, die über das Kommen entscheidet. */}
          {event.notes.length > 0 && (
            <p className="mt-1.5 max-w-[42ch] text-[0.75rem] leading-relaxed text-ivory/75 md:text-[0.8125rem]">
              {event.notes.join(" · ")}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-7">
            {upcoming && event.guestlist && (
              <GuestlistButton eventSlug={event.slug} />
            )}
            {upcoming && event.tables && <TableLink eventSlug={event.slug} />}
            {upcoming && <Countdown event={event} className="md:ml-auto" />}
          </div>

          {/* Wo und worüber. Ein Aushang nennt beides; die Seite hatte es
              bisher nur weiter unten stehen, weil das alte Plakat es im Bild
              trug. Jetzt trägt das Bild eine Aufnahme — also steht es hier. */}
          <p className="mt-5 text-[0.75rem] leading-relaxed text-mute">
            {club.address} · {club.postcode}
            {event.tables && (
              <>
                {" · Tischbuchung "}
                <a
                  href={club.phoneHref}
                  className="inline-block py-1 link-inline"
                >
                  {club.phone}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

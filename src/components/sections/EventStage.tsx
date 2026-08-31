import Image from "next/image";
import Countdown from "@/components/hero/Countdown";
import { ReserveButton } from "@/components/ui/Cta";
import { MedusaMark } from "@/components/ui/Brand";
import Reveal from "@/components/ui/Reveal";
import { event } from "@/content/event";
import { club } from "@/content/club";
import { asset } from "@/lib/asset";

/**
 * Platzhalter, solange kein Instagram-Creative hinterlegt ist.
 *
 * Bewusst KEIN nachgebautes Event-Plakat: Das Artwork macht der Club, nicht
 * die Website. Der Rahmen zeigt nur Format und Position — sobald
 * `event.artwork.src` gesetzt ist, verschwindet er ersatzlos.
 */
function ArtworkPlaceholder() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 bg-ink px-6 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-3 border border-ivory/12 md:inset-5"
      />
      <MedusaMark size={44} className="relative text-ivory/45" />
      <div className="relative">
        <p className="label">Event-Artwork</p>
        <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-mute">
          Hier steht das Instagram-Creative des Clubs. Es wird hochgeladen,
          nicht nachgebaut.
        </p>
        <p className="mt-4 text-[0.6875rem] font-bold tracking-[0.18em] text-ember-soft/90">
          FORMAT 4:5 · 1080 × 1350
        </p>
      </div>
    </div>
  );
}

/** Kennzeichnet unbestätigte Angaben, statt etwas zu behaupten. */
function Tbc() {
  return (
    <span className="ml-1.5 align-middle text-[0.5625rem] font-bold tracking-[0.16em] text-ember-soft/85">
      TBC
    </span>
  );
}

/**
 * DIE EVENT-BÜHNE.
 *
 * Das Kampagnenbild trägt die Emotion, die Oberfläche nur die Funktion.
 * Deshalb: Artwork groß und ungestört, Text daneben statt darüber, und
 * genau eine Aktion. Auf dem Telefon liegt das Bild oben, danach folgt in
 * Lesereihenfolge, was zur Entscheidung nötig ist.
 */
export default function EventStage() {
  const { artwork } = event;

  if (!event.active) {
    return (
      <section id="event" className="scroll-mt-16 px-5 py-28 md:px-[7vw]">
        <p className="label">Aktuell kein Termin</p>
        <p className="display mt-4 text-[clamp(2.5rem,7vw,5rem)] text-ivory">
          Das nächste Event wird angekündigt
        </p>
      </section>
    );
  }

  return (
    <section
      id="event"
      className="relative scroll-mt-16 overflow-hidden px-5 pb-24 pt-20 md:px-[7vw] md:pb-32 md:pt-28"
    >
      {/* Ein einzelner, sehr weicher Lichtschein — kein Verlaufsteppich. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle, rgba(224,27,15,0.65) 0%, transparent 62%)",
        }}
      />

      <div className="relative grid gap-10 md:grid-cols-12 md:items-center md:gap-0">
        {/* ARTWORK — das Hauptvisual. */}
        <Reveal className="md:col-span-6 md:col-start-1 md:row-start-1">
          <figure
            className="relative w-full overflow-hidden bg-ink shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]"
            style={{ aspectRatio: artwork.ratio.replace("/", " / ") }}
          >
            {artwork.src ? (
              <Image
                src={asset(artwork.src)}
                alt={artwork.alt}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                priority
                className="object-cover"
              />
            ) : (
              <ArtworkPlaceholder />
            )}
          </figure>
        </Reveal>

        {/* KAMPAGNENTEXT — schiebt sich auf großen Schirmen über das Bild. */}
        <Reveal
          delay={0.1}
          className="relative z-10 md:col-span-6 md:col-start-7 md:row-start-1 md:-ml-10 md:py-14 md:pl-14"
          style={{
            // Das Artwork läuft unter dem Text aus, statt an einer Kante
            // abgeschnitten zu werden — Kampagnen-Komposition statt Spalten.
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, rgba(5,4,6,0.9) 7%, #050406 16%)",
          }}
        >
          <span className="label label-accent">{event.role}</span>

          <h2
            className="display mt-3 text-ivory"
            style={{ fontSize: "clamp(4rem, 13vw, 10rem)" }}
          >
            {event.headliner}
          </h2>

          {/* Datum als grafisches Element, nicht als Datenfeld. */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-ivory/12 pt-6">
            <span className="display text-[2.5rem] leading-none text-ivory md:text-[3.25rem]">
              {event.dayMonth}
            </span>
            <span className="text-sm font-bold tracking-[0.16em] text-ivory">
              {event.weekday}
              <Tbc />
            </span>
            <span className="text-sm text-mute">
              Einlass {event.doors} · {club.district}
            </span>
          </div>

          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-mute">
            {event.music.replaceAll(" · ", ", ")} — die Nacht, für die sonst
            halb Berlin durchquert wird. Nur eben hier.
          </p>

          <Countdown className="mt-9" size="lg" />

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <ReserveButton className="w-full sm:w-auto" />
            <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-mute">
              {event.admission.toUpperCase()}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

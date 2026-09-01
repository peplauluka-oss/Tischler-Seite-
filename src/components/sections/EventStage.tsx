import Image from "next/image";
import Countdown from "@/components/hero/Countdown";
import { ReserveButton } from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import { event } from "@/content/event";
import { club } from "@/content/club";
import { asset } from "@/lib/asset";

/** Kennzeichnet unbestätigte Angaben, statt etwas zu behaupten. */
function Tbc() {
  return (
    <span className="ml-1.5 align-middle text-[0.5625rem] font-bold tracking-[0.16em] text-ember-soft/85">
      TBC
    </span>
  );
}

/**
 * DAS AKTUELLE EVENT — erste Station nach dem Hero.
 *
 * Zwei Zustände, kein dritter:
 *
 * 1. Ein Event-Creative liegt vor → das Bild IST die Sektion. Es wird weder
 *    nachgebaut noch überlagert noch daneben nacherzählt; die Eckdaten stehen
 *    ja darauf. Für Screenreader und Suchmaschinen liegt dieselbe Information
 *    unsichtbar strukturiert daneben. Danach nur noch der Reservierungsimpuls.
 *
 * 2. Es liegt keins vor → die typografische Fassung trägt das Event allein.
 *    Bewusst kein leerer Rahmen und kein erfundenes Ersatzmotiv: Solange das
 *    Bild fehlt, ist die Schrift das Plakat.
 *
 * Der Wechsel zwischen beiden Zuständen ist eine Zeile in content/event.ts.
 */
export default function EventStage() {
  const { artwork } = event;

  if (!event.active) {
    return (
      <section id="event" className="scroll-mt-16 px-5 py-28 md:px-[7vw]">
        <span className="label">Aktuell kein Termin</span>
        <p className="display display-stack mt-4 max-w-[16ch] text-[clamp(2.5rem,7vw,5rem)] text-ivory">
          Das nächste Event wird angekündigt
        </p>
      </section>
    );
  }

  /* ------------------------------------------------ 1. Mit Event-Creative */
  if (artwork.src) {
    return (
      <section
        id="event"
        className="relative scroll-mt-16 overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24"
      >
        {/* Das Artwork wirft sein eigenes Licht an die Wand — stark
            unscharf, weit heruntergedimmt, nur auf großen Schirmen. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${asset(artwork.src)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(120px) saturate(1.2) brightness(0.35)",
            transform: "scale(1.2)",
            opacity: 0.5,
          }}
        />

        <div className="relative">
          <Reveal className="mx-auto w-full max-w-[44rem] px-5 md:px-0">
            <span className="label">Aktuelles Event</span>
          </Reveal>

          {/* Die strukturierte Fassung — unsichtbar, aber vorhanden: Das Bild
              allein wäre für Screenreader und Suchmaschinen stumm. */}
          <h2 className="sr-only">
            {event.title} — {event.role} {event.headliner}, {event.dateLong},
            Einlass {event.doors} Uhr, {club.name} {club.district}
          </h2>

          <Reveal delay={0.06} className="mt-6 md:mt-10">
            <figure className="mx-auto w-full max-w-[44rem] md:px-0">
              <Image
                src={asset(artwork.src)}
                alt={artwork.alt}
                width={1080}
                height={artwork.ratio === "1/1" ? 1080 : artwork.ratio === "9/16" ? 1920 : 1350}
                sizes="(max-width: 768px) 100vw, 44rem"
                priority
                className="h-auto w-full shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]"
              />
            </figure>
          </Reveal>

          {/* Reservierungsimpuls: knapp, mittig, ohne die Eckdaten zu
              wiederholen, die schon auf dem Plakat stehen. */}
          <Reveal
            delay={0.12}
            className="mx-auto mt-10 flex w-full max-w-[44rem] flex-col items-center gap-4 px-5 text-center md:mt-12 md:px-0"
          >
            <ReserveButton className="w-full sm:w-auto" />
            <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-mute">
              {event.admission.toUpperCase()}
            </span>
          </Reveal>
        </div>
      </section>
    );
  }

  /* --------------------------------------------- 2. Ohne Event-Creative */
  return (
    <section
      id="event"
      className="relative scroll-mt-16 overflow-hidden px-5 pb-24 pt-20 md:px-[7vw] md:pb-28 md:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle, rgba(224,27,15,0.65) 0%, transparent 62%)",
        }}
      />

      <div className="relative max-w-3xl">
        <Reveal>
          <span className="label">Aktuelles Event</span>
          <p className="mt-3 flex items-center gap-3">
            <span className="h-px w-7 bg-ember" aria-hidden="true" />
            <span className="label label-accent">{event.role}</span>
          </p>
          <h2
            className="display mt-3 text-ivory"
            style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
          >
            {event.headliner}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
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

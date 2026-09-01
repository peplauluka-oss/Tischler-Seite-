import EventClip from "@/components/sections/EventClip";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";
import { asset } from "@/lib/asset";

/**
 * DAS AKTUELLE EVENT — der kurze Höhepunkt direkt nach dem Hero.
 *
 * Das Creative des Clubs kommuniziert das Event vollständig: Name, Line-up,
 * Datum, Einlass, Tischbuchung, Adresse. Die Seite erklärt davon nichts noch
 * einmal — sie stellt das Bild in den Vordergrund und führt danach zur
 * Handlung. Keine zweite Eventkarte, keine Informationswand, kein Rahmen.
 *
 * Dramaturgie: Atmosphäre (Hero) → goldener Impact → Event → Reservierung.
 */
export default function EventStage() {
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

  return (
    <section
      id="event"
      className="relative scroll-mt-16 overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16"
    >
      {/* Das Creative wirft sein eigenes Gold an die Wand — stark unscharf,
          heruntergedimmt. Kein eigenes Designelement, nur Licht. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${asset(event.clip.poster)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(130px) saturate(1.25) brightness(0.4)",
          transform: "scale(1.25)",
          opacity: 0.55,
        }}
      />

      <div className="relative">
        {/* Die vollständige Information einmal maschinenlesbar: Ein Video ist
            für Screenreader und Suchmaschinen sonst stumm. Sichtbar steht sie
            nirgends doppelt. */}
        <h2 className="sr-only">
          {event.title} — {event.role} {event.headliner}, {event.dateLong},
          Einlass {event.doors} Uhr
        </h2>

        <Reveal>
          <EventClip />
        </Reveal>

        {/* Nach dem Clip nur noch die Handlung. */}
        <Reveal
          delay={0.1}
          className="mx-auto mt-9 flex w-full max-w-[26rem] flex-col items-center gap-4 px-5 text-center md:mt-11 md:max-w-none"
        >
          <ReserveButton className="w-full sm:w-auto" />
          <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-mute">
            {event.admission.toUpperCase()} · {event.minAge}
          </span>
        </Reveal>
      </div>
    </section>
  );
}

import EventClip from "@/components/sections/EventClip";
import Countdown from "@/components/hero/Countdown";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";

/**
 * DER EVENT-MOMENT.
 *
 * Eine Scrollbewegung nach dem Hero gehört der Bildschirm dem Clip — sonst
 * nichts: kein Logo, keine Überschrift, keine Karte, kein Countdown davor.
 * Der goldene Boom des Creatives ist der Übergang; er wird nicht durch eine
 * zweite, nachgebaute Animation angekündigt.
 *
 * Die Bühne steht im normalen Fluss (nicht sticky, nichts schwebt über der
 * Seite): ein voller Viewport, danach die Handlung, danach die Zeit bis dahin.
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
    <section id="event" className="relative">
      {/* Die vollständige Information einmal maschinenlesbar — ein Video ist
          für Screenreader und Suchmaschinen sonst stumm. Sichtbar steht sie
          nirgends doppelt: Das Creative zeigt sie. */}
      <h2 className="sr-only">
        {event.title} — {event.role} {event.headliner}, {event.dateLong},
        Einlass {event.doors} Uhr
      </h2>

      <div
        data-event-stage
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
      >
        {/* Ein Hauch Gold aus dem Clip, damit die Ränder auf breiten
            Schirmen nicht wie eine leere Fläche wirken. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(191,150,63,0.28) 0%, transparent 62%)",
          }}
        />
        <EventClip />
      </div>

      {/* Erst jetzt die Handlung … */}
      <Reveal className="mx-auto flex w-full max-w-[26rem] flex-col items-center gap-4 px-5 pt-12 text-center md:max-w-none md:pt-16">
        <ReserveButton className="w-full sm:w-auto" />
        <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-mute">
          {event.admission.toUpperCase()} · {event.minAge}
        </span>
      </Reveal>

      {/* … und danach, nachrangig, die Zeit bis dahin. */}
      <Reveal delay={0.08} className="flex justify-center px-5 pb-20 pt-12 md:pb-28 md:pt-16">
        <Countdown className="text-center" />
      </Reveal>
    </section>
  );
}

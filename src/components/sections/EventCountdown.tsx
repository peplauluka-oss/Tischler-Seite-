import Countdown from "@/components/hero/Countdown";
import Reveal from "@/components/ui/Reveal";
import { event } from "@/content/event";

/**
 * Was nach dem Event-Moment kommt.
 *
 * Das Event selbst ist kein Abschnitt mehr — es ist der zweite Zustand des
 * Hero. Hier steht nur noch, was danach zählt: die Zeit bis dahin. Bewusst
 * ohne Wiederholung von Name, Datum oder Aktion; all das hat der Nutzer eine
 * Bildschirmhöhe vorher im Creative gesehen.
 */
export default function EventCountdown() {
  if (!event.active) {
    return (
      <section className="px-5 py-28 md:px-[7vw]">
        <span className="label">Aktuell kein Termin</span>
        <p className="display display-stack mt-4 max-w-[16ch] text-[clamp(2.5rem,7vw,5rem)] text-ivory">
          Das nächste Event wird angekündigt
        </p>
      </section>
    );
  }

  return (
    <Reveal className="flex justify-center px-5 pb-20 pt-16 md:pb-28 md:pt-24">
      <Countdown className="text-center" />
    </Reveal>
  );
}

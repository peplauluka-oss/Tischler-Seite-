import Countdown from "@/components/hero/Countdown";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";

/**
 * Was nach dem Event-Moment kommt.
 *
 * Das Event selbst ist kein Abschnitt mehr — es ist der zweite Zustand des
 * Hero, und dort gehört der Bildschirm ganz dem Creative. Die Handlung steht
 * deshalb hier, eine Scrollbewegung dahinter, und danach erst die Zeit bis
 * zum Termin. Name, Datum und Line-up stehen bewusst nicht noch einmal da:
 * Das Plakat hat sie gerade bildschirmfüllend gezeigt.
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
    <>
      <Reveal className="mx-auto flex w-full max-w-[26rem] flex-col items-center gap-4 px-5 pt-14 text-center md:max-w-none md:pt-20">
        <ReserveButton className="w-full sm:w-auto" />
        <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-mute">
          {event.admission.toUpperCase()} · {event.minAge}
        </span>
      </Reveal>

      <Reveal delay={0.08} className="flex justify-center px-5 pb-20 pt-14 md:pb-28 md:pt-20">
        <Countdown className="text-center" />
      </Reveal>
    </>
  );
}

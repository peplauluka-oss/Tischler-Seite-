import Countdown from "@/components/hero/Countdown";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";

/**
 * DIE ANSAGE ZUM EVENT.
 *
 * Das Plakat hat gerade den ganzen Bildschirm gehabt — aber ein Plakat ist
 * ein Bild. Erst hier sagt die Seite in ihrer eigenen Schrift, was das war:
 * Name groß, Datum darunter, dann die Handlung. Ohne diese Zeilen bliebe der
 * Clip eine Animation, die vorbeigezogen ist.
 *
 * Wiederholt wird nur, was trägt — Name, Tag, Anlass. Line-up, Telefonnummer
 * und Adresse stehen im Creative und bleiben dort.
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
    <section className="px-5 pb-20 pt-14 md:px-[7vw] md:pb-28 md:pt-20">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-ember" aria-hidden="true" />
          <span className="label label-accent">Nächste Nacht</span>
        </div>

        {/* Der Name trägt den Abschnitt — so groß, wie die Spalte es zulässt. */}
        <h2 className="display mt-4 text-[clamp(5rem,40vw,17rem)] leading-[0.78] text-ivory">
          {event.headliner}
        </h2>

        <p className="display display-stack mt-3 text-[clamp(1.35rem,5.5vw,2.75rem)] text-mute md:mt-4">
          {event.dateShort}
          {event.year} · 4 Jahre Black Medusa
        </p>
      </Reveal>

      <div className="mt-9 h-px w-full bg-ivory/12 md:mt-12" />

      {/* Erst die Handlung, dann die Zeit bis dahin — nicht umgekehrt. */}
      <Reveal
        delay={0.06}
        className="mt-7 flex flex-col gap-9 md:mt-9 md:flex-row md:items-end md:justify-between md:gap-14"
      >
        <div className="flex w-full flex-col items-start gap-6 md:w-auto">
          <p className="max-w-[30ch] text-[0.6875rem] md:max-w-none font-bold uppercase leading-[1.7] tracking-[0.16em] text-mute">
            Einlass {event.doors} · {event.admission} · {event.minAge}
          </p>
          <ReserveButton className="w-full sm:w-auto" />
        </div>

        <Countdown className="shrink-0" />
      </Reveal>
    </section>
  );
}

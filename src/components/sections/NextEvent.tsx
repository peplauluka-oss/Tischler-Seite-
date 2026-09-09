import Countdown from "@/components/hero/Countdown";
import Reveal from "@/components/ui/Reveal";
import { GuestlistButton, TableButton } from "@/components/ui/Cta";
import { eventDate, type MedusaEvent } from "@/content/events";

/**
 * DIE ANSAGE ZUR NÄCHSTEN NACHT.
 *
 * Das Artwork hatte gerade den ganzen Bildschirm — aber ein Artwork ist ein
 * Bild. Erst hier sagt die Seite in ihrer eigenen Schrift, was das war.
 *
 * Reihenfolge nach Wichtigkeit für den Gast: Bei einer Sondernacht trägt der
 * Anlass, der Act steht darunter; ohne Anlass trägt der Act allein. Danach
 * Datum und Einlass, dann die Handlung. Der Countdown kommt zuletzt und
 * klein: Er ist ein Lebenszeichen, keine Überschrift.
 *
 * Line-up, Telefonnummer und Adresse stehen bereits im Artwork und werden
 * hier nicht wiederholt — außer den Namen, die sonst nirgends als Text
 * existieren.
 */
export default function NextEvent({
  event,
  upcoming,
}: {
  event: MedusaEvent;
  upcoming: boolean;
}) {
  const date = eventDate(event);
  const lead = event.occasion ?? event.headliner ?? "Clubnacht";
  const second = event.occasion ? event.headliner : null;

  /* Kein zweites id="event": Die Sprungmarke liegt im Hero, dort wo sich der
     Bildschirm in die Nacht verwandelt. */
  return (
    <section className="px-5 pb-20 pt-14 md:px-[7vw] md:pb-28 md:pt-20">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-ember" aria-hidden="true" />
          <span className="label label-accent">
            {upcoming ? "Next Event" : "Letzte Nacht"}
          </span>
        </div>

        <h2 className="display display-stack mt-4 max-w-[14ch] text-[clamp(3rem,13vw,8rem)] text-ivory">
          {lead}
        </h2>

        {second && (
          <p
            className="display mt-3 text-[clamp(2rem,9vw,5rem)] leading-[0.85]"
            style={{ color: "var(--color-gold)" }}
          >
            mit {second}
          </p>
        )}

        <p className="display display-stack mt-4 text-[clamp(1.25rem,4.6vw,2.25rem)] text-mute">
          <time dateTime={date.iso}>{date.short}</time> · Einlass {date.time}
        </p>
      </Reveal>

      <div className="mt-9 h-px w-full bg-ivory/12 md:mt-12" />

      <Reveal
        delay={0.06}
        className="mt-7 flex flex-col gap-9 md:mt-9 md:flex-row md:items-end md:justify-between md:gap-14"
      >
        <div className="flex w-full flex-col items-start gap-6 md:w-auto">
          {event.support.length > 0 && (
            <p className="max-w-[36ch] text-[0.8125rem] leading-relaxed text-mute">
              {event.support.join(" · ")}
            </p>
          )}
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-mute">
            {event.admission} · {event.minAge}
          </p>

          {/* Gästeliste zuerst, Tisch daneben — beide mit dieser Nacht im Rücken. */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            {event.guestlist && (
              <GuestlistButton className="w-full sm:w-auto" eventSlug={event.slug} />
            )}
            {event.tables && (
              <TableButton className="w-full sm:w-auto" eventSlug={event.slug} />
            )}
          </div>
        </div>

        <Countdown event={event} className="shrink-0" />
      </Reveal>
    </section>
  );
}

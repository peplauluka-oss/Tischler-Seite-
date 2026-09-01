import EventClip from "@/components/sections/EventClip";
import Reveal from "@/components/ui/Reveal";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";
import { asset } from "@/lib/asset";

/**
 * DER EVENT-MOMENT — direkt aus dem Hero heraus.
 *
 * Keine Sektion mit einem Video darin, sondern ein Bildschirm, den das
 * Creative übernimmt: volle Höhe, kein Rahmen, keine Überschrift, kein Text
 * davor oder daneben. Navigation und mobiler Aktionsbalken treten für diesen
 * Moment zurück (siehe SiteNav und ReserveDock) — deshalb wirkt es wie ein
 * kurzes Aufgehen des Events und nicht wie ein eingebettetes Video.
 *
 * Was neben dem Hochformat frei bleibt, füllt der Clip mit seinem eigenen,
 * stark unscharfen Licht. Das ist kein Designelement, sondern dasselbe Bild.
 *
 * Erst danach, als eigener Streifen, die Handlung.
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
      {/* Die vollständige Information einmal maschinenlesbar: Ein Video ist
          für Screenreader und Suchmaschinen sonst stumm. Sichtbar steht sie
          nirgends doppelt — das Creative zeigt sie. */}
      <h2 className="sr-only">
        {event.title} — {event.role} {event.headliner}, {event.dateLong},
        Einlass {event.doors} Uhr
      </h2>

      {/* Der Bildschirm gehört für diesen Moment dem Creative. */}
      <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${asset(event.clip.poster)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(90px) saturate(1.3) brightness(0.45)",
            transform: "scale(1.3)",
            opacity: 0.6,
          }}
        />
        {/* Weicher Übergang aus dem Hero heraus und in die Seite zurück. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-void to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        />

        <Reveal y={12} className="relative w-full md:w-auto">
          <EventClip />
        </Reveal>
      </div>

      {/* Unmittelbar danach: nur noch die Handlung. */}
      <Reveal className="mx-auto flex w-full max-w-[26rem] flex-col items-center gap-4 px-5 pb-16 pt-9 text-center md:max-w-none md:pb-24 md:pt-12">
        <ReserveButton className="w-full sm:w-auto" />
        <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-mute">
          {event.admission.toUpperCase()} · {event.minAge}
        </span>
      </Reveal>
    </section>
  );
}

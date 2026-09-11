import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { GuestlistButton } from "@/components/ui/Cta";
import { club } from "@/content/club";
import { eventDate, eventTitle, type MedusaEvent } from "@/content/events";
import { asset } from "@/lib/asset";

/**
 * UPCOMING — wieder Orientierung, kein zweiter Takeover.
 *
 * Nach der Bildstrecke will man wissen, wann man kommen kann. Das ist eine
 * Liste, keine Bühne: eine Zeile pro Nacht, das Artwork klein daneben,
 * Gästeliste direkt dran. Der große Auftritt gehört der einen Nacht oben.
 *
 * Steht nichts an, wird das gesagt und nicht mit erfundenen Terminen
 * überdeckt — der Club kündigt seine Nächte auf Instagram an.
 */
export default function UpcomingEvents({ events }: { events: MedusaEvent[] }) {
  return (
    <section
      id="upcoming"
      className="scroll-mt-16 border-t border-ivory/10 px-5 py-20 md:px-[7vw] md:py-28"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="label">Was kommt</span>
          <h2 className="display display-stack mt-3 text-[clamp(2.5rem,9vw,5.5rem)] text-ivory">
            Next nights
          </h2>
        </div>
        <Link
          href="/events"
          className="cta-quiet"
        >
          Alle Events
          <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
            <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </Reveal>

      {events.length > 0 ? (
        <ul className="mt-10 md:mt-14">
          {events.map((ev, i) => {
            const date = eventDate(ev);
            return (
              <Reveal key={ev.slug} delay={i * 0.05}>
                <li className="grid grid-cols-12 items-center gap-x-4 gap-y-4 border-t border-ivory/12 py-6 md:py-8">
                  <Link
                    href={`/events/${ev.slug}`}
                    className="col-span-3 md:col-span-2"
                  >
                    <span className="relative block aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={asset(ev.artwork.poster)}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 25vw, 14vw"
                        loading="lazy"
                        className="object-cover"
                      />
                    </span>
                  </Link>

                  <div className="col-span-9 md:col-span-6">
                    <p className="label">
                      <time dateTime={date.iso}>{date.short}</time> · Einlass {date.time}
                    </p>
                    <h3 className="display display-stack mt-2 text-[clamp(1.75rem,6vw,3rem)] text-ivory">
                      <Link href={`/events/${ev.slug}`} className="hover:text-ember-soft">
                        {eventTitle(ev)}
                      </Link>
                    </h3>
                    {ev.occasion && ev.headliner && (
                      <p className="display mt-1 text-[clamp(1.1rem,3.6vw,1.6rem)]" style={{ color: "var(--color-gold)" }}>
                        mit {ev.headliner}
                      </p>
                    )}
                    {ev.music && (
                      <p className="mt-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-mute">
                        {ev.music}
                      </p>
                    )}
                  </div>

                  {ev.guestlist && (
                    <div className="col-span-12 md:col-span-4 md:justify-self-end">
                      <GuestlistButton className="w-full sm:w-auto" eventSlug={ev.slug} />
                    </div>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ul>
      ) : (
        <Reveal delay={0.06} className="mt-10 border-t border-ivory/12 pt-8 md:mt-14">
          <p className="max-w-[38ch] text-lg leading-relaxed text-ivory md:text-2xl">
            Der nächste Termin steht noch nicht fest.
          </p>
          <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-mute">
            Neue Termine stehen auf Instagram.
          </p>
          <a
            href={club.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="cta-quiet mt-7"
          >
            @{club.instagram}
            <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
              <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </Reveal>
      )}
    </section>
  );
}

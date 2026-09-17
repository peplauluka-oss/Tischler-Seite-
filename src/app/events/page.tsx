import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteNav from "@/components/nav/SiteNav";
import Footer from "@/components/layout/Footer";
import BookingOverlay from "@/components/booking/BookingOverlay";
import Reveal from "@/components/ui/Reveal";
import { GuestlistButton } from "@/components/ui/Cta";
import { BookingProvider } from "@/lib/booking";
import { club } from "@/content/club";
import {
  comingEvents,
  eventDate,
  eventTitle,
  pastEvents,
  type MedusaEvent,
} from "@/content/events";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: `Events — ${club.nameFull} Berlin`,
  description: `Alle Nächte im ${club.nameFull} in Berlin-${club.district}: kommende Termine, Line-ups und das Archiv.`,
  alternates: { canonical: "/events" },
};

function Row({ event, past = false }: { event: MedusaEvent; past?: boolean }) {
  const date = eventDate(event);
  return (
    <li className="grid grid-cols-12 items-center gap-x-4 gap-y-4 border-t border-ivory/12 py-6 md:py-8">
      <Link href={`/events/${event.slug}`} className="col-span-3 md:col-span-2">
        <span className="relative block aspect-[3/4] w-full overflow-hidden">
          <Image
            src={asset(event.artwork.hoch.src)}
            alt=""
            fill
            sizes="(max-width: 768px) 25vw, 14vw"
            loading="lazy"
            className={`object-cover ${past ? "opacity-55 grayscale" : ""}`}
          />
        </span>
      </Link>

      <div className="col-span-9 md:col-span-6">
        <p className="label">
          <time dateTime={date.iso}>{date.short}</time> · Einlass {date.time}
        </p>
        <h2 className="display display-stack mt-2 text-[clamp(1.75rem,6vw,3rem)] text-ivory">
          <Link href={`/events/${event.slug}`} className="hover:text-ember-soft">
            {eventTitle(event)}
          </Link>
        </h2>
        {event.occasion && event.headliner && (
          <p
            className="display mt-1 text-[clamp(1.1rem,3.6vw,1.6rem)]"
            style={{ color: "var(--color-gold)" }}
          >
            mit {event.headliner}
          </p>
        )}
      </div>

      {!past && event.guestlist && (
        <div className="col-span-12 md:col-span-4 md:justify-self-end">
          <GuestlistButton className="w-full sm:w-auto" eventSlug={event.slug} />
        </div>
      )}
    </li>
  );
}

export default function EventsPage() {
  const coming = comingEvents();
  const past = pastEvents();

  return (
    <BookingProvider>
      <SiteNav />

      <main className="px-5 pb-24 pt-28 md:px-[7vw] md:pb-32 md:pt-40">
        <Reveal>
          <span className="label">Alle Nächte</span>
          <h1 className="display display-stack mt-3 text-[clamp(3rem,13vw,8rem)] text-ivory">
            Events
          </h1>
        </Reveal>

        <section className="mt-14 md:mt-20">
          <h2 className="label label-accent">Kommende Nächte</h2>
          {coming.length > 0 ? (
            <ul className="mt-6">
              {coming.map((e) => (
                <Row key={e.slug} event={e} />
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-[46ch] border-t border-ivory/12 pt-6 text-[0.9375rem] leading-relaxed text-mute">
              Der nächste Termin steht noch nicht fest. Neue Termine stehen
              auf{" "}
              <a
                href={club.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link-inline"
              >
                @{club.instagram}
              </a>
              .
            </p>
          )}
        </section>

        {past.length > 0 && (
          <section className="mt-20 md:mt-28">
            <h2 className="label">Archiv</h2>
            <ul className="mt-6">
              {past.map((e) => (
                <Row key={e.slug} event={e} past />
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
      <BookingOverlay />
    </BookingProvider>
  );
}

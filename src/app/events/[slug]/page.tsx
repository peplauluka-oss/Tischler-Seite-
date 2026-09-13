import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/nav/SiteNav";
import Footer from "@/components/layout/Footer";
import BookingOverlay from "@/components/booking/BookingOverlay";
import Countdown from "@/components/hero/Countdown";
import Reveal from "@/components/ui/Reveal";
import { GuestlistButton, TableButton } from "@/components/ui/Cta";
import { EventSchema } from "@/components/StructuredData";
import { BookingProvider } from "@/lib/booking";
import { club } from "@/content/club";
import {
  events,
  eventBySlug,
  eventDate,
  eventFullTitle,
  eventTitle,
} from "@/content/events";
import { asset } from "@/lib/asset";

/** Jede Nacht bekommt ihre eigene Adresse — teilbar aus Story, Chat, Suche. */
export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) return {};

  const date = eventDate(event);
  const title = `${eventFullTitle(event)} — ${date.short} · ${club.nameFull}`;
  const description =
    `${eventFullTitle(event)} im ${club.nameFull}, Berlin-${club.district}. ` +
    `${date.long}, Einlass ${date.time} Uhr. ${event.admission}, ${event.minAge}.`;

  return {
    title,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "de_DE",
      images: [{ url: asset(event.artwork.quer.src) }],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();

  const date = eventDate(event);
  const lead = eventTitle(event);
  const second = event.occasion ? event.headliner : null;

  return (
    <BookingProvider>
      <EventSchema event={event} />
      <SiteNav />

      <main className="px-5 pb-24 pt-24 md:px-[7vw] md:pb-32 md:pt-36">
        <Reveal>
          <Link href="/events" className="label transition-colors hover:text-ivory">
            ← Alle Events
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-10">
          {/* Das Bild trägt — eine Aufnahme aus dem Laden, kein Plakat. */}
          <Reveal className="md:col-span-5">
            {/* Das Seitenverhältnis der hochkanten Fassung (853×1280) — so
                  steht die Aufnahme unbeschnitten. */}
              <figure className="relative aspect-[2/3] w-full overflow-hidden md:sticky md:top-28">
              <Image
                src={asset(event.artwork.hoch.src)}
                alt={event.artwork.description}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover"
              />
            </figure>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-7">
            <p className="label label-accent">
              <time dateTime={date.iso}>{date.short}</time> · Einlass {date.time}
            </p>

            <h1 className="display display-stack mt-4 text-[clamp(2.75rem,10vw,6.5rem)] text-ivory">
              {lead}
            </h1>
            {second && (
              <p
                className="display mt-3 text-[clamp(1.75rem,7vw,4rem)] leading-[0.85]"
                style={{ color: "var(--color-gold)" }}
              >
                mit {second}
              </p>
            )}

            {event.support.length > 0 && (
              <p className="mt-7 max-w-[40ch] text-[0.9375rem] leading-relaxed text-mute">
                {event.support.join(" · ")}
              </p>
            )}

            <dl className="mt-9 grid gap-x-10 gap-y-5 border-t border-ivory/12 pt-7 sm:grid-cols-2">
              <div>
                <dt className="label text-[0.625rem]">Einlass</dt>
                <dd className="mt-1.5 text-ivory">
                  {date.weekdayLong}, {date.time} Uhr
                </dd>
              </div>
              {event.music && (
                <div>
                  <dt className="label text-[0.625rem]">Musik</dt>
                  <dd className="mt-1.5 text-ivory">{event.music}</dd>
                </div>
              )}
              <div>
                <dt className="label text-[0.625rem]">Eintritt</dt>
                <dd className="mt-1.5 text-ivory">{event.admission}</dd>
              </div>
              <div>
                <dt className="label text-[0.625rem]">Alter</dt>
                <dd className="mt-1.5 text-ivory">{event.minAge}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="label text-[0.625rem]">Ort</dt>
                <dd className="mt-1.5 text-ivory">
                  {club.nameFull}, {club.address}, {club.postcode}
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {event.guestlist && (
                <GuestlistButton className="w-full sm:w-auto" eventSlug={event.slug} />
              )}
              {event.tables && (
                <TableButton className="w-full sm:w-auto" eventSlug={event.slug} />
              )}
            </div>

            {/* Nur solange die Nacht noch bevorsteht. */}
            {Date.parse(event.entryAt) + event.endsAfterHours * 3_600_000 >
              Date.now() && <Countdown event={event} className="mt-10" />}
          </Reveal>
        </div>
      </main>

      <Footer />
      <BookingOverlay />
    </BookingProvider>
  );
}

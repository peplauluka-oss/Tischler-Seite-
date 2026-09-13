import { club } from "@/content/club";
import { eventDate, eventFullTitle, type MedusaEvent } from "@/content/events";
import { absolute } from "@/lib/site";
import { asset } from "@/lib/asset";

/**
 * Strukturierte Daten — die einzige Stelle, an der SEO sichtbar Code kostet.
 *
 * Es steht hier nichts, was nicht auch auf der Seite steht: Adresse, Termin,
 * Einlass, Artwork. Keine erfundenen Bewertungen, keine Preise, keine
 * Kapazitäten — was nicht belegt ist, fehlt.
 */
export function ClubSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    name: club.nameFull,
    url: absolute("/"),
    address: {
      "@type": "PostalAddress",
      streetAddress: club.address,
      postalCode: club.postcode.split(" ")[0],
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    telephone: club.phoneHref.replace("tel:", ""),
    sameAs: [club.instagramUrl],
    hasMap: club.mapsUrl,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function EventSchema({ event }: { event: MedusaEvent }) {
  const date = eventDate(event);
  const performers = [event.headliner, ...event.support]
    .filter((n): n is string => Boolean(n))
    .map((name) => ({ "@type": "PerformingGroup", name }));

  const data = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: eventFullTitle(event),
    startDate: event.entryAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absolute(`/events/${event.slug}/`),
    image: absolute(asset(event.artwork.quer.src)),
    ...(performers.length ? { performer: performers } : {}),
    location: {
      "@type": "MusicVenue",
      name: club.nameFull,
      address: {
        "@type": "PostalAddress",
        streetAddress: club.address,
        postalCode: club.postcode.split(" ")[0],
        addressLocality: "Berlin",
        addressCountry: "DE",
      },
    },
    description: `${eventFullTitle(event)} im ${club.nameFull}, ${club.district}. ${date.long}, Einlass ${date.time} Uhr. ${event.admission}, ${event.minAge}.`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import { site } from "@/content/site";
import { faq } from "@/content/faq";
import { kurse } from "@/content/kurse";

/**
 * Strukturierte Daten (JSON-LD) für lokale Suche.
 * WICHTIG: KEIN aggregateRating, solange keine echten, belegbaren
 * Bewertungen eingebunden sind (Google-Richtlinie).
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description:
      "Erlebniswerkstatt für Holzbearbeitung in Berlin-Kaulsdorf: Tischlerkurse, Mietwerkstatt und Auftragsarbeiten.",
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    // [PLATZHALTER: openingHoursSpecification ergänzen, sobald die
    // Öffnungszeiten vom Kunden vorliegen]
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };
}

export function coursesJsonLd() {
  return kurse.map((kurs) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: kurs.titel,
    description: kurs.beschreibung,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      "@id": `${site.url}/#business`,
    },
    // [PLATZHALTER: hasCourseInstance mit echten Terminen & Preisen ergänzen]
  }));
}

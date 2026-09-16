import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import SiteNav from "@/components/nav/SiteNav";
import Hero from "@/components/hero/Hero";
import MedusaNights from "@/components/sections/MedusaNights";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import InsideMedusa from "@/components/sections/InsideMedusa";
import TableSection from "@/components/sections/TableSection";
import Footer from "@/components/layout/Footer";
import GuestlistDock from "@/components/GuestlistDock";
import BookingOverlay from "@/components/booking/BookingOverlay";
import { ClubSchema } from "@/components/StructuredData";
import { BookingProvider } from "@/lib/booking";
import { club } from "@/content/club";
import {
  eventDate,
  eventFullTitle,
  featuredEvent,
  upcomingEvents,
} from "@/content/events";

export function generateMetadata(): Metadata {
  const featured = featuredEvent();
  const next =
    featured?.upcoming
      ? `Nächstes Event: ${eventFullTitle(featured.event)}, ${eventDate(featured.event).short}. `
      : "";
  const description =
    `${club.nameFull} — Club in Berlin-${club.district}. ` +
    `${next}Gästeliste und Tischreservierung über WhatsApp.`;

  return {
    title: `${club.nameFull} — Club in Berlin-${club.district}`,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: `${club.nameFull} · Berlin`,
      description,
      type: "website",
      locale: "de_DE",
    },
  };
}

/**
 * Der Ablauf der Seite ist der Ablauf einer Nacht:
 *
 *   Spür es → Was kommt? → Das könntest du sein → Was kommt danach?
 *   → Wie sieht es dort aus (und wo ist es) → Kommst du mit Leuten? → Los.
 *
 * Jeder Abschnitt hat genau eine Aufgabe. Zusammengehalten wird das nicht
 * durch ein wiederkehrendes Kartenbauteil, sondern durch Dunkelheit,
 * Typografie und ein einziges Rot.
 */
export default function Page() {
  const featured = featuredEvent();
  const upcoming = upcomingEvents();

  return (
    <BookingProvider>
      <SmoothScroll />
      <ClubSchema />
      <SiteNav heroDriven />

      <main>
        <Hero featured={featured} />
        <MedusaNights />
        <UpcomingEvents events={upcoming} announced={featured?.upcoming ?? false} />
        <InsideMedusa />
        <TableSection eventSlug={featured?.event.slug ?? null} />
      </main>

      <Footer />
      <GuestlistDock eventSlug={featured?.event.slug ?? null} />
      <BookingOverlay />
    </BookingProvider>
  );
}

import SmoothScroll from "@/components/SmoothScroll";
import SiteNav from "@/components/nav/SiteNav";
import Hero from "@/components/hero/Hero";
import EventCountdown from "@/components/sections/EventCountdown";
import Room from "@/components/sections/Room";
import Music from "@/components/sections/Music";
import ReservationSection from "@/components/sections/ReservationSection";
import Location from "@/components/sections/Location";
import Footer from "@/components/layout/Footer";
import ReserveDock from "@/components/ReserveDock";
import ReservationOverlay from "@/components/reservation/ReservationOverlay";
import { ReservationProvider } from "@/lib/reservation";

/**
 * Der Ablauf der Seite ist die Dramaturgie des Abends:
 *
 *   Hero → Event (derselbe Screen) → Raum → Sound → Tisch → Weg dorthin
 *
 * Jeder Abschnitt hat eine eigene Komposition. Zusammengehalten wird das
 * nicht durch ein wiederholtes Kartenbauteil, sondern durch Typografie,
 * Dunkelheit und ein einziges Rot.
 */
export default function Page() {
  return (
    <ReservationProvider>
      <SmoothScroll />
      <SiteNav />

      <main>
        <Hero />
        <EventCountdown />
        <Room />
        <Music />
        <ReservationSection />
        <Location />
      </main>

      <Footer />
      <ReserveDock />
      <ReservationOverlay />
    </ReservationProvider>
  );
}

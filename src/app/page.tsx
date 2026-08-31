import SmoothScroll from "@/components/SmoothScroll";
import SiteNav from "@/components/nav/SiteNav";
import Hero from "@/components/hero/Hero";
import EventDetails from "@/components/sections/EventDetails";
import Artists from "@/components/sections/Artists";
import Experience from "@/components/sections/Experience";
import Gallery from "@/components/sections/Gallery";
import Location from "@/components/sections/Location";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import ReservationOverlay from "@/components/reservation/ReservationOverlay";
import { ReservationProvider } from "@/lib/reservation";

export default function Page() {
  return (
    <ReservationProvider>
      <SmoothScroll />
      <SiteNav />

      <main>
        <Hero />
        <EventDetails />
        <Artists />
        <Experience />
        <Gallery />
        <Location />
      </main>

      <Footer />
      <MobileCtaBar />
      <ReservationOverlay />
    </ReservationProvider>
  );
}

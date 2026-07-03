import Preloader from "@/components/Preloader";
import IntroStage from "@/components/intro/IntroStage";
import Hero from "@/components/sections/Hero";
import AngeboteSection from "@/components/sections/AngeboteSection";
import WerkstattSection from "@/components/sections/WerkstattSection";
import ProzessSection from "@/components/sections/ProzessSection";
import ReferenzenSection from "@/components/sections/ReferenzenSection";
import CtaBand from "@/components/sections/CtaBand";
import KontaktSection from "@/components/sections/KontaktSection";
import FaqSection from "@/components/sections/FaqSection";
import StickyMobileBar from "@/components/StickyMobileBar";

/**
 * Startseite: 3D-Swipe-Intro (der Stamm bricht auf) + warme
 * Editorial-Sektionen im One-Pager-Fluss:
 * Angebote → Werkstatt/Material → Prozess → Referenzen → CTA →
 * Kontakt/Anfahrt → FAQ.
 */
export default function Home() {
  return (
    <main>
      <Preloader />
      <IntroStage>
        <Hero />
      </IntroStage>
      <AngeboteSection />
      <WerkstattSection />
      <ProzessSection />
      <ReferenzenSection />
      <CtaBand />
      <KontaktSection />
      <FaqSection />
      <StickyMobileBar />
    </main>
  );
}

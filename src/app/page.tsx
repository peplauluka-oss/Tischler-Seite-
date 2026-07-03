import Preloader from "@/components/Preloader";
import StoryStage from "@/components/story/StoryStage";
import HeroSection from "@/components/sections/HeroSection";
import MaterialSection from "@/components/sections/MaterialSection";
import AngeboteSection from "@/components/sections/AngeboteSection";
import ProzessSection from "@/components/sections/ProzessSection";
import ReferenzenSection from "@/components/sections/ReferenzenSection";
import MeisterstueckSection from "@/components/sections/MeisterstueckSection";
import KontaktSection from "@/components/sections/KontaktSection";
import FaqSection from "@/components/sections/FaqSection";
import StickyMobileBar from "@/components/StickyMobileBar";

/**
 * Startseite = die 6-Akte-Scroll-Story + normaler Seitenfluss danach.
 *
 * Alle Sektionen sind Server-Komponenten mit echtem HTML (SEO!).
 * Nur die Bühne (StoryStage) und die Conversion-Helfer sind Client-
 * Komponenten – das 3D-Bundle lädt lazy und blockiert nie das LCP.
 */
export default function Home() {
  return (
    <main>
      <Preloader />
      <StoryStage>
        <HeroSection />
        <MaterialSection />
        <AngeboteSection />
        <ProzessSection />
        <ReferenzenSection />
        <MeisterstueckSection />
      </StoryStage>
      <KontaktSection />
      <FaqSection />
      <StickyMobileBar />
    </main>
  );
}

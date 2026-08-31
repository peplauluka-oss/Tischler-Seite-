import type { Metadata } from "next";
import KontaktSection from "@/components/sections/KontaktSection";
import FaqSection from "@/components/sections/FaqSection";
import StickyMobileBar from "@/components/StickyMobileBar";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt – Hobbytischlerei Berlin-Kaulsdorf",
  description:
    "Kontakt zur Hobbytischlerei Berlin: Kurs anfragen, Werkstatt mieten oder Auftrag besprechen. Alt-Kaulsdorf 52, 12621 Berlin – Telefon +49 30 74 76 92 40.",
  alternates: { canonical: "/kontakt" },
};

/**
 * Bewusst vollständig statisch (auch für den GitHub-Pages-Export):
 * ?anliegen=… liest das Formular selbst clientseitig aus der URL.
 */
export default function KontaktPage() {
  return (
    <main className="pt-16">
      <KontaktSection />
      <FaqSection />
      <StickyMobileBar />
    </main>
  );
}

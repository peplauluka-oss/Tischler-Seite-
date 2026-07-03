import type { Metadata } from "next";
import { Suspense } from "react";
import KontaktSection from "@/components/sections/KontaktSection";
import FaqSection from "@/components/sections/FaqSection";
import StickyMobileBar from "@/components/StickyMobileBar";
import { anliegenOptions, type AnliegenKey } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt – Hobbytischlerei Berlin-Kaulsdorf",
  description:
    "Kontakt zur Hobbytischlerei Berlin: Kurs anfragen, Werkstatt mieten oder Auftrag besprechen. Alt-Kaulsdorf 52, 12621 Berlin – Telefon +49 30 74 76 92 40.",
  alternates: { canonical: "/kontakt" },
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ anliegen?: string }>;
}) {
  const { anliegen } = await searchParams;
  const valid = anliegenOptions.some((o) => o.value === anliegen)
    ? (anliegen as AnliegenKey)
    : undefined;

  return (
    <main className="pt-16">
      <Suspense>
        <KontaktSection defaultAnliegen={valid} />
      </Suspense>
      <FaqSection />
      <StickyMobileBar />
    </main>
  );
}

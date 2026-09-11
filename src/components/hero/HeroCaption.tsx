"use client";

import { GuestlistButton, TableButton } from "@/components/ui/Cta";
import { club } from "@/content/club";

/**
 * DER HERO-ABSCHLUSS — Marke, Satz, Handlung. Sonst nichts.
 *
 * Hier stand zuletzt „Die Nacht spricht drei Sprachen“ mit der Zeile
 * „Balkan · Türkçe · Arabic“ darunter. Das war eine Behauptung über die
 * musikalische Identität des Clubs, die so nicht stimmt: Was läuft,
 * entscheidet die einzelne Nacht mit ihren Artists — nicht eine Formel auf
 * der Startseite. Sie ist ersatzlos raus; ein neuer Slogan an derselben
 * Stelle wäre derselbe Fehler mit anderen Worten.
 *
 * Geblieben ist der Satz, mit dem der Abend anfängt, und die Handlung.
 */
export default function HeroCaption() {
  return (
    <div className="w-full max-w-[44rem]">
      <div data-reveal="kicker" className="hero-reveal flex items-center gap-3">
        <span className="h-px w-7 bg-ember" aria-hidden="true" />
        <span className="label">
          {club.city} · {club.district}
        </span>
      </div>

      <h1
        data-reveal="claim"
        /* Bis 1024 liegt die Zeile über dem formatfüllenden Bild, darüber
           steht sie neben der Videofläche — dort begrenzt deren Kante die
           Spalte, nicht der Bildschirm. */
        className="display display-stack mt-5 text-ivory md:mt-7
                   text-[clamp(3rem,13vw,6rem)]
                   lg:text-[clamp(3.5rem,8.4vw,7.5rem)]"
      >
        {["Tonight", "starts here."].map((line) => (
          <span key={line} className="hero-reveal block overflow-hidden pb-[0.05em]">
            <span data-claim-line className="block">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div
        data-reveal="cta"
        className="hero-reveal mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-4 md:mt-11"
      >
        <GuestlistButton className="w-full sm:w-auto" />
        <TableButton className="w-full sm:w-auto" />
      </div>
    </div>
  );
}

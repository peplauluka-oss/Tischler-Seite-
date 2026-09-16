"use client";

import { GuestlistButton, TableLink } from "@/components/ui/Cta";
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
 * Geblieben ist der Satz, mit dem der Abend anfängt, die Einordnung und
 * die Handlung.
 *
 * DIE EINORDNUNG ist die einzige Ergänzung, und sie schließt eine echte
 * Lücke: Direkt darunter steht „Tisch reservieren“ — ein Angebot, das
 * voraussetzt, dass es hier Tische gibt. Wer den Laden nicht kennt, sieht
 * ein Video, eine Behauptung und zwei Knöpfe, aber nirgends, was für ein
 * Haus das ist. Drei Wörter beantworten das, ohne einen „Über uns“-Absatz
 * daraus zu machen.
 *
 * Alle drei sind durch die eigenen Aufnahmen des Clubs gedeckt: die Fläche
 * im Clip, der Loungebereich mit Tresen in den Innenaufnahmen, die Nächte
 * in der Bildstrecke. Eine Musikrichtung steht hier bewusst NICHT — die
 * entscheidet der einzelne Abend mit seinen Artists, nicht die Startseite.
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

      <p
        data-reveal="kind"
        className="label hero-reveal mt-6 md:mt-7 md:text-[0.75rem]"
      >
        Club <span className="text-ember-soft">·</span> Lounge{" "}
        <span className="text-ember-soft">·</span> Nightlife
      </p>

      <div
        data-reveal="cta"
        className="hero-reveal mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 md:mt-8"
      >
        <GuestlistButton />
        <TableLink />
      </div>
    </div>
  );
}

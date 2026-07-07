import Reveal from "@/components/Reveal";

/**
 * Material & Werkstatt — warme „Über uns“-Sektion im Stil der Referenz:
 * große Bildflächen (Platzhalter bis Kundenfotos da sind) + ehrlicher Text.
 */
export default function WerkstattSection() {
  return (
    <section id="werkstatt" className="bg-cream-2/50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-walnut sm:text-5xl">
              Massives Holz,
              <br />
              ehrliches Handwerk
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-7 text-lg leading-relaxed text-char/75">
              Wir arbeiten mit Eiche, Esche und Nussbaum — Brett für Brett
              von Hand ausgesucht, besäumt und gehobelt. Keine Folie, kein
              Furnierimitat: Was bei uns entsteht, ist durch und durch Holz.
            </p>
            <p className="mt-4 leading-relaxed text-char/65">
              Unser Maschinenpark in Berlin-Kaulsdorf steht Kursen,
              Mietwerkstatt und Auftragsfertigung gleichermaßen zur
              Verfügung. [PLATZHALTER: Maschinenliste mit Kunde abstimmen]
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {[
                "Formatkreissäge",
                "Abricht- & Dickenhobel",
                "Bandschleifer",
                "Drechselbank [PLATZHALTER]",
                "Handwerkzeug",
              ].map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-walnut/20 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-walnut"
                >
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        {/* Foto-Kollage (Platzhalter) */}
        <div className="grid grid-cols-2 gap-4">
          {[
            ["[PLATZHALTER: Werkstattfoto — Maschinenraum]", "row-span-2 min-h-72"],
            ["[PLATZHALTER: Foto — Hände am Hobel]", "min-h-32"],
            ["[PLATZHALTER: Foto — Holzlager Eiche]", "min-h-32"],
          ].map(([label, cls], i) => (
            <Reveal key={label} delay={i * 70} className={cls as string}>
              <div className="flex h-full items-end overflow-hidden rounded-3xl bg-gradient-to-br from-oak/45 via-oak/25 to-walnut/30 p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-walnut/80">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

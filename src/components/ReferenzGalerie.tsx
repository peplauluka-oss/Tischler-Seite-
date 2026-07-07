"use client";

import Image from "next/image";
import { useState } from "react";
import { referenzen, type Referenz } from "@/content/referenzen";

const filter: ("Alle" | Referenz["kategorie"])[] = [
  "Alle",
  "Möbel",
  "Kursarbeiten",
  "Reparaturen",
];

/** Filterbare Galerie – progressive Enhancement: ohne JS sind alle 6 sichtbar. */
export default function ReferenzGalerie() {
  const [aktiv, setAktiv] = useState<(typeof filter)[number]>("Alle");
  const sichtbar = referenzen.filter((r) => aktiv === "Alle" || r.kategorie === aktiv);

  return (
    <div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Galerie filtern">
        {filter.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setAktiv(f)}
            aria-pressed={aktiv === f}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.96] ${
              aktiv === f
                ? "bg-char text-cream"
                : "bg-oak/20 text-char/70 hover:bg-oak/35"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {sichtbar.map((r) => (
          <li
            key={r.titel + r.bild}
            className="group overflow-hidden rounded-xl bg-oak/15"
          >
            {/* unoptimized nur für die SVG-Platzhalter – bei echten Fotos
                (JPG/WebP) das Attribut entfernen, damit next/image optimiert */}
            <div className="overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${r.bild}`}
                alt={r.alt}
                width={320}
                height={200}
                unoptimized
                className="h-24 w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.06] sm:h-28"
              />
            </div>
            <div className="p-3">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-precision">
                {r.kategorie}
              </p>
              <h3 className="mt-0.5 text-sm font-medium text-char">{r.titel}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

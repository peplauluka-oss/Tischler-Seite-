/**
 * Zwei Zeichen, mehr braucht die Seite nicht.
 *
 * Sie stehen dort, wo ein Weg aus der Seite herausführt — ans Telefon und
 * zum Kanal des Clubs. Ein Bild sagt das schneller als ein Wort: Wer die
 * Kamera-Kontur sieht, weiß, wohin der Klick geht, bevor er „Instagram“
 * gelesen hat.
 *
 * Bewusst als Kontur in der laufenden Schriftfarbe und nicht als buntes
 * Markenlogo: Der bekannte Farbverlauf wäre der einzige Farbfleck auf einer
 * Seite, die ihre Farbe aus den Fotos zieht, und würde an der Stelle mehr
 * nach fremdem Konzern aussehen als nach Black Medusa.
 */
export function PhoneGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="glyph"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.3 3.2 4.1 3a1.5 1.5 0 0 0-1.6 1.2c-.9 5 3.3 12 8.6 13.6a1.5 1.5 0 0 0 1.8-.9l.9-2.1a1 1 0 0 0-.5-1.3l-2.4-1a1 1 0 0 0-1.2.3l-.7.9a9.4 9.4 0 0 1-3.4-5.2l1-.5a1 1 0 0 0 .6-1.1l-.4-2.6a1 1 0 0 0-.5-.7Z" />
    </svg>
  );
}

export function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="glyph"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2.6" y="2.6" width="14.8" height="14.8" rx="4.4" />
      <circle cx="10" cy="10" r="3.7" />
      <circle cx="14.4" cy="5.6" r="0.95" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Dasselbe Zeichen, aber in den Farben, die jeder kennt — und nur dort, wo
 * vorher Weiß war: Die Kontur trägt den Verlauf, die Fläche dahinter bleibt
 * der Seitengrund. So bleibt das Zeichen ein Zeichen und wird nicht zur
 * Kachel, die aus einer dunklen Seite heraussticht wie ein App-Symbol.
 *
 * Der Verlauf läuft von unten links nach oben rechts, weil das Original
 * sein Licht dort hat: Gelb über Orange und Pink nach Violett und Blau.
 *
 * Steht bewusst nur an einer einzigen Stelle — dort, wo Instagram das
 * Angebot IST („Neue Termine stehen auf Instagram“) und rundherum Platz
 * ist. In der engen Kontaktzeile weiter unten bleibt die Kontur einfarbig;
 * zweimal dieselbe Buntheit auf einer Seite macht aus einem Akzent eine
 * Dekoration.
 */
export function InstagramGlyphBrand({
  size = 30,
  id = "bm-ig-gradient",
}: {
  size?: number;
  /** Nur nötig, falls das Zeichen je zweimal auf einer Seite steht. */
  id?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={id}
          /* Ohne diese Angabe liest der Browser die Koordinaten als
             Bruchteile der Objektbox, nicht als Einheiten des viewBox —
             der Verlauf landet außerhalb des Zeichens und es bleibt eine
             einzige Farbe übrig. */
          gradientUnits="userSpaceOnUse"
          x1="2"
          y1="18"
          x2="18"
          y2="2"
        >
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="52%" stopColor="#D62976" />
          <stop offset="76%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect
        x="2.4"
        y="2.4"
        width="15.2"
        height="15.2"
        rx="4.6"
        stroke={`url(#${id})`}
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="3.8" stroke={`url(#${id})`} strokeWidth="1.5" />
      <circle cx="14.5" cy="5.5" r="1.05" fill={`url(#${id})`} />
    </svg>
  );
}

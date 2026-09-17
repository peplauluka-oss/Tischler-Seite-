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

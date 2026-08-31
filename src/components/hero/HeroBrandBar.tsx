import { Wordmark } from "@/components/ui/Brand";

/**
 * Die Brandingleiste des Ankunftszustands.
 *
 * Sie sitzt exakt auf der Höhe der späteren Navigation und trägt dieselbe
 * Haarlinie — beim Scrollen wandert die Wortmarke nach links und verblasst,
 * während die Navigation an derselben Stelle erscheint. Es soll wie *eine*
 * Leiste wirken, die sich verwandelt, nicht wie zwei Elemente.
 *
 * Ruhezustand (CSS-Default) ist unsichtbar: Nach der Verwandlung übernimmt
 * die Navigation. Den sichtbaren Ausgangszustand setzt die GSAP-Timeline.
 */
export default function HeroBrandBar() {
  return (
    <div
      data-hero-brandbar
      className="pointer-events-none absolute inset-x-0 top-0 z-40 h-16 opacity-0 md:h-[74px]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 border-b border-ivory/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,4,6,0.92) 0%, rgba(5,4,6,0.55) 60%, rgba(5,4,6,0) 100%)",
        }}
      />
      <div className="relative flex h-full items-center justify-center px-5">
        <span data-hero-lockup className="block">
          <Wordmark markSize={30} className="[&_.display]:text-[0.95rem]" />
        </span>
      </div>
    </div>
  );
}

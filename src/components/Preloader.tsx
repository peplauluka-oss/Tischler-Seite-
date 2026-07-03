/**
 * Minimaler Preloader (max. ~1,6 s, rein CSS – kein Spinner, kein
 * Prozentbalken): eine feine Linie „sägt“ horizontal durch den
 * Schriftzug, dann gibt die Fläche die Szene frei.
 * Bei prefers-reduced-motion wird er komplett übersprungen (CSS).
 */
export default function Preloader() {
  return (
    <div
      className="preloader pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-wood-raw"
      aria-hidden="true"
    >
      <div className="relative overflow-hidden px-2">
        <p className="font-display text-2xl font-bold tracking-tight text-char sm:text-3xl">
          Hobbytischlerei
        </p>
        <span className="preloader-line absolute inset-y-1/2 left-0 h-px w-full bg-precision" />
      </div>
    </div>
  );
}

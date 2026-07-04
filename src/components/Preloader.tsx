/**
 * Minimaler Preloader (~1 s, rein CSS): eine feine Präzisionslinie
 * „sägt“ durch den Schriftzug, dann gibt die Fläche die Holzwand frei.
 * Kein Spinner, kein Prozentbalken. Bei prefers-reduced-motion: aus.
 */
export default function Preloader() {
  return (
    <div
      className="preloader pointer-events-none fixed inset-0 z-[95] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative overflow-hidden px-2">
        <p className="font-display text-2xl font-bold tracking-tight text-espresso sm:text-3xl">
          Hobbytischlerei
        </p>
        <span className="preloader-line absolute inset-y-1/2 left-0 h-px w-full bg-precision" />
      </div>
    </div>
  );
}

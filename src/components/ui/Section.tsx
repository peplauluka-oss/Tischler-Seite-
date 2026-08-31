import Reveal from "@/components/ui/Reveal";

/**
 * Einheitlicher Sektionsrahmen: nummerierte Kopfzeile, Haarlinie, Rhythmus.
 * Bewusst editorial statt Karten-Layout — die Seite soll nach Plakat und
 * Magazin aussehen, nicht nach Dashboard.
 */
export default function Section({
  id,
  index,
  title,
  lead,
  children,
  className = "",
  bare = false,
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-5 py-24 md:px-[7vw] md:py-32 ${className}`}
    >
      {!bare && (
        <Reveal>
          <header className="mb-12 border-t border-ivory/12 pt-6 md:mb-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="mb-3 block font-mono text-[0.6875rem] tracking-[0.3em] text-ember">
                  {index}
                </span>
                <h2
                  className="display text-ivory"
                  style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)" }}
                >
                  {title}
                </h2>
              </div>
              {lead && (
                <p className="max-w-sm text-sm leading-relaxed text-mute md:text-right">
                  {lead}
                </p>
              )}
            </div>
          </header>
        </Reveal>
      )}
      {children}
    </section>
  );
}

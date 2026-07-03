import { ACTS, STORY_VH, type ActId } from "./acts";

/**
 * Eine DOM-Sektion der Scroll-Story (Server-Komponente – SEO!).
 *
 * Jede Sektion bekommt einen „Slot“ im 700vh-Wrapper, der exakt dem
 * Akt-Fenster aus acts.ts entspricht (absolute Position + Höhe).
 * Innerhalb des Slots klebt der Inhalt per position:sticky im Viewport,
 * solange der Akt läuft.
 *
 * Ohne JavaScript / mit reduced motion funktioniert das Layout genauso –
 * die Inhalte stehen dann einfach untereinander auf der Strecke, jede
 * Sektion zeigt ihr statisches Keyvisual (Klasse .keyvisual wird nur
 * im 3D-Modus ausgeblendet).
 */
export default function ActSection({
  act,
  id,
  label,
  children,
  keyvisual,
}: {
  act: ActId;
  /** Anker-ID für CTAs & Navigation */
  id: string;
  /** kleines Mono-Label im Werkstattzeichnungs-Stil, z. B. "Akt 02 · Der Schnitt" */
  label: string;
  children: React.ReactNode;
  /** statisches Fallback-Bild (SVG) für die Fallback-Kaskade */
  keyvisual?: React.ReactNode;
}) {
  const { start, end } = ACTS[act];
  return (
    <section
      id={id}
      className="absolute inset-x-0"
      style={{
        top: `${start * STORY_VH}vh`,
        height: `${(end - start) * STORY_VH}vh`,
      }}
    >
      <div
        data-act-content
        className="sticky top-0 flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="tech-label mb-6">{label}</p>
          {keyvisual && (
            <div className="keyvisual mb-8" aria-hidden={undefined}>
              {keyvisual}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Brand";
import { club } from "@/content/club";
import { eventBySlug, eventDate, eventFullTitle } from "@/content/events";
import { useBooking } from "@/lib/booking";
import { isContactValid } from "@/lib/contact";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { bookingMessage, whatsappHref } from "@/lib/whatsapp";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

const GROUPS = ["1–2", "3–5", "6–10", "11+"] as const;

/**
 * GÄSTELISTE UND TISCH — zwei Fragen, dann WhatsApp.
 *
 * Hier stand vorher ein vierstufiges Formular. Für einen Club ist das der
 * falsche Weg: Der Betreiber antwortet ohnehin über WhatsApp, und jede
 * zusätzliche Stufe kostet Anfragen. Geblieben ist, was der Club wirklich
 * wissen muss — wie viele, wer — und der Rest steht schon in der Nachricht.
 *
 * Der Event-Kontext kommt mit: Wer aus einer Nacht heraus öffnet, muss sie
 * nicht noch einmal auswählen.
 *
 * DIE GÄSTELISTE fragt zusätzlich einen Kontakt ab — E-Mail oder Nummer,
 * eins von beiden, ein Feld. Für den Gast ist es die Adresse, unter der die
 * Zusage ankommt; für den Club die einzige Spur, die aus einer Anfrage
 * später eine Einladung machen kann. Beim Tisch steht sie nicht: Dort ist
 * die Rückmeldung der Chat selbst, und ein Pflichtfeld mehr vor dem
 * wichtigsten Knopf der Seite kostet Buchungen.
 */
export default function BookingOverlay() {
  const { isOpen, mode, eventSlug, open, close, restoreFocus } = useBooking();
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [people, setPeople] = useState<string>(GROUPS[1]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  /* Der Hinweis erscheint erst, wenn jemand senden wollte — nicht, während
     er noch tippt. Eine Fehlermeldung beim ersten Zeichen ist eine
     Beschuldigung, keine Hilfe. */
  const [contactTouched, setContactTouched] = useState(false);
  const contactRef = useRef<HTMLInputElement>(null);

  const event = eventSlug ? eventBySlug(eventSlug) ?? null : null;
  const guestlist = mode === "guestlist";

  const contactOk = !guestlist || isContactValid(contact);
  const showContactHint = guestlist && contactTouched && !contactOk;

  const message = useMemo(
    () => bookingMessage({ mode, event, people, name, contact: guestlist ? contact : "" }),
    [mode, event, people, name, contact, guestlist],
  );

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    window.requestAnimationFrame(() => panel.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      restoreFocus();
    };
  }, [isOpen, close, restoreFocus]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-200 flex justify-center md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={close}
            className="absolute inset-0 cursor-default bg-void/92 backdrop-blur-md"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease }}
            className="relative flex h-[100dvh] w-full flex-col bg-void outline-none
                       md:h-auto md:max-h-[88svh] md:max-w-xl md:border md:border-ivory/12"
          >
            <header className="flex shrink-0 items-center justify-between gap-4 px-5 pt-5 md:px-10 md:pt-8">
              <Logo width={112} />
              <button
                type="button"
                onClick={close}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-mute transition-colors hover:text-ivory"
              >
                <span className="sr-only">Schließen</span>
                <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
                  <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 md:px-10 md:pb-10">
              <span className="label label-accent">
                {guestlist ? "Gästeliste" : "Tisch"}
              </span>
              <h2
                id="booking-title"
                className="display display-stack mt-3 text-[clamp(2.25rem,9vw,3.25rem)] text-ivory"
              >
                {guestlist ? "Auf die Liste" : "Tisch für deine Leute"}
              </h2>

              {/* Der Kontext, aus dem heraus geöffnet wurde. */}
              {event && (
                <p className="mt-3 text-sm text-mute">
                  {eventFullTitle(event)} · {eventDate(event).short} · Einlass{" "}
                  {eventDate(event).time}
                </p>
              )}

              <fieldset className="mt-9">
                <legend className="label">Wie viele seid ihr?</legend>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {GROUPS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setPeople(g)}
                      aria-pressed={people === g}
                      className="choice choice-sm"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7">
                <label htmlFor="booking-name" className="label">
                  Auf welchen Namen?
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Vorname reicht"
                  className="field mt-3 w-full"
                />
              </div>

              {guestlist && (
                <div className="mt-7">
                  <label htmlFor="booking-contact" className="label">
                    E-Mail oder Handynummer
                  </label>
                  <input
                    ref={contactRef}
                    id="booking-contact"
                    /* Bewusst `text` und nicht `email`: Die native Prüfung
                       würde jede Telefonnummer abweisen. Welches von beiden
                       es ist, erkennt die Eingabe selbst. */
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    autoComplete="email"
                    aria-invalid={showContactHint || undefined}
                    aria-describedby="booking-contact-hint"
                    placeholder="name@mail.de oder 0170 1234567"
                    className="field mt-3 w-full"
                  />
                  <p
                    id="booking-contact-hint"
                    className={`mt-2.5 text-[0.8125rem] leading-relaxed ${
                      showContactHint ? "text-ember-soft" : "text-mute"
                    }`}
                  >
                    {showContactHint
                      ? "Bitte eine E-Mail-Adresse oder eine Handynummer eintragen — darüber kommt die Zusage."
                      : "Damit die Zusage bei dir ankommt. Eins von beiden reicht."}
                  </p>
                </div>
              )}

              <a
                href={whatsappHref(message)}
                target="_blank"
                rel="noreferrer noopener"
                aria-disabled={!contactOk || undefined}
                onClick={(e) => {
                  if (!contactOk) {
                    /* Kein toter Knopf: Der Weg bleibt sichtbar, der Grund
                       steht am Feld, und der Cursor springt dorthin. */
                    e.preventDefault();
                    setContactTouched(true);
                    contactRef.current?.focus();
                    return;
                  }
                  close();
                }}
                className={`cta cta-glow mt-8 w-full ${
                  contactOk ? "" : "opacity-55"
                }`}
              >
                ÜBER WHATSAPP SENDEN
                <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
                  <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>

              <p className="mt-4 text-[0.8125rem] leading-relaxed text-mute">
                Die Nachricht steht fertig im Chat — du kannst sie vor dem Senden
                ändern. Lieber anrufen?{" "}
                <a
                  href={club.phoneHref}
                  className="link-inline"
                >
                  {club.phone}
                </a>
              </p>

              {/* Der jeweils andere Weg — als Zeile, nicht als zweiter Knopf. */}
              <button
                type="button"
                onClick={() => {
                  setContactTouched(false);
                  open(guestlist ? "table" : "guestlist", eventSlug);
                }}
                className="cta-quiet mt-8"
              >
                {guestlist ? "Stattdessen einen Tisch" : "Stattdessen auf die Gästeliste"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

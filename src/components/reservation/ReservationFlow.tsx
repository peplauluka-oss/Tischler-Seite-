"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Arrow } from "@/components/ui/Cta";
import {
  contactChannels,
  event,
  groupSizes,
  type ContactChannelId,
  type GroupSizeId,
} from "@/content/event";

type StepId = "group" | "date" | "channel" | "contact";
const STEPS: StepId[] = ["group", "date", "channel", "contact"];

const QUESTION: Record<StepId, string> = {
  group: "Wie viele seid ihr?",
  date: "Wann kommt ihr?",
  channel: "Wie erreichen wir euch?",
  contact: "Fast geschafft.",
};

/**
 * Reservierung als kurze Strecke statt als Formular.
 *
 * Eine Entscheidung pro Schritt: Auf dem Telefon sieht man nie mehr als eine
 * Frage, es gibt nichts zu überfliegen und keine Tastatur, bevor sie nötig
 * ist. Erst der letzte Schritt fragt nach Daten — und zwar nur nach denen,
 * die für einen Rückruf gebraucht werden.
 *
 * Die Bedienelemente stehen bewusst IM Fluss, nicht in einer fixierten
 * Leiste: Eine fixierte Fußzeile verschwindet auf dem Telefon regelmäßig
 * hinter der eingeblendeten Tastatur.
 */
export default function ReservationFlow({
  onClose,
  autoFocus = false,
}: {
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [group, setGroup] = useState<GroupSizeId | null>(null);
  const [dateChoice, setDateChoice] = useState<"event" | "other" | null>(null);
  const [otherDate, setOtherDate] = useState("");
  const [channel, setChannel] = useState<ContactChannelId | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const step = STEPS[stepIndex];

  const go = (next: number) => {
    setStepIndex(next);
    // Fokus auf die neue Frage — Screenreader und Tastatur folgen dem Schritt.
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const advance = () => go(Math.min(STEPS.length - 1, stepIndex + 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) found.name = "Bitte Namen angeben.";
    if ((phone.match(/\d/g) ?? []).length < 6)
      found.phone = "Bitte eine erreichbare Nummer angeben.";
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(found.name ? "res-name" : "res-phone")?.focus();
      return;
    }
    setSending(true);
    // Prototyp: kein Backend. Die kurze Verzögerung bildet nur den echten
    // Absendevorgang ab, damit der Zustand bewertbar ist.
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  };

  const chosenGroup = groupSizes.find((g) => g.id === group);
  const chosenChannel = contactChannels.find((c) => c.id === channel);

  /* ---------------------------------------------------------------- Erfolg */
  if (sent) {
    return (
      <div className="py-4">
        <span className="label label-accent">Anfrage raus</span>
        <p
          className="display mt-4 text-ivory"
          style={{ fontSize: "clamp(2.5rem, 9vw, 4rem)" }}
        >
          Wir melden uns
        </p>
        <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
          {chosenChannel?.id === "whatsapp"
            ? "Ihr bekommt eine WhatsApp zur Bestätigung."
            : "Wir rufen euch zur Bestätigung zurück."}{" "}
          Der Tisch gilt erst, wenn wir bestätigt haben.
        </p>

        <ul className="mt-8 space-y-3 border-t border-ivory/12 pt-6 text-sm">
          <li className="flex justify-between gap-4">
            <span className="label text-[0.625rem]">Nacht</span>
            <span className="text-ivory">
              {dateChoice === "other" && otherDate
                ? otherDate
                : `${event.headliner} · ${event.dateShort}`}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="label text-[0.625rem]">Gruppe</span>
            <span className="text-ivory">{chosenGroup?.label} Personen</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="label text-[0.625rem]">Name</span>
            <span className="text-ivory">{name}</span>
          </li>
        </ul>

        <p className="mt-6 text-[0.6875rem] leading-relaxed text-ember-soft/90">
          PROTOTYP — diese Anfrage wurde nicht versendet und nicht gespeichert.
        </p>

        {onClose && (
          <button type="button" onClick={onClose} className="cta mt-8 w-full sm:w-auto">
            Zurück zur Seite
            <Arrow />
          </button>
        )}
      </div>
    );
  }

  /* ----------------------------------------------------------------- Ablauf */
  return (
    <div>
      {/* Fortschritt: eine Linie, kein Balkendiagramm. */}
      <div className="flex items-center gap-4">
        <span className="label text-[0.625rem]">
          Schritt {String(stepIndex + 1).padStart(2, "0")} / 04
        </span>
        <span className="h-px flex-1 bg-ivory/12" aria-hidden="true">
          <span
            className="block h-px bg-ember transition-[width] duration-500 ease-out"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </span>
      </div>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="display mt-6 text-ivory outline-none"
        style={{ fontSize: "clamp(2.25rem, 8vw, 3.5rem)" }}
      >
        {QUESTION[step]}
      </h3>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7"
        >
          {step === "group" && (
            <div className="space-y-2.5">
              {groupSizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  className="choice"
                  data-selected={group === size.id}
                  onClick={() => {
                    setGroup(size.id);
                    advance();
                  }}
                >
                  <span className="display text-2xl">{size.label}</span>
                  <span className="text-[0.75rem] font-semibold text-mute">
                    {size.hint}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === "date" && (
            <div className="space-y-2.5">
              <button
                type="button"
                className="choice"
                data-selected={dateChoice === "event"}
                onClick={() => {
                  setDateChoice("event");
                  setOtherDate("");
                  advance();
                }}
              >
                <span>
                  <span className="display block text-2xl text-ivory">
                    {event.headliner}
                  </span>
                  <span className="mt-1 block text-[0.75rem] font-semibold text-mute">
                    {event.dateShort} · Einlass {event.doors}
                  </span>
                </span>
                <Arrow className="shrink-0 text-mute" />
              </button>

              <button
                type="button"
                className="choice"
                data-selected={dateChoice === "other"}
                onClick={() => setDateChoice("other")}
              >
                <span>Anderer Termin</span>
                <Arrow className="shrink-0 text-mute" />
              </button>

              {dateChoice === "other" && (
                <div className="pt-4">
                  <label htmlFor="res-date" className="label text-[0.625rem]">
                    Wunschdatum
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    value={otherDate}
                    onChange={(e) => setOtherDate(e.target.value)}
                    className="field mt-2"
                  />
                  <button
                    type="button"
                    onClick={advance}
                    className="cta mt-6 w-full sm:w-auto"
                  >
                    Weiter
                    <Arrow />
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "channel" && (
            <div className="space-y-2.5">
              {contactChannels.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="choice"
                  data-selected={channel === c.id}
                  onClick={() => {
                    setChannel(c.id);
                    advance();
                  }}
                >
                  <span className="text-base">{c.label}</span>
                  <span className="text-[0.75rem] font-semibold text-mute">
                    {c.hint}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={submit} noValidate>
              <div className="space-y-7">
                <div>
                  <label htmlFor="res-name" className="label text-[0.625rem]">
                    Name
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    autoComplete="name"
                    autoFocus={autoFocus}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "res-name-error" : undefined}
                    className="field mt-2"
                    placeholder="Wer reserviert?"
                  />
                  {errors.name && (
                    <p id="res-name-error" role="alert" className="mt-2 text-xs text-ember-soft">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-phone" className="label text-[0.625rem]">
                    {chosenChannel?.id === "whatsapp" ? "WhatsApp-Nummer" : "Telefon"}
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "res-phone-error" : undefined}
                    className="field mt-2"
                    placeholder="+49 …"
                  />
                  {errors.phone && (
                    <p id="res-phone-error" role="alert" className="mt-2 text-xs text-ember-soft">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Zusammenfassung, damit niemand zurückblättern muss. */}
              <p className="mt-8 text-[0.8125rem] leading-relaxed text-mute">
                {chosenGroup?.label} Personen ·{" "}
                {dateChoice === "other" && otherDate
                  ? otherDate
                  : `${event.headliner}, ${event.dateShort}`}{" "}
                · {chosenChannel?.label}
              </p>

              {/* Im Fluss statt fixiert: bleibt über der Tastatur erreichbar. */}
              <button type="submit" disabled={sending} className="cta mt-6 w-full">
                {sending ? "Wird gesendet …" : "Tisch anfragen"}
                <Arrow />
              </button>

              <p className="mt-4 text-[0.6875rem] leading-relaxed text-mute">
                Anfrage, keine Bestätigung. Eintritt an der Abendkasse.
              </p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={() => go(stepIndex - 1)}
          className="cta-quiet mt-10 border-b-0"
        >
          <Arrow className="rotate-180" />
          Zurück
        </button>
      )}
    </div>
  );
}

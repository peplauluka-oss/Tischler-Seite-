"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { event, guestRange, tableCategories, type TableCategoryId } from "@/content/event";

type Status = "form" | "sending" | "success";

type Errors = Partial<Record<"name" | "phone", string>>;

export default function ReservationForm({ onClose }: { onClose: () => void }) {
  const reduced = useReducedMotion();

  const [guests, setGuests] = useState<number>(guestRange.default);
  const [category, setCategory] = useState<TableCategoryId>("standard");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("form");

  const setGuestCount = (next: number) =>
    setGuests(Math.min(guestRange.max, Math.max(guestRange.min, next)));

  const validate = (): Errors => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Bitte Namen angeben.";
    // Absichtlich tolerant: Ziffern, Leerzeichen, +, -, /, ( ) — mindestens 6 Ziffern.
    if ((phone.match(/\d/g) ?? []).length < 6)
      next.phone = "Bitte eine erreichbare Telefonnummer angeben.";
    return next;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = document.getElementById(
        found.name ? "res-name" : "res-phone",
      );
      firstField?.focus();
      return;
    }

    setStatus("sending");
    // Prototyp: kein Backend. Die Verzögerung bildet nur den echten
    // Absendevorgang ab, damit der Zustand bewertbar ist.
    window.setTimeout(() => setStatus("success"), 900);
  };

  const reset = () => {
    setStatus("form");
    setName("");
    setPhone("");
    setMessage("");
    setGuests(guestRange.default);
    setCategory("standard");
    setErrors({});
  };

  const selectedCategory = tableCategories.find((c) => c.id === category);

  if (status === "success") {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col justify-center py-6"
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center border border-ember">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            <path
              d="M2 10.5l5 5 11-11"
              fill="none"
              stroke="var(--color-ember-soft)"
              strokeWidth="1.8"
            />
          </svg>
        </span>

        <h3
          className="display mt-7 text-ivory"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
        >
          ANFRAGE GESENDET
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">
          Wir melden uns zur Bestätigung telefonisch. Der Tisch gilt erst mit
          unserer Rückmeldung als reserviert.
        </p>

        <dl className="mt-8 border-t border-ivory/12 text-sm">
          <div className="flex justify-between gap-4 border-b border-ivory/10 py-3">
            <dt className="eyebrow text-[0.5625rem]">EVENT</dt>
            <dd className="text-ivory">
              {event.headliner} · {event.dateShort}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-ivory/10 py-3">
            <dt className="eyebrow text-[0.5625rem]">GÄSTE</dt>
            <dd className="text-ivory">{guests}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-ivory/10 py-3">
            <dt className="eyebrow text-[0.5625rem]">TISCH</dt>
            <dd className="text-ivory">{selectedCategory?.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="eyebrow text-[0.5625rem]">NAME</dt>
            <dd className="text-ivory">{name}</dd>
          </div>
        </dl>

        <p className="mt-6 font-mono text-[0.5625rem] leading-relaxed tracking-[0.16em] text-ember-soft/90">
          PROTOTYP: DIESE ANFRAGE WURDE NICHT VERSENDET UND NICHT GESPEICHERT.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onClose} className="btn btn-primary">
            ZURÜCK ZUR SEITE
          </button>
          <button type="button" onClick={reset} className="btn btn-ghost">
            NEUE ANFRAGE
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="py-1">
      {/* GÄSTE */}
      <fieldset className="border-t border-ivory/12 pt-6">
        <legend className="sr-only">Anzahl der Gäste</legend>
        <div className="flex items-center justify-between gap-6">
          <span className="eyebrow text-[0.5625rem]">GÄSTE</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setGuestCount(guests - 1)}
              disabled={guests <= guestRange.min}
              className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory transition-colors hover:border-ivory/45 disabled:opacity-30"
            >
              <span className="sr-only">Ein Gast weniger</span>
              <svg viewBox="0 0 12 2" width="12" height="2" aria-hidden="true">
                <path d="M0 1h12" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <output
              aria-live="polite"
              className="w-14 text-center font-mono text-xl tabular-nums text-ivory"
            >
              {guests}
            </output>
            <button
              type="button"
              onClick={() => setGuestCount(guests + 1)}
              disabled={guests >= guestRange.max}
              className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory transition-colors hover:border-ivory/45 disabled:opacity-30"
            >
              <span className="sr-only">Ein Gast mehr</span>
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>
        <p className="mt-2 text-right font-mono text-[0.5625rem] tracking-[0.18em] text-mute">
          GRÖSSERE GRUPPEN: BITTE IM NACHRICHTENFELD VERMERKEN
        </p>
      </fieldset>

      {/* TISCH */}
      <fieldset className="mt-8 border-t border-ivory/12 pt-6">
        <legend className="sr-only">Tischkategorie</legend>
        <p aria-hidden="true" className="eyebrow mb-4 text-[0.5625rem]">TISCH</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {tableCategories.map((cat) => {
            const active = category === cat.id;
            return (
              <label
                key={cat.id}
                className={`relative flex cursor-pointer flex-col gap-1 border p-4 transition-colors ${
                  active
                    ? "border-ember bg-ember/8"
                    : "border-ivory/14 hover:border-ivory/35"
                }`}
              >
                <input
                  type="radio"
                  name="table-category"
                  value={cat.id}
                  checked={active}
                  onChange={() => setCategory(cat.id)}
                  className="sr-only"
                />
                <span
                  className={`text-[0.75rem] font-bold tracking-[0.16em] ${
                    cat.accent && active ? "text-gold" : "text-ivory"
                  }`}
                >
                  {cat.name}
                </span>
                <span className="text-[0.6875rem] leading-snug text-mute">
                  {cat.hint}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* KONTAKT */}
      <fieldset className="mt-8 border-t border-ivory/12 pt-6">
        <legend className="sr-only">Kontaktdaten</legend>
        <p aria-hidden="true" className="eyebrow mb-4 text-[0.5625rem]">KONTAKT</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="res-name" className="mb-2 block text-xs text-mute">
              Name *
            </label>
            <input
              id="res-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "res-name-error" : undefined}
              className="field"
              placeholder="Vor- und Nachname"
            />
            {errors.name && (
              <p id="res-name-error" role="alert" className="mt-2 text-xs text-ember-soft">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="res-phone" className="mb-2 block text-xs text-mute">
              Telefon *
            </label>
            <input
              id="res-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "res-phone-error" : undefined}
              className="field"
              placeholder="+49 …"
            />
            {errors.phone && (
              <p id="res-phone-error" role="alert" className="mt-2 text-xs text-ember-soft">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="res-message" className="mb-2 block text-xs text-mute">
            Nachricht (optional)
          </label>
          <textarea
            id="res-message"
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="field resize-none"
            placeholder="Anlass, Ankunftszeit, Wünsche …"
          />
        </div>
      </fieldset>

      {/* Die Primäraktion bleibt sichtbar, egal wie weit gescrollt wurde. */}
      <div className="sticky bottom-0 -mx-6 mt-8 border-t border-ivory/10 bg-ink/95 px-6 pb-6 pt-5 backdrop-blur-md md:-mx-8 md:px-8 md:pb-8">
        {/* Inhalt läuft unter der Leiste weich aus, statt hart abzuschneiden. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-ink to-transparent"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary w-full disabled:opacity-70"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {status === "sending" ? "WIRD GESENDET …" : "TISCH RESERVIEREN"}
            </motion.span>
          </AnimatePresence>
        </button>

        <p className="mt-3 font-mono text-[0.5625rem] leading-relaxed tracking-[0.16em] text-mute">
          PROTOTYP — KEINE DATENÜBERTRAGUNG. ANFRAGE IST KEINE BESTÄTIGUNG.
        </p>
      </div>
    </form>
  );
}

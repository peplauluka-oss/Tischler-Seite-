"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { anliegenOptions, type AnliegenKey } from "@/content/site";

/**
 * Kontaktformular mit Client-Validierung und DSGVO-Checkbox.
 *
 * Vorauswahl des Anliegens auf zwei Wegen:
 *  1. ?anliegen=kurs in der URL (z. B. von den Angebots-Unterseiten)
 *  2. Klick auf ein Element mit data-anliegen (CTAs innerhalb der Story –
 *     ohne Navigation, das Formular hört global mit)
 */
export default function ContactForm({
  defaultAnliegen,
}: {
  defaultAnliegen?: AnliegenKey;
}) {
  const [anliegen, setAnliegen] = useState<AnliegenKey>(defaultAnliegen ?? "kurs");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Weg 1: Query-Parameter (funktioniert auch bei direkten Links)
    const param = new URLSearchParams(window.location.search).get("anliegen");
    if (param && anliegenOptions.some((o) => o.value === param)) {
      setAnliegen(param as AnliegenKey);
    }
    // Weg 2: CTA-Klicks mit data-anliegen
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-anliegen]");
      const val = el?.dataset.anliegen;
      if (val && anliegenOptions.some((o) => o.value === val)) {
        setAnliegen(val as AnliegenKey);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const errs: Record<string, string> = {};
    if (!String(data.name).trim()) errs.name = "Bitte geben Sie Ihren Namen an.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email))) {
      errs.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    }
    if (!String(data.nachricht).trim()) {
      errs.nachricht = "Bitte beschreiben Sie kurz Ihr Anliegen.";
    }
    if (!data.datenschutz) {
      errs.datenschutz = "Bitte stimmen Sie der Datenverarbeitung zu.";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${base}/api/kontakt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("ok");
      form.reset();
    } catch {
      // Fallback (z. B. statisches Hosting ohne Backend): E-Mail-Programm
      // mit vorausgefüllter Nachricht öffnen – der Conversion-Pfad bleibt offen.
      const betreff = encodeURIComponent(`Anfrage: ${anliegen}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nTelefon: ${data.telefon || "-"}\n\n${data.nachricht}`
      );
      window.location.href = `mailto:service@hobbytischlerei.de?subject=${betreff}&body=${body}`;
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-precision/10 p-6 text-char" role="status">
        <p className="font-display text-xl font-bold">Vielen Dank für Ihre Nachricht!</p>
        <p className="mt-2 text-sm text-char/75">
          Wir haben Ihre Anfrage erhalten und melden uns so schnell wie
          möglich. Dringend? Rufen Sie uns an: +49 30 74 76 92 40.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-char/20 bg-white/70 px-3.5 py-2.5 text-sm text-char placeholder:text-char/40 focus:border-precision";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kf-name" className="mb-1 block text-sm font-medium">
            Name *
          </label>
          <input id="kf-name" name="name" type="text" autoComplete="name" required className={inputCls} />
          {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="kf-email" className="mb-1 block text-sm font-medium">
            E-Mail *
          </label>
          <input id="kf-email" name="email" type="email" autoComplete="email" required className={inputCls} />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kf-telefon" className="mb-1 block text-sm font-medium">
            Telefon <span className="font-normal text-char/50">(optional)</span>
          </label>
          <input id="kf-telefon" name="telefon" type="tel" autoComplete="tel" className={inputCls} />
        </div>
        <div>
          <label htmlFor="kf-anliegen" className="mb-1 block text-sm font-medium">
            Ihr Anliegen *
          </label>
          <select
            id="kf-anliegen"
            name="anliegen"
            value={anliegen}
            onChange={(e) => setAnliegen(e.target.value as AnliegenKey)}
            className={inputCls}
          >
            {anliegenOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="kf-nachricht" className="mb-1 block text-sm font-medium">
          Ihre Nachricht *
        </label>
        <textarea id="kf-nachricht" name="nachricht" rows={5} required className={inputCls} />
        {errors.nachricht && <p className="mt-1 text-xs text-red-700">{errors.nachricht}</p>}
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-char/75">
          <input
            type="checkbox"
            name="datenschutz"
            className="mt-0.5 h-4 w-4 accent-precision"
            required
          />
          <span>
            Ich habe die{" "}
            <Link href="/datenschutz" className="underline underline-offset-2 hover:text-char">
              Datenschutzerklärung
            </Link>{" "}
            gelesen und stimme der Verarbeitung meiner Angaben zur
            Beantwortung meiner Anfrage zu. *
          </span>
        </label>
        {errors.datenschutz && <p className="mt-1 text-xs text-red-700">{errors.datenschutz}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-char px-6 py-3 font-medium text-cream transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-walnut active:scale-[0.97] active:duration-150 disabled:opacity-60 disabled:active:scale-100"
      >
        {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder
          rufen Sie uns an: +49 30 74 76 92 40.
        </p>
      )}
    </form>
  );
}

import { NextResponse } from "next/server";

/**
 * Nimmt Kontaktanfragen entgegen.
 *
 * [PLATZHALTER: E-Mail-Versand anbinden]
 * Für den Livegang hier einen Transaktions-Mail-Dienst integrieren
 * (z. B. Resend, Postmark oder SMTP des Kunden) und die Anfrage an
 * service@hobbytischlerei.de weiterleiten. Bis dahin wird die Anfrage
 * nur serverseitig protokolliert und positiv beantwortet, damit der
 * komplette Conversion-Pfad durchklickbar ist.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const nachricht = String(data.nachricht ?? "").trim();
  const datenschutz = Boolean(data.datenschutz);

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !nachricht || !datenschutz) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  console.log("[Kontaktanfrage]", {
    name,
    email,
    telefon: data.telefon,
    anliegen: data.anliegen,
    zeichen: nachricht.length,
  });

  return NextResponse.json({ ok: true });
}

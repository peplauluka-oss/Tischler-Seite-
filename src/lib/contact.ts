/* ---------------------------------------------------------------------------
   KONTAKT FÜR DIE GÄSTELISTE.

   Ein Feld, zwei erlaubte Formate. Zwei getrennte Felder mit „eins von
   beiden muss ausgefüllt sein“ sind die verlässlichste Art, eine Anfrage zu
   verlieren: Der Gast überlegt, welches gemeint ist, füllt im Zweifel beide
   oder keines aus und bekommt am Ende eine Fehlermeldung an einem Feld, das
   er absichtlich leer gelassen hat.

   Deshalb entscheidet nicht der Gast, welche Art Kontakt er gibt, sondern
   die Eingabe selbst: Was ein @ und einen Punkt dahinter hat, ist eine
   Adresse; was genug Ziffern hat, eine Nummer.
--------------------------------------------------------------------------- */

export type ContactKind = "email" | "phone" | null;

/** Absichtlich nachsichtig: Die Nachricht geht an einen Menschen, nicht an
    einen Mailserver. Aussortiert wird, was sicher nichts davon ist. */
export function contactKind(value: string): ContactKind {
  const v = value.trim();
  if (!v) return null;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "email";
  const digits = v.replace(/\D/g, "");
  if (digits.length >= 7 && /^[+0-9][\d\s/().-]*$/.test(v)) return "phone";
  return null;
}

export function isContactValid(value: string): boolean {
  return contactKind(value) !== null;
}

import { club } from "@/content/club";
import { eventDate, eventFullTitle, type MedusaEvent } from "@/content/events";
import type { BookingMode } from "@/lib/booking";
import { contactKind } from "@/lib/contact";

/**
 * Die Anfrage wird als fertige Nachricht übergeben, nicht als Formular
 * verschickt: Der Gast sieht, was er sendet, kann es ändern, und der Club
 * bekommt sie dort, wo er ohnehin antwortet.
 *
 * Der Event-Kontext steckt in der Nachricht — wer aus einer bestimmten Nacht
 * heraus schreibt, muss sie nicht noch einmal nennen.
 */
export function bookingMessage({
  mode,
  event,
  people,
  name,
  contact = "",
}: {
  mode: BookingMode;
  event: MedusaEvent | null;
  people: string;
  name: string;
  /** E-Mail oder Telefonnummer — steht in der Nachricht, damit der Club
      antworten kann, ohne im Chatverlauf nach dem Absender zu suchen. */
  contact?: string;
}): string {
  const what = mode === "guestlist" ? "Gästeliste" : "Tisch";
  const when = event ? ` für ${eventFullTitle(event)}, ${eventDate(event).short}` : "";
  const who = name.trim() ? ` Name: ${name.trim()}.` : "";
  /* Benannt statt nur angehängt: Der Club sieht im Chat auf einen Blick,
     ob eine Adresse oder eine Nummer dasteht — und kann die Anfragen
     später danach sortieren, ohne jede einzelne zu lesen. */
  const kind = contactKind(contact);
  const label = kind === "email" ? "E-Mail" : kind === "phone" ? "Telefon" : "Kontakt";
  const how = contact.trim() ? ` ${label}: ${contact.trim()}.` : "";
  return `Hallo ${club.nameFull}, ${what}${when} — ${people} Personen.${who}${how}`;
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(message)}`;
}

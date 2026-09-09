import { club } from "@/content/club";
import { eventDate, eventFullTitle, type MedusaEvent } from "@/content/events";
import type { BookingMode } from "@/lib/booking";

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
}: {
  mode: BookingMode;
  event: MedusaEvent | null;
  people: string;
  name: string;
}): string {
  const what = mode === "guestlist" ? "Gästeliste" : "Tisch";
  const when = event ? ` für ${eventFullTitle(event)}, ${eventDate(event).short}` : "";
  const who = name.trim() ? ` Name: ${name.trim()}.` : "";
  return `Hallo ${club.nameFull}, ${what}${when} — ${people} Personen.${who}`;
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(message)}`;
}

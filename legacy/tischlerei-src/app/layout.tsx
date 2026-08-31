import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { localBusinessJsonLd } from "@/lib/jsonld";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* Display-Schrift: modern & charaktervoll, nicht kalt */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
/* Fließtext */
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
/* Technik-Labels & Bemaßungen (nur CAD-Layer und Zahlen) */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tischlerkurse & Mietwerkstatt in Berlin | Hobbytischlerei Kaulsdorf",
    template: "%s | Hobbytischlerei Berlin",
  },
  description:
    "Holzbearbeitung lernen, Werkstatt mieten oder Möbel nach Maß bauen lassen: Die Hobbytischlerei in Berlin-Kaulsdorf ist Ihre Erlebniswerkstatt für Holz.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Tischlerkurse & Mietwerkstatt in Berlin | Hobbytischlerei Kaulsdorf",
    description:
      "Kurse, Mietwerkstatt und Auftragsarbeiten – vom Baum zum Meisterstück in Berlin-Kaulsdorf.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tischlerkurse & Mietwerkstatt in Berlin | Hobbytischlerei Kaulsdorf",
    description:
      "Kurse, Mietwerkstatt und Auftragsarbeiten – vom Baum zum Meisterstück in Berlin-Kaulsdorf.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

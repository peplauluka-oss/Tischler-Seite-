import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

/* Display: Bebas Neue — die frei lizenzierte Schwester der im Briefing
   gewünschten Bebas Neue Pro. Versal, schmal, Plakat-Charakter. */
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

/* UI & Fließtext */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BLACK MEDUSA — Club in Berlin-Hohenschönhausen",
    template: "%s",
  },
  description:
    "Black Medusa — Club in Berlin-Hohenschönhausen. Events, Gästeliste und " +
    "Tischreservierung.",
  applicationName: "Black Medusa",
  openGraph: {
    siteName: "Black Medusa",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050406",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${bebas.variable} ${manrope.variable}`}
    >
      <body>
        {/* Läuft vor dem ersten Paint: Nur wenn Bewegung erwünscht ist,
            starten die Hero-Elemente unsichtbar — sonst bleibt die Seite
            auch ohne JavaScript vollständig lesbar. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-on')}}catch(e){}",
          }}
        />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-ember focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}

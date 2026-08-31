"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Sticky Mobile-Bar mit den zwei wichtigsten Aktionen: Anrufen & Anfragen.
 * Erscheint erst, nachdem der Hero (Akt 1) verlassen wurde – vorher
 * würde sie mit den drei Hero-CTAs konkurrieren.
 */
export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-sm gap-2 rounded-full bg-char/95 p-2 shadow-lg backdrop-blur">
        <a
          href={site.phoneHref}
          tabIndex={visible ? 0 : -1}
          className="flex-1 rounded-full bg-oak px-4 py-2.5 text-center text-sm font-medium text-char"
        >
          Anrufen
        </a>
        <Link
          href="/kontakt"
          tabIndex={visible ? 0 : -1}
          className="flex-1 rounded-full bg-cream px-4 py-2.5 text-center text-sm font-medium text-char"
        >
          Anfragen
        </Link>
      </div>
    </div>
  );
}

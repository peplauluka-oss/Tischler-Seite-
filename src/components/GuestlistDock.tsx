"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GuestlistButton } from "@/components/ui/Cta";
import { useBooking } from "@/lib/booking";

/**
 * Die wichtigste Handlung auf dem Telefon — unten, in Daumenreichweite.
 *
 * Sie erscheint erst hinter dem Hero: Dort trägt erst die Clubwelt und dann
 * das Artwork den Bildschirm, und über dem Artwork würde der Balken genau die
 * Zeile verdecken, die Tischbuchung und Adresse trägt.
 */
export default function GuestlistDock({ eventSlug = null }: { eventSlug?: string | null }) {
  const { isOpen } = useBooking();
  const [visible, setVisible] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const onScroll = () => {
      const passed = hero
        ? hero.offsetHeight + window.innerHeight * 0.55
        : window.innerHeight * 3;
      setVisible(window.scrollY > passed);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Steht der Gästelisten-Knopf gerade selbst im Bild, tritt der Balken
     zurück: Zweimal dieselbe Handlung übereinander ist keine Betonung,
     sondern Rauschen. */
  useEffect(() => {
    const ctas = document.querySelectorAll("[data-guestlist-cta]");
    if (ctas.length === 0) return;

    const shown = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) shown.add(e.target);
          else shown.delete(e.target);
        });
        setCtaInView(shown.size > 0);
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );

    ctas.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && !isOpen && !ctaInView && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-90 px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-3 lg:hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(5,4,6,0.97) 55%, rgba(5,4,6,0) 100%)",
          }}
        >
          <GuestlistButton className="w-full" eventSlug={eventSlug} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

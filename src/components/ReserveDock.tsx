"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReserveButton } from "@/components/ui/Cta";
import { useReservation } from "@/lib/reservation";

/**
 * Die Reservierung auf dem Telefon — unten, mit einer Hand erreichbar.
 *
 * Ersetzt das Menü in der Kopfzeile: Oben steht die Marke, unten die einzige
 * Aktion, die zählt. Sie erscheint erst, wenn der Hero durch ist — dort trägt
 * erst die Clubwelt und dann der Event-Zustand die Aktion ohnehin selbst, und
 * über dem Creative würde der Balken genau die Zeile verdecken, die
 * Tischbuchung und Adresse trägt.
 */
export default function ReserveDock() {
  const { isOpen } = useReservation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const onScroll = () => {
      const passed = hero
        ? hero.offsetHeight - window.innerHeight
        : window.innerHeight * 2.2;
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

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-90 px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(5,4,6,0.97) 55%, rgba(5,4,6,0) 100%)",
          }}
        >
          <ReserveButton className="w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReserveButton } from "@/components/ui/Cta";
import { event } from "@/content/event";

/**
 * Mobiler Aktionsbalken. Er erscheint erst, wenn der Hero durchlaufen ist —
 * vorher steht die Reservierung ohnehin groß im Bild. Danach bleibt die
 * Primäraktion permanent in Daumenreichweite.
 */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 2.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-90 border-t border-ivory/12 bg-void/95 px-4 py-3 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-bold tracking-[0.1em] text-ivory">
                {event.headliner}
              </p>
              <p className="truncate font-mono text-[0.5625rem] tracking-[0.18em] text-mute">
                {event.dateShort} · EINLASS {event.doors}
              </p>
            </div>
            <ReserveButton compact label="TISCH" className="shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

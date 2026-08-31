"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type ReservationContextValue = {
  isOpen: boolean;
  open: (source?: string) => void;
  close: () => void;
  /** Zuletzt fokussiertes Element — nach dem Schließen bekommt es den Fokus zurück. */
  restoreFocus: () => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const restoreFocus = useCallback(() => {
    opener.current?.focus?.();
    opener.current = null;
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close, restoreFocus }),
    [isOpen, open, close, restoreFocus],
  );

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error("useReservation muss innerhalb von <ReservationProvider> stehen");
  }
  return ctx;
}

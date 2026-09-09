"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

/** Gästeliste ist der schnelle Weg, der Tisch der für Gruppen. */
export type BookingMode = "guestlist" | "table";

type BookingState = {
  isOpen: boolean;
  mode: BookingMode;
  /** Aus welcher Nacht heraus geöffnet wurde — `null` bei Aufruf aus der
      Navigation. Der Kontext bleibt erhalten, es wird nichts neu ausgewählt. */
  eventSlug: string | null;
};

type BookingContextValue = BookingState & {
  open: (mode: BookingMode, eventSlug?: string | null) => void;
  close: () => void;
  restoreFocus: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>({
    isOpen: false,
    mode: "guestlist",
    eventSlug: null,
  });
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((mode: BookingMode, eventSlug: string | null = null) => {
    opener.current = document.activeElement as HTMLElement | null;
    setState({ isOpen: true, mode, eventSlug });
  }, []);

  const close = useCallback(
    () => setState((s) => ({ ...s, isOpen: false })),
    [],
  );

  const restoreFocus = useCallback(() => {
    opener.current?.focus?.();
    opener.current = null;
  }, []);

  const value = useMemo(
    () => ({ ...state, open, close, restoreFocus }),
    [state, open, close, restoreFocus],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking muss innerhalb von <BookingProvider> stehen");
  return ctx;
}

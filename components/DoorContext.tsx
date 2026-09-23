'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

type DoorState = { closed: boolean; kicker: string; text: string };
type DoorApi = {
  door: DoorState;
  /** Close doors, run `onClosed` while hidden, then reopen after `holdMs`. */
  runDoors: (kicker: string, text: string, onClosed: () => void, holdMs?: number) => void;
  openDoors: () => void;
};

const DoorCtx = createContext<DoorApi | null>(null);
const CLOSE_MS = 650;

export function DoorProvider({ children }: { children: ReactNode }) {
  // Doors start closed; the loader opens them when it finishes.
  const [door, setDoor] = useState<DoorState>({ closed: true, kicker: 'ENTERING', text: '' });
  const closedRef = useRef(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const openDoors = useCallback(() => {
    closedRef.current = false;
    setDoor(d => ({ ...d, closed: false }));
  }, []);

  const runDoors = useCallback<DoorApi['runDoors']>((kicker, text, onClosed, holdMs = 450) => {
    if (closedRef.current) return; // ignore clicks mid-transition
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return onClosed();
    closedRef.current = true;
    setDoor({ closed: true, kicker, text });
    timers.current.push(setTimeout(() => {
      onClosed();
      timers.current.push(setTimeout(openDoors, holdMs));
    }, CLOSE_MS));
  }, [openDoors]);

  const value = useMemo(() => ({ door, runDoors, openDoors }), [door, runDoors, openDoors]);
  return <DoorCtx.Provider value={value}>{children}</DoorCtx.Provider>;
}

export function useDoors() {
  const ctx = useContext(DoorCtx);
  if (!ctx) throw new Error('useDoors must be used inside <DoorProvider>');
  return ctx;
}

/** Door transition + jump to a section. */
export function useEnterSection() {
  const { runDoors } = useDoors();
  return useCallback((id: string, label: string) => {
    runDoors('ENTERING', label, () => {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (id === 'contact' ? 0 : 40) });
    });
  }, [runDoors]);
}

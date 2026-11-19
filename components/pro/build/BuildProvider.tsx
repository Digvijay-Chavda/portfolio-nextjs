'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AGENT_NAME, BUILD_SECTION_IDS, BUILD_SESSION_KEY, BUILD_SPEED, type BuildSectionId, type LogLine, type LogTone } from '@/lib/build';

/** Order the intro scrolls through once each section finishes building — "profile" lives
 * in the sticky sidebar and needs no scroll. Landing on a section is what fires its
 * IntersectionObserver and starts its own build, so this just carries the page there. */
const SCROLL_SEQUENCE: BuildSectionId[] = ['hero', 'cases', 'loadout', 'chapters', 'contact'];

/** Matches each section's own `scroll-mt-8` so the scroll lands at the same offset a
 * native anchor jump would. */
const SCROLL_OFFSET_PX = 32;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** Smoothly animates window.scrollY to `targetY`, driven by our own rAF loop with a
 * cubic ease — steadier and more controllable than `scrollIntoView`'s native smooth
 * behavior, which varies by browser and doesn't allow tuning speed or easing. Duration
 * scales with distance (a natural, consistent velocity) rather than being fixed, so a
 * short hop and a long one both feel equally smooth. Returns a canceller. */
function smoothScrollTo(targetY: number): () => void {
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) return () => {};

  const duration = Math.min(1700, Math.max(700, Math.abs(delta) / 1.6));
  const startTime = performance.now();
  let rafId = 0;
  let cancelled = false;

  const step = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + delta * easeInOutCubic(t));
    if (t < 1) rafId = requestAnimationFrame(step);
  };
  rafId = requestAnimationFrame(step);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

function scrollTargetFor(id: string): number | null {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
}

type ShownLine = { id: number; text: string; tone: LogTone };

type BuildContextValue = {
  /** False until mounted: the server and first client render never decide anything. */
  ready: boolean;
  /** True while the build effect should play (set by the boot script in layout.tsx). */
  enabled: boolean;
  /** Bumped by replay() so every section restarts its own build. */
  runId: number;
  /** Index into BUILD_SECTION_IDS of the one section currently allowed to build — every
   * other section stays pending until it's its turn, regardless of scroll position. */
  activeIndex: number;
  lines: ShownLine[];
  /** True while log lines are still arriving (plus a short idle grace period). */
  active: boolean;
  log: (lines: LogLine[]) => void;
  markDone: (id: BuildSectionId) => void;
  replay: () => void;
  skip: () => void;
};

const BuildContext = createContext<BuildContextValue | null>(null);

const IDLE_MS = 4000;
const MAX_LINES = 9;

function rememberPlayed() {
  try {
    window.sessionStorage.setItem(BUILD_SESSION_KEY, '1');
  } catch {
    // storage blocked: the intro just plays again next time
  }
}

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [runId, setRunId] = useState(0);
  const [lines, setLines] = useState<ShownLine[]>([]);
  const [active, setActive] = useState(false);
  const [lastDone, setLastDone] = useState<BuildSectionId | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tourTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cancelScroll = useRef<() => void>(() => {});
  const nextId = useRef(0);
  const done = useRef(new Set<string>());
  const completed = useRef(false);

  useEffect(() => {
    setEnabled(document.documentElement.classList.contains('ai-build'));
    setReady(true);
  }, []);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    clearTimeout(idleTimer.current);
    clearTimeout(tourTimer.current);
    cancelScroll.current();
  }, []);

  useEffect(() => clearAll, [clearAll]);

  const append = useCallback((text: string, tone: LogTone) => {
    nextId.current += 1;
    const id = nextId.current;
    setLines(prev => [...prev, { id, text, tone }].slice(-MAX_LINES));
    setActive(true);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setActive(false), IDLE_MS);
  }, []);

  const log = useCallback(
    (entries: LogLine[]) => {
      entries.forEach(({ at, text, tone = 'dim' }) => {
        timers.current.push(setTimeout(() => append(text, tone), at * 1000 * BUILD_SPEED));
      });
    },
    [append],
  );

  const markDone = useCallback(
    (id: BuildSectionId) => {
      done.current.add(id);
      if (id === 'hero') rememberPlayed();
      setLastDone(id);
      // Advance to the next section in sequence — sections build strictly in order, so
      // this only ever moves forward.
      const idx = BUILD_SECTION_IDS.indexOf(id);
      if (idx !== -1) setActiveIndex(i => Math.max(i, idx + 1));
      if (!completed.current && BUILD_SECTION_IDS.every(s => done.current.has(s))) {
        completed.current = true;
        append('✓ render complete · 1 fix applied', 'ok');
      }
    },
    [append],
  );

  // The instant a section finishes building, glide the page to the next one — synced to
  // the content itself finishing rather than a fixed delay, and animated with our own
  // easing so the motion stays buttery regardless of how far the next section is.
  useEffect(() => {
    if (!enabled || !lastDone) return;
    const idx = SCROLL_SEQUENCE.indexOf(lastDone);
    if (idx === -1) return;
    const next = SCROLL_SEQUENCE[idx + 1];
    tourTimer.current = setTimeout(
      () => {
        cancelScroll.current();
        const targetY = next ? scrollTargetFor(next) : 0;
        if (targetY !== null) cancelScroll.current = smoothScrollTo(targetY);
      },
      (next ? 200 : 500),
    );
    return () => clearTimeout(tourTimer.current);
  }, [enabled, lastDone]);

  const replay = useCallback(() => {
    clearAll();
    done.current.clear();
    completed.current = false;
    setLastDone(null);
    setActiveIndex(0);
    setLines([]);
    document.documentElement.classList.add('ai-build');
    setEnabled(true);
    setRunId(r => r + 1);
    cancelScroll.current = smoothScrollTo(0);
  }, [clearAll]);

  const skip = useCallback(() => {
    clearAll();
    rememberPlayed();
    document.documentElement.classList.remove('ai-build');
    setEnabled(false);
    setActive(false);
  }, [clearAll]);

  const value = useMemo(
    () => ({ ready, enabled, runId, activeIndex, lines, active, log, markDone, replay, skip }),
    [ready, enabled, runId, activeIndex, lines, active, log, markDone, replay, skip],
  );

  return <BuildContext.Provider value={value}>{children}</BuildContext.Provider>;
}

export function useBuild() {
  const ctx = useContext(BuildContext);
  if (!ctx) throw new Error('useBuild must be used inside <BuildProvider>');
  return ctx;
}

/** The first log line, shared by the profile section so the wording lives in one place. */
export const BUILD_COMMAND = `› ${AGENT_NAME.toLowerCase()} build ~/portfolio`;

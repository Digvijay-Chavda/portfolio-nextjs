'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AGENT_NAME, BUILD_SECTION_IDS, BUILD_SESSION_KEY, BUILD_SPEED, type LogLine, type LogTone } from '@/lib/build';

type ShownLine = { id: number; text: string; tone: LogTone };

type BuildContextValue = {
  /** False until mounted: the server and first client render never decide anything. */
  ready: boolean;
  /** True while the build effect should play (set by the boot script in layout.tsx). */
  enabled: boolean;
  /** Bumped by replay() so every section restarts its own build. */
  runId: number;
  lines: ShownLine[];
  /** True while log lines are still arriving (plus a short idle grace period). */
  active: boolean;
  log: (lines: LogLine[]) => void;
  markDone: (id: string) => void;
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

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
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
    (id: string) => {
      done.current.add(id);
      if (id === 'hero') rememberPlayed();
      if (!completed.current && BUILD_SECTION_IDS.every(s => done.current.has(s))) {
        completed.current = true;
        append('✓ render complete · 1 fix applied', 'ok');
      }
    },
    [append],
  );

  const replay = useCallback(() => {
    clearAll();
    done.current.clear();
    completed.current = false;
    setLines([]);
    document.documentElement.classList.add('ai-build');
    setEnabled(true);
    setRunId(r => r + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [clearAll]);

  const skip = useCallback(() => {
    clearAll();
    rememberPlayed();
    document.documentElement.classList.remove('ai-build');
    setEnabled(false);
    setActive(false);
  }, [clearAll]);

  const value = useMemo(
    () => ({ ready, enabled, runId, lines, active, log, markDone, replay, skip }),
    [ready, enabled, runId, lines, active, log, markDone, replay, skip],
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

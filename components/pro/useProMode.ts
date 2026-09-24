'use client';

import { useEffect, useState } from 'react';

const MODE_KEY = 'portfolio:pro-mode';
type Mode = 'light' | 'dark';

/** The Professional theme's own dark/light toggle — independent of the Evil/Pro theme choice
 * (that one lives in lib/theme.ts). Persisted separately so switching modes here never
 * touches which top-level theme is active. */
export function useProMode() {
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(MODE_KEY);
    } catch {
      // ignore
    }
    if (stored === 'dark' || stored === 'light') setMode(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-pro-mode', mode);
    try {
      window.localStorage.setItem(MODE_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  const toggle = () => setMode(m => (m === 'dark' ? 'light' : 'dark'));

  return { mode, toggle };
}

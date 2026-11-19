'use client';

import { useEffect, useMemo, useState } from 'react';

/** Reveals `text` one character at a time while `start` is true; shows the full text
 * otherwise (so server render, reduced motion and a skipped build all get the real copy).
 * Splits with Array.from so an emoji counts as one character instead of two halves. */
export function useTypewriter(text: string, { start, delayMs = 0, stepMs = 45 }: { start: boolean; delayMs?: number; stepMs?: number }) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [count, setCount] = useState(chars.length);

  useEffect(() => {
    if (!start) {
      setCount(chars.length);
      return;
    }
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= chars.length) clearInterval(interval);
      }, stepMs);
    }, delayMs);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [start, chars, delayMs, stepMs]);

  return { output: chars.slice(0, count).join(''), typing: start && count < chars.length };
}

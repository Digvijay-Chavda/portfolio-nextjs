'use client';

import { useEffect, useMemo, useState } from 'react';

/** 'settled' shows the final text immediately with no animation (server render, reduced
 * motion, a skipped/already-finished build). 'waiting' shows nothing yet — this section
 * hasn't reached its turn in the build sequence. 'typing' reveals the text. */
export type TypePhase = 'waiting' | 'typing' | 'settled';

/** Reveals `text` one character at a time while `phase` is 'typing'; shows nothing while
 * 'waiting' and the full text immediately when 'settled'. Splits with Array.from so an
 * emoji counts as one character instead of two halves. */
export function useTypewriter(text: string, { phase, delayMs = 0, stepMs = 45 }: { phase: TypePhase; delayMs?: number; stepMs?: number }) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [count, setCount] = useState(chars.length);
  // Separate from `count` so the caret doesn't show during the `delayMs` wait — only
  // once characters are actually being revealed.
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (phase === 'settled') {
      setCount(chars.length);
      setTyping(false);
      return;
    }
    if (phase === 'waiting') {
      setCount(0);
      setTyping(false);
      return;
    }
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      setTyping(true);
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= chars.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, stepMs);
    }, delayMs);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [phase, chars, delayMs, stepMs]);

  return { output: chars.slice(0, count).join(''), typing };
}

/** Reveals `text` one whole word at a time instead of character by character — quicker
 * and cleaner for headline-sized text. Same 'waiting' / 'typing' / 'settled' phases as
 * useTypewriter. */
export function useTypewriterWords(text: string, { phase, delayMs = 0, stepMs = 90 }: { phase: TypePhase; delayMs?: number; stepMs?: number }) {
  const words = useMemo(() => text.split(' '), [text]);
  const [count, setCount] = useState(words.length);
  // Separate from `count` so the caret doesn't show during the `delayMs` wait — only
  // once words are actually being revealed.
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (phase === 'settled') {
      setCount(words.length);
      setTyping(false);
      return;
    }
    if (phase === 'waiting') {
      setCount(0);
      setTyping(false);
      return;
    }
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      setTyping(true);
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= words.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, stepMs);
    }, delayMs);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [phase, words, delayMs, stepMs]);

  return { output: words.slice(0, count).join(' '), typing };
}

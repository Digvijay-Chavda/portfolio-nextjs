'use client';

import { useEffect, useState } from 'react';

/**
 * Renders text as per-character spans, each with its own randomized neon-flicker
 * timing/duration so letters stutter independently instead of the whole word
 * flickering in sync, like a sign with a few failing tubes rather than a dimmer switch.
 *
 * The per-character randomness is rolled client-side only, after mount: rolling it
 * during render would make the server's HTML and the client's first render disagree
 * (Math.random() gives a different value each call), which React flags as a hydration
 * mismatch. Every character starts with the same fixed timing and re-rolls once mounted.
 */
export function NeonText({ text, className }: { text: string; className?: string }) {
  const base = text.split('').map((ch, i) => ({ ch, key: `${ch}-${i}`, delay: '0.00', duration: '8.00' }));
  const [chars, setChars] = useState(base);

  useEffect(() => {
    setChars(
      text.split('').map((ch, i) => ({
        ch,
        key: `${ch}-${i}`,
        delay: (Math.random() * 8).toFixed(2),
        duration: (6 + Math.random() * 5).toFixed(2),
      })),
    );
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden className="contents">
        {chars.map(({ ch, key, delay, duration }) =>
          ch === ' ' ? (
            <span key={key}>&nbsp;</span>
          ) : (
            <span
              key={key}
              className="neon-flicker inline-block"
              style={{ animationDelay: `-${delay}s`, animationDuration: `${duration}s` }}
            >
              {ch}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

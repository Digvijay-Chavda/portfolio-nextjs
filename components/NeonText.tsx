'use client';

import { useMemo } from 'react';

/**
 * Renders text as per-character spans, each with its own randomized neon-flicker
 * timing/duration so letters stutter independently instead of the whole word
 * flickering in sync, like a sign with a few failing tubes rather than a dimmer switch.
 */
export function NeonText({ text, className }: { text: string; className?: string }) {
  const chars = useMemo(
    () =>
      text.split('').map((ch, i) => ({
        ch,
        key: `${ch}-${i}`,
        delay: (Math.random() * 8).toFixed(2),
        duration: (6 + Math.random() * 5).toFixed(2),
      })),
    [text],
  );

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

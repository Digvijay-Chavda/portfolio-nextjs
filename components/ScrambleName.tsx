'use client';

import { useEffect, useRef } from 'react';

const LINES = ['Digvijay', 'Chavda'];
const GLYPHS = 'ABCDEFGHJKLMNPRSTUVXYZ0123456789#%&@$/<>*';
const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Decode + glitch: letters cycle random glyphs, lock in left→right,
 * then every few seconds 2–3 letters re-scramble. Pure DOM writes via refs,
 * so React never re-renders during the animation.
 */
export function ScrambleName() {
  const finals = useRef<HTMLSpanElement[]>([]);
  const overs = useRef<HTMLSpanElement[]>([]);
  const ghostA = useRef<HTMLSpanElement>(null);
  const ghostB = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const F = finals.current;
    const O = overs.current;
    const n = F.length;
    const reveal = (i: number) => { F[i].style.visibility = 'visible'; O[i].textContent = ''; };
    const scramble = (i: number) => { F[i].style.visibility = 'hidden'; O[i].textContent = pick(); };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      F.forEach((_, i) => reveal(i));
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let last = 0;
    let stopped = false;
    const start = performance.now() + 200;
    const lockAt = F.map((_, i) => start + 250 + i * 90 + Math.random() * 140);
    const done = new Array<boolean>(n).fill(false);

    // Red/teal copies flash in random horizontal slices.
    const ghost = (on: boolean) => {
      [ghostA.current, ghostB.current].forEach((g, k) => {
        if (!g) return;
        if (!on) { g.style.opacity = '0'; return; }
        const top = Math.random() * 70;
        const bottom = Math.min(100, top + 8 + Math.random() * 26);
        g.style.opacity = '.85';
        g.style.clipPath = `inset(${top}% 0 ${100 - bottom}% 0)`;
        g.style.transform = `translate(${((k ? 1 : -1) * (3 + Math.random() * 7)).toFixed(1)}px, ${(Math.random() * 2 - 1).toFixed(1)}px)`;
      });
    };

    const burst = () => {
      if (stopped) return;
      const idx = Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () => Math.floor(Math.random() * n));
      let frame = 0;
      const tick = () => {
        if (stopped) return;
        if (frame++ < 6) {
          idx.forEach(scramble);
          ghost(Math.random() < 0.8);
          timer = setTimeout(tick, 40);
        } else {
          idx.forEach(reveal);
          ghost(false);
          timer = setTimeout(burst, 3800 + Math.random() * 2600);
        }
      };
      tick();
    };

    const loop = (now: number) => {
      if (stopped) return;
      if (now - last > 45) {
        last = now;
        let pending = 0;
        for (let i = 0; i < n; i++) {
          if (done[i]) continue;
          if (now >= lockAt[i]) { done[i] = true; reveal(i); }
          else if (now >= start) { pending++; O[i].textContent = pick(); }
        }
        ghost(pending > 0 && Math.random() < 0.55);
        if (done.every(Boolean)) {
          ghost(false);
          timer = setTimeout(burst, 2600);
          return;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { stopped = true; cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);

  const ghostText = (ref: React.RefObject<HTMLSpanElement | null>, color: string) => (
    <span ref={ref} aria-hidden className="pointer-events-none absolute inset-0 opacity-0" style={{ color }}>
      {LINES.map(w => <span key={w} className="block whitespace-nowrap">{w}</span>)}
    </span>
  );

  return (
    <span className="relative inline-block">
      {ghostText(ghostA, '#c8201c')}
      {ghostText(ghostB, '#2fb8b0')}
      <span className="relative block">
        {LINES.map((word, li) => {
          const offset = LINES.slice(0, li).join('').length;
          return (
            <span key={word} className="block whitespace-nowrap">
              {word.split('').map((ch, ci) => {
                const i = offset + ci;
                return (
                  <span key={ci} className="relative inline-block">
                    {/* The real letter always holds the layout, so scrambling never shifts anything */}
                    <span ref={el => { if (el) finals.current[i] = el; }} style={{ visibility: 'hidden' }}>{ch}</span>
                    <span ref={el => { if (el) overs.current[i] = el; }} aria-hidden className="absolute inset-x-0 top-0 text-center text-blood" />
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}

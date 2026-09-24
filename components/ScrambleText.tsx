'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHJKLMNPRSTUVXYZ0123456789#%&@$/<>*';
const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Same decode-glyph + ghost-flicker mechanic as the hero's ScrambleName, generalized to any
 * single-line text and gated behind an IntersectionObserver instead of running on mount:
 * letters cycle random glyphs, lock in left→right the first time the element scrolls into
 * view, then periodically re-scramble a couple of letters, same as the hero name.
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const finals = useRef<HTMLSpanElement[]>([]);
  const overs = useRef<HTMLSpanElement[]>([]);
  const ghostA = useRef<HTMLSpanElement>(null);
  const ghostB = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const F = finals.current;
    const O = overs.current;
    const n = F.length;
    const reveal = (i: number) => { F[i].style.visibility = 'visible'; if (O[i]) O[i].textContent = ''; };
    const scramble = (i: number) => { if (!O[i]) return; F[i].style.visibility = 'hidden'; O[i].textContent = pick(); };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      F.forEach((_, i) => reveal(i));
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let last = 0;
    let stopped = false;
    const start = performance.now() + 100;
    const lockAt = F.map((_, i) => start + 200 + i * 70 + Math.random() * 120);
    const done = new Array<boolean>(n).fill(false);

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
      if (stopped || n === 0) return;
      const idx = Array.from({ length: 1 + Math.floor(Math.random() * 2) }, () => Math.floor(Math.random() * n));
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
          timer = setTimeout(burst, 4200 + Math.random() * 3000);
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
          else if (now >= start) { pending++; if (O[i]) O[i].textContent = pick(); }
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
  }, [visible]);

  const ghostText = (ref: React.RefObject<HTMLSpanElement | null>, color: string) => (
    <span ref={ref} aria-hidden className="pointer-events-none absolute inset-0 opacity-0 whitespace-nowrap" style={{ color }}>
      {text}
    </span>
  );

  return (
    <span ref={rootRef} className={`relative inline-block ${className ?? ''}`}>
      {ghostText(ghostA, '#c8201c')}
      {ghostText(ghostB, '#2fb8b0')}
      <span className="relative block whitespace-nowrap">
        {text.split('').map((ch, i) =>
          ch === ' ' ? (
            <span key={i} ref={el => { if (el) finals.current[i] = el; }}>&nbsp;</span>
          ) : (
            <span key={i} className="relative inline-block">
              {/* The real letter always holds the layout, so scrambling never shifts anything.
                  Visibility is owned entirely by the effect below, never by React re-renders,
                  so a `visible` state flip can't fight the imperative reveal/scramble writes. */}
              <span ref={el => { if (el) finals.current[i] = el; }} style={{ visibility: 'hidden' }}>{ch}</span>
              <span ref={el => { if (el) overs.current[i] = el; }} aria-hidden className="absolute inset-x-0 top-0 text-center" />
            </span>
          ),
        )}
      </span>
    </span>
  );
}

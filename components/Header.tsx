'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV } from '@/data/content';
import { useEnterSection } from './DoorContext';
import { FLATLINE_EVENT } from './Hero';

/** The hero's flatline event doubles as the recording widget's drop-signal cue. */
function useHudState() {
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    const onFlatline = (e: Event) => setFlat((e as CustomEvent<{ active: boolean }>).detail.active);
    window.addEventListener(FLATLINE_EVENT, onFlatline);
    return () => window.removeEventListener(FLATLINE_EVENT, onFlatline);
  }, []);

  return { flat };
}

const GLYPHS = 'ABCDEFGHJKLMNPRSTUVXYZ0123456789#%&@$/<>*';
const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/** Same decode-glyph mechanic as ScrambleName, but driven by `active` instead of running once on mount:
 * cycles random glyphs while active, locks to the real word the instant it turns false. */
function ScrambleWord({ word, active }: { word: string; active: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = word;
      return;
    }
    const id = setInterval(() => {
      el.textContent = word.split('').map(pick).join('');
    }, 60);
    return () => clearInterval(id);
  }, [word, active]);

  return <span ref={spanRef}>{word}</span>;
}

function StatusHud() {
  const { flat } = useHudState();
  const label = flat ? 'Error' : 'Live';

  return (
    <div className="flex shrink-0 justify-end">
      <div title={flat ? 'Recording: error' : 'Recording: live'} className={`flex h-[34px] w-[112px] items-center justify-center gap-2.5 whitespace-nowrap border border-bone/20 bg-black/55 px-3.5 ${flat ? '' : 'rec-box-glow'}`}>
        <div className="relative h-3 w-3 shrink-0">
          <span className={`rec-ring absolute -inset-[5px] rounded-full border border-blood transition-opacity duration-300 ${flat ? 'opacity-0' : 'opacity-100'}`} />
          <span
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${flat ? '' : 'rec-dot'}`}
            style={{ background: flat ? '#3a1210' : 'var(--color-blood)', boxShadow: flat ? 'none' : '0 0 6px rgba(200,32,28,.8)' }}
          />
        </div>
        <div className="flex flex-col items-center gap-[3px] text-center leading-none">
          <span className={`font-display text-base font-black uppercase tracking-[.12em] text-blood md:text-[15px] ${flat ? 'text-glitch' : ''}`}>
            <ScrambleWord word={label} active={flat} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const enter = useEnterSection();
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-bone/8 bg-ink/90 px-[clamp(18px,4vw,32px)] py-3.5 backdrop-blur-md">
      <svg viewBox="0 0 36 24" aria-label="DC" role="img" className="h-6 w-9 shrink-0 text-bone">
        <path d="M2 12 Q18 22 34 12" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 9 L11 16" stroke="var(--color-blood)" strokeWidth="1.6" />
        <path d="M15 13 L18 20" stroke="var(--color-blood)" strokeWidth="1.6" />
        <path d="M22 13 L25 20" stroke="var(--color-blood)" strokeWidth="1.6" />
        <path d="M28 10 L31 17" stroke="var(--color-blood)" strokeWidth="1.6" />
      </svg>
      <nav aria-label="Sections" className="absolute left-1/2 hidden -translate-x-1/2 flex-wrap gap-[26px] font-cond text-[15px] uppercase tracking-[.22em] md:flex">
        {NAV.map(n => (
          <button key={n.id} onClick={() => enter(n.id, n.door)} className="py-1 text-bone transition-colors hover:text-blood">
            {n.label}
          </button>
        ))}
      </nav>
      <StatusHud />
    </header>
  );
}

export function MobileNav() {
  const enter = useEnterSection();
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 gap-0.5 bg-bone/12 p-0.5 pb-[calc(2px+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
    >
      {NAV.map(n => (
        <button key={n.id} onClick={() => enter(n.id, n.door)} className="flex min-h-14 flex-col items-center justify-center gap-[3px] bg-ink/95 text-bone">
          <span className="font-cond text-xs tracking-[.2em] text-blood">{n.key}</span>
          <span className="font-cond text-sm font-semibold uppercase tracking-[.14em]">{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

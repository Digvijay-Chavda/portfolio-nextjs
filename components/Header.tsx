'use client';

import { useEffect, useState } from 'react';
import { NAV } from '@/data/content';
import { useEnterSection } from './DoorContext';

/** 1-4 bars of "signal strength", drives the pulse line's color. */
function useSignal() {
  const [bars, setBars] = useState(3);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setBars(1 + Math.floor(Math.random() * 4)), 5000);
    return () => clearInterval(id);
  }, []);
  return bars;
}

// Index by bar count (1-4): weak signal reads red, mid reads amber, strong reads vital green.
const SIGNAL_COLOR = ['#c8201c', '#c8201c', '#e0a52c', '#7bd86b', '#7bd86b'] as const;

function StatusHud() {
  const bars = useSignal();
  const color = SIGNAL_COLOR[bars];
  return (
    <div className="flex min-w-[170px] shrink-0 justify-end md:min-w-[230px]">
      <div title="System status: online" className="flex h-[34px] items-center gap-2.5 whitespace-nowrap border border-bone/20 bg-black/55 px-3">
        <svg viewBox="0 0 120 30" preserveAspectRatio="none" className="block h-5 w-16 transition-colors duration-300 md:w-[120px]" style={{ color }}>
          <polyline
            className="ecg-anim"
            points="0,15 18,15 24,15 28,5 32,25 36,11 40,15 60,15 66,15 70,5 74,25 78,11 82,15 120,15"
            fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="80 160"
          />
        </svg>
        <div className="flex flex-col items-center gap-[3px] leading-none">
          <span className="font-cond text-[10px] uppercase tracking-[.2em] text-muted">System status</span>
          <span className="pl-[.1em] text-center font-display text-[15px] font-black uppercase tracking-[.1em] text-vital">Online</span>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const enter = useEnterSection();
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-bone/8 bg-ink/90 px-[clamp(18px,4vw,32px)] py-3.5 backdrop-blur-md">
      <span className="font-display text-[22px] font-black tracking-[.08em]">DC<span className="text-blood">.</span></span>
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
          <span className="font-cond text-[10px] tracking-[.2em] text-blood">{n.key}</span>
          <span className="font-cond text-sm font-semibold uppercase tracking-[.14em]">{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

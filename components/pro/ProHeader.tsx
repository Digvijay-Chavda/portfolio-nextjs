'use client';

import { useEffect, useState } from 'react';
import { CONTACT } from '@/data/content';
import { NAV_PRO } from '@/data/content-pro';
import { useProMode } from './useProMode';

function ModeToggle({ mode, toggle, compact }: { mode: 'light' | 'dark'; toggle: () => void; compact?: boolean }) {
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 self-start rounded-full border border-(--color-pro-line) bg-(--color-pro-surface) px-3 py-1.5 text-xs text-(--color-pro-muted) transition-colors hover:border-(--color-pro-accent) hover:text-(--color-pro-ink)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {!compact && <span>{mode === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  );
}

function ExploreEvilLink({ onExploreEvil, compact }: { onExploreEvil: () => void; compact?: boolean }) {
  return (
    <button
      onClick={onExploreEvil}
      title="Switch to the Fantasy theme"
      className={`inline-flex items-center gap-2 self-start rounded-full border border-dashed border-(--color-pro-accent) text-(--color-pro-accent) transition-colors hover:border-solid hover:bg-(--color-pro-accent-soft) ${
        compact ? 'px-2.5 py-1.5' : 'px-3 py-1.5 text-xs'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
        <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" />
      </svg>
      {!compact && <span>Explore Fantasy theme</span>}
    </button>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function ProHeader({ onExploreEvil }: { onExploreEvil?: () => void }) {
  const { mode, toggle } = useProMode();
  const [active, setActive] = useState<string>(NAV_PRO[0].id);

  useEffect(() => {
    const sections = NAV_PRO.map(n => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <aside className="sticky top-0 hidden max-h-screen w-80 shrink-0 flex-col justify-between overflow-y-auto py-12 md:flex">
        <div>
          <p className="mb-5 text-xs text-(--color-pro-muted)" style={{ fontFamily: 'var(--font-pro-mono)' }}>~/portfolio</p>
          <h1 className="m-0 text-[30px] font-extrabold tracking-tight text-(--color-pro-ink)">Digvijay Chavda</h1>
          <p className="mt-1.5 mb-4.5 text-sm font-semibold text-(--color-pro-accent)" style={{ fontFamily: 'var(--font-pro-mono)' }}>
            Software Developer
          </p>
          <p className="m-0 max-w-[30ch] text-sm leading-relaxed text-(--color-pro-muted)">
            I build production interfaces with React, TypeScript and Next.js — with a growing focus on AI-powered tools.
          </p>

          <nav className="mt-12 flex flex-col gap-3.5">
            {NAV_PRO.map(n => {
              const on = active === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => scrollToSection(n.id)}
                  className={`group flex items-center gap-3 text-left text-[12.5px] font-semibold tracking-[.06em] uppercase transition-colors ${
                    on ? 'text-(--color-pro-ink)' : 'text-(--color-pro-muted) hover:text-(--color-pro-ink)'
                  }`}
                >
                  <span className={`h-px transition-all ${on ? 'w-11 bg-(--color-pro-ink)' : 'w-7 bg-(--color-pro-muted) group-hover:w-11 group-hover:bg-(--color-pro-ink)'}`} />
                  {n.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-4.5">
          {onExploreEvil && <ExploreEvilLink onExploreEvil={onExploreEvil} />}
          <ModeToggle mode={mode} toggle={toggle} />
          <div className="flex gap-4.5">
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-(--color-pro-muted) transition-colors hover:text-(--color-pro-accent)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.5V23H.24V8.5zM8.5 8.5h4.3v1.98h.06c.6-1.13 2.07-2.32 4.26-2.32 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.98c0-1.66-.03-3.8-2.31-3.8-2.32 0-2.67 1.81-2.67 3.68V23H8.5V8.5z"/></svg>
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-(--color-pro-muted) transition-colors hover:text-(--color-pro-accent)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 .5C5.73.5.98 5.24.98 11.5c0 5 3.24 9.24 7.75 10.74.57.1.78-.25.78-.55v-1.94c-3.15.68-3.81-1.52-3.81-1.52-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.51-2.51-.29-5.16-1.26-5.16-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.17 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55C19.76 20.74 23 16.5 23 11.5 23 5.24 18.27.5 12 .5z"/></svg>
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile: simple top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-(--color-pro-line) bg-(--color-pro-bg) px-5 py-4 md:hidden">
        <span className="text-[17px] font-extrabold text-(--color-pro-ink)">Digvijay Chavda</span>
        <div className="flex items-center gap-2">
          {onExploreEvil && <ExploreEvilLink onExploreEvil={onExploreEvil} compact />}
          <ModeToggle mode={mode} toggle={toggle} compact />
        </div>
      </div>
    </>
  );
}

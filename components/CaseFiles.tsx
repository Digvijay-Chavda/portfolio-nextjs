'use client';

import { useState } from 'react';
import { CASES, type CaseFile } from '@/data/content';
import { useDoors } from './DoorContext';

export function CaseFiles() {
  const [curId, setCurId] = useState(CASES[0].id);
  const { runDoors } = useDoors();
  const cur = CASES.find(c => c.id === curId) ?? CASES[0];

  const open = (c: CaseFile) => {
    if (c.id === curId) return;
    runDoors(`OPENING FILE ${c.no}`, c.name, () => setCurId(c.id), 380);
  };

  return (
    <section id="cases" className="mx-auto max-w-[1320px] px-[clamp(18px,4vw,32px)] pt-[clamp(90px,12vw,130px)] pb-[clamp(60px,8vw,90px)]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <h2 className="m-0 font-display text-[clamp(56px,7vw,104px)] font-black uppercase leading-[.9]">Work files</h2>
        <span className="font-cond text-sm uppercase tracking-[.2em] text-muted md:text-[15px]">
          {String(CASES.length).padStart(2, '0')} files found
        </span>
      </div>

      {/* Tabs: 2×2 cards on mobile, folder tabs on desktop */}
      <div role="tablist" className="mb-2.5 grid grid-cols-2 gap-1.5 md:mb-0 md:flex md:gap-1 md:overflow-x-auto [scrollbar-width:none]">
        {CASES.map(c => {
          const on = c.id === curId;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={on}
              onClick={() => open(c)}
              className={`flex min-h-16 flex-col items-start justify-center gap-1 border px-3.5 py-3 text-left md:-mb-px md:min-h-0 md:border-b-0 md:px-[22px] md:py-3.5 ${
                on
                  ? 'border-blood bg-panel text-bone shadow-[inset_3px_0_0_#c8201c] md:border-bone/15 md:shadow-none'
                  : 'border-bone/15 bg-bone/[.03] text-muted md:border-transparent md:bg-transparent'
              }`}
            >
              <span className="font-cond text-xs tracking-[.2em] text-muted">FILE {c.no}</span>
              <span className="font-display text-lg font-extrabold uppercase leading-[1.05] tracking-[.03em] md:whitespace-nowrap md:text-[22px]">
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] border border-t-2 border-bone/15 border-t-blood bg-panel">
        <div className="case-stripes relative flex min-h-[clamp(240px,40vw,460px)] items-center justify-center overflow-hidden border-b border-bone/10">
          <div
            role="img"
            aria-label={cur.alt}
            className="evidence absolute inset-0 bg-cover"
            style={{ backgroundImage: `url("${cur.img}")`, backgroundPosition: cur.pos }}
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,.85)]" />
          <span className="absolute bottom-4 left-[18px] bg-black/60 px-[9px] py-[5px] font-cond text-xs tracking-[.24em] text-bone">
            EVIDENCE<span className="hidden md:inline"> · HOVER TO DEVELOP</span>
          </span>
          <span className="absolute top-[26px] right-[26px] -rotate-[8deg] border-[3px] border-blood bg-ink/70 px-3.5 py-1.5 font-display text-2xl font-black md:text-[28px] tracking-[.12em] text-blood">
            {cur.stamp}
          </span>
        </div>

        <div className="flex flex-col gap-5 p-[clamp(22px,4vw,40px)]">
          <span className="font-cond text-sm uppercase tracking-[.24em] text-blood">{cur.sub}</span>
          <h3 className="m-0 font-display text-[clamp(40px,6vw,56px)] font-black uppercase leading-[.9]">{cur.name}</h3>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {cur.points.map(p => (
              <li key={p} className="grid grid-cols-[22px_1fr] gap-2.5 text-base leading-normal md:text-[17px] text-body">
                <span aria-hidden className="font-cond font-semibold text-blood">▸</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <span className="font-cond text-sm tracking-[.08em] text-muted md:text-[15px]">{cur.stack}</span>
          {cur.links && (
            <div className="flex flex-wrap gap-3 font-cond text-sm uppercase tracking-[.18em] md:text-[15px]">
              <a href={cur.links.live} target="_blank" rel="noreferrer" className="bg-blood px-5 py-3 text-white no-underline hover:text-white">Open live</a>
              <a href={cur.links.source} target="_blank" rel="noreferrer" className="border border-bone/40 px-5 py-3 no-underline">Source</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

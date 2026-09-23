'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/asset';
// import { shatterGlass } from '@/lib/shatterGlass';
import { staticBurst } from '@/lib/staticBurst';
import { ScrambleName } from './ScrambleName';

/** Dispatched on click; Header's HUD listens and flatlines the ECG line for the burst's duration. */
export const FLATLINE_EVENT = 'hero:flatline';

export function Hero({ ready }: { ready: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const ghostARef = useRef<HTMLDivElement>(null);
  const ghostBRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  // const cancelShatter = useRef<(() => void) | null>(null);
  const cancelBurst = useRef<(() => void) | null>(null);

  // useEffect(() => () => cancelShatter.current?.(), []);
  useEffect(() => () => cancelBurst.current?.(), []);

  // Flashlight follows the pointer via CSS variables (no re-render).
  const moveLight = (clientX: number, clientY: number) => {
    const el = lightRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${clientX - r.left}px`);
    el.style.setProperty('--y', `${clientY - r.top}px`);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || !e.isPrimary || busy.current) return;
    if ((e.target as HTMLElement).closest('a,button,input')) return;

    // --- Shatter glass (commented out, kept for easy revert) ---
    // const box = shardsRef.current;
    // if (!box) return;
    // const r = box.getBoundingClientRect();
    // busy.current = true;
    // cancelShatter.current = shatterGlass({
    //   box, hero: heroRef.current, glass: glassRef.current,
    //   x: e.clientX - r.left, y: e.clientY - r.top,
    //   onDone: () => { busy.current = false; },
    // });

    // --- Static / signal-loss burst ---
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ghostA = ghostARef.current;
    const ghostB = ghostBRef.current;
    const scan = scanRef.current;
    const flash = flashRef.current;
    if (!ghostA || !ghostB || !scan || !flash) return;
    busy.current = true;
    window.dispatchEvent(new CustomEvent(FLATLINE_EVENT, { detail: { active: true } }));
    heroRef.current?.animate(
      [{ transform: 'none' }, { transform: 'translate(-10px,6px)' }, { transform: 'translate(8px,-5px)' }, { transform: 'translate(-4px,2px)' }, { transform: 'none' }],
      { duration: 280, easing: 'ease-out' },
    );
    cancelBurst.current = staticBurst({
      ghostA, ghostB, scan, flash,
      onDone: () => {
        busy.current = false;
        window.dispatchEvent(new CustomEvent(FLATLINE_EVENT, { detail: { active: false } }));
      },
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={e => moveLight(e.clientX, e.clientY)}
      onTouchMove={e => e.touches[0] && moveLight(e.touches[0].clientX, e.touches[0].clientY)}
      onPointerDown={onPointerDown}
      className="cursor-crosshair-red relative flex min-h-screen items-end overflow-hidden bg-[#0d0f0d]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bgRef}
        src={asset('/assets/hero-bg.jpg')}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[40%_30%]"
        style={{ filter: 'saturate(.75) brightness(.85)' }}
      />
      {/* Static / signal-loss burst: blood-red + vital-green RGB-split ghosts, same technique as the name scramble. */}
      <div ref={ghostARef} className="pointer-events-none absolute inset-0 z-[1] opacity-0" style={{ mixBlendMode: 'screen' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset('/assets/hero-bg.jpg')} alt="" className="h-full w-full object-cover object-[40%_30%] grayscale" style={{ filter: 'brightness(.9)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--color-blood)', mixBlendMode: 'multiply' }} />
      </div>
      <div ref={ghostBRef} className="pointer-events-none absolute inset-0 z-[1] opacity-0" style={{ mixBlendMode: 'screen' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset('/assets/hero-bg.jpg')} alt="" className="h-full w-full object-cover object-[40%_30%] grayscale" style={{ filter: 'brightness(.9)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--color-vital)', mixBlendMode: 'multiply' }} />
      </div>
      <div ref={scanRef} className="hero-scan pointer-events-none absolute inset-0 z-[1] opacity-0" />
      <div ref={flashRef} className="pointer-events-none absolute inset-0 z-[1] bg-bone opacity-0" />

      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,11,10,.2) 0%, rgba(10,11,10,.1) 45%, rgba(10,11,10,.85) 100%)' }} />
      <div ref={lightRef} className="hero-light pointer-events-none absolute inset-0" />
      <div ref={glassRef} className="hero-glass pointer-events-none absolute inset-x-0 top-[7vh] bottom-[7vh] z-[3]" />
      <div ref={shardsRef} className="pointer-events-none absolute inset-x-0 top-[7vh] bottom-[7vh] z-[4] overflow-hidden" />
      <div className="absolute inset-x-0 top-0 h-[7vh] bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-[7vh] bg-black" />

      <div className="relative z-[2] mx-auto flex w-full max-w-[1320px] flex-col gap-[18px] px-[clamp(18px,4vw,32px)] pb-[13vh]">
        <div className="-mb-1 flex items-center gap-3.5">
          <span className="h-0.5 w-[clamp(28px,4vw,48px)] bg-blood" />
          <span className="font-cond text-[clamp(14px,1.4vw,17px)] font-semibold tracking-[.42em] text-bone [text-shadow:0_1px_8px_rgba(0,0,0,.9)]">
            CHAPTER <span className="text-blood">03</span>
          </span>
        </div>

        <h1 aria-label="Digvijay Chavda" className="m-0 font-display text-[clamp(72px,12vw,196px)] font-black uppercase leading-[.82] tracking-[-.005em] text-bone">
          {ready && <ScrambleName />}
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-10">
          <p className="m-0 max-w-[540px] text-xl leading-normal text-body text-pretty">
            Software engineer. React, TypeScript and Next.js in production across seven products, from real-time chat to a GIS compliance platform.
          </p>
          <span className="pulse-soft font-cond text-sm tracking-[.3em] text-muted">
            <span className="md:hidden">DRAG TO EXPLORE · TAP TO LOSE SIGNAL</span>
            <span className="hidden md:inline">MOVE YOUR LIGHT · CLICK TO LOSE SIGNAL</span>
          </span>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { LOAD_TIPS } from '@/data/content';

const LOAD_MS = 3000;
const ECG_LEN = 1400;

export function Loader({ onDone }: { onDone: () => void }) {
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ecgRef = useRef<SVGPathElement>(null);
  const [tip, setTip] = useState('');

  useEffect(() => {
    // Picked on the client so the static HTML and first render match.
    setTip(LOAD_TIPS[Math.floor(Math.random() * LOAD_TIPS.length)]);

    const t0 = performance.now();
    let raf = 0;
    const step = () => {
      const p = Math.min(1, (performance.now() - t0) / LOAD_MS);
      // Hesitate around 85% before finishing, like a real loader.
      const q = p < 0.85 ? p : 0.85 + (p - 0.85) * (p > 0.93 ? 1 : 0.3);
      if (pctRef.current) pctRef.current.textContent = String(Math.floor(q * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.width = `${q * 100}%`;
      ecgRef.current?.setAttribute('stroke-dashoffset', (ECG_LEN * (1 - p)).toFixed(0));
      if (p < 1) raf = requestAnimationFrame(step);
      else onDone();
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="pointer-events-none fixed inset-0 z-[62] flex flex-col justify-between p-[clamp(22px,4vw,40px)]"
      style={{ background: 'radial-gradient(ellipse at 50% 55%, rgba(122,20,17,.22), transparent 60%)' }}
    >
      <div className="flex justify-end gap-5 font-cond text-[13px] tracking-[.3em] text-muted">
        <span className="pulse-fast text-blood">● REC</span>
      </div>

      <div className="flex flex-col items-center gap-[22px]">
        <svg viewBox="0 0 600 80" preserveAspectRatio="none" className="block h-[70px] w-[min(640px,86vw)] overflow-visible">
          <path
            ref={ecgRef}
            d="M0 40 H120 L136 40 L148 10 L162 70 L174 28 L184 40 H300 L316 40 L328 10 L342 70 L354 28 L364 40 H480 L496 40 L508 10 L522 70 L534 28 L544 40 H600"
            fill="none" stroke="#c8201c" strokeWidth="2.5" strokeDasharray={ECG_LEN} strokeDashoffset={ECG_LEN}
            style={{ filter: 'drop-shadow(0 0 6px rgba(200,32,28,.8))' }}
          />
        </svg>
        <span ref={pctRef} className="font-display text-[clamp(84px,14vw,180px)] font-black leading-[.8] tracking-[.02em] text-bone tabular-nums">
          000
        </span>
        <span className="min-h-[18px] font-cond text-[15px] uppercase tracking-[.42em] text-blood">{tip}</span>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="h-0.5 bg-bone/12">
          <div ref={barRef} className="h-full w-0 bg-blood shadow-[0_0_10px_#c8201c]" />
        </div>
        <div className="flex justify-between font-cond text-xs tracking-[.3em] text-dim">
          <span>NOW LOADING</span>
          <span>DIGVIJAY CHAVDA · PORTFOLIO</span>
        </div>
      </div>
    </div>
  );
}

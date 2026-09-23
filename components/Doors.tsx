'use client';

import { useDoors } from './DoorContext';

export function Doors({ loading }: { loading: boolean }) {
  const { door } = useDoors();
  const c = door.closed;
  const pe = c ? 'auto' : 'none';

  return (
    <>
      <div aria-hidden className="door door-l" style={{ transform: c ? 'none' : 'translateX(-101%)', pointerEvents: pe }} />
      <div aria-hidden className="door door-r" style={{ transform: c ? 'none' : 'translateX(101%)', pointerEvents: pe }} />
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-0 z-[61] flex flex-col items-center justify-center gap-2.5"
        style={{ opacity: c && !loading ? 1 : 0, transition: `opacity .3s ${c ? '.35s' : '0s'}` }}
      >
        <span className="font-cond text-sm tracking-[.4em] text-muted">{door.kicker}</span>
        <span className="text-center font-display text-[clamp(40px,9vw,64px)] font-black uppercase tracking-[.04em] text-bone">
          {door.text}
        </span>
      </div>
    </>
  );
}

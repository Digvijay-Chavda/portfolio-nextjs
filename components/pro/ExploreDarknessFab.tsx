'use client';

import { useDraggableFab } from '@/lib/useDraggableFab';

/** Floating round icon, bottom-right (matching where "Revert Darkness" sits on the Evil
 * theme, same position/size/reveal) — the Professional theme's only entry point into the
 * Evil theme. At rest it's just the closed eye; hovering smoothly expands the pill
 * left-to-right to reveal the label, and the eye "wakes up" (opens, iris glows red). On
 * touch devices it can also be long-pressed and dragged clear of whatever it's covering —
 * position resets to the default corner on the next load. */
export function ExploreDarknessFab({ onExploreEvil }: { onExploreEvil: () => void }) {
  const { ref, style, dragging, onClickCapture } = useDraggableFab();
  return (
    <button
      ref={ref}
      onClick={onExploreEvil}
      onClickCapture={onClickCapture}
      title="Explore dark mode"
      style={style}
      className={`group pro-creep-glow fab-draggable fixed right-3 bottom-3 z-70 flex h-9 w-9 items-center overflow-hidden rounded-full border border-(--color-pro-line) bg-(--color-pro-surface) p-0 text-(--color-pro-muted) shadow-lg transition-[width,background-color,border-color,opacity,transform] duration-500 ease-out hover:w-36 hover:border-blood/60 hover:bg-ink ${dragging ? 'scale-110 opacity-60 duration-0' : ''}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="pro-eye-glitch h-4 w-4 shrink-0">
          {/* Eye: open almond shape, iris turns red and glows on hover */}
          <path d="M2 12C4.5 7 8 5 12 5s7.5 2 10 7c-2.5 5-6 7-10 7S4.5 17 2 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle className="pro-eye-iris" cx="12" cy="12" r="3" fill="currentColor" />
          {/* Lid: closes over the eye at rest, lifts open on hover */}
          <path
            className="pro-eye-lid"
            d="M2 12C4.5 8.5 8 7 12 7s7.5 1.5 10 5c-2.5-2.5-6-4-10-4S4.5 9.5 2 12Z"
            fill="var(--color-pro-surface)"
          />
        </svg>
      </span>
      <span
        className="pro-creep-text pro-creep-text-glitch overflow-hidden pl-1 text-[11px] font-semibold tracking-[.08em] whitespace-nowrap uppercase opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:delay-150"
        style={{ fontFamily: 'var(--font-cond)' }}
      >
        Into the Darkness
      </span>
      <span className="w-4 shrink-0" aria-hidden />
    </button>
  );
}

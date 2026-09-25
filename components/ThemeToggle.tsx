'use client';

import { useDraggableFab } from '@/lib/useDraggableFab';

/** Floating "back to Professional" control shown only on the Evil theme, owned by
 * ThemeGate rather than Evil's own header — so this never requires editing Evil's files.
 * At rest it's just the round sun icon; hovering smoothly expands the pill left-to-right
 * to reveal the label. The Professional theme's own floating FAB (ExploreDarknessFab)
 * mirrors this exact position/size/reveal so switching either direction feels the same.
 * On touch devices it can also be long-pressed and dragged clear of whatever it's
 * covering — position resets to the default corner on the next load. */
export function ThemeToggle({ onSwitch }: { onSwitch: () => void }) {
  const { ref, style, dragging, onClickCapture } = useDraggableFab();
  return (
    <button
      ref={ref}
      onClick={onSwitch}
      onClickCapture={onClickCapture}
      title="Switch to the Professional theme"
      style={style}
      className={`theme-toggle-gold-cursor fab-draggable group fixed right-3 bottom-3 z-70 flex h-9 w-9 items-center overflow-hidden rounded-full border border-[#ffb020]/50 bg-black/70 p-0 transition-[width,border-color,opacity,transform] duration-500 ease-out hover:w-36 hover:border-[#ffb020] ${dragging ? 'scale-110 opacity-60 duration-0' : ''}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-3.5 w-3.5 shrink-0"
          style={{ filter: 'drop-shadow(0 0 3px rgba(255,196,64,.85)) drop-shadow(0 0 1px rgba(255,230,150,1))' }}
        >
          {/* Sun, filled gold */}
          <circle cx="12" cy="12" r="4.5" fill="#ffb020" />
          <g stroke="#ffc94d" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
          </g>
          {/* Glowing white-gold core */}
          <circle cx="12" cy="12" r="2" fill="#fff4d6" />
        </svg>
      </span>
      <span
        className="overflow-hidden pl-1 text-[11px] font-semibold tracking-[.08em] whitespace-nowrap text-bone uppercase opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:text-[#ffc94d] group-hover:delay-150"
        style={{ fontFamily: 'var(--font-cond)' }}
      >
        Revert Darkness
      </span>
      <span className="w-3 shrink-0" aria-hidden />
    </button>
  );
}

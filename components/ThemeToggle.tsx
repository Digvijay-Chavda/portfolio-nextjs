'use client';

/** Floating "back to Professional" control shown only on the Evil theme, owned by
 * ThemeGate rather than Evil's own header — so this never requires editing Evil's files.
 * The Professional theme has its own in-content "Explore Fantasy theme" link instead
 * (see components/pro/ProHeader.tsx), so it doesn't need this floating control. */
export function ThemeToggle({ onSwitch }: { onSwitch: () => void }) {
  return (
    <button
      onClick={onSwitch}
      title="Switch to the Professional theme"
      className="fixed right-4 bottom-4 z-70 rounded-full border border-blood/50 bg-black/70 px-3.5 py-2 text-[11px] font-semibold tracking-[.08em] text-bone uppercase transition-colors hover:border-blood hover:text-blood"
      style={{ fontFamily: 'var(--font-cond)' }}
    >
      Go professional
    </button>
  );
}

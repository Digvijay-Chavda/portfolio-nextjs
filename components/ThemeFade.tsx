'use client';

/** Brief full-screen cover used for both the selector's first pick and the toggle-back
 * switch, so every theme transition gets the same small moment of polish instead of a
 * hard cut. `tone` picks the cover color to match the theme being switched TO. */
export function ThemeFade({ visible, tone }: { visible: boolean; tone: 'evil' | 'pro' }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] transition-opacity duration-200 ease-in-out"
      style={{
        background: tone === 'evil' ? '#0a0b0a' : 'var(--color-pro-bg, #fafaf9)',
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

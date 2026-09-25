'use client';

import { useEffect, useRef, useState } from 'react';
import Portfolio from './Portfolio';
import { ProPortfolio } from './pro/ProPortfolio';
import { ThemeFade } from './ThemeFade';
import { ThemeToggle } from './ThemeToggle';
import { readStoredTheme, writeStoredTheme, type Theme } from '@/lib/theme';

const FADE_MS = 200;

/** Applies (or removes) the Evil theme's scoped body/cursor rules on <html>.
 * The Professional theme gets the browser's own defaults. */
function setEvilClass(active: boolean) {
  document.documentElement.classList.toggle('theme-evil', active);
}

/**
 * Professional is the real site: it always server-renders first, so crawlers and a
 * cold first paint see actual content instead of a client-only decision screen. This
 * component only handles switching into the Evil theme — either because a returning
 * visitor has it saved, or because they click the toggle — never blocking that first paint.
 */
export function ThemeGate() {
  const [theme, setTheme] = useState<Theme>('pro');
  // Starts covering the screen only when a stored 'evil' preference is detected (read
  // synchronously by the inline script in layout.tsx, which also stamps a data attribute
  // on <html> before React hydrates) — this masks the one-frame Pro flash on a hard
  // reload without touching the server-rendered 'pro' state that keeps the site crawlable.
  const [fading, setFading] = useState(() => typeof document !== 'undefined' && document.documentElement.dataset.themeBoot === 'evil');
  const [fadeTone, setFadeTone] = useState<Theme>('evil');
  const [evilLoading, setEvilLoading] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const stored = readStoredTheme();
    if (stored === 'evil') {
      setTheme('evil');
      // Let the Evil DOM actually mount and paint once before lifting the cover — the
      // boot attribute (and the CSS rule keyed on it) must outlive that paint too, or
      // body becomes visible again for a frame before the Evil DOM is actually there.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete document.documentElement.dataset.themeBoot;
        setFading(false);
      }));
    } else {
      delete document.documentElement.dataset.themeBoot;
      setFading(false);
    }
  }, []);

  useEffect(() => {
    setEvilClass(theme === 'evil');
  }, [theme]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const switchTo = (next: Theme) => {
    writeStoredTheme(next);
    setFadeTone(next);
    setFading(true);
    timer.current = setTimeout(() => {
      setTheme(next);
      requestAnimationFrame(() => setFading(false));
    }, FADE_MS);
  };

  return (
    <>
      {theme === 'evil' ? (
        <Portfolio onLoadingChange={setEvilLoading} />
      ) : (
        <ProPortfolio onExploreEvil={() => switchTo('evil')} />
      )}
      <ThemeFade visible={fading} tone={fadeTone} />
      {theme === 'evil' && !evilLoading && <ThemeToggle onSwitch={() => switchTo('pro')} />}
    </>
  );
}

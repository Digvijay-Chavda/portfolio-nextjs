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
  const [fading, setFading] = useState(false);
  const [fadeTone, setFadeTone] = useState<Theme>('evil');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const stored = readStoredTheme();
    if (stored === 'evil') setTheme('evil');
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
        <Portfolio />
      ) : (
        <ProPortfolio onExploreEvil={() => switchTo('evil')} />
      )}
      <ThemeFade visible={fading} tone={fadeTone} />
      {theme === 'evil' && <ThemeToggle onSwitch={() => switchTo('pro')} />}
    </>
  );
}

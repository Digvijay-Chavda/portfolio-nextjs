export type Theme = 'evil' | 'pro';

const THEME_KEY = 'portfolio:theme';

export function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    return v === 'evil' || v === 'pro' ? v : null;
  } catch {
    return null;
  }
}

export function writeStoredTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage unavailable (private mode, quota, etc.) — the choice just won't persist.
  }
}

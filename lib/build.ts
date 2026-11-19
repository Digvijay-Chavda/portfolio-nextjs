import type { CSSProperties } from 'react';

/** Name shown on the build cursor's tag and in the build log. Change it here only. */
export const AGENT_NAME = 'Forge';

/** Multiplies every build duration and delay (2 = twice as slow, .5 = twice as fast). The
 * CSS reads the same value through the --b-speed custom property set on the Pro theme's root. */
export const BUILD_SPEED = 0.55;

/** sessionStorage key: once the intro build has played, reloads in the same tab skip it. */
export const BUILD_SESSION_KEY = 'portfolio:built';

/** Every BuildSection id — "render complete" is logged once all of them have finished. */
export const BUILD_SECTION_IDS = ['profile', 'hero', 'cases', 'loadout', 'chapters', 'contact'] as const;
export type BuildSectionId = (typeof BUILD_SECTION_IDS)[number];

/** Corner the agent cursor settles into (and the opposite corner it arrives from). */
export type BuildCorner = 'tl' | 'tr' | 'bl' | 'br';

export type BuildStatus = 'pending' | 'run' | 'done';
export type LogTone = 'dim' | 'ok';
/** A build-log line, `at` seconds after its section starts building. */
export type LogLine = { at: number; text: string; tone?: LogTone };

/** Inline style for a timed build element: `--d` is its start delay in seconds within
 * its section; extra custom properties (`--dur`, `--life`) ride along. */
export function bd(delay: number, extra?: Record<string, number | string>): CSSProperties {
  return { '--d': delay, ...extra } as CSSProperties;
}

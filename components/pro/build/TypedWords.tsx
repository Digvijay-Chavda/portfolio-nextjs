'use client';

import { BUILD_SPEED } from '@/lib/build';
import { useTypewriterWords, type TypePhase } from '@/lib/useTypewriter';
import { useBuild } from './BuildProvider';
import { useBuildStatus } from './BuildSection';

/** Headline-sized text typed one whole word at a time while its section builds. The full
 * text is always laid out underneath (invisible) so the element's box never resizes as
 * words reveal — otherwise a headline wrapping from one line to two mid-type would shove
 * everything below it down while the page is mid-scroll. Screen readers and crawlers
 * always get the full text from the sr-only copy. */
export function TypedWords({ text, at, stepMs = 110 }: { text: string; at: number; stepMs?: number }) {
  const { ready, enabled } = useBuild();
  const status = useBuildStatus();
  // Before hydration (or once the build effect is off entirely) show the real text right
  // away, matching the server-rendered markup. Otherwise stay empty until this section's
  // own turn arrives ('run') — "pending" can now last well past the first frame, so it
  // must not fall back to showing the full text the way "settled" does.
  const phase: TypePhase = !ready || !enabled ? 'settled' : status === 'run' ? 'typing' : status === 'done' ? 'settled' : 'waiting';
  const { output, typing } = useTypewriterWords(text, {
    phase,
    delayMs: at * 1000 * BUILD_SPEED,
    stepMs: stepMs * BUILD_SPEED,
  });

  return (
    <span className="relative inline-grid">
      <span aria-hidden className="invisible [grid-area:1/1]">{text}</span>
      <span aria-hidden className="[grid-area:1/1]">
        {output}
        {typing && <span className="b-caret" />}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

'use client';

import { BUILD_SPEED } from '@/lib/build';
import { useTypewriter, type TypePhase } from '@/lib/useTypewriter';
import { useBuild } from './BuildProvider';
import { useBuildStatus } from './BuildSection';

/** Text the agent "types" with a caret while its section builds. Screen readers and
 * crawlers always get the full text from the sr-only copy. */
export function TypedText({ text, at, stepMs = 55 }: { text: string; at: number; stepMs?: number }) {
  const { ready, enabled } = useBuild();
  const status = useBuildStatus();
  // Before hydration (or once the build effect is off entirely) show the real text right
  // away, matching the server-rendered markup. Otherwise stay empty until this section's
  // own turn arrives ('run') — "pending" can now last well past the first frame, so it
  // must not fall back to showing the full text the way "settled" does.
  const phase: TypePhase = !ready || !enabled ? 'settled' : status === 'run' ? 'typing' : status === 'done' ? 'settled' : 'waiting';
  const { output, typing } = useTypewriter(text, {
    phase,
    delayMs: at * 1000 * BUILD_SPEED,
    stepMs: stepMs * BUILD_SPEED,
  });

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {output}
        {typing && <span className="b-caret" />}
      </span>
    </>
  );
}

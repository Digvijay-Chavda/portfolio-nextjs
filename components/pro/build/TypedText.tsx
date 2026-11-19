'use client';

import { BUILD_SPEED } from '@/lib/build';
import { useTypewriter } from '@/lib/useTypewriter';
import { useBuildStatus } from './BuildSection';

/** Text the agent "types" with a caret while its section builds. Screen readers and
 * crawlers always get the full text from the sr-only copy. */
export function TypedText({ text, at, stepMs = 55 }: { text: string; at: number; stepMs?: number }) {
  const status = useBuildStatus();
  const { output, typing } = useTypewriter(text, {
    start: status === 'run',
    delayMs: at * 1000 * BUILD_SPEED,
    stepMs: stepMs * BUILD_SPEED,
  });

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {output}
        {(typing || status === 'run') && <span className="b-caret" />}
      </span>
    </>
  );
}

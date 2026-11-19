'use client';

import { AGENT_NAME } from '@/lib/build';
import { useBuild } from './BuildProvider';

const TONE = {
  dim: 'text-(--color-pro-muted)',
  ok: 'text-(--color-pro-accent)',
} as const;

/** Bottom-right build console. Expanded while the agent is logging (desktop only),
 * otherwise a small pill with a Replay button. Sits above the "Into the Darkness" FAB. */
export function BuildLog() {
  const { ready, lines, active, replay, skip } = useBuild();
  if (!ready) return null;

  const expanded = active && lines.length > 0;

  return (
    <div className="fixed right-3 bottom-14 z-60 flex flex-col items-end gap-2" style={{ fontFamily: 'var(--font-pro-mono)' }}>
      {expanded && (
        <div className="hidden w-80 flex-col rounded-xl border border-(--color-pro-line) bg-(--color-pro-surface)/95 px-4 py-3 text-xs leading-relaxed shadow-xl backdrop-blur md:flex">
          <div className="mb-1.5 flex items-center justify-between border-b border-(--color-pro-line) pb-2">
            <span className="flex items-center gap-2 text-(--color-pro-ink)">
              <span className="b-livedot" aria-hidden />
              {AGENT_NAME} · building
            </span>
            <button onClick={skip} className="rounded px-2 py-1 text-(--color-pro-muted) hover:text-(--color-pro-ink)">
              Skip
            </button>
          </div>
          <ol aria-hidden className="m-0 list-none p-0">
            {lines.map(l => (
              <li key={l.id} className={`b-logline ${TONE[l.tone]}`}>
                {l.text}
              </li>
            ))}
          </ol>
        </div>
      )}
      {!expanded && (
        <button
          onClick={replay}
          className="flex min-h-9 items-center gap-2 rounded-full border border-(--color-pro-line) bg-(--color-pro-surface) px-3.5 text-[11.5px] text-(--color-pro-muted) shadow-lg transition-colors hover:border-(--color-pro-accent) hover:text-(--color-pro-ink)"
        >
          <span aria-hidden className="text-(--color-pro-accent)">↻</span>
          Replay build · {AGENT_NAME}
        </button>
      )}
    </div>
  );
}

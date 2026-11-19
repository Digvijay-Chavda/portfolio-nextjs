'use client';

import { createContext, useContext, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { BUILD_SECTION_IDS, BUILD_SPEED, type BuildSectionId, type BuildStatus, type LogLine } from '@/lib/build';
import { useBuild } from './BuildProvider';

const StatusContext = createContext<BuildStatus>('done');

/** Build status of the nearest BuildSection, for children that animate in JS (TypedText). */
export const useBuildStatus = () => useContext(StatusContext);

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div';
  buildId: BuildSectionId;
  /** Seconds until every timed child in this section has finished. */
  duration: number;
  log?: LogLine[];
};

/**
 * One independently-timed chunk of the "AI is building the page" effect. Sections build
 * strictly in BUILD_SECTION_IDS order — sidebar, then hero, then projects, and so on —
 * each one staying hidden until the previous one has fully finished (BuildProvider's
 * `activeIndex`), regardless of where the visitor has scrolled to. Renders
 * `data-build="pending" | "run" | "done"`; the CSS in globals.css keys every b-* class off
 * that attribute, so all timing lives in CSS and the children stay plain markup.
 *
 * pending — hidden, waiting (only while <html> has .ai-build, so no-JS visitors and
 *           crawlers always see the content)
 * run     — CSS animations play, delays measured from this moment
 * done    — final, static state: overlays gone, content fully visible
 */
export function BuildSection({ as: Tag = 'section', buildId, duration, log, children, ...rest }: Props) {
  const { ready, enabled, runId, activeIndex, log: pushLog, markDone } = useBuild();
  const [status, setStatus] = useState<BuildStatus>('pending');
  const myIndex = BUILD_SECTION_IDS.indexOf(buildId);

  // Latest log/markDone without restarting the run timer when their identity changes.
  const logRef = useRef(log);
  logRef.current = log;
  const callbacks = useRef({ pushLog, markDone });
  callbacks.current = { pushLog, markDone };

  // Resets to pending on mount and on every replay (runId bump) — or straight to done
  // when the build effect is off (reduced motion, a skipped/already-seen build).
  useEffect(() => {
    if (!ready) return;
    setStatus(enabled ? 'pending' : 'done');
  }, [ready, enabled, runId]);

  // Starts this section's own run the moment it becomes the active one in the sequence.
  // Only ever moves pending -> run, never reverts a later section back to pending once
  // activeIndex has moved past it — that transition is owned by the timer effect below.
  useEffect(() => {
    if (!ready || !enabled || activeIndex !== myIndex) return;
    let raf1 = 0;
    let raf2 = 0;
    // One frame in "pending" first, so a replay drops the old animations before
    // re-adding them — otherwise the browser would not restart them.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setStatus('run'));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [ready, enabled, runId, activeIndex, myIndex]);

  useEffect(() => {
    if (status !== 'run') return;
    if (logRef.current) callbacks.current.pushLog(logRef.current);
    const t = setTimeout(() => {
      setStatus('done');
      callbacks.current.markDone(buildId);
    }, duration * 1000 * BUILD_SPEED);
    return () => clearTimeout(t);
  }, [status, duration, buildId]);

  return (
    <StatusContext.Provider value={status}>
      <Tag data-build={status} {...rest}>
        {children}
      </Tag>
    </StatusContext.Provider>
  );
}

'use client';

import { createContext, useContext, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { BUILD_SPEED, type BuildSectionId, type BuildStatus, type LogLine } from '@/lib/build';
import { useBuild } from './BuildProvider';

const StatusContext = createContext<BuildStatus>('done');

/** Build status of the nearest BuildSection, for children that animate in JS (TypedText). */
export const useBuildStatus = () => useContext(StatusContext);

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div';
  buildId: BuildSectionId;
  /** Start as soon as the page mounts instead of when scrolled into view. */
  auto?: boolean;
  /** Seconds until every timed child in this section has finished. */
  duration: number;
  log?: LogLine[];
};

/**
 * One independently-timed chunk of the "AI is building the page" effect. It renders
 * `data-build="pending" | "run" | "done"`; the CSS in globals.css keys every b-* class off
 * that attribute, so all timing lives in CSS and the children stay plain markup.
 *
 * pending — hidden, waiting (only while <html> has .ai-build, so no-JS visitors and
 *           crawlers always see the content)
 * run     — CSS animations play, delays measured from this moment
 * done    — final, static state: overlays gone, content fully visible
 */
export function BuildSection({ as: Tag = 'section', buildId, auto, duration, log, children, ...rest }: Props) {
  const { ready, enabled, runId, log: pushLog, markDone } = useBuild();
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<BuildStatus>('pending');

  // Latest log/markDone without restarting the run timer when their identity changes.
  const logRef = useRef(log);
  logRef.current = log;
  const callbacks = useRef({ pushLog, markDone });
  callbacks.current = { pushLog, markDone };

  useEffect(() => {
    if (!ready) return;
    if (!enabled) {
      setStatus('done');
      return;
    }
    setStatus('pending');
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let io: IntersectionObserver | undefined;
    // One frame in "pending" first, so a replay drops the old animations before
    // re-adding them — otherwise the browser would not restart them.
    const start = () => {
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setStatus('run'));
      });
    };

    if (auto) {
      start();
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            io?.disconnect();
            start();
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -15% 0px' },
      );
      io.observe(el);
    }
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [ready, enabled, runId, auto]);

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
      <Tag ref={ref as React.Ref<HTMLElement & HTMLDivElement>} data-build={status} {...rest}>
        {children}
      </Tag>
    </StatusContext.Provider>
  );
}

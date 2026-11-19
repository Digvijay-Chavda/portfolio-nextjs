import { bd } from '@/lib/build';

/** An accent stroke that traces an existing border (rectangle or vertical line), then
 * fades away and leaves the real border behind. The parent must be position: relative. */
export function DrawTrace({ at, dur = 1.2, radius = 12, shape = 'rect', className = 'absolute inset-0 h-full w-full' }: {
  at: number;
  dur?: number;
  radius?: number;
  shape?: 'rect' | 'vline';
  className?: string;
}) {
  return (
    <svg aria-hidden className={`b-trace pointer-events-none overflow-visible ${className}`} style={bd(at, { '--dur': dur })}>
      {shape === 'rect' ? (
        <rect className="b-stroke b-draw" pathLength={1} x="0" y="0" width="100%" height="100%" rx={radius} />
      ) : (
        <line className="b-stroke b-draw" pathLength={1} x1="50%" y1="0" x2="50%" y2="100%" />
      )}
    </svg>
  );
}

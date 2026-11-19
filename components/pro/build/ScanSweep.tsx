import { bd } from '@/lib/build';

/** A soft accent beam that sweeps down over the container while it builds — a renderer-pass
 * cue, distinct from the drag-select cursor used elsewhere. The parent must be
 * position: relative (and ideally overflow: hidden, so the beam respects rounded corners). */
export function ScanSweep({ at, dur = 1 }: { at: number; dur?: number }) {
  return <span aria-hidden className="b-scan" style={bd(at, { '--dur': dur })} />;
}

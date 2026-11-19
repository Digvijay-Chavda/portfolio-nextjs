import { AGENT_NAME, bd } from '@/lib/build';

type Props = {
  /** The "element" the agent says it is working on, e.g. `article.card`. */
  label: string;
  /** Seconds after the section starts. */
  at: number;
  /** Seconds the selection stays on screen. */
  life?: number;
  tone?: 'ok' | 'err';
  /** Keep the box, tag and cursor inside the parent — for parents that clip overflow. */
  inner?: boolean;
};

/** A dashed selection box dragged out by the agent's cursor, like selecting a layer in a
 * design tool. Purely decorative: aria-hidden, and display:none outside a running build.
 * The parent must be position: relative. */
export function BuildSelect({ label, at, life = 1.6, tone = 'ok', inner }: Props) {
  return (
    <span
      aria-hidden
      className={`b-sel ${inner ? 'b-sel-inner' : ''} ${tone === 'err' ? 'b-sel-err' : ''}`}
      style={bd(at, { '--life': life })}
    >
      <span className="b-selbox" />
      <span className="b-seltag">{label}</span>
      <span className="b-cur">
        <svg viewBox="0 0 20 24">
          <path d="M2 2 L2 20 L7 15 L11 23 L14 22 L10 14 L17 14 Z" />
        </svg>
        <span className="b-curtag">{AGENT_NAME}</span>
      </span>
    </span>
  );
}

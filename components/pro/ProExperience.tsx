import { CHAPTERS } from '@/data/content';
import { bd } from '@/lib/build';
import { BuildSection } from './build/BuildSection';
import { BuildSelect } from './build/BuildSelect';
import { DrawTrace } from './build/DrawTrace';
import { SectionEyebrow } from './SectionEyebrow';

export function ProExperience() {
  const last = 0.4 + (CHAPTERS.length - 1) * 0.3;
  return (
    <BuildSection
      buildId="chapters"
      duration={last + 1.2}
      log={[{ at: last + 0.4, text: '✓ experience timeline', tone: 'ok' }]}
      id="chapters"
      className="scroll-mt-8 py-16 md:py-20"
    >
      <SectionEyebrow num="03" label="Experience" />
      <div className="relative pl-7">
        <BuildSelect label="ol.timeline" at={0.1} life={last + 1.1} />
        <span className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-(--color-pro-line)" />
        <DrawTrace shape="vline" at={0.2} dur={last + 0.2} className="absolute top-1.5 bottom-1.5 left-[5px] h-[calc(100%-12px)] w-px" />
        {CHAPTERS.map((c, i) => {
          const at = 0.4 + i * 0.3;
          return (
            <div key={c.title} className={`b-materialize relative ${i === CHAPTERS.length - 1 ? '' : 'pb-7.5'}`} style={bd(at)}>
              <span className="b-pop absolute top-1 -left-7 h-[11px] w-[11px] rounded-full border-2 border-(--color-pro-accent) bg-(--color-pro-bg)" style={bd(at)} />
              <p className="m-0 mb-1 text-[12.5px] text-(--color-pro-muted)" style={{ fontFamily: 'var(--font-pro-mono)' }}>{c.when}</p>
              <p className="m-0 mb-1 text-base font-bold text-(--color-pro-ink)">{c.title}</p>
              <p className="m-0 text-sm text-(--color-pro-muted)">{c.body}</p>
            </div>
          );
        })}
      </div>
    </BuildSection>
  );
}

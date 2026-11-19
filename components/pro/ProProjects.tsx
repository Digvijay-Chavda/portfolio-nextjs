import { CASES } from '@/data/content';
import { bd } from '@/lib/build';
import { BuildSection } from './build/BuildSection';
import { BuildSelect } from './build/BuildSelect';
import { DrawTrace } from './build/DrawTrace';
import { SectionEyebrow } from './SectionEyebrow';

const STEP = 0.45; // seconds between cards

export function ProProjects() {
  const last = 0.3 + (CASES.length - 1) * STEP;
  return (
    <BuildSection
      buildId="cases"
      duration={last + 1.4}
      log={[
        { at: 0, text: `→ rendering ${CASES.length} project cards` },
        { at: last + 0.8, text: '✓ projects', tone: 'ok' },
      ]}
      id="cases"
      className="scroll-mt-8 py-16 md:py-20"
    >
      <SectionEyebrow num="01" label="Projects" />

      <div className="relative">
        <DrawTrace at={0.1} dur={last + 0.6} radius={12} />
        <div className="flex flex-col gap-px overflow-hidden rounded-xl border border-(--color-pro-line) bg-(--color-pro-line)">
          {CASES.map((c, i) => {
            const at = 0.3 + i * STEP;
            return (
              <div
                key={c.id}
                className="relative grid grid-cols-1 gap-5 bg-(--color-pro-surface) p-5 transition-colors hover:bg-(--color-pro-accent-soft) @sm:grid-cols-[64px_1fr] @sm:p-6.5"
              >
                {/* inner: the list clips overflow for its rounded corners */}
                <BuildSelect label="article.card" at={at} life={1.1} inner />
                <span className="b-rise text-[22px] font-bold text-(--color-pro-muted) opacity-60" style={{ fontFamily: 'var(--font-pro-mono)', ...bd(at + 0.15) }}>
                  {c.no}
                </span>
                <div className="b-rise" style={bd(at + 0.25)}>
                  <h3 className="m-0 mb-1 text-lg font-bold text-(--color-pro-ink)">{c.name}</h3>
                  <p className="m-0 mb-2.5 text-[13.5px] text-(--color-pro-accent)" style={{ fontFamily: 'var(--font-pro-mono)' }}>
                    {c.sub}
                  </p>
                  {c.classified ? (
                    <p className="m-0 mb-3 text-sm text-(--color-pro-muted)">
                      Confidential — under NDA, no public screenshot.
                    </p>
                  ) : null}
                  <p className="m-0 mb-3 max-w-[62ch] text-[14.5px] leading-relaxed text-(--color-pro-muted)">
                    {c.points[0]}
                  </p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {c.stack.split(' · ').map(tag => (
                      <span
                        key={tag}
                        className="rounded-md bg-(--color-pro-accent-soft) px-2.5 py-1 text-[11.5px] font-semibold text-(--color-pro-accent)"
                        style={{ fontFamily: 'var(--font-pro-mono)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {c.links && (
                    <div className="flex gap-4 text-[13px] font-semibold">
                      <a href={c.links.live} target="_blank" rel="noreferrer" className="border-b border-(--color-pro-line) pb-px text-(--color-pro-ink) no-underline transition-colors hover:border-(--color-pro-accent) hover:text-(--color-pro-accent)">
                        Live site ↗
                      </a>
                      <a href={c.links.source} target="_blank" rel="noreferrer" className="border-b border-(--color-pro-line) pb-px text-(--color-pro-ink) no-underline transition-colors hover:border-(--color-pro-accent) hover:text-(--color-pro-accent)">
                        Source ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BuildSection>
  );
}

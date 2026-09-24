import { CASES } from '@/data/content';
import { ProReveal } from './ProReveal';
import { SectionEyebrow } from './SectionEyebrow';

export function ProProjects() {
  return (
    <section id="cases" className="scroll-mt-8 py-16 md:py-20">
      <SectionEyebrow num="01" label="Projects" />

      <ProReveal className="flex flex-col gap-px overflow-hidden rounded-xl border border-(--color-pro-line) bg-(--color-pro-line)">
        {CASES.map((c, i) => (
          <div key={c.id} className="grid grid-cols-1 gap-5 bg-(--color-pro-surface) p-6 transition-colors hover:bg-(--color-pro-accent-soft) md:grid-cols-[64px_1fr] md:p-6.5">
            <span className="text-[22px] font-bold text-(--color-pro-line)" style={{ fontFamily: 'var(--font-pro-mono)' }}>
              {c.no}
            </span>
            <div>
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
        ))}
      </ProReveal>
    </section>
  );
}

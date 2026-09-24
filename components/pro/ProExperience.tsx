import { CHAPTERS } from '@/data/content';
import { ProReveal } from './ProReveal';
import { SectionEyebrow } from './SectionEyebrow';

export function ProExperience() {
  return (
    <section id="chapters" className="scroll-mt-8 py-16 md:py-20">
      <SectionEyebrow num="03" label="Experience" />
      <ProReveal className="relative pl-7">
        <span className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-(--color-pro-line)" />
        {CHAPTERS.map((c, i) => (
          <div key={c.title} className={`relative ${i === CHAPTERS.length - 1 ? '' : 'pb-7.5'}`}>
            <span className="absolute top-1 -left-7 h-[11px] w-[11px] rounded-full border-2 border-(--color-pro-accent) bg-(--color-pro-bg)" />
            <p className="m-0 mb-1 text-[12.5px] text-(--color-pro-muted)" style={{ fontFamily: 'var(--font-pro-mono)' }}>{c.when}</p>
            <p className="m-0 mb-1 text-base font-bold text-(--color-pro-ink)">{c.title}</p>
            <p className="m-0 text-sm text-(--color-pro-muted)">{c.body}</p>
          </div>
        ))}
      </ProReveal>
    </section>
  );
}

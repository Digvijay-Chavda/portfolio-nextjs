import { LOADOUT } from '@/data/content';
import { ProReveal } from './ProReveal';
import { SectionEyebrow } from './SectionEyebrow';

export function ProSkills() {
  return (
    <section id="loadout" className="scroll-mt-8 py-16 md:py-20">
      <SectionEyebrow num="02" label="Skills" />
      <ProReveal className="grid grid-cols-1 gap-8 @sm:grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-4">
        {LOADOUT.map(group => (
          <div key={group.title}>
            <p
              className="m-0 mb-3 border-b border-(--color-pro-line) pb-2 text-[12.5px] font-bold tracking-widest text-(--color-pro-accent) uppercase"
              style={{ fontFamily: 'var(--font-pro-mono)' }}
            >
              {group.title}
            </p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {group.items.map(item => (
                <li key={item} className="border-b border-dashed border-(--color-pro-line) py-0.5 text-[14.5px] text-(--color-pro-ink)">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ProReveal>
    </section>
  );
}

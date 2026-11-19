import { LOADOUT } from '@/data/content';
import { bd } from '@/lib/build';
import { BuildSection } from './build/BuildSection';
import { BuildSelect } from './build/BuildSelect';
import { SectionEyebrow } from './SectionEyebrow';

export function ProSkills() {
  return (
    <BuildSection
      buildId="loadout"
      duration={2}
      log={[{ at: 1, text: '✓ skills grid', tone: 'ok' }]}
      id="loadout"
      className="scroll-mt-8 py-16 md:py-20"
    >
      <SectionEyebrow num="02" label="Skills" />
      <div className="relative grid grid-cols-1 gap-8 @sm:grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-4">
        <BuildSelect label="div.skills-grid" at={0.1} life={1.5} />
        {LOADOUT.map((group, i) => (
          <div key={group.title} className="b-rise" style={bd(0.35 + i * 0.15)}>
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
      </div>
    </BuildSection>
  );
}

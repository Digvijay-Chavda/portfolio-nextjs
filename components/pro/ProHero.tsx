'use client';

import { CONTACT } from '@/data/content';
import { HERO_PRO } from '@/data/content-pro';
import { bd, type LogLine } from '@/lib/build';
import { BuildSection } from './build/BuildSection';
import { BuildSelect } from './build/BuildSelect';
import { TypedText } from './build/TypedText';
import { TypedWords } from './build/TypedWords';

const PRIMARY_BTN =
  'inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors';

// Hero build timeline, in seconds.
const T = {
  section: 0.8,
  greeting: 1.0,
  headline: 1.9,
  lede: 2.6,
  actions: 3.0,
};
const DURATION = T.actions + 0.6;

const HERO_LOG: LogLine[] = [
  { at: T.section, text: '→ building section.hero' },
  { at: T.headline, text: '✓ greeting typed', tone: 'ok' },
  { at: T.actions, text: '→ adding div.actions' },
  { at: T.actions + 0.5, text: '✓ actions ready', tone: 'ok' },
];

export function ProHero() {
  return (
    <BuildSection
      buildId="hero"
      duration={DURATION}
      log={HERO_LOG}
      id="hero"
      className="scroll-mt-8 py-16 md:py-24"
    >
      <div className="relative">
        <BuildSelect label="section.hero" at={T.section} life={T.actions - T.section} />

        <p className="mb-4.5 min-h-[1.4em] text-sm font-semibold text-(--color-pro-accent)" style={{ fontFamily: 'var(--font-pro-mono)' }}>
          <TypedText text={HERO_PRO.greeting} at={T.greeting} />
        </p>
        <h2 className="m-0 mb-5 max-w-3xl text-[28px] leading-[1.15] font-extrabold tracking-tight text-(--color-pro-ink) sm:text-[34px] sm:leading-[1.1] md:text-[52px]">
          <TypedWords text={HERO_PRO.headline} at={T.headline} />
        </h2>
        <p className="b-rise m-0 mb-9 max-w-[58ch] text-[17px] leading-relaxed text-(--color-pro-muted)" style={bd(T.lede)}>
          {HERO_PRO.lede}
        </p>

        <div className="relative w-fit">
          <BuildSelect label="div.actions" at={T.actions} life={DURATION - T.actions} />

          <div className="b-rise flex flex-wrap gap-3.5" style={bd(T.actions)}>
            <a
              href="#cases"
              onClick={e => { e.preventDefault(); document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`${PRIMARY_BTN} border-(--color-pro-ink) bg-(--color-pro-ink) text-(--color-pro-bg) hover:border-(--color-pro-accent) hover:bg-(--color-pro-accent) hover:text-(--color-pro-bg)`}
            >
              View projects
            </a>
            <a
              href={CONTACT.resume}
              download
              className={`${PRIMARY_BTN} border-(--color-pro-line) text-(--color-pro-ink) hover:border-(--color-pro-accent) hover:text-(--color-pro-accent)`}
            >
              Download resume
            </a>
          </div>
        </div>
      </div>
    </BuildSection>
  );
}

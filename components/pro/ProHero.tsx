'use client';

import { CONTACT } from '@/data/content';
import { HERO_PRO } from '@/data/content-pro';
import { bd, type LogLine } from '@/lib/build';
import { BuildSection } from './build/BuildSection';
import { BuildSelect } from './build/BuildSelect';
import { TypedText } from './build/TypedText';

const PRIMARY_BTN =
  'inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors';

// Hero build timeline, in seconds. The "error" is a first attempt at the buttons with
// unreadable contrast: flagged, reverted, then replaced by the real buttons.
const T = {
  section: 0.8,
  greeting: 1.0,
  headline: 1.9,
  lede: 2.6,
  actions: 3.0,
  bad: 3.1,
  error: 3.6,
  revert: 4.7,
  fixed: 4.8,
};

const HERO_LOG: LogLine[] = [
  { at: T.section, text: '→ building section.hero' },
  { at: T.headline, text: '✓ greeting typed', tone: 'ok' },
  { at: T.actions, text: '→ adding div.actions' },
  { at: T.error, text: '✗ .btn-primary contrast 1.3:1 fails WCAG AA', tone: 'err' },
  { at: T.revert - 0.1, text: '↺ reverting last change…' },
  { at: T.fixed, text: '✓ restored · contrast passes AA', tone: 'ok' },
];

export function ProHero() {
  return (
    <BuildSection
      buildId="hero"
      auto
      duration={T.fixed + 1.6}
      log={HERO_LOG}
      id="hero"
      className="scroll-mt-8 py-16 md:py-24"
    >
      <div className="relative">
        <BuildSelect label="section.hero" at={T.section} life={2.2} />

        <p className="mb-4.5 min-h-[1.4em] text-sm font-semibold text-(--color-pro-accent)" style={{ fontFamily: 'var(--font-pro-mono)' }}>
          <TypedText text={HERO_PRO.greeting} at={T.greeting} />
        </p>
        <h2
          className="b-wipe m-0 mb-5 max-w-3xl text-[28px] leading-[1.15] font-extrabold tracking-tight text-(--color-pro-ink) sm:text-[34px] sm:leading-[1.1] md:text-[52px]"
          style={bd(T.headline, { '--dur': 0.9 })}
        >
          {HERO_PRO.headline}
        </h2>
        <p className="b-rise m-0 mb-9 max-w-[58ch] text-[17px] leading-relaxed text-(--color-pro-muted)" style={bd(T.lede)}>
          {HERO_PRO.lede}
        </p>

        <div className="relative w-fit">
          <BuildSelect label="div.actions" at={T.actions} life={0.7} />
          <BuildSelect label="✗ a11y error" at={T.error} life={1.2} tone="err" />
          <BuildSelect label="↺ reverted" at={T.revert} life={1.1} />

          <div className="grid [&>*]:[grid-area:1/1]">
            {/* The agent's wrong first attempt — decorative, never focusable or clickable. */}
            <div aria-hidden inert className="b-bad flex-wrap gap-3.5" style={bd(T.bad, { '--life': T.fixed - T.bad + 0.2 })}>
              <span className={`${PRIMARY_BTN} b-bad-btn b-shake`} style={bd(T.error)}>View projects</span>
              <span className={`${PRIMARY_BTN} b-bad-btn`}>Download resume</span>
            </div>

            <div className="b-good flex flex-wrap gap-3.5" style={bd(T.fixed)}>
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

          <span aria-hidden className="b-chip b-chip-err" style={bd(T.error + 0.1, { '--life': T.revert - T.error })}>
            ✗ Contrast 1.3:1 · fails WCAG AA
          </span>
          <span aria-hidden className="b-chip b-chip-ok" style={bd(T.fixed, { '--life': 1.4 })}>
            ✓ Reverted · contrast passes AA
          </span>
        </div>
      </div>
    </BuildSection>
  );
}

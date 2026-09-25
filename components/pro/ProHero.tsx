import { CONTACT } from '@/data/content';
import { HERO_PRO } from '@/data/content-pro';

export function ProHero() {
  return (
    <section id="hero" className="scroll-mt-8 py-16 md:py-24">
      <p className="mb-4.5 text-sm font-semibold text-(--color-pro-accent)" style={{ fontFamily: 'var(--font-pro-mono)' }}>
        {HERO_PRO.greeting}
      </p>
      <h2 className="m-0 mb-5 max-w-3xl text-[28px] leading-[1.15] font-extrabold tracking-tight text-(--color-pro-ink) sm:text-[34px] sm:leading-[1.1] md:text-[52px]">
        {HERO_PRO.headline}
      </h2>
      <p className="m-0 mb-9 max-w-[58ch] text-[17px] leading-relaxed text-(--color-pro-muted)">
        {HERO_PRO.lede}
      </p>
      <div className="flex flex-wrap gap-3.5">
        <a
          href="#cases"
          onClick={e => { e.preventDefault(); document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="inline-flex items-center rounded-lg border border-(--color-pro-ink) bg-(--color-pro-ink) px-5 py-2.5 text-sm font-semibold text-(--color-pro-bg) no-underline transition-colors hover:border-(--color-pro-accent) hover:bg-(--color-pro-accent) hover:text-(--color-pro-bg)"
        >
          View projects
        </a>
        <a
          href={CONTACT.resume}
          download
          className="inline-flex items-center rounded-lg border border-(--color-pro-line) px-5 py-2.5 text-sm font-semibold text-(--color-pro-ink) no-underline transition-colors hover:border-(--color-pro-accent) hover:text-(--color-pro-accent)"
        >
          Download resume
        </a>
      </div>
    </section>
  );
}

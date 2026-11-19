import { CONTACT } from '@/data/content';
import { bd } from '@/lib/build';
import { BuildSection } from './build/BuildSection';
import { BuildSelect } from './build/BuildSelect';
import { DrawTrace } from './build/DrawTrace';
import { TypedWords } from './build/TypedWords';
import { SectionEyebrow } from './SectionEyebrow';

export function ProContact() {
  return (
    <BuildSection
      buildId="contact"
      duration={2.2}
      log={[{ at: 1.2, text: '✓ contact section', tone: 'ok' }]}
      id="contact"
      className="scroll-mt-8 py-16 md:py-20"
    >
      <SectionEyebrow num="04" label="Contact" />
      <div className="relative flex flex-col gap-5.5 rounded-2xl border border-(--color-pro-line) bg-(--color-pro-surface) px-6 py-8 sm:px-9 sm:py-11">
        <BuildSelect label="section.contact" at={0.1} life={2.1} />
        <DrawTrace at={0.2} dur={1.1} radius={16} />
        <h3 className="m-0 text-2xl font-extrabold text-(--color-pro-ink)">
          <TypedWords text="Let's work together." at={0.5} />
        </h3>
        <p className="b-rise m-0 max-w-[50ch] text-[15px] leading-relaxed text-(--color-pro-muted)" style={bd(0.9)}>
          Open to new opportunities — reach out directly or find me on LinkedIn and GitHub.
        </p>
        <div className="b-rise flex flex-wrap gap-3" style={bd(1.1)}>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center rounded-lg border border-(--color-pro-ink) bg-(--color-pro-ink) px-5 py-2.5 text-sm font-semibold text-(--color-pro-bg) no-underline transition-colors hover:border-(--color-pro-accent) hover:bg-(--color-pro-accent) hover:text-(--color-pro-bg)"
          >
            Send email
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-(--color-pro-line) px-5 py-2.5 text-sm font-semibold text-(--color-pro-ink) no-underline transition-colors hover:border-(--color-pro-accent) hover:text-(--color-pro-accent)"
          >
            LinkedIn ↗
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-(--color-pro-line) px-5 py-2.5 text-sm font-semibold text-(--color-pro-ink) no-underline transition-colors hover:border-(--color-pro-accent) hover:text-(--color-pro-accent)"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-(--color-pro-line) pt-6 text-[12.5px] text-(--color-pro-muted) sm:mt-16 sm:flex-row" style={{ fontFamily: 'var(--font-pro-mono)' }}>
        <span>Digvijay Chavda © {new Date().getFullYear()}</span>
        <span>Built with Next.js &amp; Tailwind</span>
      </footer>
    </BuildSection>
  );
}

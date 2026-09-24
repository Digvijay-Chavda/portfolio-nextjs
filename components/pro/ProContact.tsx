import { CONTACT } from '@/data/content';
import { ProReveal } from './ProReveal';
import { SectionEyebrow } from './SectionEyebrow';

export function ProContact() {
  return (
    <section id="contact" className="scroll-mt-8 py-16 md:py-20">
      <SectionEyebrow num="04" label="Contact" />
      <ProReveal className="flex flex-col gap-5.5 rounded-2xl border border-(--color-pro-line) bg-(--color-pro-surface) px-9 py-11">
        <h3 className="m-0 text-2xl font-extrabold text-(--color-pro-ink)">Let&apos;s work together.</h3>
        <p className="m-0 max-w-[50ch] text-[15px] leading-relaxed text-(--color-pro-muted)">
          Open to new opportunities — reach out directly or find me on LinkedIn and GitHub.
        </p>
        <div className="flex flex-wrap gap-3">
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
      </ProReveal>

      <footer className="mt-16 flex flex-col justify-between gap-2 border-t border-(--color-pro-line) pt-6 text-[12.5px] text-(--color-pro-muted) sm:flex-row" style={{ fontFamily: 'var(--font-pro-mono)' }}>
        <span>Digvijay Chavda © {new Date().getFullYear()}</span>
        <span>Built with Next.js &amp; Tailwind</span>
      </footer>
    </section>
  );
}

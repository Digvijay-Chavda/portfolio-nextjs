import { CHAPTERS, CONTACT, LOADOUT } from '@/data/content';
import { NeonText } from './NeonText';

const sectionPad = 'mx-auto max-w-[1320px] px-[clamp(18px,4vw,32px)] py-[clamp(56px,8vw,90px)]';
const h2 = 'm-0 font-display text-[clamp(56px,7vw,104px)] font-black uppercase leading-[.9]';

export function Loadout() {
  return (
    <section id="loadout" className={sectionPad}>
      <h2 className={`${h2} mb-6 md:mb-10`}>Skills</h2>
      <div className="grid grid-cols-2 gap-0.5 bg-bone/10 md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {LOADOUT.map(g => (
          <div key={g.title} className="flex flex-col gap-2.5 bg-ink p-4 md:gap-4 md:p-[30px]">
            <span className="font-display text-lg font-extrabold uppercase leading-none md:text-[30px]">{g.title}</span>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 md:gap-2">
              {g.items.map(i => (
                <li key={i} className="flex justify-between border-b border-bone/10 pb-1.5 text-sm md:pb-2 md:text-[17px]">
                  <span>{i}</span>
                  <span aria-hidden className="hidden font-cond text-dim md:inline">■</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Chapters() {
  return (
    <section id="chapters" className={sectionPad}>
      <h2 className={`${h2} mb-[50px]`}>Chapters</h2>
      {/* Vertical timeline on mobile, horizontal on desktop */}
      <ol className="relative m-0 flex list-none flex-col gap-[34px] p-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-[26px]">
        <span
          aria-hidden
          className="absolute top-2.5 bottom-2.5 left-[7px] w-px bg-[linear-gradient(#c8201c,rgba(220,214,200,.2))] md:top-[9px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto md:bg-[linear-gradient(90deg,#c8201c,rgba(220,214,200,.2))]"
        />
        {CHAPTERS.map(ch => (
          <li key={ch.title} className="relative flex flex-col gap-2.5 pl-9 md:gap-3 md:pt-[34px] md:pl-0">
            <span aria-hidden className="absolute top-0.5 left-0 h-[13px] w-[13px] rotate-45 border-2 border-blood bg-ink md:top-[3px]" />
            <span className="font-cond text-sm tracking-[.24em] text-muted">{ch.when}</span>
            <span className="font-display text-[26px] font-extrabold uppercase leading-none">{ch.title}</span>
            <span className="text-base leading-normal text-body">{ch.body}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-bg relative flex min-h-screen flex-col items-center justify-center gap-[26px] px-[clamp(18px,4vw,32px)] py-24 text-center"
    >
      <h2 className="m-0 font-display text-[clamp(60px,10.5vw,170px)] font-black leading-[.82] tracking-[.02em] text-blood">
        <NeonText text="INTERESTED?" />
      </h2>
      <div className="flex flex-wrap justify-center gap-3.5 font-cond text-[17px] uppercase tracking-[.24em]">
        <a href={`mailto:${CONTACT.email}`} className="bg-bone px-[30px] py-4 text-ink no-underline transition-colors hover:bg-white hover:text-ink">
          Yes · Send email
        </a>
        <a href={CONTACT.resume} download="Digvijay_Chavda_Resume.pdf" className="border border-bone/45 px-[30px] py-4 no-underline">
          Download resume
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-7 font-cond text-[15px] tracking-[.14em] text-muted">
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
        <span className="select-text">{CONTACT.email}</span>
      </div>
      <span className="absolute inset-x-0 bottom-[76px] px-[18px] font-cond text-xs tracking-[.14em] text-dim md:bottom-6">
        ORIGINAL FAN-INSPIRED THEME · NOT AFFILIATED WITH ANY GAME PUBLISHER
      </span>
    </section>
  );
}

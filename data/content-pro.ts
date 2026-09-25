// Professional theme's own copy: plain labels, no in-fiction flavor.
// Facts (projects, skills, experience, contact) stay in data/content.ts and are shared as-is.

export const NAV_PRO = [
  { label: 'Intro', id: 'hero' },
  { label: 'Projects', id: 'cases' },
  { label: 'Skills', id: 'loadout' },
  { label: 'Experience', id: 'chapters' },
  { label: 'Contact', id: 'contact' },
] as const;

export const SIDEBAR_BIO = 'I turn product requirements into fast, typed, well-tested frontend.';

export const HERO_PRO = {
  greeting: "Hi, I'm Digvijay 👋",
  headline: 'Software developer building interfaces that ship, not just demo.',
  lede: "I'm a software engineer working mainly in React, TypeScript, and Next.js, with 3+ years at ZURU Tech across chat, compliance, and account-management products. Most of what I do comes down to building frontend that scales well made reusable components, state that doesn't turn into spaghetti, and cleaning up legacy code as I go. I also have a growing interest in AI, particularly RAG, tool-calling agents, and LLM-powered tools.",
}
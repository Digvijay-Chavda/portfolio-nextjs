// Professional theme's own copy: plain labels, no in-fiction flavor.
// Facts (projects, skills, experience, contact) stay in data/content.ts and are shared as-is.

export const NAV_PRO = [
  { label: 'Intro', id: 'hero' },
  { label: 'Projects', id: 'cases' },
  { label: 'Skills', id: 'loadout' },
  { label: 'Experience', id: 'chapters' },
  { label: 'Contact', id: 'contact' },
] as const;

export const HERO_PRO = {
  greeting: "Hi, I'm Digvijay 👋",
  headline: 'Software developer building interfaces that ship, not just demo.',
  lede: 'Specialized in React, TypeScript and Next.js for production — with a growing focus on AI: RAG, tool-calling agents, LLM-powered tools.',
};

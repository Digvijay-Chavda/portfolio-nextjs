// All portfolio copy lives here. Edit this file to update the site.

export type CaseFile = {
  id: string;
  no: string;
  name: string;
  sub: string;
  stamp: 'LIVE' | 'SHIPPED';
  img: string;
  pos: string;
  alt: string;
  stack: string;
  points: string[];
  links?: { live: string; source: string };
};

export const CASES: CaseFile[] = [
  {
    id: 'ep', no: '01', name: 'Endpoint', sub: 'Solo project · AI API mocking', stamp: 'LIVE',
    img: '/assets/case-endpoint.png', pos: 'center 30%', alt: 'Endpoint dashboard',
    stack: 'Next.js 16 · TypeScript · PostgreSQL · Prisma · Gemini AI · SSE',
    points: [
      'Spins up working mock REST APIs in seconds, no backend needed. Deployed on Vercel.',
      'Gemini 2.5 Flash turns plain-English prompts into validated JSON, cached so repeat prompts skip the API.',
      'Catch-all route for every HTTP method with auth, CORS, latency and error-rate controls; requests stream live over SSE.',
    ],
    links: { live: 'https://endpoint-ai.vercel.app', source: 'https://github.com/Digvijay-Chavda/endpoint-ai' },
  },
  {
    id: 'chat', no: '02', name: 'Chat Platform', sub: 'Enterprise software · real-time messaging', stamp: 'SHIPPED',
    img: '/assets/case-chat.png', pos: 'center 8%', alt: 'Chat Platform conversation list',
    stack: 'React · TypeScript · WebSockets · i18n',
    points: [
      'Media: image gallery, custom video player, GIF and multi-format video, link previews.',
      'WebSocket layer for team and member updates, unread counts, notification sync and clean reconnection.',
      'Memoization and tighter state updates cut lag in long conversations. English/Chinese support.',
    ],
  },
  {
    id: 'cct', no: '03', name: 'Compliance Tool', sub: 'Enterprise software · GIS building-code platform', stamp: 'SHIPPED',
    img: '/assets/case-cct.png', pos: 'left top', alt: 'Code Compliance Tool task board',
    stack: 'React · TypeScript · shadcn/ui · Zustand',
    points: [
      'Permission-aware (RBAC) component system that shows or hides UI by role.',
      'Migrated legacy JSX pages to TypeScript and shadcn/ui.',
      'Regulations, products, test plans and labs pages with persistent filters; GIS map views.',
    ],
  },
  {
    id: 'acc', no: '04', name: 'Accounts Platform', sub: 'Enterprise software · sign-in & accounts', stamp: 'SHIPPED',
    img: '/assets/case-accounts.png', pos: 'left top', alt: 'Accounts Platform settings',
    stack: 'React · TypeScript · Amplitude',
    points: [
      'Owned the auth frontend: invitations, magic-link and social login, silent token refresh.',
      'Deep-linking into the desktop app after login; responsive settings with dark mode.',
      'Teams, team profiles and shareable invite links.',
    ],
  },
];

export const LOADOUT = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript'] },
  { title: 'State & data', items: ['Zustand', 'TanStack Query', 'Redux Toolkit', 'REST · WebSockets'] },
  { title: 'Styling & UI', items: ['Tailwind CSS', 'shadcn/ui', 'HTML5 · CSS3', 'Figma'] },
  { title: 'Tooling', items: ['Jest · Vitest', 'Git · GitLab CI/CD', 'Prisma · PostgreSQL', 'Gemini API · i18n'] },
];

export const CHAPTERS = [
  { when: '2018 – 2021', title: 'Diploma, ICT', body: 'Marwadi University, Rajkot. CGPA 9.12.' },
  { when: '2021 – 2024', title: 'B.Tech, ICT', body: 'Marwadi University, Rajkot. CGPA 8.84.' },
  { when: 'MAY 2023 – PRESENT', title: 'ZURU Tech', body: 'Software Engineer (React.js), Online Services.' },
];

// [nav label, section id, door label, key]
export const NAV = [
  { label: 'Files', id: 'cases', door: 'Work files', key: '01' },
  { label: 'Skills', id: 'loadout', door: 'Skills', key: '02' },
  { label: 'Chapters', id: 'chapters', door: 'Chapters', key: '03' },
  { label: 'Contact', id: 'contact', door: 'Continue', key: '04' },
] as const;

export const LOAD_TIPS = [
  'Scanning subject file',
  'Hydrating components',
  'Quarantining bugs',
  'Resolving dependencies',
  'Sweeping for type errors',
];

export const CONTACT = {
  email: 'digvijay.chavda.dev@gmail.com',
  linkedin: 'https://linkedin.com/in/digvijaychavda',
  github: 'https://github.com/Digvijay-Chavda',
  resume: '/assets/Digvijay_Chavda_Resume.pdf',
};

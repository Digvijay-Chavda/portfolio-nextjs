# Digvijay Chavda · Portfolio

**Live: [digvijay-chavda.vercel.app](https://digvijay-chavda.vercel.app)**

My personal portfolio, built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4. It exports as a fully static site and is hosted on Vercel.

The site has **two themes** that share the same content:

| Theme | What it is |
|---|---|
| **Professional** (default) | A clean sidebar layout with a light/dark mode. On a visitor's first load in a tab, an "AI agent" builds the page in front of them (see below). |
| **Evil** (opt-in) | A survival-horror theme: ECG loader, swinging doors between sections, a flashlight hero with random signal-loss glitches, and "case file" projects. Reached from the round eye button in the bottom-right corner of the Professional theme (it expands to "Into the Darkness" on hover). A gold sun button in the same corner takes you back. |

The Professional theme is the real site. It is always server-rendered first, so crawlers and a cold first paint see actual content. The Evil theme is only mounted on the client, when a visitor picks it or has it saved.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
npm run start        # serves ./out (npx serve out)
npm run typecheck    # tsc --noEmit
```

There is no lint or test script.

## Deploy

`next.config.ts` sets `output: 'export'`, `trailingSlash: true` and unoptimized images, so the build is plain static files in `out/`. Import the repo into Vercel and keep the defaults (no base path, no environment variables). Every push to `master` deploys.

If the domain changes, update `siteUrl` in `app/layout.tsx`. It feeds the Open Graph and Twitter metadata, and the share image is `public/og-image.jpg`.

## Editing content

| What | Where |
|---|---|
| Projects (`CASES`), skills (`LOADOUT`), experience and education (`CHAPTERS`), contact links and resume path (`CONTACT`), Evil-theme nav (`NAV`) and loader tips (`LOAD_TIPS`) | `data/content.ts`. Shared by both themes. |
| Professional-theme wording: nav labels, sidebar bio, hero greeting, headline and intro | `data/content-pro.ts` |
| Images and the resume PDF | `public/assets/` |

Projects marked `classified: true` in `CASES` are internal, unreleased work. They show a redacted "Under NDA" placeholder instead of the real screenshot (in the Professional theme as well).

## Professional theme: AI build intro

On a visitor's first load in a tab, the page "builds itself": an agent cursor drags selection boxes around elements, a build log narrates in the bottom-right corner (desktop only), borders are traced, text is typed with a caret, and one deliberate mistake (unreadable button contrast) is flagged and reverted before the real buttons appear. Sections build one after another in strict order, and the page auto-scrolls to follow. Sections that are not built yet stay hidden entirely.

- It plays **once per tab session**. A reload in the same tab skips it (`sessionStorage` key `portfolio:built`).
- Reduced-motion users, visitors without JavaScript and crawlers always get the plain, fully visible page. The `ai-build` class that hides unbuilt content is added only by a script in `<head>` that runs with JS, once per tab, and never for reduced motion, so nobody can end up on a blank page.
- Agent name and speed: `lib/build.ts` (`AGENT_NAME`, `BUILD_SPEED`). The CSS reads the same speed through the `--b-speed` custom property.
- Code: `components/pro/build/` (provider, per-section wrapper, selection cursor, build log, border trace, scan sweep, typed text and words).
- Timing and look: `app/globals.css`, in the "AI build effect" block.

## Themes and saved settings

| Key | Storage | Meaning |
|---|---|---|
| `portfolio:theme` | localStorage | `pro` or `evil`, the last theme the visitor chose |
| `portfolio:pro-mode` | localStorage | `light` or `dark`, the Professional theme's own day/night toggle (independent of the theme choice) |
| `portfolio:built` | sessionStorage | the build intro has already played in this tab |

A returning visitor who prefers Evil would normally see one frame of the Professional page on a hard reload. To avoid that, an inline script in `app/layout.tsx` stamps a boot attribute on `<html>` before React hydrates. `ThemeGate` then covers the screen (`ThemeFade`) until the Evil DOM has painted. Switching themes uses the same short fade.

## Structure

```
app/
  layout.tsx          fonts (next/font), metadata, pre-hydration boot script
  page.tsx            renders ThemeGate
  globals.css         theme tokens, Professional palette and build effect, Evil theme styles
components/
  ThemeGate.tsx       picks which theme is mounted, handles switching
  ThemeFade.tsx       short full-screen cover used while switching
  ThemeToggle.tsx     floating gold sun button back to Professional (Evil theme only)
  pro/                Professional theme
    ProPortfolio.tsx    shell: sidebar + Intro, Projects, Skills, Experience, Contact
    ProHeader.tsx       sidebar nav, social links, day/night toggle
    ExploreDarknessFab.tsx  the floating eye button that switches to Evil
    useProMode.ts       light/dark state
    build/              the AI build intro
  Portfolio.tsx       Evil theme shell: loader -> doors -> sections
  Loader.tsx          ECG and percentage intro
  Doors.tsx, DoorContext.tsx   door transition between sections
  Header.tsx          top bar with live status HUD, mobile bottom nav
  Hero.tsx            flashlight, glass pane, random signal-loss bursts
  ScrambleName.tsx, ScrambleText.tsx, NeonText.tsx   text effects
  CaseFiles.tsx       tabbed projects
  Sections.tsx        Loadout, Chapters, Contact
data/
  content.ts          shared content
  content-pro.ts      Professional-theme copy
lib/
  theme.ts            stored theme (read and write)
  build.ts            build-intro settings and types
  staticBurst.ts      the signal-loss (red/teal split, scanlines) effect
  useTypewriter.ts    typing hooks for the build intro
  useDraggableFab.ts  long-press-to-drag for the floating buttons on touch screens
public/
  assets/             project screenshots, hero background, profile photo, resume PDF
  og-image.jpg        social share image
```

## Notes

- **Static export:** there is no server, API or database. Everything is decided in the browser.
- **Fonts:** loaded with `next/font/google`. The Professional theme uses Inter and JetBrains Mono. The Evil theme uses Big Shoulders, Barlow Condensed and Barlow.
- **Performance:** the heavy Evil-theme animations (loader, signal-loss burst, name glitch, flashlight) write directly to the DOM through refs, so React does not re-render every frame.
- **Accessibility:** `prefers-reduced-motion` is respected. The build intro is skipped, and the Evil theme drops grain and pulses and uses instant door transitions.
- **Touch screens:** the floating theme buttons can be picked up and moved with a long press, and they sit slightly transparent at rest. Their position resets on the next load. The manual replay of the signal-loss burst is desktop only.
- The Evil theme is an original fan-inspired design and is not affiliated with any game publisher.

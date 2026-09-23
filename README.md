# Digvijay Chavda · Portfolio

**Live: [digvijay-chavda.vercel.app](https://digvijay-chavda.vercel.app)**

A survival-horror themed portfolio built with Next.js 15, React 19, TypeScript and Tailwind CSS v4. It exports as a static site, so it deploys on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run typecheck
```

## Deploy

Import the repo into Vercel and keep the defaults — no base path needed. Every push to `master` auto-deploys.

## Editing content
All copy (case files, loadout, chapters, nav, loader tips, contact links) lives in **`data/content.ts`**. Images and the resume PDF are in `public/assets/`.

## Structure
```
app/
  layout.tsx        fonts (next/font), metadata
  page.tsx
  globals.css       theme tokens, cursors, keyframes, door/glass/grain styles
components/
  Portfolio.tsx     page shell: loader → doors → sections
  DoorContext.tsx   door transition state + useEnterSection()
  Doors.tsx         the two door halves + "ENTERING …" label
  Loader.tsx        3s ECG / percentage intro (plays on every load)
  Header.tsx        top bar, SYSTEM STATUS ONLINE hud, mobile bottom nav
  Hero.tsx          background, flashlight, glass pane, click-to-shatter
  ScrambleName.tsx  decode + glitch name animation
  CaseFiles.tsx     tabbed projects (door transition between files)
  Sections.tsx      Loadout, Chapters timeline, Contact
lib/
  shatterGlass.ts   radial shard generation + Web Animations
  asset.ts          basePath-aware public URLs
data/content.ts
```

## Notes
- The heavy animations (loader, shatter, name glitch, flashlight) write straight to the DOM through refs, so React doesn't re-render every frame.
- `prefers-reduced-motion` is respected: no grain or pulses, instant doors, and the name shows without the decode.
- This is an original fan-inspired theme, not affiliated with any game publisher.

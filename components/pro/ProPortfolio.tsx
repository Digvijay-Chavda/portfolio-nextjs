import type { CSSProperties } from 'react';
import { BUILD_SPEED } from '@/lib/build';
import { BuildLog } from './build/BuildLog';
import { BuildProvider } from './build/BuildProvider';
import { ExploreDarknessFab } from './ExploreDarknessFab';
import { ProContact } from './ProContact';
import { ProExperience } from './ProExperience';
import { ProHeader } from './ProHeader';
import { ProHero } from './ProHero';
import { ProProjects } from './ProProjects';
import { ProSkills } from './ProSkills';

/** Top-level Professional theme: no doors, no glitch, plain scroll navigation.
 * Same underlying data and section order as the Evil theme, different presentation.
 * BuildProvider drives the "AI is building this page" intro (see components/pro/build). */
export function ProPortfolio({ onExploreEvil }: { onExploreEvil?: () => void }) {
  return (
    <BuildProvider>
      <div
        className="mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-(--color-pro-bg) text-(--color-pro-ink) sm:px-6 md:flex-row md:px-12"
        style={{ fontFamily: 'var(--font-pro-sans)', '--b-speed': BUILD_SPEED } as CSSProperties}
      >
        <ProHeader />
        <main className="@container w-full min-w-0 px-5 py-8 sm:px-0 sm:py-12 md:py-16 md:pl-8 lg:pl-16 xl:pl-24">
          <ProHero />
          <ProProjects />
          <ProSkills />
          <ProExperience />
          <ProContact />
        </main>
        <BuildLog />
        {onExploreEvil && <ExploreDarknessFab onExploreEvil={onExploreEvil} />}
      </div>
    </BuildProvider>
  );
}

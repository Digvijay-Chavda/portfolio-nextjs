import { ExploreDarknessFab } from './ExploreDarknessFab';
import { ProContact } from './ProContact';
import { ProExperience } from './ProExperience';
import { ProHeader } from './ProHeader';
import { ProHero } from './ProHero';
import { ProProjects } from './ProProjects';
import { ProSkills } from './ProSkills';

/** Top-level Professional theme: no doors, no glitch, plain scroll navigation.
 * Same underlying data and section order as the Evil theme, different presentation. */
export function ProPortfolio({ onExploreEvil }: { onExploreEvil?: () => void }) {
  return (
    <div
      className="mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-(--color-pro-bg) text-(--color-pro-ink) sm:px-6 md:flex-row md:px-12"
      style={{ fontFamily: 'var(--font-pro-sans)' }}
    >
      <ProHeader />
      <main className="@container w-full min-w-0 px-5 py-8 sm:px-0 sm:py-12 md:py-16 md:pl-8 lg:pl-16 xl:pl-24">
        <ProHero />
        <ProProjects />
        <ProSkills />
        <ProExperience />
        <ProContact />
      </main>
      {onExploreEvil && <ExploreDarknessFab onExploreEvil={onExploreEvil} />}
    </div>
  );
}

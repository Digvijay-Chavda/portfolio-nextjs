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
      className="mx-auto flex min-h-screen w-full max-w-7xl bg-(--color-pro-bg) px-6 text-(--color-pro-ink) md:px-12"
      style={{ fontFamily: 'var(--font-pro-sans)' }}
    >
      <ProHeader onExploreEvil={onExploreEvil} />
      <main className="w-full min-w-0 py-12 md:py-16 md:pl-12 lg:pl-24">
        <ProHero />
        <ProProjects />
        <ProSkills />
        <ProExperience />
        <ProContact />
      </main>
    </div>
  );
}

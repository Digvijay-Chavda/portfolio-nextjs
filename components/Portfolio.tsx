'use client';

import { useCallback, useEffect, useState } from 'react';
import { CaseFiles } from './CaseFiles';
import { DoorProvider, useDoors } from './DoorContext';
import { Doors } from './Doors';
import { Header, MobileNav } from './Header';
import { Hero } from './Hero';
import { Loader } from './Loader';
import { Chapters, Contact, Loadout } from './Sections';

function Page({ onLoadingChange }: { onLoadingChange?: (loading: boolean) => void }) {
  const [loading, setLoading] = useState(true);
  const { openDoors } = useDoors();

  useEffect(() => {
    onLoadingChange?.(true);
    // Only needs to fire once on mount — handleLoaded reports the end of loading itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loader finishes → remove it, then swing the doors open.
  const handleLoaded = useCallback(() => {
    setLoading(false);
    onLoadingChange?.(false);
    setTimeout(openDoors, 120);
  }, [openDoors, onLoadingChange]);

  return (
    <>
      <div aria-hidden className="grain" />
      <Doors loading={loading} />
      {loading && <Loader onDone={handleLoaded} />}
      <Header />
      <MobileNav />
      <main>
        <Hero ready={!loading} />
        <CaseFiles />
        <Loadout />
        <Chapters />
        <Contact />
      </main>
    </>
  );
}

export default function Portfolio({ onLoadingChange }: { onLoadingChange?: (loading: boolean) => void }) {
  return (
    <DoorProvider>
      <Page onLoadingChange={onLoadingChange} />
    </DoorProvider>
  );
}

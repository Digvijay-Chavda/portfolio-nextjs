'use client';

import { useCallback, useState } from 'react';
import { CaseFiles } from './CaseFiles';
import { DoorProvider, useDoors } from './DoorContext';
import { Doors } from './Doors';
import { Header, MobileNav } from './Header';
import { Hero } from './Hero';
import { Loader } from './Loader';
import { Chapters, Contact, Loadout } from './Sections';

function Page() {
  const [loading, setLoading] = useState(true);
  const { openDoors } = useDoors();

  // Loader finishes → remove it, then swing the doors open.
  const handleLoaded = useCallback(() => {
    setLoading(false);
    setTimeout(openDoors, 120);
  }, [openDoors]);

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

export default function Portfolio() {
  return (
    <DoorProvider>
      <Page />
    </DoorProvider>
  );
}

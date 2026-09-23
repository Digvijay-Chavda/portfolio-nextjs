type BurstOptions = {
  ghostA: HTMLElement;   // red-tinted duplicate layer
  ghostB: HTMLElement;   // teal-tinted duplicate layer
  scan: HTMLElement;     // scanline overlay
  flash: HTMLElement;    // brief white flash
  onDone: () => void;
};

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * TV-static / signal-loss burst: red/teal RGB-split ghosts flicker in random
 * horizontal slices alongside scanlines and a flash, like the picture briefly
 * lost signal. Same slice-glitch technique as the name scramble's ghost text.
 */
export function staticBurst({ ghostA, ghostB, scan, flash, onDone }: BurstOptions): () => void {
  const FRAMES = 9;
  const FRAME_MS = 55;

  const setGhost = (el: HTMLElement, dir: 1 | -1) => {
    const top = rnd(0, 70);
    const bottom = Math.min(100, top + rnd(8, 34));
    el.style.opacity = '.8';
    el.style.clipPath = `inset(${top}% 0 ${100 - bottom}% 0)`;
    el.style.transform = `translate(${(dir * rnd(4, 16)).toFixed(1)}px, ${rnd(-3, 3).toFixed(1)}px)`;
  };

  const clearGhosts = () => { ghostA.style.opacity = '0'; ghostB.style.opacity = '0'; };

  flash.animate([{ opacity: .55 }, { opacity: 0 }], { duration: 160, easing: 'ease-out' });
  scan.style.opacity = '1';
  scan.animate([{ backgroundPositionY: '0px' }, { backgroundPositionY: '340px' }], { duration: 700, iterations: 1 });

  let frame = 0;
  let cancelled = false;
  const timers: ReturnType<typeof setTimeout>[] = [];

  const tick = () => {
    if (cancelled) return;
    if (frame++ < FRAMES) {
      setGhost(ghostA, -1);
      setGhost(ghostB, 1);
      timers.push(setTimeout(tick, FRAME_MS));
    } else {
      clearGhosts();
      scan.style.opacity = '0';
      onDone();
    }
  };
  tick();

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
    clearGhosts();
    scan.style.opacity = '0';
  };
}

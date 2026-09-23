type ShatterOptions = {
  box: HTMLElement;          // overlay the shards are drawn into
  hero: HTMLElement | null;  // shaken on impact
  glass: HTMLElement | null; // static pane, hidden while shattered
  x: number;                 // impact point, relative to box
  y: number;
  onDone: () => void;
};

const NS = 'http://www.w3.org/2000/svg';
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Splits the pane into a radial web of polygons around the impact point,
 * flashes, shakes, then drops every shard with gravity. Returns a cancel fn.
 */
export function shatterGlass({ box, hero, glass, x: ix, y: iy, onDone }: ShatterOptions): () => void {
  const W = box.offsetWidth;
  const H = box.offsetHeight;
  const Rm = Math.max(Math.hypot(ix, iy), Math.hypot(W - ix, iy), Math.hypot(ix, H - iy), Math.hypot(W - ix, H - iy)) * 1.06;
  const N = W < 600 ? 13 : 18;
  const rings = [rnd(24, 40), Rm * 0.12, Rm * 0.26, Rm * 0.44, Rm * 0.68, Rm];

  const angles = Array.from({ length: N }, (_, k) => (k / N) * Math.PI * 2 + rnd(-0.1, 0.1));
  const grid = angles.map(a => rings.map((r, j) => {
    const q = j === rings.length - 1 ? 1 : rnd(0.86, 1.14);
    const aa = a + (j ? rnd(-0.05, 0.05) : 0);
    return [ix + Math.cos(aa) * r * q, iy + Math.sin(aa) * r * q] as const;
  }));
  const P = (k: number, j: number) => grid[k % N][j];

  const polys: (readonly [number, number])[][] = [];
  for (let k = 0; k < N; k++) {
    polys.push([[ix, iy], P(k, 0), P(k + 1, 0)]);
    for (let j = 0; j < rings.length - 1; j++) {
      if (j >= 1 && Math.random() < 0.55) {
        polys.push([P(k, j), P(k + 1, j), P(k + 1, j + 1)]);
        polys.push([P(k, j), P(k + 1, j + 1), P(k, j + 1)]);
      } else {
        polys.push([P(k, j), P(k + 1, j), P(k + 1, j + 1), P(k, j + 1)]);
      }
    }
  }

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', String(W));
  svg.setAttribute('height', String(H));
  svg.style.cssText = 'position:absolute;inset:0;display:block;overflow:hidden';
  const gid = 'gl' + Math.random().toString(36).slice(2);
  svg.innerHTML =
    `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6eef5" stop-opacity=".22"/><stop offset=".5" stop-color="#e6eef5" stop-opacity=".05"/><stop offset="1" stop-color="#e6eef5" stop-opacity=".14"/></linearGradient>` +
    `<radialGradient id="${gid}f"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".25" stop-color="#ffe2c0" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;

  const pieces = polys.map(p => {
    const g = document.createElementNS(NS, 'g');
    const cx = p.reduce((s, q) => s + q[0], 0) / p.length;
    const cy = p.reduce((s, q) => s + q[1], 0) / p.length;
    const pts = p.map(q => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ');
    g.innerHTML =
      `<polygon points="${pts}" fill="url(#${gid})" fill-opacity="${rnd(0.6, 1.4).toFixed(2)}" stroke="rgba(0,0,0,.45)" stroke-width="2" transform="translate(.7 .9)"/>` +
      `<polygon points="${pts}" fill="none" stroke="rgba(240,246,250,.75)" stroke-width=".9" stroke-linejoin="round"/>`;
    g.style.transformOrigin = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`;
    svg.appendChild(g);
    return { g, cx, cy };
  });

  const flash = document.createElementNS(NS, 'circle');
  flash.setAttribute('cx', String(ix));
  flash.setAttribute('cy', String(iy));
  flash.setAttribute('r', String(Math.min(W, H) * 0.35));
  flash.setAttribute('fill', `url(#${gid}f)`);
  svg.appendChild(flash);
  box.appendChild(svg);
  if (glass) { glass.style.transition = 'none'; glass.style.opacity = '0'; }

  const finish = () => {
    svg.remove();
    if (glass) { glass.style.transition = 'opacity .9s ease'; glass.style.opacity = '1'; }
    onDone();
  };

  flash.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, fill: 'forwards' });
  hero?.animate(
    [{ transform: 'none' }, { transform: 'translate(-10px,6px)' }, { transform: 'translate(8px,-5px)' }, { transform: 'translate(-4px,2px)' }, { transform: 'none' }],
    { duration: 280, easing: 'ease-out' },
  );

  let last = 0;
  pieces.forEach(({ g, cx, cy }) => {
    const dist = Math.hypot(cx - ix, cy - iy) / Rm;
    const dx = (cx - ix) * rnd(0.06, 0.24) + rnd(-50, 50);
    const dy = rnd(H * 0.45, H * 1.1) + (cy - iy) * 0.1;
    const rot = rnd(-75, 75);
    const delay = 320 + dist * 420 + rnd(0, 160);
    const duration = rnd(800, 1300);
    last = Math.max(last, delay + duration);
    g.animate(
      [
        { transform: 'none', opacity: 1 },
        { transform: `translate(${(dx * 0.1).toFixed(1)}px,${(-rnd(4, 18)).toFixed(1)}px) rotate(${(rot * 0.08).toFixed(1)}deg)`, opacity: 1, offset: 0.14 },
        { transform: `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scale(.9)`, opacity: 0 },
      ],
      { duration, delay, easing: 'cubic-bezier(.45,0,.9,.55)', fill: 'both' },
    );
  });

  const t = setTimeout(finish, last + 250);
  return () => { clearTimeout(t); svg.remove(); };
}

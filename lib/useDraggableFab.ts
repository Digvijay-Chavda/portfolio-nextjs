'use client';

import { useEffect, useRef, useState } from 'react';

const LONG_PRESS_MS = 350;
const MOVE_CANCEL_PX = 10;
const EDGE_MARGIN = 12;

/** Long-press-to-pick-up dragging for a touch-only floating action button. Desktop keeps
 * its plain fixed corner position (mouse users get the hover-reveal instead); on touch,
 * holding the button for a beat lets it follow the finger, clamped to the viewport, so it
 * can be moved off whatever content it happens to be covering. Position always resets to
 * the default corner on reload — nothing is persisted. */
export function useDraggableFab() {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const state = useRef({
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    longPressTimer: undefined as ReturnType<typeof setTimeout> | undefined,
    picked: false,
    moved: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;

    const clamp = (x: number, y: number) => {
      const r = el.getBoundingClientRect();
      const maxX = window.innerWidth - r.width - EDGE_MARGIN;
      const maxY = window.innerHeight - r.height - EDGE_MARGIN;
      return { x: Math.min(Math.max(x, EDGE_MARGIN), Math.max(maxX, EDGE_MARGIN)), y: Math.min(Math.max(y, EDGE_MARGIN), Math.max(maxY, EDGE_MARGIN)) };
    };

    const cancelLongPress = () => {
      clearTimeout(state.current.longPressTimer);
      state.current.longPressTimer = undefined;
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const r = el.getBoundingClientRect();
      state.current.startX = t.clientX;
      state.current.startY = t.clientY;
      state.current.baseX = r.left;
      state.current.baseY = r.top;
      state.current.picked = false;
      state.current.moved = false;
      state.current.longPressTimer = setTimeout(() => {
        state.current.picked = true;
        setDragging(true);
        if (navigator.vibrate) navigator.vibrate(12);
      }, LONG_PRESS_MS);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - state.current.startX;
      const dy = t.clientY - state.current.startY;
      if (!state.current.picked) {
        if (Math.hypot(dx, dy) > MOVE_CANCEL_PX) cancelLongPress();
        return;
      }
      state.current.moved = true;
      e.preventDefault();
      const next = clamp(state.current.baseX + dx, state.current.baseY + dy);
      setOffset(next);
    };

    const onTouchEnd = () => {
      cancelLongPress();
      if (state.current.picked) setDragging(false);
      state.current.picked = false;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    return () => {
      cancelLongPress();
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  // Suppress the click that would otherwise fire right after a drag ends.
  const onClickCapture = (e: React.MouseEvent) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  };

  const style = offset ? { left: offset.x, top: offset.y, right: 'auto', bottom: 'auto' } : undefined;

  return { ref, style, dragging, onClickCapture };
}

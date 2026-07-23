'use client';

import { useEffect } from 'react';

/**
 * Lenis smooth scroll — PRD §5.1.
 * Lightly damped: enough to make scroll-linked animation feel buttery,
 * not so much that it fights what the user expects a scroll to do.
 *
 * Disabled entirely under prefers-reduced-motion, and on touch devices,
 * where native scrolling is already smooth and hijacking it costs
 * responsiveness for no gain.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    // Dynamic import keeps Lenis out of the bundle for routes and devices
    // that never use it (PRD §8.2).
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}

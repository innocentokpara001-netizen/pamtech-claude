'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Entrance reveal — PRD §5.1.
 *
 * Deliberately not a Framer Motion wrapper: this is the most-used
 * primitive on the site, and an IntersectionObserver plus a CSS class
 * costs nothing at runtime. Content is visible without JS (see the
 * .reveal rules in globals.css) and the observer only ever adds
 * visibility, never removes it.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  /** Stagger in ms — capped at 6 siblings per PRD §5.1. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // reveals fire once; re-animating on scroll-up is noise
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-in-view={inView ? 'true' : 'false'}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

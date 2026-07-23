import type { Config } from 'tailwindcss';

/**
 * Colours resolve to CSS custom properties, which are emitted from
 * lib/brand.ts in app/layout.tsx. That keeps one source of truth: change
 * a hex in brand.ts and both Tailwind classes and raw CSS follow.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--c-ink)',
        surface: 'var(--c-surface)',
        subtle: 'var(--c-subtle)',
        accent: 'var(--c-accent)',
        'accent-deep': 'var(--c-accent-deep)',
        muted: 'var(--c-muted)',
        // Set per-page on business line routes; falls back to group accent.
        line: 'var(--c-line, var(--c-accent))',
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        // Single easing curve across the site (PRD §5.1).
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

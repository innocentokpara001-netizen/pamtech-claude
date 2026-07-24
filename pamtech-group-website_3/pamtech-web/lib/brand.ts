/**
 * BRAND TOKENS — SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------
 * Every colour in the site resolves through this file. Changing a
 * value here changes it everywhere; nothing else hardcodes a hex.
 *
 * ⚠️  ACTION REQUIRED — see PRD §9
 * The values below are PLACEHOLDERS. The live site's stylesheet and
 * logo could not be read programmatically, so these have not been
 * verified against the real identity.
 *
 * To finalise: replace the six values in `group` with the official
 * brand hexes (or send a screenshot / brand sheet and they get
 * filled in). No other file needs to change.
 */

export const brand = {
  /** Core group palette — used on Home, Our Story, Impact, Careers, Contact */
  group: {
    ink: '#0B1E2D', // primary dark — headings, dark sections     [PLACEHOLDER]
    surface: '#FFFFFF', // page background                        [PLACEHOLDER]
    subtle: '#F4F6F8', // alternating section background          [PLACEHOLDER]
    accent: '#C9A227', // primary brand accent — CTAs, marks      [PLACEHOLDER]
    accentDeep: '#8F7318', // accent pressed / dark-on-light      [PLACEHOLDER]
    muted: '#5B6B79', // body text at reduced emphasis            [PLACEHOLDER]
  },

  /**
   * Per-line accents (PRD §9). Each business line page and its item in
   * the header dropdown carries one accent so seven pages read as
   * individual businesses without leaving the group identity.
   *
   * These are derived from each industry's own vernacular rather than
   * picked arbitrarily — but they still need signing off against the
   * confirmed group palette.
   */
  lines: {
    'oil-and-gas': '#1F6F5C', // deep petroleum green
    autoland: '#B8442E', // workshop rust-red
    autoparts: '#3C4A57', // machined steel
    'luxury-ride': '#1A1A24', // night-drive near-black
    media: '#D4562A', // broadcast signal orange
    technology: '#2E5BFF', // interface blue
    'real-estate': '#7A6A52', // architectural clay
  },
} as const;

export type LineSlug = keyof typeof brand.lines;

/** Emitted as CSS custom properties in globals.css via this map. */
export const cssVars: Record<string, string> = {
  '--c-ink': brand.group.ink,
  '--c-surface': brand.group.surface,
  '--c-subtle': brand.group.subtle,
  '--c-accent': brand.group.accent,
  '--c-accent-deep': brand.group.accentDeep,
  '--c-muted': brand.group.muted,
};

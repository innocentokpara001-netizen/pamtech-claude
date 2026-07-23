import type { LineSlug } from './brand';

/**
 * SITE CONFIGURATION
 * Navigation, offices, contact routes, social links.
 * Every href in the header and footer resolves through here, which is
 * how the dead `<>` and `#` links from the old build are prevented from
 * ever coming back.
 */

export const site = {
  name: 'Pamtech Group',
  tagline: 'Committed Service to Humanity',
  description:
    'From energy and mobility to media, technology and real estate, Pamtech is transforming industries across Nigeria with innovation and excellence.',
  url: 'https://www.pamtechgroup.com',
  foundedYear: 2016,
} as const;

/** Both addresses are correct and in active use (confirmed). */
export const emails = {
  /** Primary, shown on Contact and in the footer. */
  primary: 'info@pamtechgroup.com',
  /** Also active — kept live so existing correspondence isn't broken. */
  alternate: 'info@pamtech.com',
} as const;

/**
 * Mailto targets for the Careers page (PRD §6.5).
 *
 * These deliberately point at the CONFIRMED primary address with a
 * subject prefix, rather than at careers@ / partnerships@ addresses.
 * Only info@pamtechgroup.com and info@pamtech.com have been confirmed to
 * exist, and a CV sent to a mailbox that was never created bounces to a
 * candidate and is never seen by anyone here.
 *
 * If dedicated inboxes do exist (or get created), change `to` below and
 * both cards follow.
 */
export const mailto = {
  careers: {
    to: emails.primary,
    subject: 'Career application — Pamtech Group',
    body: 'Please attach your CV and tell us which business line interests you.',
  },
  partnerships: {
    to: emails.primary,
    subject: 'Partnership enquiry — Pamtech Group',
    body: '',
  },
} as const;

/** Builds a mailto: href with subject and body correctly encoded. */
export const mailtoHref = (m: { to: string; subject: string; body: string }) =>
  `mailto:${m.to}?subject=${encodeURIComponent(m.subject)}` +
  (m.body ? `&body=${encodeURIComponent(m.body)}` : '');

export const offices = [
  {
    id: 'owerri',
    name: 'Owerri Office',
    role: 'Head Office',
    address:
      'Plot CR17 Housing Area T, Port Harcourt Rd, behind Apams, New Owerri, Owerri, Imo State, Nigeria.',
    phone: '+234 811 500 4000',
    phoneHref: 'tel:+2348115004000',
    hours: 'Mon – Sat: 8:00 AM – 6:00 PM',
  },
  {
    id: 'port-harcourt',
    name: 'Port Harcourt Office',
    role: 'Regional Office',
    // Spelling confirmed as "Rumuodara" — the footer's "Rumuodomaya" was wrong.
    address:
      'No 3 Edward Woherem Avenue, Opposite Ruby Event Center, Beside Winners Chapel Church/Jackbina Filling Station, Rumuodara, Rivers State, Nigeria.',
    phone: '0703 445 0400',
    phoneHref: 'tel:+2347034450400',
    hours: 'Mon – Sat: 8:00 AM – 6:00 PM',
  },
] as const;

/**
 * ⚠️  Confirm handles before launch (PRD §11, item 5).
 * These were recovered from the group's public profiles rather than
 * supplied directly, so they're best-guess and need a quick check.
 */
export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/pamtechgroup/' },
  { label: 'LinkedIn', href: 'https://ng.linkedin.com/company/pamtechgroup' },
  { label: 'Instagram', href: 'https://www.instagram.com/pamtechgroup/' },
  { label: 'X', href: 'https://x.com/pamtechgroup' },
] as const;

export type NavLine = { slug: LineSlug; name: string };

export const businessLineNav: NavLine[] = [
  { slug: 'oil-and-gas', name: 'Oil & Gas' },
  { slug: 'autoland', name: 'Autoland' },
  { slug: 'autoparts', name: 'Autoparts' },
  { slug: 'luxury-ride', name: 'Luxury Ride' },
  { slug: 'media', name: 'Media' },
  { slug: 'technology', name: 'Technology' },
  { slug: 'real-estate', name: 'Real Estate' },
];

export type NavItem = {
  label: string;
  href: string;
  /** Present only on Business Lines, which renders as a dropdown. */
  children?: NavLine[];
};

export const headerNav: NavItem[] = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Business Lines', href: '/business', children: businessLineNav },
  { label: 'Impact', href: '/impact' },
  { label: 'Careers', href: '/careers' },
];

export const footerNav = {
  'Business Lines': businessLineNav.map((l) => ({
    label: l.name,
    href: `/business/${l.slug}`,
  })),
  Company: [
    { label: 'Our Story', href: '/our-story' },
    { label: 'Impact', href: '/impact' },
    // Foundation now lives under Impact rather than as a business line.
    { label: 'Pamtech Foundation', href: '/impact#foundation' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

/**
 * BUSINESS LINE CONTENT
 * -------------------------------------------------------------
 * There is no CMS, so the type does the work a CMS schema would:
 * every line is the same shape, so no page can quietly ship with a
 * missing services list or an empty CTA. Adding a line means adding
 * one object; TypeScript will refuse the build until it's complete.
 *
 * `signature` names the scroll sequence that gives each page its
 * identity (PRD §5.2). It is the one section that is NOT shared.
 */

import type { LineSlug } from './brand';

export type Service = { name: string; detail: string };
export type ProofPoint = { value: string; label: string };

export type BusinessLine = {
  slug: LineSlug;
  name: string;
  /** Hero line — what this business is, in one sentence. */
  positioning: string;
  /** Expanded "what we do". */
  description: string;
  /** The page's thesis — drives the signature sequence. */
  thesis: string;
  /** Which scroll sequence component this page mounts. */
  signature:
    | 'pipeline'
    | 'service-bay'
    | 'exploded-view'
    | 'night-drive'
    | 'broadcast'
    | 'device-sync'
    | 'blueprint';
  services: [Service, Service, Service, Service];
  proof: ProofPoint[];
  cta: { label: string; href: string };
  /** Two sibling slugs shown as cross-links at page end. */
  siblings: LineSlug[];
};

export const businessLines: BusinessLine[] = [
  {
    slug: 'oil-and-gas',
    name: 'Oil & Gas',
    positioning:
      "Powering Nigeria's energy future with reliable fuel distribution and innovative petroleum solutions.",
    description:
      "Pamtech Oil and Gas began in 2016 after identifying a critical gap in Nigeria's downstream sector. Rather than compete at the top of the value chain, we entered through disciplined trading and distribution — and became the biggest oil and gas marketer in Imo State.",
    thesis: 'The distance fuel travels to reach you.',
    signature: 'pipeline',
    services: [
      { name: 'Fuel Distribution', detail: 'PMS, AGO and DPK moved reliably across the South-East and South-South.' },
      { name: 'Fleet Management', detail: 'Tanker fleet maintenance and haulage managed end to end.' },
      { name: 'Bulk Supply', detail: 'Volume supply agreements for industrial and commercial operations.' },
      { name: 'Energy Consulting', detail: 'Downstream advisory grounded in a decade of operating experience.' },
    ],
    proof: [
      { value: '2016', label: 'Where Pamtech began' },
      { value: '#1', label: 'Oil and gas marketer in Imo State' },
    ],
    cta: { label: 'Request bulk supply', href: '/contact?enquiry=oil-and-gas' },
    siblings: ['autoland', 'technology'],
  },
  {
    slug: 'autoland',
    name: 'Autoland',
    positioning:
      'Your premier destination for quality vehicles, expert service, and unmatched automotive excellence.',
    description:
      'For Pamtech Autoland the vision was clear: bring transparency, proper vehicle history tracking, professional diagnostics and reliable service delivery into one coordinated ecosystem.',
    thesis: 'What happens between drop-off and handover.',
    signature: 'service-bay',
    services: [
      { name: 'Vehicle Sales', detail: 'Quality vehicles with verified history and transparent pricing.' },
      { name: 'Maintenance & Repair', detail: 'Professional diagnostics, body work, spray painting and oven bake.' },
      { name: 'Parts & Accessories', detail: 'Genuine parts fitted by the technicians who diagnosed the fault.' },
      { name: 'Fleet Services', detail: 'Scheduled maintenance contracts for corporate and commercial fleets.' },
    ],
    proof: [
      { value: '2', label: 'State-of-the-art garages' },
      { value: '150+', label: 'Employees' },
      { value: '2', label: 'Regions covered — South-South and South-East' },
    ],
    cta: { label: 'Book a service', href: '/contact?enquiry=autoland' },
    siblings: ['autoparts', 'luxury-ride'],
  },
  {
    slug: 'autoparts',
    name: 'Autoparts',
    positioning:
      'Supplying genuine, high-quality automotive parts to keep your vehicles running at peak performance.',
    description:
      'Pamtech Autoparts operates the biggest spare part plazas across two regions, supplying genuine components to workshops, fleets and individual owners who need the part to be the right part.',
    thesis: 'Every part accounted for.',
    signature: 'exploded-view',
    services: [
      { name: 'Genuine Parts', detail: 'Verified components, traceable to source.' },
      { name: 'Accessories', detail: 'Fitments and add-ons across major vehicle makes.' },
      { name: 'Wholesale Supply', detail: 'Trade pricing and volume supply for workshops and dealers.' },
      { name: 'Technical Support', detail: 'Identification and fitment guidance from people who know the vehicles.' },
    ],
    proof: [
      { value: '2', label: 'Regional spare part plazas — the largest in each' },
    ],
    cta: { label: 'Find a part', href: '/contact?enquiry=autoparts' },
    siblings: ['autoland', 'oil-and-gas'],
  },
  {
    slug: 'luxury-ride',
    name: 'Luxury Ride',
    positioning:
      'Redefining premium transportation with comfort, safety, and world-class chauffeur services.',
    description:
      'Pamtech Luxury Ride redefines elegance and comfort with an exclusive fleet of premium vehicles, tailored for both personal and corporate needs — the biggest car rental company in the South-East.',
    thesis: 'The journey, not the vehicle.',
    signature: 'night-drive',
    services: [
      { name: 'Executive Transport', detail: 'Chauffeured movement for executives and delegations.' },
      { name: 'Event Services', detail: 'Fleet coordination for weddings, conferences and state functions.' },
      { name: 'Airport Transfers', detail: 'Scheduled pickups with flight tracking.' },
      { name: 'Corporate Packages', detail: 'Retained fleet arrangements for organisations.' },
    ],
    proof: [
      { value: '30+', label: 'SUVs' },
      { value: '2+', label: 'Coaster buses' },
      { value: '#1', label: 'Car rental company in the South-East' },
    ],
    cta: { label: 'Reserve a vehicle', href: '/contact?enquiry=luxury-ride' },
    siblings: ['autoland', 'media'],
  },
  {
    slug: 'media',
    name: 'Media',
    positioning:
      'Connecting communities through compelling content, broadcasting excellence, and digital innovation.',
    description:
      'Pamtech Media leverages content and storytelling to build a solid community for business growth and customer success — reaching over two billion people and building a combined following of 2.5 million.',
    thesis: 'Two billion people reached.',
    signature: 'broadcast',
    services: [
      { name: 'Broadcasting', detail: 'Programming and distribution across owned and partner channels.' },
      { name: 'Content Production', detail: 'End-to-end production, from concept to publish.' },
      { name: 'Digital Media', detail: 'Social-first content built for reach and retention.' },
      { name: 'Advertising Solutions', detail: 'Campaign planning and placement across the network.' },
    ],
    proof: [
      { value: '2B+', label: 'People reached' },
      { value: '2.5M+', label: 'Combined followership' },
      { value: '15+', label: 'In-house influencers' },
    ],
    cta: { label: 'Work with us', href: '/contact?enquiry=media' },
    siblings: ['technology', 'luxury-ride'],
  },
  {
    slug: 'technology',
    name: 'Technology',
    positioning:
      'Driving digital transformation with cutting-edge software solutions, cloud services, and innovative tech infrastructure.',
    description:
      "Pamtech Technology is building Africa's most innovative and people-centred technology company, known for creating useful products that improve how people live and do business.",
    thesis: 'Software you can actually touch.',
    signature: 'device-sync',
    services: [
      { name: 'Software Development', detail: 'Product engineering, from first spec to shipped release.' },
      { name: 'Cloud Solutions', detail: 'Infrastructure that scales with the businesses it serves.' },
      { name: 'IT Consulting', detail: 'Technical strategy grounded in operating a real conglomerate.' },
      { name: 'Digital Infrastructure', detail: 'Systems integration across the group and beyond it.' },
    ],
    proof: [
      { value: '4', label: 'Products shipped' },
      { value: '2025', label: 'Year the technology arm launched' },
    ],
    cta: { label: 'Request a demo', href: '/contact?enquiry=technology' },
    siblings: ['media', 'oil-and-gas'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    positioning:
      'Creating landmark properties and sustainable communities that redefine modern living and commercial spaces.',
    description:
      'Pamtech Properties & Real Estate — a perfect place to call home, a smarter place to build wealth.',
    thesis: 'From plan to key.',
    signature: 'blueprint',
    services: [
      { name: 'Property Development', detail: 'Estates designed and delivered end to end.' },
      { name: 'Sales & Leasing', detail: 'Residential and commercial placement.' },
      { name: 'Property Management', detail: 'Facilities and tenancy managed after handover.' },
      { name: 'Investment Advisory', detail: 'Guidance for buyers treating property as an asset.' },
    ],
    proof: [
      { value: '150+', label: 'Smart homes' },
      { value: '08', label: 'City Garden' },
      { value: '1', label: 'Wealth Campus' },
    ],
    cta: { label: 'Book an inspection', href: '/contact?enquiry=real-estate' },
    siblings: ['technology', 'autoland'],
  },
];

export const getLine = (slug: string) =>
  businessLines.find((l) => l.slug === slug);

export const lineSlugs = businessLines.map((l) => l.slug);

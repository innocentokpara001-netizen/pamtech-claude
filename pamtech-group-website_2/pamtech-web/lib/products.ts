/**
 * TECHNOLOGY PRODUCTS
 * Shown on /business/technology (moved off the homepage, PRD §6.3).
 *
 * Petrol Padi is included here. It was named in the old site's 2025
 * timeline entry but had no product card anywhere — so it read as a
 * product the group had mentioned and then forgotten.
 */

export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  image: string;
};

export const products: Product[] = [
  {
    slug: 'carcare-app',
    name: 'Carcare App',
    eyebrow: "Your Vehicle's Digital Companion",
    headline: 'Car care, in your pocket',
    description:
      "Book services, track maintenance, and manage your vehicle's health from your phone.",
    features: ['Easy Booking', 'Service Tracking', 'Trusted Mechanics', 'Ratings & Reviews'],
    cta: { label: 'Download app', href: '#' }, // TODO: store links
    image: '/products/car_care.png',
  },
  {
    slug: 'carcare-garage',
    name: 'Carcare Garage',
    eyebrow: 'Garage Management, Simplified',
    headline: 'The workshop, under control',
    description:
      'Software for automotive workshops to manage appointments, inventory, customers and operations in one place.',
    features: ['Job Management', 'Customer CRM', 'Inventory Control', 'Analytics Dashboard'],
    cta: { label: 'Request demo', href: '/contact?enquiry=carcare-garage' },
    image: '/products/car_care_garage.png',
  },
  {
    slug: 'petrol-padi',
    name: 'Petrol Padi',
    eyebrow: 'Fuel, Without the Guesswork',
    headline: 'Know before you drive',
    // ⚠️  Placeholder copy — Petrol Padi had no description anywhere on the
    // old site. Confirm what it actually does before launch (PRD §11).
    description:
      'Built on the group’s downstream operations to make finding, pricing and paying for fuel straightforward.',
    features: ['Station Finder', 'Live Pricing', 'Digital Payment', 'Purchase History'],
    cta: { label: 'Learn more', href: '/contact?enquiry=petrol-padi' },
    image: '/products/petrol_padi.png', // TODO: asset needed
  },
  {
    slug: 'learn-with-pamtech',
    name: 'Learn With Pamtech',
    eyebrow: 'Empowering Through Education',
    headline: 'Skills that travel',
    description:
      'Training programmes, skill development courses and professional certifications, online and in person.',
    features: ['Expert Instructors', 'Online & Offline', 'Certifications', 'Community Support'],
    cta: { label: 'Explore courses', href: '#' }, // TODO: platform URL
    image: '/products/learn.png',
  },
];

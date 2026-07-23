import type { Metadata } from 'next';
import { Suspense } from 'react';
import { offices, emails, socials } from '@/lib/site';
import ContactForm from '@/components/ContactForm';

/**
 * Contact — PRD §6.6. Standard, functional, low-motion.
 * No Reveal wrappers on the form: content someone is trying to act on
 * should not be waiting on an intersection observer to appear.
 */

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Visit our offices in Owerri and Port Harcourt, or send us a message.',
};

/** LocalBusiness schema for both offices (PRD §8.5). */
const schema = {
  '@context': 'https://schema.org',
  '@graph': offices.map((o) => ({
    '@type': 'LocalBusiness',
    name: `Pamtech Group — ${o.name}`,
    address: { '@type': 'PostalAddress', streetAddress: o.address },
    telephone: o.phone,
    email: emails.primary,
    openingHours: 'Mo-Sa 08:00-18:00',
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-ink pb-20 pt-[calc(var(--header-h)+96px)] text-white">
        <div className="mx-auto max-w-content px-5 lg:px-10">
          <h1 className="text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Get In Touch
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Visit our offices or send us a message. We reply within one working
            day.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-content gap-16 px-5 py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:px-10 lg:py-28">
        {/* Form */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Send a message
          </h2>
          <div className="mt-8">
            {/* useSearchParams requires a Suspense boundary in the App Router. */}
            <Suspense fallback={<p className="text-muted">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        {/* Offices */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Our offices
          </h2>
          <ul className="mt-8 space-y-10">
            {offices.map((o) => (
              <li key={o.id} className="rounded-lg bg-subtle p-8">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  {o.role}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{o.name}</h3>
                <address className="mt-4 not-italic leading-relaxed text-muted">
                  {o.address}
                </address>
                <div className="mt-5 space-y-1.5 text-sm">
                  <a href={o.phoneHref} className="block font-medium underline-offset-4 hover:underline">
                    {o.phone}
                  </a>
                  <p className="text-muted">{o.hours}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-block text-sm font-medium underline underline-offset-4"
                >
                  Open in Maps
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              Email
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {[emails.primary, emails.alternate].map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="underline-offset-4 hover:underline">
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              Follow
            </h2>
            <ul className="mt-4 flex flex-wrap gap-4 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline-offset-4 hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

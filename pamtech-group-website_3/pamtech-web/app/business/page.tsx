import Link from 'next/link';
import type { Metadata } from 'next';
import { businessLines } from '@/lib/business-lines';
import { brand } from '@/lib/brand';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Business Lines',
  description:
    'Seven business lines across energy, mobility, media, technology and real estate.',
};

export default function BusinessIndex() {
  return (
    <>
      <section className="bg-ink pb-16 pt-[calc(var(--header-h)+80px)] text-white">
        <div className="mx-auto max-w-content px-5 lg:px-10">
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Our Business Lines
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Diverse expertise, unified purpose — delivering excellence across
            every sector we serve.
          </p>
        </div>
      </section>

      <ul className="mx-auto grid max-w-content gap-6 px-5 py-20 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {businessLines.map((line, i) => (
          <li key={line.slug}>
            <Reveal delay={(i % 6) * 70}>
              <Link
                href={`/business/${line.slug}`}
                className="flex h-full flex-col rounded-lg bg-subtle p-8 transition-transform duration-300 ease-brand hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="h-2 w-8 rounded-full"
                  style={{ background: brand.lines[line.slug] }}
                />
                <h2 className="mt-6 text-2xl font-semibold">{line.name}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {line.positioning}
                </p>
                <span className="mt-6 text-sm font-medium">Explore →</span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}

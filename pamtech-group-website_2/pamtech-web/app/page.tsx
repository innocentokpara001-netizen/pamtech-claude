import Link from 'next/link';
import { businessLines } from '@/lib/business-lines';
import { brand } from '@/lib/brand';
import { site } from '@/lib/site';
import Reveal from '@/components/Reveal';

/**
 * Home — PRD §6.1.
 * Its job is now routing, not exhaustive telling. The full timeline,
 * gallery, product deep-dives and contact block have moved to their
 * own pages, each leaving a teaser behind.
 *
 * Phase 2 completes this page; the convergence signature lands in Phase 4.
 */
export default function Home() {
  return (
    <>
      {/* Hero — headline is painted, not revealed (LCP). */}
      <section className="flex min-h-[92svh] items-center bg-ink pt-[var(--header-h)] text-white">
        <div className="mx-auto w-full max-w-content px-5 lg:px-10">
          <p className="text-sm uppercase tracking-[0.16em] text-accent">
            Celebrating 10 Years of Excellence
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
            {site.tagline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/business"
              className="rounded-full bg-accent px-7 py-3.5 font-semibold text-ink"
            >
              Explore our business lines
            </Link>
            <Link
              href="/our-story"
              className="rounded-full px-7 py-3.5 font-semibold ring-1 ring-white/25"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <section className="border-b border-black/5">
        <dl className="mx-auto grid max-w-content gap-10 px-5 py-16 sm:grid-cols-3 lg:px-10">
          {[
            ['7', 'Business Lines'],
            ['400+', 'Team Members'],
            ['10+', 'Years'],
          ].map(([value, label], i) => (
            <Reveal key={label} delay={i * 70}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <p className="text-5xl font-semibold lg:text-6xl">{value}</p>
                <p className="mt-2 text-sm text-muted">{label}</p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Business lines grid — the convergence signature mounts here (Phase 4). */}
      <section className="mx-auto max-w-content px-5 py-24 lg:px-10">
        <h2 className="text-3xl font-semibold lg:text-5xl">
          Seven businesses, one commitment
        </h2>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="mt-6 text-2xl font-semibold">{line.name}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">
                    {line.thesis}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

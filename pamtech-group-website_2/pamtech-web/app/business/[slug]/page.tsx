import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { businessLines, getLine } from '@/lib/business-lines';
import { brand } from '@/lib/brand';
import Reveal from '@/components/Reveal';

/**
 * Business line page — PRD §6.3.
 *
 * Sections 1, 2, 4, 5, 6, 7, 8 are shared across all seven lines so the
 * group reads as one company. Section 3 — the signature scroll sequence —
 * is where each page diverges completely. That slot is filled in Phase 4;
 * the placeholder below states which sequence belongs there.
 */

export function generateStaticParams() {
  return businessLines.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) return {};
  return {
    title: line.name,
    description: line.positioning,
  };
}

export default async function BusinessLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) notFound();

  const siblings = line.siblings
    .map((s) => getLine(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    // Per-line accent scoped to this page only (PRD §9). Everything
    // inside uses `text-line` / `bg-line` and resolves to this value.
    <div style={{ ['--c-line' as string]: brand.lines[line.slug] } as React.CSSProperties}>
      {/* 1 — Hero. Headline is painted, never revealed: it's the LCP element. */}
      <section className="relative flex min-h-[78svh] items-end bg-ink pb-16 pt-[var(--header-h)] text-white">
        <div className="mx-auto w-full max-w-content px-5 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/business" className="hover:text-white">Business Lines</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white">{line.name}</li>
            </ol>
          </nav>

          <p className="text-sm font-medium uppercase tracking-[0.16em] text-line">
            Business Line
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            {line.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {line.positioning}
          </p>
        </div>
      </section>

      {/* 2 — What we do */}
      <section className="mx-auto max-w-content px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="max-w-3xl text-2xl leading-snug lg:text-3xl">
            {line.description}
          </p>
        </Reveal>
      </section>

      {/* 3 — SIGNATURE SEQUENCE (Phase 4) */}
      <section
        aria-label={`${line.name} — ${line.thesis}`}
        className="border-y border-black/5 bg-subtle py-24"
        data-signature={line.signature}
      >
        <div className="mx-auto max-w-content px-5 text-center lg:px-10">
          <p className="text-sm uppercase tracking-[0.16em] text-muted">
            Signature sequence — {line.signature}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-3xl font-semibold lg:text-4xl">
            {line.thesis}
          </p>
        </div>
      </section>

      {/* 4 — Services */}
      <section className="mx-auto max-w-content px-5 py-20 lg:px-10 lg:py-28">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          What we offer
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-black/10 sm:grid-cols-2">
          {line.services.map((s, i) => (
            <li key={s.name} className="bg-surface p-8">
              <Reveal delay={i * 70}>
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.detail}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — Proof */}
      {line.proof.length > 0 && (
        <section className="bg-ink py-20 text-white lg:py-24">
          <div className="mx-auto grid max-w-content gap-10 px-5 sm:grid-cols-3 lg:px-10">
            {line.proof.map((p, i) => (
              <Reveal key={p.label} delay={i * 70}>
                <p className="text-5xl font-semibold text-line lg:text-6xl">
                  {p.value}
                </p>
                <p className="mt-3 text-sm text-white/70">{p.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 7 — CTA */}
      <section className="mx-auto max-w-content px-5 py-24 text-center lg:px-10">
        <Reveal>
          <h2 className="text-3xl font-semibold lg:text-4xl">
            Ready to work with {line.name}?
          </h2>
          <Link
            href={line.cta.href}
            className="mt-8 inline-block rounded-full bg-line px-8 py-4 font-semibold text-white"
          >
            {line.cta.label}
          </Link>
        </Reveal>
      </section>

      {/* 8 — Cross-links. Prevents every business line page from being a
          dead end, and gives each page inbound internal links. */}
      <section className="border-t border-black/5 bg-subtle py-16">
        <div className="mx-auto max-w-content px-5 lg:px-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Elsewhere in the group
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/business/${s.slug}`}
                  className="block rounded-lg bg-surface p-8 transition-transform duration-300 ease-brand hover:-translate-y-1"
                >
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: brand.lines[s.slug] }}
                  />
                  <h3 className="mt-4 text-xl font-semibold">{s.name}</h3>
                  <p className="mt-2 text-muted">{s.thesis}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

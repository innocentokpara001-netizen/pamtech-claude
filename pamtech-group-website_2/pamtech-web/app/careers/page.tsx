import type { Metadata } from 'next';
import { mailto, mailtoHref } from '@/lib/site';
import Reveal from '@/components/Reveal';

/**
 * Careers — PRD §6.5.
 *
 * Mirrors the original site's "Join Our Journey" block: no listings, no
 * ATS, nothing that needs maintaining. Both CTAs are mailto, which is why
 * hardcoded content works cleanly here — this page never needs editing.
 *
 * Motion is deliberately restrained (PRD §5.2). After seven high-motion
 * business line pages, the two pages where someone has an actual task to
 * complete should get out of the way.
 */

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join a team of innovators, problem-solvers and industry leaders across seven business lines in Nigeria.',
};

const culture = [
  {
    title: 'Seven businesses, one bench',
    body: 'A career here is not confined to the line you join. People move between energy, automotive, media, technology and property as they grow.',
  },
  {
    title: 'Built from three people',
    body: 'Pamtech started in 2016 with a team of three in Owerri. Most of the people who built what came next were not specialists when they arrived.',
  },
  {
    title: 'Rooted where we work',
    body: 'Owerri and Port Harcourt are not satellite offices. They are where the group is run from, and where the work happens.',
  },
  {
    title: 'Service, not slogans',
    body: 'Committed service to humanity is the standard applied to how we treat customers, communities and each other.',
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero — no video, no scroll sequence. Headline is painted (LCP). */}
      <section className="bg-ink pb-20 pt-[calc(var(--header-h)+96px)] text-white">
        <div className="mx-auto max-w-content px-5 lg:px-10">
          <p className="text-sm uppercase tracking-[0.16em] text-accent">Careers</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Build here
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Be part of a team that is shaping industries and transforming lives
            across Nigeria.
          </p>
        </div>
      </section>

      {/* Why Pamtech */}
      <section className="mx-auto max-w-content px-5 py-20 lg:px-10 lg:py-28">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          Why Pamtech
        </h2>
        <ul className="mt-12 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {culture.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 70}>
                <h3 className="text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* The two cards, carried over from the original site */}
      <section className="border-t border-black/5 bg-subtle py-20 lg:py-28">
        <div className="mx-auto max-w-content px-5 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-lg bg-surface p-10">
                <h2 className="text-3xl font-semibold">Build Your Career</h2>
                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  We do not keep a running list of open roles. If you can see
                  where you would fit, write to us directly — tell us which
                  business line interests you and attach your CV.
                </p>
                <a
                  href={mailtoHref(mailto.careers)}
                  className="mt-8 inline-block self-start rounded-full bg-accent px-7 py-3.5 font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-accent-deep hover:text-white"
                >
                  Send us your CV
                </a>
                <p className="mt-4 text-sm text-muted">
                  Opens your mail app, addressed and titled.
                </p>
              </div>
            </Reveal>

            <Reveal delay={70} className="h-full">
              <div className="flex h-full flex-col rounded-lg bg-surface p-10">
                <h2 className="text-3xl font-semibold">Partner With Us</h2>
                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  Whether you are a supplier, a client or a collaborator, there
                  is likely a business line here that fits what you do.
                </p>
                <a
                  href={mailtoHref(mailto.partnerships)}
                  className="mt-8 inline-block self-start rounded-full px-7 py-3.5 font-semibold ring-1 ring-ink/20 transition-colors duration-200 ease-brand hover:bg-ink hover:text-white"
                >
                  Start a conversation
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

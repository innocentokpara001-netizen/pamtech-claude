import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact',
  description: 'Committed service to humanity — the numbers, and the Pamtech Foundation.',
};

/** Impact — built in Phase 3. Route exists now so navigation resolves. */
export default function Page() {
  return (
    <section className="mx-auto max-w-content px-5 pb-32 pt-[calc(var(--header-h)+96px)] lg:px-10">
      <h1 className="text-4xl font-semibold sm:text-6xl">Impact</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">Committed service to humanity — the numbers, and the Pamtech Foundation.</p>
      <p className="mt-10 text-sm uppercase tracking-[0.16em] text-muted">
        Phase 3
      </p>
    </section>
  );
}

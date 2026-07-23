import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Pamtech Group handles your data.',
};

/** Privacy Policy — built in Phase 5. Route exists now so navigation resolves. */
export default function Page() {
  return (
    <section className="mx-auto max-w-content px-5 pb-32 pt-[calc(var(--header-h)+96px)] lg:px-10">
      <h1 className="text-4xl font-semibold sm:text-6xl">Privacy Policy</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">How Pamtech Group handles your data.</p>
      <p className="mt-10 text-sm uppercase tracking-[0.16em] text-muted">
        Phase 5
      </p>
    </section>
  );
}

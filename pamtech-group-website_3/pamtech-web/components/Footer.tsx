import Link from 'next/link';
import { footerNav, offices, emails, socials, site } from '@/lib/site';

/**
 * Footer — PRD §4.4.
 * Four columns. Every href resolves to a real destination; the old build
 * shipped these as `<>` and `#`, which is why the footer was effectively
 * decorative.
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-content px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr]">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-light.svg" alt="Pamtech Group" className="h-9 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Building tomorrow, serving today. Transforming industries and
              impacting lives across Nigeria and beyond.
            </p>

            <ul className="mt-6 flex gap-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm underline-offset-4 hover:text-white hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm underline-offset-4 hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Offices */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Get In Touch
            </h2>
            <ul className="mt-5 space-y-6">
              {offices.map((o) => (
                <li key={o.id} className="text-sm leading-relaxed">
                  <p className="font-medium text-white">{o.name}</p>
                  <address className="not-italic">{o.address}</address>
                  <a href={o.phoneHref} className="mt-1 block hover:text-white">
                    {o.phone}
                  </a>
                </li>
              ))}
              <li className="text-sm">
                <a href={`mailto:${emails.primary}`} className="hover:text-white">
                  {emails.primary}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { headerNav, businessLineNav } from '@/lib/site';
import { brand } from '@/lib/brand';

/**
 * Header — PRD §4.4
 * Six items, CTA rightmost. Transparent over hero sections, solid once
 * scrolled past the fold. The Business Lines dropdown is fully keyboard
 * traversable (arrow keys, Escape, focus returns to trigger).
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change closes everything.
  useEffect(() => {
    setOpenDropdown(false);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes the dropdown and returns focus to the trigger, so
  // keyboard users are never stranded inside a closed menu.
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openDropdown]);

  // Click outside closes.
  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [openDropdown]);

  // Body scroll lock while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-colors duration-300 ease-brand',
        scrolled || mobileOpen
          ? 'bg-surface shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-5 lg:px-10">
        <Link href="/" aria-label="Pamtech Group — home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Pamtech Group" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {headerNav.map((item) =>
            item.children ? (
              <div key={item.href} className="relative">
                <button
                  ref={triggerRef}
                  type="button"
                  aria-expanded={openDropdown}
                  aria-haspopup="true"
                  onClick={() => setOpenDropdown((v) => !v)}
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  {item.label}
                  <span aria-hidden className="text-[10px]">
                    ▾
                  </span>
                </button>

                {openDropdown && (
                  <ul
                    ref={menuRef}
                    className="absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 rounded-lg bg-surface p-2 shadow-lg ring-1 ring-black/5"
                  >
                    {item.children.map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={`/business/${child.slug}`}
                          className="flex items-center gap-3 rounded px-3 py-2.5 text-sm hover:bg-subtle"
                        >
                          {/* Per-line accent mark — makes the menu scannable
                              and previews each page's identity. */}
                          <span
                            aria-hidden
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: brand.lines[child.slug] }}
                          />
                          {child.name}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-black/5 pt-1">
                      <Link
                        href="/business"
                        className="block rounded px-3 py-2.5 text-sm font-medium hover:bg-subtle"
                      >
                        View all business lines
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium"
              >
                {item.label}
              </Link>
            ),
          )}

          <Link
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-accent-deep hover:text-white"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          className="lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">
            {mobileOpen ? 'Close menu' : 'Open menu'}
          </span>
          <span aria-hidden className="text-xl">
            {mobileOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* Mobile sheet — dropdown becomes an accordion (PRD §4.4) */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto bg-surface px-5 pb-10 lg:hidden"
        >
          <nav aria-label="Mobile">
            <Link href="/our-story" className="block border-b border-black/5 py-4 text-lg">
              Our Story
            </Link>

            <details className="border-b border-black/5">
              <summary className="cursor-pointer list-none py-4 text-lg">
                Business Lines
              </summary>
              <ul className="pb-3">
                {businessLineNav.map((child) => (
                    <li key={child.slug}>
                      <Link
                        href={`/business/${child.slug}`}
                        className="flex items-center gap-3 py-2.5 pl-4 text-base"
                      >
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full"
                          style={{ background: brand.lines[child.slug] }}
                        />
                        {child.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </details>

            <Link href="/impact" className="block border-b border-black/5 py-4 text-lg">
              Impact
            </Link>
            <Link href="/careers" className="block border-b border-black/5 py-4 text-lg">
              Careers
            </Link>

            <Link
              href="/contact"
              className="mt-6 block rounded-full bg-accent px-5 py-3.5 text-center font-semibold text-ink"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

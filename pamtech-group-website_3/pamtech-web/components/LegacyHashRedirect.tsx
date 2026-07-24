'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * PRD §4.3 — legacy hash anchors.
 *
 * The old site was one page, so every shared or bookmarked link looks
 * like pamtechgroup.com/#impact. Fragments are never sent to the server,
 * so next.config redirects cannot catch these. This runs on mount at the
 * root and rewrites them to real routes, which protects anyone who
 * bookmarked or shared an anchor over the last decade.
 */
const LEGACY: Record<string, string> = {
  '#story': '/our-story',
  '#business-lines': '/business',
  '#impact': '/impact',
  '#careers': '/careers',
  '#contact': '/contact',
};

export default function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname !== '/') return;
    const target = LEGACY[window.location.hash];
    if (target) router.replace(target);
  }, [router]);

  return null;
}

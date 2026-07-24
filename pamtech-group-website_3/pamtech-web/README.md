# Pamtech Group — Website

Phases 1–2 of the multipage redesign. See `pamtech-group-prd.md`.

## Stack

- Next.js (App Router), TypeScript, Tailwind
- **Hosted on Netlify.** Netlify auto-detects Next.js; no runtime plugin
  needs declaring in `netlify.toml`.
- **No backend.** The contact form uses Netlify Forms. There is no API
  route, no database and no mail provider.

## Run

```bash
npm install
npm run dev
```

Node 20. Nothing has been installed or run in this environment (no
network access), so your first `npm install` is also the first real
type-check — expect to fix a stray import, not a design.

## Deploy

Connect the repo in the Netlify dashboard. Build settings are
auto-detected; `netlify.toml` only sets the Node version and security
headers.

**After the first deploy**, in Netlify → Forms:

1. Confirm a form named `contact` was detected. If it wasn't, the build
   did not publish `public/__forms.html` — that file is what the parser
   reads.
2. Add a notification email so submissions actually reach someone.
   Without this, they land in the dashboard and nobody is told.
3. Send a test submission and confirm it arrives.

Step 2 is the one that gets forgotten and it fails silently.

## Where things live

| Path | What it is |
|---|---|
| `lib/brand.ts` | **All colours.** Swap the placeholders here when brand hexes are confirmed. Nothing else hardcodes a hex. |
| `lib/site.ts` | Nav, offices, emails, mailto targets, socials. Every header/footer href resolves through this. |
| `lib/business-lines.ts` | The seven lines as one typed shape. Adding a line without full content fails the build. |
| `lib/products.ts` | Technology products, incl. the new Petrol Padi card. |
| `public/__forms.html` | Netlify Forms field declaration. **Add a field to the form and you must add it here too**, or Netlify drops it silently. |
| `components/ContactForm.tsx` | The real form. Posts into `__forms.html`. |
| `components/Reveal.tsx` | Entrance reveal. Visible without JS by design. |
| `components/SmoothScroll.tsx` | Lenis. Off on touch and reduced-motion. |
| `components/LegacyHashRedirect.tsx` | Rescues old `/#impact`-style links. |
| `app/business/[slug]/page.tsx` | Shared skeleton for all 7 lines. |

## Assets still needed

Place in `public/`:

- `logo.svg`, `logo-light.svg` (footer, on dark)
- `products/petrol_padi.png` — no asset exists yet
- Per-line hero imagery

## Status

**Done —** routing, layout shell, header + dropdown, footer, brand tokens,
content model, redirects, reduced-motion system, all 13 routes resolving,
Careers and Contact built in full.

**Next —** Phase 3: Our Story and Impact. Phase 4: the seven signature
scroll sequences.

## Open items

- Brand hex codes (`lib/brand.ts` ships with placeholders)
- Impact figures — the old site rendered them as `0+`
- Social handles in `lib/site.ts` were recovered from public profiles,
  not supplied — worth a check
- Watch `next/image` under load. Netlify serves it through the Image CDN;
  if function usage or latency becomes an issue, pre-optimize at build
  time instead — the images are hardcoded, so they're all known then.

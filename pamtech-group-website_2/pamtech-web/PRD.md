# Pamtech Group — Website Redesign PRD

**Project:** pamtechgroup.com — single-page site → multipage site
**Version:** 0.1 (draft for review)
**Date:** 23 July 2026
**Status:** Awaiting sign-off on §11 open items before build

---

## 1. Summary

pamtechgroup.com is currently one long scrolling page. Every navigation
item is a hash anchor, and Careers, Contact, the footer Quick Links, the
social icons, and the legal links all point at dead hrefs (`<>` or `#`).
The group has 7 business lines, a Foundation, three software products and
two offices, all compressed into a single scroll.

This redesign breaks the site into a proper multipage architecture where
each business line gets a dedicated page with its own scroll narrative,
and Our Story and Impact become cinematic, video-backed pages.

**Success looks like:** a prospective partner can find and understand any
single business line without scrolling past the other six; a job seeker
can reach Careers in one click; and each business line page feels like it
belongs to that business, not to a template.

---

## 2. Goals & non-goals

### Goals

1. **Separate the business lines.** Seven dedicated pages, each with a
   distinct scroll narrative rooted in that industry.
2. **Give Our Story and Impact emotional weight** through video backing.
3. **Fix the dead ends.** Every nav item, footer link and CTA resolves.
4. **Mobile-first performance.** The primary audience is on Nigerian
   mobile data. Heavy motion must never become a heavy page.
5. **Preserve brand continuity.** Existing identity, tone and content
   carry over; this is a restructure, not a rebrand.

### Non-goals

- No rebrand, new logo, or new tagline.
- No CMS. Content is hardcoded (see §8).
- No e-commerce, customer login, or booking flows.
- No blog or News section in v1 (footer link is deferred, not built).
- No multi-language support.

---

## 3. Audiences

| Audience | Comes for | Primary path |
|---|---|---|
| Corporate / government partners | Credibility, scale, track record | Home → Business line → Contact |
| Retail customers (fuel, service, parts, rides, homes) | A specific service | Search / social → Business line page |
| Job seekers | Roles and culture | Home → Careers |
| Investors & press | Group structure, growth story | Home → Our Story → Impact |
| Foundation beneficiaries & NGO partners | Programmes | Impact |

Design tension to resolve: partners want restraint and proof; retail
customers want warmth and immediacy. The homepage serves partners; the
business line pages serve customers.

---

## 4. Site architecture

### 4.1 Page hierarchy

```
Home (/)
├── Our Story (/our-story)                    [video background]
├── Business Lines (/business)                [index / overview]
│   ├── Oil & Gas (/business/oil-and-gas)
│   ├── Autoland (/business/autoland)
│   ├── Autoparts (/business/autoparts)
│   ├── Luxury Ride (/business/luxury-ride)
│   ├── Media (/business/media)
│   ├── Technology (/business/technology)
│   └── Real Estate (/business/real-estate)
├── Impact (/impact)                          [video background]
│   └── includes Pamtech Foundation
├── Careers (/careers)
├── Contact (/contact)
└── Legal
    ├── Privacy Policy (/privacy)
    ├── Terms of Service (/terms)
    └── Cookie Policy (/cookies)
```

13 pages plus 3 legal. Maximum depth is 2 levels — every page is within
two clicks of home.

### 4.2 URL rationale

Business lines nest under `/business/` rather than sitting at root. This
keeps the conglomerate structure legible in the URL itself, gives a real
`/business` index page for the "show me everything" visitor, and prevents
root-level namespace collisions later (e.g. `/media` colliding with a
press section).

Rules: lowercase, hyphens, no trailing slash, enforced consistently.

### 4.3 Redirects

| From | To | Reason |
|---|---|---|
| `/growth` | `/our-story` | Currently returns 404; page existed in a prior build |
| `/#story` | `/our-story` | Client-side hash → route |
| `/#business-lines` | `/business` | " |
| `/#impact` | `/impact` | " |
| `/#careers` | `/careers` | " |
| `/#contact` | `/contact` | " |

Hash fragments aren't sent to the server, so the redirect for those five
is a client-side check on mount: if `window.location.hash` matches a known
legacy anchor, replace the route. This protects anyone with a bookmarked
or shared anchor link.

### 4.4 Navigation

**Header** (6 items, CTA rightmost):

```
[Logo]   Our Story   Business Lines ▾   Impact   Careers   [Contact Us]
```

- "Business Lines" opens a dropdown with all 7 lines plus a "View all"
  link to `/business`. Each item carries a small line-specific mark so
  the menu is scannable.
- On mobile the dropdown becomes an accordion inside a full-screen sheet.
- Header is transparent over hero sections and gains a solid background
  on scroll past the fold.

**Footer** — four columns, mirroring the current footer but with live
links:

| Business Lines | Company | Get In Touch | Legal |
|---|---|---|---|
| All 7 lines | Our Story, Impact, Careers, Contact | Owerri office, PH office, phone, email | Privacy, Terms, Cookies |

Foundation moves out of the Business Lines column and becomes a link under
Company, pointing to `/impact#foundation`.

**Breadcrumbs** on business line pages only: `Home > Business Lines > Oil & Gas`.

---

## 5. Motion & scroll narrative system

This is the core of the brief. Each page must tell a story through scroll,
and each story must be *specific to that business* — not the same fade-up
applied seven times.

### 5.1 Shared motion foundation

- **Smooth scroll:** Lenis, lightly damped. Not a heavy inertial feel —
  enough to make scroll-linked animation buttery, not enough to fight the
  user's expectations.
- **Scroll-linked sequences:** GSAP ScrollTrigger for pinned/scrubbed
  sections (where progress maps to scroll position).
- **Entrance reveals:** Framer Motion for simple in-view transitions.
- **Timing:** entrance 400–600ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
  Scrubbed sequences are tied to scroll, not time.
- **Stagger:** 60–80ms between siblings, capped at 6 items.

**Non-negotiable rules:**

1. `prefers-reduced-motion: reduce` disables every scrub, parallax and
   pin. Content reverts to a static, fully-readable stacked layout — not a
   broken one. This is tested, not assumed.
2. No pinned horizontal sequences below 1024px. Mobile gets vertical
   equivalents of the same story beats.
3. Nothing animates the LCP element. The hero headline is painted, not
   revealed.
4. Text never depends on JS to become visible. Reveals animate from
   `opacity: 0` only after the element is confirmed in-view, and there is
   a no-JS fallback that renders everything visible.

### 5.2 Per-page narrative spine

Each page has a one-line thesis and a signature moment. Everything else on
that page stays quiet so the signature lands.

| Page | Thesis | Signature scroll moment |
|---|---|---|
| **Home** | "Seven businesses, one commitment." | The seven lines converge — as you scroll, seven separate strands draw down the viewport and braid into the Pamtech mark. |
| **Our Story** | "From three people in Owerri to seven business lines." | Video-backed timeline; the year advances as a fixed marker while milestones pass through it. |
| **Oil & Gas** | "The distance fuel travels to reach you." | A continuous pipeline path draws down the page, connecting depot → fleet → station → customer. Volume figures fill like liquid. |
| **Autoland** | "What happens between drop-off and handover." | Pinned horizontal service bay: a vehicle travels left-to-right through diagnostic, repair, paint and QC stages as you scroll. |
| **Autoparts** | "Every part accounted for." | An exploded assembly — a component separates into its parts on scroll, each labelled, then reassembles. |
| **Luxury Ride** | "The journey, not the vehicle." | A night drive. Deep parallax, headlight sweep across sections, the page darkens then arrives. Scroll *is* travel. |
| **Media** | "Two billion people reached." | A reach counter that accelerates against a live-feeling tile wall of content; a broadcast signal ripples outward from Owerri across a map of reach. |
| **Technology** | "Software you can actually touch." | Product UI that scrolls in sync — a device frame stays pinned while its screen advances through real Carcare / Learn flows. |
| **Real Estate** | "From plan to key." | Architectural wireframe resolves into a finished render as you descend; floor plans draw on in outline before filling. |
| **Impact** | "Committed service to humanity." | Video-backed counters; Foundation programme cards resolve from faces to figures. |
| **Careers** | "Build here." | Minimal. Restrained entrance reveals only. |
| **Contact** | — | None beyond map/card entrances. |

Careers and Contact are deliberately calm. After seven high-motion pages,
restraint reads as confidence, and these are the two pages where people
have a task to complete.

---

## 6. Page specifications

### 6.1 Home (`/`)

Condensed from the current single page. Its job is now routing, not
exhaustive telling.

| Section | Content | Motion |
|---|---|---|
| Hero | "Committed Service to Humanity", 10-year mark, primary CTA | Static headline; ambient background motion only |
| Proof bar | 7 business lines · 400+ team · 10+ years | Counters on first in-view, once |
| Trust | World Bank, Dangote, Imo State Govt, First Bank, GTBank, Access Bank, Masters Energy | Slow marquee, pauses on hover |
| Business lines grid | 7 cards → dedicated pages | The convergence signature (§5.2) |
| Story teaser | 3 timeline beats → `/our-story` | Horizontal scrub on desktop |
| Impact teaser | 3 headline figures → `/impact` | Counters |
| Careers / Partner | The existing two-card block | Entrance reveal |

Removed from Home: the full 7-entry timeline, the full gallery, the
product deep-dives, and the full contact block. Each now lives on its
proper page with a teaser left behind.

### 6.2 Our Story (`/our-story`)

Video background. The full timeline lives here.

Beats: 2016 Oil & Gas → 2021 Autoland → 2022 Luxury Ride → 2023 Media →
2025 Technology → 2026 Real Estate.

The Foundation entry currently sits at the end of the timeline dated 2016,
which breaks the chronology. Since the Foundation now lives on Impact, it
leaves the timeline entirely and the sequence resolves cleanly.

Structure: hero (video, headline, scroll cue) → founding narrative →
scrubbed timeline → "the journey continues" → CTA to `/impact`.

Video treatment is specified in §7.

### 6.3 Business line pages (×7)

All seven share a skeleton so the group reads as one company, while motion
and imagery make each feel like its own business.

```
1. Hero              — line name, positioning line, one hero image/loop
2. What we do        — the existing one-liner, expanded
3. Signature sequence — the scroll moment from §5.2  ← the page's identity
4. Services          — the 4 key services already written for each line
5. Proof             — figures, facilities, or named clients for that line
6. Gallery           — line-specific imagery
7. CTA               — line-appropriate action
8. Cross-links       — 2–3 sibling business lines
```

Section 3 is where each page diverges completely. Sections 1, 2, 4, 6, 7
and 8 are shared components with per-line content and palette accent.

Per-line specifics carried from existing content:

| Line | Services (existing) | Proof available | CTA |
|---|---|---|---|
| Oil & Gas | Fuel Distribution, Fleet Management, Bulk Supply, Energy Consulting | Biggest marketer in Imo State | Request bulk supply |
| Autoland | Vehicle Sales, Maintenance & Repair, Parts & Accessories, Fleet Services | 2 garages, 150+ employees, S-S/S-E coverage | Book a service |
| Autoparts | Genuine Parts, Accessories, Wholesale Supply, Technical Support | Biggest spare part plazas in 2 regions | Find a part |
| Luxury Ride | Executive Transport, Event Services, Airport Transfers, Corporate Packages | 30+ SUVs, 2+ coaster buses, biggest in South-East | Reserve a vehicle |
| Media | Broadcasting, Content Production, Digital Media, Advertising Solutions | 2B+ reached, 2.5M+ followers, 15+ in-house influencers | Work with us |
| Technology | Software Development, Cloud Solutions, IT Consulting, Digital Infrastructure | Carcare App, Carcare Garage, Learn With Pamtech, Petrol Padi | Request a demo |
| Real Estate | Property Development, Sales & Leasing, Property Management, Investment Advisory | 08 City Garden, Wealth Campus, 150+ smart homes | Book an inspection |

The Technology page absorbs the product showcase currently on the
homepage. Note that Petrol Padi appears in the timeline but has no product
card — it needs one, or it should be dropped (§11).

### 6.4 Impact (`/impact`)

Video background. Two halves under one roof.

```
1. Hero (video)          — "Committed Service to Humanity"
2. Impact by the numbers — the group counters
3. Pamtech Foundation    — #foundation anchor
   - Mission
   - Programmes: DAD4Adolescents, business grants & empowerment
   - 1000+ beneficiaries
   - Faces / field imagery
4. Get involved          — partner or support CTA
```

The current counters render as `0+` in source because the values live in
JS. Real figures are required (§11).

Editorial note: the numbers should follow the Foundation section, not
precede it, if the emphasis is human rather than corporate. Flagging as a
choice, not a decision — it depends on whether Impact is primarily
investor-facing or community-facing.

### 6.5 Careers (`/careers`)

Per your direction, this mirrors the existing "Join Our Journey" block —
no job listings, no ATS, no roles that need maintaining.

```
1. Hero            — "Be part of a team that's shaping industries"
2. Why Pamtech     — 3–4 culture points
3. Build Your Career  — general application
4. Partner With Us    — supplier / client / collaborator
5. Life at Pamtech    — imagery
```

Both cards currently point nowhere. "View Open Positions" needs a real
destination — with no listings, it should become "Send us your CV" opening
a general application form (name, email, phone, business line of interest,
CV upload, message), or a `mailto:` if you'd rather avoid file handling.
Decision needed (§11).

Because there are no listings, this page never needs editing. That is why
hardcoded content works cleanly here.

### 6.6 Contact (`/contact`)

Standard, functional, low-motion.

```
1. Hero              — "Get In Touch"
2. Contact form      — name, email, phone, subject, business line, message
3. Office cards      — Owerri (HQ) and Port Harcourt, each with map
4. Hours             — Mon–Sat, 8:00 AM – 6:00 PM
5. Social links      — real URLs, replacing the current empty hrefs
```

Two data issues to fix here (§11): the on-site email is `info@pamtech.com`
while your Facebook page lists `info@pamtechgroup.com`; and the Port
Harcourt street is spelled "Rumuodara" in the contact section but
"Rumuodomaya" in the footer.

Form handling: a serverless route with spam protection (honeypot plus
rate limiting — not a CAPTCHA, which adds friction and a third-party
dependency). Submissions go to a named inbox and the user gets a
confirmation state, not a page reload.

---

## 7. Video specification

No footage exists yet, so the build cannot depend on it.

### 7.1 Build approach

Our Story and Impact ship with a **designed fallback that stands on its
own**: a slow Ken Burns drift across high-quality stills behind a gradient
scrim, with the same typography, timing and scroll behaviour the video
version will use. It reads as an intentional treatment, not as a gap.

The video layer is a swap-in: drop the encoded files into place, flip a
flag in the page config, and the same component plays video instead of
stills. No rebuild.

### 7.2 Playback rules

| Condition | Behaviour |
|---|---|
| Desktop, fast connection | Video plays, muted, looped, autoplay |
| Viewport < 768px | Poster image only — never video |
| `navigator.connection.saveData` or `effectiveType` 2g/3g | Poster image only |
| `prefers-reduced-motion: reduce` | Poster image only |
| Video fails to load | Poster image, silently |

Video is always muted, always looped, never has audio, and never blocks
render — the poster is the LCP element and the video fades in over it.

### 7.3 Encoding

- Two sources: AV1/WebM (primary) and H.264/MP4 (fallback)
- 1920×1080, 24–30fps, target under 4MB for a 15–20s loop
- No text or faces at loop seams; the loop point must be invisible
- Poster: WebP, same first frame, under 150KB

### 7.4 Shot list to commission

**Our Story** — 15–20s, warm, human, ascending:
1. Owerri exterior, early morning, wide establishing
2. Hands at work across three different business lines (fuel nozzle,
   torque wrench, keyboard) — matched framing, cut on action
3. A team room, real people, not posed
4. Slow push toward the Pamtech signage

**Impact** — 15–20s, human-first, no corporate b-roll:
1. Foundation programme in progress — beneficiaries, faces, not logos
2. A classroom or training session, mid-moment
3. A handover — grant, certificate, keys
4. A wide of a community space

Shoot in log or flat profile, no in-camera text or graphics, and hold each
setup for at least 8 seconds so the editor has room to find the loop.

---

## 8. Technical specification

| Concern | Decision |
|---|---|
| Framework | Next.js (App Router) — continuing the existing stack |
| Language | TypeScript |
| Rendering | Static generation for all pages; no runtime data fetching |
| Content | Typed TS modules, one per page, colocated with the route |
| Styling | Tailwind with brand tokens defined in config |
| Motion | Lenis + GSAP ScrollTrigger (scrubbed) + Framer Motion (entrances) |
| Images | `next/image`, AVIF/WebP, explicit dimensions, `priority` on LCP only |
| Forms | Serverless route, honeypot + rate limit |
| Analytics | GA4 with per-page and CTA events |
| Hosting | Vercel (existing) |

### 8.1 Content model

Because there is no CMS, content structure carries the discipline instead.
Each business line is one typed object, so all seven pages are guaranteed
to have the same fields and nothing silently goes missing:

```ts
type BusinessLine = {
  slug: string;
  name: string;
  positioning: string;      // hero line
  description: string;      // "what we do"
  services: Service[];      // exactly 4
  proof: ProofPoint[];
  gallery: ImageRef[];
  cta: { label: string; href: string };
  accent: string;           // per-line accent token
  siblings: string[];       // cross-link slugs
};
```

Editing content is then a single-file change with type checking, which is
about as safe as hardcoded content gets.

### 8.2 Performance budgets

Enforced in CI; a build that breaks these fails.

| Metric | Budget |
|---|---|
| LCP (mobile, 4G) | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| JS shipped per route | < 200KB gzipped |
| Total page weight (mobile, no video) | < 1.2MB |
| Lighthouse Performance (mobile) | ≥ 90 |

GSAP and Lenis load dynamically and only on routes that use them. The
Careers and Contact pages ship no scroll library at all.

### 8.3 Responsive breakpoints

| Range | Behaviour |
|---|---|
| < 640px | Single column, vertical story beats, no pins, no video |
| 640–1023px | Two column where sensible, still no pinned horizontals |
| 1024–1439px | Full motion system active |
| ≥ 1440px | Max content width 1440px, gutters scale |

Mobile is designed first for each page, then the desktop motion layer is
added on top — not the reverse. A pinned horizontal sequence that has no
thought-through mobile equivalent doesn't ship.

### 8.4 Accessibility

Target WCAG 2.1 AA.

- Visible keyboard focus on every interactive element
- Full keyboard traversal of the header dropdown
- 4.5:1 text contrast, including text over video and imagery — scrims are
  sized to guarantee it, not eyeballed
- Alt text on all meaningful imagery
- Skip-to-content link
- `prefers-reduced-motion` honoured everywhere
- Video is decorative, muted, and marked `aria-hidden`

### 8.5 SEO

- Unique title and meta description per page
- Organization schema on Home; LocalBusiness on Contact for both offices;
  BreadcrumbList on business line pages
- OG image per page
- XML sitemap, robots.txt
- Canonical URLs
- All redirects in §4.3 as 301s

---

## 9. Design direction

Brand identity is preserved. The exact tokens — hex values, type stack,
logo clear-space — will be extracted from the current live build during
implementation rather than guessed at here, so nothing drifts.

What the redesign adds on top of the existing identity:

**Per-line accents.** Each business line gets one accent drawn from the
group palette, applied to that line's page and to its item in the header
dropdown. This lets seven pages feel individual while staying inside the
brand. The group palette itself is untouched on Home, Our Story, Impact,
Careers and Contact.

**Type hierarchy carries more weight.** Business line heroes need a larger
display scale than the current site uses, because each page now has to
establish itself in isolation rather than borrowing context from the
sections above it.

**Restraint everywhere except the signature.** Each page spends its
boldness in one place (§5.2). Surrounding sections stay quiet. Seven pages
each shouting in a different direction would read as seven agencies, not
one group.

---

## 10. Delivery plan

| Phase | Scope |
|---|---|
| 1. Foundation | Routing, layout shell, header/footer, tokens extracted, content model, redirects |
| 2. Core pages | Home, Careers, Contact — the low-motion, high-utility set |
| 3. Story pages | Our Story and Impact with fallback treatment; video-ready |
| 4. Business lines | Seven pages: shared skeleton first, then signature sequences one at a time |
| 5. Polish | Performance budgets, accessibility audit, reduced-motion pass, cross-browser |
| 6. Video | Drop in footage once shot; flip flags |

Phase 6 runs independently and does not block launch.

---

## 11. Open items

Blocking, needed before or during build:

1. **Impact figures.** Customers served, vehicles maintained, litres
   delivered, lives impacted. Current site renders `0+` in source.
2. **Careers CTA destination.** Form with CV upload, or `mailto:`?
3. **Correct email.** `info@pamtech.com` or `info@pamtechgroup.com`?
4. **Port Harcourt address.** "Rumuodara" or "Rumuodomaya"?
5. **Social URLs.** Facebook, Instagram, LinkedIn, X, TikTok — all
   currently empty hrefs.
6. **Petrol Padi.** Give it a product card on the Technology page, or drop
   it from the timeline?

Non-blocking, can be decided in review:

7. Do any business lines have their own existing websites or sub-brands
   that should be linked out to rather than absorbed?
8. Per-line photography — is there a usable library, or do the business
   line pages share the current gallery?
9. Impact page ordering: counters before or after the Foundation section?
10. Legal pages — existing copy to paste, or drafted fresh?

---

## 12. Out of scope for v1

News & Updates section · Blog · Investor relations portal · Customer
login · Online booking · Multi-language · Team/leadership page

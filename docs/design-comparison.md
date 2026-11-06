# Design alternatives – comparison summary

All branches share the same content (`src/data/website-content.js`), navigation, shared components and test harness. Only the design layer differs. Switch with `git switch <branch> && npm install && npm run dev`.

## Phase 1 – three bold industrial directions (home + products)

| | A · Industrial Heritage | B · Engineering Precision | C · Premium Industrial Modern |
|---|---|---|---|
| Branch | `design/01-industrial-heritage` | `design/02-engineering-precision` | `design/03-premium-industrial` |
| Pages | Home, Products (others are "planned" pages) | same | same |
| Feel | Strength, durability, engineering | Precision, technical knowledge | Innovation, scale, confidence |
| Palette | Charcoal · sand · steel · safety orange | White · grey · navy · blue | Graphite · navy · brass · warm white |
| Type | Barlow Condensed + Barlow | IBM Plex Sans + Mono | Bricolage Grotesque + Manrope |
| Motion | Hover only | Hover only | One CSS hero reveal + hover |

## Phase 2 – reference-guided themes (every page, reference-level animation)

| | 04 · Editorial Warm | 05 · Corporate Bento |
|---|---|---|
| Branch | `design/04-intrio-editorial` | `design/05-qleviq-corporate` |
| Reference | Intrio (interior-design template) | Qleviq (IT-consulting template) |
| Pages | Home, Products, 3 product details, About, Licenses, Gallery, Downloads, News, Article, Contact | same |
| Feel | Editorial, photography-led, warm | Clean corporate, rounded bento panels |
| Palette | Cream · espresso · water blue · bronze | White · navy · sky · mint · orange |
| Type | Urbanist (uppercase) + Nunito Sans | Plus Jakarta Sans + DM Sans |
| Hero | Full-width photo, two-line split headline, parallax | Navy panel + rounded photo + two counter cards |
| Products | Image-overlay carousel; editorial rows with tabbed specs | Card slider in sky panel; panelled rows with accordion specs |
| Motion | Hero entrance, reveals/staggers, counters, marquee, parallax, hover | Hero entrance, reveals/staggers, counters, marquee, hover |
| framer-motion loaded | Yes | Yes |

The Antra reference was skipped on the client's instruction (its preview is behind a bot check).

## Test results (all on production builds)

| Branch | Routes tested | Playwright | axe WCAG 2.2 AA serious/critical | Overflow | Lighthouse home mobile / desktop | Lighthouse products mobile / desktop |
|---|---|---|---|---|---|---|
| A | 2 | 31/31 | 0 | none | 90 / 80 (a11y 100) | 92 / 81 (a11y 100) |
| B | 2 | 31/31 | 0 | none | 99 / 80 (a11y 100) | 97 / 91 (a11y 100) |
| C | 2 | 31/31 | 0 | none | 90 / 85 (a11y 100) | 96 / 96 (a11y 100) |
| 04 | 12 | 73/73 | 0 | none | 83 / 77 (a11y 100) | 86 / 78 (a11y 100) |
| 05 | 12 | 73/73 | 0 | none | 86 / 74 (a11y 100) | 81 / 66 (a11y 100) |

Performance scores below 90 are caused by photographic LCP elements under Lighthouse's simulated slow-4G throttling (≈ 1 s unthrottled) and, on 04/05, the framer-motion bundle and full specification accordions on the products overview; CLS is ≤ 0.005 everywhere and best-practices/SEO are 100. Details per branch in `docs/test-report.md` and `docs/lighthouse/<design>-summary.md`.

## Blockers to resolve before launch (any design)

1. **WhatsApp business number** – `NEXT_PUBLIC_WHATSAPP_NUMBER` (BLOCKER-1).
2. **Vector / high-resolution logo** (BLOCKER-2).
3. **Higher-resolution photography** for heroes and galleries (BLOCKER-3).
4. **Client verification list** in `docs/extraction-report.md` § 6 (expired certificate scans, conflicting liner/bolt specs, 1993 vs 2007 establishment date, flat-panel capacity data, dated copy).

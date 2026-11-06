# Design alternatives – comparison summary

All three branches share the same content (`src/data/website-content.js`), navigation, shared components and test harness. Only the design layer differs. Switch with `git switch <branch> && npm install && npm run dev`.

| | A · Industrial Heritage | B · Engineering Precision | C · Premium Industrial Modern |
|---|---|---|---|
| Branch | `design/01-industrial-heritage` | `design/02-engineering-precision` | `design/03-premium-industrial` |
| Feel | Strength, durability, engineering | Precision, technical knowledge | Innovation, scale, confidence |
| Palette | Charcoal #1B1D1F · sand #EFE9DF · steel #7F8A93 · safety orange #F26A1B | White · grey #F3F5F7 · navy #0B2545 · blue #1D63D8 | Graphite #141618 · navy #0E1A2B · brass #C9A24B · warm white #F7F4EE |
| Type | Barlow Condensed (uppercase) + Barlow | IBM Plex Sans + IBM Plex Mono | Bricolage Grotesque (oversized) + Manrope |
| Hero | Full-bleed two-tank photo, condensed 3-line headline, 3 facts | Split blueprint grid: headline + 4 facts, tank photo with spec callouts | Oversized headline overlapping an edge-to-edge branded tank photo, 4 facts |
| Product presentation (home) | Two family plates + three product plates with spec tags | Three-column comparison table with photos | Navy product strip (snap-scroll on mobile) |
| Applications | Icon grid on charcoal | Application × product matrix | Oversized typographic list |
| Products page | Full-width bands per product, accordion specs, sticky category rail | Datasheet layout: sticky meta column + spec blocks with source tags, interactive capacity explorer | Alternating dark/light chapters with gallery + sticky spec panel, capacity chart on paper |
| Motion | Hover only | Hover only | One CSS hero reveal + hover |
| framer-motion loaded | No | No | No |

## Test results (all on production builds)

| Branch | Playwright | axe WCAG 2.2 AA (serious/critical) | Overflow 360–1920 | Lighthouse home mobile / desktop | Lighthouse products mobile / desktop |
|---|---|---|---|---|---|
| A | 31/31 | 0 | none | 90 / 80 (a11y 100) | 92 / 81 (a11y 100) |
| B | 31/31 | 0 | none | 99 / 80 (a11y 100) | 97 / 91 (a11y 100) |
| C | 31/31 | 0 | none | 90 / 85 (a11y 100) | 96 / 96 (a11y 100) |

Performance scores below 90 are all caused by the hero photograph's LCP under Lighthouse's simulated slow-4G throttling (2.5–3.7 s); CLS is 0 everywhere and best-practices/SEO are 100. Details per branch in `docs/test-report.md` and `docs/lighthouse/<design>-summary.md`.

## Blockers to resolve before launch (any design)

1. **WhatsApp business number** – `NEXT_PUBLIC_WHATSAPP_NUMBER` (BLOCKER-1).
2. **Vector / high-resolution logo** (BLOCKER-2).
3. **Higher-resolution photography** for heroes and galleries (BLOCKER-3).
4. **Client verification list** in `docs/extraction-report.md` § 6 (expired certificate scans, conflicting liner/bolt specs, 1993 vs 2007 establishment date, flat-panel capacity data, dated copy).

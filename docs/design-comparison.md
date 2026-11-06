# Design alternatives – comparison summary

Two designs are maintained. Both share the same content (`src/data/website-content.js`), navigation, shared components and test harness; only the design layer differs. Switch with `git switch <branch> && npm install && npm run dev`.

| | Design 1 · Editorial Warm | Design 2 · Corporate Bento |
|---|---|---|
| Branch | `design-1` | `design-2` |
| Reference | Intrio (interior-design template) | Qleviq (IT-consulting template) |
| Pages | Home, Products, 3 product details, About, Licenses, Gallery, Downloads, News, Article, Contact | same |
| Feel | Editorial, photography-led, warm | Clean corporate, rounded bento panels |
| Palette | Cream · espresso · water blue · bronze | White · navy · sky · mint · orange |
| Type | Urbanist (uppercase) + Nunito Sans | Plus Jakarta Sans + DM Sans |
| Hero | Full-width photo, two-line split headline, parallax | Navy panel + rounded photo + two counter cards |
| Products | Image-overlay carousel; editorial rows with tabbed specs | Card slider in sky panel; panelled rows with accordion specs |
| Motion | Hero entrance, reveals/staggers, counters, marquee, parallax, hover | Hero entrance, reveals/staggers, counters, marquee, hover |

## Test results (production builds)

| Branch | Routes tested | Playwright | axe WCAG 2.2 AA serious/critical | Overflow 360–1920 | Lighthouse home mobile / desktop | Lighthouse products mobile / desktop |
|---|---|---|---|---|---|---|
| Design 1 | 12 | 73/73 | 0 | none | 83 / 77 (a11y 100) | 86 / 78 (a11y 100) |
| Design 2 | 12 | 73/73 | 0 | none | 86 / 74 (a11y 100) | 81 / 66 (a11y 100) |

Performance below 90 comes from photographic LCP elements under Lighthouse's simulated slow-4G throttling (≈ 1 s unthrottled), the framer-motion bundle, and the full specification accordions on the products overview. CLS is ≤ 0.005 everywhere and best-practices/SEO are 100. Details per branch in `docs/test-report.md` and `docs/lighthouse/<design>-summary.md`.

## Blockers to resolve before launch (either design)

1. **WhatsApp business number** – `NEXT_PUBLIC_WHATSAPP_NUMBER` (BLOCKER-1).
2. **Vector / high-resolution logo** (BLOCKER-2).
3. **Higher-resolution photography** for heroes and galleries (BLOCKER-3).
4. **Client verification list** in `docs/extraction-report.md` § 6 (expired certificate scans, conflicting liner/bolt specs, 1993 vs 2007 establishment date, flat-panel capacity data, dated copy).

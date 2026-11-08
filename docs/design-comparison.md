# Chosen design – summary

Design 1 · Editorial Warm (`design-1`) is the chosen design. Design 2 · Corporate Bento was removed on 2026-11-08 at the client's request after both were compared; its branch was deleted (a backup bundle was kept outside the repository).

| | Design 1 · Editorial Warm |
|---|---|
| Branch | `design-1` |
| Pages | Home, Products, 3 product details, About, Licenses, Gallery, Downloads, News, Article, Contact |
| Feel | Editorial, photography-led, warm |
| Palette | Cream · espresso · water blue · bronze |
| Type | Urbanist (uppercase) + Nunito Sans |
| Hero | Full-width photo, two-line split headline, parallax |
| Products | Image-overlay carousel; editorial rows with tabbed specs |
| Motion | Hero entrance, reveals/staggers, counters, marquee, parallax, hover |

## Test results (production build)

| Routes tested | Playwright | axe WCAG 2.2 AA serious/critical | Overflow 360–1920 | Lighthouse home mobile / desktop | Lighthouse products mobile / desktop |
|---|---|---|---|---|---|
| 12 | 73/73 | 0 | none | 83 / 77 (a11y 100) | 86 / 78 (a11y 100) |

Performance below 90 comes from photographic LCP elements under Lighthouse's simulated slow-4G throttling (≈ 1 s unthrottled), the framer-motion bundle, and the full specification tabs on the products overview. CLS is ≤ 0.005 and best-practices/SEO are 100. Details in `docs/test-report.md` and `docs/lighthouse/design-1-summary.md` on `design-1`.

## Blockers to resolve before launch

1. **WhatsApp business number** – `NEXT_PUBLIC_WHATSAPP_NUMBER` (BLOCKER-1).
2. **Vector / high-resolution logo** (BLOCKER-2).
3. **Higher-resolution photography** for heroes and galleries (BLOCKER-3).
4. **Client verification list** in `docs/extraction-report.md` § 6 (expired certificate scans, conflicting liner/bolt specs, 1993 vs 2007 establishment date, flat-panel capacity data, dated copy).

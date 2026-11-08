# Test report – Design 1 · Editorial Warm

Branch `design-1` · updated 2026-11-08 (client-feedback refinement) · production build (`next build` + `next start`) · Playwright 1.65 / Chromium · axe-core 4.14 · Lighthouse 13.6. **All twelve routes are implemented and tested on this branch.**

## Playwright (82 tests, all passing)

| Suite | What it checks | Result |
|---|---|---|
| `smoke.spec.ts` | Home + products: 200, one `h1`, landmarks, zero console errors / failed requests, floating actions wired (≥ 44 px), every image has `alt` and loads; header lists every page + Request a Quote; mobile menu opens/expands/closes with Esc; enquiry form validation with `role="alert"` + focus; product links resolve to detail pages with one `h1`; every secondary route (3 product pages, about, licenses, gallery, downloads, news, article, contact) renders with one `h1` and no errors; gallery lightbox opens, arrows navigate, Esc closes | ✅ 14/14 |
| `links.spec.ts` | Every internal link and document on all 12 routes resolves; no bare `#` links; every CTA anchor exists | ✅ 2/2 |
| `a11y.spec.ts` | axe WCAG 2.0/2.1/2.2 A+AA + best-practice on all 12 routes at 390 and 1440 px: zero serious/critical; skip link; dropdown opens with its disclosure button and closes after a keyboard choice | ✅ 26/26 |
| `experience.spec.ts` | Preloader shows once per session and is skipped under reduced motion; 404 returns status 404, counts down, "Stay on this page" cancels, otherwise redirects home; desktop dropdown and mobile menu close after a choice; product strip auto-scrolls and stops when paused; floating actions round, icon-only and labelled; no source/meta wording on any of the 12 routes | ✅ 9/9 |
| `screenshots.spec.ts` | No horizontal overflow: home + products at 6 viewports, 10 secondary routes at 390 + 1440; full-page screenshots; interactive states (mobile menu, dropdown, form errors, lightbox) | ✅ 31/31 |

Issues found and fixed during the run:
- `aria-prohibited-attr`: the animated counter used `aria-label` on a plain span → replaced with a visually-hidden final value.
- Colour contrast: bronze eyebrows on espresso (4.2:1 → `--bronze` lightened to 5.3:1), footer eyebrows at 50 % cream (4.4:1 → 65 %), spec-table notes with `opacity-70` (3.2:1 → solid taupe text).
- `label-content-name-mismatch`: gallery tiles had an `aria-label` that omitted the visible caption → accessible name now comes from the image alt + caption.
- 4 px horizontal overflow at 390 px: carousel negative margins exceeded the section gutters → all theme gutters aligned to the shared values.
- Counter animation froze at intermediate values because its effect re-ran on its own state → tracked with a ref.

## Screenshots

`screenshots/design-1/`: `home-*`, `products-*` (six viewports), `product-corrugated|flat-panel|flexible-*`, `about-*`, `licenses-*`, `gallery-*`, `downloads-*`, `news-*`, `news-article-*`, `contact-*` (mobile + desktop), and `state-mobile-menu-open`, `state-desktop-dropdown-open`, `state-form-validation`, `state-gallery-lightbox`.

## Lighthouse (simulated throttling, localhost)

| Page | Form | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home | mobile | 84 | 100 | 100 | 100 | 4.0 s | 0 | 170 ms |
| Home | desktop | 70 | 100 | 100 | 100 | 3.1 s | 0 | 160 ms |
| Products | mobile | 94 | 100 | 100 | 100 | 2.4 s | 0 | 210 ms |
| Products | desktop | 74 | 100 | 100 | 100 | 2.8 s | 0 | 140 ms |

Before the 2026-11-08 refinement the same pages scored 83 / 77 / 86 / 78. The first run after adding the preloader scored home desktop 59 (Speed Index 3.6 s): the preloader waited for every image. It now leaves once fonts are ready and 0.9 s have passed, and the figure cards no longer use `backdrop-filter` over the moving parallax photo.

Full table and failing audits: `docs/lighthouse/design-1-summary.md`.

**Analysis.** CLS is 0 and accessibility 100 everywhere. Performance is held back by three things: the once-per-session preloader covers the first ≈ 1 s on a cold load (Speed Index ≈ 3 s; returning visitors in the session never see it), every page opens with a full-width photographic banner (the LCP element, 3.7–4.1 s under simulated slow 4G, ≈ 1 s unthrottled), and the design loads framer-motion and Lenis for the full animations (~35 KB extra gzipped JavaScript; total JS ≈ 275 KB). INP is a field metric; TBT ≤ 210 ms is its lab proxy. Options if the client prefers this direction: an AVIF/lower-quality hero, a smaller art-directed mobile crop, and lazy-loading the parallax/marquee code.

## Manual checks (Playwright MCP, Chromium)

- Hero: two headline lines, intro and CTAs enter in sequence; parallax shifts the photo on scroll.
- Counters animate once to 33+, 3,300, 21 and 10; marquee pauses on hover and with its button; reveal/stagger fire once per block.
- Products page: family tiles jump to their sections; tabs switch specification/features/accessories/applications/benefits/capacity; accordions expose the FLT/OLT variants.
- Product detail: facts panel, pre-filled enquiry heading; "Request a quote" on products pre-selects the product on the contact page via `?product=`.
- Gallery: filters, lightbox with arrow keys; licences open full size in the same lightbox.
- `prefers-reduced-motion`: counters show final values, no entrance/reveal/parallax/marquee motion.

## Real-browser sweep (2026-11-08, `next dev`)

- Every page at 1440 and 390 px: 543 links resolve (internal 200, in-page anchors present, documents present, mailto/tel/WhatsApp well-formed).
- Every visible button clicked on a fresh load changes the page with no errors: 108 at desktop, 95 at mobile. The only non-responder is the Next.js dev-tools badge (development only).
- Header hides while scrolling down and returns on scroll up; Lenis smooth scrolling active; dropdowns close on selection, route change and Escape.

# Changelog

Newest first. Every entry says what changed and how it was checked.

## 2026-11-08 – Hero scroll cue removed

**Changed**
- Removed the "Scroll" mouse icon from the bottom of the home hero (client request) and its `scroll-cue` keyframes.

**Checked**
- Home hero at 1440 and 390 px: no scroll icon, headline, intro, buttons and quick facts unchanged; no console errors. `npm run lint` and typecheck pass.

## 2026-11-08 – Product strip auto-scrolls for every visitor

**Changed**
- At the client's request the home product strip now auto-scrolls for every visitor, including those whose browser asks for reduced motion (before, it started paused for them). The visible pause/play button, pausing on hover and keyboard focus, and the 6 s hold-off after manual scrolling are unchanged, so it still meets WCAG 2.2.2. All other motion still rests under reduced motion.
- New test in `experience.spec.ts`: the strip advances with `reducedMotion: "reduce"`.

**Checked**
- Probe in Chromium on `next dev` with `reducedMotion: "reduce"`: no console or page errors on load, the toggle reads "Pause automatic scrolling", and the strip advances every 3.5 s, looping back to the start.
- `npm run lint`, typecheck and `npm run build` pass; `experience` + `smoke` specs on the production build: 22/22, including the new reduced-motion test.

## 2026-11-08 – Product strip timing and reduced-motion hydration fixed

**Changed**
- Product strip: only real visitor input (pointer, touch, horizontal wheel, arrow buttons) holds auto-scroll back, for 6 s. Before, the strip's own smooth scrolling outlasted a 700 ms guard and was mistaken for a manual swipe, so it advanced only every 7–10 s. A mouse click on its buttons no longer pauses it indefinitely; keyboard focus still pauses it.
- New `usePrefersReducedMotion` hook (`src/lib/use-prefers-reduced-motion.ts`, `useSyncExternalStore` with a `false` server snapshot) replaces framer-motion's `useReducedMotion` in the product strip, `Parallax` and `Counter`. For visitors who prefer reduced motion the first client render differed from the server HTML (pause-button label, parallax style) and React reported "Hydration failed".

**Checked**
- Probe in Chromium on `next dev`: the strip advances every 3.5 s and resumes 6 s after a click on Next; with `reducedMotion: reduce` there are no console or page errors on load and the strip starts paused.
- `npm run lint`, typecheck and `npm run build` pass; `experience`, `smoke` and `a11y` specs on the production build: 47/47.

## 2026-11-08 – Design 1 refinement from client feedback

**Changed**
- Removed visitor-facing source and meta wording: the footer design label, "From the PWT company brochure", the About-page source line, the Contact-page WhatsApp/hours note, "as published by…" phrasing on Downloads and Licenses, the product-page source line, spec-table "(datasheet …)" tags and verification notes. These notes remain in `website-content.js` as internal records; the capacity-chart verification sentence moved into the product's `verificationNotes`.
- Navigation: desktop dropdowns now use explicit state (hover, chevron button, focus) and close on selection, route change, Escape and outside click; the mobile menu also collapses its submenu after a choice.
- Floating actions: round, icon-only Contact and WhatsApp buttons with accessible names (56 px stacked on desktop, 48 px side by side on phones so they cover less content).
- Motion: Lenis smooth scrolling (paused while dialogs/menus are open, off for reduced motion), scroll-progress bar, word-by-word headings, mask image reveals, more parallax, hero photo zoom-settle, header that hides on scroll down and returns on scroll up.
- Home: shorter copy throughout; hero quick facts; auto-scrolling product strip with pause/play, previous/next and progress; "Built to last" band rebuilt as a short statement plus three figures (1993, 10-year warranty, under 6 days to install 500 m³); applications as four short icon cards; gallery bento sized to the source photos.
- New 404 page: water moving inside the numerals, 3-second countdown to home with a "Stay on this page" button (WCAG 2.2.1).
- New brand preloader: logo over a tank filling with water, once per browser session, skipped for reduced motion and without JavaScript.
- Type and theme: Urbanist headings at weight 600 with a shared scale (`heading-1/2/3`), slightly lighter cream/paper tokens, refined buttons with press feedback.
- Smaller client bundle: the preloader and mobile menu receive logo/contact as props instead of importing the content module.
- Tests: new `tests/experience.spec.ts` (preloader, 404, menus closing, carousel pause, icon-only floating buttons, no meta wording); the desktop-dropdown keyboard test follows the new disclosure button; specs use a fixture that marks the preloader as seen.

**Checked**
- `npm run lint` and `npm run typecheck` exit 0; `npm run build` succeeds (19 routes).
- Real-browser sweep of every page at 1440 and 390 px: 543 links resolve (internal 200, anchors present, downloads present, mailto/tel/WhatsApp well-formed); every visible button clicked on a fresh load changes the page (108 at desktop, 95 at mobile) with no page errors – the only non-responder is the Next.js dev-tools badge, which exists in dev mode only.
- Behaviour checks: dropdown closes after a mouse or keyboard choice and on Escape; mobile menu closes after a choice; product strip advances on its own and stops when paused; Lenis active; header hides and returns; preloader shows once per session; 404 "Stay" cancels and the redirect fires otherwise.
- Rendered-text scan of all 12 routes plus a scan of the tab-rendered product fields: no source/meta wording.
- Full Playwright suite on the production build: 82/82 passed (axe WCAG 2.2 AA zero serious/critical on 12 routes × 2 viewports, no overflow at 360–1920 px, new experience spec). An earlier run was interrupted by low memory; the re-run is clean. Screenshots refreshed in `screenshots/design-1/`.
- Lighthouse: home 84 mobile / 70 desktop, products 94 / 74; accessibility, best practices and SEO 100 on all four. The preloader now leaves once fonts are ready and 0.9 s have passed instead of waiting for every image (first run: home desktop 59), and the figure cards dropped `backdrop-filter`.

## 2026-11-08 – Dev-server warnings cleared

**Changed**
- `next.config.ts` allows image qualities 70 and 72 (`images.qualities: [70, 72, 75]`). The page and home heroes request them, and Next.js 16 was coercing both to 75 with a warning on every banner image.
- `<body>` has `suppressHydrationWarning`, so attributes injected by browser extensions such as Grammarly (`data-gr-ext-installed`, `data-new-gr-c-s-check-loaded`) no longer raise a hydration-mismatch warning. It applies to that element's own attributes only.

**Checked**
- Dev server restarted. Browser sweep of all 12 routes at 1440 and 390 wide plus click-through navigation: no console errors. Server log after 45 requests: no warnings or errors. `/_next/image?…&q=70` returns 200. `npm run lint` and `npm run typecheck` exit 0.

## 2026-11-08 – Design 2 removed; Design 1 chosen

**Changed**
- Deleted the `design-2` branch (Design 2 – Corporate Bento) at the client's request. A backup bundle of the branch was kept outside the repository.
- README, PRD, ARCHITECTURE, TASKS and `docs/design-comparison.md` now describe Design 1 as the single chosen design.

**Checked**
- `git branch` lists only `main` and `design-1`. No tracked file outside this changelog still points at `design-2` as a live branch.

## 2026-11-08 – Dev-mode navigation error on detail pages fixed

**Changed**
- `/product/[slug]` and `/news/[slug]` export `instant = false`. In `next dev`, Next.js reported "encountered URL data during prerendering or a navigation" because both pages await `params` outside `<Suspense>`. Every real slug is prerendered by `generateStaticParams`, and keeping `params` outside Suspense keeps unknown slugs returning a real 404, so the routes are allowed to block instead of streaming a placeholder.

**Checked**
- `next dev` browser sweep of all 12 routes at 1440 and 390 wide: no console errors, no failed requests, no overflow, one h1 each. Click-through navigation to every detail page: no console errors. `/product/nope` and `/news/nope` still return 404.

## 2026-11-08 – Typecheck works on a fresh clone

**Changed**
- `npm run typecheck` now runs `next typegen` before `tsc --noEmit`. Pages use the generated `PageProps<"/route">` types, which did not exist on a fresh clone until a build had run, so typecheck failed there (exit 2).

**Checked**
- In a fresh `design-2` worktree with `.next` removed: plain `tsc --noEmit` exits 2; `next typegen && tsc --noEmit` exits 0.
- Design 2 re-verified in an isolated worktree: lint 0, build 0, `npx playwright test` 73/73, `/contact?product=flat-panel-hdg-steel` preselects "Flat Panel HDG Steel".

## 2026-11-06 – Reference-template wording removed

**Changed**
- Removed every mention of the reference templates from the README, PRD, ARCHITECTURE, TASKS, design comparison, design-system, test-report and known-issues docs, from `design-config.ts`, `globals.css` and component comments. Designs are referred to only as Design 1 – Editorial Warm and Design 2 – Corporate Bento.
- Deleted `docs/references/` (reference screenshots and their index).

**Checked**
- No tracked file outside this changelog mentions the reference templates; `npm run typecheck` and `npm run lint` clean on both design branches.

## 2026-11-06 – Branches renamed to design-1 and design-2

**Changed**
- `design/01-intrio-editorial` → `design-1` and `design/02-qleviq-corporate` → `design-2`, at the client's request (short names, no reference wording).
- Every reference to the branch names updated; `designId`, screenshot folders and Lighthouse summaries renamed to `design-1` / `design-2`.

**Checked**
- `git branch` lists `main`, `design-1`, `design-2`; no tracked file outside this changelog still uses the old names; `npm run typecheck` clean on both design branches.

## 2026-11-06 – Renumbered: Design 1 and Design 2

**Changed**
- Branch `design/04-intrio-editorial` renamed to `design/01-intrio-editorial` (Design 1 – Editorial Warm) and `design/05-qleviq-corporate` renamed to `design/02-qleviq-corporate` (Design 2 – Corporate Bento).
- Labels in docs, footer credit line, code comments and `designId` updated to match; screenshot folders and Lighthouse summaries moved to `design-01` / `design-02`.
- Note: older entries below that mention `design/01-industrial-heritage`, `design/02-engineering-precision` or `design/03-premium-industrial` refer to the first-round branches that were deleted earlier the same day.

**Checked**
- `git branch` lists `main`, `design/01-intrio-editorial`, `design/02-qleviq-corporate`; no tracked file outside this changelog still refers to the old 04/05 names; `npm run typecheck` and `npm run lint` clean.

## 2026-11-06 – Shortlist: designs 04 and 05 kept, 01–03 removed

**Changed**
- Branches `design/01-industrial-heritage`, `design/02-engineering-precision` and `design/03-premium-industrial` were deleted at the client's request; this branch and its sibling are the two remaining alternatives.
- README and `docs/design-comparison.md` synced from `main` so they describe only designs 04 and 05.

**Checked**
- `git branch` lists `main`, `design/04-intrio-editorial`, `design/05-qleviq-corporate` only; build unaffected (docs-only change).

## 2026-11-06 – Design 04: Editorial Warm, Intrio-guided (branch design/04-intrio-editorial)

**Changed**
- Reference-guided theme (Intrio): cream/espresso/water-blue tokens, Urbanist + Nunito Sans, `PageHero`, `SectionHeading`, `Cta`, image-overlay `ProductCarousel`.
- Every page implemented with the full extracted content: home, products (family tiles + editorial product rows with tabbed specifications), product detail (facts panel, tabs, gallery), about (profile, introduction, mission/vision/philosophy/values, who we are, build steps, licences), licenses (lightbox + details), gallery (filterable lightbox), downloads, news + article, contact (detail cards, Google Maps link, form with `?product=` preselect).
- Reference-level motion: hero entrance, scroll reveals and staggers, stat counters, applications marquee, parallax banners, hover zooms/lifts; all disabled under reduced motion.
- `docs/design-system.md`, `docs/test-report.md`.

**Checked**
- `npm run build` (19 static routes), `npm run lint`, `npm run typecheck` clean.
- `npx playwright test` across all 12 routes and `npm run lighthouse` – see `docs/test-report.md`; screenshots in `screenshots/design-04/`.

## 2026-11-06 – Phase 1 complete: three design branches delivered

**Changed**
- Three independent design branches cut from this baseline: `design/01-industrial-heritage` (A), `design/02-engineering-precision` (B), `design/03-premium-industrial` (C). Each carries its own tokens, fonts, header/footer, homepage, products page, `docs/design-system.md`, `docs/test-report.md`, `screenshots/design-<x>/` and Lighthouse summary.
- Shared fixes cherry-picked back to `main`: `Section` container, compact floating contact button on mobile, lazy-image test, dropdown transition (keyboard focus), Lighthouse runner that polls and exits cleanly on Windows.
- Added `docs/design-comparison.md` with the side-by-side summary and test results of all three designs.

**Checked**
- Every branch: `npm run build` ✓, `npm run lint` ✓, `npm run typecheck` ✓, `npx playwright test` 31/31 ✓ (axe WCAG 2.2 AA: zero serious/critical; no horizontal overflow at 360/390/768/1366/1440/1920), Lighthouse accessibility 100 on all pages.
- Open blockers remain BLOCKER-1 (WhatsApp number), BLOCKER-2 (vector logo), BLOCKER-3 (high-resolution photography) and the client verification list in `docs/extraction-report.md`.

## 2026-11-06 – Content extraction and shared baseline

**Changed**
- Crawled all 37 pages of pioneertanks.ae (sitemap + link following), downloaded 76 images and 5 PDFs, extracted PDF text, optimised images to WebP (`scripts/scrape-website/`).
- Added `src/types/content.ts` and the hand-curated `src/data/website-content.js` (company, navigation, 18 page records, 2 families, 3 products with specs from web + datasheets, 28-row capacity chart, 14 applications, 3 certifications, 5 downloads, news, gallery, site metadata) plus generated `src/data/website-assets.js`.
- Added `docs/extraction-report.md` and `docs/known-issues.md`.
- Shared baseline: typed selectors (`src/lib/content.ts`), constants with WhatsApp placeholder logic, FloatingActions, EnquiryForm (zod + mailto fallback), FuturePage, DesktopNav/MobileNav, SkipLink, MotionProvider, Reveal; root layout with metadata; sitemap/robots/not-found; six future routes and `/product/[slug]`.
- Baseline (undesigned) homepage and products page that render from the content file.
- Playwright config and suites: smoke, links, a11y (axe WCAG 2.2 AA), screenshots/overflow at 6 viewports; `scripts/lighthouse.mjs`.
- Build-time year/date injected via `next.config.ts` (Cache Components forbids `new Date()` during prerendering).

**Checked**
- `npm run build` – 17 static routes generated. `npm run lint` and `npm run typecheck` clean (content JS strict-checked against the types).
- `npx playwright test` – 31/31 pass after fixing WhatsApp button contrast (white on #25D366 = 1.98:1 → dark text), footer muted-text contrast, floating-actions landmark, and the contact CTA anchor on non-home pages.
- `npm run lighthouse` – baseline scores recorded in `docs/lighthouse/summary.md`.

## 2026-11-06 – Workspace scaffold and project docs

**Changed**
- Initialised git repository (`main`).
- Scaffolded Next.js 16.4.5 (App Router, TypeScript, Tailwind CSS 4, Turbopack, `src/` layout, `@/*` alias).
- Added shadcn/ui (radix-vega preset) with button, sheet, tabs, accordion, input, textarea, label.
- Added lucide-react, framer-motion, zod; dev: @playwright/test, @axe-core/playwright, playwright (Chromium installed), sharp, pdf-parse, lighthouse.
- Moved the client logo to `public/brand/logo-pioneer.png`.
- Added `scripts/scrape-website/{crawl,download-assets,extract-pdfs}.mjs`.
- Added PRD.md, ARCHITECTURE.md, TASKS.md, CHANGELOG.md, README.md.

**Checked**
- `npm install` clean; `npx playwright install chromium` succeeded.
- Crawler run against https://pioneertanks.ae/ (results in `docs/extraction-report.md`).

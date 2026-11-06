# Changelog

Newest first. Every entry says what changed and how it was checked.

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

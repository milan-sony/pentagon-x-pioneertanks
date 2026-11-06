# Changelog

Newest first. Every entry says what changed and how it was checked.

## 2026-11-06 – Phase 2: two reference-guided themes with every page

**Changed**
- `main` foundation: baseline routes for about, licenses, gallery, downloads, news, news/[slug], contact and product/[slug]; shared `Counter`, `Marquee`, `Parallax`, `Stagger`/`Entrance`, `GalleryGrid` (Radix dialog lightbox), generic `SpecTable` and `CapacityChart`; news/stats selectors; tests extended to all 12 routes; reference screenshots in `docs/references/`.
- New branches `design/04-intrio-editorial` (Intrio-guided, editorial warm) and `design/05-qleviq-corporate` (Qleviq-guided, corporate bento), each implementing every page with the full extracted content and reference-level animation (hero entrances, scroll reveals/staggers, counters, marquee, parallax on 04, hover motion), all disabled under reduced motion.
- Shared fixes cherry-picked back to `main`: counter completion + accessible name, spec-note contrast, gallery tile accessible name, enquiry form `?product=` preselect.
- `docs/design-comparison.md` now covers all five branches. The Antra-guided theme was skipped on the client's instruction.

**Checked**
- Branches 04 and 05: `npm run build` (19 static routes), lint, typecheck, `npx playwright test` 73/73 (axe WCAG 2.2 AA zero serious/critical on 12 routes × 2 viewports; no overflow at 360–1920), Lighthouse accessibility 100 on home and products; performance 66–86 documented with causes in each branch's `docs/test-report.md`.

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

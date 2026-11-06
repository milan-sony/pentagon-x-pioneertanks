# Changelog

Newest first. Every entry says what changed and how it was checked.

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

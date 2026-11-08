# Changelog

Newest first. Every entry says what changed and how it was checked.

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

## 2026-11-06 – Shortlist: keep designs 04 and 05, remove 01–03

**Changed**
- Deleted branches `design/01-industrial-heritage`, `design/02-engineering-precision` and `design/03-premium-industrial` at the client's request.
- README, PRD, ARCHITECTURE, TASKS and `docs/design-comparison.md` now describe only `design/04-intrio-editorial` and `design/05-qleviq-corporate`; both branches carry the same updated README and comparison.

**Checked**
- `git branch` lists `main`, `design/04-intrio-editorial`, `design/05-qleviq-corporate` only; no doc on `main` references the removed branches except this changelog's history.

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

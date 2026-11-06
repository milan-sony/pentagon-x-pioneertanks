# Tasks (in order)

Legend: `[x]` done · `[ ]` pending · `[~]` in progress

## Phase 0 – Workspace
- [x] git init (`main`), Next.js 16 scaffold, Tailwind 4, shadcn/ui, Playwright, deps
- [x] Project docs: PRD, README, ARCHITECTURE, TASKS, CHANGELOG
- [x] First commit (baseline on main)

## Phase 1 – Crawl & extract
- [x] `crawl.mjs` – full site crawl (sitemap + links)
- [x] `download-assets.mjs` – images + PDFs + manifest (82 assets)
- [x] `extract-pdfs.mjs` – datasheet text/tables
- [x] `optimize-images.mjs` – webp variants + contact sheet
- [x] Curate `src/data/website-content.js` + `src/types/content.ts` (strict type-checked)
- [x] `docs/extraction-report.md`

## Phase 2 – Shared baseline (main)
- [x] `navigation.js`, `constants.ts`, `lib/content.ts`
- [x] Shared components: FloatingActions, EnquiryForm, FuturePage (later removed), SkipLink, MotionProvider, Reveal, DesktopNav, MobileNav
- [x] Root layout metadata, sitemap.ts, robots.ts, not-found, future routes
- [x] Playwright config + suites (smoke, links, a11y, screenshots, overflow) + Lighthouse script
- [x] Baseline commit

## Phase 3 – Design branches (retired)
- [x] A, B, C – Industrial Heritage, Engineering Precision, Premium Industrial Modern (home + products only). Branches deleted on 2026-11-06 at the client's request.

## Phase 4 – QA per branch
- [x] Build passes, Playwright passes (31/31 per branch), screenshots, Lighthouse, test-report.md, known-issues.md

## Phase 5 – Final docs
- [x] README: branch switching, screenshots, blockers; docs/design-comparison.md
- [x] Final CHANGELOG entries on every branch

## Phase 6 – Design 1 and Design 2 (all pages)
- [x] Shared foundation on main: baseline routes for every page, Counter/Marquee/Parallax/Stagger, GalleryGrid lightbox, generic SpecTable/CapacityChart, tests across all 12 routes
- [x] Design 1 `design-1` – every page, full animation, 73/73 tests, Lighthouse a11y 100
- [x] Design 2 `design-2` – every page, full animation, 73/73 tests, Lighthouse a11y 100

## Next phase (not started)
- [x] Client shortlisted Design 1 and Design 2; first-round branches removed
- [ ] Client picks Design 1 or Design 2
- [ ] Wire the enquiry form to a backend / CRM
- [ ] Replace placeholder WhatsApp with the business number; swap in vector logo and high-res photography

## Blockers (need client input)
- BLOCKER-1 WhatsApp business number
- BLOCKER-2 Vector / high-res logo
- BLOCKER-3 High-resolution photography (largest genuine photo is 1920×650; gallery 700×550)

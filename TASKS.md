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
- [x] Shared components: FloatingActions, EnquiryForm, FuturePage, SkipLink, MotionProvider, Reveal, DesktopNav, MobileNav
- [x] Root layout metadata, sitemap.ts, robots.ts, not-found, future routes
- [x] Playwright config + suites (smoke, links, a11y, screenshots, overflow) + Lighthouse script
- [x] Baseline commit

## Phase 3 – Design branches
- [ ] A `design/01-industrial-heritage`: tokens, fonts, header/footer, home, products, design-system.md
- [ ] B `design/02-engineering-precision`: same
- [ ] C `design/03-premium-industrial`: same

## Phase 4 – QA per branch
- [ ] Build passes, Playwright passes, screenshots, Lighthouse, test-report.md, known-issues.md

## Phase 5 – Final docs
- [ ] README: branch switching, screenshots, blockers
- [ ] Final CHANGELOG entries on every branch

## Blockers (need client input)
- BLOCKER-1 WhatsApp business number
- BLOCKER-2 Vector / high-res logo

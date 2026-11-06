# Architecture

## Stack (versions pinned in package.json)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components on) | All pages are fully static – no runtime data, so no Suspense boundaries are needed |
| Language | TypeScript 5 (strict) | The content file is plain JS (`// @ts-check` + JSDoc type import) as the brief requires |
| Styling | Tailwind CSS 4 + shadcn/ui (radix-vega preset) | Design tokens are CSS variables in `src/app/globals.css`; Tailwind reads them via `@theme inline` |
| Icons | lucide-react | |
| Fonts | `next/font/google` | Self-hosted at build, zero layout shift. Fonts differ per design branch |
| Motion | framer-motion | Wrapped in `MotionConfig reducedMotion="user"`; only opacity/transform animations |
| Testing | @playwright/test, @axe-core/playwright, lighthouse | |
| Scraping | playwright (chromium), pdf-parse, sharp | `scripts/scrape-website/` |

## Data flow

```
pioneertanks.ae ──crawl.mjs──▶ scripts/scrape-website/output/pages/*.json
                 download-assets.mjs ──▶ public/images/source, public/documents + asset-manifest.json
                 extract-pdfs.mjs ──▶ output/documents/*.json (text + tables)
                 optimize-images.mjs ──▶ public/images/optimized/*.webp
                                   │
                        (hand-curated, reviewed)
                                   ▼
                      src/data/website-content.js   ◀── typed by src/types/content.ts
                                   │
                      src/lib/content.ts  (typed selectors: getProducts(), getNav(), getContact() …)
                                   │
            ┌──────────────────────┼─────────────────────┐
     src/app/page.tsx      src/app/products/page.tsx   all other routes under src/app/
     components/home/*     components/products/*
```

Rules:
- Components never hard-code site copy; they read from `website-content.js` through `src/lib/content.ts`.
- `src/data/navigation.js` is the single navigation config (header, footer, mobile).
- `src/lib/constants.ts` holds contact constants and the WhatsApp placeholder logic.
- Content sourced from PDFs carries `source: "document"` and a `documentRef`.

## Folder layout

```
public/brand, public/images/{source,optimized}, public/documents
scripts/scrape-website/{crawl,download-assets,extract-pdfs,optimize-images}.mjs + output/
src/app          routes, layout, globals.css, sitemap.ts, robots.ts, not-found.tsx
src/components   layout/ navigation/ home/ products/ contact/ shared/ ui/(shadcn)
src/data         website-content.js, navigation.js, design-config.ts (per branch)
src/lib          utils.ts, constants.ts, content.ts
src/types        content.ts
tests            Playwright suites (smoke, links, a11y, screenshots)
screenshots      design-<x>/… (per branch)
docs             extraction-report, design-system, implementation-notes, test-report, known-issues
```

## Branch model

```
main ─ baseline: scaffold + content + shared components + test harness + docs
├── design/04-intrio-editorial
└── design/05-qleviq-corporate
```

- The two design branches are cut from the same baseline commit on `main` and never merged into each other. (Branches 01–03 from the first design round were deleted on 2026-11-06 at the client's request.)
- Each branch owns: `globals.css` tokens, fonts in `layout.tsx`, `src/data/design-config.ts`, `components/{home,products,layout,navigation}`, `docs/design-system.md`, `screenshots/design-<x>/`, its CHANGELOG entries.
- Shared, design-agnostic code (content, types, constants, `FloatingActions` logic, `EnquiryForm` logic, `GalleryGrid`, `Counter`, `Marquee`, `Parallax`, `Reveal`, `SpecTable`, `CapacityChart`, tests) lives on `main` and is identical on every branch unless a branch needs a fix, in which case the fix is also cherry-picked to `main`.

## Routing

| Route | State |
|---|---|
| `/` | Implemented |
| `/products` | Implemented |
| `/product/[slug]` | Implemented (static params from the content file) |
| `/about`, `/licenses`, `/gallery`, `/downloads`, `/news`, `/contact` | Implemented |
| `/news/[slug]` | Implemented (static params from the content file) |
| `/sitemap.xml`, `/robots.txt` | Generated from the navigation config |

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-11-06 | Keep client logo as-is; palettes are free per design | Client choice. Vector logo requested (BLOCKER-2) |
| 2026-11-06 | WhatsApp via env var with share-link fallback | No number on the site; client to supply (BLOCKER-1). Button must never be decorative |
| 2026-11-06 | Forms: client validation + `mailto:` fallback | No backend in scope; honest behaviour |
| 2026-11-06 | English only | Client choice; structure stays i18n-friendly |
| 2026-11-06 | Future routes render a shared `FuturePage` (superseded: every page is now implemented) | Honest, not misleading, no redirects to home |
| 2026-11-06 | Keep only designs 04 and 05; delete branches 01–03 | Client choice after reviewing all five |
| 2026-11-06 | Lorem-ipsum news post, `/sample-page/`, WP theme docs recorded but not rendered | Not business content |
| 2026-11-06 | Fonts through `next/font/google` | Performance + CLS; still Google Fonts as required |

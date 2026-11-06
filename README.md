# Pioneer Water Tanks – website redesign (Phase 1: three design alternatives)

Modern, bold, industrial B2B website for **Pioneer Water Tanks L.L.C.** (Abu Dhabi), rebuilt from the content of https://pioneertanks.ae/. This phase delivers three visually distinct design alternatives, each with a complete **Homepage** and **Products page**, on three git branches, all driven by one centralized content file.

See also: [docs/design-comparison.md](docs/design-comparison.md) (side-by-side summary + test results) · [PRD.md](PRD.md) · [ARCHITECTURE.md](ARCHITECTURE.md) · [TASKS.md](TASKS.md) · [CHANGELOG.md](CHANGELOG.md) · [docs/extraction-report.md](docs/extraction-report.md)

## Technology stack

Next.js 16.4 (App Router, Turbopack, Cache Components) · React 19 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui · lucide-react · next/font (Google Fonts) · framer-motion · Playwright + axe-core · Lighthouse · sharp · pdf-parse

Requirements: Node.js ≥ 20 (developed on 24), npm.

## Branches – how to switch between designs

| Branch | Design | Direction |
|---|---|---|
| `main` | Baseline | Content, shared components, test harness, docs. No visual design. |
| `design/01-industrial-heritage` | **A – Industrial Heritage** | Charcoal + warm neutral + safety orange, Barlow Condensed, heavy geometry |
| `design/02-engineering-precision` | **B – Engineering Precision** | White + deep blue, IBM Plex Sans/Mono, datasheet aesthetic, comparison tables |
| `design/03-premium-industrial` | **C – Premium Industrial Modern** | Graphite/navy + brass, Bricolage Grotesque + Manrope, oversized type, asymmetric layouts |

```bash
git switch design/01-industrial-heritage   # or 02 / 03
npm install
npm run dev          # http://localhost:3000
```

Each branch is self-contained: it builds, runs and tests on its own and carries its own `docs/design-system.md` and `screenshots/design-<x>/`. The designs are never merged into one another.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript (also type-checks the JS content file) |
| `npm run test` | Playwright suites against a production build on port 3100 (run `npm run build` first) |
| `npm run test:build` | Build, then test |
| `npm run test:report` | Open the HTML test report |
| `npm run lighthouse` | Lighthouse (mobile + desktop, home + products) → `docs/lighthouse/` |
| `npm run scrape:all` | Re-crawl the live site, download assets, extract PDFs, optimise images, regenerate the asset list |

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WHATSAPP_NUMBER` once the client supplies it.

## Where things are

| What | Where |
|---|---|
| **Centralized content file** (all extracted copy, products, specs, contact, navigation, source URLs) | `src/data/website-content.js` (typed by `src/types/content.ts`) |
| Generated image asset list | `src/data/website-assets.js` |
| Navigation config | `src/data/navigation.js` |
| Design tokens per branch | `src/app/globals.css`, `src/data/design-config.ts`, `docs/design-system.md` |
| Typed content selectors | `src/lib/content.ts` |
| Contact / WhatsApp constants | `src/lib/constants.ts` |
| Pages | `src/app/page.tsx` (home), `src/app/products/page.tsx`, future routes under `src/app/*` |
| Shared components | `src/components/shared/` (FloatingActions, EnquiryForm, FuturePage, Reveal, …) |
| Design-specific components | `src/components/{layout,navigation,home,products}/` |
| Downloaded originals | `public/images/source/`, `public/documents/` |
| Optimised images | `public/images/optimized/` |
| Scraper | `scripts/scrape-website/` (outputs in `scripts/scrape-website/output/`) |
| Tests | `tests/*.spec.ts`, `playwright.config.ts` |
| Screenshots | `screenshots/design-<x>/` on each design branch |
| Reports | `docs/extraction-report.md`, `docs/test-report.md`, `docs/known-issues.md` |

## Open blockers (need client input)

1. **WhatsApp business number** – not published on the live site. Until set, the floating WhatsApp button opens WhatsApp's share link with the pre-filled message.
2. **Vector / high-resolution logo** – the supplied PNG is 404×112 px.
3. **Client verification list** – see `docs/extraction-report.md` § 6 (expired certificate scans, conflicting specs, dated copy, etc.).

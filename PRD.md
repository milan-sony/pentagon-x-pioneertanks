# PRD – Pioneer Water Tanks website redesign (Phase 1: design alternatives)

## 1. What we are building

A modern, bold, industrial B2B website for **Pioneer Water Tanks L.L.C.** (Abu Dhabi, UAE), replacing the 2018 WordPress site at https://pioneertanks.ae/.

Phase 1 delivers **three visually distinct design alternatives**, each on its own git branch, so the client can run them side by side and pick a direction. Every alternative implements the same two pages from the same content source:

1. **Homepage**
2. **Products page**

All content comes from a single, curated content file (`src/data/website-content.js`) extracted from the live site. Nothing is invented.

## 2. Why

- The current site is visually dated, uses a repetitive slider, and under-presents the company's engineering substance (bolted steel liner tanks up to 21 m diameter, flexible tanks, 10-year warranty, ISO certificate).
- The client wants a site that reads as a premium industrial engineering company, not a generic corporate template.
- A design-approval phase with real pages (not mock-ups) lets the client compare working experiences on real devices.

## 3. Audience and jobs-to-be-done

| Audience | Job |
|---|---|
| Contractors, consultants, MEP engineers | Find tank capacities, dimensions, materials; download datasheets; request a quote |
| Facility/camp operators, municipalities, industrial plants | Understand which tank family fits potable/fire/process water; see credibility (since 1993, ISO, warranty) |
| Procurement | Contact quickly by phone, email, WhatsApp |

## 4. Goals

- Three substantially different designs (layout, typography, composition), all bold and industrial.
- Clear product presentation with real specifications, downloadable datasheets and quote CTAs.
- Strong lead capture: enquiry form, floating WhatsApp, floating contact CTA, phone/email everywhere.
- WCAG 2.2 AA evaluated with axe; responsive from 360 px to 1920 px; strong Core Web Vitals.
- Fully static, fast, SEO-ready Next.js App Router build.

## 5. Non-goals (deliberately not built in this phase)

- About, News, Gallery, Downloads, Contact, Licenses and individual product **detail pages** – routes exist and render a shared "planned for phase 2" page with a link to the current live page. They are not finished pages and are not presented as such.
- Back-end form handling, CRM, email sending. Forms validate client-side and fall back to a pre-filled `mailto:`.
- CMS integration. Content lives in the JS content file.
- Arabic / RTL. English only; data and layout are kept i18n-friendly.
- Merging the three designs into one.

## 6. Anti-goals (would make the work a failure even if it "works")

- Copying the old site's layout, slider or styling.
- Fabricated statistics, projects, testimonials, certifications, contact numbers or specs.
- Decorative buttons that do nothing, or links silently redirected to the homepage.
- Three colour swaps of the same layout.
- Template-looking SaaS sections, excessive rounded cards, heavy animation.

## 7. Constraints and inputs

- Source of truth: the live site (crawled 2026-11-06) plus its 5 PDF datasheets. See `docs/extraction-report.md`.
- Logo: `public/brand/logo-pioneer.png`, 404×112 px raster (supplied by client). **BLOCKER-2: a vector or high-resolution logo is needed before launch.**
- WhatsApp: the site publishes no WhatsApp number. **BLOCKER-1: client must supply the WhatsApp business number** (`NEXT_PUBLIC_WHATSAPP_NUMBER`). Until then the button opens WhatsApp's contact-picker share link with the pre-filled message so it still functions.
- Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Lucide + next/font (Google Fonts) + Framer Motion + Playwright.

## 8. Design alternatives

| Branch | Direction | Palette | Type |
|---|---|---|---|
| `design/01-industrial-heritage` | Industrial Heritage – strength, durability | charcoal, warm neutral, steel grey, safety orange | Barlow Condensed + Barlow |
| `design/02-engineering-precision` | Engineering Precision – datasheet aesthetic | white, light grey, deep blue, accent blue | IBM Plex Sans + IBM Plex Mono |
| `design/03-premium-industrial` | Premium Industrial Modern – scale, confidence | graphite, navy, brass metallic, warm white | Bricolage Grotesque + Manrope |

Full tokens per design: `docs/design-system.md` on each branch.

## 9. Acceptance criteria

Research and content
- [ ] Every accessible internal page investigated; inaccessible ones listed.
- [ ] All relevant content extracted into `src/data/website-content.js` with source URLs.
- [ ] Product specifications preserved; document-sourced facts marked as such.
- [ ] Missing / inconsistent information documented for client verification.

Design
- [ ] Three genuinely different designs, all bold-industrial, none copying the old site.
- [ ] Each has a complete homepage and Products page, responsive and polished.
- [ ] Only genuine business information is shown.

Functionality
- [ ] Navigation, product links and contact actions work; future pages are handled honestly.
- [ ] WhatsApp action uses the configured number (or the documented placeholder behaviour).
- [ ] No decorative/broken buttons; no broken local assets.

Quality
- [ ] WCAG 2.2 AA evaluated with axe; desktop + mobile tested at 6 viewports; no horizontal overflow.
- [ ] Playwright tests pass; production build succeeds; no unresolved critical console errors.
- [ ] Lighthouse run and results documented.

Git
- [ ] `main` + three design branches, each independently runnable with its own screenshots.

## 10. Open blockers

| ID | Item | Owner | Impact |
|---|---|---|---|
| BLOCKER-1 | WhatsApp business number | Client | Floating WhatsApp button currently uses share-link fallback |
| BLOCKER-2 | Vector / high-res logo | Client | Logo is soft above ~400 px wide; cannot be recoloured cleanly |
| VERIFY-* | Items in `docs/extraction-report.md` § "Requires client verification" | Client | Copy accuracy |

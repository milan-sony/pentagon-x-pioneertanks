# PRD – Pioneer Water Tanks website redesign (design alternatives)

## 1. What we are building

A modern, bold, industrial B2B website for **Pioneer Water Tanks L.L.C.** (Abu Dhabi, UAE), replacing the 2018 WordPress site at https://pioneertanks.ae/.

Two visually distinct design alternatives are maintained, each on its own git branch, so the client can run them side by side and pick a direction. Both implement every page of the site from the same content source: home, products, three product detail pages, about, licenses, gallery, downloads, news + article and contact.

(An earlier round of three home-and-products-only designs – Industrial Heritage, Engineering Precision, Premium Industrial Modern – was retired on the client's instruction; see CHANGELOG.)

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

- Two substantially different designs (layout, typography, composition), both bold and professional.
- Clear product presentation with real specifications, downloadable datasheets and quote CTAs.
- Strong lead capture: enquiry form, floating WhatsApp, floating contact CTA, phone/email everywhere.
- WCAG 2.2 AA evaluated with axe; responsive from 360 px to 1920 px; strong Core Web Vitals.
- Fully static, fast, SEO-ready Next.js App Router build.

## 5. Non-goals (deliberately not built in this phase)

- Back-end form handling, CRM, email sending. Forms validate client-side and fall back to a pre-filled `mailto:`.
- CMS integration. Content lives in the JS content file.
- Arabic / RTL. English only; data and layout are kept i18n-friendly.
- Merging the two designs into one.

## 6. Anti-goals (would make the work a failure even if it "works")

- Copying the old site's layout, slider or styling.
- Fabricated statistics, projects, testimonials, certifications, contact numbers or specs.
- Decorative buttons that do nothing, or links silently redirected to the homepage.
- Colour swaps of the same layout.
- Template-looking SaaS sections, excessive rounded cards, heavy animation.

## 7. Constraints and inputs

- Source of truth: the live site (crawled 2026-11-06) plus its 5 PDF datasheets. See `docs/extraction-report.md`.
- Logo: `public/brand/logo-pioneer.png`, 404×112 px raster (supplied by client). **BLOCKER-2: a vector or high-resolution logo is needed before launch.**
- WhatsApp: the site publishes no WhatsApp number. **BLOCKER-1: client must supply the WhatsApp business number** (`NEXT_PUBLIC_WHATSAPP_NUMBER`). Until then the button opens WhatsApp's contact-picker share link with the pre-filled message so it still functions.
- Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Lucide + next/font (Google Fonts) + Framer Motion + Playwright.

## 8. Design alternatives

| Branch | Direction | Palette | Type |
|---|---|---|---|
| `design-1` | Editorial Warm – photography-led, editorial | cream, espresso, water blue, bronze | Urbanist + Nunito Sans |
| `design-2` | Corporate Bento – rounded bento panels | white, navy, sky, mint, orange | Plus Jakarta Sans + DM Sans |

Full tokens per design: `docs/design-system.md` on each branch.

## 9. Acceptance criteria

Research and content
- [ ] Every accessible internal page investigated; inaccessible ones listed.
- [ ] All relevant content extracted into `src/data/website-content.js` with source URLs.
- [ ] Product specifications preserved; document-sourced facts marked as such.
- [ ] Missing / inconsistent information documented for client verification.

Design
- [ ] Two genuinely different designs, none copying the old site.
- [ ] Each implements every page, responsive and polished, with full animation that rests under reduced motion.
- [ ] Only genuine business information is shown.

Functionality
- [ ] Navigation, product links and contact actions work on every page.
- [ ] WhatsApp action uses the configured number (or the documented placeholder behaviour).
- [ ] No decorative/broken buttons; no broken local assets.

Quality
- [ ] WCAG 2.2 AA evaluated with axe; desktop + mobile tested at 6 viewports; no horizontal overflow.
- [ ] Playwright tests pass; production build succeeds; no unresolved critical console errors.
- [ ] Lighthouse run and results documented.

Git
- [ ] `main` + two design branches, each independently runnable with its own screenshots.

## 10. Open blockers

| ID | Item | Owner | Impact |
|---|---|---|---|
| BLOCKER-1 | WhatsApp business number | Client | Floating WhatsApp button currently uses share-link fallback |
| BLOCKER-2 | Vector / high-res logo | Client | Logo is soft above ~400 px wide; cannot be recoloured cleanly |
| BLOCKER-3 | High-resolution photography | Client | Largest genuine photo is 1920×650; gallery 700×550 |
| VERIFY-* | Items in `docs/extraction-report.md` § "Requires client verification" | Client | Copy accuracy |

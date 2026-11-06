# Design system – Design 1 · Editorial Warm

Branch `design-1`. Editorial, photography-led, warm neutrals, large "Get in touch" footer. Tokens live in `src/app/globals.css` and `src/data/design-config.ts`. **Every page is implemented** on this branch.

## Intent

An editorial, magazine-like presentation of an industrial product: large photographs, wide uppercase headlines set on opposite edges, warm cream paper with espresso bands, and one deep water-blue accent that ties to the company's blue logo. Scroll reveals, stat counters and an applications marquee give the page life without parallax excess.

## Colour

| Token | Hex | Use |
|---|---|---|
| `--cream` | #F2EDE4 | Page ground |
| `--cream-2` | #E9E1D4 | Enquiry band, muted surfaces |
| `--paper` | #FAF7F2 | Cards, alternate bands, form panel |
| `--espresso` | #2B211B | Hero/statement bands, footer, image-overlay cards |
| `--espresso-2` | #3A2D25 | Hover on espresso |
| `--taupe-text` | #6B5A4C | Secondary text (5.6:1 on cream) |
| `--water` | #1F4E6A | Primary accent: CTAs, links, active states, focus |
| `--water-deep` | #16394E | Button hover |
| `--bronze` | #A67C52 | Eyebrows on dark grounds, marquee separators |
| `--bronze-text` | #7D5A35 | Eyebrows on light grounds (5:1) |
| `--ink` | #1D1814 | Headings and body text |
| `--destructive` | #A8321F | Form errors |

## Typography

- Display: **Urbanist** 600/700/800, uppercase with +0.01em tracking for headings and +0.22em for eyebrows (`.eyebrow`).
- Text: **Nunito Sans** 400/600/700, 16–18 px, line-height 1.6.
- Scale: h1 `clamp(2.6rem, 7.2vw, 7rem)` (home) / `clamp(2.5rem, 6vw, 5.5rem)` (inner pages); h2 `clamp(2rem, 4vw, 3.5rem)`; h3 1.125–1.5rem; stats 3–3.75rem.

## Spacing, radius, layout

- Container `max-w-[1400px]`, shared gutters 16 / 24 / 40 px.
- Section padding 80 / 112 px; bands alternate cream and paper with hairline borders.
- Radius 4 px (6 px on large tiles). Shadows: `--shadow-card` (soft, warm).
- Twelve-column grid; about block uses 4/4/4, enquiry 5/7, product rows 5/7 alternating.

## Components

- **Buttons (`Cta`):** rounded 4 px, uppercase display text with the arrow-up-right icon that nudges on hover; variants primary (water), dark (espresso), outline, outlineLight, light.
- **Image-overlay cards:** espresso ground, photo at 90 % opacity, gradient caption, 1.05 zoom and 4 px lift on hover.
- **Page hero (`PageHero`):** full-width photo with 30 px parallax, breadcrumb, eyebrow, uppercase title.
- **Section heading:** eyebrow + title left, description right.
- **Tabs:** underline style for product technical content; accordions for variants.
- **Gallery:** filter chips, 3-column grid, Radix dialog lightbox with arrow-key navigation.
- **Forms:** white inputs on paper panel, water focus border; errors in `--destructive`.
- **Footer:** espresso, four link columns, large "Get in touch" with circular arrow link.

## Motion

- Hero: staggered entrance of the two headline lines, intro and CTAs (0.8 s).
- Scroll: `Reveal` (fade + 20 px rise, once) on section headings and blocks; `Stagger` on card grids (80 ms steps).
- Counters: count up over 1.6 s when the stats row enters view.
- Marquee: applications strip loops in 40 s, pauses on hover and via a visible pause button.
- Parallax: hero, statement band and page banners move ±30–40 px.
- Hover: image zoom 1.03–1.05, card lift, arrow nudge, colour steps.
- All of it rests under `prefers-reduced-motion` (MotionConfig + global rule); counters render final values immediately.

## Page composition

Home: photographic hero → about block + counters → products carousel → statement band → applications marquee + feature cards → gallery tiles → resources cards → enquiry → footer.
Products: banner → family tiles → per-family editorial product rows with tabbed technical content → enquiry.
Product detail: tall banner → overview + facts panel → tabbed specification → photo gallery → other products → pre-filled enquiry.
About: banner → profile/introduction + counters → mission/vision/philosophy/values → statement band → who we are + build steps → licences.
Licenses: banner → document lightbox + details. Gallery: banner → filterable lightbox grid. Downloads: banner → brochure card → datasheet cards. News: banner → article cards; article page. Contact: banner → detail cards → form.

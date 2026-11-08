# Design system – Design 1 · Editorial Warm

Branch `design-1`. Editorial, photography-led, warm neutrals, large "Get in touch" footer. Tokens live in `src/app/globals.css` and `src/data/design-config.ts`. **Every page is implemented** on this branch.

## Intent

An editorial, magazine-like presentation of an industrial product: large photographs, wide uppercase headlines set on opposite edges, warm cream paper with espresso bands, and one deep water-blue accent that ties to the company's blue logo. Scroll reveals, stat counters and an applications marquee give the page life without parallax excess.

## Colour

| Token | Hex | Use |
|---|---|---|
| `--cream` | #F4F0E9 | Page ground |
| `--cream-2` | #EBE4D8 | Enquiry band, muted surfaces |
| `--paper` | #FBFAF7 | Cards, alternate bands, form panel, preloader |
| `--espresso` | #2B211B | Hero/statement bands, footer, image-overlay cards |
| `--espresso-2` | #3A2D25 | Hover on espresso |
| `--taupe-text` | #6B5A4C | Secondary text (5.6:1 on cream) |
| `--water` | #1F4E6A | Primary accent: CTAs, links, active states, focus |
| `--water-deep` | #16394E | Button hover |
| `--bronze` | #BC9064 | Eyebrows on dark grounds, rules, marquee dots |
| `--bronze-text` | #7D5A35 | Eyebrows on light grounds (5:1) |
| `--ink` | #1D1814 | Headings and body text |
| `--destructive` | #A8321F | Form errors |

## Typography

- Display: **Urbanist** 500/600/700. Headings are uppercase at weight **600** (lighter and cleaner than the earlier 700), +0.01em tracking, `text-wrap: balance`. Eyebrows (`.eyebrow`) are 12 px, 600, +0.2em, led by a short 32 px rule.
- Text: **Nunito Sans** 400/600/700, 16–18 px, line-height 1.6.
- Scale (utilities in `globals.css`): `heading-1` `clamp(2.5rem, 6.4vw, 6rem)` (home hero); inner-page titles `clamp(2.3rem, 5.4vw, 4.75rem)`; `heading-2` `clamp(1.85rem, 3.3vw, 3rem)`; `heading-3` `clamp(1.15rem, 1.5vw, 1.4rem)`; figures 2.25–3rem. Body copy 17–18 px on light grounds.

## Spacing, radius, layout

- Container `max-w-[1400px]`, shared gutters 16 / 24 / 40 px.
- Section padding 80 / 112 px; bands alternate cream and paper with hairline borders.
- Radius 4 px (6 px on large tiles). Shadows: `--shadow-card` (soft, warm).
- Twelve-column grid; about block uses 4/4/4, enquiry 5/7, product rows 5/7 alternating.

## Components

- **Buttons (`Cta`):** rounded 4 px, 13 px uppercase semibold text with the arrow-up-right icon that nudges on hover, press feedback (scale 0.98); variants primary (water), dark (espresso), outline, outlineLight, light.
- **Floating actions:** two round icon-only buttons (Contact in water blue, WhatsApp in its brand green) with accessible names; 56 px stacked on desktop, 48 px side by side on phones.
- **Header:** cream bar that gains a soft shadow once scrolled, slides away while scrolling down and returns on scroll up; dropdowns close as soon as an item is chosen.
- **Image-overlay cards:** espresso ground, photo at 90 % opacity, gradient caption, 1.05 zoom and 4 px lift on hover.
- **Page hero (`PageHero`):** full-width photo with 30 px parallax, breadcrumb, eyebrow, uppercase title whose words rise in.
- **Section heading:** eyebrow + title left, description right.
- **Tabs:** underline style for product technical content; accordions for variants.
- **Gallery:** filter chips, 3-column grid, Radix dialog lightbox with arrow-key navigation.
- **Forms:** white inputs on paper panel, water focus border; errors in `--destructive`.
- **Footer:** espresso, four link columns, large "Get in touch" with circular arrow link.

## Motion

- Preloader: once per browser session – the logo above a tank that fills with water (≈1.1 s), then a fade; skipped for reduced motion and without JavaScript.
- Smooth scrolling: Lenis inertial wheel/trackpad scrolling (touch stays native), paused while a dialog or menu is open; thin water-to-bronze progress bar along the top.
- Hero: the photo settles from a slow zoom (2.6 s) and drifts with the scroll; the headline rises in word by word, then the intro, actions and quick facts; a short scroll cue (3 cycles).
- Scroll: section titles rise in word by word (`WordsReveal`); images open from a clipped frame while settling from a zoom (`MaskReveal`); `Reveal`/`Stagger` fade-and-rise on blocks and card grids.
- Counters: count up over 1.6 s when the stats row enters view.
- Product strip (home): auto-scrolls one card every 3.5 s and loops; pauses on hover, keyboard focus, off screen and for 6 s after manual scrolling; visible pause/play button; runs for reduced-motion visitors too (client decision).
- Marquee: applications strip loops in 55 s, pauses on hover and via a visible pause button.
- Parallax: hero (±60 px), statement band (±70 px), about photo and page banners (±24–30 px).
- Hover: image zoom 1.03–1.05, card lift, arrow nudge, colour steps.
- All of it rests under `prefers-reduced-motion` (MotionConfig + global rule); counters render final values immediately.

## Page composition

Home: photographic hero with quick facts → about block + counters → auto-scrolling product strip → "Built to last" band (short statement + three figures) → applications marquee + four short icon cards → gallery bento → resources cards → enquiry → footer.
404: dark band, "404" filled with moving water, message, 3-second countdown home with "Stay on this page".
Products: banner → family tiles → per-family editorial product rows with tabbed technical content → enquiry.
Product detail: tall banner → overview + facts panel → tabbed specification → photo gallery → other products → pre-filled enquiry.
About: banner → profile/introduction + counters → mission/vision/philosophy/values → statement band → who we are + build steps → licences.
Licenses: banner → document lightbox + details. Gallery: banner → filterable lightbox grid. Downloads: banner → brochure card → datasheet cards. News: banner → article cards; article page. Contact: banner → detail cards → form.

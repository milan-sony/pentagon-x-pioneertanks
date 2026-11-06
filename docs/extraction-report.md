# Extraction report – pioneertanks.ae

Crawled 2026-11-06 with Playwright Chromium (`scripts/scrape-website/crawl.mjs`). Raw outputs live in `scripts/scrape-website/output/` (page JSON per URL, discovered URL list, asset manifest, PDF text, image inventory). Curated result: `src/data/website-content.js`.

## 1. Totals

| Metric | Count |
|---|---|
| Internal URLs discovered (all types) | 120 |
| Pages crawled (HTML, HTTP 200) | 37 |
| – business pages | 12 |
| – WordPress leftovers / theme documentation | 25 |
| Pages failed or inaccessible | 0 (only `/wp-admin/` skipped by design) |
| Product families | 2 (Steel liner tanks, Flexible tanks) |
| Products | 3 (Corrugated Zincalume Steel, Flat Panel HDG Steel, Flexible PVC Storage Tanks) |
| Product variants with their own datasheet | 2 (Pillow FLT, Onion OLT) |
| Downloadable documents | 5 PDFs (1 brochure, 4 datasheets) |
| Images discovered | 76 unique (+1 duplicate size variant) |
| – genuine product / installation photos | 34 |
| – certificate scans | 3 |
| – stock imagery used by the old theme | 11 |
| – WordPress theme-manual screenshots | 26 |
| – logos / icons | 4 |
| Gallery images | 16 (Corrugated 8, Pillow 4, Flat Panel 2, Onion 2) |
| News articles | 1 |
| Contact forms | 1 (Contact Form 7: Name, E-mail, Phone, Subject, Message) |

Sitemap: `/sitemap.xml` is a WordPress index with 7 child sitemaps (posts, pages, docs, banner, news, product, categories). Every sitemap URL was crawled; link-following found no additional business pages.

## 2. All discovered page URLs

Business pages (rendered in the new site or reserved as future routes):

| Live URL | New route | Status in phase 1 |
|---|---|---|
| https://pioneertanks.ae/ | `/` | Implemented |
| https://pioneertanks.ae/about/ | `/about` | Future page |
| https://pioneertanks.ae/licenses/ | `/licenses` | Future page |
| https://pioneertanks.ae/products/ | `/products` | Implemented |
| https://pioneertanks.ae/product/corrugated-zincalum-steel/ | `/product/corrugated-zincalum-steel` | Future page |
| https://pioneertanks.ae/product/flat-panel-hdg-steel/ | `/product/flat-panel-hdg-steel` | Future page |
| https://pioneertanks.ae/product/flexible-pvc-storage-tanks/ | `/product/flexible-pvc-storage-tanks` | Future page |
| https://pioneertanks.ae/news/ | `/news` | Future page |
| https://pioneertanks.ae/news/nemo-enim-ipsam-voluptatem-quia/ | `/news` (article) | Future page |
| https://pioneertanks.ae/gallery/ | `/gallery` | Future page |
| https://pioneertanks.ae/downloads/ | `/downloads` | Future page |
| https://pioneertanks.ae/contact/ | `/contact` | Future page |

Non-business pages (recorded in `siteMetadata.discoveredPages`, not carried over):

- `/banner/pioneers-in-water-storage-solutions/`, `…-2/`, `…-3/` – slider "banner" custom posts
- `/sample-page/`, `/hello-world/`, `/category/uncategorized/` – WordPress defaults
- `/docs/` + 18 pages under `/docs/user-manual/` – the WordPress theme's user manual (front-end and admin-end guides with screenshots)

Documents:

| Title | URL |
|---|---|
| PWT Brochure (12 pp) | https://pioneertanks.ae/wp-content/uploads/2018/04/PWT-Brochure.pdf |
| Pioneer Steel Tank Specifications – Corrugated – PLT | https://pioneertanks.ae/wp-content/uploads/2018/04/Pioneer-Steel-Tank-Specifications-Corrugated-PLT.pdf |
| Pioneer Steel Specifications – Flat Panel – PFP | https://pioneertanks.ae/wp-content/uploads/2018/04/Pioneer-Steel-Specifications-Flat-Panel-PFP.pdf |
| Pioneer Flexible Tanks Specifications – Pillow – FLT | https://pioneertanks.ae/wp-content/uploads/2018/04/Pioneer-Flexible-Tanks-Specifications-Pillow-FLT-1.pdf |
| Pioneer Flexible Tanks Specifications – Onion – OLT | https://pioneertanks.ae/wp-content/uploads/2018/04/Pioneer-Flexible-Tanks-Specifications-Onion-OLT.pdf |

All five were downloaded to `public/documents/` and text-extracted (`output/documents/*.txt`). The brochure's gross capacity chart (28 models × 9 ring heights) was transcribed into `products[0].capacityChart`.

## 3. Navigation structure (live site)

```
Home
About
  └─ Licenses
Products
  ├─ Flexible PVC Storage Tanks
  ├─ Flat Panel HDG Steel
  └─ Corrugated Zincalum Steel
News
Gallery
Downloads
Contact
Footer: About · Products · News · Gallery · Downloads · Contact us
Header strip: Phone, E-mail, Fax, Address, Location (links to /contact/)
```

Contact details published: Phone +971-2-555-1855 · Fax +971-2-555-1755 · pwt@pioneertanks.ae · M14 Mussafah Industrial Area, P.O. Box 110810, Abu Dhabi, UAE. Social: Facebook, Twitter, Google+ (dead).

No meta descriptions, keywords or Open Graph tags exist on any page. `<html lang="en-US">`. No language switcher.

## 4. Missing information

| Item | Status |
|---|---|
| WhatsApp number | **Not published anywhere** – BLOCKER-1 |
| Mobile number, business hours, map coordinates | Not published |
| Meta descriptions | None on any page |
| Flat Panel (PFP) capacity range, dimensions, warranty | Not published (datasheet has materials only) |
| Project names, locations, client list, case studies | Not published; gallery has no captions |
| Image alt text | Empty on all images except `license-1/2/3`, `news-1` |
| High-resolution photography | Largest genuine photos: 1920×650 (product-banner), 1920×980 (ban01, tinted), 953×924 (intro-img); gallery 700×550 |
| Vector logo | Not available; client PNG is 404×112 – BLOCKER-2 |
| Issuing body / current validity of certificates | Only legible from scans; both are expired copies (see §5) |

## 5. Inconsistencies and errors found on the live site

1. **Products overview page** – the Flat Panel and Corrugated cards repeat the Flexible-tank paragraph verbatim and show flexible-tank photos.
2. **Flat Panel product page** – shows "Coming Soon…" then the Flexible-tank features/applications pasted in. No genuine copy; the new site uses the PFP datasheet.
3. **Corrugated product page** – shows "Coming Soon…" above complete, genuine content; its images are pillow/onion tank photos.
4. **Units** – "30m to 3,300m", "500m capacity", "150 gr/m", "650gr/m": superscripts were lost in HTML and in the PDF text layer. Read as m³ and g/m².
5. **Spec conflicts (web page vs PLT datasheet)** – bolts M12/M16 vs M10+M12/M16; trusses "BS-EN-ISO-1461" vs "coating Grade AZ 200"; liner 3000 N/5 cm, 650 g/m², pH 5–10, AS4020:1999 vs 2600 N/5 cm, 680 g/m², pH 4–11, AS 2070.2-1992. Both recorded; client must confirm the current spec.
6. **Flexible fabric weight** – web says "up to 1,300GSM"; datasheets say 930 g/m².
7. **Brand spelling** – site uses "Zincalum"; datasheets use "ZINCALUME®".
8. **Dated copy** – "over 25 years of experience" and "Copyright © 2018".
9. **Google+ link** – dead service.
10. **News** – one article whose slug is lorem ipsum (`nemo-enim-ipsam-voluptatem-quia`); `hello-world` default post still live.
11. **Theme documentation** – `/docs/user-manual/*` is publicly reachable and includes admin screenshots.
12. **Certificates** – ISO 9001:2008 (QRS, AAU-1372) valid to 03 Feb 2018; Commercial licence CN-1006186 expired 18 Oct 2018; warranty image is a SAMPLE. Licence shows establishment date 13/06/2007 vs "since 1993" on the site.
13. **Capacity chart** – the PDF text layer lists PWT-18 before PWT-17; sequential order assumed.

## 6. Requires client verification before launch

- WhatsApp business number (BLOCKER-1).
- Vector / high-resolution logo (BLOCKER-2).
- Current ISO 9001:2015 certificate and current commercial licence; permission to display them.
- Preferred experience claim ("since 1993" vs 2007 licence; "hundreds of tanks" vs "numerous projects").
- Which liner / bolt / truss specification is current for the PLT series (web vs datasheet).
- Flat Panel series: capacity range, max dimensions, warranty period.
- Flexible fabric weight (1,300 GSM vs 930 g/m²).
- Whether the brochure's PWT-04…PWT-31 model numbers and diameters are still current.
- Higher-resolution photography for hero and gallery use; captions/locations for gallery images.
- Business hours, map location, any mobile numbers.
- Social accounts to keep (Facebook, Twitter/X).

## 7. Honest scope statement

Every URL in the sitemap and every internal link reachable from them was rendered and extracted; no page was inaccessible. The three slider "banner" posts, WordPress defaults and theme documentation were crawled and are listed above but intentionally not carried into the new site's content. PDF tables were extracted as text (pdf-parse found no vector tables in the datasheets), so specification rows were transcribed by hand from the text layer and checked against the rendered PDFs.

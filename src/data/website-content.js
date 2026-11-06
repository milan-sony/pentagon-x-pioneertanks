// @ts-check
/**
 * Centralized content for the Pioneer Water Tanks website.
 *
 * Every fact in this file was extracted from https://pioneertanks.ae/ (crawled
 * 2026-11-06) or from the PDF documents published on its Downloads page.
 * Nothing here is invented. Where the source is a document rather than a web
 * page, the entry carries `source: "document"` and a `documentRef`.
 *
 * Known problems with the source content are recorded inline in `notes`,
 * `verificationNotes` and `requiresClientVerification` rather than silently
 * corrected. See docs/extraction-report.md for the consolidated list.
 *
 * This file is the single source of truth for page copy. Components must read
 * from it (via src/lib/content.ts) instead of hard-coding text.
 */

import { assets } from "./website-assets.js";

const SITE = "https://pioneertanks.ae";

/* -------------------------------------------------------------------------- */
/* Documents                                                                   */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').DocumentAsset[]} */
const downloads = [
  {
    id: "brochure",
    title: "PWT Brochure",
    localPath: "/documents/PWT-Brochure.pdf",
    sourceUrl: `${SITE}/wp-content/uploads/2018/04/PWT-Brochure.pdf`,
    type: "brochure",
    fileType: "pdf",
    pages: 12,
    bytes: 4282982,
    relatedProducts: ["corrugated-zincalum-steel", "flat-panel-hdg-steel", "flexible-pvc-storage-tanks"],
    summary:
      "12-page company brochure: mission, philosophy and values; who we are; main features of PWT tanks; applications; specifications for the PWT tank series; gross capacity chart (28 models, up to 9 rings); tank liner; ring-beam foundation and jacking system; flexible tanks; accessories; contact details.",
  },
  {
    id: "datasheet-corrugated-plt",
    title: "Pioneer Steel Tank Specifications - Corrugated - PLT",
    localPath: "/documents/Pioneer-Steel-Tank-Specifications-Corrugated-PLT.pdf",
    sourceUrl: `${SITE}/wp-content/uploads/2018/04/Pioneer-Steel-Tank-Specifications-Corrugated-PLT.pdf`,
    type: "datasheet",
    fileType: "pdf",
    pages: 1,
    bytes: 263940,
    relatedProducts: ["corrugated-zincalum-steel"],
    series: "PLT",
    summary: "One-page specification for the PLT (corrugated Zincalume liner tank) series: wall structure, coating, bolting, roof, liner, nozzles, accessories, foundation, warranty.",
  },
  {
    id: "datasheet-flat-panel-pfp",
    title: "Pioneer Steel Specifications - Flat Panel - PFP",
    localPath: "/documents/Pioneer-Steel-Specifications-Flat-Panel-PFP.pdf",
    sourceUrl: `${SITE}/wp-content/uploads/2018/04/Pioneer-Steel-Specifications-Flat-Panel-PFP.pdf`,
    type: "datasheet",
    fileType: "pdf",
    pages: 2,
    bytes: 337496,
    relatedProducts: ["flat-panel-hdg-steel"],
    series: "PFP",
    summary: "Two-page specification for the PFP (flat panel hot-dip galvanised steel liner tank) series: wall panels, corrosion treatment, bolting, roof, liner, nozzles, accessories, foundation.",
  },
  {
    id: "datasheet-pillow-flt",
    title: "Pioneer Flexible Tanks Specifications - Pillow - FLT",
    localPath: "/documents/Pioneer-Flexible-Tanks-Specifications-Pillow-FLT-1.pdf",
    sourceUrl: `${SITE}/wp-content/uploads/2018/04/Pioneer-Flexible-Tanks-Specifications-Pillow-FLT-1.pdf`,
    type: "datasheet",
    fileType: "pdf",
    pages: 1,
    bytes: 192979,
    relatedProducts: ["flexible-pvc-storage-tanks"],
    series: "FLT",
    summary: "One-page specification for PWT Flexi-Tanks (pillow type): fabric/liner, flexibility, application, clamps, valves, accessories, warranty.",
  },
  {
    id: "datasheet-onion-olt",
    title: "Pioneer Flexible Tanks Specifications - Onion - OLT",
    localPath: "/documents/Pioneer-Flexible-Tanks-Specifications-Onion-OLT.pdf",
    sourceUrl: `${SITE}/wp-content/uploads/2018/04/Pioneer-Flexible-Tanks-Specifications-Onion-OLT.pdf`,
    type: "datasheet",
    fileType: "pdf",
    pages: 1,
    bytes: 192025,
    relatedProducts: ["flexible-pvc-storage-tanks"],
    series: "OLT",
    summary: "One-page specification for PWT Flexible Onion Tanks: fabric, features, application, cover, nozzles and valves, ground sheet, warranty.",
  },
];

/* -------------------------------------------------------------------------- */
/* Company                                                                     */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').Company} */
const company = {
  name: "Pioneer Water Tanks",
  legalName: "Pioneer Water Tanks L.L.C.",
  shortName: "PWT",
  tagline: "Pioneers in Water Storage Solutions",
  description:
    "Pioneer Water Tanks LLC are the Regional suppliers of Liner water storage systems for the UAE, Gulf and Middle East Region and since 1993 we have continued to service the water storage needs of our expanding list of satisfied clients.",
  established: "1993",
  establishedSource: `${SITE}/ ("since 1993"); ${SITE}/about/ ("first to introduce Liner Tanks to the local UAE market back in 1993"). The commercial licence scan on the Licenses page shows an establishment date of 13/06/2007 for the LLC – see verification notes.`,
  location: "M14 Mussafah Industrial Area, Abu Dhabi, UAE",
  markets: ["UAE", "Gulf region", "Middle East / MENA region"],
  mission:
    "To provide top quality liner tanks to the UAE and Gulf Regions while catering to our goal of having reliable future proof products.",
  vision:
    "We aim for everyone become more water conscious by providing water preservation information and quality of life products.",
  philosophy: "Protecting a precious life-giving resource with quality and integrity.",
  values: "Innovative storage solutions with superior quality, competitive prices and after sales timely service.",
  contact: {
    phone: "+971-2-555-1855",
    phoneHref: "tel:+97125551855",
    fax: "+971-2-555-1755",
    email: "pwt@pioneertanks.ae",
    whatsapp: null, // Not published anywhere on the live site – BLOCKER-1.
    address: {
      lines: ["Pioneer Water Tanks L.L.C.", "M14 Mussafah Industrial Area"],
      poBox: "P.O. Box 110810",
      city: "Abu Dhabi",
      country: "UAE",
      full: "M14 Mussafah Industrial Area, P.O. Box 110810, Abu Dhabi, UAE",
    },
    mapUrl: null, // The live site's "Location" link only points back to the contact page; no map embed.
    hours: null, // Not published.
  },
  socialLinks: [
    { platform: "Facebook", url: "https://www.facebook.com/PioneerTanksUAE", status: "active" },
    { platform: "Twitter", url: "https://twitter.com/PioneerTanksUae", status: "active" },
    {
      platform: "Google+",
      url: "https://plus.google.com/u/0/+PioneerWaterTanksLLCAbuDhabi",
      status: "deprecated",
      note: "Google+ was shut down in 2019; link is dead and should not be shown.",
    },
  ],
  logo: {
    src: "/brand/logo-pioneer.png",
    alt: "Pioneer Water Tanks",
    width: 404,
    height: 112,
    note: "Supplied by the client (logo-Photoroom.png). 404×112 px raster with Arabic and English wordmark – a vector / high-resolution version is required before launch (BLOCKER-2).",
  },
};

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').NavigationItem[]} */
const navigation = [
  { label: "Home", href: "/", sourceUrl: `${SITE}/`, implemented: true },
  {
    label: "About",
    href: "/about",
    sourceUrl: `${SITE}/about/`,
    implemented: false,
    children: [{ label: "Licenses", href: "/licenses", sourceUrl: `${SITE}/licenses/`, implemented: false }],
  },
  {
    label: "Products",
    href: "/products",
    sourceUrl: `${SITE}/products/`,
    implemented: true,
    children: [
      { label: "Corrugated Zincalume Steel", href: "/product/corrugated-zincalum-steel", sourceUrl: `${SITE}/product/corrugated-zincalum-steel/`, implemented: false },
      { label: "Flat Panel HDG Steel", href: "/product/flat-panel-hdg-steel", sourceUrl: `${SITE}/product/flat-panel-hdg-steel/`, implemented: false },
      { label: "Flexible PVC Storage Tanks", href: "/product/flexible-pvc-storage-tanks", sourceUrl: `${SITE}/product/flexible-pvc-storage-tanks/`, implemented: false },
    ],
  },
  { label: "Gallery", href: "/gallery", sourceUrl: `${SITE}/gallery/`, implemented: false },
  { label: "Downloads", href: "/downloads", sourceUrl: `${SITE}/downloads/`, implemented: false },
  { label: "News", href: "/news", sourceUrl: `${SITE}/news/`, implemented: false },
  { label: "Contact", href: "/contact", sourceUrl: `${SITE}/contact/`, implemented: false },
];

/** Footer links as they appear on the live site. */
/** @type {import('../types/content').NavigationItem[]} */
const footerNavigation = [
  { label: "About", href: "/about", sourceUrl: `${SITE}/about/`, implemented: false },
  { label: "Products", href: "/products", sourceUrl: `${SITE}/products/`, implemented: true },
  { label: "News", href: "/news", sourceUrl: `${SITE}/news/`, implemented: false },
  { label: "Gallery", href: "/gallery", sourceUrl: `${SITE}/gallery/`, implemented: false },
  { label: "Downloads", href: "/downloads", sourceUrl: `${SITE}/downloads/`, implemented: false },
  { label: "Contact us", href: "/contact", sourceUrl: `${SITE}/contact/`, implemented: false },
];

/* -------------------------------------------------------------------------- */
/* Pages (sections preserved in original order)                                */
/* -------------------------------------------------------------------------- */

/** @type {Record<string, import('../types/content').PageContent>} */
const pages = {
  home: {
    slug: "home",
    route: "/",
    sourceUrl: `${SITE}/`,
    title: "Home",
    metaTitle: "Pioneer Water Tanks | Home",
    metaDescription: null,
    headings: [
      { level: 1, text: "PIONEERS IN WATER STORAGE SOLUTIONS" },
      { level: 2, text: "Pioneer Water Tanks LLC are the Regional suppliers of Liner water storage systems for the UAE" },
      { level: 2, text: "Who We Are?" },
      { level: 3, text: "WELCOME TO PIONEER WATER TANKS LLC" },
      { level: 2, text: "Mission & Vision" },
      { level: 3, text: "MISSION & VISION" },
      { level: 3, text: "AREAS OF EXPERTISE" },
      { level: 2, text: "Our Products" },
      { level: 3, text: "STEEL LINER TANKS" },
      { level: 3, text: "FLEXIBLE TANKS" },
    ],
    sections: [
      {
        id: "hero",
        heading: "PIONEERS IN WATER STORAGE SOLUTIONS",
        subheading: "Pioneer Water Tanks LLC are the Regional suppliers of Liner water storage systems for the UAE",
        images: ["ban01", "ban02", "ban03"],
        links: [{ label: "READ MORE", href: "/about" }],
        notes: ["The old site shows a 3-slide slider; all three slides repeat the same headline and sub-line. Slide images: ban01 (Pioneer tank), ban02 and ban03 (stock)."],
        sourceUrl: `${SITE}/`,
      },
      {
        id: "quick-links",
        items: ["WHO WE ARE?", "MISSION & VISION", "AREAS OF EXPERTISE", "OUR PRODUCTS"],
        notes: ["In-page anchor navigation (#sec1–#sec4)."],
        sourceUrl: `${SITE}/`,
      },
      {
        id: "who-we-are",
        heading: "Who We Are?",
        subheading: "WELCOME TO PIONEER WATER TANKS LLC",
        body: [
          "Pioneer Water Tanks LLC are the Regional suppliers of Liner water storage systems for the UAE, Gulf and Middle East Region and since 1993 we have continued to service the water storage needs of our expanding list of satisfied clients. We look forward to service your water storage needs!",
        ],
        sourceUrl: `${SITE}/`,
      },
      {
        id: "mission-vision",
        heading: "Mission & Vision",
        subheading: "MISSION & VISION",
        body: [
          "OUR MISSION: To provide top quality liner tanks to the UAE and Gulf Regions while catering to our goal of having reliable future proof products.",
          "OUR VISION: We aim for everyone become more water conscious by providing water preservation information and quality of life products.",
        ],
        images: ["news-left"],
        sourceUrl: `${SITE}/`,
      },
      {
        id: "areas-of-expertise",
        heading: "AREAS OF EXPERTISE",
        body: [
          "Pioneer Water Tanks are experts at providing custom and innovative water storage solutions. We have over 25 years of experience in the field and have some of the best minds at work to solving your problems.",
        ],
        images: ["new"],
        notes: ['"over 25 years" was written in 2018 (1993 → 2018). By 2026 the figure is over 30 years; the new site derives the number from `company.established` rather than hard-coding it.'],
        sourceUrl: `${SITE}/`,
      },
      {
        id: "our-products",
        heading: "Our Products",
        body: [],
        items: [
          "STEEL LINER TANKS – Cylindrical tanks that are either corrugated or flat. Popular for Potable water storage using an internal liner system. Used for Water Storage applications such as firefighting, mining and camp sites.",
          "FLEXIBLE TANKS – Custom-made to suit your needs. Our fabric tanks are can be used anywhere and in any way for both water and diesel storage purposes.",
        ],
        sourceUrl: `${SITE}/`,
      },
      {
        id: "footer",
        body: ["Copyright © 2018 Pioneer Water Tanks l.l.C.", "M14 Mussafah Industrial Area, P.O. Box 110810, Abu Dhabi, UAE", "Phone: +971-2-555-1855, Fax: +971-2-555-1755, E-mail: pwt@pioneertanks.ae"],
        links: footerNavigation.map((n) => ({ label: n.label, href: n.href })),
        sourceUrl: `${SITE}/`,
      },
    ],
    requiresClientVerification: ['"over 25 years of experience" is dated copy (written 2018).'],
    implemented: true,
  },

  about: {
    slug: "about",
    route: "/about",
    sourceUrl: `${SITE}/about/`,
    title: "About Us",
    metaTitle: "Pioneer Water Tanks | About Us",
    metaDescription: null,
    banner: "about-banner",
    headings: [
      { level: 2, text: "ABOUT US" },
      { level: 3, text: "COMPANY PROFILE" },
      { level: 3, text: "INTRODUCTION" },
    ],
    sections: [
      {
        id: "company-profile",
        heading: "COMPANY PROFILE",
        body: [
          "Pioneer Water Tanks (PWT) introduces you to our range of steel storage tanks. Corrugated and Flat bolted liner tanks are what we manufacture and distribute in the region. We have installed hundreds of tanks all over UAE and the Gulf region.",
        ],
        images: ["intro-img"],
        sourceUrl: `${SITE}/about/`,
      },
      {
        id: "introduction",
        heading: "INTRODUCTION",
        body: [
          "Pioneer Water Tanks (PWT) introduces you to our range of steel storage tanks. Corrugated and Flat bolted liner tanks are what we manufacture and distribute in the region. Our Tanks are Australian-designed using high quality materials and components including Zincalume steel structure and internal liners. We were the first to introduce Liner Tanks to the local UAE market back in 1993, our versatile products are of the highest Industry standards. Our Tanks come with the assurance that you will be getting a leak-free tank, with a long service-life, backed by a 10-Year Warranty.",
        ],
        sourceUrl: `${SITE}/about/`,
      },
      {
        id: "brochure-who-we-are",
        heading: "Who We Are (from the PWT Brochure)",
        body: [
          "Pioneer Water Tanks LLC manufacture and distribute modular bolted steel liner tanks throughout the UAE, Gulf and MENA region.",
          "PWT tanks are locally manufactured using high quality Australian materials and components including Zincalume steel structure and internal Liners.",
          "PWT tanks are made to the highest Industry standards with capacities exceeding 3,000m³.",
          "Pioneer Water Tanks LLC were the first to introduce liner tanks to the UAE market in 1993 and have since successfully installed numerous projects in this region. With our installation expertise and a genuine 10 Year warranty, Pioneer storage tanks are Built-to-Last.",
        ],
        notes: ["Source: PWT Brochure page 3 (document, not the web page)."],
        sourceUrl: downloads[0].sourceUrl,
      },
      {
        id: "brochure-mission",
        heading: "Mission, Philosophy, Values (from the PWT Brochure)",
        items: [
          "Mission – Pioneer Water Tanks LLC aspire to provide its customers with quality storage tanks to the highest industry standards at competitive prices.",
          "Philosophy – Protecting a precious life-giving resource with quality and integrity.",
          "Values – Innovative storage solutions with superior quality, competitive prices and after sales timely service.",
        ],
        notes: ["Source: PWT Brochure page 2."],
        sourceUrl: downloads[0].sourceUrl,
      },
    ],
    requiresClientVerification: ['"hundreds of tanks" (web) vs "numerous projects" (brochure) – confirm the preferred claim.'],
    implemented: false,
  },

  licenses: {
    slug: "licenses",
    route: "/licenses",
    sourceUrl: `${SITE}/licenses/`,
    title: "Licenses",
    metaTitle: "Pioneer Water Tanks | Licenses",
    metaDescription: null,
    banner: "license-banner",
    headings: [
      { level: 2, text: "LICENSES" },
      { level: 4, text: "Pioneer-Warranty-2017---PQ" },
      { level: 4, text: "PWT-ISO-Certificate" },
      { level: 4, text: "PWT-LICENSE---18.10" },
    ],
    sections: [
      {
        id: "licenses",
        heading: "LICENSES",
        items: ["Pioneer-Warranty-2017---PQ", "PWT-ISO-Certificate", "PWT-LICENSE---18.10"],
        images: ["pioneer-warranty-2017-pq", "pwt-iso-certificate", "pwt-license-18-10"],
        notes: ["The page shows three scanned images with their file names as captions and a zoom icon; no descriptive text."],
        sourceUrl: `${SITE}/licenses/`,
      },
    ],
    requiresClientVerification: [
      "ISO 9001:2008 certificate (QRS, No. AAU-1372) shows 'Valid up-to 03 FEB 2018' and ISO 9001:2008 has been withdrawn – a current ISO 9001:2015 certificate is needed.",
      "Commercial licence CN-1006186 shows expiry 18/10/2018 – a current licence copy is needed.",
      "The warranty document is watermarked SAMPLE.",
    ],
    implemented: false,
  },

  products: {
    slug: "products",
    route: "/products",
    sourceUrl: `${SITE}/products/`,
    title: "Products",
    metaTitle: "Pioneer Water Tanks | Products",
    metaDescription: null,
    banner: "product-banner",
    headings: [
      { level: 2, text: "PRODUCTS" },
      { level: 3, text: "FLEXIBLE PVC STORAGE TANKS" },
      { level: 3, text: "FLAT PANEL HDG STEEL" },
      { level: 3, text: "CORRUGATED ZINCALUM STEEL" },
    ],
    sections: [
      {
        id: "intro",
        heading: "PRODUCTS",
        body: ["The PWT tank shell is constructed using Zincalume steel corrugated panels bolted together to form a robust cylindrical structure."],
        items: ["FLEXIBLE PVC STORAGE TANKS", "FLAT PANEL HDG STEEL", "CORRUGATED ZINCALUM STEEL"],
        sourceUrl: `${SITE}/products/`,
      },
      {
        id: "flexible-pvc-storage-tanks",
        heading: "FLEXIBLE PVC STORAGE TANKS",
        body: ["Pioneer manufactures a range of quality flexible storage tanks with sizes up to 300m³ capacity in a variety of shapes and sizes, the most common being Pillow and Onion tanks."],
        images: ["pillow-tank"],
        links: [{ label: "VIEW MORE", href: "/product/flexible-pvc-storage-tanks" }],
        sourceUrl: `${SITE}/products/`,
      },
      {
        id: "flat-panel-hdg-steel",
        heading: "FLAT PANEL HDG STEEL",
        body: ["Pioneer manufactures a range of quality flexible storage tanks with sizes up to 300m³ capacity in a variety of shapes and sizes, the most common being Pillow and Onion tanks."],
        images: ["onion-tanks"],
        links: [{ label: "VIEW MORE", href: "/product/flat-panel-hdg-steel" }],
        notes: ["CONTENT ERROR on the live site: the Flat Panel card repeats the Flexible tank text and shows an onion-tank photo. The new site uses the PFP datasheet for this product instead."],
        sourceUrl: `${SITE}/products/`,
      },
      {
        id: "corrugated-zincalum-steel",
        heading: "CORRUGATED ZINCALUM STEEL",
        body: ["Pioneer manufactures a range of quality flexible storage tanks with sizes up to 300m³ capacity in a variety of shapes and sizes, the most common being Pillow and Onion tanks."],
        images: ["pillow-tank"],
        links: [{ label: "VIEW MORE", href: "/product/corrugated-zincalum-steel" }],
        notes: ["CONTENT ERROR on the live site: the Corrugated card repeats the Flexible tank text and shows a pillow-tank photo. The new site uses the product page + PLT datasheet instead."],
        sourceUrl: `${SITE}/products/`,
      },
    ],
    requiresClientVerification: ["Products overview cards for Flat Panel and Corrugated carry copy-pasted flexible-tank text on the live site."],
    implemented: true,
  },

  "product-corrugated-zincalum-steel": {
    slug: "product-corrugated-zincalum-steel",
    route: "/product/corrugated-zincalum-steel",
    sourceUrl: `${SITE}/product/corrugated-zincalum-steel/`,
    title: "Corrugated Zincalum Steel",
    metaTitle: "Pioneer Water Tanks | Corrugated Zincalum Steel",
    metaDescription: null,
    banner: "product-banner-2",
    headings: [
      { level: 2, text: "CORRUGATED ZINCALUM STEEL" },
      { level: 3, text: "FEATURES" },
      { level: 3, text: "APPLICATIONS" },
    ],
    sections: [
      { id: "coming-soon", body: ["Coming Soon…"], notes: ["A 'Coming Soon…' placeholder sits above complete product content on the live page."], sourceUrl: `${SITE}/product/corrugated-zincalum-steel/` },
      {
        id: "features",
        heading: "FEATURES",
        items: ["RIGID CONSTRUCTION", "HIGH CORROSION RESISTANCE", "SIZE FLEXIBILITY", "IDEAL FOR REMOTE AREAS", "BENEFITS AND ADVANTAGES"],
        notes: ["Full feature text is held in products[].features."],
        sourceUrl: `${SITE}/product/corrugated-zincalum-steel/`,
      },
      { id: "applications", heading: "APPLICATIONS", notes: ["Text held in products[].applications."], sourceUrl: `${SITE}/product/corrugated-zincalum-steel/` },
      { id: "specifications", heading: "SPECIFICATIONS FOR PWT TANK SERIES", notes: ["Table held in products[].specifications (source: web)."], sourceUrl: `${SITE}/product/corrugated-zincalum-steel/` },
    ],
    requiresClientVerification: ["Remove the 'Coming Soon…' placeholder.", "Capacity units are printed as '30m to 3,300m' – should be m³ (cubic metres)."],
    implemented: false,
  },

  "product-flat-panel-hdg-steel": {
    slug: "product-flat-panel-hdg-steel",
    route: "/product/flat-panel-hdg-steel",
    sourceUrl: `${SITE}/product/flat-panel-hdg-steel/`,
    title: "Flat Panel HDG Steel",
    metaTitle: "Pioneer Water Tanks | Flat Panel HDG Steel",
    metaDescription: null,
    banner: "product-banner-1",
    headings: [
      { level: 2, text: "FLAT PANEL HDG STEEL" },
      { level: 3, text: "FEATURES" },
      { level: 3, text: "APPLICATIONS" },
    ],
    sections: [
      {
        id: "coming-soon",
        body: ["Coming Soon…"],
        notes: ["CONTENT ERROR on the live site: below 'Coming Soon…' the page repeats the Flexible PVC tank features and applications verbatim, which do not describe a steel tank. The new site uses the PFP datasheet and the brochure for this product."],
        sourceUrl: `${SITE}/product/flat-panel-hdg-steel/`,
      },
    ],
    requiresClientVerification: ["Flat Panel product page has no genuine web copy; all facts come from the PFP datasheet (document)."],
    implemented: false,
  },

  "product-flexible-pvc-storage-tanks": {
    slug: "product-flexible-pvc-storage-tanks",
    route: "/product/flexible-pvc-storage-tanks",
    sourceUrl: `${SITE}/product/flexible-pvc-storage-tanks/`,
    title: "Flexible PVC Storage Tanks",
    metaTitle: "Pioneer Water Tanks | Flexible PVC Storage Tanks",
    metaDescription: null,
    banner: "flexible-tank",
    headings: [
      { level: 2, text: "FLEXIBLE PVC STORAGE TANKS" },
      { level: 3, text: "FEATURES" },
      { level: 3, text: "APPLICATIONS" },
    ],
    sections: [
      {
        id: "intro",
        body: ["These Flexible tanks are manufactured by us here in the UAE and we can do them in a variety of shapes and sizes most popular being the Pillow Tanks, or bladder tanks, and the self-erecting Onion Tanks."],
        images: ["pillow-tank", "onion-tanks"],
        sourceUrl: `${SITE}/product/flexible-pvc-storage-tanks/`,
      },
      {
        id: "features",
        heading: "FEATURES",
        items: [
          "Compact, light-weight and durable.",
          "Fully collapsible, foldable and transportable.",
          "Quickly deployed and Easy to relocate.",
          "High strength industrial fabric, up to 1,300GSM, with excellent abrasion resistance.",
          "Highly resistance to UV, hot temperatures and harsh weather conditions.",
          "Non-corrosive as the tank and fittings have no steel components.",
        ],
        sourceUrl: `${SITE}/product/flexible-pvc-storage-tanks/`,
      },
      {
        id: "applications",
        heading: "APPLICATIONS",
        items: [
          "Suitable for potable water storage as fabric used resists fungi and inhibits algae.",
          "Ideal for water storage applications in remote and difficult to access area.",
          "Relief & Aid agencies, Military, Fire Fighting, Water Transportation and Water Containment.",
          "Special fabric available for storage of Diesel fuel and other liquid hydrocarbons.",
        ],
        sourceUrl: `${SITE}/product/flexible-pvc-storage-tanks/`,
      },
    ],
    implemented: false,
  },

  news: {
    slug: "news",
    route: "/news",
    sourceUrl: `${SITE}/news/`,
    title: "News Updates",
    metaTitle: "Pioneer Water Tanks | News Updates",
    metaDescription: null,
    banner: "news-banner",
    headings: [
      { level: 2, text: "NEWS UPDATES" },
      { level: 4, text: "The launch of our new Website" },
    ],
    sections: [
      {
        id: "list",
        heading: "NEWS UPDATES",
        items: ["Apr 24 – The launch of our new Website – Pioneer Water Tanks (PWT) introduces you to our range of steel storage tanks. Corrugated and Flat bolted liner tanks."],
        images: ["site-img"],
        notes: ["Only one article exists (see news[])."],
        sourceUrl: `${SITE}/news/`,
      },
    ],
    implemented: false,
  },

  gallery: {
    slug: "gallery",
    route: "/gallery",
    sourceUrl: `${SITE}/gallery/`,
    title: "Media Gallery",
    metaTitle: "Pioneer Water Tanks | Media Gallery",
    metaDescription: null,
    banner: "gallery-banner",
    headings: [
      { level: 2, text: "MEDIA GALLERY" },
      { level: 3, text: "CORRUGATED" },
      { level: 3, text: "PILLOW" },
      { level: 3, text: "FLAT PANEL" },
      { level: 3, text: "ONION" },
    ],
    sections: [
      { id: "corrugated", heading: "CORRUGATED", images: ["corrugated-1", "corrugated-2", "corrugated-3", "corrugated-4", "corrugated-5", "corrugated-6", "corrugated-7", "corrugated-8"], sourceUrl: `${SITE}/gallery/` },
      { id: "pillow", heading: "PILLOW", images: ["pillow-1", "pillow-2", "pillow-3", "pillow-4"], sourceUrl: `${SITE}/gallery/` },
      { id: "flat-panel", heading: "FLAT PANEL", images: ["flat-panel-2", "flat-panel-1"], sourceUrl: `${SITE}/gallery/` },
      { id: "onion", heading: "ONION", images: ["onion-1", "onion-2"], sourceUrl: `${SITE}/gallery/` },
    ],
    requiresClientVerification: ["Gallery images are 700×550 px (pillow: 700×409) – higher-resolution originals are needed for large layouts.", "No captions, locations or project names are published."],
    implemented: false,
  },

  downloads: {
    slug: "downloads",
    route: "/downloads",
    sourceUrl: `${SITE}/downloads/`,
    title: "Downloads",
    metaTitle: "Pioneer Water Tanks | Downloads",
    metaDescription: null,
    banner: "down-banner",
    headings: [
      { level: 2, text: "DOWNLOADS" },
      { level: 2, text: "Brochure" },
      { level: 2, text: "Technical Specifications" },
    ],
    sections: [
      { id: "brochure", heading: "Brochure", links: [{ label: "PWT Brochure", href: "/documents/PWT-Brochure.pdf" }], sourceUrl: `${SITE}/downloads/` },
      {
        id: "technical-specifications",
        heading: "Technical Specifications",
        links: downloads.filter((d) => d.type === "datasheet").map((d) => ({ label: d.title, href: d.localPath })),
        sourceUrl: `${SITE}/downloads/`,
      },
    ],
    implemented: false,
  },

  contact: {
    slug: "contact",
    route: "/contact",
    sourceUrl: `${SITE}/contact/`,
    title: "Contact",
    metaTitle: "Pioneer Water Tanks | contact",
    metaDescription: null,
    banner: "contact-banner",
    headings: [
      { level: 2, text: "CONTACT" },
      { level: 3, text: "GET IN TOUCH WITH US" },
      { level: 3, text: "CONTACT FORM" },
    ],
    sections: [
      {
        id: "get-in-touch",
        heading: "GET IN TOUCH WITH US",
        items: ["Pioneer Water Tanks L.L.C.", "M14 Mussafah Industrial Area", "P.O. Box 110810", "Abu Dhabi, UAE", "Phone: +971-2-555-1855", "E-mail: pwt@pioneertanks.ae", "Fax: +971-2-555-1755"],
        sourceUrl: `${SITE}/contact/`,
      },
      {
        id: "contact-form",
        heading: "CONTACT FORM",
        items: ["Name (required)", "E-mail (required)", "Phone Number (required)", "Subject", "Message", "Send"],
        notes: ["Contact Form 7 form on the live site, posting to the WordPress backend. The new site validates client-side and falls back to a pre-filled mailto: (no backend in this phase)."],
        sourceUrl: `${SITE}/contact/`,
      },
    ],
    requiresClientVerification: ["No WhatsApp number, mobile number, map location or business hours are published."],
    implemented: false,
  },

  /* ---------------- WordPress leftovers – recorded, not rendered ---------------- */
  "sample-page": {
    slug: "sample-page",
    route: "/sample-page",
    sourceUrl: `${SITE}/sample-page/`,
    title: "Sample Page",
    metaTitle: "Pioneer Water Tanks | Sample Page",
    metaDescription: null,
    headings: [{ level: 2, text: "SAMPLE PAGE" }],
    sections: [{ id: "body", body: ["Default WordPress sample page text (\"This is an example page…\")."], sourceUrl: `${SITE}/sample-page/` }],
    nonBusinessContent: true,
    requiresClientVerification: ["Delete from the live site."],
    implemented: false,
  },
  "hello-world": {
    slug: "hello-world",
    route: "/hello-world",
    sourceUrl: `${SITE}/hello-world/`,
    title: "Hello world!",
    metaTitle: "Pioneer Water Tanks | Hello world!",
    metaDescription: null,
    headings: [{ level: 2, text: "HELLO WORLD!" }],
    sections: [{ id: "body", body: ["Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"], sourceUrl: `${SITE}/hello-world/` }],
    nonBusinessContent: true,
    requiresClientVerification: ["Delete from the live site."],
    implemented: false,
  },
  "category-uncategorized": {
    slug: "category-uncategorized",
    route: "/category/uncategorized",
    sourceUrl: `${SITE}/category/uncategorized/`,
    title: "Uncategorized",
    metaTitle: "Pioneer Water Tanks | Uncategorized",
    metaDescription: null,
    headings: [],
    sections: [{ id: "body", body: ["Empty WordPress category archive."], sourceUrl: `${SITE}/category/uncategorized/` }],
    nonBusinessContent: true,
    implemented: false,
  },
  banners: {
    slug: "banners",
    route: "/banner",
    sourceUrl: `${SITE}/banner/pioneers-in-water-storage-solutions/`,
    title: "Homepage slider banners (3 posts)",
    metaTitle: "Pioneer Water Tanks | PIONEERS IN WATER STORAGE SOLUTIONS",
    metaDescription: null,
    headings: [{ level: 2, text: "PIONEERS IN WATER STORAGE SOLUTIONS" }],
    sections: [
      {
        id: "banners",
        body: ["Three 'banner' custom-post pages (…-solutions/, …-solutions-2/, …-solutions-3/) each containing the slider headline, sub-line and one image (ban01/ban02/ban03)."],
        images: ["ban01", "ban02", "ban03"],
        sourceUrl: `${SITE}/banner/pioneers-in-water-storage-solutions/`,
      },
    ],
    nonBusinessContent: true,
    implemented: false,
  },
  "theme-docs": {
    slug: "theme-docs",
    route: "/docs",
    sourceUrl: `${SITE}/docs/`,
    title: "Documentation (WordPress theme user manual)",
    metaTitle: "Pioneer Water Tanks | Documentation",
    metaDescription: null,
    headings: [{ level: 2, text: "DOCUMENTATION" }],
    sections: [
      {
        id: "user-manual",
        body: ["18 pages of theme user-manual documentation (Getting started; Front end: Home, About, Products, News, Gallery, Downloads, Contact; Admin end: Dashboard, Pages, Banners, News, Products, Contact, Theme options) with screenshots. Describes how to edit the 2018 WordPress site; contains no business information."],
        links: [
          { label: "/docs/user-manual/", href: `${SITE}/docs/user-manual/` },
          { label: "/docs/user-manual/getting-started/", href: `${SITE}/docs/user-manual/getting-started/` },
          { label: "/docs/user-manual/front-end/ (+7 sub-pages)", href: `${SITE}/docs/user-manual/front-end/` },
          { label: "/docs/user-manual/admin-end/ (+7 sub-pages)", href: `${SITE}/docs/user-manual/admin-end/` },
        ],
        sourceUrl: `${SITE}/docs/`,
      },
    ],
    nonBusinessContent: true,
    requiresClientVerification: ["Theme documentation is publicly reachable on the live site and should be removed or protected."],
    implemented: false,
  },
};

/* -------------------------------------------------------------------------- */
/* Product families                                                            */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').ProductFamily[]} */
const productFamilies = [
  {
    id: "steel-liner",
    name: "Steel Liner Tanks",
    tagline: "Cylindrical bolted steel tanks with an internal liner, corrugated or flat panel.",
    description: [
      "Cylindrical tanks that are either corrugated or flat.",
      "Popular for Potable water storage using an internal liner system.",
      "Used for Water Storage applications such as firefighting, mining and camp sites.",
    ],
    productSlugs: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"],
    image: "intro-img",
    sourceUrl: `${SITE}/`,
  },
  {
    id: "flexible",
    name: "Flexible Tanks",
    tagline: "Custom-made fabric tanks for water and diesel storage.",
    description: ["Custom-made to suit your needs. Our fabric tanks are can be used anywhere and in any way for both water and diesel storage purposes."],
    productSlugs: ["flexible-pvc-storage-tanks"],
    image: "flexible-tank",
    sourceUrl: `${SITE}/`,
  },
];

/* -------------------------------------------------------------------------- */
/* Capacity chart (brochure page 7)                                            */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').CapacityChart} */
const capacityChart = {
  source: "document",
  documentRef: "brochure",
  page: 7,
  title: "Gross Capacity Chart",
  note: "Net tank capacity depends on position and size of tank nozzles. Model/diameter pairing follows the row order printed in the brochure (the PDF text layer lists PWT-18 before PWT-17; sequential order is assumed – confirm with client).",
  unitsNote: "KL = kilolitre. 1 Cubic Meter = 1,000 Liter | 1 US Gallon = 3.785 Liter | 1 Imperial Gallon = 4.546 Liter",
  columns: [
    { ring: "R1", wallHeight: "1.14m" },
    { ring: "R2", wallHeight: "2.14m" },
    { ring: "R3", wallHeight: "3.17m" },
    { ring: "R4", wallHeight: "4.20m" },
    { ring: "R5", wallHeight: "5.24m" },
    { ring: "R6", wallHeight: "6.28m" },
    { ring: "R7", wallHeight: "7.31m" },
    { ring: "R8", wallHeight: "8.35m" },
    { ring: "R9", wallHeight: "9.39m" },
  ],
  rows: [
    { model: "PWT-04", diameter: "2.73m", capacities: ["7KL", "12KL", null, null, null, null, null, null, null] },
    { model: "PWT-05", diameter: "3.41m", capacities: ["10KL", "20KL", "29KL", null, null, null, null, null, null] },
    { model: "PWT-06", diameter: "4.09m", capacities: ["15KL", "28KL", "42KL", "55KL", null, null, null, null, null] },
    { model: "PWT-07", diameter: "4.78m", capacities: ["18KL", "38KL", "57KL", "75KL", "94KL", null, null, null, null] },
    { model: "PWT-08", diameter: "5.46m", capacities: ["27KL", "50KL", "74KL", "98KL", "123KL", null, null, null, null] },
    { model: "PWT-09", diameter: "6.14m", capacities: ["34KL", "63KL", "94KL", "125KL", "155KL", "186KL", null, null, null] },
    { model: "PWT-10", diameter: "6.82m", capacities: ["42KL", "78KL", "116KL", "154KL", "192KL", "230KL", "267KL", null, null] },
    { model: "PWT-11", diameter: "7.51m", capacities: ["50KL", "94KL", "140KL", "186KL", "232KL", "278KL", "324KL", null, null] },
    { model: "PWT-12", diameter: "8.19m", capacities: ["60KL", "112KL", "167KL", "222KL", "276KL", "331KL", "385KL", "440KL", null] },
    { model: "PWT-13", diameter: "8.87m", capacities: ["70KL", "132KL", "196KL", "260KL", "324KL", "388KL", "452KL", "516KL", null] },
    { model: "PWT-14", diameter: "9.55m", capacities: ["82KL", "152KL", "227KL", "301KL", "376KL", "450KL", "524KL", "598KL", null] },
    { model: "PWT-15", diameter: "10.24m", capacities: ["94KL", "176KL", "261KL", "346KL", "431KL", "516KL", "602KL", "687KL", "773KL"] },
    { model: "PWT-16", diameter: "10.92m", capacities: ["107KL", "200KL", "297KL", "394KL", "491KL", "588KL", "685KL", "781KL", "879KL"] },
    { model: "PWT-17", diameter: "11.60m", capacities: ["121KL", "226KL", "335KL", "445KL", "554KL", "663KL", "773KL", "882KL", "993KL"] },
    { model: "PWT-18", diameter: "12.28m", capacities: ["136KL", "252KL", "376KL", "498KL", "621KL", "744KL", "866KL", "989KL", "1,113KL"] },
    { model: "PWT-19", diameter: "12.97m", capacities: ["151KL", "283KL", "419KL", "555KL", "692KL", "829KL", "965KL", "1,102KL", "1,240KL"] },
    { model: "PWT-20", diameter: "13.65m", capacities: ["167KL", "312KL", "464KL", "615KL", "767KL", "918KL", "1,070KL", "1,221KL", "1,374KL"] },
    { model: "PWT-21", diameter: "14.33m", capacities: ["184KL", "344KL", "512KL", "678KL", "845KL", "1,012KL", "1,179KL", "1,346KL", "1,515KL"] },
    { model: "PWT-22", diameter: "15.01m", capacities: ["202KL", "379KL", "562KL", "744KL", "928KL", "1,111KL", "1,294KL", "1,477KL", "1,662KL"] },
    { model: "PWT-23", diameter: "15.70m", capacities: ["221KL", "415KL", "614KL", "814KL", "1,014KL", "1,214KL", "1,415KL", "1,615KL", "1,817KL"] },
    { model: "PWT-24", diameter: "16.38m", capacities: ["240KL", "450KL", "668KL", "886KL", "1,104KL", "1,322KL", "1,540KL", "1,758KL", "1,978KL"] },
    { model: "PWT-25", diameter: "17.06m", capacities: ["261KL", "488KL", "725KL", "961KL", "1,198KL", "1,435KL", "1,671KL", "1,908KL", "2,147KL"] },
    { model: "PWT-26", diameter: "17.74m", capacities: ["282KL", "528KL", "784KL", "1,040KL", "1,296KL", "1,552KL", "1,808KL", "2,064KL", "2,322KL"] },
    { model: "PWT-27", diameter: "18.43m", capacities: ["304KL", "569KL", "846KL", "1,125KL", "1,397KL", "1,673KL", "1,949KL", "2,225KL", "2,504KL"] },
    { model: "PWT-28", diameter: "19.11m", capacities: ["327KL", "612KL", "910KL", "1,206KL", "1,503KL", "1,800KL", "2,096KL", "2,393KL", "2,693KL"] },
    { model: "PWT-29", diameter: "19.79m", capacities: ["351KL", "657KL", "976KL", "1,294KL", "1,612KL", "1,930KL", "2,249KL", "2,567KL", "2,889KL"] },
    { model: "PWT-30", diameter: "20.47m", capacities: ["376KL", "703KL", "1,044KL", "1,384KL", "1,725KL", "2,066KL", "2,407KL", "2,747KL", "3,091KL"] },
    { model: "PWT-31", diameter: "21.16m", capacities: ["401KL", "747KL", "1,115KL", "1,478KL", "1,842KL", "2,206KL", "2,570KL", "2,934KL", "3,301KL"] },
  ],
};

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

const CORRUGATED_URL = `${SITE}/product/corrugated-zincalum-steel/`;
const FLAT_URL = `${SITE}/product/flat-panel-hdg-steel/`;
const FLEX_URL = `${SITE}/product/flexible-pvc-storage-tanks/`;

/** Shared steel-tank benefit list (web: corrugated page; also brochure page 4). */
const steelBenefits = [
  "Lower capital investment.",
  "Investment Protection - PWT tanks can be relocated when required.",
  "Minimal foundation requirements offering cost savings.",
  "Design flexibility – variable diameter and height combinations up to 3,300m³.",
  "Knock-down modular design ideal for remote areas.",
  "Lower transportation costs – Multiple PWT tanks can be packed into a sea container.",
  "Faster installation time at lower cost.",
  "Negligible maintenance costs - leakage, corrosion, cracking are all eliminated.",
  "Water-tight liner, corrosion-free water storage.",
  "10 Year warranty, 25 Year design life.",
];

/** @type {import('../types/content').Product[]} */
const products = [
  {
    slug: "corrugated-zincalum-steel",
    name: "Corrugated Zincalume Steel Liner Tanks",
    shortName: "Corrugated Zincalume Steel",
    family: "steel-liner",
    series: ["PLT", "PWT tank series"],
    summary: "Cylindrical-shaped, modular-built, bolted steel water storage tanks with an internal liner covered by a dome roof.",
    description: [
      "The PWT tank shell is constructed using Zincalume steel corrugated panels bolted together to form a robust cylindrical structure.",
      "The PWT tank shell is built in ring layers with varying diameters up to 21 meters and heights up to 9.4 meters giving our clients a wide selection of capacities from 30m³ to 3,300m³.",
      "PWT tanks are designed for fast assembly and dismantling. It takes less than six days to install a 500m³ capacity tank without the need for heavy lifting equipment.",
    ],
    features: [
      {
        title: "Rigid construction",
        body: "The PWT tank shell is constructed using Zincalume steel corrugated panels bolted together to form a robust cylindrical structure. The PWT dome roof is self supporting on the tank shell without the requirement of any ground columns. The roof consists of a series of hot-dipped galvanized trusses that will be further protected with epoxy paint for raw water or aggressive liquid applications. Overlapped Zincalume steel sheets are deployed over the roof trusses and a special seal is introduced around the roof circumference to prevent influx of airborne pollutants into the stored water. A roof-mounted dynamic ventilator fitted with insect mesh ensures that the tank breathes and prevents vapour build up.",
        source: "web",
      },
      {
        title: "High corrosion resistance",
        body: "PWT tank walls and roof sheets are made using Zincalume coated steel (Zinc / Aluminium alloy). Zincalume is factory-applied using a thermosetting process to ensure proper adhesion of the protective layers. Zincalume steel combines superior corrosion resistance of Aluminium with protective qualities of Zinc thus providing remarkable anti-corrosion properties, four times more than that of hot-dipped galvanized coatings. Zincalume readily accepts additional coatings in a wide range of colours for landscaping and aesthetic requirements.",
        source: "web",
      },
      {
        title: "Size flexibility",
        body: "The PWT tank shell is built in ring layers with varying diameters up to 21 meters and heights up to 9.4 meters giving our clients a wide selection of capacities from 30m³ to 3,300m³.",
        source: "web",
      },
      {
        title: "Ideal for remote areas",
        body: "PWT tanks are designed for fast assembly and dismantling. It takes less than six days to install a 500m³ capacity tank without the need for heavy lifting equipment.",
        source: "web",
      },
      {
        title: "Fibre reinforced liner",
        body: "The water in a PWT tank is stored in a one piece, fiber-reinforced, PVC-coated Polyester liner rated for potable water storage. This water-tight liner ensures the stored liquid does not contact the tank shell. There is no requirement for a steel floor as the liner rests on a compacted clean sand base within the concrete ring beam foundation. Liner material is UV stabilized and algae resistant. Tank liners are custom-welded to fit PWT tanks and will store liquids with temperatures up to 70º C and a pH range of 5-10. PWT liners are tested to the Australian standard AS4020 “Products for use in contact with drinking water” and comply with various International standards for storage of potable water.",
        source: "document",
        documentRef: "brochure",
      },
      {
        title: "Ring beam foundation",
        body: "Pioneer water tanks are installed over a reinforced concrete ring beam foundation filled with compacted clean sand. Ring Beam preparation is fast and simple and offers significant cost savings when compared to other tank type foundations.",
        source: "document",
        documentRef: "brochure",
      },
      {
        title: "Jacking system",
        body: "Taller tanks can be installed using our innovative Jacking System allowing fast and safe installation without the need for scaffolding or lifting equipment. The tank is built at ground level starting with the roof structure over the top ring. Next, the lower rings are progressively installed building the tank from top to bottom allowing the tank to be constructed significantly faster than traditional construction methods.",
        source: "document",
        documentRef: "brochure",
      },
    ],
    benefits: steelBenefits,
    applications: [
      "PWT tanks are ideally suited for storage of potable water, effluent, treated waste water as well as brackish water and sea water.",
      "PWT tanks are often used for Military or Labor Camps, Mining, Fire Protection, Waste Water and Sewage Treatment Plants, Irrigation, Desalination Plants, Demineralized Water for Power Plants, Fish and Shrimp Aquaculture.",
    ],
    keyFacts: [
      { label: "Diameter", value: "up to 21 m", source: "web" },
      { label: "Height", value: "up to 9.4 m", source: "web" },
      { label: "Capacity", value: "30 – 3,300 m³", source: "web" },
      { label: "Install time", value: "< 6 days for 500 m³", source: "web" },
      { label: "Warranty", value: "10-year conditional", source: "web" },
      { label: "Design life", value: "25 years", source: "web" },
    ],
    specifications: [
      { label: "Description", value: "Cylindrical-shaped, Modular-built, Bolted Steel Water storage tanks with internal Liner covered by a Dome Roof.", source: "web" },
      { label: "Wall structure", value: "Zincalume G300 steel panels (Zinc / Aluminium Alloy) with special corrugated profile. Panels are overlapped in both horizontal and vertical directions for increased rigidity, and connected using high tensile bolts with protective caps. Wall panels are multi-laminated to increase resistance to hydrostatic pressure in taller tanks.", source: "web" },
      { label: "Protective coating", value: "Tank panels and roof sheets are made of Zincalume steel, Grade AZ150. This is a hard-wearing, thermo-set coating of 150 gr/m² deposit.", source: "web" },
      { label: "Bolting specification", value: "Hot-Dipped Galvanized, high tensile steel bolts, Grade 8.8, diameter M12 for the tank body and M16 for nozzles.", source: "web", note: "The PLT datasheet states M10 and M12 for the tank body and M16 for fittings." },
      { label: "Roof panels", value: "Zincalume G550 corrugated steel, 0.50mm thick with a compressed foam perimeter seal.", source: "web" },
      { label: "Roof trusses", value: "Hot-Dipped Galvanized steel tube sections to European standard BS-EN-ISO-1461. The roof trusses shall be self-supporting with no ground columns and bolted to the tank wall.", source: "web", note: "The PLT datasheet describes the trusses as hot-dip galvanised steel tubular sections with coating Grade AZ 200." },
      { label: "Tank liner", value: "A high-tear resistant, one-piece heavy duty, Reinforced PVC-Polyester liner shall be installed inside the tank to contain the stored liquid. The liner shall have an internal woven scrim for reinforcement, with a minimum tensile strength of 3000N per 5cm in the Warp direction and shall have a minimum coated-weight of 650gr/m². The Liner shall be suitable for liquid storage with a pH range of 5-10. Liner is to be rated for the storage of potable water with a relevant test certificate to the Australian Standard AS4020:1999.", source: "web", note: "The PLT datasheet gives 2600N per 5cm, 680gr/m², pH 4-11 and standard AS 2070.2-1992. Client to confirm the current liner specification." },
      { label: "Nozzles", value: "Tank nozzles and fittings shall be of Hot-Dipped Galvanized (HDG) steel with an outer flange connection to external piping systems. Tanks shall be supplied with an overflow, downpipe and a scour drain.", source: "web" },
      { label: "Foundation", value: "Tanks shall be designed for installation onto a reinforced concrete ring beam foundation encasing a clean compacted sand base.", source: "web" },
      { label: "Warranty", value: "Tanks to be covered by a 10-Year conditional Warranty.", source: "web" },
      { label: "Liner temperature rating", value: "Liquids with temperatures up to 70 ºC.", source: "document", documentRef: "brochure" },
    ],
    accessories: [
      "External Ladder with safety cage for tanks above 4.0m off the ground (HDG)",
      "Lockable Roof Access Hatch with Platform and Handrail (HDG)",
      "Full-Length Level Indicator with HDG Column",
      "Roof Ventilator – Dynamic Type (Whirlybird or similar)",
    ],
    foundation: ["Tanks shall be designed for installation onto a reinforced concrete ring beam foundation encasing a clean compacted sand base."],
    warranty: "10-Year conditional warranty",
    designLife: "25 years",
    capacityChart,
    images: ["product-banner", "intro-img", "corrugated-1", "corrugated-2", "corrugated-3", "corrugated-4", "corrugated-5", "corrugated-6", "corrugated-7", "corrugated-8", "bt01", "second", "th", "ban01"],
    documents: ["datasheet-corrugated-plt", "brochure"],
    sourceUrl: CORRUGATED_URL,
    route: "/product/corrugated-zincalum-steel",
    verificationNotes: [
      "Live page displays 'Coming Soon…' above the content and uses flexible-tank photos (pillow/onion) instead of steel tank photos.",
      "Capacity units on the live page and brochure text layer read 'm' where 'm³' is meant (superscript lost in HTML/PDF); corrected to m³ here.",
      "Bolt sizes, truss coating and liner figures differ between the web page and the PLT datasheet (see specification notes).",
      "Brand spelling: the site writes 'Zincalum'; the datasheets and brochure use the registered name 'ZINCALUME®'.",
    ],
  },

  {
    slug: "flat-panel-hdg-steel",
    name: "Flat Panel Hot-Dip Galvanised Steel Liner Tanks",
    shortName: "Flat Panel HDG Steel",
    family: "steel-liner",
    series: ["PFP"],
    summary: "Cylindrical-shaped, modular-built, bolted steel water storage tanks with internal liner. Fitted with a dome roof, or open-top for special applications.",
    description: [
      "Cylindrical-shaped, Modular-built, Bolted Steel Water storage tanks with internal liner.",
      "Tanks are fitted with a Dome Roof structure to protect the stored liquids or kept with no roof (open-top) for special applications.",
      "Tank wall panels are made of high-grade flat steel plates, curved and shaped to tank diameter. Holes for bolted connections are done with CNC laser-cutting machine for high accuracy.",
    ],
    features: [
      { title: "CNC laser-cut flat panels", body: "Tank wall panels are made of high-grade flat steel plates, curved and shaped to tank diameter. Holes for bolted connections are done with CNC laser-cutting machine for high accuracy.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { title: "Hot-dip galvanised corrosion treatment", body: "Steel Flat panels are protected with a factory applied Hot-Dip Galvanized treatment to min 450 gr/m². Further application of Epoxy & Polyurethane paint coats is also available for high-corrosive storage applications.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { title: "Dome roof or open-top", body: "Tanks are fitted with a Dome Roof structure to protect the stored liquids or kept with no roof (open-top) for special applications.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { title: "Enclosed bolting", body: "Hot-Dip Galvanized, high tensile steel bolts, Grade 8.8, are used for the tank wall panels and tank fittings. Bolts are placed inside fully enclosed covers.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
    ],
    benefits: steelBenefits,
    applications: [
      "PWT tanks are ideally suited for storage of potable water, effluent, treated waste water as well as brackish water and sea water.",
      "Further application of Epoxy & Polyurethane paint coats is also available for high-corrosive storage applications.",
    ],
    keyFacts: [
      { label: "Galvanising", value: "min 450 g/m² HDG", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Liner tensile strength", value: "4300 N / 5 cm", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Liner pH range", value: "3 – 11", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Roof", value: "Dome or open-top", source: "document", documentRef: "datasheet-flat-panel-pfp" },
    ],
    specifications: [
      { label: "Description", value: "Cylindrical-shaped, Modular-built, Bolted Steel Water storage tanks with internal liner. Tanks are fitted with a Dome Roof structure to protect the stored liquids or kept with no roof (open-top) for special applications.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Wall panels", value: "Tank wall panels are made of high-grade flat steel plates, curved and shaped to tank diameter. Holes for bolted connections are done with CNC laser-cutting machine for high accuracy.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Corrosion treatment", value: "Steel Flat panels are protected with a factory applied Hot-Dip Galvanized treatment to min 450 gr/m². Further application of Epoxy & Polyurethane paint coats is also available for high-corrosive storage applications.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Bolting specification", value: "Hot-Dip Galvanized, high tensile steel bolts, Grade 8.8, are used for the tank wall panels and tank fittings. Bolts are placed inside fully enclosed covers.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Roof trusses", value: "Made of welded-steel tubular sections with Hot-Dip galvanized coating Grade AZ 200. Roof trusses shall be bolted to tank wall and shall be self-supporting without any ground columns.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Roof panels", value: "Aluzinc corrugated steel sheets, 0.50mm thick, are deployed over the roof trusses and joined using HDG Tek-screws.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Tank liner", value: "A high tear resistant, one-piece heavy duty, Reinforced PVC-Polyester liner shall be installed inside the tank to contain the stored liquid. The liner shall have an internal woven scrim for reinforcement, with a tensile strength of 4300N per 5cm in the Warp direction and a coated weight of 930gr/m². The Liner is suitable for liquid storage with a pH range of 3-11 and is also rated for the storage of potable water with a relevant test certificate to “DIN EN 12873-1: 20” European Standard.", source: "document", documentRef: "datasheet-flat-panel-pfp", note: "Standard reference is printed truncated as 'DIN EN 12873-1: 20' in the datasheet." },
      { label: "Nozzles", value: "Tank nozzles and fittings shall be of Hot Dip Galvanized (HDG) steel with an outer flange connection to external piping systems. Tanks shall be supplied with an overflow with downpipe and a scour drain.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
      { label: "Foundation", value: "Tanks shall be designed for installation onto a reinforced concrete ring beam foundation encasing a clean compacted sand base. Steel Hold-down brackets shall be bolted to the tank walls and fixed to the ring beam using expansion bolts. Tanks up to 2.2m in height may be positioned on a compacted sand pad with gravel protection outside the tank wall.", source: "document", documentRef: "datasheet-flat-panel-pfp" },
    ],
    accessories: [
      "All tanks are fitted with External Ladders (HDG). A safety cage is added for tanks above 4.0m in height.",
      "Lockable Roof Access Hatch with platform and handrail (HDG).",
      "Full-Length Level Indicator with HDG column.",
      "Roof Ventilator to be of Dynamic type (Whirlybird or similar).",
    ],
    foundation: [
      "Tanks shall be designed for installation onto a reinforced concrete ring beam foundation encasing a clean compacted sand base.",
      "Steel Hold-down brackets shall be bolted to the tank walls and fixed to the ring beam using expansion bolts.",
      "Tanks up to 2.2m in height may be positioned on a compacted sand pad with gravel protection outside the tank wall.",
    ],
    warranty: undefined,
    images: ["flat-panel-2", "flat-panel-1"],
    documents: ["datasheet-flat-panel-pfp", "brochure"],
    sourceUrl: FLAT_URL,
    route: "/product/flat-panel-hdg-steel",
    verificationNotes: [
      "The live product page contains only 'Coming Soon…' followed by flexible-tank copy pasted by mistake; every fact above comes from the PFP datasheet.",
      "No capacity range, dimensions or warranty period are published for the flat panel series – client to supply.",
      "Only two photos (700×550) exist for this product.",
    ],
  },

  {
    slug: "flexible-pvc-storage-tanks",
    name: "Flexible PVC Storage Tanks",
    shortName: "Flexible PVC Storage Tanks",
    family: "flexible",
    series: ["FLT", "OLT"],
    summary: "Custom-made collapsible fabric tanks up to 300 m³, most commonly Pillow (bladder) and self-erecting Onion tanks, rated for potable water and, with special fabric, diesel.",
    description: [
      "These Flexible tanks are manufactured by us here in the UAE and we can do them in a variety of shapes and sizes most popular being the Pillow Tanks, or bladder tanks, and the self-erecting Onion Tanks.",
      "Pioneer manufactures a range of quality flexible storage tanks with sizes up to 300m³ capacity in a variety of shapes and sizes, the most common being Pillow and Onion tanks.",
      "Pioneer ‘Flexi-tanks’ are manufactured using high strength reinforced industrial fabrics of European origin that are UV stabilized, algae-resistant and have excellent abrasion tolerances. Pioneer Flexi-tanks are suited for hot temperatures and harsh climates.",
      "Pioneer Flexi-tanks are rated for storage of potable water, diesel and other petro-chemical products. Tanks are ready-for-use on deployment, are fully collapsible and readily transportable making it ideally suited for use in remote areas, military operations and disaster relief applications.",
    ],
    features: [
      { title: "Compact, light-weight and durable", body: "Compact, light-weight and durable.", source: "web" },
      { title: "Fully collapsible", body: "Fully collapsible, foldable and transportable.", source: "web" },
      { title: "Quick to deploy", body: "Quickly deployed and Easy to relocate.", source: "web" },
      { title: "High-strength fabric", body: "High strength industrial fabric, up to 1,300GSM, with excellent abrasion resistance.", source: "web" },
      { title: "Weather resistant", body: "Highly resistance to UV, hot temperatures and harsh weather conditions.", source: "web" },
      { title: "Non-corrosive", body: "Non-corrosive as the tank and fittings have no steel components.", source: "web" },
    ],
    benefits: [],
    applications: [
      "Suitable for potable water storage as fabric used resists fungi and inhibits algae.",
      "Ideal for water storage applications in remote and difficult to access area.",
      "Relief & Aid agencies, Military, Fire Fighting, Water Transportation and Water Containment.",
      "Special fabric available for storage of Diesel fuel and other liquid hydrocarbons.",
    ],
    keyFacts: [
      { label: "Capacity", value: "up to 300 m³ (pillow)", source: "web" },
      { label: "Onion tanks", value: "up to 50 m³", source: "document", documentRef: "datasheet-onion-olt" },
      { label: "Fabric", value: "up to 1,300 GSM", source: "web" },
      { label: "Temperature", value: "-30 °C to +100 °C", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Warranty", value: "12-month conditional", source: "document", documentRef: "datasheet-pillow-flt" },
    ],
    specifications: [
      { label: "Description", value: "Flexi-Tanks are manufactured from European-made, PVC/Polyester fabrics, and are rated for the storage of potable water. We custom-make the tanks in any Pillow-shape to suit any specifications and dimensional requirements.", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Liner / fabric", value: "Heavy Duty, PVC Coated Reinforced Woven Fabric. It is manufactured with special prime grade resins blended with a highly stabilized and advanced UV antioxidant formulation giving the geo-membrane superior physical, mechanical, and endurance properties. The Liner is suitable for liquid storage with a pH range of 5-10. Liner is to be rated for the storage of potable water with a relevant test certificate to the Australian Standard AS4020:1999.", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Flexibility", value: "Pioneer Flexi-tanks are custom-made in capacities up to 300m³. Fully collapsible and performance is enhanced by outstanding flex resistance, abrasion resistance and chemical resistance. Pioneer Flexi-tanks are used to store liquids with temperatures of -30°C up to +100°C.", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Application", value: "Pioneer Flexi-tanks are certified for the storage of potable water and raw water. Special fabrics are also available for the storage of diesel and other petro-chemical products. Tanks are ideally suited for use in remote areas, military zones and disaster relief operations.", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Clamps", value: "Clamps are used to hold the edges of the Tank using Hot-Dip Galvanized, high tensile steel bolts, Grade 8.8 and Angled steel plates.", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Valve / nozzles", value: "Tank nozzles and fittings shall be of High-Density PolyEthylene (HDPE) with an outer flange connection to external piping systems. These components are non-corrosive and are natural spark arrestors.", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Accessories", value: "High Quality Glass Fibre Reinforced Nylon Ball Valve with pressure rating of 16Bar. Corrosion resistant and UV Stabilized. Pioneer Flexi-tanks are supplied with a sturdy Ground-Protection sheet for longevity, and are usually fitted with one HDPE threaded inlet, HDPE outlet with valve, and HDPE vent with cap.", source: "document", documentRef: "datasheet-pillow-flt" },
      { label: "Warranty", value: "Tanks to be covered by 12-Month Conditional Warranty.", source: "document", documentRef: "datasheet-pillow-flt" },
    ],
    accessories: [
      "High Quality Glass Fibre Reinforced Nylon Ball Valve with pressure rating of 16Bar. Corrosion resistant and UV Stabilized.",
      "Sturdy Ground-Protection sheet.",
      "One HDPE threaded inlet, HDPE outlet with valve, and HDPE vent with cap.",
    ],
    warranty: "12-Month conditional warranty",
    variants: [
      {
        id: "pillow-flt",
        name: "Pillow Tanks (FLT series)",
        series: "FLT",
        summary: "Custom-made pillow / bladder tanks up to 300 m³, for potable water, raw water and – with special fabric – diesel and petro-chemical products.",
        specifications: [
          { label: "Capacity", value: "Custom-made in capacities up to 300m³.", source: "document", documentRef: "datasheet-pillow-flt" },
          { label: "Fabric", value: "Heavy Duty, PVC Coated Reinforced Woven Fabric; pH range 5-10; potable-water test certificate to AS4020:1999.", source: "document", documentRef: "datasheet-pillow-flt" },
          { label: "Temperature", value: "-30°C up to +100°C.", source: "document", documentRef: "datasheet-pillow-flt" },
          { label: "Clamps", value: "Hot-Dip Galvanized Grade 8.8 bolts and angled steel plates.", source: "document", documentRef: "datasheet-pillow-flt" },
          { label: "Fittings", value: "HDPE nozzles with outer flange; glass-fibre reinforced nylon ball valve rated 16 bar.", source: "document", documentRef: "datasheet-pillow-flt" },
          { label: "Warranty", value: "12-Month Conditional Warranty.", source: "document", documentRef: "datasheet-pillow-flt" },
        ],
        documents: ["datasheet-pillow-flt"],
        images: ["pillow-tank", "flexible-tank", "pillow-1", "pillow-2", "pillow-3", "pillow-4"],
      },
      {
        id: "onion-olt",
        name: "Onion Tanks (OLT series)",
        series: "OLT",
        summary: "Self-erecting open-top onion tanks up to 50 m³ with protective top cover, for potable and raw water in remote areas, military zones and disaster relief.",
        specifications: [
          { label: "Description", value: "Flexi-Tanks are manufactured from European-made, PVC/Polyester fabrics, and are rated for the storage of potable water. We custom-make these tanks to suit your specifications and dimensional requirements.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Fabric", value: "Heavy Duty, PVC Coated Reinforced Polyester Woven Fabric with a highly stabilized and advanced UV antioxidant formulation. Coated weight is 930 g/m². Suitable for a pH range of 5-10; potable-water test certificate to recognized European Standards.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Capacity", value: "Custom-made in capacities up to 50m³.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Temperature", value: "-30°C up to +100°C.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Application", value: "Certified for the storage of potable water and raw water. Ideally suited for use in remote areas, military zones and disaster relief operations.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Cover", value: "Top cover is used to protect the stored water from outside elements.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Nozzles & valves", value: "HDPE nozzles with outer threaded connection (non-corrosive); glass nylon ball valve rated 16 bar, corrosion resistant and UV stabilized.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Ground sheet", value: "Sturdy Ground-Protection sheet; usually fitted with one HDPE threaded inlet, HDPE with valve, and HDPE vent with cap.", source: "document", documentRef: "datasheet-onion-olt" },
          { label: "Warranty", value: "12-Month conditional Warranty.", source: "document", documentRef: "datasheet-onion-olt" },
        ],
        documents: ["datasheet-onion-olt"],
        images: ["onion-tanks", "onion-1", "onion-2"],
      },
    ],
    images: ["flexible-tank", "pillow-tank", "onion-tanks", "pillow-1", "pillow-2", "pillow-3", "pillow-4", "onion-1", "onion-2"],
    documents: ["datasheet-pillow-flt", "datasheet-onion-olt", "brochure"],
    sourceUrl: FLEX_URL,
    route: "/product/flexible-pvc-storage-tanks",
    verificationNotes: [
      "Web copy says fabric 'up to 1,300GSM'; datasheets state 930 g/m² coated weight – confirm.",
      "Onion tank capacity (up to 50 m³) comes from the OLT datasheet only.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Applications (brochure page 5 + product pages)                             */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').Application[]} */
const applications = [
  { id: "agriculture-landscaping", name: "Agriculture & Landscaping", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "labour-military-camps", name: "Labour & Military Camps", description: "Military or Labor Camps", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel", "flexible-pvc-storage-tanks"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "fire-fighting", name: "Fire Fighting Systems", description: "Fire Protection", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel", "flexible-pvc-storage-tanks"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "aquaculture", name: "Aquaculture", description: "Fish and Shrimp Aquaculture", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "ready-mix", name: "Ready Mix Plants", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "desalination", name: "Water Desalination", description: "Desalination Plants", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "industrial-mining", name: "Industrial & Mining", description: "Mining; Demineralized Water for Power Plants", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "poultry-animal-farms", name: "Poultry & Animal Farms", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "document", sourceUrl: downloads[0].sourceUrl },
  { id: "wastewater", name: "Waste Water & Sewage Treatment", description: "Waste Water and Sewage Treatment Plants; effluent and treated waste water", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "web", sourceUrl: CORRUGATED_URL },
  { id: "irrigation", name: "Irrigation", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel"], source: "web", sourceUrl: CORRUGATED_URL },
  { id: "potable-water", name: "Potable Water Storage", description: "Potable water, brackish water and sea water storage", products: ["corrugated-zincalum-steel", "flat-panel-hdg-steel", "flexible-pvc-storage-tanks"], source: "web", sourceUrl: CORRUGATED_URL },
  { id: "relief-aid", name: "Relief & Aid Agencies", description: "Disaster relief operations", products: ["flexible-pvc-storage-tanks"], source: "web", sourceUrl: FLEX_URL },
  { id: "water-transport", name: "Water Transportation & Containment", products: ["flexible-pvc-storage-tanks"], source: "web", sourceUrl: FLEX_URL },
  { id: "diesel-fuel", name: "Diesel & Liquid Hydrocarbon Storage", description: "Special fabric available for storage of Diesel fuel and other liquid hydrocarbons", products: ["flexible-pvc-storage-tanks"], source: "web", sourceUrl: FLEX_URL },
];

/* -------------------------------------------------------------------------- */
/* Certifications (as read from the scanned images on /licenses/)              */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').Certification[]} */
const certifications = [
  {
    id: "iso-9001",
    name: "ISO 9001:2008 Quality Management System",
    issuer: "Quality Registrar Systems (QRS), United Arab Emirates",
    details: [
      "Certificate of Assessment awarded to Pioneer Water Tanks LLC, P.O. Box 110810, Plot 57, M-14, Mussafah, Abu Dhabi, UAE.",
      "Scope of work: importing and fabrication of tanks and reservoirs; onshore and offshore oil and gas fields and facilities services.",
      "Certificate No. AAU-1372. Originally registered 04 Feb 2016; latest issue 25 Feb 2017; valid up to 03 Feb 2018.",
    ],
    image: "pwt-iso-certificate",
    sourceUrl: `${SITE}/licenses/`,
    originalLabel: "PWT-ISO-Certificate",
    verificationNotes: ["Certificate expired 03 Feb 2018 and ISO 9001:2008 has been withdrawn. A current ISO 9001:2015 certificate must be supplied before the new site claims ISO certification."],
  },
  {
    id: "commercial-licence",
    name: "Commercial Licence – Abu Dhabi Department of Economic Development",
    issuer: "Abu Dhabi Department of Economic Development / Abu Dhabi Business Center",
    details: [
      "Trade name: Pioneer Water Tanks LLC. Legal form: Limited Liability Company. Licence No. CN-1006186; ADCCI No. 230463.",
      "Establishment date 13/06/2007; issue date 19/10/2017; expiry date 18/10/2018.",
      "Commercial activities: retail sale of tanks and reservoirs; onshore and offshore oil and gas fields and facilities services; importing; oil tanks installation and repair.",
    ],
    image: "pwt-license-18-10",
    sourceUrl: `${SITE}/licenses/`,
    originalLabel: "PWT-LICENSE---18.10",
    verificationNotes: ["Licence copy expired 18/10/2018 – a current copy is needed.", "Establishment date on the licence (2007) differs from the 'since 1993' claim on the site; the company may have operated under an earlier entity."],
  },
  {
    id: "ten-year-warranty",
    name: "Pioneer Water Tanks Ten Year Warranty",
    issuer: "Pioneer Water Tanks LLC",
    details: [
      "Pioneer warrants the steel structure and the liner membrane against defects in material and/or workmanship for a period of ten years from the date of installation.",
      "Conditional on installation on a reinforced concrete slab or ring beam to Pioneer specifications, a Pioneer steel dome roof, installation by Pioneer personnel or authorised installers, regular maintenance per the Pioneer Maintenance Manual, and payment received in full.",
      "Liability follows a reducing linear sliding scale: 100% of the replacement part's original purchase value in year one, reducing to 10% in year ten.",
    ],
    image: "pioneer-warranty-2017-pq",
    sourceUrl: `${SITE}/licenses/`,
    originalLabel: "Pioneer-Warranty-2017---PQ",
    verificationNotes: ["The published image is a SAMPLE warranty certificate (TBA fields)."],
  },
];

/* -------------------------------------------------------------------------- */
/* News                                                                        */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').NewsArticle[]} */
const news = [
  {
    slug: "nemo-enim-ipsam-voluptatem-quia",
    title: "The launch of our new Website",
    dateLabel: "Apr 24",
    isoDate: "2018-04-24",
    excerpt: "Pioneer Water Tanks (PWT) introduces you to our range of steel storage tanks. Corrugated and Flat bolted liner tanks.",
    body: ["Pioneer Water Tanks (PWT) introduces you to our range of steel storage tanks. Corrugated and Flat bolted liner tanks are what we manufacture and distribute in the region."],
    image: "site-img",
    sourceUrl: `${SITE}/news/nemo-enim-ipsam-voluptatem-quia/`,
    route: "/news/the-launch-of-our-new-website",
    flags: ["URL slug is lorem-ipsum placeholder text.", "Year inferred from the uploads folder (2018/04); only 'Apr 24' is shown.", "Only news item on the site; announces the 2018 website which this project replaces."],
  },
];

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').GalleryGroup[]} */
const gallery = [
  { id: "corrugated", name: "Corrugated", images: ["corrugated-1", "corrugated-2", "corrugated-3", "corrugated-4", "corrugated-5", "corrugated-6", "corrugated-7", "corrugated-8"] },
  { id: "pillow", name: "Pillow", images: ["pillow-1", "pillow-2", "pillow-3", "pillow-4"] },
  { id: "flat-panel", name: "Flat Panel", images: ["flat-panel-2", "flat-panel-1"] },
  { id: "onion", name: "Onion", images: ["onion-1", "onion-2"] },
];

/* -------------------------------------------------------------------------- */
/* Site metadata                                                               */
/* -------------------------------------------------------------------------- */

const themeDocPages = [
  "/docs/",
  "/docs/user-manual/",
  "/docs/user-manual/getting-started/",
  "/docs/user-manual/front-end/",
  "/docs/user-manual/front-end/home/",
  "/docs/user-manual/front-end/about/",
  "/docs/user-manual/front-end/products/",
  "/docs/user-manual/front-end/news/",
  "/docs/user-manual/front-end/gallery/",
  "/docs/user-manual/front-end/downloads/",
  "/docs/user-manual/front-end/contact/",
  "/docs/user-manual/admin-end/",
  "/docs/user-manual/admin-end/dashboard/",
  "/docs/user-manual/admin-end/pages/",
  "/docs/user-manual/admin-end/banners/",
  "/docs/user-manual/admin-end/news/",
  "/docs/user-manual/admin-end/products/",
  "/docs/user-manual/admin-end/contact/",
  "/docs/user-manual/admin-end/theme-options/",
];

/** @type {import('../types/content').WebsiteData['siteMetadata']} */
const siteMetadata = {
  sourceUrl: SITE,
  crawledAt: "2026-11-06T08:56:00Z",
  platform: "WordPress (custom 'pioneer' theme, Contact Form 7)",
  discoveredPages: [
    { url: `${SITE}/`, status: 200, title: "Pioneer Water Tanks | Home", classification: "business" },
    { url: `${SITE}/about/`, status: 200, title: "Pioneer Water Tanks | About Us", classification: "business" },
    { url: `${SITE}/licenses/`, status: 200, title: "Pioneer Water Tanks | Licenses", classification: "business" },
    { url: `${SITE}/products/`, status: 200, title: "Pioneer Water Tanks | Products", classification: "business" },
    { url: CORRUGATED_URL, status: 200, title: "Pioneer Water Tanks | Corrugated Zincalum Steel", classification: "business" },
    { url: FLAT_URL, status: 200, title: "Pioneer Water Tanks | Flat Panel HDG Steel", classification: "business" },
    { url: FLEX_URL, status: 200, title: "Pioneer Water Tanks | Flexible PVC Storage Tanks", classification: "business" },
    { url: `${SITE}/news/`, status: 200, title: "Pioneer Water Tanks | News Updates", classification: "business" },
    { url: `${SITE}/news/nemo-enim-ipsam-voluptatem-quia/`, status: 200, title: "Pioneer Water Tanks | The launch of our new Website", classification: "business" },
    { url: `${SITE}/gallery/`, status: 200, title: "Pioneer Water Tanks | Media Gallery", classification: "business" },
    { url: `${SITE}/downloads/`, status: 200, title: "Pioneer Water Tanks | Downloads", classification: "business" },
    { url: `${SITE}/contact/`, status: 200, title: "Pioneer Water Tanks | contact", classification: "business" },
    { url: `${SITE}/banner/pioneers-in-water-storage-solutions/`, status: 200, title: "Pioneer Water Tanks | PIONEERS IN WATER STORAGE SOLUTIONS", classification: "non-business" },
    { url: `${SITE}/banner/pioneers-in-water-storage-solutions-2/`, status: 200, title: "Pioneer Water Tanks | PIONEERS IN WATER STORAGE SOLUTIONS", classification: "non-business" },
    { url: `${SITE}/banner/pioneers-in-water-storage-solutions-3/`, status: 200, title: "Pioneer Water Tanks | PIONEERS IN WATER STORAGE SOLUTIONS", classification: "non-business" },
    { url: `${SITE}/sample-page/`, status: 200, title: "Pioneer Water Tanks | Sample Page", classification: "wordpress-default" },
    { url: `${SITE}/hello-world/`, status: 200, title: "Pioneer Water Tanks | Hello world!", classification: "wordpress-default" },
    { url: `${SITE}/category/uncategorized/`, status: 200, title: "Pioneer Water Tanks | Uncategorized", classification: "wordpress-default" },
    ...themeDocPages.map((p) => ({ url: SITE + p, status: 200, title: "Pioneer Water Tanks | Documentation (theme user manual)", classification: /** @type {const} */ ("non-business") })),
  ],
  inaccessiblePages: [],
  counts: {
    pagesDiscovered: 37,
    businessPages: 12,
    nonBusinessPages: 25,
    products: 3,
    productFamilies: 2,
    productVariants: 2,
    documents: 5,
    imagesDiscovered: 76,
    productPhotos: assets.filter((a) => a.category === "product-photo").length,
    certificates: 3,
    newsArticles: 1,
    galleryImages: 16,
  },
};

/* -------------------------------------------------------------------------- */

/** @type {import('../types/content').WebsiteData} */
export const websiteData = {
  company,
  navigation,
  footerNavigation,
  pages,
  productFamilies,
  products,
  applications,
  certifications,
  downloads,
  news,
  gallery,
  assets,
  siteMetadata,
};

export default websiteData;

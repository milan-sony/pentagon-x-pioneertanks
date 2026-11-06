/**
 * Type definitions for the centralized content file (src/data/website-content.js).
 * The JS file is type-checked against these via JSDoc (`@type {import('../types/content').WebsiteData}`).
 */

/** Where a fact came from: a rendered web page or a downloadable document. */
export type ContentSource = "web" | "document";

export type AssetCategory =
  | "product-photo" // genuine photos of Pioneer tanks / installations
  | "banner" // page banner images used on the old site
  | "certificate" // licence / certificate scans
  | "logo"
  | "stock" // generic stock imagery used on the old site (not company-owned)
  | "theme-doc" // screenshots belonging to the WordPress theme user manual
  | "icon";

export interface ImageAsset {
  /** Stable id used by pages/products to reference the image. */
  id: string;
  /** Optimised WebP path under /public (null for tiny icons that were not converted). */
  src: string | null;
  /** 800px wide WebP for cards (only for images wider than 800px). */
  cardSrc: string | null;
  /** Original downloaded file under /public/images/source. */
  sourcePath: string;
  /** URL on the live site. */
  sourceUrl: string;
  alt: string;
  width: number;
  height: number;
  category: AssetCategory;
  /** True when the photo clearly shows Pioneer tanks/installations; "unknown" for stock-looking imagery. */
  companyOwned: boolean | "unknown";
  /** Pages on the live site where the image appeared. */
  usedOn: string[];
  /** Alt text found on the live site (usually empty). */
  originalAlt: string;
}

export interface DocumentAsset {
  id: string;
  title: string;
  /** Path under /public/documents. */
  localPath: string;
  sourceUrl: string;
  type: "brochure" | "datasheet" | "certificate";
  fileType: "pdf" | "jpg";
  pages: number | null;
  bytes: number | null;
  /** Product slugs this document relates to. */
  relatedProducts: string[];
  /** Series code printed in the document (PLT, PFP, FLT, OLT). */
  series?: string;
  summary: string;
}

export interface LinkRef {
  label: string;
  href: string;
}

export interface ContentSection {
  /** Anchor id, unique within the page. */
  id: string;
  heading?: string;
  subheading?: string;
  /** Paragraphs in original order. */
  body?: string[];
  /** Bullet list in original order. */
  items?: string[];
  /** Image asset ids. */
  images?: string[];
  links?: LinkRef[];
  /** Section-level notes about extraction quality (e.g. "copy duplicated from another product"). */
  notes?: string[];
  sourceUrl: string;
}

export interface PageContent {
  slug: string;
  /** Route in the new site. */
  route: string;
  /** URL on the live site. */
  sourceUrl: string;
  title: string;
  metaTitle: string;
  metaDescription: string | null;
  /** Banner image asset id used on the old site, if any. */
  banner?: string;
  /** Headings as they appear on the live page, in order (level + text). */
  headings: { level: number; text: string }[];
  sections: ContentSection[];
  /** true for WordPress leftovers (sample page, theme documentation) that are not business content. */
  nonBusinessContent?: boolean;
  /** Items the client must confirm before launch. */
  requiresClientVerification?: string[];
  /** Whether the route is fully implemented in this phase. */
  implemented: boolean;
}

export interface Specification {
  label: string;
  value: string;
  source: ContentSource;
  /** DocumentAsset id when source === "document". */
  documentRef?: string;
  /** Flag for suspected typos / unit glitches on the source. */
  note?: string;
}

export interface Feature {
  title: string;
  body: string;
  source: ContentSource;
  documentRef?: string;
}

export interface KeyFact {
  label: string;
  value: string;
  source: ContentSource;
  documentRef?: string;
}

export interface CapacityChart {
  source: ContentSource;
  documentRef: string;
  page: number;
  title: string;
  note: string;
  unitsNote: string;
  /** Column headings: number of rings and the resulting wall height. */
  columns: { ring: string; wallHeight: string }[];
  rows: { model: string; diameter: string; capacities: (string | null)[] }[];
}

export interface ProductVariant {
  id: string;
  name: string;
  series: string;
  summary: string;
  specifications: Specification[];
  documents: string[];
  images: string[];
}

export type ProductFamilyId = "steel-liner" | "flexible";

export interface ProductFamily {
  id: ProductFamilyId;
  name: string;
  tagline: string;
  description: string[];
  productSlugs: string[];
  image: string;
  sourceUrl: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Shorter display name for cards and nav. */
  shortName: string;
  family: ProductFamilyId;
  /** Series code(s) used in datasheets. */
  series: string[];
  /** One-sentence summary (verified copy). */
  summary: string;
  /** Long description paragraphs. */
  description: string[];
  features: Feature[];
  benefits: string[];
  applications: string[];
  /** Headline numbers for cards (all verified against source). */
  keyFacts: KeyFact[];
  specifications: Specification[];
  accessories: string[];
  foundation?: string[];
  warranty?: string;
  designLife?: string;
  variants?: ProductVariant[];
  capacityChart?: CapacityChart;
  /** Image asset ids; first is the hero. */
  images: string[];
  documents: string[];
  /** Live-site URL. */
  sourceUrl: string;
  /** Route reserved for the future product detail page. */
  route: string;
  verificationNotes: string[];
}

export interface Application {
  id: string;
  name: string;
  description?: string;
  /** Product slugs that cite this application. */
  products: string[];
  source: ContentSource;
  sourceUrl: string;
}

export interface Certification {
  id: string;
  name: string;
  /** Issuing body as read from the scanned image (null when not legible/not stated). */
  issuer: string | null;
  /** Details read from the scan. */
  details: string[];
  image: string;
  sourceUrl: string;
  /** Text on the live page. */
  originalLabel: string;
  verificationNotes: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  /** URL on the live site for reference. */
  sourceUrl: string;
  implemented: boolean;
  children?: NavigationItem[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  dateLabel: string;
  isoDate: string | null;
  excerpt: string;
  body: string[];
  image?: string;
  sourceUrl: string;
  route: string;
  /** e.g. slug is lorem-ipsum, default WP post. */
  flags: string[];
}

export interface GalleryGroup {
  id: string;
  name: string;
  images: string[];
}

export interface Company {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  established: string;
  establishedSource: string;
  location: string;
  markets: string[];
  mission: string;
  vision: string;
  philosophy: string;
  values: string;
  contact: {
    phone: string;
    phoneHref: string;
    fax: string;
    email: string;
    whatsapp: string | null;
    address: {
      lines: string[];
      poBox: string;
      city: string;
      country: string;
      full: string;
    };
    mapUrl: string | null;
    hours: string | null;
  };
  socialLinks: { platform: string; url: string; status: "active" | "deprecated"; note?: string }[];
  logo: { src: string; alt: string; width: number; height: number; note: string };
}

export interface WebsiteData {
  company: Company;
  navigation: NavigationItem[];
  footerNavigation: NavigationItem[];
  pages: Record<string, PageContent>;
  productFamilies: ProductFamily[];
  products: Product[];
  applications: Application[];
  certifications: Certification[];
  downloads: DocumentAsset[];
  news: NewsArticle[];
  gallery: GalleryGroup[];
  assets: ImageAsset[];
  siteMetadata: {
    sourceUrl: string;
    crawledAt: string;
    platform: string;
    discoveredPages: { url: string; status: number; title: string; classification: "business" | "non-business" | "wordpress-default" }[];
    inaccessiblePages: string[];
    counts: Record<string, number>;
  };
}

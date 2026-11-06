/**
 * Typed selectors over the centralized content file.
 * Components import from here instead of touching the raw data shape.
 */
import { websiteData } from "@/data/website-content.js";
import { BUILD_YEAR } from "@/lib/constants";
import type {
  Application,
  Certification,
  DocumentAsset,
  ImageAsset,
  PageContent,
  Product,
  ProductFamily,
  WebsiteData,
} from "@/types/content";

export const site: WebsiteData = websiteData;
export const company = websiteData.company;
export const contact = websiteData.company.contact;

const assetIndex = new Map<string, ImageAsset>(websiteData.assets.map((a) => [a.id, a]));
const documentIndex = new Map<string, DocumentAsset>(websiteData.downloads.map((d) => [d.id, d]));
const productIndex = new Map<string, Product>(websiteData.products.map((p) => [p.slug, p]));

export function getAsset(id: string): ImageAsset {
  const asset = assetIndex.get(id);
  if (!asset) throw new Error(`Unknown image asset "${id}" – check src/data/website-assets.js`);
  return asset;
}

/** Returns the optimised src for an asset (falls back to the original file for icons). */
export function assetSrc(id: string, variant: "full" | "card" = "full"): string {
  const a = getAsset(id);
  if (variant === "card" && a.cardSrc) return a.cardSrc;
  return a.src ?? a.sourcePath;
}

export function getDocument(id: string): DocumentAsset {
  const doc = documentIndex.get(id);
  if (!doc) throw new Error(`Unknown document "${id}"`);
  return doc;
}

export function getProducts(): Product[] {
  return websiteData.products;
}

export function getProduct(slug: string): Product | undefined {
  return productIndex.get(slug);
}

export function getProductFamilies(): ProductFamily[] {
  return websiteData.productFamilies;
}

export function getProductsByFamily(familyId: ProductFamily["id"]): Product[] {
  return websiteData.products.filter((p) => p.family === familyId);
}

export function getApplications(): Application[] {
  return websiteData.applications;
}

export function getCertifications(): Certification[] {
  return websiteData.certifications;
}

export function getDownloads(): DocumentAsset[] {
  return websiteData.downloads;
}

export function getPage(slug: string): PageContent {
  const page = websiteData.pages[slug];
  if (!page) throw new Error(`Unknown page "${slug}"`);
  return page;
}

/** Only company-owned product photography (never stock or theme screenshots). */
export function getProductPhotos(): ImageAsset[] {
  return websiteData.assets.filter((a) => a.category === "product-photo" && a.companyOwned === true);
}

/** Gallery groups resolved to assets. */
export function getGallery() {
  return websiteData.gallery.map((g) => ({ ...g, assets: g.images.map(getAsset) }));
}

/** Years in business, derived from the verified establishment year instead of hard-coded copy. */
export function yearsInBusiness(year: number = BUILD_YEAR): number {
  return year - Number(websiteData.company.established);
}

/** Social links that are still live (drops Google+). */
export function getActiveSocialLinks() {
  return websiteData.company.socialLinks.filter((s) => s.status === "active");
}

/** Verified headline facts for credibility strips – each traceable to the source. */
export function getCredibilityFacts(): { label: string; value: string }[] {
  const corrugated = getProduct("corrugated-zincalum-steel");
  const capacity = corrugated?.keyFacts.find((f) => f.label === "Capacity")?.value ?? "";
  return [
    { label: "Supplying liner tanks since", value: websiteData.company.established },
    { label: "Steel tank capacity range", value: capacity },
    { label: "Steel tank warranty", value: "10-year conditional" },
    { label: "Design life", value: "25 years" },
  ];
}

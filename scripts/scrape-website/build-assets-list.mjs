/**
 * Generates src/data/website-assets.js from the crawler outputs.
 * Alt text and categories for business imagery are curated in ALT below;
 * everything else gets a safe generic description.
 *
 * Usage: node scripts/scrape-website/build-assets-list.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const inventory = JSON.parse(await readFile(path.join(__dirname, "output/image-inventory.json"), "utf8"));
const manifest = JSON.parse(await readFile(path.join(__dirname, "output/asset-manifest.json"), "utf8"));

/** Curated descriptions for images that show the company's products. */
const ALT = {
  "ban01.jpg": ["Corrugated Zincalume steel liner tank bearing the Pioneer Water Tanks logo in a desert installation (image carries a dark tint from the old slider)", "product-photo", true],
  "ban02.jpg": ["Water treatment plant clarifiers at sunset (stock image used on the old homepage slider)", "stock", "unknown"],
  "ban03.jpg": ["Construction team in hard hats (stock image used on the old homepage slider)", "stock", "unknown"],
  "about-banner.jpg": ["Engineer in a hard hat on a phone call at a construction site (old About page banner)", "stock", "unknown"],
  "contact-banner.jpg": ["Customer service agents with headsets (old Contact page banner)", "stock", "unknown"],
  "down-banner.jpg": ["Hand touching a digital interface (old Downloads page banner)", "stock", "unknown"],
  "gallery-banner.jpg": ["Industrial water treatment basins at sunset (old Gallery page banner)", "stock", "unknown"],
  "license-banner.jpg": ["Signing a document (old Licenses page banner)", "stock", "unknown"],
  "news-banner.jpg": ["Newspaper headline close-up (old News page banner)", "stock", "unknown"],
  "product-banner.jpg": ["Two large corrugated Zincalume steel liner tanks by Pioneer Water Tanks on a desert site", "product-photo", true],
  "product-banner-1.jpg": ["Two large corrugated Zincalume steel liner tanks by Pioneer Water Tanks on a desert site", "product-photo", true],
  "product-banner-2.jpg": ["Two large corrugated Zincalume steel liner tanks by Pioneer Water Tanks on a desert site", "product-photo", true],
  "flexible-tank.jpg": ["Flexible pillow tank laid out on sand with hose connections", "product-photo", true],
  "intro-img.jpg": ["Aerial view of a group of Pioneer corrugated steel liner tanks with dome roofs on a construction site", "product-photo", true],
  "bt01.jpg": ["Corrugated Zincalume steel tank with dome roof and Pioneer Water Tanks branding", "product-photo", true],
  "second.jpg": ["Corrugated Zincalume steel tank with Pioneer Water Tanks branding and external ladder", "product-photo", true],
  "th.jpg": ["Large corrugated steel liner tank with dome roof", "product-photo", true],
  "corrugated-1.jpg": ["Corrugated Zincalume steel liner tank with external ladder and safety cage", "product-photo", true],
  "corrugated-2.jpg": ["Corrugated steel liner tank with roof access ladder and dome roof", "product-photo", true],
  "corrugated-3.jpg": ["Tall corrugated steel liner tank with Pioneer Water Tanks branding", "product-photo", true],
  "corrugated-4.jpg": ["Corrugated steel tank with dome roof in a desert landscape", "product-photo", true],
  "corrugated-5.jpg": ["Group of corrugated steel liner tanks on an industrial site", "product-photo", true],
  "corrugated-6.jpg": ["Corrugated steel liner tank with overflow and down-pipe", "product-photo", true],
  "corrugated-7.jpg": ["Corrugated steel tank under construction with Pioneer crew", "product-photo", true],
  "corrugated-8.jpg": ["Corrugated steel liner tank installed next to a building", "product-photo", true],
  "flat-panel-1.jpg": ["Flat panel hot-dip galvanised steel tank with external ladder", "product-photo", true],
  "flat-panel-2.jpg": ["Flat panel hot-dip galvanised steel tank with dome roof", "product-photo", true],
  "pillow-1.jpg": ["Flexible pillow tank being tested inside the Pioneer workshop", "product-photo", true],
  "pillow-2.jpg": ["Flexible pillow tank filled with water in the workshop", "product-photo", true],
  "pillow-3.jpg": ["Flexible pillow tank under test with outlet fittings", "product-photo", true],
  "pillow-4.jpg": ["Flexible pillow tank with HDPE fittings", "product-photo", true],
  "pillow-tank.jpg": ["Flexible pillow tank laid out on sand", "product-photo", true],
  "onion-1.jpg": ["Self-erecting flexible onion tank, blue fabric", "product-photo", true],
  "onion-2.jpg": ["Self-erecting flexible onion tank filled with water", "product-photo", true],
  "onion-tanks.jpg": ["Blue flexible onion tank with top cover", "product-photo", true],
  "PWT-ISO-Certificate.jpg": ["ISO 9001:2008 Certificate of Assessment issued to Pioneer Water Tanks LLC by Quality Registrar Systems", "certificate", true],
  "PWT-LICENSE-18.10.jpg": ["Commercial licence for Pioneer Water Tanks LLC issued by the Abu Dhabi Department of Economic Development", "certificate", true],
  "Pioneer-Warranty-2017-PQ.jpg": ["Pioneer Water Tanks ten-year warranty certificate (sample)", "certificate", true],
  "logo.jpg": ["Pioneer Water Tanks logo", "logo", true],
  "logo-foot.png": ["Pioneer Water Tanks logo, footer version", "logo", true],
  "news-left.jpg": ["Silhouettes of construction workers on a steel frame (old homepage Mission & Vision image)", "stock", "unknown"],
  "new.jpg": ["Construction team in hard hats (old homepage Areas of Expertise image)", "stock", "unknown"],
  "site-img.jpg": ["Laptop showing the 2018 Pioneer Water Tanks website (news thumbnail)", "stock", "unknown"],
  "by.png": ["Website credit icon", "icon", false],
  "zoom-in-plus.png": ["Zoom icon", "icon", false],
};

const byFile = new Map(manifest.map((m) => [path.basename(m.sourceUrl), m]));
const assets = inventory.map((img) => {
  const m = byFile.get(img.file) || {};
  const curated = ALT[img.file];
  const isThemeDoc = !curated && /\.png$/i.test(img.file);
  const id = img.file.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    id,
    src: img.optimized,
    cardSrc: img.card,
    sourcePath: img.sourcePath,
    sourceUrl: m.sourceUrl || null,
    alt: curated ? curated[0] : isThemeDoc ? `Screenshot from the WordPress theme user manual (${img.file})` : img.file,
    width: img.width,
    height: img.height,
    category: curated ? curated[1] : isThemeDoc ? "theme-doc" : "stock",
    companyOwned: curated ? curated[2] : false,
    usedOn: m.usedOn || [],
    originalAlt: m.alt || "",
  };
});

const header = `// GENERATED FILE – do not edit by hand.
// Built by scripts/scrape-website/build-assets-list.mjs from the crawl outputs.
// Alt text for product imagery is curated in that script's ALT map.
// @ts-check

/** @type {import('../types/content').ImageAsset[]} */
export const assets = `;

await writeFile(path.join(ROOT, "src/data/website-assets.js"), header + JSON.stringify(assets, null, 2) + ";\n", "utf8");
console.log(`Wrote ${assets.length} assets to src/data/website-assets.js`);

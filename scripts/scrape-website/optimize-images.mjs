/**
 * Produces web-optimised WebP variants of the downloaded source images and a
 * contact sheet for visual review.
 *
 *   public/images/optimized/<name>.webp            max 1920px wide, q82
 *   public/images/optimized/<name>-800.webp        800px wide variant (cards)
 *   scripts/scrape-website/output/contact-sheet.jpg
 *   scripts/scrape-website/output/image-inventory.json
 *
 * Usage: node scripts/scrape-website/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, readdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "public/images/source");
const OUT = path.join(ROOT, "public/images/optimized");
const REPORT = path.join(__dirname, "output");

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  const inventory = [];
  const thumbs = [];

  for (const file of files) {
    const input = path.join(SRC, file);
    const meta = await sharp(input).metadata();
    const base = file.replace(/\.[^.]+$/, "").toLowerCase();
    const bytes = (await stat(input)).size;
    const rec = { file, sourcePath: `/images/source/${file}`, width: meta.width, height: meta.height, bytes, format: meta.format, optimized: null, card: null };

    if (meta.width >= 400) {
      const full = path.join(OUT, `${base}.webp`);
      await sharp(input).resize({ width: Math.min(meta.width, 1920), withoutEnlargement: true }).webp({ quality: 82 }).toFile(full);
      rec.optimized = `/images/optimized/${base}.webp`;
      rec.optimizedBytes = (await stat(full)).size;
      if (meta.width > 800) {
        const card = path.join(OUT, `${base}-800.webp`);
        await sharp(input).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 80 }).toFile(card);
        rec.card = `/images/optimized/${base}-800.webp`;
      }
    }
    inventory.push(rec);

    // thumbnail for contact sheet
    const thumb = await sharp(input).resize(240, 160, { fit: "cover" }).jpeg({ quality: 70 }).toBuffer();
    thumbs.push({ file, thumb, label: `${file} ${meta.width}x${meta.height}` });
  }

  // Contact sheet: 5 columns, label strip under each tile.
  const cols = 5, tw = 240, th = 160, lh = 28, pad = 8;
  const rows = Math.ceil(thumbs.length / cols);
  const sheetW = cols * (tw + pad) + pad;
  const sheetH = rows * (th + lh + pad) + pad;
  const composites = [];
  thumbs.forEach((t, i) => {
    const x = pad + (i % cols) * (tw + pad);
    const y = pad + Math.floor(i / cols) * (th + lh + pad);
    composites.push({ input: t.thumb, left: x, top: y });
    const svg = Buffer.from(`<svg width="${tw}" height="${lh}"><rect width="100%" height="100%" fill="#111"/><text x="4" y="18" font-family="Arial" font-size="11" fill="#fff">${t.label.replace(/&/g, "&amp;")}</text></svg>`);
    composites.push({ input: svg, left: x, top: y + th });
  });
  await sharp({ create: { width: sheetW, height: sheetH, channels: 3, background: "#222" } })
    .composite(composites)
    .jpeg({ quality: 80 })
    .toFile(path.join(REPORT, "contact-sheet.jpg"));

  await writeFile(path.join(REPORT, "image-inventory.json"), JSON.stringify(inventory, null, 2), "utf8");
  console.log(`${inventory.length} images inventoried, ${inventory.filter((i) => i.optimized).length} optimised. Contact sheet: output/contact-sheet.jpg`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

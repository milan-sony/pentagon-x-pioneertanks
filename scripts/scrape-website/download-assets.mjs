/**
 * Downloads every image and document discovered by crawl.mjs into /public
 * and writes a manifest that keeps the original source URL for each file.
 *
 *   public/images/source/<filename>     original uploads (WordPress "full size" where possible)
 *   public/documents/<filename>         PDFs and licence images
 *   scripts/scrape-website/output/asset-manifest.json
 *
 * WordPress serves resized variants like `photo-300x200.jpg`; we try the
 * un-suffixed original first and fall back to the variant that was linked.
 *
 * Usage: node scripts/scrape-website/download-assets.mjs
 */
import { mkdir, readFile, readdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(__dirname, "output");
const IMG_DIR = path.join(ROOT, "public/images/source");
const DOC_DIR = path.join(ROOT, "public/documents");

const IMG_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;
const DOC_EXT = /\.(pdf|docx?|xlsx?|pptx?|zip)$/i;
const SIZE_SUFFIX = /-(\d+)x(\d+)(\.[a-z0-9]+)$/i;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "pioneer-redesign-crawler/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return { bytes: buf.length, contentType: res.headers.get("content-type") };
}

async function main() {
  await mkdir(IMG_DIR, { recursive: true });
  await mkdir(DOC_DIR, { recursive: true });

  const pagesDir = path.join(OUT, "pages");
  const files = (await readdir(pagesDir)).filter((f) => f.endsWith(".json"));
  const usage = new Map(); // sourceUrl -> {alt, usedOn:Set, kind}

  const note = (src, kind, pageUrl, alt = "") => {
    if (!src || !/^https?:/.test(src)) return;
    let u;
    try {
      u = new URL(src);
    } catch {
      return;
    }
    if (!/pioneertanks\.ae$/.test(u.hostname)) return;
    u.protocol = "https:";
    u.search = "";
    u.hash = "";
    const key = u.toString();
    const rec = usage.get(key) || { kind, alt: "", usedOn: new Set() };
    if (alt && !rec.alt) rec.alt = alt;
    rec.usedOn.add(pageUrl);
    usage.set(key, rec);
  };

  for (const f of files) {
    const page = JSON.parse(await readFile(path.join(pagesDir, f), "utf8"));
    for (const img of page.images || []) note(img.src, "image", page.url, img.alt);
    for (const b of page.blocks || []) {
      if (b.type === "backgroundImage") note(b.src, "image", page.url);
      if (b.type === "image") note(b.src, "image", page.url, b.alt);
    }
    for (const d of page.documents || []) note(d, "document", page.url);
    for (const l of page.links || []) if (IMG_EXT.test(l.href)) note(l.href, "image", page.url, l.text);
    if (page.meta?.ogImage) note(page.meta.ogImage, "image", page.url);
  }

  const manifest = [];
  for (const [sourceUrl, rec] of usage) {
    const u = new URL(sourceUrl);
    const base = path.basename(u.pathname);
    const isDoc = DOC_EXT.test(base) || (rec.kind === "document");
    const isImg = IMG_EXT.test(base);
    if (!isDoc && !isImg) continue;

    const targetDir = isDoc ? DOC_DIR : IMG_DIR;
    const entry = { sourceUrl, kind: isDoc ? "document" : "image", alt: rec.alt || "", usedOn: [...rec.usedOn].sort(), localPath: null, originalUrl: null, bytes: null, contentType: null, error: null };

    // Prefer the full-size original for resized WordPress variants.
    const candidates = [];
    const m = base.match(SIZE_SUFFIX);
    if (m) candidates.push({ url: sourceUrl.replace(SIZE_SUFFIX, "$3"), name: base.replace(SIZE_SUFFIX, "$3"), original: true });
    candidates.push({ url: sourceUrl, name: base, original: !m });

    for (const c of candidates) {
      const dest = path.join(targetDir, c.name);
      try {
        if (!(await exists(dest))) {
          const info = await download(c.url, dest);
          entry.bytes = info.bytes;
          entry.contentType = info.contentType;
        } else {
          entry.bytes = (await stat(dest)).size;
        }
        entry.localPath = path.posix.join(isDoc ? "/documents" : "/images/source", c.name);
        entry.originalUrl = c.url;
        entry.isResizedVariant = !c.original;
        break;
      } catch (e) {
        entry.error = `${c.url}: ${e.message}`;
      }
    }
    if (entry.localPath) entry.error = null;
    manifest.push(entry);
    console.log(`${entry.localPath ? "ok  " : "FAIL"} ${sourceUrl}${entry.localPath ? " -> " + entry.localPath : " (" + entry.error + ")"}`);
  }

  manifest.sort((a, b) => a.sourceUrl.localeCompare(b.sourceUrl));
  await writeFile(path.join(OUT, "asset-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  const ok = manifest.filter((m) => m.localPath).length;
  console.log(`\n${ok}/${manifest.length} assets saved (${manifest.filter((m) => m.kind === "document").length} documents).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

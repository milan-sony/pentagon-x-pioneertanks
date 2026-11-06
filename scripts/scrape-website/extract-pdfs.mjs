/**
 * Extracts text and tables from every PDF in /public/documents using pdf-parse.
 * Output: scripts/scrape-website/output/documents/<name>.json
 *
 * Information taken from these files is marked `source: "document"` in the
 * curated content file so it can be told apart from web-page content.
 *
 * Usage: node scripts/scrape-website/extract-pdfs.mjs
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const DOC_DIR = path.join(ROOT, "public/documents");
const OUT = path.join(__dirname, "output/documents");

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(DOC_DIR)).filter((f) => /\.pdf$/i.test(f));
  for (const file of files) {
    const buffer = await readFile(path.join(DOC_DIR, file));
    const parser = new PDFParse({ data: buffer });
    const result = { file, localPath: `/documents/${file}`, pages: 0, info: null, text: "", pagesText: [], tables: [], error: null };
    try {
      const info = await parser.getInfo({ parsePageInfo: true });
      result.pages = info.total;
      result.info = info.info || null;
      const text = await parser.getText();
      result.text = text.text;
      result.pagesText = (text.pages || []).map((p) => ({ num: p.num, text: p.text }));
      try {
        const tables = await parser.getTable();
        result.tables = (tables.pages || []).flatMap((p) => (p.tables || []).map((t) => ({ page: p.num, rows: t })));
      } catch (e) {
        result.tablesError = String(e.message || e);
      }
    } catch (e) {
      result.error = String(e.message || e);
    } finally {
      await parser.destroy();
    }
    const out = path.join(OUT, file.replace(/\.pdf$/i, ".json"));
    await writeFile(out, JSON.stringify(result, null, 2), "utf8");
    await writeFile(out.replace(/\.json$/, ".txt"), result.text, "utf8");
    console.log(`${result.error ? "FAIL" : "ok  "} ${file}: ${result.pages} pages, ${result.text.length} chars, ${result.tables.length} tables${result.error ? " – " + result.error : ""}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

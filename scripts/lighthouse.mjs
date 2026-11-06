/**
 * Runs Lighthouse (performance, accessibility, best practices, SEO) for the
 * homepage and products page on mobile and desktop against a production build.
 *
 * Prerequisite: `npm run build`. The script starts `next start` on port 3101,
 * runs the audits, writes docs/lighthouse/<design>-<page>-<form>.json and a
 * summary table in docs/lighthouse/summary.md, then stops the server.
 *
 * Usage: npm run lighthouse
 */
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 3101;
const OUT = path.join(ROOT, "docs/lighthouse");
// design-config.ts is TypeScript; read the id with a regex instead of importing it.
const designSource = await readFile(path.join(ROOT, "src/data/design-config.ts"), "utf8");
const DESIGN = process.env.DESIGN_ID ?? designSource.match(/designId:\s*"([^"]+)"/)?.[1] ?? "design";

const PAGES = [
  { name: "home", path: "/" },
  { name: "products", path: "/products" },
];
const FORMS = ["mobile", "desktop"];

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: ROOT, shell: true, stdio: ["ignore", "pipe", "pipe"] });
    const timer = setTimeout(() => reject(new Error("next start timed out")), 60_000);
    proc.stdout.on("data", (d) => {
      if (/ready|started server|localhost:\d+/i.test(String(d))) {
        clearTimeout(timer);
        resolve(proc);
      }
    });
    proc.stderr.on("data", (d) => process.stderr.write(d));
    proc.on("exit", (code) => reject(new Error(`next start exited with ${code}`)));
  });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = await startServer();
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
  const rows = [];
  try {
    for (const page of PAGES) {
      for (const form of FORMS) {
        const url = `http://localhost:${PORT}${page.path}`;
        const result = await lighthouse(url, {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
          formFactor: form,
          screenEmulation: form === "mobile" ? { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false } : { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
          throttlingMethod: "simulate",
        });
        const lhr = result.lhr;
        const cats = lhr.categories;
        const audit = (id) => lhr.audits[id]?.displayValue ?? "–";
        const row = {
          page: page.name,
          form,
          performance: Math.round(cats.performance.score * 100),
          accessibility: Math.round(cats.accessibility.score * 100),
          bestPractices: Math.round(cats["best-practices"].score * 100),
          seo: Math.round(cats.seo.score * 100),
          lcp: audit("largest-contentful-paint"),
          cls: audit("cumulative-layout-shift"),
          tbt: audit("total-blocking-time"),
          inp: lhr.audits["interaction-to-next-paint"]?.displayValue ?? "n/a (lab)",
          speedIndex: audit("speed-index"),
          totalBytes: audit("total-byte-weight"),
          failing: Object.values(lhr.audits)
            .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode === "numeric")
            .map((a) => `${a.id} (${a.displayValue ?? Math.round(a.score * 100)})`)
            .slice(0, 8),
        };
        rows.push(row);
        await writeFile(path.join(OUT, `${DESIGN}-${page.name}-${form}.json`), JSON.stringify(lhr, null, 1), "utf8");
        console.log(`${page.name} ${form}: perf ${row.performance} a11y ${row.accessibility} bp ${row.bestPractices} seo ${row.seo} | LCP ${row.lcp} CLS ${row.cls} TBT ${row.tbt}`);
      }
    }
  } finally {
    await chrome.kill();
    server.kill();
    // next start spawns via shell on Windows; make sure the port is freed.
    if (process.platform === "win32") spawn("taskkill", ["/F", "/T", "/PID", String(server.pid)], { shell: true });
  }

  const md = [
    `# Lighthouse – ${DESIGN}`,
    "",
    `Run: ${new Date().toISOString()} · Lighthouse ${(await import("lighthouse/package.json", { with: { type: "json" } })).default.version} · production build served by \`next start\` on localhost · simulated throttling.`,
    "",
    "| Page | Form | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | Speed Index | Bytes |",
    "|---|---|---|---|---|---|---|---|---|---|---|",
    ...rows.map((r) => `| ${r.page} | ${r.form} | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt} | ${r.speedIndex} | ${r.totalBytes} |`),
    "",
    "INP is a field metric and is not measured by Lighthouse lab runs; TBT is reported as its lab proxy.",
    "",
    "## Audits scoring below 90",
    "",
    ...rows.map((r) => `- **${r.page} / ${r.form}:** ${r.failing.length ? r.failing.join(", ") : "none"}`),
    "",
  ].join("\n");
  await writeFile(path.join(OUT, `${DESIGN}-summary.md`), md, "utf8");
  console.log(`\nSummary written to docs/lighthouse/${DESIGN}-summary.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

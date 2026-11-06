/**
 * Pioneer Water Tanks – site crawler.
 *
 * Discovers every internal URL of https://pioneertanks.ae/ (sitemap + link
 * following), renders each page with Playwright Chromium and extracts a
 * structured, section-ordered content record per page.
 *
 * Output (relative to this folder):
 *   output/pages/<slug>.json          structured page record
 *   output/raw/<slug>.html            rendered HTML (git-ignored)
 *   output/raw/<slug>.png             full-page reference screenshot (git-ignored)
 *   output/discovered-urls.json       every URL seen, with status + classification
 *   output/crawl-summary.json         counts, failures, timings
 *
 * Usage:  node scripts/scrape-website/crawl.mjs [--limit N] [--concurrency N]
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "output");
const PAGES_DIR = path.join(OUT, "pages");
const RAW_DIR = path.join(OUT, "raw");

const ORIGIN = "https://pioneertanks.ae";
const HOSTS = new Set(["pioneertanks.ae", "www.pioneertanks.ae"]);

const args = process.argv.slice(2);
const argValue = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? Number(args[i + 1]) : fallback;
};
const LIMIT = argValue("--limit", Infinity);
const CONCURRENCY = argValue("--concurrency", 3);

const ASSET_EXT = /\.(png|jpe?g|gif|webp|svg|ico|bmp|avif)(\?.*)?$/i;
const DOC_EXT = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|csv|txt)(\?.*)?$/i;
const SKIP_PATH = [
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/wp-json/i,
  /^\/xmlrpc\.php/i,
  /\/feed\/?$/i,
  /^\/wp-includes/i,
  /^\/wp-content\/(plugins|themes)/i,
  /\?replytocom=/i,
  /^\/\?s=/i,
  /^\/cdn-cgi/i,
];

/** Normalise an href to a canonical absolute URL (or null if not crawlable). */
function normalise(href, base) {
  let url;
  try {
    url = new URL(href, base);
  } catch {
    return null;
  }
  if (!["http:", "https:"].includes(url.protocol)) return null;
  if (!HOSTS.has(url.hostname)) return null;
  url.protocol = "https:";
  url.hostname = "pioneertanks.ae";
  url.hash = "";
  // WordPress pagination and attachments keep their query strings; drop the rest.
  if (url.search && !/^\?(paged|page|attachment_id)=/.test(url.search)) {
    url.search = "";
  }
  if (!url.pathname.endsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(url.pathname)) {
    url.pathname += "/";
  }
  return url.toString();
}

function classify(url) {
  const { pathname, search } = new URL(url);
  if (ASSET_EXT.test(pathname)) return "asset";
  if (DOC_EXT.test(pathname)) return "document";
  if (SKIP_PATH.some((re) => re.test(pathname + search))) return "skipped";
  if (/\.xml$/i.test(pathname)) return "sitemap";
  return "page";
}

function slugFor(url) {
  const { pathname, search } = new URL(url);
  const base = pathname === "/" ? "home" : pathname.replace(/^\/|\/$/g, "").replace(/\//g, "__");
  return (base + (search ? "__" + search.replace(/[^a-z0-9]+/gi, "_") : "")).toLowerCase();
}

async function fetchSitemapUrls(url, seen = new Set()) {
  if (seen.has(url)) return [];
  seen.add(url);
  let text;
  try {
    const res = await fetch(url, { headers: { "user-agent": "pioneer-redesign-crawler/1.0" } });
    if (!res.ok) return [];
    text = await res.text();
  } catch {
    return [];
  }
  const locs = [...text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
  const urls = [];
  for (const loc of locs) {
    if (/\.xml$/i.test(new URL(loc).pathname)) {
      urls.push(...(await fetchSitemapUrls(loc, seen)));
    } else {
      urls.push(loc);
    }
  }
  return urls;
}

/* ------------------------------------------------------------------ */
/* In-page extraction (runs inside the browser)                        */
/* ------------------------------------------------------------------ */
const EXTRACT = () => {
  const abs = (u) => {
    try {
      return new URL(u, document.baseURI).toString();
    } catch {
      return u;
    }
  };
  const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
  const region = (el) => {
    if (el.closest("header, .header, #header, .site-header")) return "header";
    if (el.closest("footer, .footer, #footer, .site-footer")) return "footer";
    if (el.closest("nav, .nav, .menu, .navbar")) return "nav";
    return "main";
  };
  const imgSrc = (img) =>
    img.currentSrc ||
    img.getAttribute("data-src") ||
    img.getAttribute("data-lazy-src") ||
    img.getAttribute("data-original") ||
    img.getAttribute("src") ||
    "";

  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") || null;

  /* ---- ordered content blocks ---- */
  const blocks = [];
  const HEADING = /^H[1-6]$/;
  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "SVG", "IFRAME", "BUTTON", "INPUT", "SELECT", "TEXTAREA"]);
  const seenText = new Set();

  const pushText = (type, el, extra = {}) => {
    const text = clean(el.innerText || el.textContent);
    if (!text) return;
    const key = type + "|" + region(el) + "|" + text;
    if (seenText.has(key)) return;
    seenText.add(key);
    blocks.push({ type, region: region(el), text, ...extra });
  };

  const walk = (node) => {
    if (node.nodeType !== 1) return;
    const el = node;
    if (SKIP_TAGS.has(el.tagName)) return;
    const style = window.getComputedStyle(el);
    if (style.display === "none" && !el.closest("[data-crawler-keep]")) {
      // Hidden sliders / mobile menus still carry content; keep text but flag it.
      if (!el.closest(".slider, .carousel, .owl-carousel, .swiper, .mobile-menu, .menu")) return;
    }

    // Background images (sliders / banners)
    const bg = style.backgroundImage;
    if (bg && bg !== "none") {
      const m = [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((x) => abs(x[1]));
      m.forEach((src) =>
        blocks.push({ type: "backgroundImage", region: region(el), src, element: el.tagName.toLowerCase() + (el.className ? "." + clean(String(el.className)).split(" ").join(".") : "") }),
      );
    }

    if (HEADING.test(el.tagName)) {
      pushText("heading", el, { level: Number(el.tagName[1]) });
      return;
    }
    if (el.tagName === "P" || el.tagName === "BLOCKQUOTE") {
      pushText(el.tagName === "P" ? "paragraph" : "quote", el);
      el.querySelectorAll("img").forEach((img) =>
        blocks.push({ type: "image", region: region(img), src: abs(imgSrc(img)), alt: img.getAttribute("alt") || "", width: img.naturalWidth || null, height: img.naturalHeight || null }),
      );
      return;
    }
    if (el.tagName === "UL" || el.tagName === "OL") {
      const items = [...el.children].filter((c) => c.tagName === "LI").map((li) => {
        const a = li.querySelector(":scope > a");
        const sub = li.querySelector(":scope > ul, :scope > ol");
        const own = clean(sub ? li.innerText.replace(sub.innerText, "") : li.innerText);
        return { text: own, href: a ? abs(a.getAttribute("href")) : null, children: sub ? [...sub.querySelectorAll(":scope > li")].map((s) => ({ text: clean(s.innerText), href: s.querySelector("a") ? abs(s.querySelector("a").getAttribute("href")) : null })) : [] };
      }).filter((i) => i.text);
      if (items.length) {
        const key = "list|" + region(el) + "|" + items.map((i) => i.text).join("¦");
        if (!seenText.has(key)) {
          seenText.add(key);
          blocks.push({ type: "list", ordered: el.tagName === "OL", region: region(el), items, isMenu: !!el.closest("nav, .menu, #menu, .navbar, .nav") });
        }
      }
      return;
    }
    if (el.tagName === "TABLE") {
      const rows = [...el.querySelectorAll("tr")].map((tr) => [...tr.children].map((td) => clean(td.innerText)));
      if (rows.length) blocks.push({ type: "table", region: region(el), rows, caption: clean(el.querySelector("caption")?.innerText) || null });
      return;
    }
    if (el.tagName === "IMG") {
      blocks.push({ type: "image", region: region(el), src: abs(imgSrc(el)), alt: el.getAttribute("alt") || "", title: el.getAttribute("title") || null, width: el.naturalWidth || null, height: el.naturalHeight || null });
      return;
    }
    if (el.tagName === "A" && el.children.length === 0) {
      const href = el.getAttribute("href");
      const text = clean(el.innerText);
      if (href && text && /\.(pdf|docx?|xlsx?|zip)$/i.test(href)) {
        blocks.push({ type: "documentLink", region: region(el), text, href: abs(href) });
      }
      // plain inline links inside containers (e.g. CTAs) – keep as text blocks only if they are "button-like"
      if (text && /btn|button|cta|more|read/i.test(el.className)) pushText("cta", el, { href: abs(href) });
      return;
    }
    // Leaf text in generic containers (div/span/strong) that is not inside p/li/heading
    const hasBlockChildren = [...el.children].some((c) => !SKIP_TAGS.has(c.tagName));
    if (!hasBlockChildren) {
      const text = clean(el.innerText);
      if (text && text.length > 1 && !el.closest("p, li, h1, h2, h3, h4, h5, h6, table, a")) {
        pushText("text", el, { element: el.tagName.toLowerCase() });
      }
      return;
    }
    for (const child of el.children) walk(child);
  };
  walk(document.body);

  /* ---- menus ---- */
  const menus = [];
  const menuRoots = [...document.querySelectorAll("nav ul, ul.menu, ul[id^='menu'], .menu > ul, #menu-main, .main-menu, .navbar ul")];
  const seenMenu = new Set();
  for (const ul of menuRoots) {
    if ([...seenMenu].some((s) => s.contains(ul))) continue;
    seenMenu.add(ul);
    const parseUl = (list) =>
      [...list.children].filter((li) => li.tagName === "LI").map((li) => {
        const a = li.querySelector(":scope > a");
        const sub = li.querySelector(":scope > ul");
        return { label: clean(a ? a.innerText : li.firstChild?.textContent), href: a ? abs(a.getAttribute("href")) : null, children: sub ? parseUl(sub) : [] };
      }).filter((i) => i.label);
    const items = parseUl(ul);
    if (items.length) menus.push({ region: region(ul), id: ul.id || null, className: clean(String(ul.className)) || null, items });
  }

  /* ---- links ---- */
  const links = [...document.querySelectorAll("a[href]")].map((a) => ({ href: abs(a.getAttribute("href")), text: clean(a.innerText) || clean(a.getAttribute("aria-label")) || clean(a.getAttribute("title")) || (a.querySelector("img") ? "[image: " + (a.querySelector("img").getAttribute("alt") || "") + "]" : ""), region: region(a), rel: a.getAttribute("rel") || null, target: a.getAttribute("target") || null }));

  /* ---- images (all) ---- */
  const images = [...document.querySelectorAll("img")].map((img) => ({ src: abs(imgSrc(img)), srcset: img.getAttribute("srcset") || null, alt: img.getAttribute("alt") || "", title: img.getAttribute("title") || null, width: img.naturalWidth || null, height: img.naturalHeight || null, region: region(img), visible: !!(img.offsetWidth || img.offsetHeight) }));

  /* ---- forms ---- */
  const forms = [...document.querySelectorAll("form")].map((f) => ({
    action: f.getAttribute("action") ? abs(f.getAttribute("action")) : null,
    method: f.getAttribute("method") || "get",
    id: f.id || null,
    className: clean(String(f.className)) || null,
    fields: [...f.querySelectorAll("input, textarea, select")].filter((i) => !["hidden", "submit"].includes(i.type)).map((i) => ({ name: i.name || null, type: i.type || i.tagName.toLowerCase(), placeholder: i.getAttribute("placeholder") || null, required: i.required || i.getAttribute("aria-required") === "true", label: clean(f.querySelector(`label[for="${i.id}"]`)?.innerText) || clean(i.closest("label")?.innerText) || null })),
    submitLabel: clean(f.querySelector("[type=submit], button")?.value || f.querySelector("[type=submit], button")?.innerText) || null,
    hiddenFields: [...f.querySelectorAll("input[type=hidden]")].map((i) => i.name).filter(Boolean),
  }));

  return {
    title: document.title,
    lang: document.documentElement.lang || null,
    meta: {
      description: meta('meta[name="description"]'),
      keywords: meta('meta[name="keywords"]'),
      ogTitle: meta('meta[property="og:title"]'),
      ogDescription: meta('meta[property="og:description"]'),
      ogImage: meta('meta[property="og:image"]'),
      robots: meta('meta[name="robots"]'),
      generator: meta('meta[name="generator"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
    },
    headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({ level: Number(h.tagName[1]), text: clean(h.innerText), region: region(h) })).filter((h) => h.text),
    blocks,
    menus,
    links,
    images,
    forms,
    contactHrefs: links.filter((l) => /^(tel:|mailto:|https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com))/i.test(l.href)).map((l) => l.href),
    bodyText: clean(document.body.innerText),
  };
};

/* ------------------------------------------------------------------ */
/* Crawl loop                                                          */
/* ------------------------------------------------------------------ */
async function main() {
  await mkdir(PAGES_DIR, { recursive: true });
  await mkdir(RAW_DIR, { recursive: true });

  const started = new Date();
  const discovered = new Map(); // url -> {type, status, discoveredFrom, redirectedTo}
  const queue = [];

  const add = (href, base, from) => {
    const url = normalise(href, base);
    if (!url || discovered.has(url)) return;
    const type = classify(url);
    discovered.set(url, { type, status: null, discoveredFrom: from, redirectedTo: null, error: null });
    if (type === "page") queue.push(url);
  };

  add(ORIGIN + "/", ORIGIN, "seed");
  const sitemapUrls = await fetchSitemapUrls(ORIGIN + "/sitemap.xml");
  sitemapUrls.forEach((u) => add(u, ORIGIN, "sitemap"));
  console.log(`Seeded ${queue.length} URLs from sitemap`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36 pioneer-redesign-crawler",
  });

  const results = [];
  const failures = [];
  let processed = 0;

  async function crawlOne(url) {
    const record = discovered.get(url);
    const page = await context.newPage();
    try {
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 }).catch(async (e) => {
        // networkidle can hang on long-polling sites; retry with "load"
        if (/Timeout/i.test(String(e))) return page.goto(url, { waitUntil: "load", timeout: 60_000 });
        throw e;
      });
      const status = response ? response.status() : null;
      record.status = status;
      const finalUrl = page.url();
      if (normalise(finalUrl, url) !== url) record.redirectedTo = finalUrl;

      // Let lazy content settle.
      await page.waitForTimeout(800);
      // Scroll to trigger lazy-loaded images.
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);

      const data = await page.evaluate(EXTRACT);
      const slug = slugFor(url);

      await writeFile(path.join(RAW_DIR, slug + ".html"), await page.content(), "utf8");
      await page.screenshot({ path: path.join(RAW_DIR, slug + ".png"), fullPage: true }).catch(() => {});

      // Discover new URLs
      for (const l of data.links) add(l.href, url, url);
      for (const img of data.images) add(img.src, url, url);
      for (const b of data.blocks) if (b.src) add(b.src, url, url);

      const pageRecord = {
        url,
        finalUrl,
        slug,
        status,
        crawledAt: new Date().toISOString(),
        ...data,
        internalLinks: [...new Set(data.links.map((l) => normalise(l.href, url)).filter(Boolean))],
        externalLinks: [...new Set(data.links.filter((l) => { try { return !HOSTS.has(new URL(l.href).hostname) && /^https?:/.test(l.href); } catch { return false; } }).map((l) => l.href))],
        documents: [...new Set(data.links.filter((l) => DOC_EXT.test(l.href)).map((l) => l.href))],
      };
      await writeFile(path.join(PAGES_DIR, slug + ".json"), JSON.stringify(pageRecord, null, 2), "utf8");
      results.push({ url, slug, status, title: data.title, blocks: data.blocks.length, images: data.images.length, links: data.links.length });
      console.log(`[${status}] ${url}  (${data.blocks.length} blocks, ${data.images.length} imgs)`);
    } catch (err) {
      record.error = String(err && err.message ? err.message : err);
      failures.push({ url, error: record.error });
      console.warn(`[FAIL] ${url}: ${record.error}`);
    } finally {
      await page.close();
      processed++;
    }
  }

  // Simple worker pool over a growing queue.
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length && processed < LIMIT) {
      const url = queue.shift();
      await crawlOne(url);
    }
  });
  await Promise.all(workers);
  // The queue may have grown while the last workers finished.
  while (queue.length && processed < LIMIT) {
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length) }, () => crawlOne(queue.shift())));
  }

  // HEAD-check assets & documents so the report can say what exists.
  for (const [url, rec] of discovered) {
    if (rec.type === "asset" || rec.type === "document") {
      try {
        const res = await fetch(url, { method: "HEAD", redirect: "follow" });
        rec.status = res.status;
        rec.contentType = res.headers.get("content-type");
        rec.contentLength = Number(res.headers.get("content-length")) || null;
      } catch (e) {
        rec.status = null;
        rec.error = String(e.message || e);
      }
    }
  }

  await browser.close();

  const discoveredList = [...discovered.entries()].map(([url, rec]) => ({ url, ...rec })).sort((a, b) => a.url.localeCompare(b.url));
  await writeFile(path.join(OUT, "discovered-urls.json"), JSON.stringify(discoveredList, null, 2), "utf8");

  const summary = {
    source: ORIGIN,
    startedAt: started.toISOString(),
    finishedAt: new Date().toISOString(),
    pagesCrawled: results.length,
    pagesFailed: failures.length,
    byType: discoveredList.reduce((acc, r) => ((acc[r.type] = (acc[r.type] || 0) + 1), acc), {}),
    nonOkPages: results.filter((r) => r.status !== 200),
    failures,
    pages: results,
  };
  await writeFile(path.join(OUT, "crawl-summary.json"), JSON.stringify(summary, null, 2), "utf8");
  console.log("\nDone:", JSON.stringify({ pagesCrawled: summary.pagesCrawled, failed: failures.length, byType: summary.byType }, null, 0));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

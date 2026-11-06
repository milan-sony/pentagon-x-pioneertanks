import type { Page, ConsoleMessage, Request } from "@playwright/test";
import { designConfig } from "../src/data/design-config";

export const DESIGN_ID: string = designConfig.designId;
export const SCREENSHOT_DIR = `screenshots/${DESIGN_ID}`;

/** The two primary pages get the full viewport matrix. */
export const PRIMARY_PAGES = [
  { name: "home", path: "/" },
  { name: "products", path: "/products" },
] as const;

/** Every implemented route; secondary pages are checked at mobile + desktop. */
export const ALL_PAGES = [
  ...PRIMARY_PAGES,
  { name: "product-corrugated", path: "/product/corrugated-zincalum-steel" },
  { name: "product-flat-panel", path: "/product/flat-panel-hdg-steel" },
  { name: "product-flexible", path: "/product/flexible-pvc-storage-tanks" },
  { name: "about", path: "/about" },
  { name: "licenses", path: "/licenses" },
  { name: "gallery", path: "/gallery" },
  { name: "downloads", path: "/downloads" },
  { name: "news", path: "/news" },
  { name: "news-article", path: "/news/the-launch-of-our-new-website" },
  { name: "contact", path: "/contact" },
] as const;

/** Backwards-compatible alias used by older specs. */
export const PAGES = ALL_PAGES;

export const VIEWPORTS = [
  { name: "mobile-small", width: 360, height: 800 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "desktop-large", width: 1920, height: 1080 },
] as const;

export const SECONDARY_VIEWPORTS = [VIEWPORTS[1], VIEWPORTS[4]] as const;

/** Collects console errors and failed network requests for a page. */
export function watchPage(page: Page) {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("requestfailed", (req: Request) => {
    failedRequests.push(`${req.method()} ${req.url()} – ${req.failure()?.errorText}`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("/_next/image")) failedRequests.push(`${res.status()} ${res.url()}`);
  });
  return { consoleErrors, failedRequests };
}

/** Scrolls through the whole page so lazy content and reveal animations settle. */
export async function settle(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
}

export async function horizontalOverflow(page: Page) {
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
}

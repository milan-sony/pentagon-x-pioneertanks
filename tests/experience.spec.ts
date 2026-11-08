import { test as plain } from "@playwright/test";
import { expect, test, ALL_PAGES } from "./helpers";

/** Wording that belongs in the extraction report, never on the public site. */
const META_WORDING = /(from the (pwt|website|brochure|company|live|current))|\(from|design concept|source:|as published|published by|current website|live (site|page)|until one is supplied|client to confirm|confirm with client|verification|placeholder|lorem|coming soon|\(datasheet/i;

plain.describe("preloader", () => {
  plain("shows once per session, then gets out of the way", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    const loader = page.getByTestId("preloader");
    await expect(loader).toBeVisible();
    await expect(loader).toBeHidden({ timeout: 6000 });
    await page.goto("/about");
    await expect(page.getByTestId("preloader")).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.classList.contains("preloader-off"))).toBe(true);
  });

  plain("is skipped for visitors who prefer reduced motion", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "commit" });
    await expect(page.getByTestId("preloader")).toBeHidden();
    await ctx.close();
  });
});

test.describe("404 page", () => {
  test("returns 404, counts down and can be cancelled", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/run dry/i);
    await expect(page.getByTestId("not-found-seconds")).toBeVisible();
    await page.getByTestId("not-found-stay").click();
    await expect(page.getByText(/redirect cancelled/i).first()).toBeVisible();
    await page.waitForTimeout(3500);
    expect(new URL(page.url()).pathname).toBe("/this-page-does-not-exist");
  });

  test("redirects to the home page after about three seconds", async ({ page }) => {
    await page.goto("/another-missing-page");
    await page.waitForURL((url) => url.pathname === "/", { timeout: 7000 });
  });
});

test.describe("navigation", () => {
  test("desktop dropdown closes after choosing an item with the mouse", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByTestId("desktop-nav");
    await nav.getByRole("link", { name: "Products", exact: true }).hover();
    const menu = page.locator("#submenu-desktop-products");
    await expect(menu).toBeVisible();
    await menu.getByRole("link").first().click();
    await page.waitForURL(/\/product\//);
    await expect(menu).toBeHidden();
  });

  test("mobile menu closes after choosing an item", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByTestId("mobile-menu-button").click();
    const sheet = page.getByTestId("mobile-menu");
    await sheet.getByRole("button", { name: /expand products/i }).click();
    await sheet.getByRole("link", { name: /flat panel/i }).click();
    await page.waitForURL(/flat-panel-hdg-steel/);
    await expect(sheet).toBeHidden();
  });
});

test.describe("home interactions", () => {
  test("product strip scrolls by itself and the pause button stops it", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const list = page.getByTestId("product-carousel");
    await list.scrollIntoViewIfNeeded();
    await page.mouse.move(2, 2);
    const start = await list.evaluate((e) => e.scrollLeft);
    await expect.poll(() => list.evaluate((e) => e.scrollLeft), { timeout: 8000 }).toBeGreaterThan(start);
    await page.getByTestId("carousel-toggle").click();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(800);
    const paused = await list.evaluate((e) => e.scrollLeft);
    await page.waitForTimeout(4500);
    expect(await list.evaluate((e) => e.scrollLeft)).toBe(paused);
    await expect(page.getByTestId("carousel-toggle")).toHaveAccessibleName("Start automatic scrolling");
  });

  test("product strip auto-scrolls even when the visitor prefers reduced motion", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    const list = page.getByTestId("product-carousel");
    await list.scrollIntoViewIfNeeded();
    await page.mouse.move(2, 2);
    await expect(page.getByTestId("carousel-toggle")).toHaveAccessibleName("Pause automatic scrolling");
    const start = await list.evaluate((e) => e.scrollLeft);
    await expect.poll(() => list.evaluate((e) => e.scrollLeft), { timeout: 8000 }).toBeGreaterThan(start);
    await ctx.close();
  });

  test("floating actions are round, icon-only and labelled", async ({ page }) => {
    await page.goto("/");
    for (const id of ["floating-contact", "floating-whatsapp"]) {
      const el = page.getByTestId(id);
      expect((await el.innerText()).trim()).toBe("");
      await expect(el).toHaveAccessibleName(/contact|whatsapp/i);
      const radius = await el.evaluate((e) => getComputedStyle(e).borderRadius);
      expect(parseFloat(radius)).toBeGreaterThanOrEqual(20);
    }
  });
});

test("no source notes or meta wording on any page", async ({ page }) => {
  for (const p of ALL_PAGES) {
    await page.goto(p.path);
    const text = await page.locator("body").innerText();
    const hits = text.split(/\n|(?<=[.!?])\s+/).filter((line) => META_WORDING.test(line));
    expect(hits, `${p.path}`).toEqual([]);
  }
});

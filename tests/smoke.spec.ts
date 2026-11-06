import { test, expect } from "@playwright/test";
import { PAGES, watchPage, settle } from "./helpers";

for (const p of PAGES) {
  test.describe(`${p.name} page`, () => {
    test("renders with one h1, no console errors and no failed requests", async ({ page }) => {
      const watch = watchPage(page);
      const res = await page.goto(p.path);
      expect(res?.status()).toBe(200);
      await settle(page);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toBeVisible();
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      expect(watch.consoleErrors, "console errors").toEqual([]);
      expect(watch.failedRequests, "failed requests").toEqual([]);
    });

    test("floating actions are present and wired", async ({ page }) => {
      await page.goto(p.path);
      const wa = page.getByTestId("floating-whatsapp");
      await expect(wa).toBeVisible();
      await expect(wa).toHaveAttribute("href", /^https:\/\/wa\.me\//);
      await expect(wa).toHaveAttribute("target", "_blank");
      const contact = page.getByTestId("floating-contact");
      await expect(contact).toBeVisible();
      const href = await contact.getAttribute("href");
      expect(href).toBeTruthy();
      if (href!.startsWith("#")) {
        await expect(page.locator(href!)).toHaveCount(1);
      }
      // Touch target sizes (WCAG 2.5.8 minimum 24px; we aim for 44px).
      for (const el of [wa, contact]) {
        const box = await el.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.width).toBeGreaterThanOrEqual(44);
      }
    });

    test("every image has alt text and loads", async ({ page }) => {
      await page.goto(p.path);
      await settle(page);
      // Lazy images only start loading once scrolled into view: bring each one in and wait for decode.
      const results = await page.evaluate(async () => {
        const imgs = [...document.querySelectorAll("img")];
        const out: { src: string; alt: string | null; ok: boolean }[] = [];
        for (const img of imgs) {
          img.scrollIntoView({ block: "center" });
          const timeout = new Promise<void>((r) => setTimeout(r, 4000));
          await Promise.race([img.decode().catch(() => undefined), timeout]);
          out.push({ src: img.currentSrc || img.src, alt: img.getAttribute("alt"), ok: img.complete && img.naturalWidth > 0 });
        }
        window.scrollTo(0, 0);
        return out;
      });
      const missingAlt = results.filter((r) => r.alt === null);
      expect(missingAlt, "images without alt attribute").toEqual([]);
      const broken = results.filter((r) => !r.ok);
      expect(broken, "images that did not load").toEqual([]);
    });
  });
}

test("header navigation covers every extracted page and the quote CTA", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByTestId("desktop-nav");
  for (const label of ["Home", "About", "Products", "Gallery", "Downloads", "News", "Contact"]) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toHaveCount(1);
  }
  await expect(nav.getByRole("link", { name: /request a quote/i })).toBeVisible();
});

test("mobile menu opens, lists navigation and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.getByTestId("mobile-menu-button");
  await expect(button).toBeVisible();
  await button.click();
  const menu = page.getByTestId("mobile-menu");
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Products", exact: true })).toBeVisible();
  await menu.getByRole("button", { name: /expand products/i }).click();
  await expect(menu.getByRole("link", { name: /corrugated/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});

test("enquiry form validates and reports errors accessibly", async ({ page }) => {
  await page.goto("/");
  const form = page.getByTestId("enquiry-form");
  await form.scrollIntoViewIfNeeded();
  await form.getByRole("button", { name: /send enquiry/i }).click();
  const alerts = form.getByRole("alert");
  await expect(alerts.first()).toBeVisible();
  expect(await alerts.count()).toBeGreaterThanOrEqual(3);
  await expect(form.locator('[name="name"]')).toHaveAttribute("aria-invalid", "true");
  await expect(form.locator('[name="name"]')).toBeFocused();
});

test("product links from the products page resolve to reserved product routes", async ({ page }) => {
  await page.goto("/products");
  const links = await page.$$eval('a[href^="/product/"]', (as) => [...new Set(as.map((a) => a.getAttribute("href")!))]);
  expect(links.length).toBeGreaterThanOrEqual(3);
  for (const href of links) {
    const res = await page.goto(href);
    expect(res?.status(), href).toBe(200);
    await expect(page.getByTestId("future-page-badge")).toBeVisible();
  }
});

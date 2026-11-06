import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { PRIMARY_PAGES, ALL_PAGES, VIEWPORTS, SECONDARY_VIEWPORTS, SCREENSHOT_DIR, settle, horizontalOverflow } from "./helpers";

test.beforeAll(() => mkdirSync(SCREENSHOT_DIR, { recursive: true }));

for (const p of PRIMARY_PAGES) {
  for (const vp of VIEWPORTS) {
    test(`${p.name} @ ${vp.name} (${vp.width}×${vp.height}) – no horizontal overflow + screenshot`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path);
      await settle(page);
      const { scrollWidth, clientWidth } = await horizontalOverflow(page);
      expect(scrollWidth, `horizontal overflow on ${p.path} at ${vp.name}`).toBeLessThanOrEqual(clientWidth);
      await page.screenshot({ path: `${SCREENSHOT_DIR}/${p.name}-${vp.name}.png`, fullPage: true });
    });
  }
}

for (const p of ALL_PAGES.slice(2)) {
  for (const vp of SECONDARY_VIEWPORTS) {
    test(`${p.name} @ ${vp.name} – no horizontal overflow + screenshot`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path);
      await settle(page);
      const { scrollWidth, clientWidth } = await horizontalOverflow(page);
      expect(scrollWidth, `horizontal overflow on ${p.path} at ${vp.name}`).toBeLessThanOrEqual(clientWidth);
      await page.screenshot({ path: `${SCREENSHOT_DIR}/${p.name}-${vp.name}.png`, fullPage: true });
    });
  }
}

test("interactive states: mobile menu open, desktop dropdown open, form errors, lightbox", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByTestId("mobile-menu-button").click();
  await page.getByTestId("mobile-menu").getByRole("button", { name: /expand products/i }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/state-mobile-menu-open.png` });
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByTestId("desktop-nav").getByRole("link", { name: "Products", exact: true }).hover();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/state-desktop-dropdown-open.png` });

  const form = page.getByTestId("enquiry-form");
  await form.scrollIntoViewIfNeeded();
  await form.getByRole("button", { name: /send enquiry/i }).click();
  await page.waitForTimeout(200);
  await form.screenshot({ path: `${SCREENSHOT_DIR}/state-form-validation.png` });

  await page.goto("/gallery");
  await settle(page);
  await page.getByRole("button", { name: /open image/i }).first().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/state-gallery-lightbox.png` });
});

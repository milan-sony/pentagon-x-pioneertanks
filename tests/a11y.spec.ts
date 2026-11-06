import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { PAGES, settle, DESIGN_ID } from "./helpers";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const p of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`axe WCAG 2.2 AA – ${p.name} @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path);
      await settle(page);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();

      mkdirSync("test-results/axe", { recursive: true });
      writeFileSync(`test-results/axe/${DESIGN_ID}-${p.name}-${vp.name}.json`, JSON.stringify(results.violations, null, 2));

      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      const summary = results.violations.map((v) => `${v.impact}: ${v.id} (${v.nodes.length}) – ${v.help}`).join("\n");
      test.info().annotations.push({ type: "axe", description: summary || "no violations" });
      expect(serious.map((v) => `${v.id}: ${v.help} [${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}]`), "serious/critical axe violations").toEqual([]);
    });
  }
}

test("keyboard: skip link is first focusable and reaches main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(focused).toMatch(/skip to main content/i);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("keyboard: desktop dropdown is reachable with Tab", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const productsLink = page.getByTestId("desktop-nav").getByRole("link", { name: "Products", exact: true });
  await productsLink.focus();
  await page.keyboard.press("Tab");
  const focusedText = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(focusedText).toMatch(/corrugated|flat panel|flexible/i);
});

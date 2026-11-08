import { expect, test, ALL_PAGES as PAGES } from "./helpers";

/** Every internal link and document on the implemented pages must resolve. External links are HEAD-checked but only reported. */
test("all internal links and documents resolve", async ({ page, request, baseURL }) => {
  const internal = new Set<string>();
  const external = new Set<string>();
  for (const p of PAGES) {
    await page.goto(p.path);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")!));
    for (const href of hrefs) {
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (href.startsWith("http") && !href.startsWith(baseURL!)) {
        external.add(href);
      } else {
        internal.add(href.split("#")[0]);
      }
    }
  }
  const broken: string[] = [];
  for (const href of internal) {
    if (!href) continue;
    const res = await request.get(href);
    if (res.status() >= 400) broken.push(`${res.status()} ${href}`);
  }
  expect(broken, "broken internal links").toEqual([]);
  expect(internal.size).toBeGreaterThan(10);

  const externalReport: string[] = [];
  for (const href of external) {
    if (/wa\.me|facebook|twitter|x\.com/.test(href)) continue; // social/WhatsApp endpoints block bots
    try {
      const res = await request.head(href, { timeout: 15_000 });
      if (res.status() >= 400) externalReport.push(`${res.status()} ${href}`);
    } catch (e) {
      externalReport.push(`ERR ${href}: ${(e as Error).message}`);
    }
  }
  test.info().annotations.push({ type: "external-links", description: externalReport.length ? externalReport.join("\n") : `${external.size} external links OK` });
});

test("in-page anchors used by CTAs exist", async ({ page }) => {
  for (const p of PAGES) {
    await page.goto(p.path);
    const anchors = await page.$$eval('a[href^="#"]', (as) => [...new Set(as.map((a) => a.getAttribute("href")!))]);
    for (const a of anchors) {
      if (a === "#") throw new Error(`Decorative "#" link found on ${p.path}`);
      await expect(page.locator(a), `${p.path} anchor ${a}`).toHaveCount(1);
    }
  }
});

// @ts-check
/**
 * Single navigation configuration for header, mobile menu and footer.
 * Derived from the extracted site structure – do not duplicate link lists in components.
 */
import { websiteData } from "./website-content.js";

/** @type {import('../types/content').NavigationItem[]} */
export const mainNavigation = websiteData.navigation;

/** @type {import('../types/content').NavigationItem[]} */
export const footerNavigation = websiteData.footerNavigation;

/** Primary call-to-action shown in the header on every design. */
export const headerCta = { label: "Request a Quote", href: "/#enquiry" };

/** Flat list of every route the site exposes (used by sitemap.ts and link tests). */
export function allRoutes() {
  /** @type {string[]} */
  const routes = [];
  const walk = (/** @type {import('../types/content').NavigationItem[]} */ items) => {
    for (const item of items) {
      if (!routes.includes(item.href)) routes.push(item.href);
      if (item.children) walk(item.children);
    }
  };
  walk(mainNavigation);
  walk(footerNavigation);
  return routes;
}

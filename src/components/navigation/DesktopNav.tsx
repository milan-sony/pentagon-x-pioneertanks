"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { NavigationItem } from "@/types/content";
import { cn } from "@/lib/utils";

export interface DesktopNavProps {
  items: NavigationItem[];
  cta?: { label: string; href: string };
  classNames?: { nav?: string; link?: string; active?: string; dropdown?: string; dropdownLink?: string; cta?: string };
}

/**
 * Accessible desktop navigation with hover/focus dropdowns.
 * Dropdowns open on hover and on focus-within, and stay keyboard reachable.
 */
export function DesktopNav({ items, cta, classNames = {} }: DesktopNavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav aria-label="Main" className={cn("hidden items-center gap-1 lg:flex", classNames.nav)} data-testid="desktop-nav">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(item.href);
          if (!item.children?.length) {
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("inline-flex min-h-11 items-center px-3 text-sm font-medium", classNames.link, active && classNames.active)}>
                  {item.label}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("inline-flex min-h-11 items-center gap-1 px-3 text-sm font-medium", classNames.link, active && classNames.active)}
              >
                {item.label}
                <ChevronDown className="size-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
              </Link>
              <ul
                className={cn(
                  "invisible absolute left-0 top-full z-50 min-w-64 translate-y-1 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                  classNames.dropdown,
                )}
                aria-label={`${item.label} submenu`}
              >
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className={cn("block px-4 py-3 text-sm", classNames.dropdownLink)}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      {cta ? (
        <Link href={cta.href} className={cn("ml-3 inline-flex min-h-11 items-center px-4 text-sm font-semibold", classNames.cta)}>
          {cta.label}
        </Link>
      ) : null}
    </nav>
  );
}

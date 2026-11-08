"use client";

import { useEffect, useRef, useState } from "react";
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
 * Accessible desktop navigation with dropdowns.
 * A dropdown opens on hover, on keyboard focus and with the chevron button, and closes as soon as
 * an item is chosen, the route changes, Escape is pressed or the pointer/focus leaves it.
 */
export function DesktopNav({ items, cta, classNames = {} }: DesktopNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close any open dropdown when the route changes (state adjusted during render, not in an effect).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  /** Close after a choice and drop focus so the dropdown cannot stay visible on the next page. */
  const choose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(null);
    e.currentTarget.blur();
  };

  return (
    <nav ref={navRef} aria-label="Main" className={cn("hidden items-center gap-1 lg:flex", classNames.nav)} data-testid="desktop-nav">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(item.href);
          if (!item.children?.length) {
            return (
              <li key={item.href}>
                <Link href={item.href} onClick={choose} aria-current={active ? "page" : undefined} className={cn("inline-flex min-h-11 items-center px-3 text-sm font-medium", classNames.link, active && classNames.active)}>
                  {item.label}
                </Link>
              </li>
            );
          }
          const isOpen = open === item.href;
          const menuId = `submenu-desktop-${item.href.replace(/\W/g, "") || "root"}`;
          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => setOpen(item.href)}
              onMouseLeave={() => setOpen((o) => (o === item.href ? null : o))}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen((o) => (o === item.href ? null : o));
              }}
            >
              <div className="flex items-center">
                <Link href={item.href} onClick={choose} aria-current={active ? "page" : undefined} className={cn("inline-flex min-h-11 items-center pl-3 pr-1 text-sm font-medium", classNames.link, active && classNames.active)}>
                  {item.label}
                </Link>
                <button
                  type="button"
                  className={cn("inline-flex min-h-11 items-center pr-2", classNames.link, active && classNames.active)}
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  aria-label={`${isOpen ? "Close" : "Open"} ${item.label} menu`}
                  onClick={() => setOpen(isOpen ? null : item.href)}
                >
                  <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
                </button>
              </div>
              <ul
                id={menuId}
                className={cn(
                  "absolute left-0 top-full z-50 min-w-64 py-2 transition-[opacity,translate,scale,visibility] duration-200",
                  isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0",
                  classNames.dropdown,
                )}
                aria-label={`${item.label} submenu`}
              >
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} onClick={choose} onFocus={() => setOpen(item.href)} aria-current={pathname === child.href ? "page" : undefined} className={cn("block px-4 py-3 text-sm", classNames.dropdownLink)}>
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
        <Link href={cta.href} onClick={choose} className={cn("ml-3 inline-flex min-h-11 items-center px-4 text-sm font-semibold", classNames.cta)}>
          {cta.label}
        </Link>
      ) : null}
    </nav>
  );
}

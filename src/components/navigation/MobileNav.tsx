"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import type { NavigationItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { contact } from "@/lib/content";

export interface MobileNavProps {
  items: NavigationItem[];
  cta?: { label: string; href: string };
  classNames?: { trigger?: string; panel?: string; link?: string; sublink?: string; cta?: string };
}

/** Off-canvas mobile navigation (Radix Dialog via shadcn Sheet: focus trap, Esc, aria). */
export function MobileNav({ items, cta, classNames = {} }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type="button" className={cn("inline-flex size-11 items-center justify-center lg:hidden", classNames.trigger)} aria-label="Open menu" data-testid="mobile-menu-button">
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className={cn("flex w-[88vw] max-w-sm flex-col gap-0 overflow-y-auto p-0", classNames.panel)} showCloseButton={false} data-testid="mobile-menu">
        <div className="flex items-center justify-between px-5 py-4">
          <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
          <SheetClose asChild>
            <button type="button" className="inline-flex size-11 items-center justify-center" aria-label="Close menu">
              <X className="size-6" aria-hidden="true" />
            </button>
          </SheetClose>
        </div>
        <nav aria-label="Mobile" className="flex-1">
          <ul>
            {items.map((item) => {
              const hasChildren = !!item.children?.length;
              const isExpanded = expanded === item.href;
              return (
                <li key={item.href}>
                  <div className="flex items-stretch">
                    <Link href={item.href} onClick={() => setOpen(false)} className={cn("flex min-h-12 flex-1 items-center px-5 text-base font-medium", classNames.link)}>
                      {item.label}
                    </Link>
                    {hasChildren ? (
                      <button
                        type="button"
                        className="inline-flex w-12 items-center justify-center"
                        aria-expanded={isExpanded}
                        aria-controls={`submenu-${item.href.replace(/\W/g, "")}`}
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
                        onClick={() => setExpanded(isExpanded ? null : item.href)}
                      >
                        <ChevronDown className={cn("size-5 transition-transform", isExpanded && "rotate-180")} aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                  {hasChildren ? (
                    <ul id={`submenu-${item.href.replace(/\W/g, "")}`} hidden={!isExpanded}>
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={() => setOpen(false)} className={cn("flex min-h-12 items-center px-8 text-sm", classNames.sublink)}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="grid gap-3 px-5 py-5">
          {cta ? (
            <Link href={cta.href} onClick={() => setOpen(false)} className={cn("inline-flex min-h-12 items-center justify-center px-4 font-semibold", classNames.cta)}>
              {cta.label}
            </Link>
          ) : null}
          <a href={contact.phoneHref} className="text-sm">
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="text-sm">
            {contact.email}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

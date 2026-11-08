import Link from "next/link";
import Image from "next/image";
import { mainNavigation, headerCta } from "@/data/navigation.js";
import { company, contact } from "@/lib/content";
import { MobileNav } from "@/components/navigation/MobileNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { HeaderShell } from "@/components/layout/HeaderShell";

/** Header: cream bar (shadow once scrolled, hides on scroll down), uppercase links, water-blue CTA. */
export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 xl:px-10">
        <Link href="/" className="flex items-center" aria-label={`${company.name} – home`}>
          <Image src={company.logo.src} alt={company.logo.alt} width={company.logo.width} height={company.logo.height} className="h-10 w-auto" priority />
        </Link>
        <DesktopNav
          items={mainNavigation}
          cta={{ label: headerCta.label, href: "/contact" }}
          classNames={{
            link: "eyebrow text-ink/80 hover:text-water",
            active: "text-water",
            dropdown: "rounded-md border border-border bg-paper shadow-[0_24px_48px_-20px_rgb(43_33_27/0.35)]",
            dropdownLink: "text-ink transition-colors hover:bg-cream hover:pl-5 hover:text-water [transition-property:color,background-color,padding]",
            cta: "rounded-md bg-water text-white hover:bg-water-deep eyebrow",
          }}
        />
        <MobileNav
          items={mainNavigation}
          contact={{ phone: contact.phone, phoneHref: contact.phoneHref, email: contact.email }}
          cta={{ label: headerCta.label, href: "/contact" }}
          classNames={{
            trigger: "text-ink",
            panel: "bg-cream text-ink border-l border-border",
            link: "font-display text-xl font-semibold uppercase tracking-wider text-ink hover:text-water",
            sublink: "text-taupe-text hover:text-water",
            cta: "rounded-md bg-water text-white eyebrow",
          }}
        />
      </div>
    </HeaderShell>
  );
}

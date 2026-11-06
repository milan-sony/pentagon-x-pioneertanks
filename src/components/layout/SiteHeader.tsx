import Link from "next/link";
import Image from "next/image";
import { mainNavigation, headerCta } from "@/data/navigation.js";
import { company } from "@/lib/content";
import { MobileNav } from "@/components/navigation/MobileNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";

/** Design 04 header: cream bar, wide uppercase links, water-blue CTA. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/90 backdrop-blur-md">
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
            dropdown: "rounded-md border border-border bg-paper shadow-card",
            dropdownLink: "text-ink hover:bg-cream hover:text-water",
            cta: "rounded-md bg-water text-white hover:bg-water-deep eyebrow",
          }}
        />
        <MobileNav
          items={mainNavigation}
          cta={{ label: headerCta.label, href: "/contact" }}
          classNames={{
            trigger: "text-ink",
            panel: "bg-cream text-ink border-l border-border",
            link: "font-display text-xl font-bold uppercase tracking-wider text-ink hover:text-water",
            sublink: "text-taupe-text hover:text-water",
            cta: "rounded-md bg-water text-white eyebrow",
          }}
        />
      </div>
    </header>
  );
}

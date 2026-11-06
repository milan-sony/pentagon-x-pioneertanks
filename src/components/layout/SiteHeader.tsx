import Link from "next/link";
import Image from "next/image";
import { mainNavigation, headerCta } from "@/data/navigation.js";
import { company } from "@/lib/content";
import { MobileNav } from "@/components/navigation/MobileNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";

/**
 * Baseline header. Design branches replace this component with their own
 * composition but keep the same data sources (navigation.js, content).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${company.name} – home`}>
          <Image src={company.logo.src} alt={company.logo.alt} width={company.logo.width} height={company.logo.height} className="h-9 w-auto" priority />
        </Link>
        <DesktopNav items={mainNavigation} cta={headerCta} />
        <MobileNav items={mainNavigation} cta={headerCta} />
      </div>
    </header>
  );
}

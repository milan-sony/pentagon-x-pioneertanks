import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  primary: "bg-water text-white hover:bg-water-deep",
  dark: "bg-espresso text-cream hover:bg-espresso-2",
  outline: "border border-ink/30 text-ink hover:border-water hover:text-water",
  outlineLight: "border border-cream/40 text-cream hover:border-bronze hover:text-bronze",
  light: "bg-cream text-ink hover:bg-paper",
};

/** Design 04 button/link with the signature arrow. Renders a Next Link for internal routes. */
export function Cta({ href, children, variant = "primary", className, arrow = true, download, external }: { href: string; children: React.ReactNode; variant?: keyof typeof styles; className?: string; arrow?: boolean; download?: boolean; external?: boolean }) {
  const cls = cn("group inline-flex min-h-12 items-center gap-2 rounded-md px-6 font-display text-sm font-bold uppercase tracking-[0.14em] transition-colors", styles[variant], className);
  const icon = arrow ? <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /> : null;
  if (download || external || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} download={download} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

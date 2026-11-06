import Link from "next/link";
import { footerNavigation } from "@/data/navigation.js";
import { company, contact, getActiveSocialLinks } from "@/lib/content";
import { BUILD_YEAR } from "@/lib/constants";

/** Baseline footer – replaced per design branch. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-semibold">{company.legalName}</p>
          <address className="mt-2 not-italic text-sm text-muted-foreground">{contact.address.full}</address>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-2 text-sm">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="grid gap-2 text-sm">
          <li>
            <a href={contact.phoneHref} className="hover:underline">
              {contact.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </li>
          {getActiveSocialLinks().map((s) => (
            <li key={s.platform}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {s.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {BUILD_YEAR} {company.legalName}
      </p>
    </footer>
  );
}

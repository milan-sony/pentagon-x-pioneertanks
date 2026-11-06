import type { Metadata } from "next";
import Link from "next/link";
import { company, getPage, getProducts, getProductFamilies, getCredibilityFacts } from "@/lib/content";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { ENQUIRY_ANCHOR } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${company.name} | ${company.tagline}`,
  description: company.description,
};

/**
 * Baseline homepage (main branch). It proves the content pipeline renders and
 * gives the test harness something to exercise. Each design branch replaces
 * this file with its own composition.
 */
export default function HomePage() {
  const home = getPage("home");
  const hero = home.sections.find((s) => s.id === "hero")!;
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-bold">{hero.heading}</h1>
        <p className="mt-4 max-w-2xl text-lg">{hero.subheading}</p>
        <div className="mt-8 flex gap-4">
          <Link href="/products" className="inline-flex min-h-12 items-center bg-primary px-6 font-semibold text-primary-foreground">
            Explore Products
          </Link>
          <a href={`#${ENQUIRY_ANCHOR}`} className="inline-flex min-h-12 items-center border px-6 font-semibold">
            Request a Quote
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold">Product families</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {getProductFamilies().map((f) => (
            <li key={f.id} className="border p-6">
              <h3 className="text-xl font-semibold">{f.name}</h3>
              <p className="mt-2">{f.tagline}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {getProducts().map((p) => (
            <li key={p.slug} className="border p-6">
              <h3 className="text-lg font-semibold">{p.shortName}</h3>
              <p className="mt-2 text-sm">{p.summary}</p>
              <Link href={p.route} className="mt-4 inline-block underline">
                View product
              </Link>
            </li>
          ))}
        </ul>
        <dl className="mt-10 grid gap-4 sm:grid-cols-4">
          {getCredibilityFacts().map((f) => (
            <div key={f.label} className="border p-4">
              <dt className="text-xs uppercase">{f.label}</dt>
              <dd className="text-xl font-bold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section id={ENQUIRY_ANCHOR} className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-bold">Request a quote</h2>
        <div className="mt-6">
          <EnquiryForm productOptions={getProducts().map((p) => ({ value: p.slug, label: p.shortName }))} classNames={{ input: "border px-3 py-2", button: "bg-primary text-primary-foreground", error: "text-destructive" }} />
        </div>
      </section>
    </>
  );
}

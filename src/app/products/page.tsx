import type { Metadata } from "next";
import Link from "next/link";
import { getPage, getProducts, getDocument } from "@/lib/content";
import { ENQUIRY_ANCHOR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Products",
  description: "Corrugated Zincalume steel liner tanks, flat panel HDG steel tanks and flexible PVC storage tanks by Pioneer Water Tanks, Abu Dhabi.",
};

/** Baseline products page – replaced per design branch. */
export default function ProductsPage() {
  const page = getPage("products");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <div className="mt-10 grid gap-10">
        {getProducts().map((p) => (
          <article key={p.slug} id={p.slug} className="border p-6">
            <h2 className="text-2xl font-semibold">{p.name}</h2>
            <p className="mt-2">{p.summary}</p>
            <h3 className="mt-6 font-semibold">Specifications</h3>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {p.specifications.map((s) => (
                  <tr key={s.label} className="border-t align-top">
                    <th scope="row" className="py-2 pr-4 text-left font-medium">{s.label}</th>
                    <td className="py-2">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-4 flex flex-wrap gap-4 text-sm">
              {p.documents.map((d) => {
                const doc = getDocument(d);
                return (
                  <li key={d}>
                    <a href={doc.localPath} className="underline" download>
                      {doc.title}
                    </a>
                  </li>
                );
              })}
              <li>
                <Link href={p.route} className="underline">
                  Product page
                </Link>
              </li>
              <li>
                <a href={`/#${ENQUIRY_ANCHOR}`} className="underline">
                  Request a quote
                </a>
              </li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

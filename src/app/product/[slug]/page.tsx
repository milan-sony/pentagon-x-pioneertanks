import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FuturePage } from "@/components/shared/FuturePage";
import { getDocument, getPage, getProduct, getProducts } from "@/lib/content";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? product.name : "Product", description: product?.summary };
}

/**
 * Future product detail route. Reserved so that every product link resolves
 * today; shows verified key facts and datasheets until the full page is built.
 */
export default async function ProductDetailPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const page = getPage(`product-${slug}`);
  return (
    <FuturePage page={{ ...page, title: product.name }} summary={product.summary}>
      <dl className="grid gap-4 sm:grid-cols-2">
        {product.keyFacts.map((f) => (
          <div key={f.label} className="border-l-4 border-current pl-4">
            <dt className="text-xs font-semibold uppercase tracking-wider opacity-70">{f.label}</dt>
            <dd className="text-lg font-bold">{f.value}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-8 grid gap-2 text-sm font-semibold">
        {product.documents.map((id) => {
          const doc = getDocument(id);
          return (
            <li key={id}>
              <a href={doc.localPath} className="underline underline-offset-4" download>
                Download: {doc.title} (PDF)
              </a>
            </li>
          );
        })}
      </ul>
    </FuturePage>
  );
}

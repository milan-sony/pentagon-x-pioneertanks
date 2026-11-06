import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpecTable } from "@/components/shared/SpecTable";
import { CapacityChart } from "@/components/shared/CapacityChart";
import { getDocument, getProduct, getProducts } from "@/lib/content";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? product.name : "Product", description: product?.summary };
}

/** Baseline product detail – themes replace this file. */
export default async function ProductDetailPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <p className="mt-4">{product.summary}</p>
      {product.description.map((p) => (
        <p key={p} className="mt-3">
          {p}
        </p>
      ))}
      <h2 className="mt-10 text-2xl font-semibold">Specifications</h2>
      <SpecTable specs={product.specifications} caption={`${product.name} specifications`} className="mt-4" />
      {product.capacityChart ? (
        <div className="mt-10">
          <CapacityChart chart={product.capacityChart} />
        </div>
      ) : null}
      <ul className="mt-8 grid gap-2">
        {product.documents.map((id) => {
          const d = getDocument(id);
          return (
            <li key={id}>
              <a href={d.localPath} download className="underline">
                {d.title}
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

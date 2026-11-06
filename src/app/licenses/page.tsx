import type { Metadata } from "next";
import Image from "next/image";
import { assetSrc, getAsset, getCertifications, getPage } from "@/lib/content";

const page = getPage("licenses");
export const metadata: Metadata = { title: page.title, description: "Licences and certificates published by Pioneer Water Tanks." };

/** Baseline Licenses page – themes replace this file. */
export default function LicensesPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <ul className="mt-10 grid gap-8 md:grid-cols-3">
        {getCertifications().map((c) => {
          const a = getAsset(c.image);
          return (
            <li key={c.id} className="border p-4">
              <Image src={assetSrc(c.image)} alt={a.alt} width={a.width} height={a.height} />
              <h2 className="mt-4 text-xl font-semibold">{c.name}</h2>
              {c.issuer ? <p className="mt-1 text-sm">Issued by {c.issuer}</p> : null}
              <ul className="mt-3 list-disc pl-5 text-sm">
                {c.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

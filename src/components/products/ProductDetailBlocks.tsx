import Image from "next/image";
import { FileDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { SpecTable } from "@/components/shared/SpecTable";
import { CapacityChart } from "@/components/shared/CapacityChart";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, getAsset, getDocument } from "@/lib/content";
import type { Product } from "@/types/content";

const specClasses = { head: "border-b border-ink text-ink font-display uppercase tracking-wide text-xs", row: "border-b border-border", label: "text-ink", value: "text-ink/85", tag: "text-taupe-text" };

/** Key facts + CTAs + datasheet buttons. */
export function ProductFacts({ product }: { product: Product }) {
  const docs = product.documents.map(getDocument);
  return (
    <Reveal className="rounded-md bg-paper p-6 shadow-card">
      <dl className="grid grid-cols-2 gap-5">
        {product.keyFacts.map((f) => (
          <div key={f.label}>
            <dt className="eyebrow text-taupe-text">{f.label}</dt>
            <dd className="mt-1 font-display text-2xl font-bold text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 grid gap-2">
        <Cta href={`/contact?product=${product.slug}`}>Request a quote</Cta>
        {docs.map((d) => (
          <a key={d.id} href={d.localPath} download className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-md border border-ink/20 px-4 text-sm font-semibold text-ink transition-colors hover:border-water hover:text-water">
            <span>
              {d.type === "brochure" ? "Company brochure" : `${d.series} datasheet`} (PDF, {d.pages} {d.pages === 1 ? "page" : "pages"})
            </span>
            <FileDown className="size-4 shrink-0" aria-hidden="true" />
          </a>
        ))}
      </div>
    </Reveal>
  );
}

/** Tabbed technical content: specification, features, accessories & foundation, applications, benefits, capacity chart. */
export function ProductTechnicalTabs({ product }: { product: Product }) {
  const tabClass = "rounded-none border-b-2 border-transparent px-4 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-taupe-text data-[state=active]:border-water data-[state=active]:text-ink data-[state=active]:shadow-none";
  return (
    <Tabs defaultValue="specification" className="w-full">
      <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger value="specification" className={tabClass}>
          Specification
        </TabsTrigger>
        <TabsTrigger value="features" className={tabClass}>
          Features
        </TabsTrigger>
        <TabsTrigger value="accessories" className={tabClass}>
          Accessories & foundation
        </TabsTrigger>
        <TabsTrigger value="applications" className={tabClass}>
          Applications
        </TabsTrigger>
        {product.benefits.length ? (
          <TabsTrigger value="benefits" className={tabClass}>
            Benefits
          </TabsTrigger>
        ) : null}
        {product.capacityChart ? (
          <TabsTrigger value="capacity" className={tabClass}>
            Capacity chart
          </TabsTrigger>
        ) : null}
      </TabsList>
      <TabsContent value="specification" className="pt-6">
        <SpecTable specs={product.specifications} caption={`${product.name} specification`} classNames={specClasses} />
        {product.variants?.length ? (
          <Accordion type="multiple" defaultValue={product.variants.map((v) => v.id)} className="mt-8">
            {product.variants.map((v) => (
              <AccordionItem key={v.id} value={v.id} className="border-border">
                <AccordionTrigger className="py-4 font-display text-lg font-bold uppercase tracking-wide hover:no-underline">{v.name}</AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-taupe-text">{v.summary}</p>
                  <SpecTable specs={v.specifications} caption={`${v.name} specification`} className="mt-4" classNames={specClasses} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}
      </TabsContent>
      <TabsContent value="features" className="pt-6">
        <Stagger as="ul" className="grid gap-5 md:grid-cols-2">
          {product.features.map((f) => (
            <StaggerItem as="li" key={f.title} className="rounded-md border border-border bg-paper p-5">
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe-text">{f.body}</p>
              {f.source === "document" ? <p className="mt-2 text-xs text-taupe-text">Source: PWT brochure / datasheet</p> : null}
            </StaggerItem>
          ))}
        </Stagger>
      </TabsContent>
      <TabsContent value="accessories" className="pt-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-ink">Accessories</h3>
            <ul className="mt-3 grid gap-2 text-ink/85">
              {product.accessories.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-water" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-ink">Foundation</h3>
            {product.foundation?.length ? (
              <ul className="mt-3 grid gap-2 text-ink/85">
                {product.foundation.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-taupe-text">Flexible tanks are supplied with a ground-protection sheet and need no foundation; see accessories.</p>
            )}
            {product.warranty ? <p className="mt-4 text-sm text-ink/85">Warranty: {product.warranty}</p> : null}
            {product.designLife ? <p className="text-sm text-ink/85">Design life: {product.designLife}</p> : null}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="applications" className="pt-6">
        <ul className="grid gap-3 text-ink/85">
          {product.applications.map((a) => (
            <li key={a} className="rounded-md bg-paper p-4">
              {a}
            </li>
          ))}
        </ul>
      </TabsContent>
      {product.benefits.length ? (
        <TabsContent value="benefits" className="pt-6">
          <ul className="grid gap-2 text-ink/85 md:grid-cols-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </TabsContent>
      ) : null}
      {product.capacityChart ? (
        <TabsContent value="capacity" className="pt-6">
          <CapacityChart chart={product.capacityChart} classNames={{ head: "border-b border-ink font-display text-xs uppercase tracking-wide", sticky: "bg-cream", note: "text-taupe-text" }} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}

/** Photo gallery for the product. */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.images.slice(0, 8).map(getAsset);
  return (
    <Stagger as="ul" className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {images.map((img, i) => (
        <StaggerItem as="li" key={img.id} className={i === 0 ? "col-span-2 row-span-2" : ""}>
          <div className="overflow-hidden rounded-md">
            <Image src={assetSrc(img.id, i === 0 ? "full" : "card")} alt={img.alt} width={img.width} height={img.height} sizes={i === 0 ? "50vw" : "25vw"} className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

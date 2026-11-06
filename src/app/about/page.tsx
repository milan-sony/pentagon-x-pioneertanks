import type { Metadata } from "next";
import Image from "next/image";
import { assetSrc, getAsset, getPage, getCompanyStats, company } from "@/lib/content";

const page = getPage("about");
export const metadata: Metadata = { title: page.title, description: company.description };

/** Baseline About page – themes replace this file. Renders every extracted section in order. */
export default function AboutPage() {
  const home = getPage("home");
  const mission = home.sections.find((s) => s.id === "mission-vision")!;
  const expertise = home.sections.find((s) => s.id === "areas-of-expertise")!;
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      {page.sections.map((s) => (
        <section key={s.id} className="mt-10">
          {s.heading ? <h2 className="text-2xl font-semibold">{s.heading}</h2> : null}
          {s.body?.map((p) => (
            <p key={p} className="mt-3">
              {p}
            </p>
          ))}
          {s.items ? (
            <ul className="mt-3 list-disc pl-5">
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          ) : null}
          {s.images?.map((id) => {
            const a = getAsset(id);
            return <Image key={id} src={assetSrc(id)} alt={a.alt} width={a.width} height={a.height} className="mt-4" />;
          })}
        </section>
      ))}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{mission.heading}</h2>
        {mission.body?.map((p) => (
          <p key={p} className="mt-3">
            {p}
          </p>
        ))}
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{expertise.heading}</h2>
        {expertise.body?.map((p) => (
          <p key={p} className="mt-3">
            {p}
          </p>
        ))}
      </section>
      <dl className="mt-10 grid gap-4 sm:grid-cols-4">
        {getCompanyStats().map((s) => (
          <div key={s.label} className="border p-4">
            <dt className="text-xs">{s.label}</dt>
            <dd className="text-2xl font-bold">
              {s.value}
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

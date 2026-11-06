import type { Metadata } from "next";
import { getDownloads, getPage } from "@/lib/content";

const page = getPage("downloads");
export const metadata: Metadata = { title: page.title, description: "PWT brochure and technical specification sheets (PDF)." };

/** Baseline Downloads page – themes replace this file. */
export default function DownloadsPage() {
  const docs = getDownloads();
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      {page.sections.map((s) => (
        <section key={s.id} className="mt-10">
          <h2 className="text-2xl font-semibold">{s.heading}</h2>
          <ul className="mt-3 grid gap-2">
            {docs
              .filter((d) => (s.id === "brochure" ? d.type === "brochure" : d.type === "datasheet"))
              .map((d) => (
                <li key={d.id}>
                  <a href={d.localPath} download className="underline">
                    {d.title}
                  </a>{" "}
                  <span className="text-sm">({d.pages} pages)</span>
                  <p className="text-sm">{d.summary}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

import type { Metadata } from "next";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { getGallery, getPage } from "@/lib/content";

const page = getPage("gallery");
export const metadata: Metadata = { title: page.title, description: "Photographs of Pioneer corrugated, flat panel, pillow and onion tanks." };

/** Baseline Gallery page – themes replace this file. */
export default function GalleryPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <div className="mt-10">
        <GalleryGrid groups={getGallery()} classNames={{ filterButton: "border", filterButtonActive: "bg-primary text-primary-foreground" }} />
      </div>
    </article>
  );
}

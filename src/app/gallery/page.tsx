import type { Metadata } from "next";
import { FuturePage } from "@/components/shared/FuturePage";
import { getPage } from "@/lib/content";

const page = getPage("gallery");

export const metadata: Metadata = { title: page.title, description: "Media gallery of installed tanks: 8 corrugated steel, 4 pillow, 2 flat panel and 2 onion tank photographs." };

/** Future route – see ARCHITECTURE.md § Routing. */
export default function GalleryPage() {
  return <FuturePage page={page} summary="Media gallery of installed tanks: 8 corrugated steel, 4 pillow, 2 flat panel and 2 onion tank photographs." />;
}

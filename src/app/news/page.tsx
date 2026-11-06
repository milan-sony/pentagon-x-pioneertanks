import type { Metadata } from "next";
import { FuturePage } from "@/components/shared/FuturePage";
import { getPage } from "@/lib/content";

const page = getPage("news");

export const metadata: Metadata = { title: page.title, description: "Company news and updates. The current site holds one article, 'The launch of our new Website' (April 2018)." };

/** Future route – see ARCHITECTURE.md § Routing. */
export default function NewsPage() {
  return <FuturePage page={page} summary="Company news and updates. The current site holds one article, 'The launch of our new Website' (April 2018)." />;
}

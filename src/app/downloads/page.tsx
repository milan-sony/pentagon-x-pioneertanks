import type { Metadata } from "next";
import { FuturePage } from "@/components/shared/FuturePage";
import { getPage } from "@/lib/content";

const page = getPage("downloads");

export const metadata: Metadata = { title: page.title, description: "The PWT brochure and four technical specification sheets (Corrugated PLT, Flat Panel PFP, Pillow FLT, Onion OLT) as PDF downloads." };

/** Future route – see ARCHITECTURE.md § Routing. */
export default function DownloadsPage() {
  return <FuturePage page={page} summary="The PWT brochure and four technical specification sheets (Corrugated PLT, Flat Panel PFP, Pillow FLT, Onion OLT) as PDF downloads." />;
}

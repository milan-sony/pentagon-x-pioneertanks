import type { Metadata } from "next";
import { FuturePage } from "@/components/shared/FuturePage";
import { getPage } from "@/lib/content";

const page = getPage("licenses");

export const metadata: Metadata = { title: page.title, description: "Scanned licences and certificates published by the company: ISO 9001 certificate of assessment, Abu Dhabi commercial licence and the Pioneer ten-year warranty document." };

/** Future route – see ARCHITECTURE.md § Routing. */
export default function LicensesPage() {
  return <FuturePage page={page} summary="Scanned licences and certificates published by the company: ISO 9001 certificate of assessment, Abu Dhabi commercial licence and the Pioneer ten-year warranty document." />;
}

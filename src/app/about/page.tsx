import type { Metadata } from "next";
import { FuturePage } from "@/components/shared/FuturePage";
import { getPage } from "@/lib/content";

const page = getPage("about");

export const metadata: Metadata = { title: page.title, description: "Company profile and introduction: Pioneer Water Tanks (PWT) manufactures and distributes corrugated and flat bolted liner tanks, Australian-designed with Zincalume steel and internal liners, first introduced to the UAE market in 1993 and backed by a 10-year warranty." };

/** Future route – see ARCHITECTURE.md § Routing. */
export default function AboutPage() {
  return <FuturePage page={page} summary="Company profile and introduction: Pioneer Water Tanks (PWT) manufactures and distributes corrugated and flat bolted liner tanks, Australian-designed with Zincalume steel and internal liners, first introduced to the UAE market in 1993 and backed by a 10-year warranty." />;
}

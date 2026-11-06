import type { Metadata } from "next";
import { FuturePage } from "@/components/shared/FuturePage";
import { getPage } from "@/lib/content";

const page = getPage("contact");

export const metadata: Metadata = { title: page.title, description: "Get in touch: phone, fax, e-mail, postal address in M14 Mussafah Industrial Area, Abu Dhabi, and an enquiry form." };

/** Future route – see ARCHITECTURE.md § Routing. */
export default function ContactPage() {
  return <FuturePage page={page} summary="Get in touch: phone, fax, e-mail, postal address in M14 Mussafah Industrial Area, Abu Dhabi, and an enquiry form." />;
}

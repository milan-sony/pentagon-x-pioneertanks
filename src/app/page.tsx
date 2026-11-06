import type { Metadata } from "next";
import { company } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { AboutBlock } from "@/components/home/AboutBlock";
import { ProductsSection } from "@/components/home/ProductsSection";
import { StatementBand } from "@/components/home/StatementBand";
import { ApplicationsStrip } from "@/components/home/ApplicationsStrip";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { EnquirySection } from "@/components/home/EnquirySection";

export const metadata: Metadata = {
  title: `${company.name} | Steel liner and flexible water tanks, Abu Dhabi`,
  description: `${company.description} Corrugated Zincalume and flat panel bolted steel liner tanks up to 3,300 m³, flexible PVC tanks up to 300 m³.`,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutBlock />
      <ProductsSection />
      <StatementBand />
      <ApplicationsStrip />
      <GalleryPreview />
      <ResourcesSection />
      <EnquirySection />
    </>
  );
}

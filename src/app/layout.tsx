import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/shared/SkipLink";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActions } from "@/components/shared/FloatingActions";
import { company } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-sans", display: "swap" });
const urbanist = Urbanist({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  openGraph: { siteName: company.name, type: "website", locale: "en_AE" },
};

export const viewport: Viewport = {
  themeColor: "#2b211b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${urbanist.variable} h-full scroll-smooth antialiased`}>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before hydration; ignore only those. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <MotionProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <FloatingActions contactClassName="rounded-md bg-espresso text-cream hover:bg-espresso-2" whatsappClassName="rounded-md" contactHref="/contact" />
        </MotionProvider>
      </body>
    </html>
  );
}

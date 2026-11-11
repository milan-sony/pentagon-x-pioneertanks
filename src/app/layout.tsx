import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/shared/SkipLink";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActions } from "@/components/shared/FloatingActions";
import { Preloader, PRELOADER_BOOT_SCRIPT } from "@/components/shared/Preloader";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { company } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-sans", display: "swap" });
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });

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
    // suppressHydrationWarning: the boot script may add `preloader-off` to <html> before React hydrates.
    <html lang="en" className={`${nunito.variable} ${urbanist.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT_SCRIPT }} />
        <noscript>
          <style>{"#preloader{display:none}"}</style>
        </noscript>
      </head>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before hydration; ignore only those. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Preloader logo={{ src: company.logo.src, width: company.logo.width, height: company.logo.height }} />
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <SkipLink />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <FloatingActions contactClassName="bg-water text-white hover:bg-water-deep focus-visible:ring-water/40" contactHref="/contact" />
        </MotionProvider>
      </body>
    </html>
  );
}

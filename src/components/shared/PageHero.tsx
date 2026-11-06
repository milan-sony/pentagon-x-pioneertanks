import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Entrance } from "@/components/shared/Reveal";
import { Parallax } from "@/components/shared/Parallax";
import { assetSrc, getAsset } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  title: string;
  eyebrow?: string;
  intro?: string;
  /** Image asset id for the banner. */
  image: string;
  crumbs?: { label: string; href: string }[];
  className?: string;
  /** Height variant. */
  size?: "short" | "tall";
}

/** Design 04 inner-page banner: full-width photograph with parallax, uppercase title, breadcrumb. */
export function PageHero({ title, eyebrow, intro, image, crumbs = [], className, size = "short" }: PageHeroProps) {
  const img = getAsset(image);
  return (
    <section className={cn("relative isolate overflow-hidden bg-espresso text-cream", className)} aria-labelledby="page-title">
      <Parallax amount={30} className="absolute inset-0 -z-10">
        <Image src={assetSrc(img.id)} alt="" width={img.width} height={img.height} priority quality={70} sizes="100vw" className="h-[120%] w-full -translate-y-[8%] object-cover opacity-60" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/20" aria-hidden="true" />
      <div className={cn("mx-auto flex max-w-[1400px] flex-col justify-end px-4 pb-12 sm:px-6 xl:px-10", size === "tall" ? "min-h-[60svh] pt-32" : "min-h-[42svh] pt-28")}>
        {crumbs.length ? (
          <Entrance as="div" y={10}>
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs text-cream/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.href} className="flex items-center gap-1">
                  <ChevronRight className="size-3" aria-hidden="true" />
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                </span>
              ))}
            </nav>
          </Entrance>
        ) : null}
        {eyebrow ? (
          <Entrance as="p" y={10} delay={0.05} className="eyebrow text-bronze">
            {eyebrow}
          </Entrance>
        ) : null}
        <Entrance as="div" delay={0.1}>
          <h1 id="page-title" className="mt-3 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[1] tracking-wide text-white">
            {title}
          </h1>
        </Entrance>
        {intro ? (
          <Entrance as="p" delay={0.2} className="mt-6 max-w-2xl text-lg text-cream/85">
            {intro}
          </Entrance>
        ) : null}
      </div>
    </section>
  );
}

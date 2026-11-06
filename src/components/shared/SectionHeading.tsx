import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/** Design 04 section header: eyebrow, uppercase title left, optional description right. */
export function SectionHeading({ eyebrow, title, description, id, dark = false, className, align = "split" }: { eyebrow?: string; title: string; description?: string; id: string; dark?: boolean; className?: string; align?: "split" | "left" | "center" }) {
  return (
    <Reveal className={cn("grid gap-6", align === "split" && "lg:grid-cols-12 lg:items-end", align === "center" && "text-center", className)}>
      <div className={cn(align === "split" && "lg:col-span-6")}>
        {eyebrow ? <p className={cn("eyebrow", dark ? "text-bronze" : "text-bronze-text")}>{eyebrow}</p> : null}
        <h2 id={id} className={cn("mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[1.02] tracking-wide", dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
      </div>
      {description ? <p className={cn("max-w-xl text-base leading-relaxed", dark ? "text-cream/75" : "text-taupe-text", align === "split" && "lg:col-span-5 lg:col-start-8", align === "center" && "mx-auto")}>{description}</p> : null}
    </Reveal>
  );
}

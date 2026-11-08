import { Reveal, WordsReveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/** Section header: short eyebrow with a rule, uppercase title whose words rise in, optional description. */
export function SectionHeading({ eyebrow, title, description, id, dark = false, className, align = "split" }: { eyebrow?: string; title: string; description?: string; id: string; dark?: boolean; className?: string; align?: "split" | "left" | "center" }) {
  return (
    <div className={cn("grid gap-6", align === "split" && "lg:grid-cols-12 lg:items-end", align === "center" && "justify-items-center text-center", className)}>
      <div className={cn(align === "split" && "lg:col-span-7")}>
        {eyebrow ? (
          <Reveal as="p" y={10} className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center", dark ? "text-bronze" : "text-bronze-text")}>
            <span className={cn("h-px w-8", dark ? "bg-bronze/60" : "bg-bronze-text/50")} aria-hidden="true" />
            {eyebrow}
          </Reveal>
        ) : null}
        <h2 id={id} className={cn("heading-2 mt-4", dark ? "text-white" : "text-ink")}>
          <WordsReveal text={title} />
        </h2>
      </div>
      {description ? (
        <Reveal delay={0.15} className={cn("max-w-xl", align === "split" && "lg:col-span-5 lg:justify-self-end", align === "center" && "mx-auto")}>
          <p className={cn("text-base leading-relaxed sm:text-[1.0625rem]", dark ? "text-cream/75" : "text-taupe-text")}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

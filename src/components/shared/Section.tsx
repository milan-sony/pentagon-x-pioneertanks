import { cn } from "@/lib/utils";

/** Full-width band with a consistent inner container so every section shares the same left/right edges. */
export function Section({ id, className, innerClassName, children, ...rest }: Omit<React.ComponentProps<"section">, "ref"> & { innerClassName?: string }) {
  return (
    <section id={id} className={cn("relative scroll-mt-20", className)} {...rest}>
      <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10", innerClassName)}>{children}</div>
    </section>
  );
}

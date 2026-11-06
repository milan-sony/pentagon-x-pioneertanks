import type { Specification } from "@/types/content";
import { cn } from "@/lib/utils";

export interface SpecTableProps {
  specs: Specification[];
  caption: string;
  className?: string;
  classNames?: { head?: string; row?: string; label?: string; value?: string; tag?: string };
  /** Show the source tag ("datasheet"/"web") after each value. */
  showSource?: boolean;
}

/** Generic two-column specification table; themes pass classes. */
export function SpecTable({ specs, caption, className, classNames = {}, showSource = true }: SpecTableProps) {
  return (
    <table className={cn("w-full border-collapse text-left text-sm", className)}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className={classNames.head}>
          <th scope="col" className="w-40 py-3 pr-4 sm:w-56">
            Item
          </th>
          <th scope="col" className="py-3">
            Specification
          </th>
        </tr>
      </thead>
      <tbody>
        {specs.map((s) => (
          <tr key={s.label} className={cn("align-top", classNames.row)}>
            <th scope="row" className={cn("py-3 pr-4 font-semibold", classNames.label)}>
              {s.label}
            </th>
            <td className={cn("py-3 leading-relaxed", classNames.value)}>
              {s.value}
              {showSource && s.source === "document" ? <span className={cn("ml-2 inline-block text-xs", classNames.tag)}>(datasheet{s.documentRef ? ` ${s.documentRef.replace("datasheet-", "").toUpperCase()}` : ""})</span> : null}
              {s.note ? <span className={cn("mt-1 block text-xs", classNames.tag)}>Note: {s.note}</span> : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

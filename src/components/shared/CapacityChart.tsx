import type { CapacityChart as Chart } from "@/types/content";
import { cn } from "@/lib/utils";

export interface CapacityChartProps {
  chart: Chart;
  className?: string;
  classNames?: { head?: string; sticky?: string; empty?: string; note?: string };
}

/** The brochure's 28-model gross capacity chart; scrolls horizontally with a sticky model column. */
export function CapacityChart({ chart, className, classNames = {} }: CapacityChartProps) {
  return (
    <div className={cn("min-w-0 overflow-x-auto", className)} tabIndex={0} role="region" aria-label={chart.title}>
      <table className="w-full min-w-[760px] border-collapse text-sm tabular-nums">
        <caption className={cn("pb-3 text-left text-sm", classNames.note)}>
          {chart.title} – gross capacity in kilolitres by tank model and number of wall rings. {chart.note}
        </caption>
        <thead>
          <tr className={cn("text-left", classNames.head)}>
            <th scope="col" className={cn("sticky left-0 py-2 pr-3", classNames.sticky)}>
              Model
            </th>
            <th scope="col" className="px-3 py-2">
              Diameter
            </th>
            {chart.columns.map((c) => (
              <th key={c.ring} scope="col" className="px-3 py-2 text-right">
                {c.ring}
                <span className="block text-xs font-normal opacity-70">{c.wallHeight}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((r) => (
            <tr key={r.model} className="border-t border-current/10">
              <th scope="row" className={cn("sticky left-0 py-1.5 pr-3 text-left font-semibold", classNames.sticky)}>
                {r.model}
              </th>
              <td className="px-3 py-1.5">{r.diameter}</td>
              {r.capacities.map((c, i) => (
                <td key={i} className={cn("px-3 py-1.5 text-right", !c && (classNames.empty ?? "opacity-30"))}>
                  {c ?? "–"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className={cn("mt-3 text-xs", classNames.note)}>{chart.unitsNote}</p>
    </div>
  );
}

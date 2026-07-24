import type { RangeKey } from "../lib/chart-data";

const RANGES: RangeKey[] = ["1Y", "5Y", "10Y", "ALL"];

interface Props {
  value: RangeKey;
  onChange: (range: RangeKey) => void;
}

export function TimeRangeToggle({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {RANGES.map((range) => {
        const active = range === value;
        return (
          <button
            key={range}
            type="button"
            onClick={() => onChange(range)}
            aria-pressed={active}
            className={`rounded-neo border-2 border-ink px-3.5 py-1.5 font-display text-sm font-bold tracking-wide transition-all ${
              active
                ? "bg-primary text-ink shadow-neo-pressed translate-x-[3px] translate-y-[3px]"
                : "bg-cream text-ink shadow-neo-sm hover:neo-press"
            }`}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
}

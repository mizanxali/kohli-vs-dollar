import { CENTURIES } from "../data/kohli-centuries";
import type { FxPoint } from "./fx";

export interface ChartPoint {
  /** Unix ms timestamp - used as a numeric (time-scaled) x axis. */
  t: number;
  /** INR per USD. */
  dollar: number;
  /** Cumulative international centuries as of this date. */
  kohli: number;
}

export type RangeKey = "1Y" | "5Y" | "10Y" | "ALL";

export const RANGE_YEARS: Record<RangeKey, number | null> = {
  "1Y": 1,
  "5Y": 5,
  "10Y": 10,
  ALL: null,
};

const CENTURY_TS = CENTURIES.map((c) => new Date(c.date).getTime()).sort(
  (a, b) => a - b,
);

/** Centuries scored on or before a timestamp (both arrays are sorted ascending). */
function cumulativeAt(ts: number, pointer: { i: number }): number {
  while (pointer.i < CENTURY_TS.length && CENTURY_TS[pointer.i] <= ts) {
    pointer.i++;
  }
  return pointer.i;
}

/**
 * Build the merged chart series for a time range. The dollar line drives the
 * x points (dense, ~daily); the century line is evaluated at each of those
 * dates so both series share one x axis. Long ranges are downsampled so the
 * SVG stays light.
 */
export function buildChartData(
  fx: FxPoint[],
  range: RangeKey,
  maxPoints = 240,
): ChartPoint[] {
  const years = RANGE_YEARS[range];
  let start = 0;
  if (years !== null) {
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - years);
    start = cutoff.getTime();
  }

  const windowed = fx.filter((p) => new Date(p.date).getTime() >= start);
  const step = Math.max(1, Math.ceil(windowed.length / maxPoints));

  const sampled: FxPoint[] = [];
  for (let i = 0; i < windowed.length; i += step) sampled.push(windowed[i]);
  const last = windowed[windowed.length - 1];
  if (last && sampled[sampled.length - 1] !== last) sampled.push(last);

  const pointer = { i: 0 };
  return sampled.map((p) => {
    const ts = new Date(p.date).getTime();
    return { t: ts, dollar: p.rate, kohli: cumulativeAt(ts, pointer) };
  });
}

/** Round a raw step up to the nearest "nice" 1/2/5 × 10ⁿ value. */
function niceStep(raw: number): number {
  if (raw <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const nice = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return nice * mag;
}

/** The 100 finish line, always kept at the top of the axis. */
const FINISH = 100;

/**
 * Y-axis domain + ticks for a range. `ALL` keeps the full race framing
 * (0 → 100 finish line). Shorter ranges lift the floor off zero - both series
 * sit in the low 80s, so a 0-based axis would waste most of the vertical space
 * - while still anchoring the 100 finish line at the top. The result is a
 * rounded domain with evenly spaced "nice" ticks for readable detail.
 */
export function computeYAxis(
  data: ChartPoint[],
  range: RangeKey,
): { domain: [number, number]; ticks: number[] } {
  const FULL = { domain: [0, 100] as [number, number], ticks: [0, 25, 50, 75, 100] };
  if (range === "ALL" || data.length === 0) return FULL;

  let min = Infinity;
  let max = -Infinity;
  for (const p of data) {
    min = Math.min(min, p.dollar, p.kohli);
    max = Math.max(max, p.dollar, p.kohli);
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return FULL;

  const pad = (max - min || 1) * 0.15;
  // Keep 100 anchored at the top (no headroom above it); only the floor lifts
  // to zoom in. If a series ever climbs past 100, the top follows it up.
  const loTarget = min - pad;
  const hiTarget = Math.max(max, FINISH);
  const step = niceStep((hiTarget - loTarget) / 4);
  const lo = Math.floor(loTarget / step) * step;
  const hi = Math.ceil(hiTarget / step) * step;

  const ticks: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) {
    ticks.push(Math.round(v * 100) / 100);
  }
  return { domain: [lo, hi], ticks };
}

import { KOHLI_DEBUT } from "../data/kohli-centuries";

export interface FxPoint {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** INR per 1 USD on that date. */
  rate: number;
}

// Frankfurter is a free, key-less FX API backed by ECB reference rates
// (updated once per working day - that is as "realtime" as free FX data gets).
const SERIES_URL = `https://api.frankfurter.dev/v1/${KOHLI_DEBUT}..?base=USD&symbols=INR`;

interface FrankfurterSeries {
  rates: Record<string, { INR: number }>;
}

// The full series is a few thousand points; fetch once per session and reuse.
let seriesCache: Promise<FxPoint[]> | null = null;

export function fetchUsdInrSeries(): Promise<FxPoint[]> {
  if (!seriesCache) {
    seriesCache = (async () => {
      const res = await fetch(SERIES_URL);
      if (!res.ok) {
        throw new Error(`FX request failed: ${res.status}`);
      }
      const data = (await res.json()) as FrankfurterSeries;
      return Object.entries(data.rates)
        .map(([date, r]) => ({ date, rate: r.INR }))
        .sort((a, b) => a.date.localeCompare(b.date));
    })().catch((err) => {
      // Don't cache failures - allow a retry on the next call.
      seriesCache = null;
      throw err;
    });
  }
  return seriesCache;
}

export function latestRate(series: FxPoint[]): FxPoint | null {
  return series.length ? series[series.length - 1] : null;
}

import { useEffect, useMemo, useState } from "react";
import { fetchUsdInrSeries, latestRate, type FxPoint } from "./lib/fx";
import type { RangeKey } from "./lib/chart-data";
import {
  DOLLAR_COLOR,
  DOLLAR_LABEL,
  KOHLI_COLOR,
  KOHLI_LABEL,
} from "./lib/theme";
import { Scoreboard } from "./components/Scoreboard";
import { RaceChart } from "./components/RaceChart";
import { TimeRangeToggle } from "./components/TimeRangeToggle";
import { Poll } from "./components/Poll";

type FxState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; series: FxPoint[] };

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 font-display text-xs font-bold sm:text-sm">
      <span
        className="inline-block h-3 w-5 rounded-neo border-2 border-ink"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

export function App() {
  const [fx, setFx] = useState<FxState>({ status: "loading" });
  const [range, setRange] = useState<RangeKey>("ALL");

  useEffect(() => {
    fetchUsdInrSeries()
      .then((series) => setFx({ status: "ready", series }))
      .catch(() => setFx({ status: "error" }));
  }, []);

  const latest = useMemo(
    () => (fx.status === "ready" ? latestRate(fx.series) : null),
    [fx],
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <span className="inline-block rounded-neo border-2 border-ink bg-secondary px-2 py-1 font-display text-xs font-bold tracking-wide shadow-neo-sm">
          RACE TO 100 🏁
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold leading-none sm:text-6xl">
          Kohli <span className="text-primary">vs</span> The Dollar
        </h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-muted-foreground sm:text-lg">
          Two contenders, one finish line at 💯. Virat Kohli's international
          centuries and the price of one US dollar in rupees are both closing
          in - who gets there first?
        </p>
      </header>

      <section className="mb-10">
        <Scoreboard
          dollarRate={latest ? latest.rate : null}
          fxDate={latest ? latest.date : null}
        />
      </section>

      <section className="mb-12">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              The race <span aria-hidden="true">📈</span>
            </h2>
            <div className="mt-2 flex gap-4">
              <LegendDot color={KOHLI_COLOR} label={KOHLI_LABEL} />
              <LegendDot color={DOLLAR_COLOR} label={DOLLAR_LABEL} />
            </div>
          </div>
          <TimeRangeToggle value={range} onChange={setRange} />
        </div>

        <div className="rounded-neo border-2 border-ink bg-cream p-3 shadow-neo-lg sm:p-4">
          <div className="h-[320px] w-full sm:h-[440px]">
            {fx.status === "ready" && <RaceChart fx={fx.series} range={range} />}
            {fx.status === "loading" && (
              <div className="flex h-full items-center justify-center font-display text-lg font-bold text-muted-foreground">
                Loading the scoreboard…
              </div>
            )}
            {fx.status === "error" && (
              <div className="flex h-full items-center justify-center px-4 text-center font-semibold">
                Couldn't reach the exchange-rate desk. Refresh to try again.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <Poll />
      </section>

      <footer className="border-t-2 border-ink pt-4 text-xs font-medium text-muted-foreground">
        <p>
          Century data from public records (Wikipedia). USD/INR via
          the Frankfurter API (ECB reference rates, updated on working days).
        </p>
        <p className="mt-1">
          A fan-made joke. Not financial advice. Definitely not cricketing
          advice.
        </p>
        <p className="mt-1">
          Built by{" "}
          <a
            href="https://x.com/mizanxali"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            @mizanxali
          </a>
        </p>
      </footer>
    </div>
  );
}

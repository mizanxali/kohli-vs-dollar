import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { FxPoint } from "../lib/fx";
import { buildChartData, computeYAxis, type RangeKey } from "../lib/chart-data";
import {
  DOLLAR_COLOR,
  DOLLAR_LABEL,
  FINISH_LINE,
  KOHLI_COLOR,
  KOHLI_LABEL,
} from "../lib/theme";

interface Props {
  fx: FxPoint[];
  range: RangeKey;
}

function formatTick(ts: number, range: RangeKey): string {
  const d = new Date(ts);
  if (range === "1Y") {
    return d.toLocaleDateString("en-US", { month: "short" });
  }
  return d.toLocaleDateString("en-US", { year: "numeric" });
}

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  payload: { t: number };
}

function BrutalTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (!active || !payload?.length) return null;
  const ts = payload[0].payload.t;
  const kohli = payload.find((p) => p.dataKey === "kohli")?.value ?? 0;
  const dollar = payload.find((p) => p.dataKey === "dollar")?.value ?? 0;
  return (
    <div className="rounded-neo border-2 border-ink bg-cream px-3 py-2 shadow-neo">
      <div className="mb-1 font-display text-xs font-bold">
        {new Date(ts).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="flex items-center gap-2 text-sm font-bold tabular-nums">
        <span className="inline-block h-3 w-3" style={{ background: KOHLI_COLOR }} />
        {KOHLI_LABEL}: {kohli}
      </div>
      <div className="flex items-center gap-2 text-sm font-bold tabular-nums">
        <span className="inline-block h-3 w-3" style={{ background: DOLLAR_COLOR }} />
        {DOLLAR_LABEL}: ₹{dollar.toFixed(2)}
      </div>
    </div>
  );
}

export function RaceChart({ fx, range }: Props) {
  const data = useMemo(() => buildChartData(fx, range), [fx, range]);
  const yAxis = useMemo(() => computeYAxis(data, range), [data, range]);
  const showFinishLine = FINISH_LINE <= yAxis.domain[1];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid stroke="#00000015" strokeWidth={1} vertical={false} />
        <XAxis
          dataKey="t"
          type="number"
          scale="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(t) => formatTick(t as number, range)}
          minTickGap={40}
          stroke="#000"
          strokeWidth={2}
          tick={{ fontFamily: "Unbounded", fontSize: 12, fill: "#000" }}
        />
        <YAxis
          domain={yAxis.domain}
          ticks={yAxis.ticks}
          allowDecimals={false}
          stroke="#000"
          strokeWidth={2}
          width={40}
          tick={{ fontFamily: "Unbounded", fontSize: 12, fill: "#000" }}
        />
        {showFinishLine && (
          <ReferenceLine
            y={FINISH_LINE}
            stroke="#000"
            strokeWidth={2}
            strokeDasharray="6 4"
            label={{
              value: "🏁 100",
              position: "insideTopRight",
              fontFamily: "Unbounded",
              fontWeight: 700,
              fontSize: 13,
              fill: "#000",
            }}
          />
        )}
        <Tooltip
          content={<BrutalTooltip />}
          cursor={{ stroke: "#000", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Line
          type="stepAfter"
          dataKey="kohli"
          name={KOHLI_LABEL}
          stroke={KOHLI_COLOR}
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, stroke: "#000", strokeWidth: 2, fill: KOHLI_COLOR }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="dollar"
          name={DOLLAR_LABEL}
          stroke={DOLLAR_COLOR}
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, stroke: "#000", strokeWidth: 2, fill: DOLLAR_COLOR }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

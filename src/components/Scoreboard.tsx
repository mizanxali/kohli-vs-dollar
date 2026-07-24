import { CENTURY_COUNT } from "../data/kohli-centuries";
import { FINISH_LINE } from "../lib/theme";

interface Props {
  dollarRate: number | null;
  fxDate: string | null;
}

interface TileProps {
  team: string;
  emoji: string;
  pfp: string;
  value: string;
  caption: string;
  toGo: string;
  tone: "kohli" | "dollar";
}

function Tile({ team, emoji, pfp, value, caption, toGo, tone }: TileProps) {
  const bg = tone === "kohli" ? "bg-kohli" : "bg-dollar";
  return (
    <div
      className={`${bg} flex-1 rounded-neo border-2 border-ink p-5 text-cream shadow-neo-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={pfp}
            alt={`${team} avatar`}
            className="h-16 w-16 rounded-full border-2 border-ink object-cover shadow-neo-sm"
          />
          <span className="font-display text-base font-bold tracking-wide">
            {team}
          </span>
        </div>
        <span className="text-2xl leading-none" aria-hidden="true">
          {emoji}
        </span>
      </div>
      <div className="mt-2 font-display text-5xl font-bold leading-none tabular-nums sm:text-6xl">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium opacity-90">{caption}</div>
      {/* <div className="mt-4 inline-block rounded-neo border-2 border-ink bg-cream px-2 py-1 font-display text-xs font-bold text-ink shadow-neo-sm">
        {toGo}
      </div> */}
    </div>
  );
}

export function Scoreboard({ dollarRate, fxDate }: Props) {
  const kohliToGo = FINISH_LINE - CENTURY_COUNT;
  const dollarStr = dollarRate !== null ? dollarRate.toFixed(2) : "-";
  const dollarToGo =
    dollarRate !== null ? (FINISH_LINE - dollarRate).toFixed(2) : "-";

  return (
    <div className="relative flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
      <Tile
        team="KOHLI"
        emoji="🏏"
        pfp="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_800,q_50/lsci/db/PICTURES/CMS/348000/348088.jpg"
        value={String(CENTURY_COUNT)}
        caption="international centuries"
        toGo={`${kohliToGo} to go`}
        tone="kohli"
      />

      <div className="z-10 flex items-center justify-center sm:-mx-6">
        <span className="rounded-neo border-2 border-ink bg-primary px-3 py-1 font-display text-xl font-bold shadow-neo">
          VS
        </span>
      </div>

      <Tile
        team="THE DOLLAR"
        emoji="💵"
        pfp="https://c.ndtvimg.com/2019-03/7go5cgck_narendra-modi-pti_625x300_23_March_19.jpg"
        value={`₹${dollarStr}`}
        caption={fxDate ? `USD → INR · ${fxDate}` : "USD → INR"}
        toGo={dollarRate !== null ? `₹${dollarToGo} to go` : "loading…"}
        tone="dollar"
      />
    </div>
  );
}

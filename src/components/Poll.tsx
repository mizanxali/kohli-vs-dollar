import { useEffect, useState } from "react";
import {
  castVote,
  fetchResults,
  getVotedChoice,
  type Choice,
  type PollResults,
} from "../lib/poll";

function pct(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

interface BarProps {
  label: string;
  emoji: string;
  votes: number;
  total: number;
  tone: "kohli" | "dollar";
  youVoted: boolean;
}

function ResultBar({ label, emoji, votes, total, tone, youVoted }: BarProps) {
  const percent = pct(votes, total);
  const fill = tone === "kohli" ? "bg-kohli" : "bg-dollar";
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between font-display text-sm font-bold">
        <span>
          {emoji} {label}{" "}
          {youVoted && <span className="text-primary">← you</span>}
        </span>
        <span className="tabular-nums">
          {percent}% · {votes.toLocaleString()}
        </span>
      </div>
      <div className="h-8 overflow-hidden rounded-neo border-2 border-ink bg-cream">
        <div
          className={`${fill} h-full transition-[width] duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function Poll() {
  const [results, setResults] = useState<PollResults | null>(null);
  const [voted, setVoted] = useState<Choice | null>(() => getVotedChoice());
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchResults()
      .then(setResults)
      .catch(() => setError(true));
  }, []);

  async function vote(choice: Choice) {
    if (pending || voted) return;
    setPending(true);
    setError(false);
    try {
      const next = await castVote(choice);
      setResults(next);
      setVoted(choice);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  const total = results ? results.kohli + results.dollar : 0;
  const showResults = voted !== null;

  return (
    <div className="rounded-neo border-2 border-ink bg-cream p-5 shadow-neo-lg sm:p-7">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">
        Public opinion <span aria-hidden="true">📣</span>
      </h2>
      <p className="mt-1 text-sm font-medium text-muted-foreground">
        Who reaches 💯 first? Cast your vote - one per browser.
      </p>

      {error && (
        <p className="mt-4 rounded-neo border-2 border-ink bg-destructive px-3 py-2 text-sm font-semibold text-cream">
          The poll booth is jammed. Try again in a moment.
        </p>
      )}

      {!showResults ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            disabled={pending}
            onClick={() => vote("kohli")}
            className="rounded-neo border-2 border-ink bg-kohli px-4 py-5 font-display text-lg font-bold text-cream shadow-neo transition-all hover:neo-press disabled:opacity-60"
          >
            🏏 Kohli
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => vote("dollar")}
            className="rounded-neo border-2 border-ink bg-dollar px-4 py-5 font-display text-lg font-bold text-cream shadow-neo transition-all hover:neo-press disabled:opacity-60"
          >
            💵 The Dollar
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <ResultBar
            label="Kohli"
            emoji="🏏"
            votes={results?.kohli ?? 0}
            total={total}
            tone="kohli"
            youVoted={voted === "kohli"}
          />
          <ResultBar
            label="The Dollar"
            emoji="💵"
            votes={results?.dollar ?? 0}
            total={total}
            tone="dollar"
            youVoted={voted === "dollar"}
          />
          <p className="pt-1 text-sm font-medium tabular-nums text-muted-foreground">
            {total.toLocaleString()} total {total === 1 ? "vote" : "votes"} ·
            thanks for playing!
          </p>
        </div>
      )}
    </div>
  );
}

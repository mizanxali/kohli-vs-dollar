export type Choice = "kohli" | "dollar";

export interface PollResults {
  kohli: number;
  dollar: number;
}

const VOTED_KEY = "kvd-voted";

export function getVotedChoice(): Choice | null {
  const value = localStorage.getItem(VOTED_KEY);
  return value === "kohli" || value === "dollar" ? value : null;
}

function rememberVote(choice: Choice): void {
  localStorage.setItem(VOTED_KEY, choice);
}

export async function fetchResults(): Promise<PollResults> {
  const res = await fetch("/api/poll");
  if (!res.ok) throw new Error(`Poll fetch failed: ${res.status}`);
  return (await res.json()) as PollResults;
}

export async function castVote(choice: Choice): Promise<PollResults> {
  const res = await fetch("/api/poll/vote", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ choice }),
  });
  if (!res.ok) throw new Error(`Vote failed: ${res.status}`);
  const results = (await res.json()) as PollResults;
  rememberVote(choice);
  return results;
}

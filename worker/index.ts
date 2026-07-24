import { DurableObject } from "cloudflare:workers";

type Choice = "kohli" | "dollar";

interface PollResults {
  kohli: number;
  dollar: number;
}

const CHOICES: Choice[] = ["kohli", "dollar"];

function isChoice(value: unknown): value is Choice {
  return value === "kohli" || value === "dollar";
}

/**
 * Single global counter for the public opinion poll. Strong consistency here is
 * what makes a vote actually count - a KV read-modify-write would drop
 * concurrent votes, so the tally lives in a Durable Object instead.
 */
export class PollCounter extends DurableObject<Env> {
  async vote(choice: Choice): Promise<PollResults> {
    const current = (await this.ctx.storage.get<number>(choice)) ?? 0;
    await this.ctx.storage.put(choice, current + 1);
    return this.getResults();
  }

  async getResults(): Promise<PollResults> {
    const stored = await this.ctx.storage.get<number>(CHOICES);
    return {
      kohli: stored.get("kohli") ?? 0,
      dollar: stored.get("dollar") ?? 0,
    };
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function getPoll(env: Env): DurableObjectStub<PollCounter> {
  const id = env.POLL_COUNTER.idFromName("global");
  return env.POLL_COUNTER.get(id);
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/poll" && request.method === "GET") {
      const results = await getPoll(env).getResults();
      return json(results);
    }

    if (url.pathname === "/api/poll/vote" && request.method === "POST") {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON body" }, 400);
      }
      const choice = (body as { choice?: unknown } | null)?.choice;
      if (!isChoice(choice)) {
        return json({ error: "choice must be 'kohli' or 'dollar'" }, 400);
      }
      const results = await getPoll(env).vote(choice);
      return json(results);
    }

    // Any other /api/* path is unknown; SPA assets are served for everything else.
    return json({ error: "Not found" }, 404);
  },
} satisfies ExportedHandler<Env>;

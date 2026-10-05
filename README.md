# Kohli vs Dollar - Race to 100 🏁

A fun, single-page site tracking two numbers racing toward 100:

- **Kohli** - Virat Kohli's international centuries (hardcoded from public records; 86 and counting)
- **Dollar** - the price of 1 USD in INR (live from the [Frankfurter API](https://frankfurter.dev), ECB reference rates)

Both are climbing the same 0–100 scale - who reaches 100 first? Below the chart,
a no-auth public poll lets visitors vote.

## Stack

- **Vite + React + TypeScript** SPA, styled with **Tailwind v4** (neobrutalist theme, cream background)
- **Recharts** for the dual-line race chart with a shared axis and a `🏁 100` finish line
- **Cloudflare Worker** (`worker/index.ts`) serves the SPA and the `/api/poll` endpoints
- **Durable Object** (`PollCounter`) holds the shared, strongly-consistent vote tally

## Develop

```bash
npm install
npm run dev      # http://localhost:5173 - runs the SPA + Worker + Durable Object
```

## Build & deploy

```bash
npm run build    # outputs to dist/
npm run deploy   # build + wrangler deploy (needs `wrangler login` first)
```

## API

| Method | Route            | Body                              | Returns                     |
| ------ | ---------------- | --------------------------------- | --------------------------- |
| GET    | `/api/poll`      | -                                 | `{ kohli, dollar }` counts  |
| POST   | `/api/poll/vote` | `{ "choice": "kohli"\|"dollar" }` | updated `{ kohli, dollar }` |

Voting is limited to one per browser via `localStorage` (a soft, client-side limit).

## Updating the data

- **Centuries**: edit `src/data/kohli-centuries.ts` (chronological; the cumulative line is derived automatically).
- **Colors / theme**: `src/index.css` (`@theme` tokens) and `src/lib/theme.ts` (the two team colors - validated colorblind-safe).

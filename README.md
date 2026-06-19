# Torched

**Your website, brutally honest feedback.**

Paste a URL. Torched fetches the page server-side, extracts meaningful content, sends it to Claude, and returns a savage but constructive roast covering design, copy, UX, performance signals, and overall vibe.

## What you get

- **Overall Score** — a single 0–100 roast score with a one-line verdict
- **Category Scores** — Design, Copy & Messaging, UX & Navigation, Overall Vibe
- **The Full Roast** — 2–3 paragraphs of specific, expert critique
- **What's Broken** — 4 specific issues called out
- **The One Good Thing** — a genuine compliment
- **Quick Wins** — 3 actionable fixes you can ship this week

## Tech Stack

- **Next.js 15** App Router
- **TypeScript** strict mode
- **Tailwind CSS v4** — utility classes only
- **Lucide React** icons
- **Claude claude-sonnet-4-6** via Anthropic API

## Setup

```bash
git clone <repo-url>
cd torched
npm install
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key from console.anthropic.com |

## Security Notes

- URL fetching is server-side only — client never hits third-party sites directly
- Rate limited to 5 requests per IP per minute
- Input validated and sanitized before use
- ANTHROPIC_API_KEY is never exposed to the client
- Only public URLs are fetched (http/https)

## Deploy to Vercel

```bash
vercel
# or push to GitHub and import at vercel.com
```

Set `ANTHROPIC_API_KEY` in Vercel project environment variables.

## Built with

Vibe coding + Claude

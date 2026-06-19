import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Per-IP rate limiting: max 5 requests per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 5) return false;

  entry.count++;
  return true;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

interface ExtractedContent {
  title: string;
  metaDescription: string;
  metaKeywords: string;
  headings: string[];
  bodyText: string;
  navItems: string[];
  ctaTexts: string[];
  ogTags: Record<string, string>;
}

function extractContent(html: string): ExtractedContent {
  const getFirst = (pattern: RegExp): string => {
    const m = html.match(pattern);
    return m ? stripHtml(m[1] ?? "").slice(0, 200) : "";
  };

  const getAll = (pattern: RegExp, limit: number): string[] => {
    const results: string[] = [];
    let m: RegExpExecArray | null;
    const re = new RegExp(pattern.source, pattern.flags);
    while ((m = re.exec(html)) !== null && results.length < limit) {
      const text = stripHtml(m[1] ?? "").slice(0, 100);
      if (text) results.push(text);
    }
    return results;
  };

  const title = getFirst(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDescription = getFirst(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i)
    || getFirst(/<meta[^>]*content=["']([^"']*)"[^>]*name=["']description["']/i);
  const metaKeywords = getFirst(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)/i);

  const headings = getAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi, 10);

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyRaw = bodyMatch ? stripHtml(bodyMatch[1]).slice(0, 500) : "";

  const navItems = getAll(/<(?:nav|header)[^>]*>([\s\S]*?)<\/(?:nav|header)>/gi, 1)
    .flatMap(() => getAll(/<a[^>]*>([\s\S]*?)<\/a>/gi, 10))
    .slice(0, 10);

  const ctaTexts = getAll(/<(?:button|a)[^>]*(?:btn|cta|call|action|get-started|signup|sign-up)[^>]*>([\s\S]*?)<\/(?:button|a)>/gi, 5);

  const ogTags: Record<string, string> = {};
  const ogPattern = /<meta[^>]*property=["'](og:[^"']+)["'][^>]*content=["']([^"']*)/gi;
  let ogMatch: RegExpExecArray | null;
  while ((ogMatch = ogPattern.exec(html)) !== null) {
    ogTags[ogMatch[1]] = ogMatch[2].slice(0, 200);
  }

  return {
    title,
    metaDescription,
    metaKeywords,
    headings,
    bodyText: bodyRaw,
    navItems,
    ctaTexts,
    ogTags,
  };
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Easy there! You've torched a few sites already. Wait a minute. 🔥" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("url" in body) ||
    typeof (body as Record<string, unknown>).url !== "string"
  ) {
    return NextResponse.json({ error: "Missing or invalid URL." }, { status: 400 });
  }

  const url = ((body as Record<string, string>).url).trim();

  if (!isValidUrl(url)) {
    return NextResponse.json(
      { error: "Invalid URL. Must start with http:// or https://" },
      { status: 400 }
    );
  }

  // Fetch the target URL server-side
  let html: string;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const fetchRes = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Torched/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timeout);

    if (!fetchRes.ok) {
      return NextResponse.json(
        { error: "Could not reach that URL. Make sure it's public and try again." },
        { status: 422 }
      );
    }

    html = await fetchRes.text();
  } catch {
    return NextResponse.json(
      { error: "Could not reach that URL. Make sure it's public and try again." },
      { status: 422 }
    );
  }

  const content = extractContent(html);

  const systemPrompt =
    "You are a brutally honest but expert web design critic. You've seen thousands of websites and know exactly what makes them succeed or fail. You give feedback that's direct, specific, and occasionally savage — but always constructive and actionable. You never pad feedback with generic filler. Respond with valid JSON only, no markdown, no explanation.";

  const userPrompt = `Roast this website based on its extracted content.

URL: ${url}
Page Title: ${content.title || "(none found)"}
Meta Description: ${content.metaDescription || "(none found)"}
Meta Keywords: ${content.metaKeywords || "(none found)"}
Headings found: ${content.headings.length ? content.headings.join(" | ") : "(none found)"}
Body text sample: ${content.bodyText || "(none found)"}
Navigation items: ${content.navItems.length ? content.navItems.join(", ") : "(none found)"}
CTA texts: ${content.ctaTexts.length ? content.ctaTexts.join(", ") : "(none found)"}
OG Tags: ${Object.keys(content.ogTags).length ? JSON.stringify(content.ogTags) : "(none found)"}

Return ONLY this exact JSON:
{
  "overallScore": <number 0-100>,
  "verdict": "<one punchy sentence, brutally honest>",
  "categories": {
    "design": { "score": <number>, "roast": "<string>" },
    "copy": { "score": <number>, "roast": "<string>" },
    "ux": { "score": <number>, "roast": "<string>" },
    "vibe": { "score": <number>, "roast": "<string>" }
  },
  "fullRoast": "<2-3 paragraphs, specific, funny, expert — reference actual content found on the page>",
  "issues": [
    { "title": "<string>", "description": "<string>" },
    { "title": "<string>", "description": "<string>" },
    { "title": "<string>", "description": "<string>" },
    { "title": "<string>", "description": "<string>" }
  ],
  "oneGoodThing": "<genuine specific compliment>",
  "quickWins": ["<string>", "<string>", "<string>"]
}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ error: "Roast failed. Something went wrong." }, { status: 500 });
    }

    let parsed: unknown;
    try {
      // Strip any accidental markdown fences
      const raw = textBlock.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Roast failed. The site might be blocking us or something went wrong." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Roast failed. The site might be blocking us or something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

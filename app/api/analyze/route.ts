import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { idea } = await req.json();

  if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
    return NextResponse.json({ error: "Idea is required." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenRouter API key is not configured." },
      { status: 500 }
    );
  }

  const prompt = `You are a product expert.
Analyze this idea:

${idea.trim()}

Return:
1. Problem & Opportunity
2. Target Users
3. MVP Scope
4. Key Features
5. Risks
6. Recommendation (Go / No-Go + why)

Be concise and practical.

Respond ONLY with a valid JSON object using these exact keys:
{
  "problem": "...",
  "users": "...",
  "mvp": "...",
  "features": "...",
  "risks": "...",
  "recommendation": "..."
}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://v0.app",
      "X-Title": "AI Product Validator",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json(
      { error: `OpenRouter API error: ${error}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    return NextResponse.json(
      { error: "No response from OpenRouter." },
      { status: 500 }
    );
  }

  const parsed = JSON.parse(content);
  return NextResponse.json(parsed);
}

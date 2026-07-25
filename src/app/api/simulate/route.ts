import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contentBody, platform, contentType, targetAudience } = body;

    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA API key not configured' }, { status: 500 });
    }

    const systemPrompt = `You are Social World Simulator — a STRICT and HARSH AI audience reaction engine.
You act as a ruthless content editor. If a hook is boring, say it's boring. If a CTA is weak, tell them to rewrite it.
Analyze the creator's post/script and return ONLY valid JSON without markdown formatting.

Required JSON Structure:
{
  "metrics": {
    "viralityScore": number (50-99),
    "attentionScore": number (50-99),
    "hookStrength": number (50-99),
    "shareProbability": number (50-99),
    "audienceFit": number (50-99),
    "brandSafety": number (70-99),
    "algorithmConfidence": number (50-99),
    "estimatedReach": string (e.g. "350K - 1.4M impressions")
  },
  "transcriptHighlights": [
    {
      "text": string (the exact sentence from the script),
      "type": "weak_hook" | "boring" | "confusing" | "good",
      "suggestion": string (a strict, actionable instruction on how to rewrite this specific text)
    }
  ],
  "comments": [
    {
      "authorName": string,
      "authorHandle": string,
      "authorAvatar": string,
      "authorRole": string,
      "authorColor": string,
      "content": string,
      "sentiment": "viral" | "positive" | "skeptical" | "hater" | "bot",
      "likes": number,
      "replies": number,
      "shares": number,
      "timestamp": number (3 to 55)
    }
  ],
  "recommendations": [
    {
      "id": string,
      "title": string,
      "category": "Hook" | "Visual" | "CTA" | "Pacing",
      "impact": "CRITICAL" | "HIGH" | "MEDIUM",
      "description": string (Strict, harsh feedback why it failed),
      "beforeAfter": { "before": string, "after": string (The Auto-Rewrite version) },
      "metricBoost": string
    }
  ]
}`;

    const userPrompt = `Platform: ${platform || 'Twitter'}
Content Type: ${contentType || 'video'}
Target Audience: ${targetAudience || 'General Creators'}

Content/Script:
"${contentBody || 'Social World Simulator demo'}"`;

    // NVIDIA AI Cloud API Request
    const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.3-70b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 1500,
      }),
    });

    if (!nvidiaRes.ok) {
      const errText = await nvidiaRes.text();
      console.error('NVIDIA AI API error:', errText);
      return NextResponse.json({ error: 'NVIDIA AI API call failed', details: errText }, { status: 502 });
    }

    const data = await nvidiaRes.json();
    const rawContent = data.choices?.[0]?.message?.content || '';

    // Sanitize JSON text output from LLM
    const cleanJsonText = rawContent
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsedData = JSON.parse(cleanJsonText);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Simulation Route Exception:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error?.message || String(error) },
      { status: 500 }
    );
  }
}

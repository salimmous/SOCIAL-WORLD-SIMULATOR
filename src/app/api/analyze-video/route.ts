import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, platform } = body;

    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA API key not configured' }, { status: 500 });
    }

    const systemPrompt = `You are NVIDIA AI Video Understanding Engine.
Analyze the uploaded video media file and return ONLY valid JSON strictly matching this structure without markdown formatting or codeblocks:

{
  "title": string,
  "summary": string,
  "hook": string,
  "transcript": string,
  "language": string,
  "tone": string,
  "emotion": string,
  "category": string,
  "audience": string,
  "keywords": string[],
  "timeline": [
    {
      "time": string,
      "description": string
    }
  ]
}`;

    const userPrompt = `Uploaded Video File: "${fileName || 'viral_tech_advice.mp4'}"
Target Platform: "${platform || 'TikTok'}"

Generate full video intelligence JSON breakdown including title, short summary, opening hook, transcript, tone, emotion, category, target audience, keywords, and 4-step scene timeline breakdown.`;

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
        temperature: 0.5,
        max_tokens: 1000,
      }),
    });

    if (!nvidiaRes.ok) {
      const errText = await nvidiaRes.text();
      console.error('NVIDIA AI API error:', errText);
      return NextResponse.json({ error: 'NVIDIA AI API call failed', details: errText }, { status: 502 });
    }

    const data = await nvidiaRes.json();
    const rawContent = data.choices?.[0]?.message?.content || '';

    const cleanJsonText = rawContent
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsedData = JSON.parse(cleanJsonText);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('NVIDIA Video Intelligence Route Exception:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error?.message || String(error) },
      { status: 500 }
    );
  }
}

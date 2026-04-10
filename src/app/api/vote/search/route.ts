import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query || query.trim().length < 1) {
      return NextResponse.json({ players: [] });
    }

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `欧州サッカーの歴代名選手データベースから「${query.trim()}」に一致する選手を最大5人返してください。
実在した選手のみ。名前は日本語（カタカナ）表記で。
JSONの配列のみ返してください（マークダウン・コードブロック不要）。例: ["ロナウド・ナザーリオ", "クリスティアーノ・ロナウド"]
一致する選手がいなければ空配列 [] を返してください。`,
        },
      ],
    });

    const text = (message.content[0] as { type: string; text: string }).text.trim();
    let players: string[] = [];
    try {
      players = JSON.parse(text);
    } catch {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) players = JSON.parse(match[0]);
    }

    return NextResponse.json({ players: Array.isArray(players) ? players.slice(0, 5) : [] });
  } catch (err) {
    console.error('Vote search error:', err);
    return NextResponse.json({ players: [] });
  }
}

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
          content: `あなたはサッカー選手名の検索エンジンです。ユーザーが入力した文字列に近い実在するサッカー選手を最大5人返してください。

検索クエリ: 「${query.trim()}」

ルール:
- 欧州リーグ（プレミア、ラリーガ、セリエA、ブンデス、リーグアン等）で活躍した選手が対象
- 部分一致・読み方の揺れ・英語カタカナ混在でも柔軟にマッチさせる（例: "カフー"→カフー、"Ronaldo"→ロナウド・ナザーリオ等）
- 名前は日本語カタカナ表記で返す（例: カフー、ロナウド・ナザーリオ、ジネディーヌ・ジダン）
- JSONの配列のみ返す（コードブロック・説明文不要）
- 例: ["カフー", "カルロス・アルベルト・トーレス"]
- 1人でも一致すれば返す。完全一致でなくてよい。`,
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

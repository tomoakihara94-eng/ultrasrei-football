import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import type { EvaluateResponse } from '@/types';

const client = new Anthropic();

export async function POST(req: Request) {
  try {
    const { name, nationality } = await req.json();

    if (!name || !nationality) {
      return NextResponse.json({ error: 'name and nationality are required' }, { status: 400 });
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `あなたはサッカー歴史の専門家です。
選手名「${name}」（国籍: ${nationality}）について、歴史的なベストイレブン選出を想定した能力査定を行ってください。

以下のJSON形式のみで回答してください（説明文は不要）:
{
  "pace": <0-100の整数>,
  "shooting": <0-100の整数>,
  "passing": <0-100の整数>,
  "dribbling": <0-100の整数>,
  "defense": <0-100の整数>,
  "physical": <0-100の整数>,
  "position": "<GK/CB/LB/RB/LWB/RWB/CDM/CM/CAM/LM/RM/LW/RW/CF/STのいずれか>",
  "era": "<活躍した年代 例: 1990年代〜2000年代>",
  "description": "<その選手についての一言コメント（日本語、30文字以内）>",
  "club": "<その選手の最も代表的・象徴的なクラブ 例: Real Madrid>"
}

選手が不明な場合は平均的な能力値（各項目65前後）で推定してください。
GKの場合はpaceとshootingを低め、defenseを高めに設定してください。`,
        },
      ],
    });

    const text =
      message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response did not contain valid JSON');
    }

    const data: EvaluateResponse = JSON.parse(jsonMatch[0]);

    // clamp values to 0-100
    const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)));
    const result: EvaluateResponse = {
      pace:      clamp(data.pace),
      shooting:  clamp(data.shooting),
      passing:   clamp(data.passing),
      dribbling: clamp(data.dribbling),
      defense:   clamp(data.defense),
      physical:  clamp(data.physical),
      position:  data.position,
      era:       data.era ?? '',
      description: data.description ?? '',
      club:      data.club ?? '',
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error('evaluate error:', err);
    return NextResponse.json(
      { error: 'AI評価に失敗しました。APIキーを確認してください。' },
      { status: 500 }
    );
  }
}

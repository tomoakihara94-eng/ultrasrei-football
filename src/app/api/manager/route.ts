import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { MANAGER_STYLES } from '@/lib/managerStyles';

const client = new Anthropic();

export async function POST(req: Request) {
  try {
    const { description, formation, totalScore } = await req.json();
    if (!description?.trim()) {
      return NextResponse.json({ error: 'description is required' }, { status: 400 });
    }

    const styleList = MANAGER_STYLES
      .map((s) => `- id="${s.id}": ${s.name}（キーワード: ${s.keyword}）`)
      .join('\n');

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `サッカーファンの「架空の名将タイプ」を診断してください。

ユーザーの好み: 「${description}」
チームフォーメーション: ${formation}
チーム総合値: ${totalScore}

診断候補（架空の名将タイプ）:
${styleList}

以下のJSON形式のみで回答してください（説明文不要）:
{"styleId": "<上記idのいずれか>", "reason": "<診断理由（日本語、35文字以内）>"}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON');

    const { styleId, reason } = JSON.parse(jsonMatch[0]);
    const style = MANAGER_STYLES.find((s) => s.id === styleId);
    if (!style) throw new Error('Invalid styleId');

    return NextResponse.json({ styleId: style.id, styleName: style.name, reason });
  } catch (err) {
    console.error('manager error:', err);
    return NextResponse.json({ error: '診断に失敗しました' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

function levelBonus(level: number): number {
  if (level >= 3) return 20;
  if (level >= 2) return 10;
  return 0;
}

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('quiz_rankings')
    .select('id, nickname, score, total, level, created_at')
    .order('created_at', { ascending: true })
    .limit(500);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const ranked = (data ?? [])
    .map(entry => ({ ...entry, points: entry.score + levelBonus(entry.level ?? 1) }))
    .sort((a, b) => b.points - a.points || a.created_at.localeCompare(b.created_at))
    .slice(0, 20);

  return NextResponse.json(ranked);
}

export async function POST(req: NextRequest) {
  const { nickname, score, total, level } = await req.json();

  if (!nickname || score == null || total == null) {
    return NextResponse.json({ error: 'nickname, score, total は必須です' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('quiz_rankings')
    .insert({
      nickname: String(nickname).slice(0, 20),
      score: Number(score),
      total: Number(total),
      level: Number(level) || 1,
    })
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}

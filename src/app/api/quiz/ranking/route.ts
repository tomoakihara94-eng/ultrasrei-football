import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('quiz_rankings')
    .select('id, nickname, score, total, created_at')
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(20);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const { nickname, score, total } = await req.json();

  if (!nickname || score == null || total == null) {
    return NextResponse.json({ error: 'nickname, score, total は必須です' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('quiz_rankings')
    .insert({ nickname: String(nickname).slice(0, 20), score: Number(score), total: Number(total) })
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}

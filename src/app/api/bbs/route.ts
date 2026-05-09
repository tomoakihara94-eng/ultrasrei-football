import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('bbs_posts')
    .select('id, nickname, body, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const nickname = (body.nickname ?? '').trim() || '匿名';
  const text = (body.body ?? '').trim();

  if (!text || text.length > 200) {
    return NextResponse.json({ error: '本文は1〜200文字で入力してください' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('bbs_posts')
    .insert({ nickname, body: text })
    .select('id, nickname, body, created_at')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

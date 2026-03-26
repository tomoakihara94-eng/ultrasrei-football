import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('formation_id', id)
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const { nickname, body } = await req.json();

  if (!nickname?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'nickname and body are required' }, { status: 400 });
  }
  if (nickname.length > 30 || body.length > 300) {
    return NextResponse.json({ error: 'Too long' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({ formation_id: id, nickname: nickname.trim(), body: body.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

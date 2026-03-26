import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const { error } = await supabase.rpc('increment_likes', { formation_id: id });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

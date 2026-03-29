import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/pageviews?key=daily-2026-03-29
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  if (!key) return NextResponse.json({ value: 0 });

  const supabase = getSupabase();
  const { data } = await supabase
    .from('pageviews')
    .select('value')
    .eq('key', key)
    .single();

  return NextResponse.json({ value: data?.value ?? 0 });
}

// POST /api/pageviews  body: { key: string }
export async function POST(req: NextRequest) {
  const { key } = await req.json() as { key: string };
  if (!key) return NextResponse.json({ value: 0 });

  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('hit_pageview', { p_key: key });

  if (error) {
    console.error('[pageviews] RPC error:', error.message);
    return NextResponse.json({ value: 0 }, { status: 500 });
  }

  return NextResponse.json({ value: data ?? 0 });
}

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const sort = req.nextUrl.searchParams.get('sort') ?? 'recent';

  let query = supabase
    .from('formations')
    .select('id, team_name, formation, players, likes, view_count, created_at');

  if (sort === 'likes') {
    query = query.order('likes', { ascending: false });
  } else if (sort === 'views') {
    query = query.order('view_count', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query.limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { team_name, formation, players, bench, manager_style, custom_positions } = body;

  if (!formation || !players) {
    return NextResponse.json({ error: 'formation and players are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('formations')
    .insert({ team_name, formation, players, bench, manager_style, custom_positions })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}

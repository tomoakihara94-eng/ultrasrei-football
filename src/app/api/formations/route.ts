import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { voterId, position, firstPlace, secondPlace, thirdPlace } = await req.json();

    if (!voterId || !position || !firstPlace || !secondPlace || !thirdPlace) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }
    if (firstPlace === secondPlace || secondPlace === thirdPlace || firstPlace === thirdPlace) {
      return NextResponse.json({ error: '同じ選手を複数回選ぶことはできません' }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase.from('votes').upsert(
      {
        voter_id: voterId,
        position,
        first_place: firstPlace,
        second_place: secondPlace,
        third_place: thirdPlace,
      },
      { onConflict: 'voter_id,position' }
    );

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Vote API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

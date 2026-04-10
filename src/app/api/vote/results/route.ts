import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('votes')
      .select('voter_id, position, first_place, second_place, third_place');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // ポイント集計: 1位=3pt, 2位=2pt, 3位=1pt
    const points: Record<string, Record<string, number>> = {};
    const voteCounts: Record<string, Record<string, number>> = {};
    const voterIds = new Set<string>();

    for (const row of data) {
      voterIds.add(row.voter_id);
      const pos = row.position;
      if (!points[pos]) { points[pos] = {}; voteCounts[pos] = {}; }

      const add = (player: string, pt: number) => {
        points[pos][player] = (points[pos][player] || 0) + pt;
        voteCounts[pos][player] = (voteCounts[pos][player] || 0) + 1;
      };
      add(row.first_place, 3);
      add(row.second_place, 2);
      add(row.third_place, 1);
    }

    // ポジション別にポイント順でソート
    const results: Record<string, { player: string; points: number; votes: number }[]> = {};
    for (const [pos, players] of Object.entries(points)) {
      results[pos] = Object.entries(players)
        .map(([player, pts]) => ({ player, points: pts, votes: voteCounts[pos][player] }))
        .sort((a, b) => b.points - a.points);
    }

    return NextResponse.json({ results, totalVoters: voterIds.size });
  } catch (err) {
    console.error('Vote results API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// レアル・マドリードでの全コンペティション通算成績（推定値・ファン考察）
const PLAYER_DATA = [
  // クリスティアーノ・ロナウド
  { player_name: 'クリスティアーノ・ロナウド', season: '2009-10', goals: 33, assists: 11 },
  { player_name: 'クリスティアーノ・ロナウド', season: '2010-11', goals: 53, assists: 20 },
  { player_name: 'クリスティアーノ・ロナウド', season: '2011-12', goals: 60, assists: 18 },
  // カリム・ベンゼマ
  { player_name: 'カリム・ベンゼマ', season: '2020-21', goals: 30, assists: 9 },
  { player_name: 'カリム・ベンゼマ', season: '2021-22', goals: 44, assists: 15 },
  { player_name: 'カリム・ベンゼマ', season: '2022-23', goals: 19, assists: 6 },
  // ジュード・ベリンガム
  { player_name: 'ジュード・ベリンガム', season: '2023-24', goals: 23, assists: 13 },
  { player_name: 'ジュード・ベリンガム', season: '2024-25', goals: 17, assists: 9 },
  // ヴィニシウス・ジュニオール
  { player_name: 'ヴィニシウス・ジュニオール', season: '2021-22', goals: 22, assists: 20 },
  { player_name: 'ヴィニシウス・ジュニオール', season: '2022-23', goals: 23, assists: 8 },
  { player_name: 'ヴィニシウス・ジュニオール', season: '2023-24', goals: 24, assists: 11 },
];

export async function POST() {
  const supabase = getSupabase();

  // 既存データを削除して再投入
  await supabase.from('quiz_players').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const { error } = await supabase.from('quiz_players').insert(PLAYER_DATA);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, inserted: PLAYER_DATA.length });
}

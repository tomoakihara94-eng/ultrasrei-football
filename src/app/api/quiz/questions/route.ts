import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// ─────────────────────────────────────────────────────────────────
// 統一問題型
// ─────────────────────────────────────────────────────────────────
export interface QuizQuestion {
  question_text: string;
  choices: string[];
  correct_answer: string;
  level: 1 | 2 | 3;
  genre: 'stats' | 'history';
  context?: string;
  emoji?: string;
  hint?: string;
}

// ─────────────────────────────────────────────────────────────────
// フォールバック用スタッツデータ
// ─────────────────────────────────────────────────────────────────
const FALLBACK_PLAYERS = [
  { player_name: 'クリスティアーノ・ロナウド', season: '2009-10', goals: 33,  assists: 11 },
  { player_name: 'クリスティアーノ・ロナウド', season: '2010-11', goals: 53,  assists: 20 },
  { player_name: 'クリスティアーノ・ロナウド', season: '2011-12', goals: 60,  assists: 18 },
  { player_name: 'カリム・ベンゼマ',           season: '2020-21', goals: 30,  assists: 9  },
  { player_name: 'カリム・ベンゼマ',           season: '2021-22', goals: 44,  assists: 15 },
  { player_name: 'カリム・ベンゼマ',           season: '2022-23', goals: 19,  assists: 6  },
  { player_name: 'ジュード・ベリンガム',        season: '2023-24', goals: 23,  assists: 13 },
  { player_name: 'ヴィニシウス・ジュニオール',  season: '2021-22', goals: 22,  assists: 20 },
  { player_name: 'ヴィニシウス・ジュニオール',  season: '2022-23', goals: 23,  assists: 8  },
  { player_name: 'ヴィニシウス・ジュニオール',  season: '2023-24', goals: 24,  assists: 11 },
];

const PLAYER_EMOJI: Record<string, string> = {
  'クリスティアーノ・ロナウド': '🇵🇹',
  'カリム・ベンゼマ':           '🇫🇷',
  'ジュード・ベリンガム':        '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'ヴィニシウス・ジュニオール':  '🇧🇷',
  'トニ・クロース':              '🇩🇪',
};

type PlayerRow = { player_name: string; season: string; goals: number; assists: number };

function numChoices(correct: number, spread: number[]): string[] {
  const s = new Set<number>([correct]);
  for (const o of spread) {
    if (s.size < 4 && correct - o >= 0) s.add(correct - o);
    if (s.size < 4) s.add(correct + o);
  }
  let n = 1;
  while (s.size < 4) {
    if (!s.has(correct + n)) s.add(correct + n);
    if (s.size < 4 && correct - n >= 0) s.add(correct - n);
    n++;
  }
  return Array.from(s).sort(() => Math.random() - 0.5).map(String);
}

function buildGoalQuestions(rows: PlayerRow[]): QuizQuestion[] {
  return rows.map(r => ({
    question_text: 'このシーズンのレアル・マドリードでのゴール数は？',
    choices: numChoices(r.goals, [3, 7, 12, 18]),
    correct_answer: String(r.goals),
    level: 1 as const, genre: 'stats' as const,
    context: `${r.player_name}｜${r.season} シーズン`,
    emoji: PLAYER_EMOJI[r.player_name] ?? '⚽',
    hint: '全コンペティション通算（推定値）',
  }));
}

function buildAssistQuestions(rows: PlayerRow[]): QuizQuestion[] {
  return rows.map(r => ({
    question_text: 'このシーズンのレアル・マドリードでのアシスト数は？',
    choices: numChoices(r.assists, [2, 4, 7, 11]),
    correct_answer: String(r.assists),
    level: 2 as const, genre: 'stats' as const,
    context: `${r.player_name}｜${r.season} シーズン`,
    emoji: PLAYER_EMOJI[r.player_name] ?? '⚽',
  }));
}

// ─────────────────────────────────────────────────────────────────
// LV.3 スタッツ: クロース パス成功率
// ─────────────────────────────────────────────────────────────────
const KROOS_STATS: QuizQuestion[] = [
  {
    question_text: 'このシーズンのパス成功率は？（全コンペティション）',
    choices: ['90.6%', '92.1%', '92.8%', '94.4%'],
    correct_answer: '92.8%',
    level: 3, genre: 'stats',
    context: 'トニ・クロース｜2019-20 シーズン',
    emoji: '🇩🇪',
    hint: 'クロースはシーズン通じて90%超を維持した',
  },
  {
    question_text: 'このシーズンのパス成功率は？（全コンペティション）',
    choices: ['90.4%', '91.4%', '92.1%', '93.5%'],
    correct_answer: '92.1%',
    level: 3, genre: 'stats',
    context: 'トニ・クロース｜2021-22 シーズン',
    emoji: '🇩🇪',
    hint: 'CL優勝シーズンでも高水準を記録',
  },
  {
    question_text: 'このシーズンのパス成功率は？（全コンペティション）',
    choices: ['91.8%', '92.9%', '93.8%', '95.2%'],
    correct_answer: '93.8%',
    level: 3, genre: 'stats',
    context: 'トニ・クロース｜2022-23 シーズン',
    emoji: '🇩🇪',
    hint: 'ラスト近いシーズンでもキャリアハイ水準',
  },
];

// ─────────────────────────────────────────────────────────────────
// ヒストリー問題 LV.1（初級）
// ─────────────────────────────────────────────────────────────────
const HISTORY_LV1: QuizQuestion[] = [
  {
    question_text: 'デシマ（10度目のCL優勝）を達成した年は？',
    choices: ['2012年', '2013年', '2014年', '2016年'],
    correct_answer: '2014年',
    level: 1, genre: 'history', emoji: '🏆',
    hint: 'リスボンのエスタジオ・ダ・ルスで延長戦の末アトレティコを下した',
  },
  {
    question_text: 'デシマ決勝、後半アディショナルタイムに同点ゴールを決めたのは誰？',
    choices: ['クリスティアーノ・ロナウド', 'ガレス・ベイル', 'セルヒオ・ラモス', 'カリム・ベンゼマ'],
    correct_answer: 'セルヒオ・ラモス',
    level: 1, genre: 'history', emoji: '⚽',
    hint: 'コーナーキックから93分にヘッドで叩き込み、延長戦に持ち込んだ',
  },
  {
    question_text: 'ジュード・ベリンガムがReal Madridに加入した年は？',
    choices: ['2021年', '2022年', '2023年', '2024年'],
    correct_answer: '2023年',
    level: 1, genre: 'history', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    hint: 'ドルトムントから約1億ユーロで移籍',
  },
  {
    question_text: '2022年CL準決勝・マンチェスター・C戦でベンゼマが達成した記録は？',
    choices: ['先制ゴール2発', 'PK2本', '逆転ハットトリック', 'アシスト3本'],
    correct_answer: '逆転ハットトリック',
    level: 1, genre: 'history', emoji: '🇫🇷',
    hint: '2試合合計で逆転を演出した伝説のパフォーマンス',
  },
  {
    question_text: 'ジダンがReal Madrid監督としてCLを初めて制したのは何年？',
    choices: ['2014年', '2015年', '2016年', '2017年'],
    correct_answer: '2016年',
    level: 1, genre: 'history', emoji: '🇫🇷',
    hint: 'PK戦でアトレティコ・マドリードを下した',
  },
];

// ─────────────────────────────────────────────────────────────────
// ヒストリー問題 LV.2（中級）
// ─────────────────────────────────────────────────────────────────
const HISTORY_LV2: QuizQuestion[] = [
  {
    question_text: 'ジダンの伝説のボレーゴールが生まれたCL決勝の年は？',
    choices: ['1998年', '2000年', '2002年', '2004年'],
    correct_answer: '2002年',
    level: 2, genre: 'history', emoji: '🇫🇷',
    hint: 'ハンプデン・パーク（グラスゴー）でのゴールは「世紀のゴール」と称される',
  },
  {
    question_text: 'ジダンのボレーゴールの相手チームは？',
    choices: ['バイエルン・ミュンヘン', 'ユベントス', 'バイエル・レバークーゼン', 'マンチェスター・U'],
    correct_answer: 'バイエル・レバークーゼン',
    level: 2, genre: 'history', emoji: '🏆',
    hint: 'ロベルト・カルロスのクロスをジダンが左足ボレーで合わせた',
  },
  {
    question_text: 'ルイス・フィーゴがバルセロナからReal Madridに移籍したのは何年？',
    choices: ['1999年', '2000年', '2001年', '2002年'],
    correct_answer: '2000年',
    level: 2, genre: 'history', emoji: '🇵🇹',
    hint: 'ガラクティコス第1弾の移籍。後のカンプ・ノウ凱旋試合は伝説に',
  },
  {
    question_text: 'ラウールのReal Madrid公式戦通算ゴール数は？',
    choices: ['289ゴール', '306ゴール', '323ゴール', '341ゴール'],
    correct_answer: '323ゴール',
    level: 2, genre: 'history', emoji: '🇪🇸',
    hint: 'ロナウドが2015年に更新するまでのクラブ最多記録',
  },
  {
    question_text: 'ロベルト・カルロスがReal Madridに在籍したのは何年から何年まで？',
    choices: ['1994〜2004年', '1996〜2006年', '1998〜2007年', '1996〜2009年'],
    correct_answer: '1996〜2006年',
    level: 2, genre: 'history', emoji: '🇧🇷',
    hint: '10年間にわたりDFとして活躍し、強烈なFKは今も語り継がれる',
  },
  {
    question_text: 'ガラクティコス政策を推進した会長は？',
    choices: ['ラモン・カルデロン', 'フロレンティーノ・ペレス', 'ロレンソ・サンス', 'アルベルト・ゴンサレス'],
    correct_answer: 'フロレンティーノ・ペレス',
    level: 2, genre: 'history', emoji: '👔',
    hint: '毎夏にスーパースターを獲得し続けた伝説の補強路線',
  },
];

// ─────────────────────────────────────────────────────────────────
// ヒストリー問題 LV.3（上級・マニアック）
// ─────────────────────────────────────────────────────────────────
const HISTORY_LV3: QuizQuestion[] = [
  {
    question_text: 'レアル・マドリードの欧州制覇5連覇、最初の優勝年は？',
    choices: ['1952年', '1954年', '1956年', '1958年'],
    correct_answer: '1956年',
    level: 3, genre: 'history', emoji: '👑',
    hint: '1956〜1960年の5連覇。ディ・ステファノ、プシュカシュが率いた黄金期',
  },
  {
    question_text: '1960年 欧州カップ決勝（vs アインクラハト・フランクフルト）のスコアは？',
    choices: ['5-1', '6-2', '7-3', '8-1'],
    correct_answer: '7-3',
    level: 3, genre: 'history', emoji: '🏆',
    hint: 'ハンプデン・パークに13万7000人。プシュカシュが4得点、ディ・ステファノが3得点',
  },
  {
    question_text: 'デシマ決勝でラモスが同点ゴールを決めたのは何分？',
    choices: ['88分', '90分', '93分', '96分'],
    correct_answer: '93分',
    level: 3, genre: 'history', emoji: '⚽',
    hint: 'あと数秒でアトレティコの初CL優勝という場面を覆した奇跡のヘッド',
  },
  {
    question_text: 'Real Madridがリーガ・エスパニョーラを初めて制覇したのは何年？',
    choices: ['1920年', '1926年', '1932年', '1940年'],
    correct_answer: '1932年',
    level: 3, genre: 'history', emoji: '🏅',
    hint: '当時は「カンペオナート・ナシオナル・デ・リーガ」と称されていた',
  },
  {
    question_text: 'アルフレッド・ディ・ステファノのReal Madrid公式戦通算ゴール数は？',
    choices: ['268ゴール', '289ゴール', '308ゴール', '326ゴール'],
    correct_answer: '308ゴール',
    level: 3, genre: 'history', emoji: '🇦🇷',
    hint: '1953〜1964年在籍。5連覇を牽引しクラブの礎を築いた',
  },
  {
    question_text: 'Real Madridの選手として初めてバロンドールを受賞したのは誰？（1957年）',
    choices: ['フランシスコ・ヘント', 'レイモン・コパ', 'アルフレッド・ディ・ステファノ', 'フェレンツ・プシュカシュ'],
    correct_answer: 'アルフレッド・ディ・ステファノ',
    level: 3, genre: 'history', emoji: '🏅',
    hint: '1957年と1959年の2度受賞。欧州カップ5連覇の象徴的存在',
  },
  {
    question_text: '1998年 CL優勝時の決勝の相手は？',
    choices: ['バルセロナ', 'ユベントス', 'バイエルン・ミュンヘン', 'PSV'],
    correct_answer: 'ユベントス',
    level: 3, genre: 'history', emoji: '🏆',
    hint: '32年ぶり7度目のCL優勝。ミヤトビッチの1点を守りきった',
  },
  {
    question_text: 'ラウールがReal Madridを退団した後、最初に移籍したクラブは？',
    choices: ['アル・サッド', 'シャルケ04', 'ニューヨーク・コスモス', 'CSKAモスクワ'],
    correct_answer: 'シャルケ04',
    level: 3, genre: 'history', emoji: '🇪🇸',
    hint: '2010年に移籍し、後に北米でもプレー',
  },
];

// ─────────────────────────────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────────────────────────────
function pick<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// ─────────────────────────────────────────────────────────────────
// GET handler  (?level=1|2|3)
// ─────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const levelParam = req.nextUrl.searchParams.get('level');
  const level = (levelParam === '2' ? 2 : levelParam === '3' ? 3 : 1) as 1 | 2 | 3;

  // DB からスタッツデータ取得（失敗 or 空はフォールバック）
  let playerRows: PlayerRow[] = [];
  try {
    const supabase = getSupabase();
    const { data } = await supabase.from('quiz_players').select('*');
    if (data && data.length > 0) playerRows = data as PlayerRow[];
  } catch { /* ignore */ }
  if (playerRows.length === 0) playerRows = FALLBACK_PLAYERS;

  let questions: QuizQuestion[];

  if (level === 1) {
    // LV.1: ゴール数5問 + ヒストリー初級5問 = 10問
    const goalQs = buildGoalQuestions(playerRows);
    questions = [
      ...pick(goalQs, 5),
      ...pick(HISTORY_LV1, 5),
    ];
  } else if (level === 2) {
    // LV.2: アシスト数4問 + ヒストリー中級6問 = 10問
    const assistQs = buildAssistQuestions(playerRows);
    questions = [
      ...pick(assistQs, 4),
      ...pick(HISTORY_LV2, 6),
    ];
  } else {
    // LV.3: クロース3問 + ヒストリー上級7問 = 10問
    questions = [
      ...pick(KROOS_STATS, 3),
      ...pick(HISTORY_LV3, 7),
    ];
  }

  return NextResponse.json(questions.sort(() => Math.random() - 0.5));
}

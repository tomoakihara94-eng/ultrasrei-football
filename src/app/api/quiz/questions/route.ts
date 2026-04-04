import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────
// 統一問題型
// ─────────────────────────────────────────────────────────────────
export interface QuizQuestion {
  question_text: string;
  choices: string[];
  correct_answer: string;
  level: 1 | 2 | 3;
  genre: 'winners' | 'legends';
  context?: string;
  emoji?: string;
  hint?: string;
}

// ─────────────────────────────────────────────────────────────────
// LV.1 — 近年のスター選手と優勝クラブ（12問からランダム10問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV1: QuizQuestion[] = [
  {
    question_text: '2023-24シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['レアル・マドリード', 'マンチェスター・シティ', 'バイエルン・ミュンヘン', 'ボルシア・ドルトムント'],
    correct_answer: 'レアル・マドリード',
    level: 1, genre: 'winners', emoji: '🏆',
    hint: 'ウェンブリーでドルトムントを2-0で下し、15度目の優勝',
  },
  {
    question_text: '2022-23シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['マンチェスター・シティ', 'インテル', 'レアル・マドリード', 'ナポリ'],
    correct_answer: 'マンチェスター・シティ',
    level: 1, genre: 'winners', emoji: '🌟',
    hint: 'グアルディオラ監督のもとリーグ・FA杯との3冠を達成',
  },
  {
    question_text: '2021-22シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['レアル・マドリード', 'リバプール', 'マンチェスター・シティ', 'チェルシー'],
    correct_answer: 'レアル・マドリード',
    level: 1, genre: 'winners', emoji: '⭐',
    hint: 'ヴィニシウスJrのゴールでリバプールを1-0で下した',
  },
  {
    question_text: '2020-21シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['チェルシー', 'マンチェスター・シティ', 'バイエルン・ミュンヘン', 'パリSG'],
    correct_answer: 'チェルシー',
    level: 1, genre: 'winners', emoji: '🏆',
    hint: 'ポルトでの決勝。ハヴェルツのゴールで1-0',
  },
  {
    question_text: '2019-20シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['バイエルン・ミュンヘン', 'パリSG', 'ライプツィヒ', 'アトレティコ・マドリード'],
    correct_answer: 'バイエルン・ミュンヘン',
    level: 1, genre: 'winners', emoji: '⭐',
    hint: 'リスボンでのバブル大会。PSGを1-0で下し無敗優勝',
  },
  {
    question_text: '2018-19シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['リバプール', 'トットナム', 'バルセロナ', 'アヤックス'],
    correct_answer: 'リバプール',
    level: 1, genre: 'winners', emoji: '🌟',
    hint: 'マドリードでの決勝。オリギの2ゴールでトットナムを2-0',
  },
  {
    question_text: 'チャンピオンズリーグ史上最多優勝クラブは？（2024時点）',
    choices: ['レアル・マドリード', 'ACミラン', 'リバプール', 'バルセロナ'],
    correct_answer: 'レアル・マドリード',
    level: 1, genre: 'winners', emoji: '👑',
    hint: '2024年時点で15度の欧州制覇を誇る',
  },
  {
    question_text: 'CLで最多通算ゴールを記録している選手は？（2024時点）',
    choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'ラウール', 'カリム・ベンゼマ'],
    correct_answer: 'クリスティアーノ・ロナウド',
    level: 1, genre: 'winners', emoji: '🇵🇹',
    hint: 'マンU・レアル・ユーベ・アル・ナスルで積み上げた記録',
  },
  {
    question_text: '2023-24 CL決勝でレアルの2得点を記録した2人は？',
    choices: ['カルバハルとヴィニシウスJr', 'ベリンガムとヴィニシウスJr', 'ロドリゴとカルバハル', 'ベリンガムとロドリゴ'],
    correct_answer: 'カルバハルとヴィニシウスJr',
    level: 1, genre: 'winners', emoji: '🎯',
    hint: '守備の要DFが先制し、エースFWがダメ押し',
  },
  {
    question_text: '2016-17シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['レアル・マドリード', 'ユベントス', 'モナコ', 'アトレティコ・マドリード'],
    correct_answer: 'レアル・マドリード',
    level: 1, genre: 'winners', emoji: '⭐',
    hint: 'カーディフでユベントスを4-1。CL初の連覇達成',
  },
  {
    question_text: '2015-16シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['レアル・マドリード', 'アトレティコ・マドリード', 'バイエルン', 'マンチェスター・C'],
    correct_answer: 'レアル・マドリード',
    level: 1, genre: 'winners', emoji: '🏆',
    hint: 'ミラノ決勝でシティダービーを制し、PK戦でも勝利',
  },
  {
    question_text: '2013-14シーズンのチャンピオンズリーグ優勝クラブは？',
    choices: ['レアル・マドリード', 'アトレティコ・マドリード', 'バイエルン', 'ドルトムント'],
    correct_answer: 'レアル・マドリード',
    level: 1, genre: 'winners', emoji: '👑',
    hint: 'デシマ達成。ラモスの93分同点弾から逆転優勝',
  },
];

// ─────────────────────────────────────────────────────────────────
// LV.2 — 伝説の逆転劇や有名な得点シーン（12問からランダム10問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV2: QuizQuestion[] = [
  {
    question_text: '「イスタンブールの奇跡」(2005 CL決勝)ハーフタイムのスコアは？',
    choices: ['ミラン 3-0 リバプール', 'ミラン 2-0 リバプール', 'ミラン 4-0 リバプール', 'ミラン 1-0 リバプール'],
    correct_answer: 'ミラン 3-0 リバプール',
    level: 2, genre: 'legends', emoji: '🔥',
    hint: '後半6分間に3点を奪い追いつき、PK戦で優勝した奇跡',
  },
  {
    question_text: '2005 CL決勝PK戦で決定的なセーブを連発したリバプールのGKは？',
    choices: ['ジェルジ・デュデク', 'ジェームズ・リーチ', 'クリス・カービン', 'イケル・カシジャス'],
    correct_answer: 'ジェルジ・デュデク',
    level: 2, genre: 'legends', emoji: '🧤',
    hint: 'シェフチェンコのシュートを奇跡的に止めたポーランド人GK',
  },
  {
    question_text: '2001-02 CL決勝でジダンが決めた伝説のボレーゴールの相手クラブは？',
    choices: ['バイエル・レバークーゼン', 'バイエルン・ミュンヘン', 'ユベントス', 'バレンシア'],
    correct_answer: 'バイエル・レバークーゼン',
    level: 2, genre: 'legends', emoji: '🇫🇷',
    hint: 'グラスゴーのハンプデン・パーク。ロベルト・カルロスのクロスを左足で合わせた',
  },
  {
    question_text: '2019 CLSFでアヤックスに逆転、90+6分の決勝弾を決めたトットナムの選手は？',
    choices: ['ルーカス・モウラ', 'ハリー・ケイン', 'ソン・フンミン', 'デレ・アリ'],
    correct_answer: 'ルーカス・モウラ',
    level: 2, genre: 'legends', emoji: '🇧🇷',
    hint: 'この試合3点目のゴールはほぼ同時にゴールラインを割った',
  },
  {
    question_text: '2019 CLSFでリバプールがバルサを4-0逆転。コーナーの「奇策」ゴールを演出したのは？',
    choices: ['トレント・アレクサンダー=アーノルド', 'ジョルジニオ・ワイナルドゥム', 'アンドリュー・ロバートソン', 'ジョーダン・ヘンダーソン'],
    correct_answer: 'トレント・アレクサンダー=アーノルド',
    level: 2, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    hint: 'バルサ守備陣がぼんやりしている隙を突いた速攻CK',
  },
  {
    question_text: '2021-22 CL R16でベンゼマがPSGに対してハットトリックを達成した試合は？',
    choices: ['第2戦（ホーム・ベルナベウ）', '第1戦（アウェイ・パリ）', '第1戦（ホーム）', '第2戦（アウェイ）'],
    correct_answer: '第2戦（ホーム・ベルナベウ）',
    level: 2, genre: 'legends', emoji: '🇫🇷',
    hint: 'ベルナベウで0-1から逆転。3点はすべて後半に生まれた',
  },
  {
    question_text: '2012 CL決勝でバイエルンを本拠地ミュンヘンでPK戦の末に下したクラブは？',
    choices: ['チェルシー', 'レアル・マドリード', 'バルセロナ', 'マンチェスター・U'],
    correct_answer: 'チェルシー',
    level: 2, genre: 'legends', emoji: '🔵',
    hint: 'ドログバが延長後半に同点ゴール。PK戦でチェフが躍動',
  },
  {
    question_text: '2003-04 CL優勝の立役者FCポルトの監督は誰？',
    choices: ['ジョゼ・モウリーニョ', 'カルロ・アンチェロッティ', 'ルイス・ファン・ハール', 'ルイス・フェリペ・スコラリ'],
    correct_answer: 'ジョゼ・モウリーニョ',
    level: 2, genre: 'legends', emoji: '🏆',
    hint: 'この優勝でチェルシー監督へ。後に「スペシャル・ワン」を名乗る',
  },
  {
    question_text: '2011 CL決勝でバルサがマンUを3-1で下した。先制ゴールを決めたのは？',
    choices: ['ペドロ', 'リオネル・メッシ', 'ダビド・ビジャ', 'セスク・ファブレガス'],
    correct_answer: 'ペドロ',
    level: 2, genre: 'legends', emoji: '🇪🇸',
    hint: '27分にルーニーに追いつかれるも、後半メッシとビジャが追加点',
  },
  {
    question_text: '2009 CL決勝でバルセロナがマンチェスター・Uを下したスコアは？',
    choices: ['2-0', '1-0', '3-1', '2-1'],
    correct_answer: '2-0',
    level: 2, genre: 'legends', emoji: '🇪🇸',
    hint: 'エトーとメッシが得点。グアルディオラ就任1年目での欧州制覇',
  },
  {
    question_text: '2006-07 CL決勝でACミランがリバプールを下したスコアは？',
    choices: ['2-1', '1-0', '3-1', '2-0'],
    correct_answer: '2-1',
    level: 2, genre: 'legends', emoji: '🇮🇹',
    hint: '「イスタンブールの奇跡」の2年後。ミランがリベンジを果たした',
  },
  {
    question_text: '2014-15 CL決勝でユベントスを3-1で下したバルセロナの3点目を決めたのは？',
    choices: ['ネイマール', 'リオネル・メッシ', 'ルイス・スアレス', 'セルヒオ・ブスケッツ'],
    correct_answer: 'ネイマール',
    level: 2, genre: 'legends', emoji: '🇧🇷',
    hint: '最後はゴールを空にして猛攻するユーベに対し、無人のゴールへ流し込んだ',
  },
];

// ─────────────────────────────────────────────────────────────────
// LV.3 — 詳細な記録・スタッツ・歴史的データ（12問からランダム10問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV3: QuizQuestion[] = [
  {
    question_text: 'CL1シーズン最多ゴール記録は？（2024時点）',
    choices: ['17ゴール（ロナウド, 2013-14）', '15ゴール（レワンドフスキ, 2019-20）', '14ゴール（メッシ, 2011-12）', '12ゴール（ファン・ニステルローイ, 2002-03）'],
    correct_answer: '17ゴール（ロナウド, 2013-14）',
    level: 3, genre: 'legends', emoji: '🇵🇹',
    hint: 'レアル・マドリードでの圧倒的な1シーズン。グループステージから決勝まで全試合で結果を残した',
  },
  {
    question_text: '2000-01 CL決勝の対戦カードは？',
    choices: ['バイエルン・ミュンヘン vs バレンシア', 'レアル・マドリード vs バレンシア', 'バルセロナ vs バレンシア', 'バイエルン vs バルセロナ'],
    correct_answer: 'バイエルン・ミュンヘン vs バレンシア',
    level: 3, genre: 'legends', emoji: '🏆',
    hint: 'バイエルンがPK戦でバレンシアを下し優勝。オリバー・カーン伝説の試合',
  },
  {
    question_text: '2003-04 CL決勝の対戦カードは？',
    choices: ['FCポルト vs ASモナコ', 'FCポルト vs マンチェスター・U', 'チェルシー vs ASモナコ', 'アーセナル vs FCポルト'],
    correct_answer: 'FCポルト vs ASモナコ',
    level: 3, genre: 'legends', emoji: '🏆',
    hint: 'モウリーニョのポルトが3-0で快勝。モナコは準決勝でチェルシーを下していた',
  },
  {
    question_text: '2009-10 CL優勝インテルを率いた監督は？',
    choices: ['ジョゼ・モウリーニョ', 'ロベルト・マンチーニ', 'ラファエル・ベニテス', 'マッシミリアーノ・アッレグリ'],
    correct_answer: 'ジョゼ・モウリーニョ',
    level: 3, genre: 'legends', emoji: '🇮🇹',
    hint: 'インテルでセリエA・コッパ・CLの3冠。翌年レアルへ移籍',
  },
  {
    question_text: '2014 CL決勝「デシマ」でラモスが同点ゴールを決めたのは何分？',
    choices: ['93分', '88分', '90分', '96分'],
    correct_answer: '93分',
    level: 3, genre: 'legends', emoji: '⚽',
    hint: 'アトレティコが優勝目前だった。コーナーキックからのヘッドで試合を延長へ',
  },
  {
    question_text: '2015-16 CL決勝（レアル vs アトレティコ）の延長後のスコアは？',
    choices: ['1-1', '2-1', '1-0', '0-0'],
    correct_answer: '1-1',
    level: 3, genre: 'legends', emoji: '🏆',
    hint: 'ラモスが15分に先制。カラスコが79分に同点。PK戦でレアルが制した',
  },
  {
    question_text: '2016-17 CL決勝でレアルがユベントスを下したスコアは？',
    choices: ['4-1', '3-1', '3-0', '2-1'],
    correct_answer: '4-1',
    level: 3, genre: 'legends', emoji: '⭐',
    hint: 'ロナウドが2得点。マンジュキッチの芸術的なオーバーヘッドも話題に',
  },
  {
    question_text: '「イスタンブールの奇跡」でリバプールの同点3点目（PKの跳ね返り）を決めたのは？',
    choices: ['シャビ・アロンソ', 'スティーブン・ジェラード', 'ウラジミール・シュマイケル', 'ディルク・カウト'],
    correct_answer: 'シャビ・アロンソ',
    level: 3, genre: 'legends', emoji: '🇪🇸',
    hint: 'PKは一度止められたが、跳ね返りを自ら押し込み3-3に',
  },
  {
    question_text: '2021-22 CL決勝でヴィニシウスJrのゴールをアシストしたのは？',
    choices: ['フェデリコ・バルベルデ', 'トニ・クロース', 'ルカ・モドリッチ', 'カルロス・カルバハル'],
    correct_answer: 'フェデリコ・バルベルデ',
    level: 3, genre: 'legends', emoji: '🇺🇾',
    hint: '右サイドをえぐってヴィニシウスJrに折り返した決定的なアシスト',
  },
  {
    question_text: '2022-23 CL決勝でマンCがインテルを下したスコアは？',
    choices: ['1-0', '2-0', '1-1（PK）', '2-1'],
    correct_answer: '1-0',
    level: 3, genre: 'legends', emoji: '🌟',
    hint: 'ロドリのゴールのみ。長年の悲願だったCL初制覇',
  },
  {
    question_text: 'CLで最多出場回数を誇る選手は？（2024時点）',
    choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'イケル・カシジャス', 'ジャビ・アロンソ'],
    correct_answer: 'クリスティアーノ・ロナウド',
    level: 3, genre: 'legends', emoji: '🇵🇹',
    hint: '複数クラブでCLに出場し続け、最多出場・最多得点の二冠',
  },
  {
    question_text: '2007-08 CL決勝の対戦カードは？',
    choices: ['マンチェスター・U vs チェルシー', 'マンチェスター・U vs バルセロナ', 'チェルシー vs リバプール', 'アーセナル vs チェルシー'],
    correct_answer: 'マンチェスター・U vs チェルシー',
    level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    hint: 'モスクワのプレミア対決。テリーのPK失敗でユナイテッドが優勝',
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

  let questions: QuizQuestion[];

  if (level === 1) {
    questions = pick(QUESTIONS_LV1, 10);
  } else if (level === 2) {
    questions = pick(QUESTIONS_LV2, 10);
  } else {
    questions = pick(QUESTIONS_LV3, 10);
  }

  // シャッフル
  questions = questions.sort(() => Math.random() - 0.5);

  return NextResponse.json(questions);
}

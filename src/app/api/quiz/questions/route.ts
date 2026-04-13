import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────
// 統一問題型
// ─────────────────────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
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
// LV.1 — 近年のスター選手と優勝クラブ（20問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV1: QuizQuestion[] = [
  { id: 'lv1_01', question_text: '2023-24シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['レアル・マドリード', 'マンチェスター・シティ', 'バイエルン・ミュンヘン', 'ボルシア・ドルトムント'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '🏆', hint: 'ウェンブリーでドルトムントを2-0で下し、15度目の優勝' },
  { id: 'lv1_02', question_text: '2022-23シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マンチェスター・シティ', 'インテル', 'レアル・マドリード', 'ナポリ'], correct_answer: 'マンチェスター・シティ', level: 1, genre: 'winners', emoji: '🌟', hint: 'グアルディオラ監督のもとリーグ・FA杯との3冠を達成' },
  { id: 'lv1_03', question_text: '2021-22シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['レアル・マドリード', 'リバプール', 'マンチェスター・シティ', 'チェルシー'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '⭐', hint: 'ヴィニシウスJrのゴールでリバプールを1-0で下した' },
  { id: 'lv1_04', question_text: '2020-21シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['チェルシー', 'マンチェスター・シティ', 'バイエルン・ミュンヘン', 'パリSG'], correct_answer: 'チェルシー', level: 1, genre: 'winners', emoji: '🏆', hint: 'ポルトでの決勝。ハヴェルツのゴールで1-0' },
  { id: 'lv1_05', question_text: '2019-20シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['バイエルン・ミュンヘン', 'パリSG', 'ライプツィヒ', 'アトレティコ・マドリード'], correct_answer: 'バイエルン・ミュンヘン', level: 1, genre: 'winners', emoji: '⭐', hint: 'リスボンでのバブル大会。PSGを1-0で下し無敗優勝' },
  { id: 'lv1_06', question_text: '2018-19シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['リバプール', 'トットナム', 'バルセロナ', 'アヤックス'], correct_answer: 'リバプール', level: 1, genre: 'winners', emoji: '🌟', hint: 'マドリードでの決勝。オリギの2ゴールでトットナムを2-0' },
  { id: 'lv1_07', question_text: 'チャンピオンズリーグ史上最多優勝クラブは？（2024時点）', choices: ['レアル・マドリード', 'ACミラン', 'リバプール', 'バルセロナ'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '👑', hint: '2024年時点で15度の欧州制覇を誇る' },
  { id: 'lv1_08', question_text: 'CLで最多通算ゴールを記録している選手は？（2024時点）', choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'ラウール', 'カリム・ベンゼマ'], correct_answer: 'クリスティアーノ・ロナウド', level: 1, genre: 'winners', emoji: '🇵🇹', hint: 'マンU・レアル・ユーベ・アル・ナスルで積み上げた記録' },
  { id: 'lv1_09', question_text: '2023-24 CL決勝でレアルの2得点を記録した2人は？', choices: ['カルバハルとヴィニシウスJr', 'ベリンガムとヴィニシウスJr', 'ロドリゴとカルバハル', 'ベリンガムとロドリゴ'], correct_answer: 'カルバハルとヴィニシウスJr', level: 1, genre: 'winners', emoji: '🎯', hint: '守備の要DFが先制し、エースFWがダメ押し' },
  { id: 'lv1_10', question_text: '2016-17シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['レアル・マドリード', 'ユベントス', 'モナコ', 'アトレティコ・マドリード'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '⭐', hint: 'カーディフでユベントスを4-1。CL初の連覇達成' },
  { id: 'lv1_11', question_text: '2015-16シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['レアル・マドリード', 'アトレティコ・マドリード', 'バイエルン', 'マンチェスター・C'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '🏆', hint: 'ミラノ決勝でシティダービーを制し、PK戦でも勝利' },
  { id: 'lv1_12', question_text: '2013-14シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['レアル・マドリード', 'アトレティコ・マドリード', 'バイエルン', 'ドルトムント'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '👑', hint: 'デシマ達成。ラモスの93分同点弾から逆転優勝' },
  { id: 'lv1_13', question_text: '2017-18シーズンのCL優勝クラブは？', choices: ['レアル・マドリード', 'リバプール', 'バイエルン', 'ユベントス'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '🏆', hint: '3年連続CL制覇。リバプールとの決勝でロナウドが2得点' },
  { id: 'lv1_14', question_text: '2011-12シーズンのリーガ・エスパニョーラで100ポイントを記録したクラブは？', choices: ['レアル・マドリード', 'バルセロナ', 'アトレティコ', 'バレンシア'], correct_answer: 'レアル・マドリード', level: 1, genre: 'winners', emoji: '🥇', hint: 'ロナウドが50ゴールを記録したシーズン。モウリーニョ体制' },
  { id: 'lv1_15', question_text: '2021-22シーズンのバロンドール受賞者は？', choices: ['カリム・ベンゼマ', 'クリスティアーノ・ロナウド', 'リオネル・メッシ', 'ルカ・モドリッチ'], correct_answer: 'カリム・ベンゼマ', level: 1, genre: 'winners', emoji: '🥇', hint: 'PSGのCL逆転劇のハットトリックが評価された' },
  { id: 'lv1_16', question_text: '2018年バロンドールを受賞した選手は？', choices: ['ルカ・モドリッチ', 'クリスティアーノ・ロナウド', 'リオネル・メッシ', 'アントワーヌ・グリーズマン'], correct_answer: 'ルカ・モドリッチ', level: 1, genre: 'winners', emoji: '🏅', hint: 'ロナウドとメッシの10年支配を終わらせたクロアチア人MF' },
  { id: 'lv1_17', question_text: 'ヴィニシウスJrの国籍は？', choices: ['ブラジル', 'スペイン', 'フランス', 'コロンビア'], correct_answer: 'ブラジル', level: 1, genre: 'winners', emoji: '🇧🇷', hint: 'レアル・マドリードの10番を背負う現代最高のドリブラーの一人' },
  { id: 'lv1_18', question_text: '2023年にレアル・マドリードに加入したイングランド代表MFは？', choices: ['ジュード・ベリンガム', 'デクラン・ライス', 'フィル・フォーデン', 'マーカス・ラッシュフォード'], correct_answer: 'ジュード・ベリンガム', level: 1, genre: 'winners', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'ドルトムントから加入した若き天才。初年度から大活躍' },
  { id: 'lv1_19', question_text: '2023-24 CLでレアル・マドリードが準決勝で下したクラブは？', choices: ['バイエルン・ミュンヘン', 'マンチェスター・シティ', 'パリSG', 'チェルシー'], correct_answer: 'バイエルン・ミュンヘン', level: 1, genre: 'winners', emoji: '⚽', hint: 'ベルナベウで逆転。アディショナルタイムのゴールで勝利' },
  { id: 'lv1_20', question_text: 'レアル・マドリードの愛称「ロス・ブランコス」の意味は？', choices: ['白い軍団', '銀河系クラブ', '王者たち', '白い矢'], correct_answer: '白い軍団', level: 1, genre: 'winners', emoji: '⚪', hint: '白いユニフォームから名付けられた伝統ある愛称' },
];

// ─────────────────────────────────────────────────────────────────
// LV.2 — 伝説の逆転劇や有名な得点シーン（20問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV2: QuizQuestion[] = [
  { id: 'lv2_01', question_text: '「イスタンブールの奇跡」(2005 CL決勝)ハーフタイムのスコアは？', choices: ['ミラン 3-0 リバプール', 'ミラン 2-0 リバプール', 'ミラン 4-0 リバプール', 'ミラン 1-0 リバプール'], correct_answer: 'ミラン 3-0 リバプール', level: 2, genre: 'legends', emoji: '🔥', hint: '後半6分間に3点を奪い追いつき、PK戦で優勝した奇跡' },
  { id: 'lv2_02', question_text: '2005 CL決勝PK戦で決定的なセーブを連発したリバプールのGKは？', choices: ['ジェルジ・デュデク', 'ジェームズ・リーチ', 'クリス・カービン', 'イケル・カシジャス'], correct_answer: 'ジェルジ・デュデク', level: 2, genre: 'legends', emoji: '🧤', hint: 'シェフチェンコのシュートを奇跡的に止めたポーランド人GK' },
  { id: 'lv2_03', question_text: '2001-02 CL決勝でジダンが決めた伝説のボレーゴールの相手クラブは？', choices: ['バイエル・レバークーゼン', 'バイエルン・ミュンヘン', 'ユベントス', 'バレンシア'], correct_answer: 'バイエル・レバークーゼン', level: 2, genre: 'legends', emoji: '🇫🇷', hint: 'グラスゴーのハンプデン・パーク。ロベルト・カルロスのクロスを左足で合わせた' },
  { id: 'lv2_04', question_text: '2019 CLSFでアヤックスに逆転、90+6分の決勝弾を決めたトットナムの選手は？', choices: ['ルーカス・モウラ', 'ハリー・ケイン', 'ソン・フンミン', 'デレ・アリ'], correct_answer: 'ルーカス・モウラ', level: 2, genre: 'legends', emoji: '🇧🇷', hint: 'この試合3点目のゴールはほぼ同時にゴールラインを割った' },
  { id: 'lv2_05', question_text: '2019 CLSFでリバプールがバルサを4-0逆転。コーナーの「奇策」ゴールを演出したのは？', choices: ['トレント・アレクサンダー=アーノルド', 'ジョルジニオ・ワイナルドゥム', 'アンドリュー・ロバートソン', 'ジョーダン・ヘンダーソン'], correct_answer: 'トレント・アレクサンダー=アーノルド', level: 2, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'バルサ守備陣がぼんやりしている隙を突いた速攻CK' },
  { id: 'lv2_06', question_text: '2021-22 CL R16でベンゼマがPSGに対してハットトリックを達成した試合は？', choices: ['第2戦（ホーム・ベルナベウ）', '第1戦（アウェイ・パリ）', '第1戦（ホーム）', '第2戦（アウェイ）'], correct_answer: '第2戦（ホーム・ベルナベウ）', level: 2, genre: 'legends', emoji: '🇫🇷', hint: 'ベルナベウで0-1から逆転。3点はすべて後半に生まれた' },
  { id: 'lv2_07', question_text: '2012 CL決勝でバイエルンを本拠地ミュンヘンでPK戦の末に下したクラブは？', choices: ['チェルシー', 'レアル・マドリード', 'バルセロナ', 'マンチェスター・U'], correct_answer: 'チェルシー', level: 2, genre: 'legends', emoji: '🔵', hint: 'ドログバが延長後半に同点ゴール。PK戦でチェフが躍動' },
  { id: 'lv2_08', question_text: '2003-04 CL優勝の立役者FCポルトの監督は誰？', choices: ['ジョゼ・モウリーニョ', 'カルロ・アンチェロッティ', 'ルイス・ファン・ハール', 'ルイス・フェリペ・スコラリ'], correct_answer: 'ジョゼ・モウリーニョ', level: 2, genre: 'legends', emoji: '🏆', hint: 'この優勝でチェルシー監督へ。後に「スペシャル・ワン」を名乗る' },
  { id: 'lv2_09', question_text: '2011 CL決勝でバルサがマンUを3-1で下した。先制ゴールを決めたのは？', choices: ['ペドロ', 'リオネル・メッシ', 'ダビド・ビジャ', 'セスク・ファブレガス'], correct_answer: 'ペドロ', level: 2, genre: 'legends', emoji: '🇪🇸', hint: '27分にルーニーに追いつかれるも、後半メッシとビジャが追加点' },
  { id: 'lv2_10', question_text: '2009 CL決勝でバルセロナがマンチェスター・Uを下したスコアは？', choices: ['2-0', '1-0', '3-1', '2-1'], correct_answer: '2-0', level: 2, genre: 'legends', emoji: '🇪🇸', hint: 'エトーとメッシが得点。グアルディオラ就任1年目での欧州制覇' },
  { id: 'lv2_11', question_text: '2006-07 CL決勝でACミランがリバプールを下したスコアは？', choices: ['2-1', '1-0', '3-1', '2-0'], correct_answer: '2-1', level: 2, genre: 'legends', emoji: '🇮🇹', hint: '「イスタンブールの奇跡」の2年後。ミランがリベンジを果たした' },
  { id: 'lv2_12', question_text: '2014-15 CL決勝でユベントスを3-1で下したバルセロナの3点目を決めたのは？', choices: ['ネイマール', 'リオネル・メッシ', 'ルイス・スアレス', 'セルヒオ・ブスケッツ'], correct_answer: 'ネイマール', level: 2, genre: 'legends', emoji: '🇧🇷', hint: '最後はゴールを空にして猛攻するユーベに対し、無人のゴールへ流し込んだ' },
  { id: 'lv2_13', question_text: '1999年「トレブル達成」のマンチェスター・Uが決勝でバイエルンを逆転した時間は？', choices: ['90+1分と90+3分', '88分と90分', '85分と89分', '90+4分と90+6分'], correct_answer: '90+1分と90+3分', level: 2, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'シェリンガムとソルスキアが奇跡の逆転弾。ファーガソン最高の瞬間' },
  { id: 'lv2_14', question_text: '2004-05 CLでチェルシーを準決勝で敗退させ、決勝に進出したリバプールのゴールを決めたのは？', choices: ['ルイス・ガルシア', 'スティーブン・ジェラード', 'ウラジミール・シュマイケル', 'ミラン・バロシュ'], correct_answer: 'ルイス・ガルシア', level: 2, genre: 'legends', emoji: '⚽', hint: '「幽霊ゴール」と呼ばれたゴールライン上の物議を醸したシュート' },
  { id: 'lv2_15', question_text: '1994年CLでACミランがバルセロナを4-0で粉砕した決勝で、2ゴールを決めたのは？', choices: ['ダニエレ・マッサーロ', 'ロベルト・バッジョ', 'マルコ・ファン・バステン', 'サビチェビッチ'], correct_answer: 'ダニエレ・マッサーロ', level: 2, genre: 'legends', emoji: '🇮🇹', hint: 'サビチェビッチとデサイーも得点。バルサのドリームチームを圧倒' },
  { id: 'lv2_16', question_text: '2005-06 CLでアーセナルをSFで破り、その後優勝したクラブは？', choices: ['バルセロナ', 'ユベントス', 'ACミラン', 'リバプール'], correct_answer: 'バルセロナ', level: 2, genre: 'legends', emoji: '🔵🔴', hint: 'ラーション がスーパーサブとして決勝でも活躍。ロナウジーニョ全盛期' },
  { id: 'lv2_17', question_text: '1986年CL（欧州チャンピオンズカップ）決勝でPKを外し、敗退の原因となった選手は？', choices: ['ロマーリオ', 'マルク・ファン・バステン', 'ルート・フリット', 'ゲルト・ミュラー'], correct_answer: 'ロマーリオ', level: 2, genre: 'legends', emoji: '🏆', hint: 'ロナウドやロナウジーニョを擁するブラジル代表でもPKを外したことで知られる' },
  { id: 'lv2_18', question_text: '2022-23 CL準決勝でレアル・マドリードを破ったクラブは？', choices: ['マンチェスター・シティ', 'バイエルン', 'チェルシー', 'インテル'], correct_answer: 'マンチェスター・シティ', level: 2, genre: 'legends', emoji: '🔵', hint: '前年リベンジ成功。ベルナベウでの2試合合計スコアで上回った' },
  { id: 'lv2_19', question_text: '2013-14 CLでロナウドがゴールを決め、ベルナベウで涙を流した有名な場面の試合は？', choices: ['アトレティコ戦（準決勝）', 'バイエルン戦（準々決勝）', 'シャルケ戦（R16）', 'ユーベ戦（準々決勝）'], correct_answer: 'アトレティコ戦（準決勝）', level: 2, genre: 'legends', emoji: '😭', hint: 'ゴール後にロナウドが号泣。その後「デシマ」達成で感情が爆発した' },
  { id: 'lv2_20', question_text: 'レアル・マドリードがCLを3連覇した年は？', choices: ['2016・2017・2018年', '2014・2015・2016年', '2017・2018・2019年', '2015・2016・2017年'], correct_answer: '2016・2017・2018年', level: 2, genre: 'legends', emoji: '🏆🏆🏆', hint: 'ジダン監督のもと達成した史上初のCL3連覇' },
];

// ─────────────────────────────────────────────────────────────────
// LV.3 — 詳細な記録・スタッツ・歴史的データ（20問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV3: QuizQuestion[] = [
  { id: 'lv3_01', question_text: 'CL1シーズン最多ゴール記録は？（2024時点）', choices: ['17ゴール（ロナウド, 2013-14）', '15ゴール（レワンドフスキ, 2019-20）', '14ゴール（メッシ, 2011-12）', '12ゴール（ファン・ニステルローイ, 2002-03）'], correct_answer: '17ゴール（ロナウド, 2013-14）', level: 3, genre: 'legends', emoji: '🇵🇹', hint: 'レアル・マドリードでの圧倒的な1シーズン' },
  { id: 'lv3_02', question_text: '2000-01 CL決勝の対戦カードは？', choices: ['バイエルン・ミュンヘン vs バレンシア', 'レアル・マドリード vs バレンシア', 'バルセロナ vs バレンシア', 'バイエルン vs バルセロナ'], correct_answer: 'バイエルン・ミュンヘン vs バレンシア', level: 3, genre: 'legends', emoji: '🏆', hint: 'バイエルンがPK戦でバレンシアを下し優勝。オリバー・カーン伝説の試合' },
  { id: 'lv3_03', question_text: '2003-04 CL決勝の対戦カードは？', choices: ['FCポルト vs ASモナコ', 'FCポルト vs マンチェスター・U', 'チェルシー vs ASモナコ', 'アーセナル vs FCポルト'], correct_answer: 'FCポルト vs ASモナコ', level: 3, genre: 'legends', emoji: '🏆', hint: 'モウリーニョのポルトが3-0で快勝。モナコは準決勝でチェルシーを下していた' },
  { id: 'lv3_04', question_text: '2009-10 CL優勝インテルを率いた監督は？', choices: ['ジョゼ・モウリーニョ', 'ロベルト・マンチーニ', 'ラファエル・ベニテス', 'マッシミリアーノ・アッレグリ'], correct_answer: 'ジョゼ・モウリーニョ', level: 3, genre: 'legends', emoji: '🇮🇹', hint: 'インテルでセリエA・コッパ・CLの3冠。翌年レアルへ移籍' },
  { id: 'lv3_05', question_text: '2014 CL決勝「デシマ」でラモスが同点ゴールを決めたのは何分？', choices: ['93分', '88分', '90分', '96分'], correct_answer: '93分', level: 3, genre: 'legends', emoji: '⚽', hint: 'アトレティコが優勝目前だった。コーナーキックからのヘッドで試合を延長へ' },
  { id: 'lv3_06', question_text: '2015-16 CL決勝（レアル vs アトレティコ）の延長後のスコアは？', choices: ['1-1', '2-1', '1-0', '0-0'], correct_answer: '1-1', level: 3, genre: 'legends', emoji: '🏆', hint: 'ラモスが15分に先制。カラスコが79分に同点。PK戦でレアルが制した' },
  { id: 'lv3_07', question_text: '2016-17 CL決勝でレアルがユベントスを下したスコアは？', choices: ['4-1', '3-1', '3-0', '2-1'], correct_answer: '4-1', level: 3, genre: 'legends', emoji: '⭐', hint: 'ロナウドが2得点。マンジュキッチの芸術的なオーバーヘッドも話題に' },
  { id: 'lv3_08', question_text: '「イスタンブールの奇跡」でリバプールの同点3点目（PKの跳ね返り）を決めたのは？', choices: ['シャビ・アロンソ', 'スティーブン・ジェラード', 'ウラジミール・シュマイケル', 'ディルク・カウト'], correct_answer: 'シャビ・アロンソ', level: 3, genre: 'legends', emoji: '🇪🇸', hint: 'PKは一度止められたが、跳ね返りを自ら押し込み3-3に' },
  { id: 'lv3_09', question_text: '2021-22 CL決勝でヴィニシウスJrのゴールをアシストしたのは？', choices: ['フェデリコ・バルベルデ', 'トニ・クロース', 'ルカ・モドリッチ', 'カルロス・カルバハル'], correct_answer: 'フェデリコ・バルベルデ', level: 3, genre: 'legends', emoji: '🇺🇾', hint: '右サイドをえぐってヴィニシウスJrに折り返した決定的なアシスト' },
  { id: 'lv3_10', question_text: '2022-23 CL決勝でマンCがインテルを下したスコアは？', choices: ['1-0', '2-0', '1-1（PK）', '2-1'], correct_answer: '1-0', level: 3, genre: 'legends', emoji: '🌟', hint: 'ロドリのゴールのみ。長年の悲願だったCL初制覇' },
  { id: 'lv3_11', question_text: 'CLで最多出場回数を誇る選手は？（2024時点）', choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'イケル・カシジャス', 'シャビ・アロンソ'], correct_answer: 'クリスティアーノ・ロナウド', level: 3, genre: 'legends', emoji: '🇵🇹', hint: '複数クラブでCLに出場し続け、最多出場・最多得点の二冠' },
  { id: 'lv3_12', question_text: '2007-08 CL決勝の対戦カードは？', choices: ['マンチェスター・U vs チェルシー', 'マンチェスター・U vs バルセロナ', 'チェルシー vs リバプール', 'アーセナル vs チェルシー'], correct_answer: 'マンチェスター・U vs チェルシー', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'モスクワのプレミア対決。テリーのPK失敗でユナイテッドが優勝' },
  { id: 'lv3_13', question_text: '1992年のCLで初代「チャンピオンズリーグ」優勝クラブは？', choices: ['バルセロナ', 'サンプドリア', 'ACミラン', 'マルセイユ'], correct_answer: 'バルセロナ', level: 3, genre: 'legends', emoji: '🔵🔴', hint: 'クライフのドリームチーム。コッパーがロングシュートを決めた' },
  { id: 'lv3_14', question_text: 'CL史上、クラブが記録した1試合最多ゴールは？', choices: ['8-0（リバプール vs ベシクタシュ, 2007）', '7-0（マンC vs シャルケ, 2019）', '8-0（バルサ vs バイエル, 2022）', '9-0（マンU vs ロテルダム, 1998）'], correct_answer: '8-0（リバプール vs ベシクタシュ, 2007）', level: 3, genre: 'legends', emoji: '⚽', hint: '8ゴールは長年の記録。スコラーリ体制のリバプールが達成' },
  { id: 'lv3_15', question_text: 'ジネディーヌ・ジダンがレアル・マドリードの監督として最初にCLを制したシーズンは？', choices: ['2015-16', '2016-17', '2017-18', '2014-15'], correct_answer: '2015-16', level: 3, genre: 'legends', emoji: '🇫🇷', hint: '監督就任1年目にして欧州制覇。アトレティコとのシティダービー' },
  { id: 'lv3_16', question_text: 'レアル・マドリードが2021-22 CLのSFで逆転した相手と、決勝的ゴールを決めた選手は？', choices: ['マンCとロドリゴ', 'バイエルンとベンゼマ', 'PSGとベンゼマ', 'チェルシーとヴィニシウス'], correct_answer: 'マンCとロドリゴ', level: 3, genre: 'legends', emoji: '🇧🇷', hint: '89分・90分のロドリゴ連続弾で奇跡の逆転。ベルナベウが爆発した' },
  { id: 'lv3_17', question_text: '1960年CL決勝でレアル・マドリードがアイントラハト・フランクフルトを下したスコアは？', choices: ['7-3', '6-2', '5-1', '8-4'], correct_answer: '7-3', level: 3, genre: 'legends', emoji: '🏛️', hint: 'ハンプデン・パークに13万人。ディ・ステファノ3点、プスカス4点の超名勝負' },
  { id: 'lv3_18', question_text: 'レアル・マドリードのCL最多得点選手ランキング1位は？（クラブ別単独記録）', choices: ['クリスティアーノ・ロナウド', 'ラウール・ゴンサレス', 'カリム・ベンゼマ', 'アルフレード・ディ・ステファノ'], correct_answer: 'クリスティアーノ・ロナウド', level: 3, genre: 'legends', emoji: '🇵🇹', hint: 'マドリード在籍9年間でCL通算105ゴールという驚異の記録' },
  { id: 'lv3_19', question_text: '2022-23シーズン、CL得点王（ピチーチ・欧州）を獲得した選手は？', choices: ['エルリング・ハーランド', 'キリアン・ムバッペ', 'ヴィニシウスJr', 'カリム・ベンゼマ'], correct_answer: 'エルリング・ハーランド', level: 3, genre: 'legends', emoji: '🇳🇴', hint: 'CL初年度でシーズン12ゴールという驚異的な記録を樹立' },
  { id: 'lv3_20', question_text: '2000年代にレアル・マドリードでCLとリーガを同シーズン制覇したのは何年？', choices: ['2001-02', '2002-03', '2003-04', '2004-05'], correct_answer: '2001-02', level: 3, genre: 'legends', emoji: '🏆', hint: 'ジダン加入翌年。ジダンのボレーゴールが決まったCL制覇のシーズン' },
];

// ─────────────────────────────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────────────────────────────
function pick<T extends { id: string }>(arr: T[], n: number, exclude: string[]): T[] {
  const pool = arr.filter(q => !exclude.includes(q.id));
  // プールが足りない場合はリセット（全問見た後に再挑戦）
  const source = pool.length >= n ? pool : arr;
  return [...source].sort(() => Math.random() - 0.5).slice(0, n);
}

// ─────────────────────────────────────────────────────────────────
// GET handler  (?level=1|2|3&exclude=id1,id2,...)
// ─────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const levelParam = req.nextUrl.searchParams.get('level');
  const excludeParam = req.nextUrl.searchParams.get('exclude') ?? '';
  const level = (levelParam === '2' ? 2 : levelParam === '3' ? 3 : 1) as 1 | 2 | 3;
  const exclude = excludeParam ? excludeParam.split(',').filter(Boolean) : [];

  const pool = level === 1 ? QUESTIONS_LV1 : level === 2 ? QUESTIONS_LV2 : QUESTIONS_LV3;
  const questions = pick(pool, 10, exclude).sort(() => Math.random() - 0.5);

  return NextResponse.json(questions);
}

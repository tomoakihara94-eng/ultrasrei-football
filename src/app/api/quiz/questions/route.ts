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
  { id: 'lv1_01', question_text: '2023-24シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マドリー', 'マンチェスター・シティ', 'バイエルン・ミュンヘン', 'ボルシア・ドルトムント'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '🏆', hint: 'ウェンブリーでドルトムントを2-0で下し、15度目の優勝' },
  { id: 'lv1_02', question_text: '2022-23シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マンチェスター・シティ', 'インテル', 'マドリー', 'ナポリ'], correct_answer: 'マンチェスター・シティ', level: 1, genre: 'winners', emoji: '🌟', hint: 'グアルディオラ監督のもとリーグ・FA杯との3冠を達成' },
  { id: 'lv1_03', question_text: '2021-22シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マドリー', 'リバプール', 'マンチェスター・シティ', 'チェルシー'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '⭐', hint: 'ヴィニシウスJrのゴールでリバプールを1-0で下した' },
  { id: 'lv1_04', question_text: '2020-21シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['チェルシー', 'マンチェスター・シティ', 'バイエルン・ミュンヘン', 'パリSG'], correct_answer: 'チェルシー', level: 1, genre: 'winners', emoji: '🏆', hint: 'ポルトでの決勝。ハヴェルツのゴールで1-0' },
  { id: 'lv1_05', question_text: '2019-20シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['バイエルン・ミュンヘン', 'パリSG', 'ライプツィヒ', 'アトレティコ・マドリード'], correct_answer: 'バイエルン・ミュンヘン', level: 1, genre: 'winners', emoji: '⭐', hint: 'リスボンでのバブル大会。PSGを1-0で下し無敗優勝' },
  { id: 'lv1_06', question_text: '2018-19シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['リバプール', 'トットナム', 'バルセロナ', 'アヤックス'], correct_answer: 'リバプール', level: 1, genre: 'winners', emoji: '🌟', hint: 'マドリードでの決勝。オリギの2ゴールでトットナムを2-0' },
  { id: 'lv1_09', question_text: '2023-24 CL決勝でマドリーの2得点を記録した2人は？', choices: ['カルバハルとヴィニシウスJr', 'ベリンガムとヴィニシウスJr', 'ロドリゴとカルバハル', 'ベリンガムとロドリゴ'], correct_answer: 'カルバハルとヴィニシウスJr', level: 1, genre: 'winners', emoji: '🎯', hint: '守備の要DFが先制し、エースFWがダメ押し' },
  { id: 'lv1_10', question_text: '2016-17シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マドリー', 'ユベントス', 'モナコ', 'アトレティコ・マドリード'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '⭐', hint: 'カーディフでユベントスを4-1。CL初の連覇達成' },
  { id: 'lv1_11', question_text: '2015-16シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マドリー', 'アトレティコ・マドリード', 'バイエルン', 'マンチェスター・C'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '🏆', hint: 'ミラノ決勝でシティダービーを制し、PK戦でも勝利' },
  { id: 'lv1_12', question_text: '2013-14シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マドリー', 'アトレティコ・マドリード', 'バイエルン', 'ドルトムント'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '👑', hint: 'デシマ達成。ラモスの93分同点弾から逆転優勝' },
  { id: 'lv1_13', question_text: '2017-18シーズンのCL優勝クラブは？', choices: ['マドリー', 'リバプール', 'バイエルン', 'ユベントス'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '🏆', hint: '3年連続CL制覇。リバプールとの決勝でロナウドが2得点' },
  { id: 'lv1_14', question_text: '2011-12シーズンのリーガ・エスパニョーラで100ポイントを記録したクラブは？', choices: ['マドリー', 'バルセロナ', 'アトレティコ', 'バレンシア'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '🥇', hint: 'ロナウドが50ゴールを記録したシーズン。モウリーニョ体制' },
  { id: 'lv1_15', question_text: '2021-22シーズンのバロンドール受賞者は？', choices: ['カリム・ベンゼマ', 'クリスティアーノ・ロナウド', 'リオネル・メッシ', 'ルカ・モドリッチ'], correct_answer: 'カリム・ベンゼマ', level: 1, genre: 'winners', emoji: '🥇', hint: 'PSGのCL逆転劇のハットトリックが評価された' },
  { id: 'lv1_16', question_text: '2018年バロンドールを受賞した選手は？', choices: ['ルカ・モドリッチ', 'クリスティアーノ・ロナウド', 'リオネル・メッシ', 'アントワーヌ・グリーズマン'], correct_answer: 'ルカ・モドリッチ', level: 1, genre: 'winners', emoji: '🏅', hint: 'ロナウドとメッシの10年支配を終わらせたクロアチア人MF' },
  { id: 'lv1_17', question_text: 'ヴィニシウスJrの国籍は？', choices: ['ブラジル', 'スペイン', 'フランス', 'コロンビア'], correct_answer: 'ブラジル', level: 1, genre: 'winners', emoji: '🇧🇷', hint: 'マドリーの10番を背負う現代最高のドリブラーの一人' },
  { id: 'lv1_18', question_text: '2023年にマドリーに加入したイングランド代表MFは？', choices: ['ジュード・ベリンガム', 'デクラン・ライス', 'フィル・フォーデン', 'マーカス・ラッシュフォード'], correct_answer: 'ジュード・ベリンガム', level: 1, genre: 'winners', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'ドルトムントから加入した若き天才。初年度から大活躍' },
  { id: 'lv1_19', question_text: '2023-24 CLでマドリーが準決勝で下したクラブは？', choices: ['バイエルン・ミュンヘン', 'マンチェスター・シティ', 'パリSG', 'チェルシー'], correct_answer: 'バイエルン・ミュンヘン', level: 1, genre: 'winners', emoji: '⚽', hint: 'ベルナベウで逆転。アディショナルタイムのゴールで勝利' },
  { id: 'lv1_20', question_text: 'マドリーの愛称「ロス・ブランコス」の意味は？', choices: ['白い軍団', '銀河系クラブ', '王者たち', '白い矢'], correct_answer: '白い軍団', level: 1, genre: 'winners', emoji: '⚪', hint: '白いユニフォームから名付けられた伝統ある愛称' },
  { id: 'lv1_21', question_text: '2014-15シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['バルセロナ', 'ユベントス', 'バイエルン', 'PSG'], correct_answer: 'バルセロナ', level: 1, genre: 'winners', emoji: '🇪🇸', hint: 'メッシ・スアレス・ネイマールのMSNトリオがユベントスを3-1で下した' },
  { id: 'lv1_22', question_text: '2012-13シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['バイエルン・ミュンヘン', 'ドルトムント', 'マドリー', 'バルセロナ'], correct_answer: 'バイエルン・ミュンヘン', level: 1, genre: 'winners', emoji: '🇩🇪', hint: 'ウェンブリーでのオール・ドイツ決勝を制した' },
  { id: 'lv1_23', question_text: '2010-11シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['バルセロナ', 'マンチェスター・U', 'マドリー', 'チェルシー'], correct_answer: 'バルセロナ', level: 1, genre: 'winners', emoji: '🇪🇸', hint: 'ウェンブリーでマンチェスター・Uを3-1で撃破' },
  { id: 'lv1_24', question_text: '2009-10シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['インテル', 'バイエルン', 'リヨン', 'マンチェスター・U'], correct_answer: 'インテル', level: 1, genre: 'winners', emoji: '🇮🇹', hint: 'モウリーニョ率いる史上6クラブ目の三冠達成' },
  { id: 'lv1_25', question_text: '2008-09シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['バルセロナ', 'マンチェスター・U', 'チェルシー', 'アーセナル'], correct_answer: 'バルセロナ', level: 1, genre: 'winners', emoji: '🇪🇸', hint: 'ローマでマンチェスター・Uを2-0。グアルディオラ監督1年目' },
  { id: 'lv1_26', question_text: '2007-08シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マンチェスター・U', 'チェルシー', 'リバプール', 'アーセナル'], correct_answer: 'マンチェスター・U', level: 1, genre: 'winners', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'モスクワでのオール・イングランド決勝をPK戦で制した' },
  { id: 'lv1_27', question_text: '2006-07シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['ACミラン', 'リバプール', 'マンチェスター・U', 'チェルシー'], correct_answer: 'ACミラン', level: 1, genre: 'winners', emoji: '🇮🇹', hint: 'アテネでリバプールを2-1で下しリベンジを果たした' },
  { id: 'lv1_28', question_text: '2004-05シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['リバプール', 'ACミラン', 'チェルシー', 'PSV'], correct_answer: 'リバプール', level: 1, genre: 'winners', emoji: '🔴', hint: '「イスタンブールの奇跡」で3点差から逆転しPK戦で優勝' },
  { id: 'lv1_29', question_text: '2003-04シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['FCポルト', 'モナコ', 'デポルティボ', 'チェルシー'], correct_answer: 'FCポルト', level: 1, genre: 'winners', emoji: '🇵🇹', hint: 'モウリーニョ率いるポルトガル勢が下馬評を覆して優勝' },
  { id: 'lv1_30', question_text: '2002-03シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['ACミラン', 'ユベントス', 'レアル・ソシエダ', 'アーセナル'], correct_answer: 'ACミラン', level: 1, genre: 'winners', emoji: '🇮🇹', hint: 'オールイタリアン決勝をPK戦で制した' },
  { id: 'lv1_31', question_text: '2001-02シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['マドリー', 'バイヤー・レバークーゼン', 'マンチェスター・U', 'バルセロナ'], correct_answer: 'マドリー', level: 1, genre: 'winners', emoji: '👑', hint: 'ジダンの伝説的ボレーで9度目の欧州制覇' },
  { id: 'lv1_32', question_text: '2000-01シーズンのチャンピオンズリーグ優勝クラブは？', choices: ['バイエルン・ミュンヘン', 'バレンシア', 'リバプール', 'マドリー'], correct_answer: 'バイエルン・ミュンヘン', level: 1, genre: 'winners', emoji: '🇩🇪', hint: 'PK戦の末バレンシアを下した。オリバー・カーン伝説の一戦' },
  { id: 'lv1_33', question_text: '2023年のバロンドール受賞者は？', choices: ['リオネル・メッシ', 'アーリング・ハーランド', 'キリアン・エムバペ', 'ジュード・ベリンガム'], correct_answer: 'リオネル・メッシ', level: 1, genre: 'winners', emoji: '🇦🇷', hint: 'カタールW杯優勝の勢いを受け、通算8度目の受賞' },
  { id: 'lv1_34', question_text: '2016年のバロンドール受賞者は？', choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'アントワーヌ・グリーズマン', 'ルカ・モドリッチ'], correct_answer: 'クリスティアーノ・ロナウド', level: 1, genre: 'winners', emoji: '🇵🇹', hint: 'マドリーでのCL連覇とユーロ制覇が評価された' },
  { id: 'lv1_35', question_text: '2024年にパリ・サンジェルマンからマドリーへ完全移籍したフランス代表FWは？', choices: ['キリアン・エムバペ', 'アントワーヌ・グリーズマン', 'ウスマン・デンベレ', 'マルクス・トゥラム'], correct_answer: 'キリアン・エムバペ', level: 1, genre: 'winners', emoji: '🇫🇷', hint: '長年噂されていた移籍が満を持して完全移籍金ゼロで実現' },
  { id: 'lv1_36', question_text: 'ジネディーヌ・ジダンがマドリーの監督に就任したのは何年？', choices: ['2016年', '2015年', '2017年', '2018年'], correct_answer: '2016年', level: 1, genre: 'winners', emoji: '🇫🇷', hint: '就任からわずか数ヶ月でCL制覇という離れ業を成し遂げた' },
  { id: 'lv1_37', question_text: 'ヴィニシウスJrがマドリーで背負う背番号は？', choices: ['7', '11', '20', '9'], correct_answer: '7', level: 1, genre: 'winners', emoji: '🇧🇷', hint: 'ロナウドやラウールも背負った伝統の番号' },
];

// ─────────────────────────────────────────────────────────────────
// LV.2 — 伝説の逆転劇や有名な得点シーン（20問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV2: QuizQuestion[] = [
  { id: 'lv2_01', question_text: '「イスタンブールの奇跡」(2005 CL決勝)ハーフタイムのスコアは？', choices: ['ミラン 3-0 リバプール', 'ミラン 2-0 リバプール', 'ミラン 4-0 リバプール', 'ミラン 1-0 リバプール'], correct_answer: 'ミラン 3-0 リバプール', level: 2, genre: 'legends', emoji: '🔥', hint: '後半6分間に3点を奪い追いつき、PK戦で優勝した奇跡' },
  { id: 'lv2_02', question_text: '2005 CL決勝PK戦で決定的なセーブを連発したリバプールのGKは？', choices: ['ジェルジ・デュデク', 'ジェームズ・リーチ', 'クリス・カービン', 'イケル・カシジャス'], correct_answer: 'ジェルジ・デュデク', level: 2, genre: 'legends', emoji: '🧤', hint: 'シェフチェンコのシュートを奇跡的に止めたポーランド人GK' },
  { id: 'lv2_03', question_text: '2001-02 CL決勝でジダンが決めた伝説のボレーゴールの相手クラブは？', choices: ['バイエル・レバークーゼン', 'バイエルン・ミュンヘン', 'ユベントス', 'バレンシア'], correct_answer: 'バイエル・レバークーゼン', level: 2, genre: 'legends', emoji: '🇫🇷', hint: 'グラスゴーのハンプデン・パーク。ロベルト・カルロスのクロスを左足で合わせた' },
  { id: 'lv2_04', question_text: '2019 CL準決勝でアヤックスに逆転、90+6分の決勝弾を決めたトットナムの選手は？', choices: ['ルーカス・モウラ', 'ハリー・ケイン', 'ソン・フンミン', 'デレ・アリ'], correct_answer: 'ルーカス・モウラ', level: 2, genre: 'legends', emoji: '🇧🇷', hint: 'この試合3点目のゴールはほぼ同時にゴールラインを割った' },
  { id: 'lv2_05', question_text: '2019 CL準決勝でリバプールがバルサを4-0逆転。コーナーの「奇策」ゴールを演出したのは？', choices: ['トレント・アレクサンダー=アーノルド', 'ジョルジニオ・ワイナルドゥム', 'アンドリュー・ロバートソン', 'ジョーダン・ヘンダーソン'], correct_answer: 'トレント・アレクサンダー=アーノルド', level: 2, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'バルサ守備陣がぼんやりしている隙を突いた速攻CK' },
  { id: 'lv2_06', question_text: '2021-22 CL R16でベンゼマがPSGに対してハットトリックを達成した試合は？', choices: ['第2戦（ホーム・ベルナベウ）', '第1戦（アウェイ・パリ）', '第1戦（ホーム）', '第2戦（アウェイ）'], correct_answer: '第2戦（ホーム・ベルナベウ）', level: 2, genre: 'legends', emoji: '🇫🇷', hint: 'ベルナベウで0-1から逆転。3点はすべて後半に生まれた' },
  { id: 'lv2_07', question_text: '2012 CL決勝でバイエルンを本拠地ミュンヘンでPK戦の末に下したクラブは？', choices: ['チェルシー', 'マドリー', 'バルセロナ', 'マンチェスター・U'], correct_answer: 'チェルシー', level: 2, genre: 'legends', emoji: '🔵', hint: 'ドログバが延長後半に同点ゴール。PK戦でチェフが躍動' },
  { id: 'lv2_08', question_text: '2003-04 CL優勝の立役者FCポルトの監督は誰？', choices: ['ジョゼ・モウリーニョ', 'カルロ・アンチェロッティ', 'ルイス・ファン・ハール', 'ルイス・フェリペ・スコラリ'], correct_answer: 'ジョゼ・モウリーニョ', level: 2, genre: 'legends', emoji: '🏆', hint: 'この優勝でチェルシー監督へ。後に「スペシャル・ワン」を名乗る' },
  { id: 'lv2_09', question_text: '2011 CL決勝でバルサがマンUを3-1で下した。先制ゴールを決めたのは？', choices: ['ペドロ', 'リオネル・メッシ', 'ダビド・ビジャ', 'セスク・ファブレガス'], correct_answer: 'ペドロ', level: 2, genre: 'legends', emoji: '🇪🇸', hint: '27分にルーニーに追いつかれるも、後半メッシとビジャが追加点' },
  { id: 'lv2_10', question_text: '2009 CL決勝でバルセロナがマンチェスター・Uを下したスコアは？', choices: ['2-0', '1-0', '3-1', '2-1'], correct_answer: '2-0', level: 2, genre: 'legends', emoji: '🇪🇸', hint: 'エトーとメッシが得点。グアルディオラ就任1年目での欧州制覇' },
  { id: 'lv2_11', question_text: '2006-07 CL決勝でACミランがリバプールを下したスコアは？', choices: ['2-1', '1-0', '3-1', '2-0'], correct_answer: '2-1', level: 2, genre: 'legends', emoji: '🇮🇹', hint: '「イスタンブールの奇跡」の2年後。ミランがリベンジを果たした' },
  { id: 'lv2_12', question_text: '2014-15 CL決勝でユベントスを3-1で下したバルセロナの3点目を決めたのは？', choices: ['ネイマール', 'リオネル・メッシ', 'ルイス・スアレス', 'セルヒオ・ブスケッツ'], correct_answer: 'ネイマール', level: 2, genre: 'legends', emoji: '🇧🇷', hint: '最後はゴールを空にして猛攻するユーベに対し、無人のゴールへ流し込んだ' },
  { id: 'lv2_14', question_text: '2004-05 CLでチェルシーを準決勝で敗退させ、決勝に進出したリバプールのゴールを決めたのは？', choices: ['ルイス・ガルシア', 'スティーブン・ジェラード', 'ウラジミール・シュマイケル', 'ミラン・バロシュ'], correct_answer: 'ルイス・ガルシア', level: 2, genre: 'legends', emoji: '⚽', hint: '「幽霊ゴール」と呼ばれたゴールライン上の物議を醸したシュート' },
  { id: 'lv2_16', question_text: '2005-06 CLでアーセナルを準決勝で破り、その後優勝したクラブは？', choices: ['バルセロナ', 'ユベントス', 'ACミラン', 'リバプール'], correct_answer: 'バルセロナ', level: 2, genre: 'legends', emoji: '🔵🔴', hint: 'ラーション がスーパーサブとして決勝でも活躍。ロナウジーニョ全盛期' },
  { id: 'lv2_18', question_text: '2022-23 CL準決勝でマドリーを破ったクラブは？', choices: ['マンチェスター・シティ', 'バイエルン', 'チェルシー', 'インテル'], correct_answer: 'マンチェスター・シティ', level: 2, genre: 'legends', emoji: '🔵', hint: '前年リベンジ成功。ベルナベウでの2試合合計スコアで上回った' },
  { id: 'lv2_19', question_text: '2013-14 CLでロナウドがゴールを決め、ベルナベウで涙を流した有名な場面の試合は？', choices: ['アトレティコ戦（準決勝）', 'バイエルン戦（準々決勝）', 'シャルケ戦（R16）', 'ユーベ戦（準々決勝）'], correct_answer: 'アトレティコ戦（準決勝）', level: 2, genre: 'legends', emoji: '😭', hint: 'ゴール後にロナウドが号泣。その後「デシマ」達成で感情が爆発した' },
  { id: 'lv2_20', question_text: 'マドリーがCLを3連覇した年は？', choices: ['2016・2017・2018年', '2014・2015・2016年', '2017・2018・2019年', '2015・2016・2017年'], correct_answer: '2016・2017・2018年', level: 2, genre: 'legends', emoji: '🏆🏆🏆', hint: 'ジダン監督のもと達成した史上初のCL3連覇' },
  { id: 'lv2_21', question_text: '2019-20 CL準々決勝でバルセロナが中立地(リスボン)で8-2という歴史的大敗を喫した相手は？', choices: ['バイエルン・ミュンヘン', 'マンチェスター・シティ', 'ユベントス', 'パリ・サンジェルマン'], correct_answer: 'バイエルン・ミュンヘン', level: 2, genre: 'legends', emoji: '🇩🇪', hint: 'コロナ禍のミニトーナメント方式。バルサ史上最悪の敗戦の一つ' },
  { id: 'lv2_22', question_text: '2017-18 CL準々決勝、トリノでロナウドが決めた伝説のオーバーヘッドキックに相手サポーターまで拍手を送った対戦クラブは？', choices: ['ユベントス', 'バイエルン', 'ローマ', 'PSG'], correct_answer: 'ユベントス', level: 2, genre: 'legends', emoji: '🚲', hint: 'この活躍が翌年のロナウドのユベントス移籍の伏線になったとも言われる' },
  { id: 'lv2_23', question_text: '「レモンタダ」と呼ばれる2016-17 R16、バルセロナが1stレグ0-4の劣勢から2ndレグ6-1で大逆転した相手は？', choices: ['パリ・サンジェルマン', 'バイエルン', 'ユベントス', 'アーセナル'], correct_answer: 'パリ・サンジェルマン', level: 2, genre: 'legends', emoji: '🔵🔴', hint: 'ロベルト・セスペデスの決勝点はアディショナルタイム95分過ぎに生まれた' },
  { id: 'lv2_24', question_text: '「イスタンブールの奇跡」でトロフィーを掲げたリバプールの当時のキャプテンは？', choices: ['スティーブン・ジェラード', 'ジェイミー・キャラガー', 'サミ・ヒピア', 'ジョン・アーン・リーセ'], correct_answer: 'スティーブン・ジェラード', level: 2, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'ハーフタイムでチームを鼓舞した司令塔自身が1点目を決めた' },
  { id: 'lv2_25', question_text: '2013-14 CL決勝「デシマ」、延長でPKを決めてマドリーの4点目を記録したのは？', choices: ['クリスティアーノ・ロナウド', 'ガレス・ベイル', 'マルセロ', 'アンヘル・ディ・マリア'], correct_answer: 'クリスティアーノ・ロナウド', level: 2, genre: 'legends', emoji: '🇵🇹', hint: '試合終了間際にPKを冷静に決め、涙のセレブレーションを見せた' },
  { id: 'lv2_26', question_text: 'クリスティアーノ・ロナウドが2018年にマドリーから移籍したクラブは？', choices: ['ユベントス', 'マンチェスター・U', 'パリ・サンジェルマン', 'アル・ナスル'], correct_answer: 'ユベントス', level: 2, genre: 'legends', emoji: '🇮🇹', hint: '9年間で通算450得点以上を記録した後の電撃移籍だった' },
  { id: 'lv2_27', question_text: '2019-20 CL決勝(リスボン)でバイエルンの決勝点を決めた、かつてPSG下部組織出身の選手は？', choices: ['キングスレー・コマン', 'トーマス・ミュラー', 'ロベルト・レヴァンドフスキ', 'セルジュ・ニャブリ'], correct_answer: 'キングスレー・コマン', level: 2, genre: 'legends', emoji: '🇫🇷', hint: '古巣PSG相手に決勝点を決める皮肉な結末となった' },
  { id: 'lv2_28', question_text: '2022-23 CL決勝で敗れたインテルを率いていた監督は？', choices: ['シモーネ・インザーギ', 'アントニオ・コンテ', 'ステファノ・ピオリ', 'マッシミリアーノ・アッレグリ'], correct_answer: 'シモーネ・インザーギ', level: 2, genre: 'legends', emoji: '🇮🇹', hint: 'ロドリの決勝点によりマンチェスター・シティに惜敗した' },
  { id: 'lv2_29', question_text: '2021-22 CL決勝(パリ)でマドリーのMOTM(最優秀選手)に選ばれたのは？', choices: ['チボ・クルトワ', 'ヴィニシウスJr', 'カリム・ベンゼマ', 'フェデリコ・バルベルデ'], correct_answer: 'チボ・クルトワ', level: 2, genre: 'legends', emoji: '🧤', hint: 'リバプールの猛攻を再三のスーパーセーブで無失点に抑えた' },
  { id: 'lv2_30', question_text: '2011-12 CL準決勝、チェルシーがバルセロナ相手にアウェイで決めた値千金のゴールを決めたのは？', choices: ['フェルナンド・トーレス', 'ディディエ・ドログバ', 'ラミレス', 'フアン・マタ'], correct_answer: 'フェルナンド・トーレス', level: 2, genre: 'legends', emoji: '🇪🇸', hint: '10人になりながらもカンプ・ノウで守り切り決勝進出を決めた' },
  { id: 'lv2_31', question_text: '2007-08 CL決勝PK戦、アネルカの最後のシュートを止めてマンチェスター・Uの優勝を決めたGKは？', choices: ['エドウィン・ファンデルサール', 'ペトル・チェフ', 'ジャンルイジ・ブッフォン', 'ジョー・ハート'], correct_answer: 'エドウィン・ファンデルサール', level: 2, genre: 'legends', emoji: '🧤', hint: '直前にジョン・テリーが滑って決定的なPKを外していた' },
  { id: 'lv2_32', question_text: '2009-10シーズン、モウリーニョ率いるインテルが準決勝でカンプ・ノウにて死守し、決勝進出を決めた相手は？', choices: ['バルセロナ', 'アーセナル', 'バイエルン', 'リヨン'], correct_answer: 'バルセロナ', level: 2, genre: 'legends', emoji: '🇮🇹', hint: '後半に一人退場になりながらも1-1で耐えきり三冠達成への道を開いた' },
  { id: 'lv2_33', question_text: '2019-20 CL準決勝でPSGが3-0で下し、当時のクラブ史上初の決勝進出を決めた相手は？', choices: ['RBライプツィヒ', 'アタランタ', 'アトレティコ・マドリード', 'ライプツィヒ'], correct_answer: 'RBライプツィヒ', level: 2, genre: 'legends', emoji: '🇫🇷', hint: 'ムバッペとディ・マリアの活躍でPSG初のCL決勝進出が実現した' },
  { id: 'lv2_34', question_text: '2017-18 CL決勝(キーウ)でGKロリスカリウスの痛恨のミスにより敗れたリバプールの相手は？', choices: ['マドリー', 'バイエルン', 'ローマ', 'ユベントス'], correct_answer: 'マドリー', level: 2, genre: 'legends', emoji: '🧤', hint: 'ベイルの伝説的オーバーヘッドと合わせ語り継がれる一戦' },
];

// ─────────────────────────────────────────────────────────────────
// LV.3 — 詳細な記録・スタッツ・歴史的データ（20問）
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_LV3: QuizQuestion[] = [
  { id: 'lv3_02', question_text: '2000-01 CL決勝の対戦カードは？', choices: ['バイエルン・ミュンヘン vs バレンシア', 'マドリー vs バレンシア', 'バルセロナ vs バレンシア', 'バイエルン vs バルセロナ'], correct_answer: 'バイエルン・ミュンヘン vs バレンシア', level: 3, genre: 'legends', emoji: '🏆', hint: 'バイエルンがPK戦でバレンシアを下し優勝。オリバー・カーン伝説の試合' },
  { id: 'lv3_03', question_text: '2003-04 CL決勝の対戦カードは？', choices: ['FCポルト vs ASモナコ', 'FCポルト vs マンチェスター・U', 'チェルシー vs ASモナコ', 'アーセナル vs FCポルト'], correct_answer: 'FCポルト vs ASモナコ', level: 3, genre: 'legends', emoji: '🏆', hint: 'モウリーニョのポルトが3-0で快勝。モナコは準決勝でチェルシーを下していた' },
  { id: 'lv3_04', question_text: '2009-10 CL優勝インテルを率いた監督は？', choices: ['ジョゼ・モウリーニョ', 'ロベルト・マンチーニ', 'ラファエル・ベニテス', 'マッシミリアーノ・アッレグリ'], correct_answer: 'ジョゼ・モウリーニョ', level: 3, genre: 'legends', emoji: '🇮🇹', hint: 'インテルでセリエA・コッパ・CLの3冠。翌年マドリーへ移籍' },
  { id: 'lv3_05', question_text: '2014 CL決勝「デシマ」でラモスが同点ゴールを決めたのは何分？', choices: ['93分', '88分', '90分', '96分'], correct_answer: '93分', level: 3, genre: 'legends', emoji: '⚽', hint: 'アトレティコが優勝目前だった。コーナーキックからのヘッドで試合を延長へ' },
  { id: 'lv3_06', question_text: '2015-16 CL決勝（マドリー vs アトレティコ）の延長後のスコアは？', choices: ['1-1', '2-1', '1-0', '0-0'], correct_answer: '1-1', level: 3, genre: 'legends', emoji: '🏆', hint: 'ラモスが15分に先制。カラスコが79分に同点。PK戦でマドリーが制した' },
  { id: 'lv3_07', question_text: '2016-17 CL決勝でマドリーがユベントスを下したスコアは？', choices: ['4-1', '3-1', '3-0', '2-1'], correct_answer: '4-1', level: 3, genre: 'legends', emoji: '⭐', hint: 'ロナウドが2得点。マンジュキッチの芸術的なオーバーヘッドも話題に' },
  { id: 'lv3_08', question_text: '「イスタンブールの奇跡」でリバプールの同点3点目（PKの跳ね返り）を決めたのは？', choices: ['シャビ・アロンソ', 'スティーブン・ジェラード', 'ウラジミール・シュマイケル', 'ディルク・カウト'], correct_answer: 'シャビ・アロンソ', level: 3, genre: 'legends', emoji: '🇪🇸', hint: 'PKは一度止められたが、跳ね返りを自ら押し込み3-3に' },
  { id: 'lv3_09', question_text: '2021-22 CL決勝でヴィニシウスJrのゴールをアシストしたのは？', choices: ['フェデリコ・バルベルデ', 'トニ・クロース', 'ルカ・モドリッチ', 'カルロス・カルバハル'], correct_answer: 'フェデリコ・バルベルデ', level: 3, genre: 'legends', emoji: '🇺🇾', hint: '右サイドをえぐってヴィニシウスJrに折り返した決定的なアシスト' },
  { id: 'lv3_10', question_text: '2022-23 CL決勝でマンCがインテルを下したスコアは？', choices: ['1-0', '2-0', '1-1（PK）', '2-1'], correct_answer: '1-0', level: 3, genre: 'legends', emoji: '🌟', hint: 'ロドリのゴールのみ。長年の悲願だったCL初制覇' },
  { id: 'lv3_12', question_text: '2007-08 CL決勝の対戦カードは？', choices: ['マンチェスター・U vs チェルシー', 'マンチェスター・U vs バルセロナ', 'チェルシー vs リバプール', 'アーセナル vs チェルシー'], correct_answer: 'マンチェスター・U vs チェルシー', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'モスクワのプレミア対決。テリーのPK失敗でユナイテッドが優勝' },
  { id: 'lv3_14', question_text: 'CL史上、クラブが記録した1試合最多ゴールは？', choices: ['8-0（リバプール vs ベシクタシュ, 2007）', '7-0（マンC vs シャルケ, 2019）', '8-0（バルサ vs バイエル, 2022）', '8-0（マドリー vs マルメ, 2015）'], correct_answer: '8-0（リバプール vs ベシクタシュ, 2007）', level: 3, genre: 'legends', emoji: '⚽', hint: '8ゴールは長年の記録。スコラーリ体制のリバプールが達成' },
  { id: 'lv3_15', question_text: 'ジネディーヌ・ジダンがマドリーの監督として最初にCLを制したシーズンは？', choices: ['2015-16', '2016-17', '2017-18', '2014-15'], correct_answer: '2015-16', level: 3, genre: 'legends', emoji: '🇫🇷', hint: '監督就任1年目にして欧州制覇。アトレティコとのシティダービー' },
  { id: 'lv3_16', question_text: 'マドリーが2021-22 CLの準決勝で逆転した相手と、決勝的ゴールを決めた選手は？', choices: ['マンCとロドリゴ', 'バイエルンとベンゼマ', 'PSGとベンゼマ', 'チェルシーとヴィニシウス'], correct_answer: 'マンCとロドリゴ', level: 3, genre: 'legends', emoji: '🇧🇷', hint: '89分・90分のロドリゴ連続弾で奇跡の逆転。ベルナベウが爆発した' },
  { id: 'lv3_18', question_text: 'マドリーのCL最多得点選手ランキング1位は？（クラブ別単独記録）', choices: ['クリスティアーノ・ロナウド', 'ラウール・ゴンサレス', 'カリム・ベンゼマ', 'アルフレード・ディ・ステファノ'], correct_answer: 'クリスティアーノ・ロナウド', level: 3, genre: 'legends', emoji: '🇵🇹', hint: 'マドリード在籍9年間でCL通算105ゴールという驚異の記録' },
  { id: 'lv3_19', question_text: '2022-23シーズン、CL得点王（ピチーチ・欧州）を獲得した選手は？', choices: ['エルリング・ハーランド', 'キリアン・ムバッペ', 'ヴィニシウスJr', 'カリム・ベンゼマ'], correct_answer: 'エルリング・ハーランド', level: 3, genre: 'legends', emoji: '🇳🇴', hint: 'CL初年度でシーズン12ゴールという驚異的な記録を樹立' },
  { id: 'lv3_20', question_text: 'マドリーがCLとリーガを同シーズンに制覇（二冠達成）したのは何年？', choices: ['2016-17', '2001-02', '2011-12', '2014-15'], correct_answer: '2016-17', level: 3, genre: 'legends', emoji: '🏆', hint: 'ジダン監督のもと、CL連覇の最中に果たした国内リーグとの二冠' },
  { id: 'lv3_21', question_text: 'CL通算最多アシスト記録を持つ選手は？', choices: ['リオネル・メッシ', 'クリスティアーノ・ロナウド', 'アンヘル・ディ・マリア', 'トニ・クロース'], correct_answer: 'リオネル・メッシ', level: 3, genre: 'legends', emoji: '🇦🇷', hint: 'ゴール数だけでなくアシスト数でも歴代トップを誇る' },
  { id: 'lv3_22', question_text: 'サンティアゴ・ベルナベウの大規模改修が完了したのは何年？', choices: ['2024年', '2022年', '2023年', '2025年'], correct_answer: '2024年', level: 3, genre: 'legends', emoji: '🏟️', hint: '開閉式屋根と360度スクリーンを備えた近未来的スタジアムに生まれ変わった' },
  { id: 'lv3_23', question_text: '2021-22 CL準々決勝、チェルシー戦(ベルナベウ)で途中出場から2ゴールを挙げ大逆転劇の起点となったのは？', choices: ['ロドリゴ', 'エデン・アザール', 'マルコ・アセンシオ', 'イスコ'], correct_answer: 'ロドリゴ', level: 3, genre: 'legends', emoji: '🇧🇷', hint: '2点ビハインドから終盤に連続ゴール。ベンゼマの延長弾で締めくくった' },
  { id: 'lv3_24', question_text: '2021-22 CL準決勝(マンチェスター・シティ戦)第2レグ、延長でPKを決めてマドリーを決勝へ導いたのは？', choices: ['カリム・ベンゼマ', 'ヴィニシウスJr', 'ルカ・モドリッチ', 'フェデリコ・バルベルデ'], correct_answer: 'カリム・ベンゼマ', level: 3, genre: 'legends', emoji: '🇫🇷', hint: 'ロドリゴの終盤2連発で追いついた直後の延長劇的弾' },
  { id: 'lv3_25', question_text: 'カリム・ベンゼマが2022年バロンドールを受賞する決め手となったのはどのシーズンの活躍？', choices: ['2021-22シーズン', '2020-21シーズン', '2022-23シーズン', '2019-20シーズン'], correct_answer: '2021-22シーズン', level: 3, genre: 'legends', emoji: '🥇', hint: 'CL制覇とラ・リーガ得点王を含む圧倒的な数字が評価された' },
  { id: 'lv3_26', question_text: 'CL通算優勝回数が最多の監督は？', choices: ['カルロ・アンチェロッティ', 'ジョゼ・モウリーニョ', 'ペップ・グアルディオラ', 'ジネディーヌ・ジダン'], correct_answer: 'カルロ・アンチェロッティ', level: 3, genre: 'legends', emoji: '🇮🇹', hint: 'ACミランで2度、マドリーで複数回の欧州制覇を成し遂げた' },
  { id: 'lv3_27', question_text: '改修後のサンティアゴ・ベルナベウの収容人数は約何人？', choices: ['約8万5000人', '約7万人', '約9万5000人', '約6万人'], correct_answer: '約8万5000人', level: 3, genre: 'legends', emoji: '🏟️', hint: '欧州でも屈指の規模を誇る近代的スタジアムとなった' },
  { id: 'lv3_28', question_text: '2017-18 CL決勝、ガレス・ベイルが後半途中出場から決めた伝説的なオーバーヘッドキックの相手クラブは？', choices: ['リバプール', 'バイエルン', 'ローマ', 'ユベントス'], correct_answer: 'リバプール', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'キーウでの一戦。もう1点はロリスカリウスのミスから生まれた' },
  { id: 'lv3_29', question_text: 'クリスティアーノ・ロナウドが2009年にマドリーへ移籍した際の移籍金は約いくらだった？', choices: ['約9400万ユーロ', '約6000万ユーロ', '約1億2000万ユーロ', '約7500万ユーロ'], correct_answer: '約9400万ユーロ', level: 3, genre: 'legends', emoji: '💰', hint: '当時の世界最高移籍金としてマンチェスター・Uから加入した' },
  { id: 'lv3_30', question_text: '2017年、ネイマールがパリ・サンジェルマンへ移籍した際の史上最高移籍金は？', choices: ['2億2200万ユーロ', '1億8000万ユーロ', '2億5000万ユーロ', '1億5000万ユーロ'], correct_answer: '2億2200万ユーロ', level: 3, genre: 'legends', emoji: '💰', hint: 'バルセロナの違約金条項をそのまま支払う異例の移籍となった' },
  { id: 'lv3_31', question_text: '2018年、モナコからパリ・サンジェルマンへ完全移籍したキリアン・エムバペの移籍金は約いくらだった？', choices: ['約1億8000万ユーロ', '約1億ユーロ', '約2億ユーロ', '約1億3000万ユーロ'], correct_answer: '約1億8000万ユーロ', level: 3, genre: 'legends', emoji: '💰', hint: '当時弱冠19歳にして史上屈指の高額移籍を実現させた' },
  { id: 'lv3_32', question_text: '2022年、マドリーが自由契約(移籍金なし)でチェルシーから獲得したフランス代表DFは？', choices: ['アントニオ・リュディガー', 'クルザワ', 'ラファエル・バラン', 'マルコス・アロンソ'], correct_answer: 'アントニオ・リュディガー', level: 3, genre: 'legends', emoji: '🇩🇪', hint: 'CL決勝でチェルシーを相手にプレーした経験も持つセンターバック' },
  { id: 'lv3_33', question_text: 'マドリーでジュード・ベリンガムが着用する背番号は？', choices: ['5', '8', '10', '22'], correct_answer: '5', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'ドルトムント時代の22番から変更し加入初年度から大活躍' },
  { id: 'lv3_34', question_text: '2013年、当時世界最高額でマドリーへ移籍したウェールズ代表FWは？', choices: ['ガレス・ベイル', 'アーロン・ラムジー', 'ジョー・アレン', 'デイビッド・ブルックス'], correct_answer: 'ガレス・ベイル', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', hint: 'トッテナムから加入し、デシマ達成の決勝弾など数々の名場面を演出した' },
  { id: 'lv3_35', question_text: '2000年のバロンドール受賞者は？', choices: ['ルイス・フィーゴ', 'ジネディーヌ・ジダン', 'リヴァウド', 'ラウール・ゴンサレス'], correct_answer: 'ルイス・フィーゴ', level: 3, genre: 'legends', emoji: '🇵🇹', hint: 'バルセロナからマドリーへの電撃移籍を果たした年に受賞した' },
  { id: 'lv3_36', question_text: '2006年のバロンドール受賞者は？', choices: ['ファビオ・カンナヴァーロ', 'ジネディーヌ・ジダン', 'ロナウジーニョ', 'チアゴ・シウバ'], correct_answer: 'ファビオ・カンナヴァーロ', level: 3, genre: 'legends', emoji: '🇮🇹', hint: 'マドリー在籍中、イタリア代表としてW杯優勝を果たした年に受賞' },
  { id: 'lv3_37', question_text: '2008年のバロンドール受賞者は？', choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'ケイロシュ', 'フェルナンド・トーレス'], correct_answer: 'クリスティアーノ・ロナウド', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'マンチェスター・U在籍時に初受賞。マドリー移籍前年のことだった' },
  { id: 'lv3_38', question_text: '2009年のバロンドール受賞者は？', choices: ['リオネル・メッシ', 'クリスティアーノ・ロナウド', 'シャビ・エルナンデス', 'サミュエル・エトー'], correct_answer: 'リオネル・メッシ', level: 3, genre: 'legends', emoji: '🇦🇷', hint: '初受賞。バルセロナが6冠を達成した年でもあった' },
  { id: 'lv3_39', question_text: '2013年のバロンドール受賞者は？', choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'フランク・リベリー', 'ズラタン・イブラヒモビッチ'], correct_answer: 'クリスティアーノ・ロナウド', level: 3, genre: 'legends', emoji: '🇵🇹', hint: 'メッシの4年連続受賞を止めた年' },
  { id: 'lv3_40', question_text: '2017年のバロンドール受賞者は？', choices: ['クリスティアーノ・ロナウド', 'リオネル・メッシ', 'ネイマール', 'ルカ・モドリッチ'], correct_answer: 'クリスティアーノ・ロナウド', level: 3, genre: 'legends', emoji: '🏆', hint: 'CL連覇とリーガ制覇の活躍が評価された' },
  { id: 'lv3_41', question_text: '2019年のバロンドール受賞者は？', choices: ['リオネル・メッシ', 'クリスティアーノ・ロナウド', 'ヴァージル・ファン・ダイク', 'サディオ・マネ'], correct_answer: 'リオネル・メッシ', level: 3, genre: 'legends', emoji: '🇦🇷', hint: '通算6度目の受賞となった' },
  { id: 'lv3_42', question_text: '2021年のバロンドール受賞者は？', choices: ['リオネル・メッシ', 'ロベルト・レヴァンドフスキ', 'ジョルジーニョ', 'カリム・ベンゼマ'], correct_answer: 'リオネル・メッシ', level: 3, genre: 'legends', emoji: '🇦🇷', hint: 'コパ・アメリカ制覇の実績も評価され通算7度目の受賞' },
  { id: 'lv3_43', question_text: '2000年、バルセロナから当時世界最高額でマドリーへ移籍した選手は？', choices: ['ルイス・フィーゴ', 'ロナウジーニョ', 'パトリック・クライファート', 'マルク・オベルマルス'], correct_answer: 'ルイス・フィーゴ', level: 3, genre: 'legends', emoji: '💰', hint: '永遠のライバルからの移籍は当時大きな衝撃を与えた' },
  { id: 'lv3_44', question_text: '2001年、ユベントスから当時世界最高額でマドリーへ移籍したフランス代表MFは？', choices: ['ジネディーヌ・ジダン', 'パベル・ネドヴェド', 'エドガー・ダービッツ', 'フィリッポ・インザーギ'], correct_answer: 'ジネディーヌ・ジダン', level: 3, genre: 'legends', emoji: '🇫🇷', hint: '移籍翌年に伝説のボレーシュートでCL制覇に貢献した' },
  { id: 'lv3_45', question_text: '2002年、インテルからマドリーへ移籍したブラジル代表FW(愛称「現象」)は？', choices: ['ロナウド', 'アドリアーノ', 'ロナウジーニョ', 'カフー'], correct_answer: 'ロナウド', level: 3, genre: 'legends', emoji: '🇧🇷', hint: 'その年のW杯得点王としての勢いそのままにマドリーへ加入した' },
  { id: 'lv3_46', question_text: '2003年、マンチェスター・Uからマドリーへ移籍したイングランド代表MFは？', choices: ['デイビッド・ベッカム', 'ライアン・ギグス', 'ポール・スコールズ', 'マイケル・キャリック'], correct_answer: 'デイビッド・ベッカム', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: '「銀河系軍団」の象徴的存在としてマドリーに加わった' },
  { id: 'lv3_47', question_text: '2004年、リヴァプールからマドリーへ移籍したイングランド代表FWは？', choices: ['マイケル・オーウェン', 'スティーブン・ジェラード', 'ロビー・ファウラー', 'エミール・ヘスキー'], correct_answer: 'マイケル・オーウェン', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: '在籍わずか1年でニューカッスルへ移籍することになった' },
  { id: 'lv3_48', question_text: '2007年、フルミネンセからマドリーへ移籍したブラジル代表SBは？', choices: ['マルセロ', 'ダニエウ・アウヴェス', 'ロベルト・カルロス', 'マイコン'], correct_answer: 'マルセロ', level: 3, genre: 'legends', emoji: '🇧🇷', hint: '以後10年以上にわたりマドリーの左サイドを守り続けた' },
  { id: 'lv3_49', question_text: '2009年、ACミランから移籍し、ロナウド加入直前まで史上最高額移籍金保持者だった選手は？', choices: ['カカ', 'アンドレア・ピルロ', 'クラレンス・セードルフ', 'アレッサンドロ・ネスタ'], correct_answer: 'カカ', level: 3, genre: 'legends', emoji: '🇧🇷', hint: 'この数週間後にロナウドの移籍で記録がすぐに更新された' },
  { id: 'lv3_50', question_text: '2012年、トッテナムからマドリーへ移籍したクロアチア代表MFは？', choices: ['ルカ・モドリッチ', 'イヴァン・ラキティッチ', 'マテオ・コバチッチ', 'マリオ・マンジュキッチ'], correct_answer: 'ルカ・モドリッチ', level: 3, genre: 'legends', emoji: '🇭🇷', hint: '後にバロンドールも受賞するマドリーの司令塔となった' },
  { id: 'lv3_51', question_text: '2014年、バイエルンからマドリーへ移籍したドイツ代表MFは？', choices: ['トニ・クロース', 'バスティアン・シュヴァインシュタイガー', 'マリオ・ゲッツェ', 'サミ・ケディラ'], correct_answer: 'トニ・クロース', level: 3, genre: 'legends', emoji: '🇩🇪', hint: 'W杯優勝直後の移籍で、以後マドリー中盤の柱となった' },
  { id: 'lv3_52', question_text: '2014年、ASモナコから移籍し、同年のW杯得点王でもあったコロンビア代表MFは？', choices: ['ハメス・ロドリゲス', 'ラダメル・ファルカオ', 'フアン・クアドラード', 'カルロス・バッカ'], correct_answer: 'ハメス・ロドリゲス', level: 3, genre: 'legends', emoji: '🇨🇴', hint: '移籍発表会見でのフリーキック披露も話題になった' },
  { id: 'lv3_53', question_text: '2019年、チェルシーからマドリーへ移籍したベルギー代表FWは？', choices: ['エデン・アザール', 'ケビン・デ・ブライネ', 'ロメル・ルカク', 'ドリース・メルテンス'], correct_answer: 'エデン・アザール', level: 3, genre: 'legends', emoji: '🇧🇪', hint: '長年の噂の末に実現した移籍だったが、怪我に悩まされた' },
  { id: 'lv3_54', question_text: 'マドリーが2000年と2002年にCLを制した際の監督は？', choices: ['ビセンテ・デル・ボスケ', 'ジョン・トシャック', 'ファビオ・カペッロ', 'ホルヘ・バルダーノ'], correct_answer: 'ビセンテ・デル・ボスケ', level: 3, genre: 'legends', emoji: '🇪🇸', hint: '後にスペイン代表を率いてW杯優勝も果たす名将' },
  { id: 'lv3_55', question_text: 'ジネディーヌ・ジダンの後任として2018年にマドリー監督に就任した人物は？', choices: ['フリオ・ロペテギ', 'サンティアゴ・ソラーリ', 'ラファエル・ベニテス', 'マウリシオ・ポチェッティーノ'], correct_answer: 'フリオ・ロペテギ', level: 3, genre: 'legends', emoji: '🇪🇸', hint: '就任からわずか数ヶ月でシーズン途中に解任された' },
  { id: 'lv3_56', question_text: 'ジダンが2度目の監督復帰をする直前、2018-19シーズン途中からマドリーを率いていたのは？', choices: ['サンティアゴ・ソラーリ', 'フリオ・ロペテギ', 'ギジェルモ・アモール', 'ミチェル・サルガド'], correct_answer: 'サンティアゴ・ソラーリ', level: 3, genre: 'legends', emoji: '🇦🇷', hint: '暫定監督から正式監督に昇格したが、シーズン終盤に解任された' },
  { id: 'lv3_57', question_text: 'ジョゼ・モウリーニョがマドリー監督を務めたのはどの期間？', choices: ['2010年〜2013年', '2009年〜2012年', '2011年〜2014年', '2010年〜2012年'], correct_answer: '2010年〜2013年', level: 3, genre: 'legends', emoji: '🇵🇹', hint: 'インテルでの三冠達成直後にマドリーへ就任した' },
  { id: 'lv3_58', question_text: 'カルロ・アンチェロッティが1度目の監督在任中に「デシマ」を達成したのはどのシーズン？', choices: ['2013-14シーズン', '2012-13シーズン', '2014-15シーズン', '2015-16シーズン'], correct_answer: '2013-14シーズン', level: 3, genre: 'legends', emoji: '🇮🇹', hint: '就任1年目にして悲願の10度目の欧州制覇を成し遂げた' },
  { id: 'lv3_59', question_text: 'ラファエル・ベニテスがマドリー監督に就任したのは何年？', choices: ['2015年', '2014年', '2016年', '2017年'], correct_answer: '2015年', level: 3, genre: 'legends', emoji: '🇪🇸', hint: '就任した同シーズンの1月に解任され、後任はジダンだった' },
  { id: 'lv3_60', question_text: '2006-07シーズン、マドリーをリーガ優勝に導いた監督は？', choices: ['ファビオ・カペッロ', 'ベルント・シュスター', 'ホアキン・カパロス', 'マヌエル・ペジェグリーニ'], correct_answer: 'ファビオ・カペッロ', level: 3, genre: 'legends', emoji: '🇮🇹', hint: '守備的な戦術批判もありながら結果でタイトルを掴んだ' },
  { id: 'lv3_61', question_text: '2007-08シーズン、マドリーのリーガ連覇を達成した監督は？', choices: ['ベルント・シュスター', 'ファビオ・カペッロ', 'フアンデ・ラモス', 'クレメンテ'], correct_answer: 'ベルント・シュスター', level: 3, genre: 'legends', emoji: '🇩🇪', hint: 'ドイツ人指揮官のもとカペッロ体制からの連覇を果たした' },
  { id: 'lv3_62', question_text: 'モウリーニョの後任として2013年にマドリー監督に就任したのは？', choices: ['カルロ・アンチェロッティ', 'マヌエル・ペジェグリーニ', 'ラファエル・ベニテス', 'ジネディーヌ・ジダン'], correct_answer: 'カルロ・アンチェロッティ', level: 3, genre: 'legends', emoji: '🇮🇹', hint: '就任1年目でいきなり「デシマ」を達成する' },
  { id: 'lv3_63', question_text: '2018-19 CL決勝の対戦カードは？', choices: ['リバプール vs トットナム', 'マンチェスター・C vs トットナム', 'リバプール vs チェルシー', 'マンチェスター・U vs リバプール'], correct_answer: 'リバプール vs トットナム', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'マドリードでのオール・イングランド決勝となった' },
  { id: 'lv3_64', question_text: '2018-19 CL決勝のスコアは？', choices: ['2-0（リバプールの勝利）', '1-0（リバプールの勝利）', '3-1（リバプールの勝利）', '2-1（リバプールの勝利）'], correct_answer: '2-0（リバプールの勝利）', level: 3, genre: 'legends', emoji: '🔴', hint: '開始2分のPKと終盤のオリギのゴールで勝利した' },
  { id: 'lv3_65', question_text: '2018-19 CL決勝、開始わずか2分にPKで先制点を決めたのは？', choices: ['モハメド・サラー', 'サディオ・マネ', 'ロベルト・フィルミーノ', 'ディボック・オリギ'], correct_answer: 'モハメド・サラー', level: 3, genre: 'legends', emoji: '🇪🇬', hint: 'CL決勝史上最速クラスの得点となった' },
  { id: 'lv3_66', question_text: '2018-19 CL決勝でリバプールの2点目を決めたのは？', choices: ['ディボック・オリギ', 'ジョルジニオ・ワイナルドゥム', 'アンドリュー・ロバートソン', 'ジェームズ・ミルナー'], correct_answer: 'ディボック・オリギ', level: 3, genre: 'legends', emoji: '🇧🇪', hint: '試合終了間際のダメ押しゴールだった' },
  { id: 'lv3_67', question_text: '2005-06 CL決勝でバルセロナがアーセナルを下したスコアは？', choices: ['2-1', '1-0', '3-1', '2-0'], correct_answer: '2-1', level: 3, genre: 'legends', emoji: '🔵🔴', hint: 'アーセナルは前半にGKレーマンが退場する苦しい展開だった' },
  { id: 'lv3_68', question_text: '2005-06 CL決勝でバルセロナの決勝点を決めたのは？', choices: ['ジュリアーノ・ベレッチ', 'サミュエル・エトー', 'ロナウジーニョ', 'デコ'], correct_answer: 'ジュリアーノ・ベレッチ', level: 3, genre: 'legends', emoji: '🇧🇷', hint: 'サイドバックの選手による貴重な決勝ゴールだった' },
  { id: 'lv3_69', question_text: '2009-10 CL決勝でインテルが2-0で下した相手は？', choices: ['バイエルン・ミュンヘン', 'バルセロナ', 'リヨン', 'アーセナル'], correct_answer: 'バイエルン・ミュンヘン', level: 3, genre: 'legends', emoji: '🇮🇹', hint: 'モウリーニョのインテルが三冠達成を果たした一戦' },
  { id: 'lv3_70', question_text: '2009-10 CL決勝で2ゴールを記録し勝利の立役者となったインテルのFWは？', choices: ['ディエゴ・ミリト', 'サミュエル・エトー', 'ウェスレイ・スナイデル', 'ゴラン・パンデフ'], correct_answer: 'ディエゴ・ミリト', level: 3, genre: 'legends', emoji: '🇦🇷', hint: 'アルゼンチン代表FWが決勝の両ゴールを独占した' },
  { id: 'lv3_71', question_text: '2016-17 CL準決勝、マドリーがアトレティコを下した際の2試合合計スコアは？', choices: ['4-2', '3-1', '5-2', '2-1'], correct_answer: '4-2', level: 3, genre: 'legends', emoji: '⚽', hint: 'ベルナベウでの第1戦を3-0で制したことが大きかった' },
  { id: 'lv3_72', question_text: '2013-14 CL準決勝、マドリーがバイエルンを下した際の2試合合計スコアは？', choices: ['5-0', '4-0', '4-1', '3-0'], correct_answer: '5-0', level: 3, genre: 'legends', emoji: '⭐', hint: 'アウェイの第2戦だけで4-0という圧倒的な内容だった' },
  { id: 'lv3_73', question_text: '2015-16 CL準決勝、マドリーがマンチェスター・Cを下した際の2試合合計スコアは？', choices: ['1-0', '2-0', '2-1', '1-1（アウェイゴール）'], correct_answer: '1-0', level: 3, genre: 'legends', emoji: '🏆', hint: 'ロナウドの1点のみで決勝進出を決めた' },
  { id: 'lv3_74', question_text: '2022-23 CL準決勝第1戦（マンチェスター）でシティがマドリーを下したスコアは？', choices: ['4-0', '3-0', '2-0', '5-1'], correct_answer: '4-0', level: 3, genre: 'legends', emoji: '🔵', hint: 'マドリーにとって近年でも屈指の大差での敗戦となった' },
  { id: 'lv3_75', question_text: '2014-15 CL準決勝でメッシが伝説的な2ゴールを決めた相手クラブは？', choices: ['バイエルン・ミュンヘン', 'ユベントス', 'マドリー', 'PSG'], correct_answer: 'バイエルン・ミュンヘン', level: 3, genre: 'legends', emoji: '🇦🇷', hint: 'この試合のループシュートは今も語り継がれる名場面' },
  { id: 'lv3_76', question_text: '2014-15 CL準決勝でメッシが股抜きループシュートを決めた相手GKは？', choices: ['マヌエル・ノイアー', 'オリバー・カーン', 'ルネ・アドラー', 'ヤン・ゾマー'], correct_answer: 'マヌエル・ノイアー', level: 3, genre: 'legends', emoji: '🧤', hint: 'ドイツ代表の絶対的守護神が翻弄された伝説の場面' },
  { id: 'lv3_77', question_text: '2011年、マドリーがコパ・デル・レイ決勝でバルセロナを下したスコアは？', choices: ['1-0', '2-1', '1-1（PK）', '2-0'], correct_answer: '1-0', level: 3, genre: 'legends', emoji: '🏆', hint: 'メストーリャでの決勝。延長戦にもつれた接戦だった' },
  { id: 'lv3_78', question_text: '2011年のコパ・デル・レイ決勝でマドリーの決勝点（延長）を決めたのは？', choices: ['クリスティアーノ・ロナウド', 'カリム・ベンゼマ', 'メスト・エジル', 'マルセロ'], correct_answer: 'クリスティアーノ・ロナウド', level: 3, genre: 'legends', emoji: '🇵🇹', hint: 'マドリー加入後、公式戦で初めてバルセロナから勝利をあげた一戦' },
  { id: 'lv3_79', question_text: '2023年、マドリーがコパ・デル・レイ決勝で下した相手は？', choices: ['オサスナ', 'アスレティック・ビルバオ', 'バレンシア', 'ベティス'], correct_answer: 'オサスナ', level: 3, genre: 'legends', emoji: '🏆', hint: '2-1のスコアでタイトルを獲得した' },
  { id: 'lv3_80', question_text: '2014年、マドリーがFIFAクラブワールドカップ決勝で下した南米王者は？', choices: ['サンロレンソ', 'グレミオ', 'コリンチャンス', 'リーベル・プレート'], correct_answer: 'サンロレンソ', level: 3, genre: 'legends', emoji: '🏆', hint: '「デシマ」達成後の年末、世界一决定戦を制した' },
  { id: 'lv3_81', question_text: '2017年、マドリーがFIFAクラブワールドカップ決勝で下した南米王者は？', choices: ['グレミオ', 'サンロレンソ', 'リーベル・プレート', 'フラメンゴ'], correct_answer: 'グレミオ', level: 3, genre: 'legends', emoji: '🏆', hint: 'CL連覇の勢いそのままに世界一の座も掴んだ' },
  { id: 'lv3_82', question_text: '2018年、マドリーがFIFAクラブワールドカップ決勝で下した相手は？', choices: ['アル・アイン', 'アル・ヒラル', 'ウラワレッズ', 'アル・アハリ'], correct_answer: 'アル・アイン', level: 3, genre: 'legends', emoji: '🏆', hint: 'UAEのクラブを相手に4-1で快勝した' },
  { id: 'lv3_83', question_text: '2014年、マドリーがUEFAスーパーカップで下した相手は？', choices: ['セビージャ', 'アトレティコ・マドリード', 'バレンシア', 'バルセロナ'], correct_answer: 'セビージャ', level: 3, genre: 'legends', emoji: '🏆', hint: '「デシマ」達成の勢いのままシーズン開幕を飾った' },
  { id: 'lv3_84', question_text: '2016年、マドリーが延長の末にUEFAスーパーカップで下した相手は？', choices: ['セビージャ', 'アトレティコ・マドリード', 'バルセロナ', 'ビジャレアル'], correct_answer: 'セビージャ', level: 3, genre: 'legends', emoji: '🏆', hint: '2大会連続で同じ相手からタイトルを奪った' },
  { id: 'lv3_85', question_text: '2017年、マドリーがUEFAスーパーカップで下した相手は？', choices: ['マンチェスター・U', 'リバプール', 'チェルシー', 'アーセナル'], correct_answer: 'マンチェスター・U', level: 3, genre: 'legends', emoji: '🏆', hint: 'CL王者とヨーロッパリーグ王者の対決を制した' },
  { id: 'lv3_86', question_text: '2022年、マドリーがUEFAスーパーカップで下した相手は？', choices: ['アイントラハト・フランクフルト', 'RBライプツィヒ', 'バイエル・レバークーゼン', 'ボルシア・ドルトムント'], correct_answer: 'アイントラハト・フランクフルト', level: 3, genre: 'legends', emoji: '🏆', hint: 'CLとヨーロッパリーグそれぞれの王者による対決だった' },
  { id: 'lv3_87', question_text: 'マドリー史上最多得点記録を2010年代にロナウドに更新されるまで長年保持していた選手は？', choices: ['ラウール・ゴンサレス', 'エミリオ・ブトラゲーニョ', 'フェレンツ・プスカス', 'アルフレード・ディ・ステファノ'], correct_answer: 'ラウール・ゴンサレス', level: 3, genre: 'legends', emoji: '🇪🇸', hint: '下部組織出身の生え抜きレジェンドとして長年愛された' },
  { id: 'lv3_88', question_text: 'CL通算最多出場を記録するGKは？', choices: ['イケル・カシジャス', 'ジャンルイジ・ブッフォン', 'マヌエル・ノイアー', 'チボ・クルトワ'], correct_answer: 'イケル・カシジャス', level: 3, genre: 'legends', emoji: '🧤', hint: 'マドリーの下部組織出身、長年守護神として君臨した' },
  { id: 'lv3_89', question_text: '2011-12シーズン、マドリーがリーガで記録した当時の史上最多勝ち点は？', choices: ['100', '95', '98', '102'], correct_answer: '100', level: 3, genre: 'legends', emoji: '🥇', hint: 'モウリーニョ体制下、ロナウドが50ゴールを記録したシーズン' },
  { id: 'lv3_90', question_text: 'マドリーでデイビッド・ベッカムが着用した背番号は？', choices: ['23', '7', '10', '11'], correct_answer: '23', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: 'マンチェスター・U時代の7番が使えず選んだ番号' },
  { id: 'lv3_91', question_text: 'マドリーでブラジル代表FWロナウド(愛称「現象」)が着用した背番号は？', choices: ['9', '7', '10', '11'], correct_answer: '9', level: 3, genre: 'legends', emoji: '🇧🇷', hint: 'ストライカーの象徴的な番号を背負った' },
  { id: 'lv3_92', question_text: '2004年、リヴァプールからマドリーへ移籍したイングランド代表FWは？', choices: ['マイケル・オーウェン', 'ロビー・ファウラー', 'スティーブン・ジェラード', 'ジェイミー・キャラガー'], correct_answer: 'マイケル・オーウェン', level: 3, genre: 'legends', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', hint: '在籍わずか1年でニューカッスルへ移籍することになった' },
  { id: 'lv3_93', question_text: '2007年、フルミネンセからマドリーへ移籍し、以後10年以上左サイドを守ったブラジル代表SBは？', choices: ['マルセロ', 'ロベルト・カルロス', 'ダニエウ・アウヴェス', 'フィリペ・ルイス'], correct_answer: 'マルセロ', level: 3, genre: 'legends', emoji: '🇧🇷', hint: '攻撃参加を得意とする左サイドバックの名手' },
  { id: 'lv3_94', question_text: '2022-23 CL準決勝第2戦（ベルナベウ）でマドリーとマンチェスター・Cが記録したスコアは？', choices: ['1-1', '0-0', '2-1（マドリーの勝利）', '1-0（マドリーの勝利）'], correct_answer: '1-1', level: 3, genre: 'legends', emoji: '🔵', hint: '第1戦の大差を覆せず、合計5-1でシティが決勝進出を決めた' },
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

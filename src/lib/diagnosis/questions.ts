export interface DiagnosisQuestion {
  id: number;
  text: string;
  type: 'personality' | 'ultimate';
  choices: { label: string; delta: Partial<Record<Param, number>> }[];
}

export type Param = 'attack' | 'defense' | 'technique' | 'mentality' | 'intelligence';

export const QUESTIONS: DiagnosisQuestion[] = [
  // ── 性格質問 15問 ──
  {
    id: 1,
    text: "試合で1点リードしている終盤、あなたならどう戦う？",
    type: 'personality',
    choices: [
      { label: "全員で守り切る。勝ち点3は絶対に離さない", delta: { defense: 2, mentality: 1 } },
      { label: "追加点を狙いにいく。守りに入ったら逆にやられる", delta: { attack: 2, mentality: 1 } },
      { label: "ポゼッションでボールを動かして時計を進める", delta: { technique: 2, intelligence: 1 } },
      { label: "状況を読みながら柔軟に対応する", delta: { intelligence: 2, technique: 1 } },
    ],
  },
  {
    id: 2,
    text: "ピッチで最も重要だと思うことは？",
    type: 'personality',
    choices: [
      { label: "チームの勝利のためなら泥臭くてもいい", delta: { defense: 1, mentality: 2 } },
      { label: "美しいサッカーで観客を魅了すること", delta: { technique: 2, intelligence: 1 } },
      { label: "ゴール前に入り込んで点を取ること", delta: { attack: 2, technique: 1 } },
      { label: "組織の中で自分の役割を完璧に果たすこと", delta: { intelligence: 2, defense: 1 } },
    ],
  },
  {
    id: 3,
    text: "チームの練習で一番好きなメニューは？",
    type: 'personality',
    choices: [
      { label: "シュート練習。とにかくゴールを決める感覚を磨きたい", delta: { attack: 2, technique: 1 } },
      { label: "戦術練習。ポジショニングを体に染み込ませる", delta: { intelligence: 2, defense: 1 } },
      { label: "1対1の守備練習。フィジカルで圧倒したい", delta: { defense: 2, mentality: 1 } },
      { label: "パス練習。ボールを動かすリズムが一番楽しい", delta: { technique: 2, intelligence: 1 } },
    ],
  },
  {
    id: 4,
    text: "CLで自分のチームが逆転されたとき、あなたはどう感じる？",
    type: 'personality',
    choices: [
      { label: "絶対に諦めない。最後の笛が鳴るまで信じ続ける", delta: { mentality: 3 } },
      { label: "冷静に状況を分析して、何をすべきか考える", delta: { intelligence: 2, technique: 1 } },
      { label: "キャプテンとして仲間を鼓舞する", delta: { mentality: 2, intelligence: 1 } },
      { label: "とにかく前に出てゴールを奪いに行く", delta: { attack: 2, mentality: 1 } },
    ],
  },
  {
    id: 5,
    text: "憧れのプレースタイルは？",
    type: 'personality',
    choices: [
      { label: "相手のドリブルを読んで完璧なタックルで止める", delta: { defense: 2, intelligence: 1 } },
      { label: "コースを見極めた一撃必殺のシュート", delta: { attack: 2, technique: 1 } },
      { label: "狭いスペースを抜け出す魔法のようなドリブル", delta: { technique: 2, attack: 1 } },
      { label: "全員を動かす神視野のラストパス", delta: { intelligence: 2, technique: 1 } },
    ],
  },
  {
    id: 6,
    text: "CL決勝でPKを蹴るとしたら？",
    type: 'personality',
    choices: [
      { label: "絶対に蹴りたい。プレッシャーこそ燃える", delta: { mentality: 3 } },
      { label: "蹴りたいが正直プレッシャーは感じる", delta: { mentality: 1, technique: 1 } },
      { label: "GKを徹底研究して科学的に狙い目を決める", delta: { intelligence: 2, technique: 1 } },
      { label: "仲間を信頼して、自分より上手い人に任せる", delta: { intelligence: 1, defense: 1 } },
    ],
  },
  {
    id: 7,
    text: "新しいチームに移籍したとき、まず何をする？",
    type: 'personality',
    choices: [
      { label: "戦術を徹底的に頭に叩き込む", delta: { intelligence: 2, defense: 1 } },
      { label: "チームメイトとコミュニケーションを深める", delta: { mentality: 2, intelligence: 1 } },
      { label: "まず体を作ることから始める", delta: { defense: 2, mentality: 1 } },
      { label: "自分のテクニックをアピールして信頼を得る", delta: { technique: 2, attack: 1 } },
    ],
  },
  {
    id: 8,
    text: "試合中、相手の強烈なタックルを受けたとき？",
    type: 'personality',
    choices: [
      { label: "すぐに立ち上がって次のプレーに集中する", delta: { mentality: 2, defense: 1 } },
      { label: "審判に冷静にアピールする", delta: { intelligence: 2, mentality: 1 } },
      { label: "怒りをエネルギーにしてさらに激しくプレーする", delta: { mentality: 2, attack: 1 } },
      { label: "一度ポジションを取り直して冷静になる", delta: { intelligence: 2, technique: 1 } },
    ],
  },
  {
    id: 9,
    text: "サッカー以外で自分に当てはまるのは？",
    type: 'personality',
    choices: [
      { label: "戦略ゲームやチェスが好き", delta: { intelligence: 2, technique: 1 } },
      { label: "筋トレや体力づくりに励んでいる", delta: { defense: 2, mentality: 1 } },
      { label: "芸術や音楽など感性を磨くことが好き", delta: { technique: 2, intelligence: 1 } },
      { label: "スポーツ全般で常に負けたくない", delta: { mentality: 2, attack: 1 } },
    ],
  },
  {
    id: 10,
    text: "監督から「今日は守備を頼む」と言われたら？",
    type: 'personality',
    choices: [
      { label: "使命感を持って完璧にこなす", delta: { defense: 2, mentality: 1 } },
      { label: "守りながらもカウンターの機会を狙う", delta: { defense: 1, attack: 1, intelligence: 1 } },
      { label: "役割を理解して戦術的に行動する", delta: { intelligence: 2, defense: 1 } },
      { label: "少し物足りないが、チームのために頑張る", delta: { mentality: 2, technique: 1 } },
    ],
  },
  {
    id: 11,
    text: "自分が最も輝けるポジションは？",
    type: 'personality',
    choices: [
      { label: "最前線でゴールを狙うFW", delta: { attack: 2, technique: 1 } },
      { label: "中盤でゲームを組み立てるMF", delta: { intelligence: 2, technique: 1 } },
      { label: "相手の攻撃を跳ね返すDF", delta: { defense: 2, mentality: 1 } },
      { label: "ゴールを守るGK", delta: { defense: 2, intelligence: 1 } },
    ],
  },
  {
    id: 12,
    text: "試合後の振り返り、あなたが真っ先に気にするのは？",
    type: 'personality',
    choices: [
      { label: "自分の得点・アシスト数", delta: { attack: 2, mentality: 1 } },
      { label: "守備の数値（被シュート数・クリア数）", delta: { defense: 2, intelligence: 1 } },
      { label: "パス成功率と戦術の実行精度", delta: { intelligence: 2, technique: 1 } },
      { label: "チーム全体の連携がうまくいったか", delta: { intelligence: 1, mentality: 2 } },
    ],
  },
  {
    id: 13,
    text: "試合の重要局面でボールが来たとき、まず何を考える？",
    type: 'personality',
    choices: [
      { label: "シュートコースが開いたら即シュート", delta: { attack: 2, mentality: 1 } },
      { label: "周りの状況をすばやくスキャンしてベストな判断をする", delta: { intelligence: 2, technique: 1 } },
      { label: "フィジカルで相手を圧倒してドリブル突破", delta: { attack: 1, mentality: 2 } },
      { label: "安全なパスコースを選んでリスクを避ける", delta: { intelligence: 2, defense: 1 } },
    ],
  },
  {
    id: 14,
    text: "チームが困難な状況にあるとき、あなたの役割は？",
    type: 'personality',
    choices: [
      { label: "声でチームを鼓舞するリーダー", delta: { mentality: 2, intelligence: 1 } },
      { label: "黙ってプレーで引っ張る職人", delta: { technique: 2, mentality: 1 } },
      { label: "冷静に問題点を分析して解決策を提示する", delta: { intelligence: 2, technique: 1 } },
      { label: "体を張って守り、チームの安定を守る", delta: { defense: 2, mentality: 1 } },
    ],
  },
  {
    id: 15,
    text: "サポーターからどう見られたい？",
    type: 'personality',
    choices: [
      { label: "ゴールを量産するヒーロー", delta: { attack: 2, technique: 1 } },
      { label: "勝利のために何でもこなす不可欠な存在", delta: { mentality: 2, defense: 1 } },
      { label: "技術の高さで観客を魅了するアーティスト", delta: { technique: 2, intelligence: 1 } },
      { label: "チームを陰で支える縁の下の力持ち", delta: { intelligence: 2, defense: 1 } },
    ],
  },

  // ── 究極の選択 5問 ──
  {
    id: 16,
    text: "【究極の選択】あなたが選ぶのは？",
    type: 'ultimate',
    choices: [
      { label: "CLで1試合10ゴール vs 1試合10アシスト", delta: { attack: 3 } },
      { label: "1試合10アシスト", delta: { intelligence: 3 } },
      { label: "全試合無失点で優勝 vs 全試合10点取って優勝", delta: { defense: 3 } },
      { label: "全試合10点取って優勝", delta: { attack: 3 } },
    ],
  },
  {
    id: 17,
    text: "【究極の選択】CL決勝で選ぶなら？",
    type: 'ultimate',
    choices: [
      { label: "0-0でPK戦。自分が最後のキッカーで決勝弾", delta: { mentality: 3 } },
      { label: "5-4で乱打戦。自分は3ゴール1アシスト", delta: { attack: 3 } },
      { label: "1-0勝利。自分のクリアが決勝点を守った", delta: { defense: 3 } },
      { label: "3-0快勝。自分のパスが3つのゴールを生んだ", delta: { intelligence: 3 } },
    ],
  },
  {
    id: 18,
    text: "【究極の選択】自分がなりたい選手は？",
    type: 'ultimate',
    choices: [
      { label: "毎試合ゴールを取る得点王", delta: { attack: 3 } },
      { label: "守備の鬼。相手FWを封じ込める番人", delta: { defense: 3 } },
      { label: "技術の天才。ドリブルで何人でも抜ける選手", delta: { technique: 3 } },
      { label: "戦術の頭脳。試合を読んでチームを動かす司令塔", delta: { intelligence: 3 } },
    ],
  },
  {
    id: 19,
    text: "【究極の選択】1試合だけCLに出るとしたら？",
    type: 'ultimate',
    choices: [
      { label: "FWとして前線でゴールを狙いたい", delta: { attack: 2, technique: 1 } },
      { label: "CBとして最終ラインを守り切りたい", delta: { defense: 2, mentality: 1 } },
      { label: "MFとして中盤を支配したい", delta: { intelligence: 2, technique: 1 } },
      { label: "GKとしてPKを止めてヒーローになりたい", delta: { defense: 1, mentality: 2 } },
    ],
  },
  {
    id: 20,
    text: "【究極の選択】CLで自分がプレーするなら、どんな選手として記憶されたい？",
    type: 'ultimate',
    choices: [
      { label: "「あいつが決めた」という瞬間を作るゴールゲッター", delta: { attack: 3 } },
      { label: "「あいつがいなければ負けていた」という守備の柱", delta: { defense: 2, mentality: 1 } },
      { label: "「あのドリブルは神がかっていた」という技術の化身", delta: { technique: 3 } },
      { label: "「あの采配と判断が試合を変えた」という頭脳派", delta: { intelligence: 2, technique: 1 } },
    ],
  },
];

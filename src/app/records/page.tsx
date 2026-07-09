import type { Metadata } from 'next';
import Link from 'next/link';
import AdsenseUnit from '@/components/AdsenseUnit';

export const metadata: Metadata = {
  title: 'レアル・マドリード 歴代記録集 | 欧州サッカー歴代ベストイレブンメーカー',
  description:
    'レアル・マドリードが保持する欧州・世界の記録を一覧。チャンピオンズリーグ15回制覇、ラ・リーガ勝ち点100、ロナウドのCL17ゴールなど、前人未到の数字を解説。',
};

type Record = {
  number: string;
  unit: string;
  label: string;
  desc: string;
};

const clRecords: Record[] = [
  {
    number: '15',
    unit: '回',
    label: 'チャンピオンズリーグ優勝',
    desc: '2位のACミラン（7回）の2倍以上。1956年の初優勝から2024年まで、他のクラブを圧倒する史上最多記録。',
  },
  {
    number: '5',
    unit: '連覇',
    label: '欧州カップ連続制覇（1956〜1960年）',
    desc: '大会創設から5年間一度も欧州の王座を譲らなかった。この記録は70年近く経った今も破られていない。',
  },
  {
    number: '3',
    unit: '連覇',
    label: 'CL連続制覇（2016〜2018年）',
    desc: 'チャンピオンズリーグとなった現行制度で唯一の3連覇。ジダン監督のもとで達成した前人未到の偉業。',
  },
  {
    number: '17',
    unit: 'ゴール',
    label: 'CL1シーズン最多得点（ロナウド・2013-14）',
    desc: 'クリスティアーノ・ロナウドが2013-14シーズンに記録したCL1シーズン最多ゴール記録。決勝まで全試合で得点した。',
  },
  {
    number: '12',
    unit: '年連続',
    label: 'CL準決勝以上進出（2010〜2022年）',
    desc: '12年連続でチャンピオンズリーグのベスト4以上に進出。欧州の「常連中の常連」であることを示す圧倒的な安定感。',
  },
];

const ligaRecords: Record[] = [
  {
    number: '36',
    unit: '回',
    label: 'ラ・リーガ最多優勝',
    desc: '2024-25シーズン終了時点でのリーグ最多優勝記録。2位のバルセロナ（27回）に9回の差をつけている。',
  },
  {
    number: '100',
    unit: '点',
    label: 'ラ・リーガ1シーズン最多勝ち点（2011-12）',
    desc: 'モウリーニョ監督のもと2011-12シーズンに達成したラ・リーガ勝ち点記録。38試合で32勝4分2敗というほぼ完璧な成績。',
  },
  {
    number: '121',
    unit: 'ゴール',
    label: 'ラ・リーガ1シーズン最多チームゴール（2011-12）',
    desc: 'ロナウド（50G）を筆頭に、ベンゼマ、ディ・マリア、ヒグアインが得点を重ねた「得点爆発の季節」。',
  },
  {
    number: '48',
    unit: 'ゴール',
    label: 'ラ・リーガ1シーズン最多個人ゴール（ロナウド・2014-15）',
    desc: 'クリスティアーノ・ロナウドが2014-15シーズンに樹立したラ・リーガ個人最多ゴール記録。38試合48ゴールという前人未到のペース。',
  },
  {
    number: '11',
    unit: '対 2',
    label: 'ラ・リーガ最大得点差（対バルセロナ・1943年）',
    desc: '1943年のクラシコでバルセロナを11-2で粉砕。戦時下という特殊な状況での記録だが、公式記録として残る。',
  },
];

const personalRecords: Record[] = [
  {
    number: '450',
    unit: 'ゴール',
    label: 'クラブ最多得点（クリスティアーノ・ロナウド）',
    desc: '2009年から2018年の9シーズンでロナウドが記録したマドリーでの公式戦通算ゴール数。438試合で450ゴール。',
  },
  {
    number: '323',
    unit: 'ゴール',
    label: '長年のクラブ最多記録（ラウル・ゴンサレス）',
    desc: 'ロナウドが2011年に更新するまで長くクラブ最多だったラウルの通算ゴール数。750試合に渡る忠誠と得点力の証明。',
  },
  {
    number: '741',
    unit: '試合',
    label: 'クラブ最多出場（イケル・カシージャス）',
    desc: 'マドリーのキャプテンとして最も多くの試合に立ったカシージャスの出場記録。25年に渡るキャリアの集大成。',
  },
  {
    number: '5',
    unit: 'ゴール',
    label: 'CL決勝1試合最多得点（プスカス・1960年）',
    desc: 'フェレンツ・プスカスが1960年のCL決勝アイントラハト・フランクフルト戦（7-3勝利）で記録した個人最多得点。',
  },
];

const otherRecords: Record[] = [
  {
    number: '8',
    unit: '回',
    label: 'FIFAクラブワールドカップ最多優勝',
    desc: '2024年の大会制覇を含む、クラブW杯最多優勝記録。世界レベルでの圧倒的な強さを証明するタイトル。',
  },
  {
    number: '26',
    unit: 'タイトル',
    label: 'UEFA公式大会通算最多優勝',
    desc: 'CL15回、UEFAスーパーカップ5回、インターコンチネンタルカップ3回、UEFAカップ2回、カップウィナーズカップ1回の合計。',
  },
  {
    number: '1',
    unit: '位',
    label: 'FIFA「20世紀最優秀クラブ」（1998年）',
    desc: 'FIFAが20世紀を締めくくる1998年に選出した「20世紀最高のクラブ」。世界中のサッカーメディアと専門家が選んだ称号。',
  },
  {
    number: '13',
    unit: '万人',
    label: 'ベルナベウ旧スタジアム最高収容数',
    desc: '現在のエスタディオ・サンティアゴ・ベルナベウは改修後約8万人収容。旧スタジアムは13万人以上を収容した記録を持つ。',
  },
];

function RecordCard({ record }: { record: Record }) {
  return (
    <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-colors">
      <div className="flex items-end gap-1 mb-2">
        <span
          className="text-5xl font-bold text-[#D4AF37] leading-none shimmer-text"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {record.number}
        </span>
        <span className="text-[#D4AF37]/70 text-lg mb-1">{record.unit}</span>
      </div>
      <p className="text-white font-semibold text-sm mb-2">{record.label}</p>
      <p className="text-[#777] text-xs leading-relaxed">{record.desc}</p>
    </div>
  );
}

function Section({ label, title, records }: { label: string; title: string; records: Record[] }) {
  return (
    <section className="mb-16">
      <p className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase mb-1">{label}</p>
      <h2
        className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-[#1e1e1e] pb-3"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {records.map((r) => (
          <RecordCard key={r.label} record={r} />
        ))}
      </div>
    </section>
  );
}

export default function RecordsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; ツールに戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴代ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">Records &amp; History</p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 shimmer-text"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            マドリー<br className="sm:hidden" /> 歴代記録集
          </h1>
          <p className="text-[#888] max-w-2xl leading-relaxed">
            チャンピオンズリーグ15回制覇、ラ・リーガ勝ち点100、1シーズン121ゴール——マドリーが100年以上かけて積み上げてきた、破られていない・破りにくい記録を一覧にまとめた。
          </p>
        </div>

        <Section
          label="Champions League"
          title="チャンピオンズリーグの記録"
          records={clRecords}
        />
        <Section
          label="La Liga"
          title="ラ・リーガの記録"
          records={ligaRecords}
        />

        <AdsenseUnit />

        <Section
          label="Individual Records"
          title="個人記録（マドリー在籍時）"
          records={personalRecords}
        />
        <Section
          label="Other Titles"
          title="その他のタイトルと称号"
          records={otherRecords}
        />

        {/* Disclaimer */}
        <div className="border border-[#1e1e1e] rounded-xl p-5 mb-12 text-[#555] text-xs leading-relaxed">
          ※ 記録は2024-25シーズン終了時点の情報を基準としています。一部の歴史的記録については諸説あり、公式統計と異なる場合があります。本ページはエンターテインメント・ファン考察目的のコンテンツです。
        </div>

        {/* Footer nav */}
        <div className="border-t border-[#1e1e1e] pt-10 text-center space-y-4">
          <p className="text-[#555] text-sm">この記録を参考に、あなただけのマドリー歴代ベストイレブンを作ってみよう</p>
          <Link
            href="/"
            className="inline-block text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors"
          >
            ベストイレブンを作る &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}

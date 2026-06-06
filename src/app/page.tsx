import type { Metadata } from 'next';
import Link from 'next/link';
import BulletinBoard from '@/components/BulletinBoard';
import XTimeline from '@/components/XTimeline';

export const metadata: Metadata = {
  title: 'レアル・マドリード ファンサイト | ultrasrei.com',
  description:
    'レアル・マドリードを愛するファンが作る考察サイト。ディ・ステファノからベリンガムまで、CL15回優勝クラブの歴史・選手・戦術を徹底深掘り。モウリーニョ名言集・ベストイレブンメーカーも無料で公開中。',
  openGraph: {
    title: 'レアル・マドリード ファンサイト | ultrasrei.com',
    description: 'Hala Madrid y nada más. ディ・ステファノ、ジダン、ロナウド、モウリーニョ——欧州最強クラブの物語をファン目線で深掘り。',
    url: 'https://ultrasrei.com',
  },
};

const G = '#C9A524';
const GL = '#F0D060';
const DARK = '#080F1C';

const featuredArticle = {
  slug: 'champions-league-15-titles',
  label: 'CL特集',
  title: 'チャンピオンズリーグ15回優勝——レアル・マドリードが欧州の頂点に立ち続ける理由',
  excerpt: 'ディ・ステファノの5連覇から、アンチェロッティの14冠・15冠まで。なぜマドリーだけがこれほど欧州で勝ち続けられるのか、クラブDNAを解き明かす。',
};

const recentArticles = [
  { slug: 'di-stefano-european-cups',    label: '1950s',   title: 'ディ・ステファノが変えた伝説——欧州5連覇という奇跡' },
  { slug: 'galacticos-light-and-shadow', label: '2000s',   title: 'ガラクティコス——光と影の6年間' },
  { slug: 'zidane-cl-three-peat',        label: '2016–18', title: 'ジダン監督——CL三連覇という前人未到の偉業' },
  { slug: 'ancelotti-magic-2022',        label: '2021–22', title: 'アンチェロッティの奇跡——CL14冠への逆転劇' },
  { slug: 'new-generation-2024',         label: 'NOW',     title: 'ベリンガム・ヴィニシウス——マドリーの新時代' },
  { slug: '4-3-3-evolution-real-madrid', label: 'TACTICS', title: '4-3-3の進化論：なぜマドリーはこの布陣で世界を制し続けるのか' },
  { slug: 'bernabeu-stadium-history',    label: 'STADIUM', title: 'ベルナベウ——サッカー史上最も偉大なスタジアムの物語' },
  { slug: 'sergio-ramos-legacy',         label: 'LEGEND',  title: 'セルヒオ・ラモス——マドリーの魂が刻んだ90+3分の奇跡' },
];

const playerSpotlight = [
  { slug: 'zidane-the-player',              name: 'ジネディーヌ・ジダン',      era: '2001–2006', title: '天才の右足——史上最高の選手はベルナベウで輝いた' },
  { slug: 'ronaldo-real-madrid-nine-years', name: 'クリスティアーノ・ロナウド', era: '2009–2018', title: '9年間で450ゴール——白いユニフォームが生んだ神話' },
  { slug: 'modric-the-maestro',             name: 'ルカ・モドリッチ',          era: '2012–',     title: 'バロンドール受賞——静かな支配者の哲学' },
  { slug: 'raul-the-legend',                name: 'ラウール・ゴンサレス',      era: '1994–2010', title: 'El Goleador——16年間マドリーを生きた伝説' },
  { slug: 'roberto-carlos-the-cannon',      name: 'ロベルト・カルロス',        era: '1996–2007', title: '45mフリーキック——物理法則を超えたLB' },
  { slug: 'iker-casillas-saint-iker',       name: 'イケル・カシジャス',        era: '1999–2015', title: 'セント・イケル——マドリーが生んだ守護神' },
];

const recordHighlights = [
  { value: '15', label: 'CL制覇',      sub: '2位以下に倍以上の差' },
  { value: '36', label: 'リーガ優勝',  sub: 'スペイン最多記録' },
  { value: '450+', label: 'ロナウドゴール', sub: '在籍9シーズン' },
  { value: '5連覇', label: '欧州杯',   sub: 'ディ・ステファノ時代' },
];

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-[10px] tracking-[0.5em] font-bold uppercase" style={{ color: G }}>{text}</span>
      <span className="flex-1 h-px bg-[#E5E7EB]" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ===== HEADER — dark navy ===== */}
      <header className="sticky top-0 z-30" style={{ background: DARK }}>
        <div className="max-w-7xl mx-auto px-5 h-[58px] flex items-center justify-between gap-6">
          {/* logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="font-black tracking-[0.12em] text-[15px]" style={{ fontFamily: 'var(--font-playfair)', color: G }}>
              ultrasrei
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <span className="hidden sm:block text-[11px] tracking-[0.35em] uppercase text-white/30">Hala Madrid</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {[
              { href: '/blog',    label: '記事' },
              { href: '/records', label: '記録集' },
              { href: '/quiz',    label: 'CLクイズ' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="px-4 h-[58px] inline-flex items-center text-[13px] text-white/50 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
            <Link href="/mourinho" className="px-4 h-[58px] inline-flex items-center text-[13px] font-semibold transition-colors" style={{ color: G }}>
              THE SPECIAL ONE
            </Link>
            <div className="w-px h-5 bg-white/10 mx-3" />
            <Link
              href="/tool"
              className="px-5 py-2 rounded-lg text-[13px] font-bold transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: '#0A0A0A' }}
            >
              ベストイレブンを作る
            </Link>
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <Link href="/blog"     className="shrink-0 px-3 py-1.5 text-[12px] text-white/60 border border-white/10 rounded-lg whitespace-nowrap">記事</Link>
            <Link href="/records"  className="shrink-0 px-3 py-1.5 text-[12px] text-white/60 border border-white/10 rounded-lg whitespace-nowrap">記録集</Link>
            <Link href="/mourinho" className="shrink-0 px-3 py-1.5 text-[12px] font-semibold rounded-lg whitespace-nowrap" style={{ color: G, border: `1px solid ${G}40` }}>モウリーニョ</Link>
            <Link href="/tool"     className="shrink-0 px-3 py-1.5 text-[12px] font-bold rounded-lg whitespace-nowrap" style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: '#0A0A0A' }}>ツール</Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white">
        {/* subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${G}08 1px, transparent 1px), linear-gradient(90deg, ${G}08 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* large watermark */}
        <div className="pointer-events-none absolute right-[-2vw] top-0 bottom-0 flex items-center overflow-hidden select-none" aria-hidden="true">
          <span className="font-black leading-none text-[32vw]" style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: `1.5px ${G}09` }}>
            RM
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="max-w-3xl">
            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-10 h-[2px]" style={{ background: G }} />
              <span className="text-[11px] tracking-[0.55em] font-semibold uppercase" style={{ color: G }}>
                Hala Madrid y nada más
              </span>
            </div>

            <h1
              className="font-black leading-[0.9] mb-8 text-[#0A0A0A]"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3.2rem, 8vw, 6rem)' }}
            >
              史上最強クラブ
              <br />
              <span style={{ color: G }}>レアル・マドリード</span>
              <br />
              の物語
            </h1>

            <p className="text-[#6B7280] text-[15px] leading-[1.8] max-w-lg mb-10">
              マドリーを愛してやまないファンが作る考察サイト。
              ディ・ステファノの5連覇からベリンガムの新時代まで——
              CL15回優勝クラブの歴史・選手・戦術・名将を深掘りする。
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="px-7 py-3.5 rounded-xl font-bold text-[14px] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: '#0A0A0A' }}
              >
                記事を読む →
              </Link>
              <Link
                href="/mourinho"
                className="px-7 py-3.5 rounded-xl font-bold text-[14px] transition-all duration-200 hover:bg-[#0A0A0A]/5"
                style={{ color: G, border: `1.5px solid ${G}60` }}
              >
                モウリーニョ語録
              </Link>
            </div>
          </div>

          {/* stats — desktop */}
          <div className="hidden lg:flex absolute right-8 bottom-12 gap-10 items-end">
            {[
              { v: '15', l: 'CL制覇' },
              { v: '36', l: 'リーガ優勝' },
              { v: '1902', l: '創設' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="font-black leading-none" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 3vw, 3rem)', color: G }}>{v}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase mt-1.5" style={{ color: '#9CA3AF' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MOURINHO ===== */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        {/* diagonal gold accent */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, transparent, ${G}, transparent)` }} />
        {/* watermark */}
        <div className="pointer-events-none absolute right-[-3vw] inset-y-0 flex items-center overflow-hidden select-none" aria-hidden="true">
          <span className="font-black leading-none text-[30vw]" style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: `1px ${G}07` }}>
            JM
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <SectionLabel text="The Special One" />
              <h2
                className="font-black text-white leading-[0.9] mt-4 mb-6"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                ジョゼ・
                <br />
                <span style={{ color: G }}>モウリーニョ</span>
              </h2>
              <p className="text-[14px] leading-[1.8] mb-7 max-w-md" style={{ color: '#94A3B8' }}>
                FCポルト・チェルシー・インテル・マドリード・マンU・ローマと欧州を渡り歩き、
                どのクラブでもタイトルをもたらした「スペシャル・ワン」。
                その哲学・名言・采配の美学を徹底解剖する。
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['CL×2', 'リーガ×1', 'プレミア×3', 'セリエA×2', 'コンファレンス×1'].map((t) => (
                  <span key={t} className="text-[11px] px-3 py-1 rounded-full font-semibold" style={{ background: `${G}15`, border: `1px solid ${G}30`, color: G }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/mourinho"
                className="inline-block px-7 py-3.5 rounded-xl font-bold text-[14px] transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: '#0A0A0A' }}
              >
                モウリーニョ全語録を読む →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { quote: 'I am The Special One.', ja: '私こそが、スペシャル・ワンだ。' },
                { quote: 'I am not in the business of losing.', ja: '私は負けるビジネスをしていない。' },
                { quote: 'Pressure? What is pressure? Pressure is poor people in the world trying to feed their families.', ja: 'プレッシャーとは、食べさせる家族のいる貧しい人々のものだ。' },
              ].map(({ quote, ja }) => (
                <blockquote
                  key={quote}
                  className="rounded-2xl px-6 py-5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p className="text-[13px] italic leading-relaxed mb-2" style={{ fontFamily: 'var(--font-playfair)', color: G }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-[12px]" style={{ color: '#475569' }}>{ja}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="bg-[#F4F4F6] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Featured" />
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group block relative overflow-hidden rounded-2xl mt-6 transition-all duration-300 hover:shadow-2xl"
            style={{ background: 'white' }}
          >
            {/* left gold bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: `linear-gradient(to bottom, ${G}, ${GL})` }} />
            {/* number decoration */}
            <div className="pointer-events-none absolute top-0 right-0 overflow-hidden select-none leading-none" aria-hidden="true">
              <span className="font-black text-[16rem]" style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: `1px ${G}08`, lineHeight: 0.8 }}>
                01
              </span>
            </div>

            <div className="relative px-10 py-12 md:px-14 md:py-14">
              <span
                className="inline-block text-[10px] px-3 py-1.5 rounded-full font-bold tracking-[0.3em] uppercase mb-5"
                style={{ background: `${G}15`, color: '#A07C10', border: `1px solid ${G}30` }}
              >
                {featuredArticle.label}
              </span>
              <h2
                className="font-bold leading-[1.15] mb-5 text-[#0A0A0A] group-hover:text-[#A07C10] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
              >
                {featuredArticle.title}
              </h2>
              <p className="text-[14px] leading-[1.75] max-w-2xl mb-7" style={{ color: '#6B7280' }}>
                {featuredArticle.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold" style={{ color: G }}>
                記事を読む
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== ARTICLES GRID ===== */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <SectionLabel text="Articles" />
              <h2 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-playfair)' }}>特集記事</h2>
            </div>
            <Link href="/blog" className="text-[12px] font-medium transition-colors" style={{ color: '#9CA3AF' }}
              onMouseEnter={e => (e.currentTarget.style.color = G)}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
            >
              全記事を見る →
            </Link>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentArticles.map((a, i) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex flex-col bg-[#F4F4F6] rounded-2xl p-6 transition-all duration-200 hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[9px] px-2.5 py-1 rounded-full font-bold tracking-[0.25em] uppercase"
                    style={{ background: `${G}15`, color: '#A07C10', border: `1px solid ${G}20` }}
                  >
                    {a.label}
                  </span>
                  <span className="text-[11px] font-black tabular-nums" style={{ color: '#D1D5DB', fontFamily: 'var(--font-playfair)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-[13px] font-bold text-[#0A0A0A] leading-[1.55] flex-1 group-hover:text-[#A07C10] transition-colors duration-200">
                  {a.title}
                </h3>
                <span className="mt-5 text-[12px] font-medium text-[#D1D5DB] group-hover:text-[${G}] transition-colors" style={{ color: '#D1D5DB' }}>
                  続きを読む →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECORDS ===== */}
      <section className="bg-[#F4F4F6] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Records" />
          <h2 className="text-[22px] font-bold text-[#0A0A0A] mb-10" style={{ fontFamily: 'var(--font-playfair)' }}>歴代記録</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recordHighlights.map((r) => (
              <div
                key={r.label}
                className="bg-white rounded-2xl px-6 py-8 text-center"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="font-black leading-none mb-3"
                  style={{ fontFamily: 'var(--font-playfair)', color: G, fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
                >
                  {r.value}
                </div>
                <div className="text-[13px] font-semibold text-[#0A0A0A] mb-1">{r.label}</div>
                <div className="text-[11px]" style={{ color: '#9CA3AF' }}>{r.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/records"
              className="inline-flex items-center gap-2 text-[13px] font-semibold transition-colors"
              style={{ color: G }}
            >
              記録集をすべて見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PLAYER SPOTLIGHT ===== */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <SectionLabel text="Legends" />
              <h2 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-playfair)' }}>銀河系の伝説たち</h2>
            </div>
            <Link href="/blog" className="text-[12px] font-medium" style={{ color: '#9CA3AF' }}>
              全選手記事 →
            </Link>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {playerSpotlight.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex items-center gap-4 bg-[#F4F4F6] rounded-2xl px-5 py-4 transition-all duration-200 hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
              >
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-lg font-black"
                  style={{ background: `${G}15`, border: `1.5px solid ${G}30`, color: G, fontFamily: 'var(--font-playfair)' }}
                >
                  {p.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] font-bold text-[#0A0A0A] truncate">{p.name}</span>
                    <span className="text-[10px] shrink-0" style={{ color: '#D1D5DB' }}>{p.era}</span>
                  </div>
                  <p className="text-[12px] leading-snug mt-0.5 text-[#6B7280] group-hover:text-[#A07C10] transition-colors">
                    {p.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOOL CTA ===== */}
      <section className="py-20 px-6" style={{ background: DARK }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-[10px] tracking-[0.5em] font-bold uppercase" style={{ color: G }}>Best XI Maker</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <h2
            className="font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            あなたの夢の
            <br />
            <span style={{ color: G }}>レアル・マドリード</span>を作れ
          </h2>
          <p className="text-[14px] leading-[1.75] max-w-lg mx-auto mb-4" style={{ color: '#94A3B8' }}>
            ディ・ステファノからベリンガムまで——好きな選手を自由に選んでベストイレブンを編成。
            AI能力査定・チームケミストリー計算・Xシェア機能を無料で。
          </p>
          <p className="text-[13px] italic mb-9" style={{ fontFamily: 'var(--font-playfair)', color: `${G}60` }}>
            &ldquo;To be the best, you have to beat the best.&rdquo; — José Mourinho
          </p>
          <Link
            href="/tool"
            className="inline-block px-10 py-4 rounded-2xl font-black text-[15px] transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: '#0A0A0A' }}
          >
            ベストイレブンメーカーを使う →
          </Link>
          <div className="mt-7 flex flex-wrap gap-6 justify-center text-[12px]" style={{ color: '#374151' }}>
            <span>✓ 完全無料</span>
            <span>✓ 登録不要</span>
            <span>✓ AI能力査定</span>
            <span>✓ Xシェア対応</span>
          </div>
        </div>
      </section>

      {/* ===== MEMBERS CTA ===== */}
      <section className="bg-[#F4F4F6] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${DARK} 0%, #0D1F3C 100%)`, boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}
          >
            <div className="px-8 py-10 md:px-14 md:py-14 flex flex-col md:flex-row gap-10 md:gap-16 items-center">
              <div className="flex-1">
                <SectionLabel text="Members Only" />
                <h2
                  className="font-black text-white leading-[0.95] mt-4 mb-5"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
                >
                  モウリーニョ×マドリー
                  <br />
                  <span style={{ color: G }}>プレミアム会員</span>
                </h2>
                <p className="text-[14px] leading-[1.75] mb-8 max-w-md" style={{ color: '#64748B' }}>
                  全試合の戦術振り返り・モウリーニョ采配解剖・CL＆リーガレビューを会員限定で配信。
                  月額¥900でいつでもキャンセル可。
                </p>
                <Link
                  href="/members"
                  className="inline-block px-8 py-3.5 rounded-xl font-bold text-[14px] transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: '#0A0A0A' }}
                >
                  詳細を見る・登録する →
                </Link>
              </div>
              <div className="shrink-0 grid gap-3 w-full md:w-56">
                {['全試合振り返りレビュー', 'モウリーニョ采配の深掘り', '戦術分析コラム（月2〜4本）', '会員限定掲示板'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[13px]" style={{ color: '#475569' }}>
                    <span className="font-bold shrink-0" style={{ color: G }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== X / SNS ===== */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[10px] tracking-[0.5em] font-bold uppercase shrink-0" style={{ color: G }}>管理人のX</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          <div className="rounded-2xl overflow-hidden bg-[#F4F4F6]">
            <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-[#E5E7EB]">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[15px]"
                style={{ background: `${G}18`, color: G, fontFamily: 'var(--font-playfair)' }}
              >
                U
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0A0A0A]">ultras_rei</p>
                <p className="text-[11px]" style={{ color: '#9CA3AF' }}>管理人 — マドリー＆モウリーニョ愛好家</p>
              </div>
            </div>
            <div className="px-6 py-6">
              <XTimeline username="ultras_rei" tweetLimit={5} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BBS ===== */}
      <BulletinBoard />

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#E5E7EB] bg-[#F4F4F6]">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            <div>
              <div className="font-black tracking-[0.12em] text-[16px] mb-2" style={{ fontFamily: 'var(--font-playfair)', color: G }}>
                ultrasrei.com
              </div>
              <p className="text-[12px] mb-1" style={{ color: '#9CA3AF' }}>レアル・マドリード ファンサイト — 非公式</p>
              <p className="text-[11px] italic" style={{ fontFamily: 'var(--font-playfair)', color: `${G}50` }}>Hala Madrid y nada más.</p>
            </div>
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-2.5">
              {[
                { href: '/blog',     label: '記事一覧' },
                { href: '/records',  label: '記録集' },
                { href: '/mourinho', label: 'モウリーニョ語録' },
                { href: '/tool',     label: 'ベストイレブンメーカー' },
                { href: '/quiz',     label: 'CLクイズ' },
                { href: '/gallery',  label: 'みんなのフォーメーション' },
                { href: '/about',    label: '運営者情報' },
                { href: '/privacy',  label: 'プライバシーポリシー' },
                { href: '/tokusho',  label: '特定商取引法に基づく表記' },
                { href: '/contact',  label: 'お問い合わせ' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-[12px] transition-colors" style={{ color: '#6B7280' }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-xl p-5 mb-8 text-[11px] leading-[1.7]" style={{ color: '#9CA3AF' }}>
            本サービスはサッカーファンが制作した<strong style={{ color: '#6B7280' }}>非公式の考察・分析コンテンツ</strong>です。
            UEFA・FIFA・レアル・マドリードCF、各クラブ・選手・関係機関とは一切の公式な関係を持ちません。
            選手能力値はAI（Claude by Anthropic）による推定であり、エンターテインメント目的のものです。
            権利侵害のご連絡は ren90no@hotmail.co.jp まで。
          </div>

          <p className="text-[11px]" style={{ color: '#D1D5DB' }}>
            © 2024 ultrasrei.com — All trademarks and copyrights belong to their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

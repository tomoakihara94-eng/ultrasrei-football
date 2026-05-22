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

const featuredArticle = {
  slug: 'champions-league-15-titles',
  label: 'CL特集',
  title: 'チャンピオンズリーグ15回優勝——レアル・マドリードが欧州の頂点に立ち続ける理由',
  excerpt: 'ディ・ステファノの5連覇から、アンチェロッティの14冠・15冠まで。なぜマドリーだけがこれほど欧州で勝ち続けられるのか、クラブDNAを解き明かす。',
};

const recentArticles = [
  { slug: 'di-stefano-european-cups',      label: '1950年代',   title: 'ディ・ステファノが変えた伝説——欧州5連覇という奇跡' },
  { slug: 'galacticos-light-and-shadow',   label: '2000年代',   title: 'ガラクティコス——光と影の6年間' },
  { slug: 'zidane-cl-three-peat',          label: '2016-18',    title: 'ジダン監督——CL三連覇という前人未到の偉業' },
  { slug: 'ancelotti-magic-2022',          label: '2021-22',    title: 'アンチェロッティの奇跡——CL14冠への逆転劇' },
  { slug: 'new-generation-2024',           label: '現在',       title: 'ベリンガム・ヴィニシウス——マドリーの新時代' },
  { slug: '4-3-3-evolution-real-madrid',   label: '戦術',       title: '4-3-3の進化論：なぜマドリーはこの布陣で世界を制し続けるのか' },
  { slug: 'bernabeu-stadium-history',      label: 'スタジアム', title: 'ベルナベウ——サッカー史上最も偉大なスタジアムの物語' },
  { slug: 'sergio-ramos-legacy',           label: '魂',         title: 'セルヒオ・ラモス——マドリーの魂が刻んだ90+3分の奇跡' },
];

const playerSpotlight = [
  { slug: 'zidane-the-player',        name: 'ジネディーヌ・ジダン',   era: '2001-2006',  title: '天才の右足——史上最高の選手はベルナベウで輝いた' },
  { slug: 'ronaldo-real-madrid-nine-years', name: 'クリスティアーノ・ロナウド', era: '2009-2018', title: '9年間で450ゴール——R9がマドリーにもたらしたもの' },
  { slug: 'modric-the-maestro',       name: 'ルカ・モドリッチ',       era: '2012-',      title: 'バロンドール受賞者——静かな支配者の哲学' },
  { slug: 'raul-the-legend',          name: 'ラウール・ゴンサレス',   era: '1994-2010',  title: 'El Goleador——16年間マドリーを生きた伝説' },
  { slug: 'roberto-carlos-the-cannon', name: 'ロベルト・カルロス',   era: '1996-2007',  title: '45mフリーキック——物理法則を超えたレフトバック' },
  { slug: 'iker-casillas-saint-iker', name: 'イケル・カシジャス',    era: '1999-2015',  title: 'セント・イケル——マドリーが生んだ最高のキーパー' },
];

const recordHighlights = [
  { value: '15', label: 'CL優勝回数', sub: '2位以下に倍以上の差' },
  { value: '36', label: 'リーガ優勝', sub: 'スペイン最多' },
  { value: '450+', label: 'ロナウドのゴール', sub: '9シーズンで' },
  { value: '5', label: '欧州杯連続制覇', sub: 'ディ・ステファノ時代' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30 border-b border-[#1a1a1a] bg-[#060606]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-[#D4AF37] font-black tracking-widest text-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
              ultrasrei
            </span>
            <span className="hidden sm:inline text-[#333] text-xs">|</span>
            <span className="hidden sm:inline text-[#555] text-xs">Hala Madrid</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/blog',    label: '記事一覧' },
              { href: '/records', label: '記録集' },
              { href: '/quiz',    label: 'CLクイズ' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-xs text-[#888] hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
            {/* Mourinho — special highlight */}
            <Link
              href="/mourinho"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
              style={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.35)' }}
            >
              THE SPECIAL ONE
            </Link>
            <Link
              href="/tool"
              className="ml-2 px-4 py-1.5 rounded-lg text-xs font-bold text-black transition-all"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
            >
              ベストイレブンを作る
            </Link>
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <Link href="/blog"     className="shrink-0 px-3 py-1.5 rounded-lg border border-[#222] text-[#777] text-xs whitespace-nowrap">記事</Link>
            <Link href="/records"  className="shrink-0 px-3 py-1.5 rounded-lg border border-[#222] text-[#777] text-xs whitespace-nowrap">記録集</Link>
            <Link href="/mourinho" className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap" style={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.35)' }}>
              モウリーニョ
            </Link>
            <Link
              href="/tool"
              className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-black whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
            >
              ツール
            </Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden py-20 md:py-32 px-6"
        style={{ background: 'linear-gradient(160deg, #0d0000 0%, #090909 50%, #060606 100%)' }}
      >
        {/* decorative background text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden="true">
          <span
            className="text-[18vw] font-black leading-none whitespace-nowrap"
            style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: '1px rgba(212,175,55,0.04)' }}
          >
            HALA MADRID
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.6em] text-[#D4AF37] uppercase mb-5 font-semibold">
            ⸻ Hala Madrid y nada más ⸻
          </p>
          <h1
            className="text-4xl md:text-6xl font-black mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <span className="text-white">史上最強クラブ</span>
            <br />
            <span style={{ color: '#D4AF37' }}>レアル・マドリード</span>
            <span className="text-white">の物語</span>
          </h1>
          <p className="text-[#777] text-sm md:text-base leading-relaxed mb-3 max-w-2xl">
            マドリーを愛してやまないファンが作る考察サイト。
            ディ・ステファノの5連覇からベリンガムの新時代まで——
            CL15回優勝クラブの歴史・選手・戦術・名将を、熱を持って深掘りする。
          </p>
          <p className="text-[#D4AF37]/60 text-sm italic mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
            &ldquo;Campeones, campeones, oé oé oé.&rdquo;
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="px-6 py-3 rounded-xl font-bold text-sm text-black transition-all hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
            >
              記事を読む →
            </Link>
            <Link
              href="/mourinho"
              className="px-6 py-3 rounded-xl font-bold text-sm text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-all"
            >
              モウリーニョ語録
            </Link>
            <Link
              href="/records"
              className="px-6 py-3 rounded-xl text-sm text-[#555] border border-[#222] hover:border-[#444] transition-all"
            >
              記録集
            </Link>
          </div>
        </div>
      </section>

      {/* gold divider */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      {/* ===== MOURINHO — The Special One ===== */}
      <section
        className="py-16 px-6"
        style={{ background: 'linear-gradient(135deg, #0e0800 0%, #110a00 40%, #0d0d0d 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          {/* section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
            <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-bold shrink-0">The Special One</p>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: passion statement */}
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                ジョゼ・<br />
                <span style={{ color: '#D4AF37' }}>モウリーニョ</span>
              </h2>
              <p className="text-[#888] text-sm leading-relaxed mb-5">
                このサイトの管理人が、レアル・マドリードと並んでもっとも敬愛する名将。
                FCポルト・チェルシー・インテル・マドリード・マンU・ローマと欧州を渡り歩き、
                どのクラブでもタイトルをもたらした「スペシャル・ワン」。
                その哲学・名言・采配の美学を徹底解剖する。
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['CL×2', 'リーガ×1', 'プレミア×3', 'セリエA×2', 'コンファレンス×1'].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2.5 py-1 rounded-full font-bold"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/mourinho"
                className="inline-block px-7 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)', color: '#0a0a0a' }}
              >
                モウリーニョ全語録を読む →
              </Link>
            </div>

            {/* Right: quotes */}
            <div className="space-y-4">
              {[
                { quote: 'I am The Special One.', ja: '私こそが、スペシャル・ワンだ。' },
                { quote: 'I am not in the business of losing.', ja: '私は負けるビジネスをしていない。' },
                { quote: 'Pressure? What is pressure? Pressure is poor people in the world trying to feed their families.', ja: 'プレッシャー？プレッシャーとは、食べさせる家族のいる貧しい人々のものだ。' },
              ].map(({ quote, ja }) => (
                <blockquote
                  key={quote}
                  className="rounded-xl px-5 py-4"
                  style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
                >
                  <p className="text-[#D4AF37] text-sm italic mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-[#555] text-xs">{ja}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* gold divider */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="py-14 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-6 font-semibold">Featured</p>
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group block rounded-2xl overflow-hidden transition-all"
            style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #0f0900 100%)', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            <div className="p-8 md:p-12">
              <span
                className="inline-block text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase mb-4"
                style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}
              >
                {featuredArticle.label}
              </span>
              <h2
                className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4 group-hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {featuredArticle.title}
              </h2>
              <p className="text-[#666] text-sm leading-relaxed max-w-2xl mb-6">
                {featuredArticle.excerpt}
              </p>
              <span className="text-[#D4AF37] text-sm font-bold group-hover:underline">
                記事を読む →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== RECENT ARTICLES GRID ===== */}
      <section className="py-14 px-6 bg-[#060606]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-1 font-semibold">Articles</p>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                レアル・マドリード 特集記事
              </h2>
            </div>
            <Link href="/blog" className="text-xs text-[#555] hover:text-[#D4AF37] transition-colors whitespace-nowrap">
              全記事を見る →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group block rounded-xl p-5 transition-all"
                style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}
              >
                <span
                  className="inline-block text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase mb-3"
                  style={{ backgroundColor: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  {a.label}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {a.title}
                </h3>
                <span className="mt-3 inline-block text-[#444] text-xs group-hover:text-[#D4AF37]/60 transition-colors">
                  続きを読む →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECORDS TEASER ===== */}
      <section
        className="py-14 px-6"
        style={{ background: 'linear-gradient(135deg, #080808 0%, #0a0900 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-2 font-semibold">Records</p>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            レアル・マドリード 歴代記録
          </h2>
          <p className="text-[#555] text-sm mb-8">数字が物語る、マドリーの圧倒的な強さ。</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {recordHighlights.map((r) => (
              <div
                key={r.label}
                className="rounded-xl px-5 py-6 text-center"
                style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
              >
                <div
                  className="text-4xl font-black mb-1"
                  style={{ fontFamily: 'var(--font-playfair)', color: '#D4AF37' }}
                >
                  {r.value}
                </div>
                <div className="text-white text-xs font-semibold mb-0.5">{r.label}</div>
                <div className="text-[#444] text-[10px]">{r.sub}</div>
              </div>
            ))}
          </div>
          <Link
            href="/records"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-all"
          >
            記録集をすべて見る →
          </Link>
        </div>
      </section>

      {/* ===== PLAYER SPOTLIGHT ===== */}
      <section className="py-14 px-6 bg-[#060606]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-1 font-semibold">Legends</p>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                銀河系の伝説たち
              </h2>
            </div>
            <Link href="/blog" className="text-xs text-[#555] hover:text-[#D4AF37] transition-colors whitespace-nowrap">
              全選手記事 →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playerSpotlight.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex items-start gap-4 rounded-xl p-5 transition-all"
                style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}
              >
                <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', fontFamily: 'var(--font-playfair)' }}
                >
                  {p.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-[#D4AF37] text-xs font-bold mb-0.5">{p.name}</div>
                  <div className="text-[#333] text-[10px] mb-1">{p.era}</div>
                  <p className="text-white text-xs leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {p.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOOL CTA ===== */}
      <section className="py-16 px-6 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-3 font-semibold">Best XI Maker</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            あなたの夢の<br />
            <span style={{ color: '#D4AF37' }}>レアル・マドリード</span>を作れ
          </h2>
          <p className="text-[#555] text-sm leading-relaxed mb-3 max-w-xl mx-auto">
            ディ・ステファノからベリンガムまで——好きな選手を自由に選んでベストイレブンを編成。
            AI能力査定・チームケミストリー計算・Xシェア機能を無料で。
          </p>
          <p className="text-[#D4AF37]/50 text-xs italic mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
            &ldquo;To be the best, you have to beat the best.&rdquo; — José Mourinho
          </p>
          <Link
            href="/tool"
            className="inline-block px-10 py-4 rounded-2xl font-black text-base text-black transition-all hover:shadow-lg hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
          >
            ベストイレブンメーカーを使う →
          </Link>
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-[#333]">
            <span>✓ 完全無料</span>
            <span>✓ 登録不要</span>
            <span>✓ AI能力査定</span>
            <span>✓ Xシェア対応</span>
          </div>
        </div>
      </section>

      {/* ===== MEMBERS CTA ===== */}
      <section
        className="py-16 px-6 border-t border-[#1a1a1a]"
        style={{ background: 'linear-gradient(135deg, #0e0800 0%, #0d0d0d 100%)' }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-3 font-semibold">Members Only</p>
            <h2 className="text-3xl font-black text-white mb-3 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              モウリーニョ×マドリー<br />
              <span style={{ color: '#D4AF37' }}>プレミアム会員</span>
            </h2>
            <p className="text-[#666] text-sm leading-relaxed mb-6 max-w-md">
              全試合の戦術振り返り・モウリーニョ采配解剖・CL＆リーガレビューを会員限定で配信。
              月額¥900でいつでもキャンセル可。
            </p>
            <Link
              href="/members"
              className="inline-block px-8 py-3 rounded-xl font-bold text-sm text-black transition-all hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
            >
              詳細を見る・登録する →
            </Link>
          </div>
          <div className="flex-shrink-0 grid grid-cols-1 gap-3 w-full md:w-64">
            {['全試合振り返りレビュー', 'モウリーニョ采配の深掘り', '戦術分析コラム', '会員限定掲示板'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-[#bbb]">
                <span className="text-[#D4AF37] shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== X TIMELINE ===== */}
      <section className="py-14 px-6 bg-[#060606] border-t border-[#1a1a1a]">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
            <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-bold shrink-0">管理人のXポスト</p>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0d0d0d', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            {/* header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1a1a1a]">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontFamily: 'var(--font-playfair)' }}
              >
                U
              </div>
              <div>
                <p className="text-white text-xs font-bold">ultras_rei</p>
                <p className="text-[#555] text-[10px]">管理人 — マドリー＆モウリーニョ愛好家</p>
              </div>
              <a
                href="https://twitter.com/ultras_rei"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[10px] font-bold px-3 py-1 rounded-full transition-colors"
                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}
              >
                フォローする
              </a>
            </div>

            {/* timeline */}
            <div className="px-2 py-2" style={{ minHeight: 200 }}>
              <XTimeline username="ultras_rei" tweetLimit={5} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BBS ===== */}
      <BulletinBoard />

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#111] bg-[#040404]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <div className="text-[#D4AF37] font-black tracking-widest text-base mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                ultrasrei.com
              </div>
              <p className="text-[#333] text-xs mb-1">レアル・マドリード ファンサイト — 非公式</p>
              <p className="text-[#D4AF37]/30 text-[10px] italic" style={{ fontFamily: 'var(--font-playfair)' }}>
                Hala Madrid y nada más.
              </p>
            </div>
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2 text-xs">
              {[
                { href: '/blog',     label: '記事一覧' },
                { href: '/records',  label: '記録集' },
                { href: '/mourinho', label: 'モウリーニョ名言集' },
                { href: '/tool',     label: 'ベストイレブンメーカー' },
                { href: '/quiz',     label: 'CLクイズ' },
                { href: '/gallery',  label: 'みんなのフォーメーション' },
                { href: '/about',    label: '運営者情報' },
                { href: '/privacy',  label: 'プライバシーポリシー' },
                { href: '/contact',  label: 'お問い合わせ' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-[#444] hover:text-[#D4AF37] transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#080808] border border-[#111] rounded-xl p-6 mb-8 text-[10px] text-[#2a2a2a] leading-relaxed">
            本サービスはサッカーファンが制作した<strong className="text-[#333]">非公式の考察・分析コンテンツ</strong>です。
            UEFA・FIFA・レアル・マドリードCF、各クラブ・選手・関係機関とは一切の公式な関係を持ちません。
            選手能力値はAI（Claude by Anthropic）による推定であり、エンターテインメント目的のものです。
            権利侵害のご連絡は ren90no@hotmail.co.jp まで。
          </div>

          <p className="text-[#222] text-[10px]">
            © 2024 ultrasrei.com — All trademarks and copyrights belong to their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

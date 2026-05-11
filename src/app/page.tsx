import type { Metadata } from 'next';
import Link from 'next/link';
import BulletinBoard from '@/components/BulletinBoard';

export const metadata: Metadata = {
  title: 'レアル・マドリード 考察メディア | ultrasrei.com',
  description:
    'レアル・マドリードの歴史・選手・戦術・名将を深掘りする考察メディア。ディ・ステファノからベリンガムまで、CL15回優勝クラブの全てを徹底解説。ベストイレブンメーカーも無料で使えます。',
  openGraph: {
    title: 'レアル・マドリード 考察メディア | ultrasrei.com',
    description: 'ディ・ステファノ、ジダン、ロナウド、モウリーニョ——欧州最強クラブの物語を深掘り。',
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
  { slug: 'sergio-ramos-legacy',           label: 'CL4強',      title: 'セルヒオ・ラモス——マドリーの魂が刻んだ90+3分の奇跡' },
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
            <span className="hidden sm:inline text-[#555] text-xs">レアル・マドリード 考察メディア</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/blog', label: '記事一覧' },
              { href: '/records', label: '記録集' },
              { href: '/mourinho', label: 'モウリーニョ' },
              { href: '/quiz', label: 'CLクイズ' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-xs text-[#888] hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
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
            <Link href="/blog"    className="shrink-0 px-3 py-1.5 rounded-lg border border-[#222] text-[#777] text-xs whitespace-nowrap">記事</Link>
            <Link href="/records" className="shrink-0 px-3 py-1.5 rounded-lg border border-[#222] text-[#777] text-xs whitespace-nowrap">記録集</Link>
            <Link href="/mourinho" className="shrink-0 px-3 py-1.5 rounded-lg border border-[#222] text-[#777] text-xs whitespace-nowrap">モウリーニョ</Link>
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
        className="relative overflow-hidden py-20 md:py-28 px-6"
        style={{ background: 'linear-gradient(160deg, #0d0000 0%, #090909 50%, #060606 100%)' }}
      >
        {/* decorative background text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden="true">
          <span
            className="text-[22vw] font-black leading-none whitespace-nowrap"
            style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: '1px rgba(212,175,55,0.03)' }}
          >
            REAL MADRID
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-5 font-semibold">
            ⸻ 欧州最強クラブ 考察メディア ⸻
          </p>
          <h1
            className="text-4xl md:text-6xl font-black mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <span className="text-white">史上最強クラブ</span>
            <br />
            <span style={{ color: '#D4AF37' }}>レアル・マドリード</span>
            <span className="text-white">の物語</span>
          </h1>
          <p className="text-[#666] text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
            ディ・ステファノの5連覇から、ベリンガムの新時代まで。
            チャンピオンズリーグ15回優勝クラブの歴史・選手・戦術・名将を深掘りする考察メディア。
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
              href="/records"
              className="px-6 py-3 rounded-xl font-bold text-sm text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-all"
            >
              記録集を見る
            </Link>
          </div>
        </div>
      </section>

      {/* gold divider */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

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
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
            レアル・マドリード 歴代記録
          </h2>
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
                伝説の選手たち
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

      {/* ===== MOURINHO SECTION ===== */}
      <section
        className="py-14 px-6 border-t border-[#1a1a1a]"
        style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #110800 50%, #0d0d0d 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-3 font-semibold">The Special One</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            ジョゼ・モウリーニョ
          </h2>
          <blockquote
            className="text-lg md:text-2xl italic text-[#D4AF37]/80 mb-6 border-l-4 border-[#D4AF37]/40 pl-5"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            &ldquo;I am not in the business of losing.&rdquo;
            <span className="block text-sm text-[#555] not-italic mt-1">「私は負けるビジネスをしていない。」</span>
          </blockquote>
          <p className="text-[#666] text-sm leading-relaxed mb-8 max-w-2xl">
            FCポルト・チェルシー・インテル・マドリード・マンU・ローマ——欧州の頂点を渡り歩いた「スペシャル・ワン」の名言・戦術・物語を徹底特集。
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <Link
              href="/mourinho"
              className="block rounded-xl p-4 transition-all hover:bg-[#D4AF37]/20 group"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)' }}
            >
              <p className="text-[9px] tracking-widest text-[#D4AF37]/60 uppercase mb-1">名言集 全45本</p>
              <p className="text-white text-sm font-bold group-hover:text-[#D4AF37] transition-colors">モウリーニョ語録を読む →</p>
            </Link>
            <Link href="/blog/mourinho-chelsea-era" className="block rounded-xl p-4 transition-all hover:border-[#D4AF37]/30 group" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
              <p className="text-[9px] tracking-widest text-[#D4AF37]/60 uppercase mb-1">チェルシー時代</p>
              <p className="text-white text-sm font-bold group-hover:text-[#D4AF37] transition-colors">プレミア3冠の光と確執 →</p>
            </Link>
            <Link href="/blog/mourinho-defensive-philosophy" className="block rounded-xl p-4 transition-all hover:border-[#D4AF37]/30 group" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
              <p className="text-[9px] tracking-widest text-[#D4AF37]/60 uppercase mb-1">戦術解剖</p>
              <p className="text-white text-sm font-bold group-hover:text-[#D4AF37] transition-colors">守備哲学の真髄 →</p>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/blog/mourinho-roma-conference-league', label: 'ローマ コンフェレンス制覇' },
              { href: '/blog/mourinho-real-madrid-era', label: 'マドリード3年間の功罪' },
              { href: '/blog/jose-mourinho-vs-guardiola', label: 'モウリーニョ対グアルディオラ' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/20 px-3 py-1.5 rounded-full"
              >
                {label} →
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
            あなただけの<br />
            <span style={{ color: '#D4AF37' }}>歴代ベストイレブン</span>を作ろう
          </h2>
          <p className="text-[#555] text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            ディ・ステファノからベリンガムまで——好きな選手を自由に選んでベストイレブンを編成。
            AI能力査定・チームケミストリー計算・Xシェア機能を無料で。
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
              <p className="text-[#333] text-xs">レアル・マドリード 考察メディア — 非公式ファンサイト</p>
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

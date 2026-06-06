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
  { slug: 'di-stefano-european-cups',    label: '1950s',    title: 'ディ・ステファノが変えた伝説——欧州5連覇という奇跡' },
  { slug: 'galacticos-light-and-shadow', label: '2000s',    title: 'ガラクティコス——光と影の6年間' },
  { slug: 'zidane-cl-three-peat',        label: '2016–18',  title: 'ジダン監督——CL三連覇という前人未到の偉業' },
  { slug: 'ancelotti-magic-2022',        label: '2021–22',  title: 'アンチェロッティの奇跡——CL14冠への逆転劇' },
  { slug: 'new-generation-2024',         label: 'NOW',      title: 'ベリンガム・ヴィニシウス——マドリーの新時代' },
  { slug: '4-3-3-evolution-real-madrid', label: 'TACTICS',  title: '4-3-3の進化論：なぜマドリーはこの布陣で世界を制し続けるのか' },
  { slug: 'bernabeu-stadium-history',    label: 'STADIUM',  title: 'ベルナベウ——サッカー史上最も偉大なスタジアムの物語' },
  { slug: 'sergio-ramos-legacy',         label: 'LEGEND',   title: 'セルヒオ・ラモス——マドリーの魂が刻んだ90+3分の奇跡' },
];

const playerSpotlight = [
  { slug: 'zidane-the-player',           name: 'ジネディーヌ・ジダン',      era: '2001–2006', title: '天才の右足——史上最高の選手はベルナベウで輝いた' },
  { slug: 'ronaldo-real-madrid-nine-years', name: 'クリスティアーノ・ロナウド', era: '2009–2018', title: '9年間で450ゴール——白いユニフォームが生んだ神話' },
  { slug: 'modric-the-maestro',          name: 'ルカ・モドリッチ',          era: '2012–',     title: 'バロンドール受賞——静かな支配者の哲学' },
  { slug: 'raul-the-legend',             name: 'ラウール・ゴンサレス',      era: '1994–2010', title: 'El Goleador——16年間マドリーを生きた伝説' },
  { slug: 'roberto-carlos-the-cannon',   name: 'ロベルト・カルロス',        era: '1996–2007', title: '45mフリーキック——物理法則を超えたLB' },
  { slug: 'iker-casillas-saint-iker',    name: 'イケル・カシジャス',        era: '1999–2015', title: 'セント・イケル——マドリーが生んだ守護神' },
];

const recordHighlights = [
  { value: '15', label: 'CL制覇', sub: '2位以下に倍以上の差' },
  { value: '36', label: 'リーガ優勝', sub: 'スペイン最多記録' },
  { value: '450+', label: 'ロナウドのゴール', sub: '在籍9シーズン' },
  { value: '5連覇', label: '欧州杯', sub: 'ディ・ステファノ時代' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0d0d0d]" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ── top gold accent line ── */}
      <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #B8960C, #F0D060, #B8960C)' }} />

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EEEBE3]">
        <div className="max-w-7xl mx-auto px-5 h-[56px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="text-[#D4AF37] font-black tracking-[0.12em] text-[15px]" style={{ fontFamily: 'var(--font-playfair)' }}>
              ultrasrei
            </span>
            <span className="hidden sm:block w-px h-[18px] bg-[#E0DDD5]" />
            <span className="hidden sm:block text-[#C5C0B4] text-[11px] tracking-[0.35em] uppercase">Hala Madrid</span>
          </Link>

          <nav className="hidden md:flex items-center">
            {[
              { href: '/blog', label: '記事' },
              { href: '/records', label: '記録集' },
              { href: '/quiz', label: 'CLクイズ' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="px-4 h-[56px] inline-flex items-center text-[13px] text-[#777] hover:text-[#0d0d0d] transition-colors">
                {label}
              </Link>
            ))}
            <Link href="/mourinho" className="px-4 h-[56px] inline-flex items-center text-[13px] font-semibold transition-colors" style={{ color: '#C9A227' }}>
              THE SPECIAL ONE
            </Link>
            <div className="w-px h-5 bg-[#E5E2DA] mx-3" />
            <Link
              href="/tool"
              className="px-5 py-2 rounded-lg text-[13px] font-bold text-[#0d0d0d] transition-all hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
            >
              ベストイレブンを作る
            </Link>
          </nav>

          <div className="flex md:hidden items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <Link href="/blog"     className="shrink-0 px-3 py-1.5 text-[12px] text-[#666] border border-[#E5E2DA] rounded-lg whitespace-nowrap">記事</Link>
            <Link href="/records"  className="shrink-0 px-3 py-1.5 text-[12px] text-[#666] border border-[#E5E2DA] rounded-lg whitespace-nowrap">記録集</Link>
            <Link href="/mourinho" className="shrink-0 px-3 py-1.5 text-[12px] font-semibold rounded-lg whitespace-nowrap" style={{ color: '#C9A227', border: '1px solid rgba(212,175,55,0.4)' }}>モウリーニョ</Link>
            <Link href="/tool"     className="shrink-0 px-3 py-1.5 text-[12px] font-bold text-[#0d0d0d] rounded-lg whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}>ツール</Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white">
        {/* watermark */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center overflow-hidden select-none" aria-hidden="true">
          <span
            className="text-[30vw] font-black leading-none"
            style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: '1.5px rgba(212,175,55,0.06)' }}
          >
            RM
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-8 h-[2px] bg-[#D4AF37]" />
              <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold">Hala Madrid y nada más</span>
            </div>

            <h1
              className="font-black leading-[0.92] mb-8"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              史上最強クラブ
              <br />
              <span style={{ color: '#D4AF37' }}>レアル・マドリード</span>
              <br />
              の物語
            </h1>

            <p className="text-[#666] text-[15px] leading-[1.75] max-w-xl mb-10">
              マドリーを愛してやまないファンが作る考察サイト。
              ディ・ステファノの5連覇からベリンガムの新時代まで——
              CL15回優勝クラブの歴史・選手・戦術・名将を、熱を持って深掘りする。
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="px-7 py-3.5 rounded-xl font-bold text-[14px] text-[#0d0d0d] transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
              >
                記事を読む →
              </Link>
              <Link
                href="/mourinho"
                className="px-7 py-3.5 rounded-xl font-bold text-[14px] transition-all hover:bg-[#D4AF37]/5"
                style={{ color: '#C9A227', border: '1.5px solid rgba(212,175,55,0.45)' }}
              >
                モウリーニョ語録
              </Link>
            </div>
          </div>

          {/* floating stat panel (desktop) */}
          <div className="hidden lg:block absolute right-10 bottom-12">
            <div className="flex gap-8 items-end">
              {[
                { v: '15', l: 'CL制覇' },
                { v: '36', l: 'リーガ優勝' },
                { v: '1902', l: '創設' },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-[2.8rem] font-black leading-none text-[#D4AF37]" style={{ fontFamily: 'var(--font-playfair)' }}>{v}</div>
                  <div className="text-[10px] text-[#AAA] tracking-[0.3em] uppercase mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* thin gold rule */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #D4AF37 70%, transparent 100%)' }} />

      {/* ===== MOURINHO — dark navy contrast ===== */}
      <section className="relative overflow-hidden" style={{ background: '#002B5C' }}>
        {/* watermark */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center overflow-hidden select-none" aria-hidden="true">
          <span className="text-[28vw] font-black leading-none" style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: '1px rgba(212,175,55,0.06)' }}>
            JM
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            {/* left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-[2px] bg-[#D4AF37]" />
                <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold">The Special One</span>
              </div>
              <h2 className="font-black text-white leading-[0.92] mb-6" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                ジョゼ・
                <br />
                <span style={{ color: '#D4AF37' }}>モウリーニョ</span>
              </h2>
              <p className="text-[#8AAAC8] text-[14px] leading-[1.8] mb-7 max-w-md">
                FCポルト・チェルシー・インテル・マドリード・マンU・ローマと欧州を渡り歩き、
                どのクラブでもタイトルをもたらした「スペシャル・ワン」。
                その哲学・名言・采配の美学を徹底解剖する。
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['CL×2', 'リーガ×1', 'プレミア×3', 'セリエA×2', 'コンファレンス×1'].map((t) => (
                  <span key={t} className="text-[11px] px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/mourinho"
                className="inline-block px-7 py-3.5 rounded-xl font-bold text-[14px] text-[#0d0d0d] transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
              >
                モウリーニョ全語録を読む →
              </Link>
            </div>

            {/* right: quotes */}
            <div className="space-y-3">
              {[
                { quote: 'I am The Special One.', ja: '私こそが、スペシャル・ワンだ。' },
                { quote: 'I am not in the business of losing.', ja: '私は負けるビジネスをしていない。' },
                { quote: 'Pressure? What is pressure? Pressure is poor people in the world trying to feed their families.', ja: 'プレッシャー？プレッシャーとは、食べさせる家族のいる貧しい人々のものだ。' },
              ].map(({ quote, ja }) => (
                <blockquote
                  key={quote}
                  className="rounded-2xl px-6 py-5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <p className="text-[#D4AF37] text-[13px] italic leading-relaxed mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-[#4A6A88] text-[12px]">{ja}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #D4AF37 70%, transparent 100%)' }} />

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold">Featured</span>
            <div className="flex-1 h-px bg-[#EEEBE3]" />
          </div>

          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group block relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #F2EDE2 100%)' }}
          >
            {/* decorative number */}
            <div className="pointer-events-none absolute top-0 right-0 overflow-hidden select-none leading-none" aria-hidden="true">
              <span className="text-[18rem] font-black" style={{ fontFamily: 'var(--font-playfair)', color: 'transparent', WebkitTextStroke: '1px rgba(212,175,55,0.07)', lineHeight: 0.8 }}>
                1
              </span>
            </div>

            <div className="relative p-10 md:p-14">
              <span className="inline-block text-[10px] px-3 py-1 rounded-full font-bold tracking-[0.3em] uppercase mb-5" style={{ background: 'rgba(212,175,55,0.15)', color: '#B8960C', border: '1px solid rgba(212,175,55,0.3)' }}>
                {featuredArticle.label}
              </span>
              <h2
                className="text-[#0d0d0d] font-bold leading-[1.15] mb-5 transition-colors duration-200 group-hover:text-[#B8960C]"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
              >
                {featuredArticle.title}
              </h2>
              <p className="text-[#777] text-[14px] leading-[1.75] max-w-2xl mb-7">
                {featuredArticle.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[#D4AF37] text-[13px] font-bold">
                記事を読む
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== RECENT ARTICLES ===== */}
      <section className="bg-[#FAFAF8] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold">Articles</span>
              <div className="w-12 h-px bg-[#EEEBE3]" />
              <span className="text-[22px] font-bold text-[#0d0d0d]" style={{ fontFamily: 'var(--font-playfair)' }}>特集記事</span>
            </div>
            <Link href="/blog" className="text-[12px] text-[#999] hover:text-[#D4AF37] transition-colors font-medium">
              全記事を見る →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentArticles.map((a, i) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group block bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ border: '1px solid #EDEAE1' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] px-2.5 py-1 rounded-full font-bold tracking-[0.25em] uppercase" style={{ background: 'rgba(212,175,55,0.1)', color: '#B8960C', border: '1px solid rgba(212,175,55,0.2)' }}>
                    {a.label}
                  </span>
                  <span className="text-[#DDD] text-[11px] font-black tabular-nums" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-[13px] font-bold text-[#0d0d0d] leading-[1.5] mb-4 group-hover:text-[#B8960C] transition-colors">
                  {a.title}
                </h3>
                <span className="text-[12px] text-[#CCC] group-hover:text-[#D4AF37] transition-colors">
                  続きを読む →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECORDS ===== */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold">Records</span>
            <div className="w-12 h-px bg-[#EEEBE3]" />
            <span className="text-[22px] font-bold text-[#0d0d0d]" style={{ fontFamily: 'var(--font-playfair)' }}>歴代記録</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#EEEBE3]">
            {recordHighlights.map((r) => (
              <div key={r.label} className="px-6 md:px-10 first:pl-0 last:pr-0 py-4">
                <div
                  className="font-black leading-none mb-2"
                  style={{ fontFamily: 'var(--font-playfair)', color: '#D4AF37', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  {r.value}
                </div>
                <div className="text-[13px] font-semibold text-[#0d0d0d] mb-1">{r.label}</div>
                <div className="text-[11px] text-[#BBB]">{r.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[#EEEBE3]">
            <Link
              href="/records"
              className="inline-flex items-center gap-2 text-[13px] font-semibold transition-colors"
              style={{ color: '#C9A227' }}
            >
              記録集をすべて見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PLAYER SPOTLIGHT ===== */}
      <section className="bg-[#FAFAF8] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold">Legends</span>
              <div className="w-12 h-px bg-[#EEEBE3]" />
              <span className="text-[22px] font-bold text-[#0d0d0d]" style={{ fontFamily: 'var(--font-playfair)' }}>銀河系の伝説たち</span>
            </div>
            <Link href="/blog" className="text-[12px] text-[#999] hover:text-[#D4AF37] transition-colors font-medium">
              全選手記事 →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {playerSpotlight.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex items-center gap-5 bg-white rounded-2xl px-6 py-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ border: '1px solid #EDEAE1' }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-black"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))', border: '1.5px solid rgba(212,175,55,0.25)', color: '#D4AF37', fontFamily: 'var(--font-playfair)' }}
                >
                  {p.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-bold text-[#0d0d0d] truncate">{p.name}</span>
                    <span className="shrink-0 text-[10px] text-[#CCC]">{p.era}</span>
                  </div>
                  <p className="text-[12px] text-[#888] leading-snug group-hover:text-[#B8960C] transition-colors">
                    {p.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOOL CTA ===== */}
      <section className="bg-white py-20 px-6 border-t border-[#EEEBE3]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="flex-1 h-px bg-[#EEEBE3]" />
            <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold shrink-0">Best XI Maker</span>
            <div className="flex-1 h-px bg-[#EEEBE3]" />
          </div>
          <h2
            className="font-bold text-[#0d0d0d] leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            あなたの夢の
            <br />
            <span style={{ color: '#D4AF37' }}>レアル・マドリード</span>を作れ
          </h2>
          <p className="text-[#777] text-[14px] leading-[1.75] max-w-lg mx-auto mb-3">
            ディ・ステファノからベリンガムまで——好きな選手を自由に選んでベストイレブンを編成。
            AI能力査定・チームケミストリー計算・Xシェア機能を無料で。
          </p>
          <p className="text-[#D4AF37]/60 text-[13px] italic mb-9" style={{ fontFamily: 'var(--font-playfair)' }}>
            &ldquo;To be the best, you have to beat the best.&rdquo; — José Mourinho
          </p>
          <Link
            href="/tool"
            className="inline-block px-10 py-4 rounded-2xl font-black text-[15px] text-[#0d0d0d] transition-all hover:shadow-xl hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
          >
            ベストイレブンメーカーを使う →
          </Link>
          <div className="mt-7 flex flex-wrap gap-6 justify-center text-[12px] text-[#BBB]">
            <span>✓ 完全無料</span>
            <span>✓ 登録不要</span>
            <span>✓ AI能力査定</span>
            <span>✓ Xシェア対応</span>
          </div>
        </div>
      </section>

      {/* ===== MEMBERS CTA ===== */}
      <section className="py-20 px-6" style={{ background: '#002B5C' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-[2px] bg-[#D4AF37]" />
                <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold">Members Only</span>
              </div>
              <h2 className="font-black text-white leading-[0.95] mb-5" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                モウリーニョ×マドリー
                <br />
                <span style={{ color: '#D4AF37' }}>プレミアム会員</span>
              </h2>
              <p className="text-[#7A9BBD] text-[14px] leading-[1.75] mb-8 max-w-md">
                全試合の戦術振り返り・モウリーニョ采配解剖・CL＆リーガレビューを会員限定で配信。
                月額¥900でいつでもキャンセル可。
              </p>
              <Link
                href="/members"
                className="inline-block px-8 py-3.5 rounded-xl font-bold text-[14px] text-[#0d0d0d] transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
              >
                詳細を見る・登録する →
              </Link>
            </div>
            <div className="shrink-0 grid grid-cols-1 gap-4 w-full md:w-60">
              {['全試合振り返りレビュー', 'モウリーニョ采配の深掘り', '戦術分析コラム（月2〜4本）', '会員限定掲示板'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[13px] text-[#8AAAC8]">
                  <span className="text-[#D4AF37] shrink-0 font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== X / SNS ===== */}
      <section className="bg-[#FAFAF8] py-14 px-6 border-t border-[#EEEBE3]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-[#EEEBE3]" />
            <span className="text-[11px] tracking-[0.55em] text-[#D4AF37] uppercase font-semibold shrink-0">管理人のX</span>
            <div className="flex-1 h-px bg-[#EEEBE3]" />
          </div>

          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EDEAE1' }}>
            <div className="flex items-center gap-4 px-6 py-4 border-b border-[#EDEAE1]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[15px]" style={{ background: 'rgba(212,175,55,0.12)', color: '#D4AF37', fontFamily: 'var(--font-playfair)' }}>
                U
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0d0d0d]">ultras_rei</p>
                <p className="text-[11px] text-[#AAA]">管理人 — マドリー＆モウリーニョ愛好家</p>
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
      <footer className="border-t border-[#EEEBE3] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            <div>
              <div className="text-[#D4AF37] font-black tracking-[0.12em] text-[16px] mb-1.5" style={{ fontFamily: 'var(--font-playfair)' }}>
                ultrasrei.com
              </div>
              <p className="text-[#999] text-[12px] mb-1">レアル・マドリード ファンサイト — 非公式</p>
              <p className="text-[#D4AF37]/40 text-[11px] italic" style={{ fontFamily: 'var(--font-playfair)' }}>Hala Madrid y nada más.</p>
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
                <Link key={href} href={href} className="text-[12px] text-[#888] hover:text-[#D4AF37] transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="bg-[#FAFAF8] rounded-xl p-5 mb-8 text-[11px] text-[#AAA] leading-[1.7]">
            本サービスはサッカーファンが制作した<strong className="text-[#777]">非公式の考察・分析コンテンツ</strong>です。
            UEFA・FIFA・レアル・マドリードCF、各クラブ・選手・関係機関とは一切の公式な関係を持ちません。
            選手能力値はAI（Claude by Anthropic）による推定であり、エンターテインメント目的のものです。
            権利侵害のご連絡は ren90no@hotmail.co.jp まで。
          </div>

          <p className="text-[#CCC] text-[11px]">
            © 2024 ultrasrei.com — All trademarks and copyrights belong to their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

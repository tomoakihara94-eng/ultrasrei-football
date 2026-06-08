import type { Metadata } from 'next';
import Link from 'next/link';
import BulletinBoard from '@/components/BulletinBoard';
import XTimeline from '@/components/XTimeline';

export const metadata: Metadata = {
  title: 'レアル・マドリード ファンサイト | ultrasrei.com',
  description: 'レアル・マドリードを愛するファンが作る考察サイト。CL15回優勝クラブの歴史・選手・戦術・モウリーニョを徹底深掘り。',
  openGraph: {
    title: 'レアル・マドリード ファンサイト | ultrasrei.com',
    description: 'Hala Madrid y nada más. 欧州最強クラブの物語をファン目線で深掘り。',
    url: 'https://ultrasrei.com',
  },
};

/* ── design tokens ─────────────────────────────── */
const BG    = '#07090F';
const BG2   = '#0C0F18';
const CARD  = '#10141E';
const CARD2 = '#161B28';
const G     = '#C9A524';
const GL    = '#F0D060';
const BORDER = 'rgba(255,255,255,0.07)';
/* ─────────────────────────────────────────────── */

const featuredArticle = {
  slug: 'champions-league-15-titles',
  label: 'CL特集',
  title: 'チャンピオンズリーグ15回優勝——レアル・マドリードが欧州の頂点に立ち続ける理由',
  excerpt: 'ディ・ステファノの5連覇から、アンチェロッティの14冠・15冠まで。なぜマドリーだけがこれほど欧州で勝ち続けられるのか、クラブDNAを解き明かす。',
};

const sideArticles = [
  { slug: 'mourinho-real-madrid-era',   label: '名将',   title: 'モウリーニョのマドリード3年間——クラシコに賭けた勝負師の功罪' },
  { slug: 'sergio-ramos-legacy',        label: 'レジェンド', title: 'セルヒオ・ラモス——白い悪魔が刻んだ16年間の伝説' },
  { slug: 'real-madrid-la-decima-2014', label: 'CL',    title: 'ラ・デシマ——12年間の悲願、10回目の欧州制覇' },
];

const recentArticles = [
  { slug: 'di-stefano-european-cups',    label: '1950s',   title: 'ディ・ステファノが変えた伝説——欧州5連覇という奇跡' },
  { slug: 'galacticos-light-and-shadow', label: '2000s',   title: 'ガラクティコス——光と影の6年間' },
  { slug: 'zidane-cl-three-peat',        label: '2016–18', title: 'ジダン監督——CL三連覇という前人未到の偉業' },
  { slug: 'ancelotti-magic-2022',        label: '2021–22', title: 'アンチェロッティの奇跡——CL14冠への逆転劇' },
  { slug: 'new-generation-2024',         label: 'NOW',     title: 'ベリンガム・ヴィニシウス——マドリーの新時代' },
  { slug: 'bernabeu-stadium-history',    label: 'STADIUM', title: 'ベルナベウ——史上最も偉大なスタジアムの物語' },
];

const playerSpotlight = [
  { slug: 'zidane-the-player',              name: 'ジネディーヌ・ジダン',      era: '2001–2006', pos: 'MF' },
  { slug: 'ronaldo-real-madrid-nine-years', name: 'クリスティアーノ・ロナウド', era: '2009–2018', pos: 'FW' },
  { slug: 'modric-the-maestro',             name: 'ルカ・モドリッチ',          era: '2012–',     pos: 'MF' },
  { slug: 'raul-the-legend',                name: 'ラウール・ゴンサレス',      era: '1994–2010', pos: 'FW' },
  { slug: 'roberto-carlos-the-cannon',      name: 'ロベルト・カルロス',        era: '1996–2007', pos: 'DF' },
  { slug: 'iker-casillas-saint-iker',       name: 'イケル・カシジャス',        era: '1999–2015', pos: 'GK' },
];

const stats = [
  { value: '15',    label: 'CL制覇',      detail: '欧州最多' },
  { value: '36',    label: 'リーガ優勝',  detail: 'スペイン最多' },
  { value: '1902',  label: '年創設',      detail: '120年以上の歴史' },
  { value: '450+',  label: 'CR7ゴール',   detail: '在籍9シーズン' },
];

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ background: BG, fontFamily: 'var(--font-inter)' }}>

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: `${BG}e8`,
          borderBottom: `1px solid ${BORDER}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span
              className="font-black tracking-[0.1em] text-[16px]"
              style={{ fontFamily: 'var(--font-playfair)', color: G }}
            >
              ultrasrei
            </span>
            <span className="hidden sm:block text-[11px] tracking-[0.4em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Hala Madrid
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/blog',    label: '記事' },
              { href: '/records', label: '記録集' },
              { href: '/quiz',    label: 'CLクイズ' },
            ].map(({ href, label }) => (
              <Link
                key={href} href={href}
                className="px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-150"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/mourinho"
              className="px-4 py-2 text-[13px] font-semibold rounded-lg transition-all duration-150"
              style={{ color: G }}
            >
              THE SPECIAL ONE
            </Link>
            <div className="w-px h-5 mx-2" style={{ background: BORDER }} />
            <Link
              href="/tool"
              className="px-5 py-2 rounded-lg text-[13px] font-bold transition-all duration-150 hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG }}
            >
              ベストイレブンを作る
            </Link>
          </nav>

          {/* mobile */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {[
              { href: '/blog', label: '記事', style: { color: 'rgba(255,255,255,0.5)', border: `1px solid ${BORDER}` } },
              { href: '/mourinho', label: 'モウリーニョ', style: { color: G, border: `1px solid ${G}40` } },
            ].map(({ href, label, style }) => (
              <Link key={href} href={href} className="shrink-0 px-3 py-1.5 text-[12px] rounded-lg whitespace-nowrap font-medium" style={style}>{label}</Link>
            ))}
            <Link href="/tool" className="shrink-0 px-3 py-1.5 text-[12px] font-bold rounded-lg whitespace-nowrap" style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG }}>ツール</Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO — full-screen, cinematic
      ══════════════════════════════════════════ */}
      <section
        className="relative flex flex-col justify-center overflow-hidden"
        style={{
          minHeight: '100svh',
          background: `radial-gradient(ellipse 80% 60% at 10% 50%, #0D1B3520 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 90% 20%, ${G}08 0%, transparent 50%), ${BG}`,
          paddingTop: '80px',
        }}
      >
        {/* huge background text */}
        <div
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-black whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(120px, 28vw, 400px)',
              color: 'transparent',
              WebkitTextStroke: `1px ${G}07`,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            REAL MADRID
          </span>
        </div>

        {/* gold vertical accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: `linear-gradient(to bottom, transparent 10%, ${G} 40%, ${G} 60%, transparent 90%)` }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 w-full py-20">
          {/* eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[1px] w-12" style={{ background: G }} />
            <span className="text-[11px] tracking-[0.6em] font-semibold uppercase" style={{ color: G }}>
              Hala Madrid y nada más
            </span>
          </div>

          {/* main headline */}
          <h1
            className="font-black text-white mb-10 leading-[0.88]"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(3.8rem, 9.5vw, 9rem)',
              letterSpacing: '-0.03em',
              maxWidth: '14ch',
            }}
          >
            史上最強
            <br />
            <span style={{ color: G }}>レアル・</span>
            <br />
            マドリード
          </h1>

          <p
            className="mb-12 leading-[1.8]"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(14px, 1.4vw, 17px)', maxWidth: '42ch' }}
          >
            ディ・ステファノの5連覇からベリンガムの新時代まで——
            CL15回優勝クラブの歴史・選手・戦術・名将を、
            マドリーを愛してやまないファンが深掘りする。
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="px-8 py-4 rounded-xl font-bold text-[15px] transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG, letterSpacing: '-0.01em' }}
            >
              記事を読む →
            </Link>
            <Link
              href="/mourinho"
              className="px-8 py-4 rounded-xl font-bold text-[15px] transition-all duration-200 hover:bg-white/5"
              style={{ color: 'rgba(255,255,255,0.7)', border: `1.5px solid rgba(255,255,255,0.15)` }}
            >
              モウリーニョ語録
            </Link>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${G}60)` }} />
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════ */}
      <section style={{ background: BG2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="py-10 px-6 flex flex-col justify-center"
                style={{ borderRight: i < stats.length - 1 ? `1px solid ${BORDER}` : 'none' }}
              >
                <div
                  className="font-black leading-none mb-2"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                    color: G,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {s.value}
                </div>
                <div className="text-[13px] font-semibold text-white mb-1">{s.label}</div>
                <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED — asymmetric editorial layout
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6" style={{ background: BG }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>Featured</span>
            <div className="flex-1 h-px" style={{ background: BORDER }} />
            <Link href="/blog" className="text-[12px] font-medium transition-colors" style={{ color: 'rgba(255,255,255,0.25)' }}>
              全記事を見る →
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-5">
            {/* main big card */}
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.005]"
              style={{
                background: `linear-gradient(160deg, ${CARD2} 0%, #0A1A35 100%)`,
                border: `1px solid ${BORDER}`,
                minHeight: 420,
                boxShadow: `0 0 0 1px ${G}00, 0 20px 60px rgba(0,0,0,0.5)`,
              }}
            >
              {/* inner glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 0 0 1px ${G}30` }} />

              {/* decorative large number */}
              <div className="pointer-events-none absolute top-0 right-0 select-none overflow-hidden" aria-hidden="true">
                <span className="font-black" style={{ fontFamily: 'var(--font-playfair)', fontSize: '18rem', color: 'transparent', WebkitTextStroke: `1px ${G}09`, lineHeight: 0.8, display: 'block' }}>01</span>
              </div>

              <div className="relative p-8 md:p-10">
                <span
                  className="inline-block text-[10px] px-3 py-1.5 rounded-full font-bold tracking-[0.3em] uppercase mb-5"
                  style={{ background: `${G}18`, color: G, border: `1px solid ${G}30` }}
                >
                  {featuredArticle.label}
                </span>
                <h2
                  className="font-bold text-white leading-[1.15] mb-4 group-hover:text-[${G}] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)', letterSpacing: '-0.02em' }}
                >
                  {featuredArticle.title}
                </h2>
                <p className="text-[14px] leading-[1.7] mb-6" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '52ch' }}>
                  {featuredArticle.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold" style={{ color: G }}>
                  記事を読む
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </Link>

            {/* side cards */}
            <div className="flex flex-col gap-4">
              {sideArticles.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group flex-1 flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] px-2 py-1 rounded-full font-bold tracking-widest uppercase" style={{ background: `${G}12`, color: G, border: `1px solid ${G}20` }}>{a.label}</span>
                      <span className="text-[11px] font-black" style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.08)' }}>0{i + 2}</span>
                    </div>
                    <h3 className="text-[14px] font-semibold leading-[1.5] text-white/80 group-hover:text-white transition-colors">
                      {a.title}
                    </h3>
                  </div>
                  <span className="mt-4 text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>続きを読む →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MOURINHO — cinematic dark feature
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${BG2} 0%, #04060E 100%)`, borderTop: `1px solid ${BORDER}` }}
      >
        {/* giant text watermark */}
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-start overflow-hidden" aria-hidden="true" style={{ paddingLeft: '5vw' }}>
          <span
            className="font-black"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(100px, 22vw, 340px)',
              color: 'transparent',
              WebkitTextStroke: `1px ${G}06`,
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
            }}
          >
            MOUR
            <br />
            INHO
          </span>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 py-24 md:py-36">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] w-10" style={{ background: G }} />
                <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>The Special One</span>
              </div>
              <h2
                className="font-black text-white leading-[0.88] mb-8"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(3rem, 6.5vw, 6rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                ジョゼ・
                <br />
                <span style={{ color: G }}>モウリーニョ</span>
              </h2>
              <p className="text-[15px] leading-[1.8] mb-8" style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '42ch' }}>
                FCポルト・チェルシー・インテル・マドリード・マンU・ローマと欧州を渡り歩き、
                どのクラブでもタイトルをもたらした「スペシャル・ワン」。
                その哲学・名言・采配の美学を徹底解剖する。
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['CL×2', 'リーガ×1', 'プレミア×3', 'セリエA×2', 'コンファレンス×1'].map((t) => (
                  <span key={t} className="text-[11px] px-3 py-1.5 rounded-full font-semibold" style={{ background: `${G}10`, border: `1px solid ${G}25`, color: G }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/mourinho"
                className="inline-block px-8 py-4 rounded-xl font-bold text-[15px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG, letterSpacing: '-0.01em' }}
              >
                モウリーニョ全語録を読む →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { quote: 'I am The Special One.', ja: '私こそが、スペシャル・ワンだ。' },
                { quote: 'I am not in the business of losing.', ja: '私は負けるビジネスをしていない。' },
                { quote: 'Pressure? What is pressure? Pressure is poor people in the world trying to feed their families.', ja: 'プレッシャーとは、食べさせる家族のいる貧しい人々のものだ。' },
              ].map(({ quote, ja }) => (
                <blockquote
                  key={quote}
                  className="rounded-2xl px-7 py-6"
                  style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${BORDER}` }}
                >
                  <p className="text-[14px] italic leading-relaxed mb-2.5" style={{ fontFamily: 'var(--font-playfair)', color: G }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.22)' }}>{ja}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ARTICLES — asymmetric grid
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6" style={{ background: BG }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>Articles</span>
                <div className="w-10 h-px" style={{ background: BORDER }} />
              </div>
              <h2
                className="font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}
              >
                特集記事
              </h2>
            </div>
            <Link href="/blog" className="text-[13px] font-medium transition-colors pb-1" style={{ color: 'rgba(255,255,255,0.25)', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
              全記事 →
            </Link>
          </div>

          {/* grid: wide + narrow */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentArticles.map((a, i) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className={`group flex flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  minHeight: i === 0 ? 200 : 170,
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] px-2.5 py-1 rounded-full font-bold tracking-widest uppercase" style={{ background: `${G}12`, color: G, border: `1px solid ${G}20` }}>
                    {a.label}
                  </span>
                  <span className="font-black text-[11px]" style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.07)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className={`font-semibold leading-[1.5] text-white/75 group-hover:text-white transition-colors duration-200 flex-1 ${i === 0 ? 'text-[16px]' : 'text-[13px]'}`}
                >
                  {a.title}
                </h3>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.18)' }}>続きを読む</span>
                  <span className="text-[12px] transition-transform duration-200 group-hover:translate-x-1" style={{ color: 'rgba(255,255,255,0.18)' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LEGENDS — numbered roster
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ background: BG2, borderTop: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>Legends</span>
                <div className="w-10 h-px" style={{ background: BORDER }} />
              </div>
              <h2
                className="font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}
              >
                銀河系の伝説たち
              </h2>
            </div>
            <Link href="/blog" className="text-[13px] font-medium pb-1" style={{ color: 'rgba(255,255,255,0.25)', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
              全選手記事 →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {playerSpotlight.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex items-center gap-5 rounded-2xl px-6 py-5 transition-all duration-200 hover:bg-white/[0.04]"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                {/* number */}
                <span
                  className="shrink-0 font-black text-[1.8rem] w-10 tabular-nums leading-none"
                  style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] px-1.5 py-0.5 rounded font-bold tracking-widest uppercase" style={{ background: `${G}15`, color: G }}>
                      {p.pos}
                    </span>
                    <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{p.era}</span>
                  </div>
                  <p className="text-[14px] font-semibold text-white truncate">{p.name}</p>
                </div>
                <span
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: 'rgba(255,255,255,0.15)' }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TOOL CTA — white section, high contrast
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex-1 h-px bg-black/8" />
            <span className="text-[10px] tracking-[0.55em] font-bold uppercase shrink-0" style={{ color: G }}>Best XI Maker</span>
            <div className="flex-1 h-px bg-black/8" />
          </div>
          <h2
            className="font-black text-[#0A0A0A] leading-[0.92] mb-7"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            あなたの夢の
            <br />
            <span style={{ color: G }}>マドリード</span>を
            <br />
            作れ
          </h2>
          <p className="text-[16px] leading-[1.75] max-w-md mx-auto mb-4" style={{ color: '#666' }}>
            ディ・ステファノからベリンガムまで——好きな選手を選んでベストイレブンを編成。
            AI能力査定・Xシェア機能を無料で。
          </p>
          <p className="text-[14px] italic mb-12" style={{ fontFamily: 'var(--font-playfair)', color: '#B8960C' }}>
            &ldquo;To be the best, you have to beat the best.&rdquo;
          </p>
          <Link
            href="/tool"
            className="inline-block px-12 py-5 rounded-2xl font-black text-[16px] transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: '#07090F', letterSpacing: '-0.01em' }}
          >
            ベストイレブンメーカーを使う →
          </Link>
          <div className="mt-8 flex flex-wrap gap-6 justify-center text-[12px]" style={{ color: '#BBB' }}>
            <span>✓ 完全無料</span>
            <span>✓ 登録不要</span>
            <span>✓ AI能力査定</span>
            <span>✓ Xシェア対応</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MEMBERS CTA
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6" style={{ background: BG }}>
        <div className="max-w-[1400px] mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${BG2} 0%, #081426 60%, #0A1830 100%)`,
              border: `1px solid ${BORDER}`,
              boxShadow: `0 0 80px ${G}0c, 0 20px 60px rgba(0,0,0,0.5)`,
            }}
          >
            {/* gold glow top-right */}
            <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${G}0a 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />

            <div className="relative px-8 py-12 md:px-16 md:py-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-8" style={{ background: G }} />
                  <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>Members Only</span>
                </div>
                <h2
                  className="font-black text-white leading-[0.92] mb-6"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
                >
                  モウリーニョ×マドリー
                  <br />
                  <span style={{ color: G }}>プレミアム会員</span>
                </h2>
                <p className="text-[15px] leading-[1.75] mb-10" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '44ch' }}>
                  全試合の戦術振り返り・モウリーニョ采配解剖・CL＆リーガレビューを会員限定で配信。
                  月額¥900でいつでもキャンセル可。
                </p>
                <Link
                  href="/members"
                  className="inline-block px-9 py-4 rounded-xl font-bold text-[15px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG, letterSpacing: '-0.01em' }}
                >
                  詳細を見る・登録する →
                </Link>
              </div>
              <div className="shrink-0 grid gap-4 w-full lg:w-60">
                {['全試合振り返りレビュー', 'モウリーニョ采配の深掘り', '戦術分析コラム（月2〜4本）', '会員限定掲示板'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[14px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <span className="font-bold shrink-0 text-[12px]" style={{ color: G }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          X / SNS
      ══════════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ background: BG2, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: BORDER }} />
            <span className="text-[10px] tracking-[0.55em] font-bold uppercase shrink-0" style={{ color: G }}>管理人のX</span>
            <div className="flex-1 h-px" style={{ background: BORDER }} />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-4 px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[14px]" style={{ background: `${G}18`, color: G, fontFamily: 'var(--font-playfair)' }}>U</div>
              <div>
                <p className="text-[13px] font-semibold text-white">ultras_rei</p>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>管理人 — マドリー＆モウリーニョ愛好家</p>
              </div>
            </div>
            <div className="px-6 py-6">
              <XTimeline username="ultras_rei" tweetLimit={5} />
            </div>
          </div>
        </div>
      </section>

      {/* BBS */}
      <BulletinBoard />

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-14">
            <div>
              <div className="font-black tracking-[0.1em] text-[18px] mb-2" style={{ fontFamily: 'var(--font-playfair)', color: G }}>ultrasrei.com</div>
              <p className="text-[12px] mb-1" style={{ color: 'rgba(255,255,255,0.22)' }}>レアル・マドリード ファンサイト — 非公式</p>
              <p className="text-[11px] italic" style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.1)' }}>Hala Madrid y nada más.</p>
            </div>
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-14 gap-y-3">
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
                <Link key={href} href={href} className="text-[12px] transition-colors" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="rounded-2xl p-6 mb-10 text-[11px] leading-[1.8]" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`, color: 'rgba(255,255,255,0.15)' }}>
            本サービスはサッカーファンが制作した<strong style={{ color: 'rgba(255,255,255,0.3)' }}>非公式の考察・分析コンテンツ</strong>です。
            UEFA・FIFA・レアル・マドリードCF、各クラブ・選手・関係機関とは一切の公式な関係を持ちません。
            選手能力値はAI（Claude by Anthropic）による推定であり、エンターテインメント目的のものです。
            権利侵害のご連絡は ren90no@hotmail.co.jp まで。
          </div>

          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.1)' }}>
            © 2024 ultrasrei.com — All trademarks and copyrights belong to their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

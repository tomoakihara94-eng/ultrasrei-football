import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BulletinBoard from '@/components/BulletinBoard';
import XTimeline from '@/components/XTimeline';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import { getNewsArticles } from '@/lib/newsArticles';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'レアル・マドリード ファンサイト | ultrasrei.com',
  description: 'レアル・マドリードを愛するファンが作る考察サイト。CL15回優勝クラブの歴史・選手・戦術・モウリーニョを徹底深掘り。',
  openGraph: {
    title: 'レアル・マドリード ファンサイト | ultrasrei.com',
    description: 'Hala Madrid y nada más. 欧州最強クラブの物語をファン目線で深掘り。',
    url: 'https://ultrasrei.com',
  },
};

/* ─── tokens ─────────────────────────── */
const BG    = '#060810';
const GLASS = 'rgba(255,255,255,0.035)';
const GLOW  = 'rgba(201,165,36,0.12)';
const G     = '#C9A524';
const GL    = '#F0D060';
const EDGE  = 'rgba(255,255,255,0.08)';
/* ──────────────────────────────────────── */

export default async function Home() {
  const newsArticles = await getNewsArticles(5);
  return (
    <div className="min-h-screen text-white" style={{ background: BG, fontFamily: 'var(--font-inter)' }}>

      {/* ══ HEADER ══════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: `${BG}cc`,
          borderBottom: `1px solid ${EDGE}`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-[58px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-black tracking-[0.08em] text-[15px]" style={{ fontFamily: 'var(--font-playfair)', color: G }}>
              ultrasrei
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.45em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
              Hala Madrid
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { href: '/blog', label: '記事' },
              { href: '/records', label: '記録集' },
              { href: '/quiz', label: 'CLクイズ' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="px-4 py-2 text-[13px] rounded-lg transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                {label}
              </Link>
            ))}
            <Link href="/mourinho"
              className="px-4 py-2 text-[13px] font-semibold"
              style={{ color: G }}>
              THE SPECIAL ONE
            </Link>
            <div className="w-px h-4 mx-3" style={{ background: EDGE }} />
            <Link href="/tool"
              className="px-5 py-2 rounded-lg text-[13px] font-bold transition-all hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG }}>
              ベストイレブンを作る
            </Link>
          </nav>

          <div className="flex md:hidden items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <Link href="/mourinho" className="shrink-0 px-3 py-1.5 text-[12px] font-semibold rounded-lg" style={{ color: G, border: `1px solid ${G}40` }}>モウリーニョ</Link>
            <Link href="/tool" className="shrink-0 px-3 py-1.5 text-[12px] font-bold rounded-lg" style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG }}>ツール</Link>
          </div>
        </div>
      </header>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: '100svh',
          paddingTop: 80,
          background: `radial-gradient(ellipse 100% 70% at 5% 50%, rgba(13,27,58,0.6) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 95% 10%, ${GLOW} 0%, transparent 50%), ${BG}`,
        }}
      >
        {/* huge bg text */}
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-end pr-[3vw] overflow-hidden" aria-hidden="true">
          <span className="font-black" style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(90px, 25vw, 380px)',
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: `1px rgba(201,165,36,0.06)`,
            textAlign: 'right',
          }}>
            REAL<br />MADRID
          </span>
        </div>

        {/* left accent line */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px]"
          style={{ background: `linear-gradient(to bottom, transparent, ${G}, transparent)` }} />

        <div className="relative max-w-[1440px] mx-auto px-6 w-full py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
            {/* left: headline */}
            <div>
              <div className="flex items-center gap-3 mb-9 hero-in" style={{ animationDelay: '0.1s' }}>
                <div className="h-px w-10" style={{ background: G }} />
                <span className="text-[10px] tracking-[0.6em] font-semibold uppercase" style={{ color: G }}>
                  Hala Madrid y nada más
                </span>
              </div>

              <h1 className="font-black leading-[0.88] mb-8 hero-in" style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                letterSpacing: '-0.04em',
                animationDelay: '0.25s',
              }}>
                <span className="text-white">史上最強</span>
                <br />
                <span style={{
                  background: `linear-gradient(135deg, ${GL} 0%, ${G} 40%, #A07C10 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  マドリー
                </span>
                <br />
                <span className="text-white">の物語</span>
              </h1>

              <p className="mb-12 leading-[1.75] hero-in" style={{
                color: 'rgba(255,255,255,0.38)',
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                maxWidth: '44ch',
                animationDelay: '0.45s',
              }}>
                ディ・ステファノの5連覇からベリンガムの新時代まで——
                CL15回優勝クラブの歴史・選手・戦術・名将を、
                マドリーを愛してやまないファンが深掘りする。
              </p>

              <div className="flex flex-wrap gap-3 hero-in" style={{ animationDelay: '0.6s' }}>
                <Link href="/blog"
                  className="px-8 py-4 rounded-xl font-bold text-[14px] transition-all hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG, letterSpacing: '-0.01em' }}>
                  記事を読む →
                </Link>
                <Link href="/mourinho"
                  className="px-8 py-4 rounded-xl font-bold text-[14px] transition-all hover:bg-white/5"
                  style={{ color: 'rgba(255,255,255,0.55)', border: `1.5px solid rgba(255,255,255,0.12)` }}>
                  モウリーニョ語録
                </Link>
              </div>
            </div>

            {/* right: glass stats card */}
            <div className="hidden lg:block w-[220px] shrink-0 hero-in" style={{ animationDelay: '0.5s' }}>
              <div className="rounded-2xl p-6 space-y-6 gold-glow-pulse" style={{
                background: GLASS,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}>
                {[
                  { v: '15',   l: 'CL制覇' },
                  { v: '36',   l: 'リーガ優勝' },
                  { v: '450+', l: 'CR7ゴール' },
                  { v: '1902', l: '年創設' },
                ].map(({ v, l }, i) => (
                  <div key={l}>
                    {i > 0 && <div className="h-px mb-6" style={{ background: EDGE }} />}
                    <div className="font-black leading-none" style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: '2.2rem',
                      letterSpacing: '-0.03em',
                      background: `linear-gradient(135deg, ${GL}, ${G})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{v}</div>
                    <div className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* scroll */}
        <div className="absolute bottom-10 left-6 flex items-center gap-3">
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, transparent, ${G}50)` }} />
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>scroll</span>
        </div>
      </section>

      {/* ══ FLAG BANNER ═════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(220px, 30vw, 420px)' }}>
        <Image
          src="/rm-flags.jpg"
          alt="マドリディスタの旗——ベルナベウの熱狂"
          fill
          className="object-cover object-center"
          priority={false}
          sizes="100vw"
        />
        {/* gradient overlays */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to right, ${BG} 0%, transparent 25%, transparent 75%, ${BG} 100%)`,
        }} />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to bottom, ${BG}99 0%, transparent 30%, transparent 70%, ${BG} 100%)`,
        }} />
        {/* center tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="text-[10px] tracking-[0.7em] font-bold uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Somos Madridistas
          </span>
          <p className="font-black tracking-[-0.03em] text-center" style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.6rem, 4vw, 3.5rem)',
            background: `linear-gradient(135deg, ${GL} 0%, ${G} 50%, #A07C10 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Hala Madrid y nada más
          </p>
        </div>
      </div>

      {/* ══ MARQUEE TICKER ══════════════════════════════ */}
      <div
        className="relative overflow-hidden py-3.5"
        style={{ borderTop: `1px solid ${EDGE}`, borderBottom: `1px solid ${EDGE}`, background: BG }}
      >
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, rep) =>
            ['CL 15回優勝', 'リーガ 36回優勝', '1902年創設', 'CR7 450+ ゴール', 'ジダン CL3連覇', '欧州最多タイトル', 'Hala Madrid y nada más', 'Somos Madridistas'].map((item) => (
              <span key={`${rep}-${item}`} className="flex items-center">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-7"
                  style={{ color: 'rgba(255,255,255,0.22)', whiteSpace: 'nowrap' }}>
                  {item}
                </span>
                <span style={{ color: G, fontSize: '7px' }}>✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══ LATEST NEWS ══════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: BG }}>
        <div className="max-w-[1440px] mx-auto">
          {/* header row */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>News</span>
              <div className="h-px w-10" style={{ background: EDGE }} />
              <span className="font-semibold text-white/70 text-[15px]" style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '-0.01em' }}>最新ニュース</span>
            </div>
            <Link href="/news" className="text-[12px] font-medium pb-px" style={{ color: 'rgba(255,255,255,0.22)', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
              全記事 →
            </Link>
          </div>

          {/* news grid */}
          {newsArticles.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.3)' }}>最新ニュースを取得中...</p>
          ) : (
            <ScrollReveal className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[200px]">
              {newsArticles.map((article, i) => {
                const isHero = i === 0;
                const spanCol = isHero ? 'lg:col-span-2' : '';
                const spanRow = isHero ? 'row-span-2' : '';
                const excerpt = article.content.replace(/\n/g, ' ').slice(0, 100);
                const dateStr = new Date(article.published_at).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', timeZone: 'Asia/Tokyo' });

                return (
                  <Link
                    key={article.id}
                    href={`/news/${article.id}`}
                    className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.015] ${spanCol} ${spanRow}`}
                    style={{
                      background: isHero
                        ? `linear-gradient(160deg, rgba(13,27,58,0.95) 0%, rgba(12,15,30,0.98) 100%)`
                        : GLASS,
                      border: `1px solid ${EDGE}`,
                      backdropFilter: !isHero ? 'blur(12px)' : undefined,
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: `inset 0 0 0 1px ${G}35` }} />

                    <div className={`relative ${isHero ? 'p-8 md:p-10' : 'p-5'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block text-[9px] px-2.5 py-1 rounded-full font-bold tracking-[0.3em] uppercase"
                          style={{ background: `${G}15`, color: G, border: `1px solid ${G}28` }}>
                          {article.source_name}
                        </span>
                        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{dateStr}</span>
                      </div>
                      <h3
                        className="font-semibold leading-[1.35] text-white/80 group-hover:text-white transition-colors"
                        style={{ fontSize: isHero ? 'clamp(1.1rem, 2.2vw, 1.8rem)' : '13px', letterSpacing: isHero ? '-0.02em' : undefined, fontFamily: isHero ? 'var(--font-playfair)' : undefined }}
                      >
                        {article.title}
                      </h3>
                      {isHero && (
                        <p className="mt-3 text-[13px] leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          {excerpt}
                        </p>
                      )}
                      {isHero && (
                        <span className="inline-flex items-center gap-1.5 mt-5 text-[12px] font-semibold" style={{ color: G }}>
                          読む <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      )}
                    </div>

                    {!isHero && (
                      <div className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(6,8,16,0.7) 0%, transparent 60%)' }} />
                    )}
                  </Link>
                );
              })}
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ══ MOURINHO ════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, rgba(4,5,12,1) 0%, rgba(8,10,20,1) 100%)`, borderTop: `1px solid ${EDGE}` }}
      >
        {/* bg letterform */}
        <div className="pointer-events-none select-none absolute inset-0 overflow-hidden flex items-center" aria-hidden="true">
          <span className="font-black" style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(160px, 28vw, 420px)',
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: `1px ${G}05`,
            paddingLeft: '3vw',
          }}>
            THE<br />ONE
          </span>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 py-28 md:py-40">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-9">
                <div className="h-px w-10" style={{ background: G }} />
                <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>The Special One</span>
              </div>
              <h2 className="font-black leading-[0.88] mb-8" style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                letterSpacing: '-0.04em',
              }}>
                <span className="text-white">ジョゼ・</span>
                <br />
                <span style={{
                  background: `linear-gradient(135deg, ${GL}, ${G})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  モウリーニョ
                </span>
              </h2>
              <p className="text-[15px] leading-[1.8] mb-9" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '40ch' }}>
                FCポルト・チェルシー・インテル・マドリード・マンU・ローマ——
                どのクラブでもタイトルをもたらした「スペシャル・ワン」の哲学を徹底解剖する。
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['CL×2', 'リーガ×1', 'プレミア×3', 'セリエA×2', 'コンファレンス×1'].map((t) => (
                  <span key={t} className="text-[11px] px-3 py-1.5 rounded-full font-semibold"
                    style={{ background: `${G}10`, border: `1px solid ${G}22`, color: `${G}cc` }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link href="/mourinho"
                className="inline-block px-8 py-4 rounded-xl font-bold text-[14px] transition-all hover:brightness-110 hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG, letterSpacing: '-0.01em' }}>
                モウリーニョ全語録を読む →
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={120} className="space-y-3">
              {[
                { quote: 'I am The Special One.', ja: '私こそが、スペシャル・ワンだ。' },
                { quote: 'I am not in the business of losing.', ja: '私は負けるビジネスをしていない。' },
                { quote: 'Pressure? What is pressure? Pressure is poor people in the world trying to feed their families.', ja: 'プレッシャーとは、食べさせる家族のいる貧しい人々のものだ。' },
              ].map(({ quote, ja }) => (
                <blockquote key={quote} className="rounded-2xl px-7 py-6"
                  style={{ background: GLASS, border: `1px solid ${EDGE}`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                  <p className="text-[13px] italic leading-relaxed mb-2.5" style={{ fontFamily: 'var(--font-playfair)', color: G }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{ja}</p>
                </blockquote>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ═════════════════════════════════ */}
      <section style={{ background: BG, borderTop: `1px solid ${EDGE}`, borderBottom: `1px solid ${EDGE}` }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { to: 15,   suffix: '',   l: 'CL制覇',      d: '欧州最多記録' },
              { to: 36,   suffix: '',   l: 'リーガ優勝',  d: 'スペイン最多' },
              { to: 1902, suffix: '',   l: '年創設',      d: '120年以上の歴史' },
              { to: 450,  suffix: '+',  l: 'CR7ゴール',   d: '在籍9シーズン' },
            ].map(({ to, suffix, l, d }, i, arr) => (
              <div key={l} className="py-10 px-6"
                style={{ borderRight: i < arr.length - 1 ? `1px solid ${EDGE}` : 'none' }}>
                <CountUp to={to} suffix={suffix} style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)',
                  letterSpacing: '-0.04em',
                  fontWeight: 900,
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '0.5rem',
                  background: `linear-gradient(135deg, ${GL} 0%, ${G} 60%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }} />
                <div className="text-[13px] font-semibold text-white mb-1">{l}</div>
                <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.22)' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TOOL CTA — white ════════════════════════════ */}
      <section className="bg-white py-32 md:py-44 px-6" style={{ borderTop: `1px solid rgba(0,0,0,0.06)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex-1 h-px bg-black/8" />
            <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>Best XI Maker</span>
            <div className="flex-1 h-px bg-black/8" />
          </div>
          <h2 className="font-black text-[#060810] leading-[0.9] mb-8" style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            letterSpacing: '-0.04em',
          }}>
            あなたの夢の<br />
            <span style={{
              background: `linear-gradient(135deg, #A07C10 0%, ${G} 40%, ${GL} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>イレブン</span>
            <br />を作れ
          </h2>
          <p className="text-[16px] leading-[1.75] max-w-md mx-auto mb-4" style={{ color: '#666' }}>
            ディ・ステファノからベリンガムまで——自由に選んでベストイレブンを編成。
            AI能力査定・Xシェア機能を無料で。
          </p>
          <p className="italic mb-14 text-[14px]" style={{ fontFamily: 'var(--font-playfair)', color: '#A07C10' }}>
            &ldquo;To be the best, you have to beat the best.&rdquo;
          </p>
          <Link
            href="/tool"
            className="inline-block px-14 py-5 rounded-2xl font-black text-[16px] transition-all hover:scale-[1.03] hover:shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG, letterSpacing: '-0.02em' }}
          >
            ベストイレブンメーカーを使う →
          </Link>
          <div className="mt-10 flex flex-wrap gap-8 justify-center text-[12px]" style={{ color: '#BBB' }}>
            <span>✓ 完全無料</span><span>✓ 登録不要</span><span>✓ AI能力査定</span><span>✓ Xシェア対応</span>
          </div>
        </div>
      </section>

      {/* ══ MEMBERS ═════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: BG }}>
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: `linear-gradient(135deg, rgba(10,18,40,0.98) 0%, rgba(8,12,28,0.98) 100%)`,
              border: `1px solid ${EDGE}`,
              boxShadow: `0 0 100px ${GLOW}, 0 30px 80px rgba(0,0,0,0.6)`,
            }}
          >
            {/* corner glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full" style={{ background: `radial-gradient(circle, ${G}0d 0%, transparent 70%)` }} />

            {/* blur overlay */}
            <div className="absolute inset-0 z-10" style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', background: 'rgba(8,12,28,0.6)' }} />

            {/* coming soon badge */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 text-center">
              <span className="text-[9px] tracking-[0.6em] font-bold uppercase" style={{ color: G }}>Coming Soon</span>
              <h2 className="font-black leading-[0.88]" style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                letterSpacing: '-0.04em',
                background: `linear-gradient(135deg, ${GL}, ${G})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                準備中
              </h2>
              <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
                このコンテンツは近日公開予定です
              </p>
            </div>

            {/* blurred background content */}
            <div className="relative px-8 py-14 md:px-16 md:py-18 flex flex-col lg:flex-row gap-14 lg:gap-24 items-center select-none pointer-events-none" aria-hidden="true">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8" style={{ background: G }} />
                  <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>Members Only</span>
                </div>
                <h2 className="font-black text-white leading-[0.9] mb-7" style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  letterSpacing: '-0.03em',
                }}>
                  モウリーニョ×マドリー
                  <br />
                  <span style={{
                    background: `linear-gradient(135deg, ${GL}, ${G})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    プレミアム会員
                  </span>
                </h2>
                <p className="text-[15px] leading-[1.75] mb-10" style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '44ch' }}>
                  全試合の戦術振り返り・モウリーニョ采配解剖・CL＆リーガレビューを会員限定で配信。月額¥900でいつでもキャンセル可。
                </p>
                <div className="inline-block px-9 py-4 rounded-xl font-bold text-[15px]"
                  style={{ background: `linear-gradient(135deg, ${G}, ${GL})`, color: BG, letterSpacing: '-0.01em' }}>
                  詳細を見る・登録する →
                </div>
              </div>
              <div className="shrink-0 grid gap-4 w-full lg:w-56">
                {['全試合振り返りレビュー', 'モウリーニョ采配の深掘り', '戦術分析コラム（月2〜4本）', '会員限定掲示板'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    <span className="font-bold text-[11px] shrink-0" style={{ color: G }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ X / SNS ══════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ background: BG, borderTop: `1px solid ${EDGE}` }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: EDGE }} />
            <span className="text-[10px] tracking-[0.55em] font-bold uppercase" style={{ color: G }}>管理人のX</span>
            <div className="flex-1 h-px" style={{ background: EDGE }} />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background: GLASS, border: `1px solid ${EDGE}`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <div className="flex items-center gap-4 px-6 py-4" style={{ borderBottom: `1px solid ${EDGE}` }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[14px]" style={{ background: `${G}18`, color: G, fontFamily: 'var(--font-playfair)' }}>U</div>
              <div>
                <p className="text-[13px] font-semibold text-white">ultras_rei</p>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.22)' }}>管理人 — マドリー＆モウリーニョ愛好家</p>
              </div>
            </div>
            <div className="px-6 py-6"><XTimeline username="ultras_rei" tweetLimit={5} /></div>
          </div>
        </div>
      </section>

      {/* BBS */}
      <BulletinBoard />

      {/* ══ FOOTER ══════════════════════════════════════ */}
      <footer style={{ background: BG, borderTop: `1px solid ${EDGE}` }}>
        <div className="max-w-[1440px] mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-14">
            <div>
              <div className="font-black tracking-[0.08em] text-[18px] mb-2" style={{ fontFamily: 'var(--font-playfair)', color: G }}>ultrasrei.com</div>
              <p className="text-[12px] mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>マドリー ファンサイト — 非公式</p>
              <p className="text-[11px] italic" style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.08)' }}>Hala Madrid y nada más.</p>
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
                <Link key={href} href={href} className="text-[12px] transition-colors" style={{ color: 'rgba(255,255,255,0.22)' }}>{label}</Link>
              ))}
            </nav>
          </div>
          <div className="rounded-2xl p-6 mb-10 text-[11px] leading-[1.8]"
            style={{ background: GLASS, border: `1px solid ${EDGE}`, color: 'rgba(255,255,255,0.14)' }}>
            本サービスはサッカーファンが制作した<strong style={{ color: 'rgba(255,255,255,0.28)' }}>非公式の考察・分析コンテンツ</strong>です。
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

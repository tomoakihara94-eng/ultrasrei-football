import type { Metadata } from 'next';
import Link from 'next/link';
import { getNewsArticles } from '@/lib/newsArticles';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'サッカー戦術・歴史コラム | 欧州サッカー歴代ベストイレブンメーカー',
  description:
    'レアル・マドリードの歴史、4-3-3などの戦術分析、歴代名選手の考察まで。欧州サッカーを深く楽しむための専門コラム集。ディ・ステファノ、ロナウド、ベンゼマ、ジダンなど歴代スターを深掘りします。',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  });
}

export default async function BlogIndexPage() {
  const newsArticles = await getNewsArticles(30);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Header */}
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; トップへ戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴代ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">Football Column</p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 shimmer-text"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            サッカー戦術・歴史コラム
          </h1>
          <p className="text-[#888] max-w-2xl leading-relaxed">
            欧州サッカーの歴史と戦術を深く掘り下げる専門コラム。マドリーの栄光の歴史から、現代戦術の進化、歴代名選手の考察まで——サッカーをより深く、より面白く楽しむための読み物です。
          </p>
        </div>

        {/* News article list */}
        {newsArticles.length === 0 ? (
          <p className="text-[#555] text-sm text-center py-20">まだ記事がありません。</p>
        ) : (
          <div className="space-y-6">
            {newsArticles.map((article, i) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group block bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 md:p-8 hover:border-[#D4AF37]/40 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div
                    className="text-5xl font-black shrink-0 w-14 text-center leading-none"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#D4AF3720' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase"
                        style={{ color: '#D4AF37', backgroundColor: '#D4AF3718', border: '1px solid #D4AF3740' }}>
                        {article.source_name}
                      </span>
                      <span className="text-[10px] text-[#555]">{formatDate(article.published_at)}</span>
                    </div>
                    <h2
                      className="text-xl md:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-3 leading-snug"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {article.title}
                    </h2>
                    <p className="text-[#777] text-sm leading-relaxed line-clamp-2">
                      {article.content.replace(/\n/g, ' ')}
                    </p>
                    <div className="flex items-center mt-4">
                      <span className="text-[11px] text-[#D4AF37] group-hover:underline ml-auto">
                        記事を読む &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Tool CTA */}
        <div
          className="border-t border-[#1e1e1e] pt-10 mt-16"
          style={{
            padding: '32px 28px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: 16,
            textAlign: 'center',
            marginTop: 48,
          }}
        >
          <p style={{ color: '#D4AF37', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10 }}>
            Best Eleven Maker
          </p>
          <p className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            歴代名選手でベストイレブンを編成しよう
          </p>
          <p className="text-[#888] text-sm mb-6 leading-relaxed">
            AIが能力査定、フォーメーションを自動生成。作ったベストイレブンをXにシェアしよう。
          </p>
          <Link
            href="/tool"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
              color: '#0a0a0a',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            ベストイレブンを作る →
          </Link>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogPosts';
import BlogSearch from '@/components/BlogSearch';

export const metadata: Metadata = {
  title: 'サッカー戦術・歴史コラム | 欧州サッカー歴代ベストイレブンメーカー',
  description:
    'レアル・マドリードの歴史、4-3-3などの戦術分析、歴代名選手の考察まで。欧州サッカーを深く楽しむための専門コラム集。ディ・ステファノ、ロナウド、ベンゼマ、ジダンなど歴代スターを深掘りします。',
};

export default function BlogIndexPage() {
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
            欧州サッカーの歴史と戦術を深く掘り下げる専門コラム。レアル・マドリードの栄光の歴史から、現代戦術の進化、歴代名選手の考察まで——サッカーをより深く、より面白く楽しむための読み物です。
          </p>
        </div>

        {/* Search + Filter + List (client component) */}
        <BlogSearch posts={blogPosts} />

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

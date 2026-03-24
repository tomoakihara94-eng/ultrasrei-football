import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogPosts';

export const metadata: Metadata = {
  title: 'レアル・マドリード深掘りコラム | 欧州サッカー歴史的ベストイレブンメーカー',
  description:
    'レアル・マドリードの歴史を深掘りするコラム集。ディ・ステファノ、ガラクティコス、ジダン体制のCL3連覇、ベルナベウの歴史、そして新世代の継承まで。',
};

const ACCENT = '#D4AF37';

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Header */}
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; ツールに戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴史的ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">Real Madrid Column</p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 shimmer-text"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            レアル・マドリード深掘りコラム
          </h1>
          <p className="text-[#888] max-w-2xl leading-relaxed">
            欧州サッカーの王者レアル・マドリードが歩んできた歴史の断章。
            ディ・ステファノが刻んだ5連覇の奇跡から、ベリンガム世代による新章まで——
            白い巨人の魂を深く掘り下げる5本のコラム。
          </p>
        </div>

        {/* Article grid */}
        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 md:p-8 hover:border-[#D4AF37]/40 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Number */}
                <div
                  className="text-5xl font-black shrink-0 w-14 text-center leading-none"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#D4AF3720',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Content */}
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.25em] text-[#D4AF37]/70 uppercase mb-2">
                    {post.subtitle}
                  </p>
                  <h2
                    className="text-xl md:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-[#777] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-[11px] text-[#555]">{post.date}</span>
                    <span className="text-[11px] text-[#555]">{post.readTime}</span>
                    <span className="text-[11px] text-[#D4AF37] group-hover:underline ml-auto">
                      記事を読む &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer nav */}
        <div className="border-t border-[#1e1e1e] pt-10 mt-16 text-center">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            ベストイレブンを作る &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}

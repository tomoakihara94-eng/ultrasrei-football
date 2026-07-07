import type { Metadata } from 'next';
import Link from 'next/link';
import { getNewsArticles } from '@/lib/newsArticles';

export const metadata: Metadata = {
  title: '最新ニュース | 欧州サッカー歴代ベストイレブンメーカー',
  description:
    'MARCAのレアル・マドリード関連ニュースを自動翻訳・要約してお届けする最新ニュースまとめ。',
};

export const revalidate = 300;

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tokyo',
  });
}

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; トップへ戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴代ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">Latest News</p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            最新ニュース
          </h1>
        </div>

        {articles.length === 0 ? (
          <p className="text-[#666]">まだニュースがありません。</p>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="block border border-[#1e1e1e] rounded-lg p-6 bg-[#0d0d0d] hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3 text-xs text-[#666]">
                  <span className="text-[#D4AF37]">{article.source_name}</span>
                  <span>{formatDate(article.published_at)}</span>
                </div>
                <h2 className="text-xl font-bold mb-3">{article.title}</h2>
                <p className="text-[#ccc] leading-relaxed line-clamp-4 whitespace-pre-line">
                  {article.content}
                </p>
                <span className="inline-block mt-4 text-xs text-[#D4AF37] hover:text-[#F0D060] transition-colors">
                  続きを読む &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

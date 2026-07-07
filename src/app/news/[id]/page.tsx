import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsArticle } from '@/lib/newsArticles';

export const revalidate = 300;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsArticle(id);
  if (!article) return {};
  return {
    title: `${article.title} | ultrasrei.com`,
    description: article.content.slice(0, 120),
  };
}

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

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getNewsArticle(id);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/news" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; ニュース一覧へ
          </Link>
          <span className="text-xs text-[#555]">ultrasrei.com</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-6 text-xs text-[#666]">
          <span className="text-[#D4AF37] font-bold tracking-widest uppercase">{article.source_name}</span>
          <span>{formatDate(article.published_at)}</span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-10"
          style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '-0.02em' }}
        >
          {article.title}
        </h1>

        <div className="text-[#ccc] leading-[2] text-[15px] whitespace-pre-line">
          {article.content}
        </div>

        <div className="mt-12 pt-8 border-t border-[#1e1e1e]">
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#F0D060] transition-colors"
          >
            原文（MARCA）を読む &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}

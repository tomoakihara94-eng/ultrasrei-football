import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getBlogPost } from '@/lib/blogPosts';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | 欧州サッカーコラム`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://ultrasrei.com/blog/${slug}`,
      siteName: '欧州サッカー歴代ベストイレブンメーカー',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: 'Hara Tech', url: 'https://ultrasrei.com/about' },
    publisher: { '@type': 'Organization', name: 'Hara Tech', url: 'https://ultrasrei.com' },
    url: `https://ultrasrei.com/blog/${slug}`,
    inLanguage: 'ja',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://ultrasrei.com/blog/${slug}` },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Header */}
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blog" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; コラム一覧に戻る
          </Link>
          <span className="text-xs text-[#555]">{post.readTime}</span>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Label */}
        <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-4">
          {post.subtitle}
        </p>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-4 shimmer-text"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#555] mb-6 pb-6 border-b border-[#1e1e1e]">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-5 py-4 mb-10">
          <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
            <span className="text-[#D4AF37] text-xs font-bold">H</span>
          </div>
          <div>
            <p className="text-xs text-white font-semibold">Hara Tech 編集部</p>
            <p className="text-[10px] text-[#555] leading-relaxed mt-0.5">
              欧州サッカー専門メディア「ultrasrei.com」編集部。プレミアリーグ・ラ・リーガ・セリエAを中心に、戦術・歴史・選手考察を発信。
            </p>
          </div>
          <a
            href="/about"
            className="ml-auto text-[10px] text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors shrink-0"
          >
            詳細 →
          </a>
        </div>

        {/* Lead */}
        <p className="text-[#aaa] text-base leading-relaxed mb-12 border-l-2 border-[#D4AF37]/40 pl-5 italic">
          {post.excerpt}
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {post.sections.map((section, si) => (
            <section key={si}>
              {section.heading && (
                <h2
                  className="text-xl font-bold text-[#D4AF37] mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((para, pi) => (
                  <p key={pi} className="text-[#bbb] leading-[1.9] text-[15px]">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Article navigation */}
        <div className="border-t border-[#1e1e1e] mt-16 pt-10 grid grid-cols-2 gap-4">
          <div>
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="group block bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-4 hover:border-[#D4AF37]/40 transition-all"
              >
                <p className="text-[10px] text-[#555] mb-1">&larr; 前の記事</p>
                <p className="text-xs text-[#aaa] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                  {prev.title}
                </p>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group block bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-4 hover:border-[#D4AF37]/40 transition-all text-right"
              >
                <p className="text-[10px] text-[#555] mb-1">次の記事 &rarr;</p>
                <p className="text-xs text-[#aaa] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </div>

        {/* Back to list */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-block text-[#D4AF37] border border-[#D4AF37]/40 rounded-lg px-6 py-2 text-sm hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            コラム一覧を見る
          </Link>
        </div>
      </article>
    </div>
  );
}

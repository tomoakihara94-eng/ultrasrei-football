import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getBlogPost } from '@/lib/blogPosts';
import AdsenseUnit from '@/components/AdsenseUnit';

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
      publishedTime: post.date,
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

  // Pick 3 related posts (excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Hara Tech', url: 'https://ultrasrei.com/about' },
    publisher: {
      '@type': 'Organization',
      name: 'Hara Tech',
      url: 'https://ultrasrei.com',
      logo: { '@type': 'ImageObject', url: 'https://ultrasrei.com/logo.png' },
    },
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
        <p className="text-[#aaa] text-base leading-relaxed mb-8 border-l-2 border-[#D4AF37]/40 pl-5 italic">
          {post.excerpt}
        </p>

        {/* Ad unit after lead */}
        <AdsenseUnit />

        {/* Sections with ads every 3 sections */}
        <div className="space-y-10">
          {post.sections.map((section, si) => (
            <div key={si}>
              <section>
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
              {/* Insert ad after every 3rd section */}
              {(si + 1) % 3 === 0 && si < post.sections.length - 1 && (
                <AdsenseUnit />
              )}
            </div>
          ))}
        </div>

        {/* Ad unit before navigation */}
        <AdsenseUnit className="mt-6" />

        {/* Tool CTA */}
        <div
          style={{
            margin: '40px 0',
            padding: '28px 24px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 16,
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#D4AF37', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>
            Best Eleven Maker
          </p>
          <p style={{ color: '#eee', fontSize: 17, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-playfair)' }}>
            あなたの歴代ベストイレブンを作ろう
          </p>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
            レアル・マドリードの伝説たちを自由に組み合わせ、<br />あなただけのベストイレブンを編成してXにシェア。
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

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: 48, marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.25em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: 16 }}>
              Related Articles
            </p>
            <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginBottom: 20, fontFamily: 'var(--font-playfair)' }}>
              関連コラム
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    background: '#0f0f0f',
                    border: '1px solid #1e1e1e',
                    borderRadius: 12,
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  className="hover:border-[#D4AF37]/40"
                >
                  <p style={{ fontSize: 10, color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {related.subtitle}
                  </p>
                  <p style={{ color: '#ddd', fontSize: 14, fontWeight: 600, lineHeight: 1.5, marginBottom: 6 }}>
                    {related.title}
                  </p>
                  <p style={{ color: '#666', fontSize: 12, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Article navigation */}
        <div className="border-t border-[#1e1e1e] mt-8 pt-10 grid grid-cols-2 gap-4">
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

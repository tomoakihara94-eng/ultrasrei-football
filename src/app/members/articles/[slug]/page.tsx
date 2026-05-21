'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { PremiumPost } from '@/lib/premiumPosts';

export default function PremiumArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PremiumPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = `/members/login?redirect=/members/articles/${slug}`;
        return;
      }
      const res = await fetch(`/api/premium/articles/${slug}`, {
        headers: { authorization: `Bearer ${session.access_token}` },
      });
      if (res.status === 403) { window.location.href = '/members'; return; }
      if (res.status === 404) { window.location.href = '/members/articles'; return; }
      const { post } = await res.json();
      setPost(post);
      setLoading(false);
    };
    init();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-[#D4AF37] text-sm">読み込み中…</div>
      </div>
    );
  }
  if (!post) return null;

  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/members/articles" className="text-[#D4AF37] text-sm hover:text-[#F0D060]">
            &larr; 記事一覧
          </Link>
          <span className="text-[10px] tracking-widest text-[#444] uppercase">Members Only</span>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Match badge */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span
            className="text-[9px] px-3 py-1 rounded-full font-bold tracking-wider uppercase"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}
          >
            {post.competition}
          </span>
          <span className="text-[#444] text-xs self-center">{post.date}</span>
        </div>

        {/* Score */}
        <p className="text-[#D4AF37] font-black text-lg mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
          {post.match}
        </p>

        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-6 text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
          {post.title}
        </h1>

        <p className="text-[#888] text-base leading-relaxed mb-10 border-l-2 border-[#D4AF37]/40 pl-5 italic">
          {post.excerpt}
        </p>

        {/* Gold divider */}
        <div className="h-px mb-10" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />

        {/* Sections */}
        <div className="space-y-10">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-xl font-bold text-[#D4AF37] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="text-[#bbb] leading-[1.9] text-[15px]">{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full border border-[#222] text-[#555]">{tag}</span>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/members/articles"
            className="inline-block text-[#D4AF37] border border-[#D4AF37]/40 rounded-lg px-6 py-2 text-sm hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            記事一覧に戻る
          </Link>
        </div>
      </article>
    </div>
  );
}

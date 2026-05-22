'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseBrowser';
import type { PremiumPost } from '@/lib/premiumPosts';

type ListPost = Omit<PremiumPost, 'sections'>;

export default function MembersArticlesPage() {
  const [posts, setPosts] = useState<ListPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/members/login?redirect=/members/articles';
        return;
      }
      const res = await fetch('/api/premium/articles', {
        headers: { authorization: `Bearer ${session.access_token}` },
      });
      if (res.status === 403) {
        window.location.href = '/members';
        return;
      }
      const { posts } = await res.json();
      setPosts(posts ?? []);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-[#D4AF37] text-sm">読み込み中…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/members/dashboard" className="text-[#D4AF37] text-sm hover:text-[#F0D060]">
            &larr; ダッシュボード
          </Link>
          <span className="text-[10px] tracking-widest text-[#444] uppercase">Members Only</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-3 font-semibold">Premium Articles</p>
        <h1 className="text-3xl font-black mb-10" style={{ fontFamily: 'var(--font-playfair)' }}>
          会員限定 試合レビュー
        </h1>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/members/articles/${post.slug}`}
              className="group block rounded-xl p-6 transition-all"
              style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}
                >
                  {post.competition}
                </span>
                <span className="text-[#444] text-[10px]">{post.date}</span>
              </div>
              <p className="text-[#D4AF37]/80 text-xs font-bold mb-1">{post.match}</p>
              <h2 className="text-white text-base font-bold leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors">
                {post.title}
              </h2>
              <p className="text-[#666] text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full text-[#555] border border-[#222]">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

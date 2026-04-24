'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blogPosts';
import { BlogTag, ALL_TAGS, postTags } from '@/lib/blogTags';

const TAG_COLORS: Record<BlogTag, string> = {
  'レアル・マドリード': '#D4AF37',
  'バルセロナ': '#a855f7',
  '選手列伝': '#3b82f6',
  '戦術・歴史': '#22c55e',
  'チャンピオンズリーグ': '#f97316',
};

export default function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<BlogTag | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        !activeTag || (postTags[post.slug] ?? []).includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <>
      {/* Search input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="選手名・キーワードで検索…"
          className="w-full bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-5 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#aaa] text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className="px-4 py-1.5 rounded-full text-xs font-medium transition-all border"
          style={{
            backgroundColor: activeTag === null ? '#D4AF37' : 'transparent',
            color: activeTag === null ? '#000' : '#888',
            borderColor: activeTag === null ? '#D4AF37' : '#333',
          }}
        >
          すべて（{posts.length}）
        </button>
        {ALL_TAGS.map((tag) => {
          const count = posts.filter((p) =>
            (postTags[p.slug] ?? []).includes(tag)
          ).length;
          const isActive = activeTag === tag;
          const color = TAG_COLORS[tag];
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(isActive ? null : tag)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all border"
              style={{
                backgroundColor: isActive ? color : 'transparent',
                color: isActive ? '#000' : '#888',
                borderColor: isActive ? color : '#333',
              }}
            >
              {tag}（{count}）
            </button>
          );
        })}
      </div>

      {/* Result count */}
      {(query || activeTag) && (
        <p className="text-xs text-[#555] mb-6">
          {filtered.length} 件の記事が見つかりました
        </p>
      )}

      {/* Article list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#555]">
          <p className="text-lg mb-2">記事が見つかりませんでした</p>
          <p className="text-sm">別のキーワードやカテゴリで試してみてください</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((post, i) => {
            const tags = postTags[post.slug] ?? [];
            const globalIndex = posts.findIndex((p) => p.slug === post.slug);
            return (
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
                    {String(globalIndex + 1).padStart(2, '0')}
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
                    <p className="text-[#777] text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              color: TAG_COLORS[tag],
                              backgroundColor: `${TAG_COLORS[tag]}18`,
                              border: `1px solid ${TAG_COLORS[tag]}40`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
            );
          })}
        </div>
      )}
    </>
  );
}

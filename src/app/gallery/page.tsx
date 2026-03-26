'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, Heart, Eye, Clock, ChevronRight } from 'lucide-react';
import type { Player } from '@/types';

type GalleryItem = {
  id: string;
  team_name: string | null;
  formation: string;
  players: (Player | null)[];
  likes: number;
  view_count: number;
  created_at: string;
};

type SortKey = 'recent' | 'likes' | 'views';

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'たった今';
  if (m < 60) return `${m}分前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}時間前`;
  return `${Math.floor(h / 24)}日前`;
}

function FormationCard({ item, rank }: { item: GalleryItem; rank: number }) {
  const starterCount = item.players.filter(Boolean).length;
  const flags = item.players
    .filter(Boolean)
    .slice(0, 5)
    .map((p) => p!.flagEmoji)
    .join('');

  const rankColor =
    rank === 1 ? 'text-[#FFD700]' :
    rank === 2 ? 'text-[#C0C0C0]' :
    rank === 3 ? 'text-[#CD7F32]' : 'text-white/20';

  return (
    <Link
      href={`/formation/${item.id}`}
      className="group block bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-5 hover:border-[#D4AF37]/40 transition-all"
    >
      <div className="flex items-start gap-3">
        {/* rank */}
        <span
          className={`text-2xl font-black w-8 shrink-0 text-right leading-tight ${rankColor}`}
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {rank}
        </span>

        <div className="flex-1 min-w-0">
          {/* formation badge */}
          <span className="inline-block text-[10px] font-bold tracking-widest text-[#D4AF37]/60 uppercase mb-1">
            {item.formation}
          </span>

          {/* team name */}
          <h3
            className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate mb-1"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {item.team_name || '歴代ベストイレブン'}
          </h3>

          {/* flags */}
          {flags && (
            <div className="text-lg leading-none mb-2">{flags}</div>
          )}

          {/* stats row */}
          <div className="flex items-center gap-3 text-[11px] text-white/30">
            <span className="flex items-center gap-1">
              <Heart size={10} className="text-rose-400/60" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={10} />
              {item.view_count}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {timeAgo(item.created_at)}
            </span>
            <span className="ml-auto text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors">
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const SORT_OPTIONS: { key: SortKey; label: string; icon: typeof Heart }[] = [
  { key: 'recent', label: '新着順', icon: Clock },
  { key: 'likes',  label: 'いいね順', icon: Heart },
  { key: 'views',  label: 'アクセス順', icon: Eye },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [sort, setSort] = useState<SortKey>('recent');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/formations?sort=${sort}`)
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sort]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Header */}
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#D4AF37] hover:text-[#F0D060] transition-colors">
            <Trophy size={16} />
            <span className="text-sm font-bold">ベストイレブンメーカー</span>
          </Link>
          <span className="text-xs text-[#555]">みんなのフォーメーション</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-2">Gallery</p>
          <h1
            className="text-3xl md:text-4xl font-bold shimmer-text mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            みんなのフォーメーション
          </h1>
          <p className="text-[#666] text-sm">
            ユーザーが作成・公開したベストイレブン一覧。いいねで評価しよう。
          </p>
        </div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 mb-6 w-fit">
          {SORT_OPTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSort(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                sort === key
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon size={11} />
              {label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#D4AF37]/40 border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/25 mb-4">まだ投稿がありません。</p>
            <Link href="/" className="text-[#D4AF37] text-sm hover:underline">
              最初のフォーメーションを作る →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <FormationCard key={item.id} item={item} rank={i + 1} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block text-[#D4AF37] border border-[#D4AF37]/40 rounded-lg px-6 py-2 text-sm hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            自分のフォーメーションを作る →
          </Link>
        </div>
      </main>
    </div>
  );
}

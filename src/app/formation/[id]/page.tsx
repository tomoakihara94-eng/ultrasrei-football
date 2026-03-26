'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Trophy, Copy, Check, Send } from 'lucide-react';
import TacticalBoard from '@/components/TacticalBoard';
import type { Player, Formation } from '@/types';
import type { Comment } from '@/lib/supabase';

type FormationData = {
  id: string;
  team_name: string | null;
  formation: string;
  players: (Player | null)[];
  bench: (Player | null)[];
  manager_style: string | null;
  custom_positions: Record<number, { x: number; y: number }>;
  created_at: string;
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'たった今';
  if (m < 60) return `${m}分前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}時間前`;
  return `${Math.floor(h / 24)}日前`;
}

function CommentSection({ formationId }: { formationId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/formations/${formationId}/comments`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setComments(data));
  }, [formationId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nickname.trim() || !body.trim()) return;
    setSubmitting(true);
    setError('');
    const res = await fetch(`/api/formations/${formationId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, body }),
    });
    setSubmitting(false);
    if (!res.ok) {
      setError('送信に失敗しました。');
      return;
    }
    const newComment = await res.json();
    setComments((prev) => [...prev, newComment]);
    setBody('');
  }

  return (
    <section className="mt-10">
      <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">
        コメント ({comments.length})
      </h2>

      {/* Comment list */}
      <div className="space-y-3 mb-6">
        {comments.length === 0 && (
          <p className="text-white/25 text-sm">まだコメントはありません。最初の一言を！</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#D4AF37]">{c.nickname}</span>
              <span className="text-[10px] text-white/25">{timeAgo(c.created_at)}</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>

      {/* Post form */}
      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 space-y-3">
        <h3 className="text-xs text-white/40 uppercase tracking-widest">コメントを投稿</h3>
        <input
          type="text"
          placeholder="ニックネーム（30文字以内）"
          value={nickname}
          maxLength={30}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/60 text-sm"
        />
        <textarea
          placeholder="このフォーメーションへの感想・意見（300文字以内）"
          value={body}
          maxLength={300}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/60 text-sm resize-none"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-white/20">{body.length}/300</span>
          <button
            type="submit"
            disabled={submitting || !nickname.trim() || !body.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#D4AF37] text-black text-xs font-bold disabled:opacity-40 transition-opacity"
          >
            <Send size={12} />
            {submitting ? '送信中...' : '投稿する'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function FormationPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<FormationData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/formations/${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => d && setData(d));
  }, [id]);

  async function copyUrl() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">フォーメーションが見つかりませんでした。</p>
          <Link href="/" className="text-[#D4AF37] text-sm hover:underline">トップに戻る</Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#D4AF37]/40 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  const starterCount = data.players.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Header */}
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#D4AF37] hover:text-[#F0D060] transition-colors">
            <Trophy size={16} />
            <span className="text-sm font-bold">ベストイレブンメーカー</span>
          </Link>
          <button
            onClick={copyUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D4AF37]/40 rounded-lg text-xs text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'コピー済み' : 'URLをコピー'}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-[1fr_360px] gap-8">
        {/* Left: board */}
        <div>
          <div className="mb-4">
            <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">{data.formation}</p>
            <h1
              className="text-2xl font-bold shimmer-text"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {data.team_name || '歴代ベストイレブン'}
            </h1>
            <p className="text-xs text-white/25 mt-1">{starterCount}/11人 · {new Date(data.created_at).toLocaleDateString('ja-JP')}</p>
          </div>

          <TacticalBoard
            players={data.players}
            formation={data.formation as Formation}
            onSlotClick={() => {}}
            freeMode={Object.keys(data.custom_positions ?? {}).length > 0}
            customPositions={data.custom_positions ?? {}}
          />
        </div>

        {/* Right: roster + comments */}
        <div>
          {/* Starters */}
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-4 mb-4">
            <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3">スターター</h2>
            <div className="space-y-1.5">
              {data.players.map((p, i) =>
                p ? (
                  <div key={i} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-white/3">
                    <span className="text-base leading-none">{p.flagEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{p.name}</div>
                      <div className="text-[10px] text-white/30">{p.position}</div>
                    </div>
                    {p.stats && (
                      <span className="text-xs font-bold text-[#D4AF37]">
                        {Math.round(Object.values(p.stats).reduce((a, b) => a + b, 0) / 6)}
                      </span>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Bench */}
          {data.bench?.some(Boolean) && (
            <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-4 mb-4">
              <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3">ベンチ</h2>
              <div className="space-y-1.5">
                {data.bench.map((p, i) =>
                  p ? (
                    <div key={i} className="flex items-center gap-2.5 px-2 py-1.5">
                      <span className="text-base leading-none">{p.flagEmoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-white/60 truncate">{p.name}</div>
                        <div className="text-[10px] text-white/25">{p.position}</div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Comments */}
          <CommentSection formationId={id} />
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';

type Post = {
  id: string;
  nickname: string;
  body: string;
  created_at: string;
};

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  return `${Math.floor(diff / 86400)}日前`;
}

export default function BulletinBoard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nickname, setNickname] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/bbs');
      if (res.ok) setPosts(await res.json());
    } catch {}
  };

  useEffect(() => {
    fetchPosts();
    const id = setInterval(fetchPosts, 30000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/bbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, body }),
      });
      if (res.ok) {
        const newPost = await res.json();
        setPosts((prev) => [newPost, ...prev]);
        setBody('');
      } else {
        const json = await res.json();
        setError(json.error ?? '投稿に失敗しました');
      }
    } catch {
      setError('投稿に失敗しました');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="border-t border-[#1e1e1e] bg-[#0a0a0a] px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase mb-1">BBS</p>
        <h2
          className="text-2xl font-bold text-white mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          みんなの掲示板
        </h2>

        {/* 投稿フォーム */}
        <form onSubmit={handleSubmit} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-5 mb-6">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="名前（省略で匿名）"
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, 20))}
              className="w-36 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#D4AF37]/50"
            />
            <span className="text-[#333] text-xs self-center">{nickname.length}/20</span>
          </div>
          <textarea
            placeholder="ベストイレブンの感想・おすすめ選手・サッカー談義など（200文字以内）"
            value={body}
            onChange={(e) => setBody(e.target.value.slice(0, 200))}
            rows={3}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#D4AF37]/50 resize-none mb-2"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#444]">{body.length}/200</span>
            {error && <span className="text-xs text-red-400">{error}</span>}
            <button
              type="submit"
              disabled={sending || !body.trim()}
              className="px-4 py-1.5 rounded-lg bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-black text-xs font-bold transition-colors disabled:opacity-40"
            >
              {sending ? '送信中...' : '投稿'}
            </button>
          </div>
        </form>

        {/* 投稿一覧 */}
        <div className="space-y-3">
          {posts.length === 0 && (
            <p className="text-[#444] text-sm text-center py-8">まだ投稿がありません。最初の一言をどうぞ！</p>
          )}
          {posts.map((post, i) => (
            <div key={post.id} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-4 py-3 flex gap-3">
              <span className="text-[#333] text-xs shrink-0 mt-0.5 w-5 text-right">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#D4AF37] text-xs font-bold truncate">{post.nickname}</span>
                  <span className="text-[#333] text-xs shrink-0">{timeAgo(post.created_at)}</span>
                </div>
                <p className="text-[#ccc] text-sm leading-relaxed break-words">{post.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div ref={bottomRef} />
      </div>
    </section>
  );
}

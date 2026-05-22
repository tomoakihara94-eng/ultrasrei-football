'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseBrowser';

type MemberInfo = {
  subscription_status: string;
  current_period_end: string | null;
};

export default function DashboardPage() {
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/members/login?redirect=/members/dashboard';
        return;
      }
      setEmail(session.user.email ?? '');

      const res = await fetch('/api/premium/articles', {
        headers: { authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        // 購読中と判定
        setMemberInfo({ subscription_status: 'active', current_period_end: null });
      } else {
        // 未購読
        const { data } = await supabase
          .from('members')
          .select('subscription_status, current_period_end')
          .eq('user_id', session.user.id)
          .single();
        setMemberInfo(data ?? { subscription_status: 'inactive', current_period_end: null });
      }
      setLoading(false);
    };
    init();
  }, []);

  const handlePortal = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    setPortalLoading(true);
    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { authorization: `Bearer ${session.access_token}` },
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <div className="text-[#D4AF37] text-sm">読み込み中…</div>
      </div>
    );
  }

  const isActive = memberInfo?.subscription_status === 'active';

  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060]">&larr; トップへ</Link>
          <button onClick={handleLogout} className="text-[#444] text-xs hover:text-white transition-colors">
            ログアウト
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-3">Members Dashboard</p>
        <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>マイページ</h1>
        <p className="text-[#555] text-xs mb-10">{email}</p>

        {/* Status */}
        <div
          className="rounded-2xl p-6 mb-8 flex items-center justify-between"
          style={{
            background: isActive ? 'rgba(212,175,55,0.06)' : '#0d0d0d',
            border: isActive ? '1px solid rgba(212,175,55,0.3)' : '1px solid #1a1a1a',
          }}
        >
          <div>
            <p className="text-xs text-[#666] mb-1">サブスクリプション</p>
            <p className="font-bold text-sm" style={{ color: isActive ? '#D4AF37' : '#555' }}>
              {isActive ? '● アクティブ' : '● 未登録'}
            </p>
            {memberInfo?.current_period_end && (
              <p className="text-[#444] text-xs mt-1">
                次回請求日: {new Date(memberInfo.current_period_end).toLocaleDateString('ja-JP')}
              </p>
            )}
          </div>
          {isActive ? (
            <button
              onClick={handlePortal}
              disabled={portalLoading}
              className="text-xs px-4 py-2 rounded-lg border border-[#333] text-[#666] hover:text-white transition-colors disabled:opacity-50"
            >
              {portalLoading ? '…' : '支払い管理'}
            </button>
          ) : (
            <Link
              href="/members"
              className="text-xs px-4 py-2 rounded-lg font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
            >
              登録する →
            </Link>
          )}
        </div>

        {/* Links */}
        {isActive && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/members/articles"
              className="block rounded-xl p-6 transition-all hover:border-[#D4AF37]/40"
              style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}
            >
              <p className="text-[#D4AF37] text-xs font-bold mb-2 uppercase tracking-wider">試合レビュー</p>
              <p className="text-white text-sm font-bold mb-1">会員限定記事を読む</p>
              <p className="text-[#555] text-xs">全試合振り返り・戦術解析 →</p>
            </Link>
            <div className="rounded-xl p-6" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}>
              <p className="text-[#D4AF37] text-xs font-bold mb-2 uppercase tracking-wider">Coming Soon</p>
              <p className="text-white text-sm font-bold mb-1">会員限定掲示板</p>
              <p className="text-[#555] text-xs">近日公開予定</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

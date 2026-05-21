'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function MembersPage() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
    });
  }, []);

  const handleSubscribe = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = '/members/login?redirect=/members';
      return;
    }
    setLoading(true);
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { authorization: `Bearer ${session.access_token}` },
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Header */}
      <header className="border-b border-[#1a1a1a] bg-[#060606]/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; トップへ
          </Link>
          {loggedIn && !isActive && (
            <Link href="/members/dashboard" className="text-xs text-[#555] hover:text-[#D4AF37]">
              ダッシュボード
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-4 font-semibold">
            Members Only
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            <span style={{ color: '#D4AF37' }}>モウリーニョ×マドリー</span>
            <br />
            <span className="text-white">プレミアム会員</span>
          </h1>
          <p className="text-[#666] text-sm leading-relaxed max-w-xl mx-auto">
            試合ごとの戦術振り返り・モウリーニョ采配の深掘り・リーガ＆CL全試合レビューを、
            会員限定で毎週配信。モウリーニョ就任と同時に、マドリーをより深く楽しもう。
          </p>
        </div>

        {/* Pricing card */}
        <div
          className="rounded-2xl p-8 mb-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f0900 0%, #0d0d0d 100%)',
            border: '1px solid rgba(212,175,55,0.4)',
          }}
        >
          {/* decorative */}
          <div className="pointer-events-none absolute top-0 right-0 text-[160px] font-black leading-none select-none"
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(212,175,55,0.04)', fontFamily: 'var(--font-playfair)', lineHeight: 1 }}>
            M
          </div>

          <div className="relative">
            <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-3 font-bold">月額プラン</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black text-white" style={{ fontFamily: 'var(--font-playfair)' }}>¥1,000</span>
              <span className="text-[#555] text-sm mb-2">/ 月（税込）</span>
            </div>
            <p className="text-[#444] text-xs mb-8">いつでもキャンセル可能</p>

            <ul className="space-y-3 mb-10">
              {[
                '全試合振り返りレビュー（リーガ・CL・国王杯）',
                'モウリーニョ采配の徹底解剖（毎試合後）',
                '戦術分析コラム（月2〜4本）',
                '会員限定コメント欄・掲示板',
                '過去記事アーカイブ（就任以降すべて）',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#bbb]">
                  <span className="text-[#D4AF37] mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 rounded-xl font-black text-base text-black transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
            >
              {loading ? '処理中…' : '今すぐ登録する →'}
            </button>
            <p className="text-center text-[#333] text-xs mt-4">
              Stripeの安全な決済ページへ移動します
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#D4AF37] mb-4 tracking-widest uppercase">よくある質問</h2>
          {[
            { q: 'いつでもキャンセルできますか？', a: 'はい。マイページからいつでも解約できます。解約後は次回請求日まで引き続き記事をご覧いただけます。' },
            { q: 'どんな記事が読めますか？', a: 'モウリーニョが指揮するレアル・マドリードの試合振り返り・戦術解説・選手採点を毎試合後に掲載します。シーズン通じてのコラムや特集記事も含みます。' },
            { q: '支払い方法は？', a: 'クレジットカード（VISA・MasterCard・AMEX等）に対応しています。Stripeの安全な決済システムを使用しています。' },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl px-5 py-4" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}>
              <p className="text-white text-sm font-semibold mb-2">{q}</p>
              <p className="text-[#666] text-xs leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-[#333] text-xs">すでに会員の方は</p>
          <Link href="/members/login" className="text-[#D4AF37] text-sm hover:underline">
            こちらからログイン →
          </Link>
        </div>
      </main>
    </div>
  );
}

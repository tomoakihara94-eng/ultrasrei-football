'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/members/dashboard';

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.href = redirect;
    });
  }, [redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage('確認メールを送信しました。メール内のリンクをクリックしてください。');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('メールアドレスまたはパスワードが正しくありません');
      } else {
        window.location.href = redirect;
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-sm mx-auto px-6 py-4">
          <Link href="/members" className="text-[#D4AF37] text-sm hover:text-[#F0D060]">
            &larr; 会員ページへ
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-3">Members</p>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              {mode === 'login' ? 'ログイン' : '新規登録'}
            </h1>
          </div>

          <div className="rounded-2xl p-8" style={{ background: '#0d0d0d', border: '1px solid rgba(212,175,55,0.2)' }}>
            {/* mode switch */}
            <div className="flex rounded-lg overflow-hidden mb-6" style={{ border: '1px solid #1a1a1a' }}>
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); setMessage(''); }}
                  className="flex-1 py-2 text-xs font-bold transition-all"
                  style={{
                    background: mode === m ? 'rgba(212,175,55,0.15)' : 'transparent',
                    color: mode === m ? '#D4AF37' : '#555',
                  }}
                >
                  {m === 'login' ? 'ログイン' : '新規登録'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#666] mb-1.5">メールアドレス</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm text-white bg-[#111] border border-[#222] focus:border-[#D4AF37]/50 outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs text-[#666] mb-1.5">パスワード</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg text-sm text-white bg-[#111] border border-[#222] focus:border-[#D4AF37]/50 outline-none transition-colors"
                  placeholder="6文字以上"
                />
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}
              {message && <p className="text-green-400 text-xs">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-black transition-all disabled:opacity-60 mt-2"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)' }}
              >
                {loading ? '処理中…' : mode === 'login' ? 'ログイン' : '登録する'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

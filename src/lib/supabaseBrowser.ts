'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// ブラウザ（Client Component）専用クライアント — 遅延初期化でクラッシュを防ぐ
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY が Vercel に設定されていません',
    );
  }
  _client = createClient(url, key);
  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_t, prop) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

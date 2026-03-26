import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_ANON_KEY が設定されていません');
  _client = createClient(url, key);
  return _client;
}

// 後方互換用のエイリアス
export const supabase = new Proxy({} as SupabaseClient, {
  get(_t, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type SavedFormation = {
  id: string;
  team_name: string | null;
  formation: string;
  players: unknown;   // (Player | null)[]
  bench: unknown;     // (Player | null)[]
  manager_style: string | null;
  custom_positions: unknown;
  created_at: string;
};

export type Comment = {
  id: string;
  formation_id: string;
  nickname: string;
  body: string;
  created_at: string;
};

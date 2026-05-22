import { createClient } from '@supabase/supabase-js';

// ブラウザ（Client Component）専用クライアント
// NEXT_PUBLIC_ プレフィックスにより、ビルド時にブラウザへ埋め込まれる
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

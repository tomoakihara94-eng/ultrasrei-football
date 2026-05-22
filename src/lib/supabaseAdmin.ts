import { createClient } from '@supabase/supabase-js';

// サービスロールキー（RLSをバイパス）— サーバーサイドのみで使用
// ビルド時は env vars が未設定でも落ちないようフォールバック
const url = process.env.SUPABASE_URL ?? 'https://placeholder.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder';

export const supabaseAdmin = createClient(url, key);

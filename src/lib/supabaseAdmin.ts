import { createClient } from '@supabase/supabase-js';

// サービスロールキー（RLSをバイパス）— サーバーサイドのみで使用
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

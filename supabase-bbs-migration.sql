-- ========================================
-- 匿名掲示板 Migration
-- Supabase ダッシュボード > SQL Editor で実行
-- ========================================

CREATE TABLE IF NOT EXISTS bbs_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname text NOT NULL DEFAULT '匿名',
  body text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bbs_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bbs_select" ON bbs_posts FOR SELECT USING (true);
CREATE POLICY "bbs_insert" ON bbs_posts FOR INSERT WITH CHECK (
  char_length(body) >= 1 AND char_length(body) <= 200
);

CREATE INDEX IF NOT EXISTS bbs_posts_created_at_idx ON bbs_posts (created_at DESC);

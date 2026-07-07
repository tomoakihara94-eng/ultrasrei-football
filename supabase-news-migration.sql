-- ========================================
-- 最新ニュース（MARCA自動要約）Migration
-- Supabase ダッシュボード > SQL Editor で実行
-- ========================================

CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  source_name text NOT NULL DEFAULT 'MARCA',
  source_url text NOT NULL UNIQUE,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- 誰でも閲覧可（書き込みはサービスロールキーのみ、RLSをバイパスするため専用ポリシー不要）
CREATE POLICY "news_articles_select" ON news_articles FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS news_articles_published_at_idx ON news_articles (published_at DESC);

-- ========================================
-- レアル・マドリード経歴数値クイズ Migration
-- Supabase ダッシュボード > SQL Editor で実行
-- ========================================

-- 選手年度別成績テーブル
CREATE TABLE IF NOT EXISTS quiz_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  season text NOT NULL,
  goals integer NOT NULL,
  assists integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- クイズランキングテーブル
CREATE TABLE IF NOT EXISTS quiz_rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname text NOT NULL,
  score integer NOT NULL,
  total integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS (Row Level Security) を有効化
ALTER TABLE quiz_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_rankings ENABLE ROW LEVEL SECURITY;

-- quiz_players: 全員が読み取り可（書き込みはサービスロールのみ）
CREATE POLICY "quiz_players_select" ON quiz_players FOR SELECT USING (true);

-- quiz_rankings: 全員が読み取り・挿入可
CREATE POLICY "quiz_rankings_select" ON quiz_rankings FOR SELECT USING (true);
CREATE POLICY "quiz_rankings_insert" ON quiz_rankings FOR INSERT WITH CHECK (true);

-- インデックス
CREATE INDEX IF NOT EXISTS quiz_rankings_score_idx ON quiz_rankings (score DESC);

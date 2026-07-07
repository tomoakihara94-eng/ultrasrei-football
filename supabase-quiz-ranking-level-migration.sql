-- ========================================
-- クイズランキング レベル列追加 Migration
-- Supabase ダッシュボード > SQL Editor で実行
-- ========================================

ALTER TABLE quiz_rankings
  ADD COLUMN IF NOT EXISTS level integer NOT NULL DEFAULT 1;

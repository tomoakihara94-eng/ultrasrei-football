-- pageviewsテーブル作成
CREATE TABLE IF NOT EXISTS pageviews (
  key   TEXT    PRIMARY KEY,
  value BIGINT  NOT NULL DEFAULT 0
);

ALTER TABLE pageviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pageviews"
  ON pageviews FOR SELECT USING (true);

-- アトミックなカウントアップ関数
CREATE OR REPLACE FUNCTION hit_pageview(p_key TEXT)
RETURNS BIGINT AS $$
DECLARE
  new_val BIGINT;
BEGIN
  INSERT INTO pageviews (key, value) VALUES (p_key, 1)
  ON CONFLICT (key) DO UPDATE SET value = pageviews.value + 1
  RETURNING value INTO new_val;
  RETURN new_val;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC関数の実行権限をanonに付与
GRANT EXECUTE ON FUNCTION hit_pageview(TEXT) TO anon;

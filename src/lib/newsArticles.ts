import { getSupabase } from './supabase';

export type NewsArticle = {
  id: string;
  title: string;
  content: string;
  source_name: string;
  source_url: string;
  published_at: string;
  created_at: string;
};

export async function getNewsArticle(id: string): Promise<NewsArticle | null> {
  const { data, error } = await getSupabase()
    .from('news_articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getNewsArticle error:', error.message);
    return null;
  }
  return data as NewsArticle;
}

export async function getNewsArticles(limit = 30): Promise<NewsArticle[]> {
  const { data, error } = await getSupabase()
    .from('news_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getNewsArticles error:', error.message);
    return [];
  }
  return data as NewsArticle[];
}

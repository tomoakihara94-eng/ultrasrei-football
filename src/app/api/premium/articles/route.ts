import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { premiumPosts } from '@/lib/premiumPosts';

// 記事一覧（本文なし）を返す — 購読チェック付き
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(authHeader.slice(7));
  if (error || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const { data: member } = await supabaseAdmin
    .from('members')
    .select('subscription_status')
    .eq('user_id', user.id)
    .single();

  if (member?.subscription_status !== 'active') {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
  }

  const list = premiumPosts.map(({ slug, title, date, match, competition, excerpt, tags }) => ({
    slug, title, date, match, competition, excerpt, tags,
  }));

  return NextResponse.json({ posts: list });
}

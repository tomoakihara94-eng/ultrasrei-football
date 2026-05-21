import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getPremiumPost } from '@/lib/premiumPosts';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
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

  const { slug } = await params;
  const post = getPremiumPost(slug);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ post });
}

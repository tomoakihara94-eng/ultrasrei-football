import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.slice(7);

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const { data: member } = await supabaseAdmin
    .from('members')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

  if (!member?.stripe_customer_id) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: member.stripe_customer_id as string,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/members/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}

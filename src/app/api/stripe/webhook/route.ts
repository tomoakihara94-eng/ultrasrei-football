import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const upsertMember = async (sub: Stripe.Subscription) => {
    const userId = sub.metadata?.supabase_user_id;
    if (!userId) return;
    const periodEnd = new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString();
    await supabaseAdmin.from('members').upsert(
      {
        user_id: userId,
        stripe_customer_id: sub.customer as string,
        stripe_subscription_id: sub.id,
        subscription_status: sub.status,
        current_period_end: periodEnd,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );
  };

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await upsertMember(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.supabase_user_id;
      if (userId) {
        await supabaseAdmin.from('members')
          .update({ subscription_status: 'canceled', updated_at: new Date().toISOString() })
          .eq('user_id', userId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

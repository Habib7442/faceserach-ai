import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const { userId, planId, creditsToAdd } = session.metadata;

      const cookieStore = await cookies();
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore 
      });

      // Update user's subscription info
      const { error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          started_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (subscriptionError) {
        console.error('Error updating subscription:', subscriptionError);
        throw subscriptionError;
      }

      // Update credits
      const { data: currentCredits, error: fetchError } = await supabase
        .from('user_credits')
        .select('credits_remaining')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching current credits:', fetchError);
        throw fetchError;
      }

      const newTotal = (currentCredits?.credits_remaining || 0) + parseInt(creditsToAdd);

      const { error: updateError } = await supabase
        .from('user_credits')
        .upsert({ 
          user_id: userId,
          credits_remaining: newTotal,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        console.error('Error updating credits:', updateError);
        throw updateError;
      }

      console.log(`Successfully updated plan and credits for user ${userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
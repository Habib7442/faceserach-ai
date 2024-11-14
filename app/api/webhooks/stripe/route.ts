// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const { userId, creditsToAdd } = session.metadata;

      // Get cookie store and create Supabase client
      const cookieStore = await cookies();
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore 
      });

      // First get current credits
      const { data: currentCredits, error: fetchError } = await supabase
        .from('user_credits')
        .select('credits_remaining')
        .eq('user_id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching current credits:', fetchError);
        throw fetchError;
      }

      // Calculate new credits total
      const newTotal = (currentCredits?.credits_remaining || 0) + parseInt(creditsToAdd);

      // Update credits in Supabase
      const { error: updateError } = await supabase
        .from('user_credits')
        .update({ 
          credits_remaining: newTotal,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error updating credits:', updateError);
        throw updateError;
      }

      console.log(`Successfully updated credits for user ${userId} to ${newTotal}`);
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

export const dynamic = 'force-dynamic';
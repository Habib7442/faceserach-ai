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

      if (!userId || !planId || !creditsToAdd) {
        console.error('Missing required metadata:', { userId, planId, creditsToAdd });
        throw new Error('Missing required metadata');
      }

      const cookieStore = await cookies();
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore 
      });

      // First, check if user exists in user_credits table
      const { data: existingCredits, error: checkError } = await supabase
        .from('user_credits')
        .select('credits_remaining')
        .eq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing credits:', checkError);
        throw checkError;
      }

      const currentCredits = existingCredits?.credits_remaining || 0;
      const newTotalCredits = currentCredits + parseInt(creditsToAdd);

      console.log('Credits calculation:', {
        currentCredits,
        creditsToAdd,
        newTotalCredits,
        userId
      });

      // Update or insert user credits
      const { error: creditsError } = await supabase
        .from('user_credits')
        .upsert({
          user_id: userId,
          credits_remaining: newTotalCredits,
          updated_at: new Date().toISOString(),
          // If it's a new record, set created_at
          ...((!existingCredits && { created_at: new Date().toISOString() }))
        });

      if (creditsError) {
        console.error('Error updating credits:', creditsError);
        throw creditsError;
      }

      // Update subscription status
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

      console.log(`Successfully updated plan and credits for user ${userId}:`, {
        planId,
        newTotalCredits
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Send more detailed error information
    return NextResponse.json(
      { 
        error: 'Webhook handler failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
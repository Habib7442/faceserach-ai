import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PRICING_PLANS } from '@/config/plans';

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { planId } = body;

    const plan = PRICING_PLANS.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    console.log('Creating checkout session with plan:', {
      planId: plan.id,
      credits: plan.credits,
      userId
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/upload`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment`,
      metadata: {
        userId: userId,
        planId: plan.id,
        creditsToAdd: plan.credits.toString(),
      },
      payment_intent_data: {
        metadata: {
          userId: userId,
          planId: plan.id,
          creditsToAdd: plan.credits.toString(),
        },
      },
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session URL');
    }

    console.log('Checkout session created:', {
      sessionId: session.id,
      metadata: session.metadata
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
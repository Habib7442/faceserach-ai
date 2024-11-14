// app/api/create-checkout-session/route.ts
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// Make sure this price ID matches the one in your Stripe dashboard
const PRICE_ID = process.env.STRIPE_PRICE_ID;

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!PRICE_ID) {
      throw new Error('STRIPE_PRICE_ID is not configured in environment variables');
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICE_ID, // Using the Price ID from Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/upload`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId,
        creditsToAdd: '200',
      },
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session URL');
    }

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
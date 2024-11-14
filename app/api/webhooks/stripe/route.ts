// app/api/webhooks/stripe/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = headers().get("stripe-signature");

    if (!sig || !endpointSecret) {
      return NextResponse.json(
        { error: "Missing stripe signature or webhook secret" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const userId = session.metadata.userId;

      if (!userId) {
        throw new Error("No userId found in session metadata");
      }

      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

      const { data: existingUser } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (existingUser) {
        await supabase
          .from("user_credits")
          .update({
            credits_remaining: existingUser.credits_remaining + 200,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);
      } else {
        await supabase.from("user_credits").insert([
          {
            user_id: userId,
            credits_remaining: 200,
            is_unlimited: false,
          },
        ]);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

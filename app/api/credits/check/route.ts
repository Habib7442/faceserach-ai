// app/api/credits/check/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Check if user exists in credits table
    let { data: userCredits } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    // If user doesn't exist, create entry with default 3 credits
    if (!userCredits) {
      const { data: newUserCredits, error } = await supabase
        .from('user_credits')
        .insert([{ user_id: userId, credits_remaining: 3 }])
        .select()
        .single();

      if (error) throw error;
      userCredits = newUserCredits;
    }

    return NextResponse.json(userCredits);
  } catch (error) {
    console.error('Error checking credits:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
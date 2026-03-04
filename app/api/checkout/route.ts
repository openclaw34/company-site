import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase';
import { checkAvailability, calculateTotal } from '@/lib/booking-logic';
import { TOUR_PRICE_YEN } from '@/lib/constants';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tourDateId, numGuests, name, email, phone, allergies } = body;

    if (!tourDateId || !numGuests || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check availability (race condition guard)
    const { available, remaining } = await checkAvailability(
      tourDateId,
      numGuests
    );
    if (!available) {
      return NextResponse.json(
        {
          error: `Not enough spots available. Only ${remaining} remaining.`,
        },
        { status: 409 }
      );
    }

    // Get tour date for display
    const supabase = createServerSupabaseClient();
    const { data: tourDate } = await supabase
      .from('tour_dates')
      .select('date')
      .eq('id', tourDateId)
      .single();

    if (!tourDate) {
      return NextResponse.json(
        { error: 'Tour date not found' },
        { status: 404 }
      );
    }

    const totalAmount = calculateTotal(numGuests);

    // Create Stripe Checkout Session (embedded mode)
    const session = await getStripe().checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/complete?session_id={CHECKOUT_SESSION_ID}`,
      currency: 'jpy',
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: `KANPAI Sake Brewery Tour — ${tourDate.date}`,
              description: `${numGuests} guest${numGuests > 1 ? 's' : ''} × ¥${TOUR_PRICE_YEN.toLocaleString()}`,
            },
            unit_amount: TOUR_PRICE_YEN,
          },
          quantity: numGuests,
        },
      ],
      customer_email: email,
      metadata: {
        tour_date_id: tourDateId,
        num_guests: String(numGuests),
        name,
        phone,
        allergies: allergies || '',
      },
    });

    // Insert pending booking
    const { error: insertError } = await supabase.from('bookings').insert({
      tour_date_id: tourDateId,
      name,
      email,
      phone,
      num_guests: numGuests,
      allergies: allergies || null,
      total_amount: totalAmount,
      stripe_session_id: session.id,
      status: 'pending',
    });

    if (insertError) {
      console.error('Failed to insert booking:', insertError);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

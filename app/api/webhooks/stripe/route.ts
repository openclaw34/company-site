import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getResend } from '@/lib/resend';
import { renderBookingConfirmation } from '@/lib/email-templates/BookingConfirmation';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature' },
      { status: 400 }
    );
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature failed' },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Update booking to confirmed
    const { data: booking, error } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        stripe_payment_id:
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : null,
      })
      .eq('stripe_session_id', session.id)
      .select()
      .single();

    if (!error && booking) {
      const { data: tourDate } = await supabase
        .from('tour_dates')
        .select('date')
        .eq('id', booking.tour_date_id)
        .single();

      // Send confirmation email
      try {
        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: booking.email,
          subject: 'KANPAI — Booking Confirmed!',
          html: renderBookingConfirmation({
            name: booking.name,
            date: tourDate?.date ?? '',
            numGuests: booking.num_guests,
            totalAmount: booking.total_amount,
            bookingId: booking.id,
          }),
        });
      } catch (emailErr) {
        console.error('Failed to send confirmation email:', emailErr);
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('stripe_session_id', session.id)
      .eq('status', 'pending');
  }

  return NextResponse.json({ received: true });
}

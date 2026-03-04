import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase';
import { calculateRefundAmount } from '@/lib/booking-logic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerSupabaseClient();

    // Fetch booking with tour date
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, tour_dates(date)')
      .eq('id', id)
      .single();

    if (error || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.status !== 'confirmed') {
      return NextResponse.json(
        { error: 'Booking is not in confirmed status' },
        { status: 400 }
      );
    }

    const tourDateStr = booking.tour_dates?.date;
    if (!tourDateStr) {
      return NextResponse.json(
        { error: 'Tour date not found' },
        { status: 500 }
      );
    }

    const refundAmount = calculateRefundAmount(tourDateStr, booking.total_amount);

    // Process Stripe refund if applicable
    if (refundAmount > 0 && booking.stripe_payment_id) {
      await getStripe().refunds.create({
        payment_intent: booking.stripe_payment_id,
        amount: refundAmount,
      });
    }

    // Update booking status
    const newStatus = refundAmount > 0 ? 'refunded' : 'cancelled';
    await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    return NextResponse.json({
      status: newStatus,
      refundAmount,
      message:
        refundAmount > 0
          ? `Refund of ¥${refundAmount.toLocaleString()} processed`
          : 'Booking cancelled (no refund)',
    });
  } catch (error) {
    console.error('Cancel error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

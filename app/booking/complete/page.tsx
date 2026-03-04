import Link from 'next/link';
import { getStripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase';
import { TOUR_MEETING_POINT, TOUR_MEETING_TIME } from '@/lib/constants';

export default async function BookingComplete({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <main className="min-h-screen pt-28 pb-24 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl text-forest-900 mb-4">
            No booking found
          </h1>
          <Link
            href="/booking"
            className="text-forest-600 hover:text-forest-700 underline"
          >
            Return to booking page
          </Link>
        </div>
      </main>
    );
  }

  // Verify with Stripe
  let session;
  try {
    session = await getStripe().checkout.sessions.retrieve(session_id);
  } catch {
    return (
      <main className="min-h-screen pt-28 pb-24 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl text-forest-900 mb-4">
            Invalid session
          </h1>
          <Link
            href="/booking"
            className="text-forest-600 hover:text-forest-700 underline"
          >
            Return to booking page
          </Link>
        </div>
      </main>
    );
  }

  if (session.status !== 'complete') {
    return (
      <main className="min-h-screen pt-28 pb-24 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl text-forest-900 mb-4">
            Payment not completed
          </h1>
          <p className="text-gray-600 mb-6">
            Your payment was not completed. Please try again.
          </p>
          <Link
            href="/booking"
            className="inline-block px-6 py-3 bg-forest-600 text-white rounded-xl hover:bg-forest-700 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  // Fetch booking from DB
  const supabase = createServerSupabaseClient();
  const { data: booking } = await supabase
    .from('bookings')
    .select('*, tour_dates(date)')
    .eq('stripe_session_id', session_id)
    .single();

  const tourDateStr = booking?.tour_dates?.date ?? '';
  const formattedDate = tourDateStr
    ? new Date(tourDateStr + 'T00:00:00+09:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'Asia/Tokyo',
      })
    : '';

  return (
    <main className="min-h-screen pt-28 pb-24 bg-warm-white">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3d6128"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-forest-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-500">
            A confirmation email has been sent to{' '}
            <strong>{booking?.email}</strong>
          </p>
        </div>

        {booking && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 mb-8">
            <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-mono font-semibold text-forest-900">
                {booking.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-forest-900">
                {formattedDate}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-500">Guests</span>
              <span className="font-medium text-forest-900">
                {booking.num_guests}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-bold text-forest-900">
                &yen;{booking.total_amount.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className="bg-forest-50 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-forest-900 mb-3">Meeting Point</h2>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Time:</strong> {TOUR_MEETING_TIME}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Location:</strong> {TOUR_MEETING_POINT}
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

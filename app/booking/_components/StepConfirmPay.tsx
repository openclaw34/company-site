'use client';

import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import type { BookingFormData } from '@/types/booking';

interface Props {
  formData: BookingFormData;
  onBack: () => void;
}

const PRICE_PER_PERSON = 15_000;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StepConfirmPay({ formData, onBack }: Props) {
  const [cancellationAgreed, setCancellationAgreed] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const total = formData.numGuests * PRICE_PER_PERSON;

  const formattedDate = new Date(
    formData.tourDate + 'T00:00:00+09:00'
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Tokyo',
  });

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tourDateId: formData.tourDateId,
        numGuests: formData.numGuests,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        allergies: formData.allergies,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to initialize payment');
    }

    const { clientSecret } = await res.json();
    return clientSecret;
  }, [formData]);

  const handleProceedToPayment = async () => {
    if (!cancellationAgreed) return;
    setLoading(true);
    setError(null);

    try {
      // Test that we can create a session before showing Stripe UI
      await fetchClientSecret();
      setShowStripe(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to initialize payment'
      );
    } finally {
      setLoading(false);
    }
  };

  if (showStripe) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-serif text-xl text-forest-900 mb-4">
            Complete Payment
          </h2>
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
        <button
          onClick={() => setShowStripe(false)}
          className="w-full py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors"
        >
          &larr; Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-serif text-xl text-forest-900">
          Review Your Booking
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-forest-900">{formattedDate}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Guests</span>
            <span className="font-medium text-forest-900">
              {formData.numGuests}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Name</span>
            <span className="font-medium text-forest-900">
              {formData.name}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-forest-900">
              {formData.email}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium text-forest-900">
              {formData.phone}
            </span>
          </div>
          {formData.allergies && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Dietary Notes</span>
              <span className="font-medium text-forest-900 text-right max-w-[60%]">
                {formData.allergies}
              </span>
            </div>
          )}
          <div className="flex justify-between py-3">
            <span className="font-semibold text-gray-700">Total</span>
            <span className="text-xl font-bold text-forest-900">
              &yen;{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-cream rounded-2xl p-6">
        <h3 className="font-semibold text-forest-900 mb-3 text-sm">
          Cancellation Policy
        </h3>
        <ul className="text-sm text-gray-600 space-y-1.5 mb-4">
          <li>
            <strong>7+ days before:</strong> Full refund
          </li>
          <li>
            <strong>3&ndash;6 days before:</strong> 50% refund
          </li>
          <li>
            <strong>2 days or less / no-show:</strong> No refund
          </li>
        </ul>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={cancellationAgreed}
            onChange={(e) => setCancellationAgreed(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-gray-300 text-forest-600 focus:ring-forest-500"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the cancellation policy
          </span>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleProceedToPayment}
          disabled={!cancellationAgreed || loading}
          className="flex-1 py-4 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Initializing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
}

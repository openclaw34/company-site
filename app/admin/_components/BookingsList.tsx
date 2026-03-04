'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import type { Booking } from '@/types/booking';

interface Props {
  tourDateId: string;
  onUpdate: () => void;
}

export default function BookingsList({ tourDateId, onUpdate }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const supabase = createBrowserSupabaseClient();
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('tour_date_id', tourDateId)
      .order('created_at', { ascending: false });
    setBookings((data as Booking[]) ?? []);
    setLoading(false);
  }, [tourDateId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (id: string) => {
    if (!confirm('Cancel this booking? Refund will be processed per policy.'))
      return;
    setCancelling(id);

    try {
      const res = await fetch(`/api/bookings/${id}/cancel`, {
        method: 'POST',
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to cancel');
      }
    } catch {
      alert('Failed to cancel booking');
    }

    setCancelling(null);
    fetchBookings();
    onUpdate();
  };

  const statusColors: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-gray-100 text-gray-600',
    refunded: 'bg-blue-100 text-blue-800',
  };

  if (loading) {
    return <p className="text-sm text-gray-400">Loading bookings...</p>;
  }

  if (bookings.length === 0) {
    return (
      <p className="text-sm text-gray-400">No bookings for this date.</p>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="font-medium text-sm text-forest-900">
                {b.name}
              </span>
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-600'}`}
              >
                {b.status}
              </span>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {b.id.slice(0, 8)}
            </span>
          </div>
          <div className="text-xs text-gray-500 space-y-0.5">
            <p>{b.email} &middot; {b.phone}</p>
            <p>
              {b.num_guests} guest{b.num_guests > 1 ? 's' : ''} &middot;
              &yen;{b.total_amount.toLocaleString()}
            </p>
            {b.allergies && (
              <p className="text-amber-600">Dietary: {b.allergies}</p>
            )}
          </div>
          {b.status === 'confirmed' && (
            <button
              onClick={() => handleCancel(b.id)}
              disabled={cancelling === b.id}
              className="mt-3 px-3 py-1 text-xs text-red-600 border border-red-200 rounded-md hover:bg-red-50 disabled:opacity-50"
            >
              {cancelling === b.id ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import DateManager from './_components/DateManager';
import BookingsList from './_components/BookingsList';

interface TourDateWithCapacity {
  id: string;
  date: string;
  max_capacity: number;
  is_active: boolean;
  confirmed_guests: number;
  remaining: number;
}

export default function AdminDashboard() {
  const [dates, setDates] = useState<TourDateWithCapacity[]>([]);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchDates = useCallback(async () => {
    const supabase = createBrowserSupabaseClient();
    const { data } = await supabase
      .from('tour_dates_with_capacity')
      .select('*')
      .order('date', { ascending: true });
    setDates((data as TourDateWithCapacity[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  const handleLogout = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-warm-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-forest-900">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Log out
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <DateManager dates={dates} onUpdate={fetchDates} />
            </div>
            <div>
              <h2 className="font-serif text-xl text-forest-900 mb-4">
                Bookings
              </h2>
              {dates.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dates.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDateId(d.id)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          selectedDateId === d.id
                            ? 'bg-forest-600 text-white border-forest-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-forest-300'
                        }`}
                      >
                        {d.date}
                        <span className="ml-1.5 text-xs opacity-70">
                          ({d.confirmed_guests}/{d.max_capacity})
                        </span>
                      </button>
                    ))}
                  </div>
                  {selectedDateId && (
                    <BookingsList
                      tourDateId={selectedDateId}
                      onUpdate={fetchDates}
                    />
                  )}
                </>
              ) : (
                <p className="text-gray-400 text-sm">
                  No tour dates created yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

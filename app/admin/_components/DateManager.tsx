'use client';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase';

interface TourDateWithCapacity {
  id: string;
  date: string;
  max_capacity: number;
  is_active: boolean;
  confirmed_guests: number;
  remaining: number;
}

interface Props {
  dates: TourDateWithCapacity[];
  onUpdate: () => void;
}

export default function DateManager({ dates, onUpdate }: Props) {
  const [newDate, setNewDate] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!newDate) return;
    setAdding(true);
    const supabase = createBrowserSupabaseClient();
    await supabase.from('tour_dates').insert({ date: newDate });
    setNewDate('');
    setAdding(false);
    onUpdate();
  };

  const handleToggle = async (id: string, currentActive: boolean) => {
    const supabase = createBrowserSupabaseClient();
    await supabase
      .from('tour_dates')
      .update({ is_active: !currentActive })
      .eq('id', id);
    onUpdate();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tour date? This cannot be undone.')) return;
    const supabase = createBrowserSupabaseClient();
    await supabase.from('tour_dates').delete().eq('id', id);
    onUpdate();
  };

  return (
    <div>
      <h2 className="font-serif text-xl text-forest-900 mb-4">Tour Dates</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
        />
        <button
          onClick={handleAdd}
          disabled={!newDate || adding}
          className="px-4 py-2 bg-forest-600 text-white text-sm font-medium rounded-lg hover:bg-forest-700 disabled:opacity-40"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {dates.map((d) => (
          <div
            key={d.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              d.is_active
                ? 'bg-white border-gray-200'
                : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <div>
              <span className="font-medium text-sm text-forest-900">
                {d.date}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {d.confirmed_guests}/{d.max_capacity} booked
              </span>
              {d.remaining <= 0 && d.is_active && (
                <span className="text-xs text-red-500 ml-2">Full</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(d.id, d.is_active)}
                className={`px-3 py-1 text-xs rounded-md border ${
                  d.is_active
                    ? 'text-forest-700 border-forest-300 hover:bg-forest-50'
                    : 'text-gray-500 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {d.is_active ? 'Active' : 'Inactive'}
              </button>
              {d.confirmed_guests === 0 && (
                <button
                  onClick={() => handleDelete(d.id)}
                  className="px-3 py-1 text-xs text-red-500 border border-red-200 rounded-md hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {dates.length === 0 && (
          <p className="text-sm text-gray-400">No dates added yet.</p>
        )}
      </div>
    </div>
  );
}

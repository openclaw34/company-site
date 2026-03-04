'use client';

import TourCalendar from './TourCalendar';
import type { BookingFormData } from '@/types/booking';
import type { TourDate } from '@/types/booking';
import { useState } from 'react';

interface Props {
  formData: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
  onNext: () => void;
}

const PRICE_PER_PERSON = 15_000;

export default function StepDateGuests({ formData, onChange, onNext }: Props) {
  const [selectedTourDate, setSelectedTourDate] = useState<TourDate | null>(
    null
  );

  const handleDateSelect = (td: TourDate) => {
    setSelectedTourDate(td);
    onChange({
      tourDateId: td.id,
      tourDate: td.date,
      numGuests: Math.min(formData.numGuests, td.remaining),
    });
  };

  const maxGuests = selectedTourDate?.remaining ?? 1;

  const handleGuestChange = (delta: number) => {
    const next = formData.numGuests + delta;
    if (next >= 1 && next <= maxGuests) {
      onChange({ numGuests: next });
    }
  };

  const total = formData.numGuests * PRICE_PER_PERSON;
  const canContinue = formData.tourDateId && formData.numGuests >= 1;

  const formattedDate = formData.tourDate
    ? new Date(formData.tourDate + 'T00:00:00+09:00').toLocaleDateString(
        'en-US',
        {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'Asia/Tokyo',
        }
      )
    : '';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-forest-900 mb-1">
          Select a Date
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tours run on weekends. Choose an available date below.
        </p>
        <TourCalendar
          selectedDateId={formData.tourDateId}
          onSelect={handleDateSelect}
        />
      </div>

      {formData.tourDateId && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Selected Date</p>
            <p className="font-semibold text-forest-900">{formattedDate}</p>
            {selectedTourDate && (
              <p className="text-sm text-forest-600 mt-1">
                {selectedTourDate.remaining} spot
                {selectedTourDate.remaining !== 1 ? 's' : ''} remaining
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-3">Number of Guests</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleGuestChange(-1)}
                disabled={formData.numGuests <= 1}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                &minus;
              </button>
              <span className="text-2xl font-semibold text-forest-900 w-8 text-center">
                {formData.numGuests}
              </span>
              <button
                onClick={() => handleGuestChange(1)}
                disabled={formData.numGuests >= maxGuests}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>
                &yen;{PRICE_PER_PERSON.toLocaleString()} &times;{' '}
                {formData.numGuests} guest
                {formData.numGuests > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-gray-700">Total</span>
              <span className="text-2xl font-bold text-forest-900">
                &yen;{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!canContinue}
        className="w-full py-4 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

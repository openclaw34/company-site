'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TourDate } from '@/types/booking';

interface Props {
  selectedDateId: string;
  onSelect: (tourDate: TourDate) => void;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getJSTDate(): Date {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
  );
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Monday = 0, Sunday = 6
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;
  const totalDays = lastDay.getDate();
  return { startDow, totalDays };
}

function formatYMD(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function TourCalendar({ selectedDateId, onSelect }: Props) {
  const jstNow = getJSTDate();
  const [currentMonth, setCurrentMonth] = useState({
    year: jstNow.getFullYear(),
    month: jstNow.getMonth(),
  });
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDates = useCallback(async () => {
    try {
      const res = await fetch('/api/tour-dates');
      if (res.ok) {
        const data = await res.json();
        setTourDates(data);
      }
    } catch {
      // silently fail — calendar shows no dates
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  const { startDow, totalDays } = getMonthDays(
    currentMonth.year,
    currentMonth.month
  );

  const dateMap = new Map<string, TourDate>();
  for (const td of tourDates) {
    dateMap.set(td.date, td);
  }

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  const monthLabel = new Date(
    currentMonth.year,
    currentMonth.month
  ).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Prevent navigating to past months
  const canGoPrev =
    currentMonth.year > jstNow.getFullYear() ||
    (currentMonth.year === jstNow.getFullYear() &&
      currentMonth.month > jstNow.getMonth());

  const cells: React.ReactNode[] = [];

  // Empty cells before first day
  for (let i = 0; i < startDow; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  const todayStr = formatYMD(
    jstNow.getFullYear(),
    jstNow.getMonth(),
    jstNow.getDate()
  );

  for (let day = 1; day <= totalDays; day++) {
    const dateStr = formatYMD(currentMonth.year, currentMonth.month, day);
    const td = dateMap.get(dateStr);
    const isPast = dateStr < todayStr;
    const isSelected = td?.id === selectedDateId;

    if (!td || isPast) {
      cells.push(
        <div
          key={dateStr}
          className="h-14 flex flex-col items-center justify-center text-sm text-gray-300 rounded-lg"
        >
          {day}
        </div>
      );
    } else if (td.remaining <= 0) {
      cells.push(
        <div
          key={dateStr}
          className="h-14 flex flex-col items-center justify-center rounded-lg bg-gray-100"
        >
          <span className="text-sm text-gray-400">{day}</span>
          <span className="text-[10px] text-gray-400">Full</span>
        </div>
      );
    } else {
      cells.push(
        <button
          key={dateStr}
          onClick={() => onSelect(td)}
          className={`h-14 flex flex-col items-center justify-center rounded-lg transition-colors cursor-pointer ${
            isSelected
              ? 'bg-forest-600 text-white'
              : 'bg-forest-50 text-forest-800 hover:bg-forest-100'
          }`}
        >
          <span className="text-sm font-medium">{day}</span>
          <span
            className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-forest-500'}`}
          >
            {td.remaining} left
          </span>
        </button>
      );
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64 text-gray-400">
          Loading available dates...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h3 className="font-semibold text-forest-900">{monthLabel}</h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-gray-400 py-2"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{cells}</div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        All dates shown in Japan Standard Time (JST, UTC+9)
      </p>
    </div>
  );
}

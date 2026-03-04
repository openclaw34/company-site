import { createServerSupabaseClient } from './supabase';
import { TOUR_PRICE_YEN } from './constants';
import type { TourDate } from '@/types/booking';

export function getNowJST(): Date {
  return new Date(Date.now() + 9 * 60 * 60 * 1000);
}

export function getTodayJST(): string {
  return getNowJST().toISOString().split('T')[0];
}

export function getTomorrowJST(): string {
  const now = getNowJST();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return tomorrow.toISOString().split('T')[0];
}

export function calculateTotal(numGuests: number): number {
  return numGuests * TOUR_PRICE_YEN;
}

export function calculateRefundAmount(
  tourDateStr: string,
  totalAmount: number
): number {
  const tourDate = new Date(tourDateStr + 'T00:00:00+09:00');
  const nowJST = getNowJST();
  const diffMs = tourDate.getTime() - nowJST.getTime();
  const daysUntilTour = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysUntilTour >= 7) return totalAmount;
  if (daysUntilTour >= 3) return Math.floor(totalAmount / 2);
  return 0;
}

export async function getAvailableTourDates(): Promise<TourDate[]> {
  const supabase = createServerSupabaseClient();
  const today = getTodayJST();

  const { data, error } = await supabase
    .from('tour_dates_with_capacity')
    .select('*')
    .eq('is_active', true)
    .gte('date', today)
    .order('date', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as TourDate[];
}

export async function checkAvailability(
  tourDateId: string,
  numGuests: number
): Promise<{ available: boolean; remaining: number }> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('tour_dates_with_capacity')
    .select('remaining')
    .eq('id', tourDateId)
    .eq('is_active', true)
    .single();

  if (error || !data) return { available: false, remaining: 0 };
  return {
    available: data.remaining >= numGuests,
    remaining: data.remaining,
  };
}

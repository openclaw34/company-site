import { NextResponse } from 'next/server';
import { getAvailableTourDates } from '@/lib/booking-logic';

export async function GET() {
  try {
    const dates = await getAvailableTourDates();
    return NextResponse.json(dates);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

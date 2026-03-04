import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getResend } from '@/lib/resend';
import { getTodayJST, getTomorrowJST } from '@/lib/booking-logic';
import { renderReminderDayBefore } from '@/lib/email-templates/ReminderDayBefore';
import { renderReminderMorningOf } from '@/lib/email-templates/ReminderMorningOf';

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();
  const todayJST = getTodayJST();
  const tomorrowJST = getTomorrowJST();

  let sent = 0;

  // Day-before reminders
  const { data: tomorrowBookings } = await supabase
    .from('bookings')
    .select('*, tour_dates!inner(date)')
    .eq('status', 'confirmed')
    .eq('tour_dates.date', tomorrowJST);

  if (tomorrowBookings) {
    for (const booking of tomorrowBookings) {
      try {
        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: booking.email,
          subject: 'KANPAI — Your Tour is Tomorrow!',
          html: renderReminderDayBefore({
            name: booking.name,
            date: booking.tour_dates.date,
            numGuests: booking.num_guests,
          }),
        });
        sent++;
      } catch (err) {
        console.error(`Failed to send day-before reminder to ${booking.email}:`, err);
      }
    }
  }

  // Morning-of reminders
  const { data: todayBookings } = await supabase
    .from('bookings')
    .select('*, tour_dates!inner(date)')
    .eq('status', 'confirmed')
    .eq('tour_dates.date', todayJST);

  if (todayBookings) {
    for (const booking of todayBookings) {
      try {
        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: booking.email,
          subject: 'KANPAI — See You Today!',
          html: renderReminderMorningOf({
            name: booking.name,
            numGuests: booking.num_guests,
          }),
        });
        sent++;
      } catch (err) {
        console.error(`Failed to send morning-of reminder to ${booking.email}:`, err);
      }
    }
  }

  return NextResponse.json({ sent });
}

import { TOUR_MEETING_POINT, TOUR_MEETING_TIME, CONTACT_EMAIL } from '@/lib/constants';

interface Props {
  name: string;
  date: string;
  numGuests: number;
  totalAmount: number;
  bookingId: string;
}

export function renderBookingConfirmation({
  name,
  date,
  numGuests,
  totalAmount,
  bookingId,
}: Props): string {
  const formattedDate = new Date(date + 'T00:00:00+09:00').toLocaleDateString(
    'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Tokyo' }
  );

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#fafaf7;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-family:Georgia,serif;font-size:28px;color:#1a2d0f;margin:0;">KANPAI</h1>
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:32px;border:1px solid #dce8d2;">
      <h2 style="font-family:Georgia,serif;font-size:22px;color:#1a2d0f;margin:0 0 8px;">
        Booking Confirmed!
      </h2>
      <p style="color:#555;font-size:14px;margin:0 0 24px;">
        Thank you, ${name}. Your sake brewery tour is booked.
      </p>

      <div style="background:#f0f5eb;border-radius:8px;padding:20px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
          <tr>
            <td style="padding:6px 0;color:#666;">Booking ID</td>
            <td style="padding:6px 0;text-align:right;font-weight:600;">${bookingId.slice(0, 8).toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Date</td>
            <td style="padding:6px 0;text-align:right;font-weight:600;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Guests</td>
            <td style="padding:6px 0;text-align:right;font-weight:600;">${numGuests}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Total Paid</td>
            <td style="padding:6px 0;text-align:right;font-weight:600;">&yen;${totalAmount.toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <h3 style="font-size:15px;color:#1a2d0f;margin:0 0 8px;">Meeting Point</h3>
      <p style="color:#555;font-size:14px;margin:0 0 4px;">
        <strong>Time:</strong> ${TOUR_MEETING_TIME}
      </p>
      <p style="color:#555;font-size:14px;margin:0 0 24px;">
        <strong>Location:</strong> ${TOUR_MEETING_POINT}
      </p>

      <h3 style="font-size:15px;color:#1a2d0f;margin:0 0 8px;">Cancellation Policy</h3>
      <ul style="color:#555;font-size:13px;margin:0 0 24px;padding-left:20px;">
        <li>7+ days before: Full refund</li>
        <li>3&ndash;6 days before: 50% refund</li>
        <li>2 days or less / no-show: No refund</li>
      </ul>

      <p style="color:#999;font-size:13px;margin:0;">
        Questions? Contact us at <a href="mailto:${CONTACT_EMAIL}" style="color:#3d6128;">${CONTACT_EMAIL}</a>
      </p>
    </div>
    <p style="text-align:center;color:#bbb;font-size:12px;margin-top:24px;">
      &copy; KANPAI — Sake Brewery Tour, Okutama, Tokyo
    </p>
  </div>
</body>
</html>`;
}

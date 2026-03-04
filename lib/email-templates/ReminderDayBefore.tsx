import { TOUR_MEETING_POINT, TOUR_MEETING_TIME, CONTACT_EMAIL } from '@/lib/constants';

interface Props {
  name: string;
  date: string;
  numGuests: number;
}

export function renderReminderDayBefore({ name, date, numGuests }: Props): string {
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
        Your Tour is Tomorrow!
      </h2>
      <p style="color:#555;font-size:14px;margin:0 0 24px;">
        Hi ${name}, just a friendly reminder that your sake brewery tour is tomorrow.
      </p>

      <div style="background:#f0f5eb;border-radius:8px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:14px;color:#333;">
          <strong>Date:</strong> ${formattedDate}
        </p>
        <p style="margin:0 0 8px;font-size:14px;color:#333;">
          <strong>Meeting Time:</strong> ${TOUR_MEETING_TIME}
        </p>
        <p style="margin:0 0 8px;font-size:14px;color:#333;">
          <strong>Meeting Point:</strong> ${TOUR_MEETING_POINT}
        </p>
        <p style="margin:0;font-size:14px;color:#333;">
          <strong>Guests:</strong> ${numGuests}
        </p>
      </div>

      <h3 style="font-size:15px;color:#1a2d0f;margin:0 0 8px;">What to Bring</h3>
      <ul style="color:#555;font-size:14px;margin:0 0 24px;padding-left:20px;">
        <li>Comfortable walking shoes</li>
        <li>Weather-appropriate clothing</li>
        <li>A valid ID (for age verification at the brewery)</li>
      </ul>

      <p style="color:#999;font-size:13px;margin:0;">
        Need help? Contact us at <a href="mailto:${CONTACT_EMAIL}" style="color:#3d6128;">${CONTACT_EMAIL}</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

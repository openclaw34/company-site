import { TOUR_MEETING_POINT, TOUR_MEETING_TIME, CONTACT_EMAIL } from '@/lib/constants';

interface Props {
  name: string;
  numGuests: number;
}

export function renderReminderMorningOf({ name, numGuests }: Props): string {
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
        See You Today!
      </h2>
      <p style="color:#555;font-size:14px;margin:0 0 24px;">
        Good morning, ${name}! Today is the day of your sake brewery tour.
        We${numGuests > 1 ? ` and your ${numGuests - 1} guest${numGuests > 2 ? 's' : ''}` : ''} can&apos;t wait to meet you.
      </p>

      <div style="background:#f0f5eb;border-radius:8px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:14px;color:#333;">
          <strong>Meeting Time:</strong> ${TOUR_MEETING_TIME}
        </p>
        <p style="margin:0;font-size:14px;color:#333;">
          <strong>Meeting Point:</strong> ${TOUR_MEETING_POINT}
        </p>
      </div>

      <div style="background:#fff8e1;border-radius:8px;padding:16px;margin-bottom:24px;border:1px solid #ffe082;">
        <p style="margin:0;font-size:14px;color:#333;">
          <strong>Emergency Contact:</strong><br />
          If you are running late or need assistance, please email
          <a href="mailto:${CONTACT_EMAIL}" style="color:#3d6128;">${CONTACT_EMAIL}</a>
        </p>
      </div>

      <p style="color:#555;font-size:14px;margin:0;">
        Have a wonderful day! 🍶
      </p>
    </div>
  </div>
</body>
</html>`;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'refunded';

export interface TourDate {
  id: string;
  date: string; // YYYY-MM-DD
  max_capacity: number;
  is_active: boolean;
  confirmed_guests: number;
  remaining: number;
}

export interface Booking {
  id: string;
  tour_date_id: string;
  name: string;
  email: string;
  phone: string;
  num_guests: number;
  allergies: string | null;
  total_amount: number;
  stripe_session_id: string;
  stripe_payment_id: string | null;
  status: BookingStatus;
  created_at: string;
  tour_dates?: { date: string };
}

export interface BookingFormData {
  tourDateId: string;
  tourDate: string;
  numGuests: number;
  name: string;
  email: string;
  phone: string;
  allergies: string;
  ageConfirmed: boolean;
}

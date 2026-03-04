-- =============================================
-- KANPAI Booking System — Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor
-- =============================================

-- tour_dates table
CREATE TABLE tour_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  max_capacity INT NOT NULL DEFAULT 10,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_date_id UUID NOT NULL REFERENCES tour_dates(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  num_guests INT NOT NULL,
  allergies TEXT,
  total_amount INT NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_bookings_stripe_session ON bookings(stripe_session_id);
CREATE INDEX idx_bookings_tour_date ON bookings(tour_date_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- View: tour dates with remaining capacity
CREATE OR REPLACE VIEW tour_dates_with_capacity AS
SELECT
  td.id,
  td.date,
  td.max_capacity,
  td.is_active,
  td.created_at,
  COALESCE(SUM(b.num_guests) FILTER (WHERE b.status IN ('confirmed', 'pending')), 0)::int AS confirmed_guests,
  (td.max_capacity - COALESCE(SUM(b.num_guests) FILTER (WHERE b.status IN ('confirmed', 'pending')), 0))::int AS remaining
FROM tour_dates td
LEFT JOIN bookings b ON b.tour_date_id = td.id
GROUP BY td.id, td.date, td.max_capacity, td.is_active, td.created_at;

-- Row Level Security
ALTER TABLE tour_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can read active tour dates
CREATE POLICY "Public read active tour dates"
  ON tour_dates FOR SELECT
  USING (is_active = true);

-- Service role has full access
CREATE POLICY "Service role full access tour_dates"
  ON tour_dates FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access bookings"
  ON bookings FOR ALL
  USING (true)
  WITH CHECK (true);

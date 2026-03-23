# Database Schema (Supabase/PostgreSQL)

## Tables

### users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'stylist')),
  avatar_url TEXT,
  city TEXT,
  area TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### stylist_profiles

```sql
CREATE TABLE stylist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  bio TEXT,
  average_rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  service_area TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  specialties TEXT[],
  years_experience INTEGER,
  portfolio_images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### hairstyles

```sql
CREATE TABLE hairstyles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'braids', 'cornrows', 'locs', 'weaves', 'wigs',
    'natural', 'twists', 'crochet', 'updos'
  )),
  description TEXT,
  images TEXT[] NOT NULL,
  price_range_min INTEGER,
  price_range_max INTEGER,
  estimated_duration_minutes INTEGER,
  is_trending BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### stylist_styles (junction: what styles each stylist can do)

```sql
CREATE TABLE stylist_styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stylist_id UUID REFERENCES stylist_profiles(id) ON DELETE CASCADE,
  style_id UUID REFERENCES hairstyles(id) ON DELETE CASCADE,
  price INTEGER NOT NULL,
  portfolio_images TEXT[],
  UNIQUE(stylist_id, style_id)
);
```

### bookings

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id),
  stylist_id UUID REFERENCES stylist_profiles(id),
  style_id UUID REFERENCES hairstyles(id),
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
  )),
  client_address TEXT,
  client_city TEXT,
  client_area TEXT,
  total_price INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'paid', 'refunded', 'failed'
  )),
  payment_reference TEXT,
  interswitch_transaction_ref TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### reviews

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) UNIQUE,
  client_id UUID REFERENCES users(id),
  stylist_id UUID REFERENCES stylist_profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Row Level Security (RLS) Policies

- Users can read their own data and public stylist profiles
- Clients can create bookings and reviews
- Stylists can update their profiles and booking statuses
- All users can read hairstyles (public)

## Indexes

- `hairstyles(category)` — for category filtering
- `stylist_profiles(is_available, average_rating)` — for discovery
- `bookings(client_id)` — for client dashboard
- `bookings(stylist_id)` — for stylist dashboard
- `reviews(stylist_id)` — for rating calculations

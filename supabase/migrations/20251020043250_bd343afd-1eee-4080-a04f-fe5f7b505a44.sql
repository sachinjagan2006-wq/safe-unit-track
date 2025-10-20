-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'donor', 'hospital');

-- Create enum for blood types
CREATE TYPE public.blood_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');

-- Create enum for donation status
CREATE TYPE public.donation_status AS ENUM ('pending', 'verified', 'used', 'expired');

-- Create enum for request status
CREATE TYPE public.request_status AS ENUM ('pending', 'matched', 'fulfilled', 'cancelled');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  blood_type public.blood_type,
  location TEXT,
  wallet_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create hospitals table
CREATE TABLE public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  hospital_name TEXT NOT NULL,
  license_number TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  blood_type public.blood_type NOT NULL,
  quantity_ml INTEGER NOT NULL CHECK (quantity_ml > 0),
  donation_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  status public.donation_status DEFAULT 'pending',
  blockchain_tx_hash TEXT,
  block_number TEXT,
  qr_code TEXT,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blood_requests table
CREATE TABLE public.blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  blood_type public.blood_type NOT NULL,
  quantity_ml INTEGER NOT NULL CHECK (quantity_ml > 0),
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  status public.request_status DEFAULT 'pending',
  patient_name TEXT NOT NULL,
  reason TEXT NOT NULL,
  matched_donation_id UUID REFERENCES public.donations(id),
  fulfilled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blood_inventory table
CREATE TABLE public.blood_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  blood_type public.blood_type NOT NULL,
  quantity_ml INTEGER NOT NULL DEFAULT 0 CHECK (quantity_ml >= 0),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hospital_id, blood_type)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_inventory ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for hospitals
CREATE POLICY "Hospitals can view their own data"
  ON public.hospitals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Hospitals can update their own data"
  ON public.hospitals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view verified hospitals"
  ON public.hospitals FOR SELECT
  USING (verified = true);

CREATE POLICY "Admins can manage hospitals"
  ON public.hospitals FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for donations
CREATE POLICY "Donors can view their own donations"
  ON public.donations FOR SELECT
  USING (auth.uid() = donor_id);

CREATE POLICY "Donors can create donations"
  ON public.donations FOR INSERT
  WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Hospitals can view all donations"
  ON public.donations FOR SELECT
  USING (public.has_role(auth.uid(), 'hospital'));

CREATE POLICY "Admins can manage all donations"
  ON public.donations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for blood_requests
CREATE POLICY "Hospitals can manage their own requests"
  ON public.blood_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.hospitals
      WHERE hospitals.id = blood_requests.hospital_id
      AND hospitals.user_id = auth.uid()
    )
  );

CREATE POLICY "Donors can view all requests"
  ON public.blood_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'donor'));

CREATE POLICY "Admins can manage all requests"
  ON public.blood_requests FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for blood_inventory
CREATE POLICY "Hospitals can manage their own inventory"
  ON public.blood_inventory FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.hospitals
      WHERE hospitals.id = blood_inventory.hospital_id
      AND hospitals.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone authenticated can view inventory"
  ON public.blood_inventory FOR SELECT
  TO authenticated
  USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.hospitals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.blood_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
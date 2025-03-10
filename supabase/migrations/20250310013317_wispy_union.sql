/*
  # Create devices table and security policies

  1. New Tables
    - `devices`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `serial_number` (text, unique)
      - `battery_level` (integer)
      - `signal_strength` (text)
      - `temperature` (numeric)
      - `last_update` (timestamptz)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `devices` table
    - Add policies for authenticated users to:
      - Read their own devices
      - Create new devices
      - Update their own devices
*/

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  serial_number text UNIQUE NOT NULL,
  battery_level integer DEFAULT 100,
  signal_strength text DEFAULT 'good',
  temperature numeric,
  last_update timestamptz DEFAULT now(),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT battery_level_range CHECK (battery_level >= 0 AND battery_level <= 100),
  CONSTRAINT signal_strength_values CHECK (signal_strength IN ('poor', 'fair', 'good', 'excellent')),
  CONSTRAINT status_values CHECK (status IN ('active', 'inactive', 'maintenance'))
);

-- Enable RLS
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own devices"
  ON devices
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create devices"
  ON devices
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own devices"
  ON devices
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_devices_updated_at
  BEFORE UPDATE ON devices
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
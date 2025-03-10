import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { Database } from '@/types/supabase';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Device = Database['public']['Tables']['devices']['Row'];
export type SupportTicket = Database['public']['Tables']['support_tickets']['Row'];
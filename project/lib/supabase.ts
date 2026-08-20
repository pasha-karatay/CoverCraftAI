import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type CoverLetterRow = {
  id: string;
  company_name: string;
  job_title: string;
  experience: string;
  tone: string;
  letter: string;
  created_at: string;
};

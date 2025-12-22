import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://iuxugjikgfoahpjayhma.supabase.co'; // Tusaale: process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1eHVnamlrZ2ZvYWhwamF5aG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODIwMDAsImV4cCI6MjA4MTQ1ODAwMH0.Iyb5uSYxcKS3Ue6IloKBm-hMfBtHhWOdbxmZ2qLRp0U'; // Tusaale: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Bilaabidda (Initialization) macaamiisha Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


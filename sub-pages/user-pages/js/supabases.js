import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://buzfscezwtuwwctckazm.supabase.co'; // Tusaale: process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1emZzY2V6d3R1d3djdGNrYXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNzY4ODksImV4cCI6MjA4MTk1Mjg4OX0.rIsOjDlwa_5B1jxeHEgnzZfmUaDGAra7jdgPJIlcbJo'; // Tusaale: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Bilaabidda (Initialization) macaamiisha Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


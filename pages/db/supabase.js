// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// URL sax ah ee mashruucaaga Supabase
const supabaseUrl = 'https://buzfscezwtuwwctckazm.supabase.co';

// Publishable (anon) API Key sax ah
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1emZzY2V6d3R1d3djdGNrYXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNzY4ODksImV4cCI6MjA4MTk1Mjg4OX0.rIsOjDlwa_5B1jxeHEgnzZfmUaDGAra7jdgPJIlcbJo';

// Bilaabidda (Initialization) macaamiisha Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

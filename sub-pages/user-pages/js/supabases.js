import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://vjdaylpouhhehtcjvukr.supabase.co'; 
const supabasePublishableKey = 'sb_publishable_Tzxf3UM0HtAQucr58is5eQ_yVzcjtEm'; // Tusaale: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Bilaabidda (Initialization) macaamiisha Supabase
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
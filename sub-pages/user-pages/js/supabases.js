import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://buzfscezwtuwwctckazm.supabase.co';
const supabaseKey = 'sb_publishable_zyPtPoRPwhLw9RtdL9Oj6w_ARQpdqCl';

// Bilaabidda Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

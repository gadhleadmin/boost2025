// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// URL sax ah ee mashruucaaga Supabase
const supabaseUrl = 'https://vjdaylpouhhehtcjvukr.supabase.co';

// Publishable (anon) API Key sax ah
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZGF5bHBvdWhoZWh0Y2p2dWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTkzMTIsImV4cCI6MjA4MjAzNTMxMn0.qf8arJ_vFEFxUDF7bGIpDbaXlXqPYkOVfm-Vpq_zOLk';

// Bilaabidda (Initialization) macaamiisha Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

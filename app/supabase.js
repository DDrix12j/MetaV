import { createClient } from '@supabase/supabase-js';

// 1. PASTE YOUR PROJECT URL HERE
const supabaseUrl = 'https://fjazvqfvnmkxhxsnrf.supabase.co';

// 2. PASTE YOUR ANON PUBLIC KEY HERE (The long string starting with eyJ...)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYXp2cXZmdm52bWt4aHhzbnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0Mzc3NDYsImV4cCI6MjA4NTAxMzc0Nn0.baWfHvhqSLKKvoMpdYrUWpdFE2xW9n92r6-gPny7NBE';

export const supabase = createClient(supabaseUrl, supabaseKey);
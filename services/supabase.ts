
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jkvfxsauqlcdgespwalu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprdmZ4c2F1cWxjZGdlc3B3YWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMTU3ODcsImV4cCI6MjA4Mzg5MTc4N30.grCXE50C-ecr5Z4d7NkeUa-PPV9ZwR6gIMHaBK4KleY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qvomtnivigdqoejqbyqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b210bml2aWdkcW9lanFieXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NDk0NDYsImV4cCI6MjA4MzEyNTQ0Nn0.bTPtIWBQtsKB9G0yLmif4fim9xjtAYViOFAJqdyBBeQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

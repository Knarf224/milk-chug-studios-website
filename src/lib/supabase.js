import { createClient } from '@supabase/supabase-js'

// Anon key is safe to hardcode — it is restricted by RLS on every table.
export const supabase = createClient(
  'https://sbwmznwbfjcnnmgqvifv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNid216bndiZmpjbm5tZ3F2aWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDQ2OTYsImV4cCI6MjA4ODU4MDY5Nn0.EqErGaIauFjyat08c59QAz7m3ZIMTnIHtRu-8rZMpr0'
)

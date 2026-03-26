import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://spjzxzzmvpqnswekimkp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwanp4enptdnBxbnN3ZWtpbWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NjM4OTEsImV4cCI6MjA5MDEzOTg5MX0.-fc4k19b0-YLLMDM1tvhDvWsgiJf2X9hBgIfAzxJMr0'

export const supabase = createClient(supabaseUrl, supabaseKey)

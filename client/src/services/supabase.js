import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fxfshaiighiifqnljdvj.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZnNoYWlpZ2hpaWZxbmxqZHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDUxNDEsImV4cCI6MjA5NTcyMTE0MX0.JrXVZkX309s1CsPwfZrQpXHIk6No-ejbib0goGCqlD0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
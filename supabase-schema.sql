-- Run this in your Supabase SQL Editor:
create table if not exists public.invoices (
  id uuid default gen_random_uuid() primary key,
  invoice_number text unique not null,
  client_name text,
  company_name text,
  total_amount numeric,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.invoices enable row level security;

-- Create policy to allow public access (for anon key)
create policy "Allow public read and write on invoices" 
  on public.invoices 
  for all 
  to anon, authenticated 
  using (true) 
  with check (true);


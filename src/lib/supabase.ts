import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { InvoiceData } from '../types/invoice';

const DEFAULT_SUPABASE_URL = 'https://lprqbtahcauyyxletkcc.supabase.co';

export function getSupabaseUrl(): string {
  return import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
}

export function getSupabaseAnonKey(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('supabase_anon_key');
    if (stored && stored.trim()) return stored.trim();
  }
  return import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
}

export function setSupabaseAnonKey(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('supabase_anon_key', key.trim());
    window.location.reload();
  }
}

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  if (!url || !key) return null;

  if (!clientInstance) {
    clientInstance = createClient(url, key);
  }
  return clientInstance;
}

export interface StoredInvoiceRecord {
  id?: string;
  invoice_number: string;
  client_name: string;
  company_name: string;
  total_amount: number;
  data: InvoiceData;
  created_at?: string;
  updated_at?: string;
}

export async function saveInvoiceToSupabase(invoice: InvoiceData, totalAmount: number): Promise<{ success: boolean; error?: string; id?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Supabase Anon Key is missing. Please click "Connect Supabase" in the header to enter your API key.' };
  }

  try {
    const payload = {
      invoice_number: invoice.invoiceNumber,
      client_name: invoice.clientName || 'Untitled Client',
      company_name: invoice.companyName || 'Untitled Company',
      total_amount: totalAmount,
      data: invoice,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client
      .from('invoices')
      .upsert(payload, { onConflict: 'invoice_number' })
      .select()
      .single();

    if (error) {
      console.error('Supabase save error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('Save invoice exception:', err);
    return { success: false, error: err.message || 'An unexpected error occurred' };
  }
}

export async function fetchInvoicesFromSupabase(): Promise<{ data?: StoredInvoiceRecord[]; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { error: 'Supabase is not configured' };
  }

  try {
    const { data, error } = await client
      .from('invoices')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      return { error: error.message };
    }

    return { data: data as StoredInvoiceRecord[] };
  } catch (err: any) {
    return { error: err.message };
  }
}

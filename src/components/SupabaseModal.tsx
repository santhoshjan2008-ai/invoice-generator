import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Check, Key, ExternalLink, CloudDownload, AlertCircle } from 'lucide-react';
import { getSupabaseUrl, getSupabaseAnonKey, setSupabaseAnonKey, fetchInvoicesFromSupabase, type StoredInvoiceRecord } from '../lib/supabase';
import { useInvoice } from '../context/InvoiceContext';
import { formatCurrency } from '../utils/formatters';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupabaseModal({ isOpen, onClose }: SupabaseModalProps) {
  const { setInvoice } = useInvoice();
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [invoices, setInvoices] = useState<StoredInvoiceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const supabaseUrl = getSupabaseUrl();

  useEffect(() => {
    if (isOpen) {
      const currentKey = getSupabaseAnonKey();
      setSavedKey(currentKey);
      setApiKey(currentKey);
      setErrorMsg('');
      setSuccessMsg('');

      if (currentKey) {
        loadInvoices();
      }
    }
  }, [isOpen]);

  const loadInvoices = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await fetchInvoicesFromSupabase();
    if (res.error) {
      setErrorMsg(res.error);
    } else if (res.data) {
      setInvoices(res.data);
    }
    setLoading(false);
  };

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      setErrorMsg('Please enter a valid Supabase anon public API key');
      return;
    }
    setSupabaseAnonKey(apiKey.trim());
    setSavedKey(apiKey.trim());
    setSuccessMsg('Supabase connected successfully!');
    setTimeout(() => {
      loadInvoices();
    }, 500);
  };

  const handleLoadInvoice = (record: StoredInvoiceRecord) => {
    if (record.data) {
      // Parse dates properly
      const loaded = {
        ...record.data,
        issueDate: new Date(record.data.issueDate),
        dueDate: new Date(record.data.dueDate),
      };
      setInvoice(loaded);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#141416] border border-border-default rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border-default flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Supabase Database</h3>
                <p className="text-xs text-text-muted">Save & sync your invoices in the cloud</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
            {/* Project URL */}
            <div className="space-y-1.5">
              <label className="text-xs text-text-secondary font-medium">Connected Supabase URL</label>
              <div className="bg-[#18181b] border border-border-default rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 font-mono flex items-center justify-between">
                <span className="truncate">{supabaseUrl}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider ml-2 flex-shrink-0">
                  Connected
                </span>
              </div>
            </div>

            {/* Anon Key */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-text-secondary font-medium flex items-center gap-1.5">
                  <Key size={13} className="text-accent" />
                  Supabase Anon Key (Public API Key)
                </label>
                <a
                  href="https://supabase.com/dashboard/project/lprqbtahcauyyxletkcc/settings/api"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-accent hover:underline flex items-center gap-1"
                >
                  Find Key <ExternalLink size={10} />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  className="flex-1 bg-[#18181b] border border-border-default rounded-xl px-3.5 py-2.5 text-xs text-text-primary placeholder-text-muted font-mono outline-none focus:border-border-focus"
                />
                <button
                  onClick={handleSaveKey}
                  className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} />
                  Save
                </button>
              </div>
              <p className="text-[11px] text-text-muted">
                Copy from <strong>Project Settings → API → Project API keys → anon public</strong>
              </p>
            </div>

            {errorMsg && (
              <div className="bg-danger/10 border border-danger/20 rounded-xl p-3 flex items-start gap-2 text-xs text-danger">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-400">
                {successMsg}
              </div>
            )}

            {/* Saved Invoices Section */}
            {savedKey && (
              <div className="pt-2 border-t border-border-default space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-primary">Saved Invoices</span>
                  <button
                    onClick={loadInvoices}
                    disabled={loading}
                    className="text-xs text-accent hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>

                {invoices.length === 0 ? (
                  <div className="text-center py-6 text-xs text-text-muted bg-[#18181b]/50 rounded-xl border border-dashed border-border-default">
                    No invoices saved in Supabase yet.
                    <br />
                    Click <strong>"Save to Supabase"</strong> below the preview to save your first invoice!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {invoices.map((inv) => (
                      <div
                        key={inv.id || inv.invoice_number}
                        className="bg-[#18181b] border border-border-default hover:border-accent/40 rounded-xl p-3 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-xs font-medium text-text-primary flex items-center gap-2">
                            <span>{inv.invoice_number}</span>
                            <span className="text-text-muted font-normal">• {inv.client_name}</span>
                          </div>
                          <div className="text-[11px] text-text-muted mt-0.5">
                            {formatCurrency(inv.total_amount || 0, inv.data?.currency || { symbol: '$', code: 'USD', name: 'USD', flag: '🇺🇸' })}
                          </div>
                        </div>
                        <button
                          onClick={() => handleLoadInvoice(inv)}
                          className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <CloudDownload size={13} />
                          Load
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


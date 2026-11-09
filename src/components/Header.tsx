import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, RotateCcw, Trash2, Database } from 'lucide-react';
import { useInvoice } from '../context/InvoiceContext';
import { getSupabaseAnonKey } from '../lib/supabase';
import SupabaseModal from './SupabaseModal';

export default function Header() {
  const { resetDemo, clearForm } = useInvoice();
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const isConnected = Boolean(getSupabaseAnonKey());

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="border-b border-border-default/80 bg-bg-card/70 backdrop-blur-xl sticky top-0 z-40"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shadow-inner"
            >
              <FileText size={20} className="text-accent" />
            </motion.div>
            <div>
              <h1 className="text-base font-bold text-text-primary tracking-tight">Invoice Generator</h1>
              <p className="text-xs text-text-muted">Modern dark-themed invoice builder with real-time PDF generation</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Supabase Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsSupabaseOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isConnected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-[#1a1a1c] border-border-default text-text-secondary hover:text-white hover:border-[#38383c]'
              }`}
            >
              <Database size={13} className={isConnected ? 'text-emerald-400' : 'text-accent'} />
              <span>{isConnected ? 'Supabase Synced' : 'Connect Supabase'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetDemo}
              title="Reset to sample invoice data"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary bg-[#1a1a1c] border border-border-default hover:text-white hover:border-[#38383c] transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              Sample Data
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={clearForm}
              title="Clear all fields"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-danger bg-[#1a1a1c] border border-border-default hover:border-danger/30 transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              Clear
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3.5 py-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Sparkles size={13} className="text-emerald-400" />
              <span className="text-xs text-emerald-300 font-medium">Live Preview</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <SupabaseModal isOpen={isSupabaseOpen} onClose={() => setIsSupabaseOpen(false)} />
    </>
  );
}

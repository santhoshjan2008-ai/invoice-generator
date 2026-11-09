import { motion } from 'framer-motion';
import InvoicePreview from './InvoicePreview';
import { useInvoice } from '../../context/InvoiceContext';
import { Download, Loader2, Printer, CheckCircle, Cloud, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import InvoicePDF from '../pdf/InvoicePDF';
import { saveInvoiceToSupabase, getSupabaseAnonKey } from '../../lib/supabase';
import { calculateTotal } from '../../utils/calculations';
import SupabaseModal from '../SupabaseModal';

export default function PreviewPanel() {
  const { invoice } = useInvoice();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [savingCloud, setSavingCloud] = useState(false);
  const [cloudSuccess, setCloudSuccess] = useState(false);
  const [cloudError, setCloudError] = useState<string | null>(null);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);

  const total = calculateTotal(invoice.items, invoice.discount);

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadSuccess(false);
    try {
      const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoice.invoiceNumber.replace('#', '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Could not generate PDF. Please check invoice details.');
    } finally {
      setDownloading(false);
    }
  };

  const handleSaveToCloud = async () => {
    const key = getSupabaseAnonKey();
    if (!key) {
      setIsSupabaseOpen(true);
      return;
    }

    setSavingCloud(true);
    setCloudError(null);
    setCloudSuccess(false);

    const res = await saveInvoiceToSupabase(invoice, total);
    setSavingCloud(false);

    if (res.success) {
      setCloudSuccess(true);
      setTimeout(() => setCloudSuccess(false), 3000);
    } else {
      setCloudError(res.error || 'Failed to save');
      setTimeout(() => setCloudError(null), 4000);
    }
  };

  const handlePrint = async () => {
    try {
      const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
      const url = URL.createObjectURL(blob);
      const printWindow = window.open(url);
      if (printWindow) {
        printWindow.focus();
      }
    } catch (error) {
      console.error('Error opening print preview:', error);
      window.print();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full flex flex-col justify-between"
      >
        {/* Preview Container */}
        <div className="flex-1 overflow-y-auto flex items-start justify-center p-6 pt-4 custom-scrollbar">
          <div className="w-full max-w-[580px]">
            <InvoicePreview />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-border-default/80 bg-bg-card/50 backdrop-blur-md">
          {cloudError && (
            <div className="max-w-[580px] mx-auto mb-2 bg-danger/10 border border-danger/20 rounded-xl p-2.5 text-xs text-danger flex items-center justify-between">
              <span className="flex items-center gap-1.5 truncate">
                <AlertCircle size={14} className="flex-shrink-0" />
                {cloudError}
              </span>
              <button
                onClick={() => setIsSupabaseOpen(true)}
                className="underline font-semibold ml-2 flex-shrink-0"
              >
                Settings
              </button>
            </div>
          )}

          <div className="max-w-[580px] mx-auto flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              title="Open printable version"
              className="px-3.5 py-3.5 bg-[#18181b] border border-border-default hover:border-[#38383c] text-text-secondary hover:text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer size={15} />
              <span className="hidden sm:inline">Print</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveToCloud}
              disabled={savingCloud}
              title="Save invoice to Supabase"
              className={`px-3.5 py-3.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                cloudSuccess
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-[#18181b] border-border-default hover:border-accent/40 text-text-secondary hover:text-white'
              }`}
            >
              {savingCloud ? (
                <Loader2 size={15} className="animate-spin text-accent" />
              ) : cloudSuccess ? (
                <CheckCircle size={15} className="text-emerald-400" />
              ) : (
                <Cloud size={15} className="text-accent" />
              )}
              <span>{cloudSuccess ? 'Saved!' : 'Save'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(59, 130, 246, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 bg-accent hover:bg-accent-hover text-white py-3.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-lg shadow-accent/20"
            >
              {downloading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating PDF...
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle size={16} className="text-white" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download Invoice PDF
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <SupabaseModal isOpen={isSupabaseOpen} onClose={() => setIsSupabaseOpen(false)} />
    </>
  );
}

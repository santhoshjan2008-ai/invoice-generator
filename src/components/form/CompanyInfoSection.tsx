import { Building2, Upload, X } from 'lucide-react';
import SectionCard from '../ui/SectionCard';
import Input from '../ui/Input';
import { useInvoice } from '../../context/InvoiceContext';
import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompanyInfoSection() {
  const { invoice, updateField } = useInvoice();

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('companyLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [updateField]);

  const removeLogo = useCallback(() => {
    updateField('companyLogo', null);
  }, [updateField]);

  return (
    <SectionCard title="Company Information" icon={<Building2 size={18} />} delay={0.1}>
      <div className="space-y-4">
        {/* Logo Upload */}
        <div>
          <label className="text-sm text-text-secondary font-medium mb-1.5 block">Company Logo</label>
          <AnimatePresence mode="wait">
            {invoice.companyLogo ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative inline-block"
              >
                <img
                  src={invoice.companyLogo}
                  alt="Company Logo"
                  style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  className="w-20 h-20 object-contain rounded-xl border border-border-default bg-bg-input p-2"
                />
                <button
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-danger rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <X size={12} className="text-white" />
                </button>
              </motion.div>
            ) : (
              <motion.label
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border-default rounded-xl cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
              >
                <Upload size={20} className="text-text-muted mb-2" />
                <span className="text-xs text-text-muted">Click to upload logo</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </motion.label>
            )}
          </AnimatePresence>
        </div>

        <Input
          label="Company Name"
          value={invoice.companyName}
          onChange={e => updateField('companyName', e.target.value)}
          placeholder="Your Company Name"
        />

        <Input
          label="Address"
          value={invoice.companyAddress}
          onChange={e => updateField('companyAddress', e.target.value)}
          placeholder="Street address"
        />

        <Input
          label="City / Region"
          value={invoice.companyCity}
          onChange={e => updateField('companyCity', e.target.value)}
          placeholder="City, State, Country"
        />
      </div>
    </SectionCard>
  );
}

import { motion } from 'framer-motion';
import CompanyInfoSection from './CompanyInfoSection';
import ClientInfoSection from './ClientInfoSection';
import InvoiceMetaSection from './InvoiceMetaSection';
import LineItemsSection from './LineItemsSection';
import TotalsSection from './TotalsSection';
import NotesSection from './NotesSection';

export default function FormPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full overflow-y-auto pr-2 space-y-5 pb-8 custom-scrollbar"
    >
      <CompanyInfoSection />
      <ClientInfoSection />
      <InvoiceMetaSection />
      <LineItemsSection />
      <TotalsSection />
      <NotesSection />
    </motion.div>
  );
}

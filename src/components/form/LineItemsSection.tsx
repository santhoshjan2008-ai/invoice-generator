import { Package, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionCard from '../ui/SectionCard';
import Button from '../ui/Button';
import LineItemRow from './LineItemRow';
import { useInvoice } from '../../context/InvoiceContext';

export default function LineItemsSection() {
  const { invoice, addItem } = useInvoice();

  return (
    <SectionCard title="Line Items" icon={<Package size={18} />} delay={0.4}>
      <div className="space-y-3.5">
        {/* Items */}
        <AnimatePresence mode="popLayout">
          {invoice.items.map((item, index) => (
            <LineItemRow key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>

        {/* Add Item Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="secondary"
            icon={<Plus size={16} />}
            onClick={addItem}
            className="w-full mt-2 border-dashed border-border-default/80 hover:border-accent/40 text-text-secondary hover:text-white"
          >
            Add Item
          </Button>
        </motion.div>
      </div>
    </SectionCard>
  );
}

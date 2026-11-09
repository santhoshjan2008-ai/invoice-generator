import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInvoice } from '../../context/InvoiceContext';
import type { LineItem } from '../../types/invoice';
import { calculateItemAmount } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

interface LineItemRowProps {
  item: LineItem;
  index: number;
}

export default function LineItemRow({ item, index }: LineItemRowProps) {
  const { invoice, updateItem, removeItem } = useInvoice();
  const amount = calculateItemAmount(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-[#18181b]/70 border border-border-default/80 rounded-2xl p-4 space-y-3.5 relative group hover:border-[#38383c] transition-colors"
    >
      {/* Top row: Item label & Trash icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">Item #{index + 1}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => removeItem(item.id)}
          title="Remove item"
          className="text-text-muted hover:text-danger p-1 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>

      {/* Description input */}
      <input
        value={item.description}
        onChange={e => updateItem(item.id, 'description', e.target.value)}
        placeholder="Item description (e.g. UI/UX review of all web products)"
        className="w-full bg-[#141416] border border-border-default rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30"
      />

      {/* Bottom row: Rate, QTY, Tax, Amount */}
      <div className="grid grid-cols-[1.2fr_70px_80px_1fr] gap-2.5 items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-text-muted font-medium">Rate</span>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">
              {invoice.currency.symbol}
            </span>
            <input
              type="number"
              value={item.rate || ''}
              onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full bg-[#141416] border border-border-default rounded-xl pl-7 pr-3 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 tabular-nums"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-text-muted font-medium text-center">QTY</span>
          <input
            type="number"
            min="1"
            value={item.quantity || ''}
            onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
            placeholder="1"
            className="w-full bg-[#141416] border border-border-default rounded-xl px-2 py-2.5 text-sm text-text-primary outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 text-center tabular-nums"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-text-muted font-medium text-center">Tax</span>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              value={item.tax || ''}
              onChange={e => updateItem(item.id, 'tax', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full bg-[#141416] border border-border-default rounded-xl pl-3 pr-6 py-2.5 text-sm text-text-primary outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 text-center tabular-nums"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs font-medium">
              %
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-text-muted font-medium text-right">Amount</span>
          <div className="bg-[#141416]/60 border border-border-default/60 rounded-xl px-3 py-2.5 text-sm text-white font-semibold text-right tabular-nums">
            {formatCurrency(amount, invoice.currency)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

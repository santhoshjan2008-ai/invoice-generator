import { motion } from 'framer-motion';
import { useInvoice } from '../../context/InvoiceContext';
import { calculateItemAmount, calculateSubtotal, calculateDiscount, calculateTotalTax, calculateTotal } from '../../utils/calculations';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function InvoicePreview() {
  const { invoice } = useInvoice();
  const subtotal = calculateSubtotal(invoice.items);
  const discount = calculateDiscount(subtotal, invoice.discount);
  const tax = calculateTotalTax(invoice.items);
  const total = calculateTotal(invoice.items, invoice.discount);

  return (
    <motion.div
      layout
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Company Header */}
      <div className="px-8 py-5 border-b border-[#262628] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {invoice.companyLogo && (
            <img
              src={invoice.companyLogo}
              alt="Logo"
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              className="w-5 h-5 object-contain"
            />
          )}
          <span className="font-medium text-white text-base tracking-tight">
            {invoice.clientName || 'Figma Inc.'}
          </span>
        </div>
        <span className="text-sm text-[#71717a] font-normal">{invoice.companyCity}</span>
      </div>

      {/* Invoice Body */}
      <div className="px-8 py-7 space-y-6">
        {/* Logo & Invoice Info */}
        <div className="flex justify-between items-start">
          <div>
            {invoice.companyLogo && (
              <div className="w-14 h-14 bg-[#222225] rounded-2xl flex items-center justify-center mb-4 border border-[#2e2e33] p-3 shadow-sm">
                <img
                  src={invoice.companyLogo}
                  alt="Logo"
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  className="w-8 h-8 object-contain"
                />
              </div>
            )}
            <div className="text-sm text-[#e4e4e7] font-normal">
              Invoice from {invoice.companyName || '—'}
            </div>
            <div className="text-xs text-[#71717a] mt-0.5 font-mono">
              ID: {invoice.invoiceNumber}
            </div>
          </div>
          <div className="text-right text-xs space-y-1.5 pt-1">
            <div>
              <span className="text-[#71717a]">Issue Date: </span>
              <span className="text-[#f4f4f5] font-medium ml-1.5">{formatDate(invoice.issueDate)}</span>
            </div>
            <div>
              <span className="text-[#71717a]">Due Date: </span>
              <span className="text-[#f4f4f5] font-medium ml-1.5">{formatDate(invoice.dueDate)}</span>
            </div>
          </div>
        </div>

        {/* Bill From / To */}
        <div className="grid grid-cols-2 gap-8 pt-1">
          <div>
            <div className="text-xs text-[#71717a] mb-2 font-normal">Bill from:</div>
            <div className="text-sm text-white font-medium">{invoice.companyName || '—'}</div>
            <div className="text-xs text-[#a1a1aa] mt-1 whitespace-pre-line leading-relaxed">
              {invoice.companyAddress}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#71717a] mb-2 font-normal">Bill to:</div>
            <div className="text-sm text-white font-medium">{invoice.clientName || '—'}</div>
            <div className="text-xs text-[#a1a1aa] mt-1 whitespace-pre-line leading-relaxed">
              {invoice.clientAddress}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-6">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_50px_90px_90px] gap-3 py-2 px-3 bg-[#222226] rounded-xl text-xs text-[#71717a]">
            <span>Item</span>
            <span className="text-center">QTY</span>
            <span className="text-right">Rate</span>
            <span className="text-right">Amount</span>
          </div>

          {/* Table Rows */}
          <div className="mt-1 divide-y divide-[#26262a]/50">
            {invoice.items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-[1fr_50px_90px_90px] gap-3 py-3 px-3 text-xs"
              >
                <span className="text-[#d4d4d8] leading-relaxed">{item.description || '—'}</span>
                <span className="text-[#a1a1aa] text-center tabular-nums">{item.quantity}</span>
                <span className="text-[#a1a1aa] text-right tabular-nums">
                  {formatCurrency(item.rate, invoice.currency)}
                </span>
                <span className="text-white text-right tabular-nums font-medium">
                  {formatCurrency(calculateItemAmount(item), invoice.currency)}
                </span>
              </motion.div>
            ))}

            {invoice.items.length === 0 && (
              <div className="py-8 text-center text-xs text-[#52525b]">
                No items added yet
              </div>
            )}
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end pt-3">
          <div className="w-56 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#71717a]">Subtotal</span>
              <span className="text-[#e4e4e7] tabular-nums font-medium">{formatCurrency(subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717a]">Discount</span>
              <span className="text-[#e4e4e7] tabular-nums">
                {invoice.discount > 0 ? `-${formatCurrency(discount, invoice.currency)} (${invoice.discount}%)` : '0%'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717a]">Tax</span>
              <span className="text-[#e4e4e7] tabular-nums">{formatCurrency(tax, invoice.currency)}</span>
            </div>
            <div className="pt-2 flex justify-between items-baseline">
              <span className="text-sm text-[#71717a] font-normal">Total</span>
              <motion.span
                key={total}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-white tabular-nums tracking-tight"
              >
                {formatCurrency(total, invoice.currency)}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="border-t border-[#2a2a2a] pt-4 mt-4">
            <div className="text-xs text-[#888] mb-1 font-medium">Notes</div>
            <div className="text-xs text-[#999] whitespace-pre-line">{invoice.notes}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

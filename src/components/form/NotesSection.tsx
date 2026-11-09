import { StickyNote } from 'lucide-react';
import SectionCard from '../ui/SectionCard';
import { useInvoice } from '../../context/InvoiceContext';

export default function NotesSection() {
  const { invoice, updateField } = useInvoice();

  return (
    <SectionCard title="Notes / Terms" icon={<StickyNote size={18} />} delay={0.6}>
      <textarea
        value={invoice.notes}
        onChange={e => updateField('notes', e.target.value)}
        placeholder="Payment terms, bank details, or any additional notes..."
        rows={4}
        className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 hover:border-[#333] resize-none"
      />
    </SectionCard>
  );
}

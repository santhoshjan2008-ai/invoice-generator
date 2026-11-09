import { UserCircle } from 'lucide-react';
import SectionCard from '../ui/SectionCard';
import Input from '../ui/Input';
import { useInvoice } from '../../context/InvoiceContext';

export default function ClientInfoSection() {
  const { invoice, updateField } = useInvoice();

  return (
    <SectionCard title="Client Information" icon={<UserCircle size={18} />} delay={0.2}>
      <div className="space-y-4">
        <Input
          label="Client Name"
          value={invoice.clientName}
          onChange={e => updateField('clientName', e.target.value)}
          placeholder="Client / Company Name"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-text-secondary font-medium">Client Address</label>
          <textarea
            value={invoice.clientAddress}
            onChange={e => updateField('clientAddress', e.target.value)}
            placeholder="Client address"
            rows={3}
            className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 hover:border-[#333] resize-none"
          />
        </div>
      </div>
    </SectionCard>
  );
}

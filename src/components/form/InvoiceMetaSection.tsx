import { Hash, Calendar } from 'lucide-react';
import SectionCard from '../ui/SectionCard';
import Input from '../ui/Input';
import { useInvoice } from '../../context/InvoiceContext';
import CurrencySelector from './CurrencySelector';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function InvoiceMetaSection() {
  const { invoice, updateField } = useInvoice();

  return (
    <SectionCard title="Invoice Details" icon={<Hash size={18} />} delay={0.3}>
      <div className="space-y-4">
        <Input
          label="Invoice Number"
          value={invoice.invoiceNumber}
          onChange={e => updateField('invoiceNumber', e.target.value)}
          placeholder="#0001"
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-text-secondary font-medium">Issue Date</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted z-10">
                <Calendar size={16} />
              </div>
              <DatePicker
                selected={invoice.issueDate}
                onChange={(date: Date | null) => date && updateField('issueDate', date)}
                dateFormat="dd MMM, yyyy"
                className="w-full bg-bg-input border border-border-default rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 hover:border-[#333]"
                calendarClassName="dark-datepicker"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-text-secondary font-medium">Due Date</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted z-10">
                <Calendar size={16} />
              </div>
              <DatePicker
                selected={invoice.dueDate}
                onChange={(date: Date | null) => date && updateField('dueDate', date)}
                dateFormat="dd MMM, yyyy"
                className="w-full bg-bg-input border border-border-default rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 hover:border-[#333]"
                calendarClassName="dark-datepicker"
              />
            </div>
          </div>
        </div>

        <CurrencySelector />
      </div>
    </SectionCard>
  );
}

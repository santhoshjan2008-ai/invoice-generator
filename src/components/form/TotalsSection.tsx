import { Calculator } from 'lucide-react';
import SectionCard from '../ui/SectionCard';
import Input from '../ui/Input';
import { useInvoice } from '../../context/InvoiceContext';

export default function TotalsSection() {
  const { invoice, updateField } = useInvoice();

  return (
    <SectionCard title="Discount" icon={<Calculator size={18} />} delay={0.5}>
      <Input
        label="Discount (%)"
        type="number"
        value={invoice.discount || ''}
        onChange={e => updateField('discount', parseFloat(e.target.value) || 0)}
        placeholder="0"
      />
    </SectionCard>
  );
}

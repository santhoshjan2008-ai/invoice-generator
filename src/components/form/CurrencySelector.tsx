import { useInvoice } from '../../context/InvoiceContext';
import { currencies } from '../../data/currencies';

export default function CurrencySelector() {
  const { invoice, updateField } = useInvoice();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-text-secondary font-medium">Currency</label>
      <div className="relative">
        <select
          value={invoice.currency.code}
          onChange={e => {
            const selected = currencies.find(c => c.code === e.target.value);
            if (selected) updateField('currency', selected);
          }}
          className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 hover:border-[#333] appearance-none cursor-pointer"
        >
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.flag}  {currency.code}  {currency.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#a0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

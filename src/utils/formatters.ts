import type { Currency } from '../types/invoice';

export function formatCurrency(amount: number, currency: Currency): string {
  const hasDecimals = amount % 1 !== 0;
  return `${currency.symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (!d || isNaN(d.getTime())) return '';
  const day = d.toLocaleDateString('en-US', { day: '2-digit' });
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
}

export function generateInvoiceId(): string {
  const num = Math.floor(Math.random() * 9999) + 1;
  return `#${num.toString().padStart(4, '0')}`;
}

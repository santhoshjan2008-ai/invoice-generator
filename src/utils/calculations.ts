import type { LineItem } from '../types/invoice';

export function calculateItemAmount(item: LineItem): number {
  return item.quantity * item.rate;
}

export function calculateItemTax(item: LineItem): number {
  const amount = calculateItemAmount(item);
  return amount * (item.tax / 100);
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + calculateItemAmount(item), 0);
}

export function calculateTotalTax(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + calculateItemTax(item), 0);
}

export function calculateDiscount(subtotal: number, discountPercent: number): number {
  return subtotal * (discountPercent / 100);
}

export function calculateTotal(items: LineItem[], discountPercent: number): number {
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(subtotal, discountPercent);
  const tax = calculateTotalTax(items);
  return subtotal - discount + tax;
}

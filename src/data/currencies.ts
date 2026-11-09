import type { Currency } from '../types/invoice';

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'United States Dollars', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pounds', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollars', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollars', flag: '🇦🇺' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupees', flag: '🇮🇳' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Francs', flag: '🇨🇭' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollars', flag: '🇸🇬' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: '🇰🇷' },
];

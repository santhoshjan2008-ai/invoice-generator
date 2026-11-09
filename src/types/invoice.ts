export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
}

export interface InvoiceData {
  // Company (sender)
  companyName: string;
  companyLogo: string | null;
  companyAddress: string;
  companyCity: string;

  // Client (recipient)
  clientName: string;
  clientAddress: string;

  // Invoice metadata
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  currency: Currency;

  // Line items
  items: LineItem[];

  // Totals
  discount: number;
  taxRate: number;

  // Notes
  notes: string;
}

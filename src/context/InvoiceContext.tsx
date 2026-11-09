import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { InvoiceData, LineItem } from '../types/invoice';
import { currencies } from '../data/currencies';
import { DEFAULT_LOGO } from '../data/defaultLogo';

const defaultItem: LineItem = {
  id: '1',
  description: 'UI/UX review of all web products on the platform',
  quantity: 3,
  rate: 1000,
  tax: 10,
};

const defaultItem2: LineItem = {
  id: '2',
  description: 'Logo Design',
  quantity: 1,
  rate: 2000,
  tax: 10,
};

const defaultItem3: LineItem = {
  id: '3',
  description: 'Review of Business Strategy',
  quantity: 1,
  rate: 5000,
  tax: 0,
};

const today = new Date();
const dueDate = new Date();
dueDate.setDate(today.getDate() + 30);

const defaultInvoice: InvoiceData = {
  companyName: 'Google Design Inc',
  companyLogo: DEFAULT_LOGO,
  companyAddress: '16/345 Palatial Avenue, South Mascot,\n2026',
  companyCity: 'Los Angeles, California',
  clientName: 'Figma Inc.',
  clientAddress: '760 Market Street, Floor 10,\nUnited States',
  invoiceNumber: '#0045',
  issueDate: new Date('2025-03-01T00:00:00'),
  dueDate: new Date('2025-03-31T00:00:00'),
  currency: currencies[0],
  items: [defaultItem, defaultItem2, defaultItem3],
  discount: 0,
  taxRate: 10,
  notes: '',
};

interface InvoiceContextType {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
  updateField: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, field: keyof LineItem, value: string | number) => void;
  resetDemo: () => void;
  clearForm: () => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoice);

  const updateField = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      tax: 0,
    };
    setInvoice(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const resetDemo = () => {
    setInvoice(defaultInvoice);
  };

  const clearForm = () => {
    setInvoice({
      companyName: '',
      companyLogo: null,
      companyAddress: '',
      companyCity: '',
      clientName: '',
      clientAddress: '',
      invoiceNumber: '#0001',
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      currency: currencies[0],
      items: [
        {
          id: Date.now().toString(),
          description: '',
          quantity: 1,
          rate: 0,
          tax: 0,
        },
      ],
      discount: 0,
      taxRate: 0,
      notes: '',
    });
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice,
        updateField,
        addItem,
        removeItem,
        updateItem,
        resetDemo,
        clearForm,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within InvoiceProvider');
  }
  return context;
}

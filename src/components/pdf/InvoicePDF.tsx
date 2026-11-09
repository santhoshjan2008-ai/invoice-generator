import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { InvoiceData } from '../../types/invoice';
import { calculateItemAmount, calculateSubtotal, calculateDiscount, calculateTotalTax, calculateTotal } from '../../utils/calculations';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#333',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 24,
  },
  companyName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#111',
  },
  companyCity: {
    fontSize: 10,
    color: '#888',
  },
  logo: {
    width: 48,
    height: 48,
    objectFit: 'contain',
  },
  invoiceInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  invoiceTitle: {
    fontSize: 11,
    color: '#555',
  },
  invoiceId: {
    fontSize: 9,
    color: '#999',
    marginTop: 2,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 3,
  },
  dateLabel: {
    fontSize: 9,
    color: '#999',
  },
  dateValue: {
    fontSize: 9,
    color: '#333',
    fontFamily: 'Helvetica-Bold',
  },
  billingSection: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 24,
  },
  billingColumn: {
    flex: 1,
  },
  billingLabel: {
    fontSize: 8,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  billingName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333',
    marginBottom: 2,
  },
  billingAddress: {
    fontSize: 9,
    color: '#666',
    lineHeight: 1.5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  colItem: {
    flex: 3,
    fontSize: 9,
    color: '#555',
  },
  colQty: {
    flex: 0.8,
    fontSize: 9,
    color: '#555',
    textAlign: 'center',
  },
  colRate: {
    flex: 1,
    fontSize: 9,
    color: '#555',
    textAlign: 'right',
  },
  colAmount: {
    flex: 1,
    fontSize: 9,
    color: '#333',
    textAlign: 'right',
    fontFamily: 'Helvetica-Bold',
  },
  headerText: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalsSection: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  totalsContainer: {
    width: 200,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 9,
    color: '#999',
  },
  totalValue: {
    fontSize: 9,
    color: '#555',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  grandTotalLabel: {
    fontSize: 10,
    color: '#333',
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'Helvetica-Bold',
  },
  notes: {
    marginTop: 30,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  notesLabel: {
    fontSize: 8,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notesText: {
    fontSize: 9,
    color: '#666',
    lineHeight: 1.5,
  },
});

function formatCurrencyPDF(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDatePDF(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (!d || isNaN(d.getTime())) return '';
  const day = d.toLocaleDateString('en-US', { day: '2-digit' });
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
}

interface InvoicePDFProps {
  invoice: InvoiceData;
}

export default function InvoicePDF({ invoice }: InvoicePDFProps) {
  const subtotal = calculateSubtotal(invoice.items);
  const discount = calculateDiscount(subtotal, invoice.discount);
  const tax = calculateTotalTax(invoice.items);
  const total = calculateTotal(invoice.items, invoice.discount);
  const sym = invoice.currency.symbol;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {invoice.companyLogo && !invoice.companyLogo.startsWith('data:image/svg') && (
              <Image src={invoice.companyLogo} style={styles.logo} />
            )}
            <Text style={styles.companyName}>{invoice.clientName || invoice.companyName || 'Company Name'}</Text>
          </View>
          <Text style={styles.companyCity}>{invoice.companyCity}</Text>
        </View>

        {/* Invoice Info */}
        <View style={styles.invoiceInfoSection}>
          <View>
            <Text style={styles.invoiceTitle}>Invoice from {invoice.companyName || '—'}</Text>
            <Text style={styles.invoiceId}>ID: {invoice.invoiceNumber}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Issue Date:</Text>
              <Text style={styles.dateValue}>{formatDatePDF(invoice.issueDate)}</Text>
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Due Date:</Text>
              <Text style={styles.dateValue}>{formatDatePDF(invoice.dueDate)}</Text>
            </View>
          </View>
        </View>

        {/* Billing */}
        <View style={styles.billingSection}>
          <View style={styles.billingColumn}>
            <Text style={styles.billingLabel}>Bill from:</Text>
            <Text style={styles.billingName}>{invoice.companyName || '—'}</Text>
            <Text style={styles.billingAddress}>{invoice.companyAddress}</Text>
          </View>
          <View style={styles.billingColumn}>
            <Text style={styles.billingLabel}>Bill to:</Text>
            <Text style={styles.billingName}>{invoice.clientName || '—'}</Text>
            <Text style={styles.billingAddress}>{invoice.clientAddress}</Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.colItem, styles.headerText]}>Item</Text>
          <Text style={[styles.colQty, styles.headerText]}>QTY</Text>
          <Text style={[styles.colRate, styles.headerText]}>Rate</Text>
          <Text style={[styles.colAmount, styles.headerText]}>Amount</Text>
        </View>

        {/* Table Rows */}
        {invoice.items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 1 ? { backgroundColor: '#fafafa' } : {},
            ]}
          >
            <Text style={styles.colItem}>{item.description || '—'}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colRate}>{formatCurrencyPDF(item.rate, sym)}</Text>
            <Text style={styles.colAmount}>{formatCurrencyPDF(calculateItemAmount(item), sym)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrencyPDF(subtotal, sym)}</Text>
            </View>
            {invoice.discount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount ({invoice.discount}%)</Text>
                <Text style={styles.totalValue}>-{formatCurrencyPDF(discount, sym)}</Text>
              </View>
            )}
            {tax > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text style={styles.totalValue}>{formatCurrencyPDF(tax, sym)}</Text>
              </View>
            )}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>{formatCurrencyPDF(total, sym)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes ? (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

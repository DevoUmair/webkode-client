import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define TypeScript interfaces
interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

interface Account {
  _id: string;
  userId: User;
  balance: number;
  cnic: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Transaction {
  _id: string;
  senderAccountId: Account;
  receiverAccountId: Account;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface InvoiceProps {
  transactions: Transaction[];
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 9,
  },
  summarySection: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: '1px solid #000',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  summaryValue: {
    fontSize: 10,
  },
  grandTotal: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1px solid #000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grandTotalLabel: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  grandTotalValue: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

const Invoice: React.FC<InvoiceProps> = ({ transactions = [] }) => {
  const grandTotal = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const date = new Date().toLocaleDateString();
  // Calculate summary by sender
  const senderSummary: Record<string, { name: string; total: number }> = {};
  transactions.forEach(txn => {
    const senderId = txn.senderAccountId.userId._id;
    if (!senderSummary[senderId]) {
      senderSummary[senderId] = {
        name: txn.senderAccountId.userId.fullName,
        total: 0
      };
    }
    senderSummary[senderId].total += txn.amount;
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Transaction Invoice</Text>
          <Text style={styles.subtitle}>Generated on: {date}</Text>
          <Text style={styles.subtitle}>Total Transactions: {transactions.length}</Text>
        </View>

        {/* Transactions Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow} >
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Date & Time</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Sender</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Receiver</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Amount</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Status</Text>
            </View>
          </View>
          
          {/* Table Body */}
          {transactions.map(txn => (
            <View key={txn._id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.bodyText}>
                  {new Date(txn.createdAt).toLocaleString()}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.bodyText}>
                  {txn.senderAccountId.userId.fullName}
                </Text>
                <Text style={[styles.bodyText, { fontSize: 8, color: '#666' }]}>
                  {txn.senderAccountId.userId.email}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.bodyText}>
                  {txn.receiverAccountId.userId.fullName}
                </Text>
                <Text style={[styles.bodyText, { fontSize: 8, color: '#666' }]}>
                  {txn.receiverAccountId.userId.email}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.bodyText}>
                  ${txn.amount.toFixed(2)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.bodyText}>Completed</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        {/* <View style={styles.summarySection}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Summary by Sender:</Text>
          {Object.entries(senderSummary).map(([senderId, summary]) => (
            <View key={senderId} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{summary.name}:</Text>
              <Text style={styles.summaryValue}>${summary.total.toFixed(2)}</Text>
            </View>
          ))}
        </View> */}

        {/* Grand Total */}
        {/* <View style={styles.grandTotal}>
          <Text style={styles.grandTotalLabel}>Grand Total:</Text>
          <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default Invoice;

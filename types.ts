
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string; // ISO string YYYY-MM-DD
  category: string;
  type: TransactionType;
}

export interface MonthSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

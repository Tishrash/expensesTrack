export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
  userId: string;
}

export type ExpenseCategory = 
  | 'Food'
  | 'Transport'
  | 'Bills'
  | 'Entertainment'
  | 'Shopping'
  | 'Healthcare'
  | 'Education'
  | 'Savings'
  | 'Budgeting';

export interface ExpenseSummary {
  total: number;
  averageExpense: number;
  categorySums: {
    [key: string]: number;
  };
}

export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoStatus = 'pending' | 'in_progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: TodoPriority;
  status: TodoStatus;
  dueDate: string;
  budget?: number;
  category?: ExpenseCategory;
  userId: string;
  createdAt: string;
  updatedAt: string;
} 
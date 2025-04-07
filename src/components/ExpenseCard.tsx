'use client';

import { Expense, ExpenseCategory } from '@/types';

const categoryColors: Record<ExpenseCategory, string> = {
  Food: 'bg-green-100 text-green-800',
  Transport: 'bg-blue-100 text-blue-800',
  Bills: 'bg-red-100 text-red-800',
  Shopping: 'bg-purple-100 text-purple-800',
  Entertainment: 'bg-yellow-100 text-yellow-800',
  Healthcare: 'bg-pink-100 text-pink-800',
  Education: 'bg-indigo-100 text-indigo-800',
  Savings: 'bg-teal-100 text-teal-800',
  Budgeting: 'bg-gray-100 text-gray-800'
};

interface ExpenseCardProps {
  expense: Expense;
}

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(expense.amount);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{expense.description}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[expense.category]}`}>
          {expense.category}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{formattedAmount}</p>
      </div>
    </div>
  );
} 
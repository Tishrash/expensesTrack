'use client';

import { Expense, ExpenseCategory } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ExpenseChartProps {
  expenses: Expense[];
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Calculate total expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  // Transform data for the pie chart
  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const COLORS = [
    '#10B981', // green
    '#3B82F6', // blue
    '#EF4444', // red
    '#8B5CF6', // purple
    '#F59E0B', // yellow
    '#EC4899', // pink
    '#6366F1', // indigo
    '#6B7280'  // gray
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(value)
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 
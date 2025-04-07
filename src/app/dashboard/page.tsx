'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Expense, ExpenseSummary } from '@/types';
import Navbar from '@/components/Navbar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Toast from '@/components/Toast';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const formatCurrency = (amount: number): string => {
  return `LKR ${amount.toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary>({
    total: 0,
    averageExpense: 0,
    categorySums: {}
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Load expenses from localStorage
      const userExpenses = JSON.parse(localStorage.getItem(`expenses_${user.id}`) || '[]');
      setExpenses(userExpenses);
      calculateSummary(userExpenses);
    }
  }, [user]);

  useEffect(() => {
    if (expenses.length > 0) {
      const summary = calculateSummary(expenses);
      setSummary(summary);

      // Prepare data for charts
      const chartData = {
        labels: Object.keys(summary.categorySums),
        datasets: [
          {
            data: Object.values(summary.categorySums),
            backgroundColor: [
              '#4F46E5', // Indigo
              '#10B981', // Emerald
              '#F59E0B', // Amber
              '#EF4444', // Red
              '#8B5CF6', // Purple
              '#EC4899', // Pink
              '#06B6D4', // Cyan
              '#14B8A6', // Teal
            ],
          },
        ],
      };
      setChartData(chartData);
    }
  }, [expenses]);

  const calculateSummary = (expenses: Expense[]): ExpenseSummary => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageExpense = expenses.length > 0 ? total / expenses.length : 0;
    
    const categorySums = expenses.reduce((sums: { [key: string]: number }, expense) => {
      sums[expense.category] = (sums[expense.category] || 0) + expense.amount;
      return sums;
    }, {});

    return {
      total,
      averageExpense,
      categorySums
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const
      }
    }
  };

  const barChartData = {
    labels: Object.keys(summary.categorySums),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(summary.categorySums),
        backgroundColor: '#36A2EB'
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(summary.total)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Average Expense</h3>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(summary.averageExpense)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Number of Transactions</h3>
            <p className="text-3xl font-bold text-purple-600">{expenses.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Distribution</h3>
            <div className="h-80">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses by Category</h3>
            <div className="h-80">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      </main>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
} 
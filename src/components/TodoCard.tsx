'use client';

import { format } from 'date-fns';
import { Todo, TodoStatus } from '@/types';
import { 
  CheckCircleIcon, 
  XMarkIcon,
  ExclamationCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface TodoCardProps {
  todo: Todo;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
}

const formatCurrency = (amount: number | string): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `LKR ${numericAmount.toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export default function TodoCard({ todo, onStatusChange, onDelete }: TodoCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500';
      case 'InProgress':
        return 'text-blue-500';
      case 'Todo':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return CheckCircleIcon;
      case 'InProgress':
        return ClockIcon;
      case 'Todo':
        return ExclamationCircleIcon;
      default:
        return ExclamationCircleIcon;
    }
  };

  const StatusIcon = getStatusIcon(todo.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      
      <p className="mt-2 text-sm text-gray-600">{todo.description}</p>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-sm">
          <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}</span>
        </div>
        
        {todo.budget && (
          <div className="flex items-center text-sm">
            <span className="text-gray-600">Budget: {formatCurrency(todo.budget)}</span>
          </div>
        )}
        
        {todo.category && (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {todo.category}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <StatusIcon className={`h-5 w-5 mr-2 ${getStatusColor(todo.status)}`} />
          <select
            value={todo.status}
            onChange={(e) => onStatusChange(todo.id, e.target.value as TodoStatus)}
            className={`text-sm font-medium ${getStatusColor(todo.status)} bg-transparent border-none focus:ring-0 cursor-pointer`}
          >
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className={`text-sm font-medium ${getPriorityColor(todo.priority)}`}>
          {todo.priority} Priority
        </div>
      </div>
    </div>
  );
} 
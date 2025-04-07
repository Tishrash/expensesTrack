'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { Todo, TodoStatus, TodoPriority, ExpenseCategory } from '@/types';
import Navbar from '@/components/Navbar';
import TodoCard from '@/components/TodoCard';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Toast from '@/components/Toast';

// Mock data for demonstration
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Review Monthly Budget',
    description: 'Analyze and adjust monthly budget allocation for different expense categories',
    priority: 'High',
    status: 'Todo',
    dueDate: format(new Date('2024-03-20'), 'yyyy-MM-dd'),
    budget: 5000,
    category: 'Bills',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Pay Utility Bills',
    description: 'Pay electricity, water, and internet bills for the month',
    priority: 'Medium',
    status: 'InProgress',
    dueDate: format(new Date('2024-03-25'), 'yyyy-MM-dd'),
    budget: 300,
    category: 'Bills',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Plan Grocery Shopping',
    description: 'Create shopping list and budget for weekly groceries',
    priority: 'Low',
    status: 'Completed',
    dueDate: format(new Date('2024-03-15'), 'yyyy-MM-dd'),
    budget: 200,
    category: 'Food',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function TodoPage() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '' as TodoStatus | '',
    priority: '' as TodoPriority | '',
    category: '' as ExpenseCategory | ''
  });
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'Medium' as TodoPriority,
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    budget: '',
    category: '' as ExpenseCategory
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // In a real app, fetch todos from your API
    setTodos(mockTodos);
    setFilteredTodos(mockTodos);
  }, []);

  useEffect(() => {
    let result = [...todos];

    if (filters.status) {
      result = result.filter(todo => todo.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter(todo => todo.priority === filters.priority);
    }
    if (filters.category) {
      result = result.filter(todo => todo.category === filters.category);
    }

    setFilteredTodos(result);
  }, [filters, todos]);

  const handleStatusChange = (id: string, status: TodoStatus) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status, updatedAt: new Date().toISOString() } : todo
    );
    setTodos(updatedTodos);
    showToastMessage('Todo status updated successfully', 'success');
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    showToastMessage('Todo deleted successfully', 'success');
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodoItem: Todo = {
      id: Date.now().toString(),
      ...newTodo,
      status: 'Todo',
      userId: user?.id || '',
      budget: newTodo.budget ? parseFloat(newTodo.budget) : undefined,
      dueDate: format(new Date(newTodo.dueDate), 'yyyy-MM-dd'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTodos([newTodoItem, ...todos]);
    setShowAddModal(false);
    setNewTodo({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      budget: '',
      category: '' as ExpenseCategory
    });
    showToastMessage('Todo added successfully', 'success');
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Financial Tasks</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>

          {/* Filters */}
          <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as TodoStatus }))}
                className="form-input py-1.5"
              >
                <option value="">All Status</option>
                <option value="Todo">Todo</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value as TodoPriority }))}
                className="form-input py-1.5"
              >
                <option value="">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as ExpenseCategory }))}
                className="form-input py-1.5"
              >
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
          {filteredTodos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      {/* Add Todo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Task</h2>
            <form onSubmit={handleAddTodo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  value={newTodo.title}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                  className="form-input mt-1"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  value={newTodo.description}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input mt-1"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value as TodoPriority }))}
                    className="form-input mt-1"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="form-input mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Budget (Optional)</label>
                  <input
                    type="number"
                    value={newTodo.budget}
                    onChange={(e) => setNewTodo(prev => ({ ...prev, budget: e.target.value }))}
                    className="form-input mt-1"
                    placeholder="Enter budget"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category (Optional)</label>
                  <select
                    value={newTodo.category}
                    onChange={(e) => setNewTodo(prev => ({ ...prev, category: e.target.value as ExpenseCategory }))}
                    className="form-input mt-1"
                  >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Bills">Bills</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
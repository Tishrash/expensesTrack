'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface RegisteredUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing auth token
    const token = Cookies.get('auth_token');
    if (token) {
      const userData = localStorage.getItem('current_user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setIsLoading(false);
  }, []);

  const initializeSampleData = (userId: string) => {
    // Check if sample data already exists
    const existingExpenses = localStorage.getItem(`expenses_${userId}`);
    if (!existingExpenses) {
      // Sample expenses data
      const sampleExpenses = [
        {
          id: '1',
          amount: 150.50,
          category: 'Food',
          date: '2024-03-15',
          description: 'Grocery shopping at Walmart',
          userId: userId
        },
        {
          id: '2',
          amount: 45.00,
          category: 'Transport',
          date: '2024-03-14',
          description: 'Gas station refill',
          userId: userId
        },
        {
          id: '3',
          amount: 200.00,
          category: 'Bills',
          date: '2024-03-13',
          description: 'Monthly electricity bill',
          userId: userId
        },
        {
          id: '4',
          amount: 75.25,
          category: 'Entertainment',
          date: '2024-03-12',
          description: 'Movie night with friends',
          userId: userId
        },
        {
          id: '5',
          amount: 120.00,
          category: 'Shopping',
          date: '2024-03-11',
          description: 'New clothes from H&M',
          userId: userId
        },
        {
          id: '6',
          amount: 85.00,
          category: 'Healthcare',
          date: '2024-03-10',
          description: 'Monthly medicine prescription',
          userId: userId
        },
        {
          id: '7',
          amount: 299.99,
          category: 'Education',
          date: '2024-03-09',
          description: 'Online course subscription',
          userId: userId
        },
        {
          id: '8',
          amount: 500.00,
          category: 'Savings',
          date: '2024-03-08',
          description: 'Monthly savings deposit',
          userId: userId
        },
        {
          id: '9',
          amount: 65.50,
          category: 'Food',
          date: '2024-03-07',
          description: 'Restaurant dinner',
          userId: userId
        },
        {
          id: '10',
          amount: 35.00,
          category: 'Transport',
          date: '2024-03-06',
          description: 'Uber ride',
          userId: userId
        },
        {
          id: '11',
          amount: 89.99,
          category: 'Bills',
          date: '2024-03-05',
          description: 'Internet bill',
          userId: userId
        },
        {
          id: '12',
          amount: 150.00,
          category: 'Shopping',
          date: '2024-03-04',
          description: 'Electronics accessories',
          userId: userId
        },
        {
          id: '13',
          amount: 250.00,
          category: 'Healthcare',
          date: '2024-03-03',
          description: 'Dental checkup',
          userId: userId
        },
        {
          id: '14',
          amount: 50.00,
          category: 'Entertainment',
          date: '2024-03-02',
          description: 'Gaming subscription',
          userId: userId
        },
        {
          id: '15',
          amount: 1000.00,
          category: 'Savings',
          date: '2024-03-01',
          description: 'Emergency fund contribution',
          userId: userId
        }
      ];

      // Store sample expenses
      localStorage.setItem(`expenses_${userId}`, JSON.stringify(sampleExpenses));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // First check for demo account
      if (email === 'tishanrashmika00@gmail.com' && password === 'Tishan@123') {
        const userData = {
          id: '1',
          email,
          name: 'Tishan Rashmika'
        };
        localStorage.setItem('current_user', JSON.stringify(userData));
        setUser(userData);
        Cookies.set('auth_token', 'demo_token', { expires: 1 });
        initializeSampleData(userData.id);
        router.push('/dashboard');
        return;
      }

      // Check registered users
      const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Find user by email first
      const foundUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      // If no user found or password doesn't match
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid credentials');
      }

      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name
      };

      localStorage.setItem('current_user', JSON.stringify(userData));
      setUser(userData);
      Cookies.set('auth_token', 'user_token', { expires: 1 });
      initializeSampleData(userData.id);
      router.push('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    try {
      // Get existing users
      const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Check for existing email (case-insensitive)
      if (registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email already registered');
      }

      // Generate user ID
      const userId = Date.now().toString();

      // Create new user data with password for registeredUsers
      const newUser: RegisteredUser = {
        id: userId,
        email,
        name,
        password
      };

      // Add to registered users
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      // Create current session user data without password
      const currentUser = {
        id: userId,
        email,
        name
      };

      // Set current user session
      localStorage.setItem('current_user', JSON.stringify(currentUser));
      setUser(currentUser);
      Cookies.set('auth_token', 'user_token', { expires: 1 });

      // Initialize sample data
      initializeSampleData(userId);

      // Redirect to dashboard
      router.push('/dashboard');

    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('current_user');
    Cookies.remove('auth_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
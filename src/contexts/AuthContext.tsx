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

  // Initialize demo accounts when the app starts
  useEffect(() => {
    // Initialize demo accounts in localStorage if they don't exist
    const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Add demo accounts if they don't exist
    const demoAccounts = [
      {
        id: '1',
        email: 'tishanrashmika00@gmail.com',
        password: 'Tishan@123',
        name: 'Tishan Rashmika'
      },
      {
        id: '2',
        email: 'rashmikagamage@gmail.com',
        password: 'Tishan@123',
        name: 'Rashmika Gamage'
      },
      {
        id: '3',
        email: 'gamage@gmail.com',
        password: 'Gamage@123',
        name: 'Gamage'
      }
    ];

    // Clear existing users and reinitialize
    localStorage.setItem('registeredUsers', JSON.stringify(demoAccounts));

    // Initialize sample data for each account
    demoAccounts.forEach(account => {
      initializeSampleData(account.id);
    });

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
    // Check if user already has expense data
    const existingExpenses = localStorage.getItem(`expenses_${userId}`);
    if (existingExpenses) {
      // If user already has data, don't initialize sample data
      return;
    }

    // Initialize empty array for user 2 and user 3
    if (userId === '2' || userId === '3') {
      localStorage.setItem(`expenses_${userId}`, JSON.stringify([]));
      return;
    }

    // For other users, initialize with sample data if they don't have any data yet
    const sampleExpenses = [
      {
        id: '1',
        amount: 3500.00,
        category: 'Food',
        date: new Date().toISOString().split('T')[0], // Today's date
        description: 'Monthly food expenses',
        userId: userId
      },
      {
        id: '2',
        amount: 2000.00,
        category: 'Transport',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        description: 'Car maintenance',
        userId: userId
      },
      {
        id: '3',
        amount: 4500.00,
        category: 'Bills',
        date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
        description: 'Monthly utility bills',
        userId: userId
      },
      {
        id: '4',
        amount: 1500.00,
        category: 'Entertainment',
        date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
        description: 'Concert tickets',
        userId: userId
      },
      {
        id: '5',
        amount: 6000.00,
        category: 'Shopping',
        date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
        description: 'Electronics purchase',
        userId: userId
      },
      {
        id: '6',
        amount: 2500.00,
        category: 'Healthcare',
        date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
        description: 'Health insurance',
        userId: userId
      },
      {
        id: '7',
        amount: 7500.00,
        category: 'Education',
        date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
        description: 'Professional certification',
        userId: userId
      },
      {
        id: '8',
        amount: 15000.00,
        category: 'Savings',
        date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
        description: 'Investment deposit',
        userId: userId
      }
    ];

    // Store sample expenses
    localStorage.setItem(`expenses_${userId}`, JSON.stringify(sampleExpenses));
  };

  const login = async (email: string, password: string) => {
    try {
      // Get registered users
      const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Find user by email (case-insensitive)
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

      // Force reinitialize sample data on login
      initializeSampleData(foundUser.id);

      localStorage.setItem('current_user', JSON.stringify(userData));
      setUser(userData);
      Cookies.set('auth_token', 'user_token', { expires: 1 });
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
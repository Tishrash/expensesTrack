'use client';

import Link from 'next/link';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  ClockIcon, 
  ChartBarIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const navigation = {
    main: [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
      { name: 'Add Expense', href: '/add-expense', icon: PlusCircleIcon },
      { name: 'History', href: '/history', icon: ClockIcon },
      { name: 'Financial Tasks', href: '/financial-tasks', icon: ChartBarIcon },
    ],
    support: [
      { name: 'Help Center', href: '/help', icon: QuestionMarkCircleIcon },
      { name: 'Privacy Policy', href: '/privacy', icon: ShieldCheckIcon },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ExpenseTracker
            </span>
            <p className="mt-2 text-sm text-gray-500">
              Track your expenses and manage your budget with ease.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.main.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center text-base text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.support.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center text-base text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
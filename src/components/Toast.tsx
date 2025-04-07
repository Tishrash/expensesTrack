'use client';

import { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`rounded-lg p-4 flex items-center space-x-2 shadow-lg ${
        type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      }`}>
        {type === 'success' ? (
          <CheckCircleIcon className="h-5 w-5 text-green-400" />
        ) : (
          <XCircleIcon className="h-5 w-5 text-red-400" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className={`ml-4 inline-flex rounded-md p-1.5 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            type === 'success' 
              ? 'hover:bg-green-200 focus:ring-green-500'
              : 'hover:bg-red-200 focus:ring-red-500'
          }`}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 
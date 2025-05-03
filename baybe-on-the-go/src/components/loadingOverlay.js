import React from 'react';
import { Loader2Icon } from 'lucide-react';

const LoadingOverlay = ({ message = 'Processing...' }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="p-4 bg-white rounded-lg shadow-lg flex items-center space-x-2">
        <Loader2Icon className="h-5 w-5 animate-spin text-blue-500" />
        <span className="text-sm font-medium text-gray-700">{message}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;

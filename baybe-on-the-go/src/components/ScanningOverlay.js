import React from 'react';

export default function ScanningOverlay({ children }) {
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-full bg-black bg-opacity-30" />
        <div className="absolute left-0 w-full h-1 bg-blue-500 animate-scan" />
      </div>
    </div>
  );
} 
import React from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  { title: 'Travel Insurance', priority: 'High' },
  { title: 'Medical Records', priority: 'High' },
  { title: 'Hotel Bookings', priority: 'Medium' },
  { title: 'Flight Tickets', priority: 'Medium' },
  { title: 'Passport Copies', priority: 'High' },
  { title: 'Activity Reservations', priority: 'Low' },
];

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

export default function DocUpload() {
  return (
    <div className="flex h-full">
      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Document Categories</h1>
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> //upload icon 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Automatic Scan & Sort
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm">📄</span>
                  {cat.title}
                </h2>
                <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[cat.priority]}`}>{cat.priority} Priority</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

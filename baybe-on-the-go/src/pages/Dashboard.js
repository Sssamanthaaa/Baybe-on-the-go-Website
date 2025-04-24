import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-10 space-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="space-y-5">

        <div className="bg-gray-50 p-6 rounded-2xl">
          <div className="space-y-2">

          <h2 className="text-lg font-bold">Upcoming Trip</h2>

          <div className="flex items-center gap-3">
            <Calendar className="text-blue-600" size={20} />
            <span className="font-medium text-gray-900">San Diego Family Vacation</span>
          </div>

          <div className="flex items-center gap-4">
            <MapPin size={16} />
            <span>La Jolla, San Diego</span>
          </div>

          <div className="flex items-center gap-4">
            <Clock size={16} />
            <span>May 15 - May 22, 2025</span>
          </div>
          
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">Photos & Documents</h2>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;


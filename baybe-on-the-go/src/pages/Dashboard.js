import React from 'react';
import { Calendar, Clock, MapPin, Upload } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-10 space-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="space-y-5">

        <div className="bg-gray-50 p-6 rounded-2xl">
          <div className="space-y-4">

          <h2 className="text-lg font-bold">Upcoming Trip</h2>


            {/* Make grid/flex column for calendar */}
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

            <div className="gap-4">
              <span className="bg-green-200 px-2 py-1 rounded-full">Family-Friendly</span>
              <span className="bg-blue-200 px-2 py-1 rounded-full">Beach</span>
              <span className="bg-purple-200 px-2 py-1 rounded-full">With Infant</span>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-2xl">
                Edit Trip
              </button>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl">
                View Details
              </button>
            </div>

          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">Photos & Documents</h2>
          <div className="bg-gray-50 border border-gray-300 p-5 space-y-10 rounded-2xl">
            
            <Upload className="text-blue-600" size={20} />
            <h2 className="text-md font-bold">Upload your photos and documents</h2>
            <h2 className="text-md">Drag and drop your files here or click to browse</h2>
            <button className="flex items-center gap-2 text-blue-600 bg-blue-200 hover:bg-blue-600 px-4 py-2 rounded-2xl">
              Browse Files
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;


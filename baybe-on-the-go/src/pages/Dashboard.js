import React from 'react';
import { Calendar, Clock, MapPin, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const nav = useNavigate();
  const viewTrip = () => {
    nav('/dashboard/trip')
  };

  return (
    <div className="p-10 space-y-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="space-y-5">

        {/* Upcoming Trips Section */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">Upcoming Trip</h2>
          <div className="space-y-4">  

            {/* columns */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 items-start mt-4">

              {/* left col */}
              <div className="bg-blue-100 p-3 rounded-lg flex items-center justify-center">
                <Calendar className="text-blue-600" size={28} />
              </div>
              
              {/* right col */}
              <div className="space-y-4"> 
                <div className="space-y-2"> 
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">San Diego Family Vacation</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="text-gray-500" size={20} />
                    <span className="text-gray-500">May 15 - May 22, 2025</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin className="text-gray-500" size={20} />
                    <span className="text-gray-500">La Jolla, San Diego</span>
                  </div>
                </div>

                <div className="gap-4">
                  <span className="bg-green-200 px-2 py-1 rounded-full">Family-Friendly</span>
                  <span className="bg-blue-200 px-2 py-1 rounded-full">Beach</span>
                  <span className="bg-purple-200 px-2 py-1 rounded-full">With Infant</span>
                </div>
              </div>

            </div>

            <div className="flex gap-4">
              <button onClick={viewTrip} className="flex-1 flex flex-col items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-2xl">
                Edit Trip
              </button>
              <button onClick={viewTrip} className="flex-1 flex flex-col items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl">
                View Details
              </button>
            </div>

          </div>
        </div>
        
        {/* Files Section */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">Photos & Documents</h2>
          <div className="mt-5 bg-gray-50 border border-gray-300 p-5 space-y-6 rounded-2xl flex flex-col items-center">
            
            {/* Dropbox Area */}
            <div className="bg-blue-100 p-3 rounded-full flex items-center justify-center">
              <Upload className="text-blue-600" size={30} />
            </div>
            <h2 className="text-md font-bold">Upload your photos and documents</h2>
            <h2 className="text-md">Drag and drop your files here or click to browse</h2>
            <button className="flex items-center gap-2 text-blue-600 bg-blue-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-2xl">
              Browse Files
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;


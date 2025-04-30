import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Plus, Minus, X } from 'lucide-react';

const DashboardTrip = () => {
  
  const nav = useNavigate();
  const viewTrip = () => {
    nav('/dashboard/trip')
  };
  
  return (
    <div className="p-10 space-y-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Hardcoded values for now */}
      <div className="space-y-5">

        <div className="bg-gray-50 p-6 rounded-2xl">
          
          <h2 className="text-lg font-bold">Trip Details</h2>
          <div className="space-y-4">  
            {/* Trip Details */}
            <div className="grid grid-rows-[auto_1fr] gap-4 p-6 items-start">
              {/* Trip Name */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center">
                <span className="font-medium text-gray-900">Trip Name</span>
                <div className="bg-gray-200 px-3 py-1 rounded-full">San Diego Family Vacation</div>
                <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                  <Pencil className="text-blue-500" size={18} />
                </button>
              </div>
              {/* Time Frame */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Time Frame</span>
                <div>
                  <span className="bg-gray-200 px-3 py-1 rounded-full">May 2, 2025</span>
                  <span className="font-medium text-gray-900"> - </span>
                  <span className="bg-gray-200 px-3 py-1 rounded-full">May 9, 2025</span>
                </div>
                <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                  <Pencil className="text-blue-500" size={18} />
                </button>
              </div> 
              {/* Destination */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Destination</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full">San Francisco, California</span>
                <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                  <Pencil className="text-blue-500" size={18} />
                </button>
              </div>  
            </div>  
          </div>  

          <h2 className="text-lg font-bold">Number of Travelers</h2>
          <div className="space-y-4">  
            {/* Number of Travelers */}
            <div className="grid grid-rows-[auto_1fr] gap-4 p-6 items-start">
              {/* Adults (18+) */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Adults (18+)</span>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                    <Minus className="text-blue-500" size={18} />
                  </button>
                  <span className="bg-gray-200 px-6 py-1 rounded-full">2</span>
                  <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                    <Plus className="text-blue-500" size={18} />
                  </button>
                </div>
              </div>
              {/* Children (2-17) */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Children (2-17)</span>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                    <Minus className="text-blue-500" size={18} />
                  </button>
                  <span className="bg-gray-200 px-6 py-1 rounded-full">2</span>
                  <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                    <Plus className="text-blue-500" size={18} />
                  </button>
                </div>
              </div> 
              {/* Baby (0-1) */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Baby (0-1)</span>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                    <Minus className="text-blue-500" size={18} />
                  </button>
                  <span className="bg-gray-200 px-6 py-1 rounded-full">1</span>
                  <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center">
                    <Plus className="text-blue-500" size={18} />
                  </button>
                </div>
              </div>  
            </div>  
          </div> 

          <h2 className="text-lg font-bold">Tags</h2>
          <div className="space-y-4">  
            {/* Tags */}
            <div className="grid grid-rows-[auto_1fr] gap-4 items-start">
              <div className="flex space-x-1">
                <button className="bg-green-200 hover:bg-green-300 text-green-700 px-2 py-1 rounded-full flex items-center">
                  Family-Friendly <X className="text-green-500" size={18} />
                </button>
                <button className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-2 py-1 rounded-full flex items-center">
                  Beach <X className="text-blue-500" size={18} />
                </button>
                <button className="bg-purple-200 hover:bg-purple-300 text-purple-700 px-2 py-1 rounded-full flex items-center">
                  With Infant <X className="text-purple-500" size={18} />
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full flex items-center">
                  Add <Plus className="text-gray-500" size={18} />
                </button>
              </div>
            </div>
          </div>

    
          {/* Trip Details */}
            {/* Rows of Item-ValueBox-EditIcon*/}

          {/* Number of Travelers */}
            {/* Rows of Item-MinusButton-ValueBox-PlusButton*/}

          {/* Tags */}
            {/* AddButton-TagsInStorageWithDeleteOption */}
            {/* Should these buttons be custom or preset for AI? */}

        </div>
      </div>  
    </div>
  );
};
    
export default DashboardTrip;
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 m-0"
            />
          </Link>
        </div>
        <div className="flex justify-between space-x-3 mr-4">
          <div className ="">
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              New Trip
            </button>
          </div>
          <div className ="">
            <button className="flex items-center hover:text-gray-800 text-gray-500 px-4 py-2 text-sm font-medium transition-colors">
              <FontAwesomeIcon icon={faList} className="text-xl mr-2" />
              All Trips
            </button>
          </div>
          <div className ="">
            <button className="flex items-center hover:text-gray-800 text-gray-500 px-4 py-2 text-sm font-medium transition-colors">
              <FontAwesomeIcon icon={faGear} className="text-xl mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
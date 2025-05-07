import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);
  const nav = useNavigate();
  const location = useLocation();
  const isOnLoginPage = location.pathname === '/' || location.pathname === '/login' || location.pathname ===  '/signup';


  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear auth state here if needed
    nav('/');
  };
  
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
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings((prev) => !prev)} 
              className="flex items-center hover:text-gray-800 text-gray-500 px-4 py-2 text-sm font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faGear} className="text-xl mr-2" />
              Settings
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {isOnLoginPage ? (
                  <button
                    onClick={() => nav('/login')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-blue-600"
                  >
                    Login
                  </button>
                ) : (  //ternary operator here because if-else won't work
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Log Out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
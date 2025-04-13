import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ tripName = "Trip Name" }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/photo-gallery', label: 'Photo Gallery', icon: '🖼️' },
    { path: '/documentation', label: 'Documentation', icon: '📄' },
    { path: '/packing-list', label: 'Packing List', icon: '📋' },
  ];

  return (
    <div className="h-full bg-gray-50 w-64 shadow-sm">
      {/* Trip Name */}
      <div className="px-4 py-6">
        <h1 className="text-lg font-medium text-gray-700">{tripName}</h1>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-2">
        <ul>
          {menuItems.map((item) => {
            const isActive = activePath.includes(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
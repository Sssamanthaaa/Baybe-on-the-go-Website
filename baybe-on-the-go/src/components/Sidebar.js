import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import {
  HomeIcon,
  CalendarIcon,
  ListChecksIcon,
  ImageIcon,
} from "lucide-react";
const Sidebar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [tripName, setTripName] = useState('San Francisco Family Vacation'); //hardcoded

  useEffect(() => {
    setActivePath(location.pathname);

    //firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDisplayName(user.displayName || user.email);
      } else {
        setUserDisplayName('');
      }
    });
    return () => unsubscribe();
  }, [location.pathname]);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <HomeIcon/> },
    { path: '/photo-gallery', label: 'Photo Gallery', icon: <ImageIcon/> },
    { path: '/documentation', label: 'Documentation', icon:  <CalendarIcon/>},
    { path: '/packing-list', label: 'Packing List', icon: <ListChecksIcon/> },
  ];

  return (
    <div className="h-full bg-gray-50 w-64 shadow-sm">
      {/*welcome msg + trip name*/}
      <div className="px-4 py-6">
        <h1 className="text-lg font-semibold text-gray-800 leading-snug">
          {userDisplayName ? `Welcome back, ${userDisplayName}!` : 'Welcome!'}
        </h1>
        {tripName && (
          <p className="text-sm text-gray-500 mt-1 italic">
            Trip: <span className="font-medium">{tripName}</span>
          </p>
        )}
      </div>

      {/*nav*/}
      <nav className="">
        <ul>
          {menuItems.map((item) => {
            const isActive = activePath.includes(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm ${
                    isActive
                      ?'bg-blue-500 text-white'
                      :'text-gray-700 hover:bg-gray-100'
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

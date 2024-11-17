import React from 'react';
import { FaBell, FaBars, FaUserCircle } from 'react-icons/fa';

export default function Header({ toggleSidebar, userMode, setUserMode }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <FaBars className="h-5 w-5" />
          </button>
          <h1 className="ml-4 text-xl font-semibold hidden sm:block">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded-md transition-all ${
                userMode === 'guest' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
              onClick={() => setUserMode('guest')}
            >
              Guest
            </button>
            <button
              className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded-md transition-all ${
                userMode === 'host' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
              onClick={() => setUserMode('host')}
            >
              Host
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FaBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
              <FaUserCircle className="h-5 w-5" />
              <span className="hidden sm:block">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 
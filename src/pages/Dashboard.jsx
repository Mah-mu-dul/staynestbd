import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import GuestDashboard from '../components/dashboard/GuestDashboard';
import HostDashboard from '../components/dashboard/HostDashboard';
import Header from '../components/dashboard/Header';
import BookingRequests from '../components/dashboard/BookingRequests';

export default function Dashboard() {
  const [userMode, setUserMode] = useState('guest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Simulate loading of initial data
    setTimeout(() => setIsLoading(false), 1000);

    // Set sidebar open by default on larger screens
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (activeSection === 'booking-requests') {
      return <BookingRequests />;
    }

    return userMode === 'guest' ? 
      <GuestDashboard /> : 
      <HostDashboard activeSection={activeSection} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        toggleSidebar={toggleSidebar} 
        userMode={userMode}
        setUserMode={setUserMode}
      />
      
      <div className="pt-16 flex relative">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
            onClick={toggleSidebar}
          />
        )}

        <div className={`fixed lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out h-full z-30 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar 
            isOpen={isSidebarOpen} 
            userMode={userMode} 
            toggleSidebar={toggleSidebar}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
        </div>
        
        <main className="flex-1 p-4 sm:p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
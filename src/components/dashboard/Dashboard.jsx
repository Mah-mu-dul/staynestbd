import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminLayout from '../admin/AdminLayout';
// Import other layouts as needed

export default function Dashboard({ userMode }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState('admin-dashboard');

  // Set initial section based on URL path
  useEffect(() => {
    const path = window.location.pathname;
    const section = path.split('/').pop();
    if (section !== 'dashboard') {
      setActiveSection(section);
    }
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen pt-16">
      <Sidebar
        isOpen={isOpen}
        userMode={userMode}
        toggleSidebar={toggleSidebar}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      {userMode === 'admin' && (
        <AdminLayout activeSection={activeSection} />
      )}
      {/* Add other layouts for guest and host modes */}
    </div>
  );
} 
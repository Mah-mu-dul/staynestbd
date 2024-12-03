import React, { useEffect } from 'react';
import AdminDashboard from './Dashboard';
import ApproveRequests from './ApproveRequests';
import Reports from './Reports';
import AdminSettings from './Settings';
import BugReports from './BugReports';

export default function AdminLayout({ activeSection }) {
  useEffect(() => {
    // Update document title based on active section
    const sectionTitle = activeSection.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    document.title = `Admin | ${sectionTitle}`;
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'admin-dashboard':
      case 'dashboard':
        return <AdminDashboard />;
      case 'approve-requests':
        return <ApproveRequests />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <AdminSettings />;
      case 'bug-reports':
        return <BugReports />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      {renderContent()}
    </div>
  );
} 
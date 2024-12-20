import React from "react";
import ApproveRequests from "../admin/ApproveRequests";
import Reports from "../admin/Reports";
import BugReports from "../admin/BugReports";
import Settings from "../admin/Settings";
import AdminDashboardLanding from "../admin/AdminDashboardLanding";

export default function AdminDashboard({ activeSection }) {
  if (activeSection === "approve-requests") {
    return <ApproveRequests />;
  } else if (activeSection === "reports") {
    return <Reports />;
  } else if (activeSection === "bug-reports") {
    return <BugReports />;
  } else if (activeSection === "settings") {
    return <Settings />;
  } else {
    return <AdminDashboardLanding setActiveSection={setActiveSection} />;
  }

  return (
    <div className="space-y-6">
      {/* Admin Dashboard Features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium">
          Approve Host Requests
        </h3>
        {/* Add functionality to approve or decline requests */}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium">View Reports</h3>
        {/* Add functionality to view reports */}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium">Bug Reports</h3>
        {/* Add functionality to view and manage bug reports */}
      </div>

      {/* Add more features as needed */}
    </div>
  );
}

import React from "react";
import EarningsSection from "./host/EarningsSection";
import PropertiesSection from "./host/PropertiesSection";
import BookingRequests from "./host/BookingRequests";
import ProfileSetings from "./host/ProfileSetings";
import AddNewProperty from "./host/AddNewProperty";
export default function HostDashboard({ activeSection }) {
  if (activeSection === "booking-requests") {
    return <BookingRequests />;
  } else if (activeSection === "earnings") {
    return <EarningsSection />;
  } else if (activeSection === "properties") {
    return <PropertiesSection />;
  } else if (activeSection === "profile-settings") {
    return <ProfileSetings />;
  } else if (activeSection === "add-new-property") {
    return <AddNewProperty />;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Active Listings</h3>
          <p className="text-3xl font-semibold mt-2">8</p>
          <p className="text-green-500 text-sm mt-2">+2 this month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-semibold mt-2">$12,480</p>
          <p className="text-green-500 text-sm mt-2">+18% vs last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Occupancy Rate</h3>
          <p className="text-3xl font-semibold mt-2">76%</p>
          <p className="text-yellow-500 text-sm mt-2">+1% this month</p>
        </div>
      </div>

      {/* Add a bookings table similar to GuestDashboard for consistency */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Reservations
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Similar table structure as GuestDashboard */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

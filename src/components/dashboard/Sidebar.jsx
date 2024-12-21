import React, { useEffect, useRef } from "react";
import {
  FaHome,
  FaHistory,
  FaHeart,
  FaCog,
  FaBuilding,
  FaCalendarCheck,
  FaChartLine,
  FaBars,
  FaBug,
  FaPlus,
} from "react-icons/fa";

export default function Sidebar({
  isOpen,
  userMode,
  toggleSidebar,
  setActiveSection,
  activeSection,
}) {
  const sidebarRef = useRef(null);

  const guestMenuItems = [
    { icon: FaHome, label: "Upcoming Bookings", section: "UpcomingBookings" },
    { icon: FaHistory, label: "Booking History", section: "BookingHistory" },
    { icon: FaHeart, label: "Saved Listings", section: "SavedListings" },
    { icon: FaCog, label: "Profile Settings", section: "ProfileSettings" },
  ];

  const hostMenuItems = [
    { icon: FaBuilding, label: "Properties", section: "properties" },
    { icon: FaPlus, label: "Add New Property", section: "add-new-property" },
    {
      icon: FaCalendarCheck,
      label: "Booking Requests",
      section: "booking-requests",
    },
    { icon: FaChartLine, label: "Earnings", section: "earnings" },
    { icon: FaCog, label: "Profile Settings", section: "profile-settings" },
  ];

  const adminMenuItems = [
    {
      icon: FaHome,
      label: "Dashboard",
      section: "admin-dashboard",
    },
    {
      icon: FaCalendarCheck,
      label: "Approve Requests",
      section: "approve-requests",
    },
    {
      icon: FaChartLine,
      label: "Reports",
      section: "reports",
    },
    {
      icon: FaCog,
      label: "Settings",
      section: "settings",
    },
    {
      icon: FaBug,
      label: "Bug Reports",
      section: "bug-reports",
    },
  ];

  const menuItems =
    userMode === "guest"
      ? guestMenuItems
      : userMode === "host"
      ? hostMenuItems
      : adminMenuItems;

  const handleNavigation = (e, item) => {
    e.preventDefault();
    setActiveSection(item.section);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <div className="h-screen bg-white shadow-lg w-80">
      <ul className="menu p-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.path}
              className={`flex items-center space-x-3 text-gray-700 hover:bg-gray-100 py-3 ${
                activeSection === item.section ? "bg-gray-100" : ""
              }`}
              onClick={(e) => handleNavigation(e, item)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    { icon: FaHome, label: "Upcoming Bookings", section: "dashboard" },
    { icon: FaHistory, label: "Booking History", section: "booking-history" },
    { icon: FaHeart, label: "Saved Listings", section: "saved" },
    { icon: FaCog, label: "Profile Settings", section: "settings" },
  ];

  const hostMenuItems = [
    { icon: FaBuilding, label: "Properties", section: "dashboard" },
    {
      icon: FaCalendarCheck,
      label: "Booking Requests",
      section: "booking-requests",
    },
    { icon: FaChartLine, label: "Earnings", section: "earnings" },
    { icon: FaCog, label: "Profile Settings", section: "settings" },
  ];

  const menuItems = userMode === "guest" ? guestMenuItems : hostMenuItems;

  return (
    <div className="h-screen bg-white shadow-lg w-80 ">
      <ul className="menu p-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.path}
              className={`flex items-center space-x-3 text-gray-700 hover:bg-gray-100 py-3 ${
                activeSection === item.section ? "bg-gray-100" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.section);
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
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

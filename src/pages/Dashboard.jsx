import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import GuestDashboard from "../components/dashboard/GuestDashboard";
import HostDashboard from "../components/dashboard/HostDashboard";
import Header from "../components/dashboard/Header";
import BookingRequests from "../components/dashboard/host/BookingRequests";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.init";
import AdminDashboard from "../components/dashboard/AdminDashboard";

export default function Dashboard() {
  const [userMode, setUserMode] = useState("guest");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold the logged in user's information

  useEffect(() => {
    // Simulate loading of initial data
    setTimeout(() => setIsLoading(false), 1000);

    // Set sidebar open by default on larger screens
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Get the logged in user's information
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch user role from https://staynestbd-bakend-git-main-wannabepros-projects.vercel.app/getuser
        fetch(
          `https://staynestbd-bakend-git-main-wannabepros-projects.vercel.app/getuser?email=${user.email}`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoggedInUser({
              ...user,
              role: data.user.role,
              phone: data.user.phone,
            }); // Save the user's information, role, and phoneNumber in the state
            console.log(data.user.role);
            setUserMode(data.user.role);
          })
          .catch((error) => console.error("Error fetching user role:", error));
      } else {
        setLoggedInUser(null); // User is signed out
      }
    });

    return () => window.removeEventListener("resize", handleResize);
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

    switch (userMode) {
      case "guest":
        return (
          <GuestDashboard
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        );
      case "host":
        return (
          <HostDashboard
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        );
      case "admin":
        return (
          <AdminDashboard
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        );
      default:
        return (
          <GuestDashboard
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        toggleSidebar={toggleSidebar}
        userMode={userMode}
        setUserMode={setUserMode}
        loggedInUser={loggedInUser} // Pass the logged in user's information to the Header component
      />

      <div className="flex relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
            onClick={toggleSidebar}
          />
        )}

        <div
          className={`fixed lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out h-full z-30 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            userMode={userMode}
            toggleSidebar={toggleSidebar}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            loggedInUser={loggedInUser} // Pass the logged in user's information to the Sidebar component
          />
        </div>

        <main className="flex-1 p-4 sm:p-6 ">{renderMainContent()}</main>
      </div>
    </div>
  );
}

import React from "react";
import GuestDashboard from "./GuestDashboard";
import HostDashboard from "./HostDashboard";
import AdminDashboard from "./AdminDashboard";

export default function MainDashboard({ userMode, activeSection }) {
  useEffect(() => {
    if (userMode === "admin") {
      return <AdminDashboard />;
    }
    if (userMode === "guest") {
      return <GuestDashboard />;
    }
    if (userMode === "host") {
      return <HostDashboard activeSection={activeSection} />;
    }
  }, [userMode]);
}

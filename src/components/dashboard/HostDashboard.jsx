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
  } else if (activeSection === "profile-settings") {
    return <ProfileSetings />;
  } else if (activeSection === "add-new-property") {
    return <AddNewProperty />;
  } else {
    return <PropertiesSection />;
  }
}

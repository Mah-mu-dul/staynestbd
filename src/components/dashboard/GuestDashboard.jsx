import React from "react";
import UpcomingBookings from "./guest/UpcomingBookings";
import BookingHistory from "./guest/BookingHistory";
import SavedListings from "./guest/SavedListings";
import ProfileSettings from "./guest/ProfileSettings";

export default function GuestDashboard({ activeSection }) {
  if (activeSection === "UpcomingBookings") {
    return <UpcomingBookings />;
  } else if (activeSection === "BookingHistory") {
    return <BookingHistory />;
  } else if (activeSection === "SavedListings") {
    return <SavedListings />;
  } else if (activeSection === "ProfileSettings") {
    return <ProfileSettings />;
  } else {
    return <UpcomingBookings />;
  }
}

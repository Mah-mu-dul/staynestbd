import React, { useState } from "react";

// Sample data for upcoming bookings
const initialBookingsData = [
  { id: 1, date: "2023-10-01", property: "Beach House", status: "Confirmed" },
  { id: 2, date: "2023-10-05", property: "Mountain Cabin", status: "Pending" },
  {
    id: 3,
    date: "2023-10-10",
    property: "City Apartment",
    status: "Cancelled",
  },
];

const UpcomingBookings = () => {
  const [bookingsData, setBookingsData] = useState(initialBookingsData);

  const handleStatusChange = (id) => {
    setBookingsData((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === id) {
          switch (booking.status) {
            case "Confirmed":
              return { ...booking, status: "Cancelled" };
            case "Pending":
              return { ...booking, status: "Confirmed" };
            case "Cancelled":
              return { ...booking, status: "Pending" };
            default:
              return booking;
          }
        }
        return booking;
      })
    );
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upcoming Bookings</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Property</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookingsData.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{booking.date}</td>
              <td className="py-2 px-4 border-b">{booking.property}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`badge ${
                    booking.status === "Confirmed"
                      ? "badge-success"
                      : booking.status === "Pending"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className={`btn btn-sm ${
                    booking.status === "Confirmed"
                      ? "btn-error"
                      : booking.status === "Pending"
                      ? "btn-success"
                      : "btn-warning"
                  }`}
                  onClick={() => handleStatusChange(booking.id)}
                >
                  {booking.status === "Confirmed"
                    ? "Cancel Booking"
                    : booking.status === "Pending"
                    ? "Confirm Booking"
                    : "Revert to Pending"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingBookings;

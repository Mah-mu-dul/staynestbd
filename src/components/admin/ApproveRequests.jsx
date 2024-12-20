import React, { useState, useEffect } from "react";

// Dummy data for requests
const initialRequests = [
  { id: 1, name: "John Doe", property: "Cozy Cottage", status: "Pending" },
  {
    id: 2,
    name: "Jane Smith",
    property: "Beachfront Villa",
    status: "Pending",
  },
  {
    id: 3,
    name: "Alice Johnson",
    property: "Mountain Cabin",
    status: "Pending",
  },
  { id: 4, name: "Bob Brown", property: "Urban Apartment", status: "Pending" },
  { id: 5, name: "Charlie Davis", property: "Luxury Suite", status: "Pending" },
  {
    id: 6,
    name: "Diana Evans",
    property: "Charming Bungalow",
    status: "Pending",
  },
  { id: 7, name: "Ethan Foster", property: "Modern Loft", status: "Pending" },
  {
    id: 8,
    name: "Fiona Green",
    property: "Rustic Farmhouse",
    status: "Pending",
  },
  {
    id: 9,
    name: "George Harris",
    property: "Seaside Retreat",
    status: "Pending",
  },
  {
    id: 10,
    name: "Hannah Ives",
    property: "Penthouse Apartment",
    status: "Pending",
  },
  {
    id: 11,
    name: "Ian Jones",
    property: "Countryside Villa",
    status: "Pending",
  },
  {
    id: 12,
    name: "Julia King",
    property: "Historic Mansion",
    status: "Pending",
  },
  { id: 13, name: "Kevin Lee", property: "Ski Lodge", status: "Pending" },
  {
    id: 14,
    name: "Laura Miller",
    property: "Tropical Paradise",
    status: "Pending",
  },
  { id: 15, name: "Mike Nelson", property: "Suburban Home", status: "Pending" },
  {
    id: 16,
    name: "Nina O'Connor",
    property: "Artistic Studio",
    status: "Pending",
  },
  {
    id: 17,
    name: "Oscar Parker",
    property: "Eco-Friendly Cabin",
    status: "Pending",
  },
  { id: 18, name: "Paula Quinn", property: "Luxury Yacht", status: "Pending" },
  {
    id: 19,
    name: "Quinn Roberts",
    property: "Desert Oasis",
    status: "Pending",
  },
  {
    id: 20,
    name: "Ryan Smith",
    property: "City Center Flat",
    status: "Pending",
  },
];

export default function ApproveRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [filterStatus, setFilterStatus] = useState("All");

  // Function to approve a request
  const approveRequest = (id) => {
    console.log(`Approving request with ID: ${id}`);
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Approved" } : request
      )
    );
  };

  // Function to reject a request
  const rejectRequest = (id) => {
    console.log(`Rejecting request with ID: ${id}`);
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
  };

  // Function to filter requests based on status
  const filterRequests = (status) => {
    if (status === "All") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(
        requests.filter((request) => request.status === status)
      );
    }
  };

  useEffect(() => {
    filterRequests(filterStatus);
  }, [requests, filterStatus]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Approve Requests
      </h1>
      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            filterRequests(e.target.value);
          }}
          className="form-select block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Property
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {request.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{request.property}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => approveRequest(request.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectRequest(request.id)}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

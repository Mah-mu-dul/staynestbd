import React, { useState, useMemo } from "react";
import { FaArrowUp, FaArrowDown, FaDownload } from "react-icons/fa";
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Bar } from 'recharts';

export default function EarningsSection() {
  const [dateRange, setDateRange] = useState("30days");
  const [isLoading, setIsLoading] = useState(false);

  const earnings = [
    {
      id: 1,
      property: "Oceanview Villa",
      bookingId: "BK-2024-001",
      guest: "John Smith", 
      checkIn: "2024-06-15",
      checkOut: "2024-06-20",
      amount: 1250,
      date: "2024-06-15",
    },
    {
      id: 2,
      property: "Mountain Cabin",
      bookingId: "BK-2024-002", 
      guest: "Sarah Wilson",
      checkIn: "2024-07-10",
      checkOut: "2024-07-15",
      amount: 850,
      date: "2024-07-10",
    },
    {
      id: 3,
      property: "Downtown Loft",
      bookingId: "BK-2024-003",
      guest: "Mike Johnson",
      checkIn: "2024-08-01",
      checkOut: "2024-08-05",
      amount: 750,
      date: "2024-08-01",
    },
    {
      id: 4,
      property: "Beachfront Condo",
      bookingId: "BK-2024-004",
      guest: "Emily Chen",
      checkIn: "2024-08-20",
      checkOut: "2024-08-25",
      amount: 1100,
      date: "2024-08-20",
    },
    {
      id: 5,
      property: "Oceanview Villa",
      bookingId: "BK-2024-005",
      guest: "David Lee",
      checkIn: "2024-09-01",
      checkOut: "2024-09-05",
      amount: 1250,
      date: "2024-09-01",
    },
    {
      id: 6,
      property: "Mountain Cabin",
      bookingId: "BK-2024-006",
      guest: "Rachel Green",
      checkIn: "2024-09-15",
      checkOut: "2024-09-20",
      amount: 850,
      date: "2024-09-15",
    },
    {
      id: 7,
      property: "Downtown Loft",
      bookingId: "BK-2024-007",
      guest: "Tom Brown",
      checkIn: "2024-10-08",
      checkOut: "2024-10-12",
      amount: 750,
      date: "2024-11-08",
    },
    {
      id: 8,
      property: "Beachfront Condo",
      bookingId: "BK-2024-008",
      guest: "Lisa Wong",
      checkIn: "2024-11-12",
      checkOut: "2024-11-17",
      amount: 1100,
      date: "2024-11-12",
    },
    {
      id: 9,
      property: "Mountain Cabin",
      bookingId: "BK-2024-009",
      guest: "James Wilson",
      checkIn: "2024-11-13",
      checkOut: "2024-11-15", 
      amount: 850,
      date: "2024-11-13"
    },
    {
      id: 10,
      property: "Downtown Loft",
      bookingId: "BK-2024-010",
      guest: "Emma Davis",
      checkIn: "2024-11-14",
      checkOut: "2024-11-16",
      amount: 750,
      date: "2024-11-14"
    },
    {
      id: 11,
      property: "Oceanview Villa", 
      bookingId: "BK-2024-011",
      guest: "Michael Zhang",
      checkIn: "2024-11-15",
      checkOut: "2024-11-16",
      amount: 1250,
      date: "2024-11-15"
    }
  ];

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export delay
    setTimeout(() => setIsLoading(false), 1500);
  };

  const filteredEarnings = useMemo(() => {
    const now = new Date();
    const filterDate = new Date();

    switch (dateRange) {
      case "7days":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        filterDate.setMonth(now.getMonth() - 1);
        break;
      default:
        return earnings;
    }

    return earnings.filter((earning) => {
      const earningDate = new Date(earning.date);
      return earningDate >= filterDate && earningDate <= now;
    });
  }, [dateRange]);

  const totalEarnings = useMemo(() => {
    return filteredEarnings.reduce((sum, earning) => sum + earning.amount, 0);
  }, [filteredEarnings]);

  const averageNightlyRate = useMemo(() => {
    if (filteredEarnings.length === 0) return 0;
    
    const totalNights = filteredEarnings.reduce((sum, earning) => {
      const checkIn = new Date(earning.checkIn);
      const checkOut = new Date(earning.checkOut);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      return sum + nights;
    }, 0);

    return Math.round(totalEarnings / totalNights);
  }, [filteredEarnings, totalEarnings]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Your Earnings Overview
          </h1>
          <p className="text-gray-600">
            Track and analyze your income across properties and time periods.
          </p>
        </div>

        <div className="flex gap-2">
          <select
            className="select select-bordered"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>

          <button
            className={`btn btn-accent gap-2 ${isLoading ? "loading" : ""}`}
            onClick={handleExport}
            disabled={isLoading}
          >
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-gray-600 text-sm">Total Earnings</h3>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold">${totalEarnings}</p>
              <span className="text-success flex items-center">
                <FaArrowUp /> 12%
              </span>
            </div>
            <div className="mt-4 h-16">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">75% of monthly goal</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-gray-600 text-sm">
              Upcoming Payouts
            </h3>
            <p className="text-3xl font-bold">$3,200</p>
            <p className="text-sm text-gray-500">Next payout on May 1</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Processing</span>
                <span>$1,800</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Pending</span>
                <span>$1,400</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-gray-600 text-sm">
              Average Nightly Rate
            </h3>
            <p className="text-3xl font-bold">${averageNightlyRate}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Weekday Avg</span>
                <span>${averageNightlyRate - 20}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Weekend Avg</span>
                <span>${averageNightlyRate + 45}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-gray-600 text-sm">Occupancy Rate</h3>
            <p className="text-3xl font-bold">76%</p>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                      High Season
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div style={{ width: "76%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">Earnings Trend</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredEarnings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#4ade80" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">Property Performance</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredEarnings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="property" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">Recent Earnings</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Booking ID</th>
                  <th>Guest</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEarnings.map((earning) => (
                  <tr key={earning.id} className="hover">
                    <td>{earning.property}</td>
                    <td>{earning.bookingId}</td>
                    <td>{earning.guest}</td>
                    <td>{new Date(earning.checkIn).toLocaleDateString()}</td>
                    <td>{new Date(earning.checkOut).toLocaleDateString()}</td>
                    <td>${earning.amount}</td>
                    <td>
                      <span className="badge badge-success">Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

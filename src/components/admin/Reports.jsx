import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"; // Updated import
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Reports() {
  // Dummy data for the report
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Earnings",
        data: [12000, 19000, 30000, 50000, 20000, 30000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Bookings",
        data: [30, 50, 70, 90, 60, 80],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Trends",
        data: [10000, 15000, 25000, 45000, 18000, 28000],
      },
      {
        label: "Distribution",
        data: [40, 30, 20, 10],
      },
      {
        label: "Performance",
        data: [60, 70, 80, 90, 100],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const handleDownloadReport = () => {
    toast.info("Download report functionality coming soon!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Grid Layout for Charts */}
      <div className="flex flex-wrap gap-6">
        {/* Earnings and Bookings Overview */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            Earnings and Bookings Overview
          </h2>
          <BarChart
            width={600}
            height={300}
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index],
              Earnings: value,
              Bookings: data.datasets[1].data[index],
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Earnings" fill="rgba(75, 192, 192, 0.6)" />
            <Bar dataKey="Bookings" fill="rgba(153, 102, 255, 0.6)" />
          </BarChart>
        </div>

        {/* Earnings Trend */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Earnings Trend</h2>
          <LineChart
            width={600}
            height={300}
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index],
              Earnings: value,
            }))}
          >
            <Line type="monotone" dataKey="Earnings" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* Earnings Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Earnings Distribution</h2>
          <PieChart width={600} height={300}>
            <Pie
              data={data.datasets[1].data.map((value, index) => ({
                name: data.labels[index],
                value: value,
              }))}
              cx={300}
              cy={200}
              outerRadius={100}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <RadarChart
            outerRadius={90}
            width={600}
            height={300}
            data={data.datasets[0].data.map((value, index) => ({
              subject: data.labels[index],
              A: value,
            }))}
          >
            <Radar
              name="Performance"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Tooltip />
          </RadarChart>
        </div>
      </div>

      {/* Download Report Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadReport}
          className="btn btn-primary gap-2"
        >
          <FaDownload /> Download Report
        </button>
      </div>
    </div>
  );
}

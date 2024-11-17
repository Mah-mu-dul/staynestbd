import React from 'react';

export default function GuestDashboard() {
  return (
    <div className="space-y-6 max-w-full overflow-x-auto">
      {/* Summary Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        <div className="bg-white w-full rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Available Properties</h3>
          <p className="text-3xl font-semibold mt-2">24</p>
          <p className="text-green-500 text-sm mt-2">+3 this week</p>
        </div>
        
        <div className="bg-white w-full rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Average Price/Night</h3>
          <p className="text-3xl font-semibold mt-2">$120</p>
        </div>
        
        <div className="bg-white w-full rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Saved Properties</h3>
          <p className="text-3xl font-semibold mt-2">5</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow overflow-x-scroll max-w-full  `">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Seaside Villa</td>
                  <td className="px-6 py-4 whitespace-nowrap">Aug 15 - Aug 20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Mountain Cabin</td>
                  <td className="px-6 py-4 whitespace-nowrap">Sep 1 - Sep 5</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
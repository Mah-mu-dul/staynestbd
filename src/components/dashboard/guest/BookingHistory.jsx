import React from 'react';

const BookingHistory = () => {
    const bookings = [
        { id: 1, date: '2023-10-01', service: 'Hotel Stay', amount: '$200' },
        { id: 2, date: '2023-10-05', service: 'Flight Booking', amount: '$150' },
        { id: 3, date: '2023-10-10', service: 'Car Rental', amount: '$75' },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Booking History</h2>
            <table className="min-w-full bg-gray-100">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Service</th>
                        <th className="py-2 px-4 text-left">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b">
                            <td className="py-2 px-4">{booking.date}</td>
                            <td className="py-2 px-4">{booking.service}</td>
                            <td className="py-2 px-4">{booking.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingHistory; 
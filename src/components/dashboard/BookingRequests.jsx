import React, { useState, useMemo } from 'react';

export default function BookingRequests() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      guest: {
        name: 'Sarah Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        rating: 4.8,
      },
      property: 'Oceanview Villa',
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      guests: 3,
      message: "Hi! We're excited to stay at your beautiful property...",
      status: 'pending',
    },
    {
      id: 2, 
      guest: {
        name: 'John Martinez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        rating: 4.5,
      },
      property: 'Mountain Cabin',
      checkIn: '2024-04-01',
      checkOut: '2024-04-05',
      guests: 2,
      message: "Looking forward to a peaceful getaway in your cabin.",
      status: 'accepted',
    },
    {
      id: 3,
      guest: {
        name: 'Emily Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        rating: 5.0,
      },
      property: 'Downtown Loft',
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      guests: 1,
      message: "Perfect location for my business trip. Hope to book soon!",
      status: 'pending',
    },
    {
      id: 4,
      guest: {
        name: 'Michael Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        rating: 4.2,
      },
      property: 'Beachfront Condo',
      checkIn: '2024-05-10',
      checkOut: '2024-05-15',
      guests: 4,
      message: "Planning a family vacation. Your place looks perfect.",
      status: 'declined',
    },
    {
      id: 5,
      guest: {
        name: 'Lisa Anderson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        rating: 4.9,
      },
      property: 'Garden Cottage',
      checkIn: '2024-04-15',
      checkOut: '2024-04-20',
      guests: 2,
      message: "Love the garden views! Can't wait to relax there.",
      status: 'accepted',
    }
  ]);

  const handleAccept = (id) => {
    setBookingRequests(bookingRequests.map(request => 
      request.id === id ? {...request, status: 'accepted'} : request
    ));
  };

  const handleDecline = (id) => {
    setBookingRequests(bookingRequests.map(request => 
      request.id === id ? {...request, status: 'declined'} : request
    ));
  };

  const filteredRequests = useMemo(() => {
    return bookingRequests.filter(request => {
      // Filter by tab
      if (activeTab !== 'all' && request.status !== activeTab) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          request.guest.name.toLowerCase().includes(searchLower) ||
          request.property.toLowerCase().includes(searchLower) ||
          request.message.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [bookingRequests, activeTab, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Your Booking Requests</h1>
          <p className="text-gray-600">Stay on top of your bookings and connect with guests.</p>
        </div>
        
        {/* Search Bar */}
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Search requests..." 
            className="input input-bordered w-full max-w-xs focus:input-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <button 
          className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Requests ({bookingRequests.length})
        </button>
        <button 
          className={`tab ${activeTab === 'pending' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({bookingRequests.filter(r => r.status === 'pending').length})
        </button>
        <button 
          className={`tab ${activeTab === 'accepted' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted ({bookingRequests.filter(r => r.status === 'accepted').length})
        </button>
        <button 
          className={`tab ${activeTab === 'declined' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('declined')}
        >
          Declined ({bookingRequests.filter(r => r.status === 'declined').length})
        </button>
      </div>

      {/* Booking Request Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {filteredRequests.map((request) => (
          <div key={request.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Guest Info */}
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={request.guest.avatar} alt={request.guest.name} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">{request.guest.name}</h3>
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <input 
                        key={i}
                        type="radio" 
                        name={`rating-${request.id}`}
                        className="mask mask-star-2 bg-accent"
                        checked={i < Math.floor(request.guest.rating)}
                        readOnly
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({request.guest.rating})
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="divider"></div>
              <div className="space-y-2">
                <p className="font-medium">{request.property}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Check-in: {request.checkIn}</span>
                  <span>Check-out: {request.checkOut}</span>
                  <span>{request.guests} guests</span>
                </div>
                <p className="text-sm">{request.message}</p>
              </div>

              {/* Status Badge */}
              <div className="card-actions justify-between items-center mt-4">
                <div className={`badge ${
                  request.status === 'pending' ? 'badge-warning' :
                  request.status === 'accepted' ? 'badge-success' :
                  'badge-error'
                } badge-lg`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>

                {/* Action Buttons */}
                <div className="space-x-2">
                  {request.status === 'pending' && (
                    <>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAccept(request.id)}
                      >
                        Accept
                      </button>
                      <button 
                        className="btn btn-error btn-sm"
                        onClick={() => handleDecline(request.id)}
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {request.status === 'accepted' && (
                    <>
                      <button 
                        className="btn btn-error btn-sm"
                        onClick={() => handleDecline(request.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button className="btn btn-ghost btn-sm">Message</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
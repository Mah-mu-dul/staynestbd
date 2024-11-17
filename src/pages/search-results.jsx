import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdError } from "react-icons/md";

const dummyProperties = [
  {
    id: 1,
    title: "Luxury Beach Villa",
    description: "Beautiful 3 bedroom villa with ocean views",
    images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf"],
    rating: 4.8,
    reviews: 124,
    price: 299
  },
  {
    id: 2, 
    title: "Downtown Apartment",
    description: "Modern 1 bedroom in the heart of the city", 
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    rating: 4.5,
    reviews: 89,
    price: 149
  },
  {
    id: 3,
    title: "Mountain Cabin",
    description: "Cozy 2 bedroom cabin with stunning views",
    images: ["https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"],
    rating: 4.9,
    reviews: 67,
    price: 199
  },
  {
    id: 4,
    title: "Seaside Cottage", 
    description: "Charming cottage steps from the beach",
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"],
    rating: 4.7,
    reviews: 45,
    price: 179
  }
];

const dummySearchResults = {
  total: dummyProperties.length,
  location: "Miami, FL",
  dates: ["2024-02-01", "2024-02-07"],
  guests: 2,
  properties: dummyProperties
};

export default function SearchResults() {
  const [viewMode, setViewMode] = useState("list");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchResults] = useState(dummySearchResults);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Summary */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-semibold">
            {searchResults.total} {searchResults.total === 1 ? 'property' : 'properties'} found in {searchResults.location}
          </h1>
          <p className="text-gray-600">
            For {searchResults.guests} {searchResults.guests === 1 ? 'guest' : 'guests'} • {searchResults.dates[0]} - {searchResults.dates[1]}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <select className="w-full p-2 border rounded">
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                </select>
              </div>

              <button className="btn btn-primary w-full">Apply Filters</button>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full md:w-3/4">
            {/* View Toggle */}
            <div className="flex justify-between mb-4">
              <div className="btn-group">
                <button 
                  className={`btn ${viewMode === 'list' ? 'btn-active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button 
                  className={`btn ${viewMode === 'map' ? 'btn-active' : ''}`}
                  onClick={() => setViewMode('map')}
                >
                  Map
                </button>
              </div>
              <select className="select select-bordered w-48">
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
                <option>Sort by: Rating</option>
              </select>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.properties.map((property) => (
                <div key={property.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                  <figure>
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-property.jpg';
                      }}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {property.title}
                      <button className="btn btn-ghost btn-circle">
                        <FaHeart className="text-gray-400 hover:text-red-500" />
                      </button>
                    </h2>
                    <p>{property.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1">{property.rating}</span>
                        <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
                      </div>
                      <div className="text-xl font-bold">${property.price}/night</div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-primary">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

export default function PropertiesSection() {
  const [properties, setProperties] = useState([
    // {
    //   id: 1,
    //   title: "Beachfront Villa",
    //   location: "Miami, FL",
    //   status: "active",
    //   bookings: 12,
    //   price: 24500,
    //   image:
    //     "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    //   occupancyRate: 78,
    //   averageRating: 4.8,
    // },
    // {
    //   id: 2,
    //   title: "Mountain Cabin",
    //   location: "Aspen, CO",
    //   status: "active",
    //   bookings: 8,
    //   price: 18000,
    //   image:
    //     "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop",
    //   occupancyRate: 65,
    //   averageRating: 4.6,
    // },
    // {
    //   id: 3,
    //   title: "Downtown Loft",
    //   location: "New York, NY",
    //   status: "inactive",
    //   bookings: 15,
    //   price: 32000,
    //   image:
    //     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    //   occupancyRate: 85,
    //   averageRating: 4.9,
    // },
    // {
    //   id: 4,
    //   title: "Desert Oasis",
    //   location: "Phoenix, AZ",
    //   status: "active",
    //   bookings: 6,
    //   price: 12000,
    //   image:
    //     "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?q=80&w=2070&auto=format&fit=crop",
    //   occupancyRate: 45,
    //   averageRating: 4.3,
    // },
    // {
    //   id: 5,
    //   title: "Lake House",
    //   location: "Lake Tahoe, CA",
    //   status: "active",
    //   bookings: 10,
    //   price: 28000,
    //   image:
    //     "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    //   occupancyRate: 72,
    //   averageRating: 4.7,
    // },
    // {
    //   id: 6,
    //   title: "City Apartment",
    //   location: "Chicago, IL",
    //   status: "inactive",
    //   bookings: 9,
    //   price: 15000,
    //   image:
    //     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    //   occupancyRate: 58,
    //   averageRating: 4.4,
    // },
    // {
    //   id: 7,
    //   title: "Oceanview Condo",
    //   location: "San Diego, CA",
    //   status: "active",
    //   bookings: 14,
    //   price: 29000,
    //   image:
    //     "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    //   occupancyRate: 82,
    //   averageRating: 4.8,
    // },
    // {
    //   id: 8,
    //   title: "Historic Townhouse",
    //   location: "Boston, MA",
    //   status: "active",
    //   bookings: 7,
    //   price: 19500,
    //   image:
    //     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    //   occupancyRate: 63,
    //   averageRating: 4.5,
    // },
    // {
    //   id: 9,
    //   title: "Forest Retreat",
    //   location: "Portland, OR",
    //   status: "inactive",
    //   bookings: 5,
    //   price: 11000,
    //   image:
    //     "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop",
    //   occupancyRate: 42,
    //   averageRating: 4.2,
    // },
    // Add more sample properties as needed
  ]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser; // Get the current user

    if (user) {
      const email = user.email; // Get the user's email
      fetch(`http://localhost:5000/getHostProperties?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const formattedProperties = data.map((property) => ({
            id: property._id, // Use the MongoDB ID
            title: property.title,
            location: property.location,
            status: property.status,
            bookings: property.bookings || 0, // Default to 0 if not present
            price: parseFloat(property.pricePerNight), // Convert to number
            image: property.images[0], // Use the first image
            occupancyRate: property.occupancyRate || 0, // Default to 0 if not present
            averageRating: property.averageRating || 0, // Default to 0 if not present
          }));
          setProperties(formattedProperties);
          console.log(formattedProperties);
        })
        .catch((error) => console.error("Error fetching properties:", error));
    }
  }, []);

  const [view, setView] = useState("grid");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleStatusToggle = (propertyId) => {
    const newStatus =
      properties.find((property) => property.id === propertyId).status ===
      "active"
        ? "inactive"
        : "active";
    fetch("http://localhost:5000/updatePropertyStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId, status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Property updated successfully") {
          setProperties(
            properties.map((property) => {
              if (property.id === propertyId) {
                toast.success(`Property status changed to ${newStatus}`, {
                  position: "top-right",
                  autoClose: 3000,
                });
                return { ...property, status: newStatus };
              }
              return property;
            })
          );
        } else {
          console.error("Error updating property:", data.error);
        }
      })
      .catch((error) => console.error("Error updating property:", error));
  };

  const handleDelete = (propertyId) => {
    toast.info("Are you sure you want to delete this property?", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: true,
      draggable: false,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setProperties(properties.filter((p) => p.id !== propertyId));
            toast.success("Property deleted successfully");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const getFilteredAndSortedProperties = () => {
    let filteredProperties = properties;

    // Apply status filter
    if (statusFilter !== "all") {
      filteredProperties = properties.filter(
        (property) => property.status === statusFilter
      );
    }

    // Apply sorting
    if (!sortBy) return filteredProperties;

    return [...filteredProperties].sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "bookings":
          return b.bookings - a.bookings;
        default:
          return 0;
      }
    });
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
        <button
          onClick={() => toast.info("Add Property form coming soon!")}
          className="btn btn-primary gap-2"
        >
          <FaPlus /> Add New Property
        </button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <select
            className="select select-bordered w-full max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            className="select select-bordered w-fit max-w-xs"
            value={sortBy}
            onChange={handleSort}
          >
            <option value="">All</option>
            <option value="price-high">price: High to Low</option>
            <option value="price-low">price: Low to High</option>
            <option value="bookings">Bookings</option>
          </select>
        </div>
        <div className="btn-group">
          <button
            className={`btn ${view === "grid" ? "btn-active" : ""}`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`btn ${view === "list" ? "btn-active" : ""}`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Properties Grid/List View */}
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {getFilteredAndSortedProperties().map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className={`bg-white rounded-lg shadow-lg overflow-hidden
                ${view === "grid" ? "" : "flex items-center space-x-4"}`}
            >
              <img
                src={property.image}
                alt={property.title}
                className={
                  view === "grid"
                    ? "w-full h-48 object-cover"
                    : "w-48 h-32 object-cover"
                }
              />
              <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-gray-600">{property.location}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span
                    className={`badge ${
                      property.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {property.status}
                  </span>
                  <span className="badge badge-accent">
                    {property.bookings} bookings
                  </span>
                </div>
                <p className="mt-2 text-primary font-semibold">
                  ${property.price.toLocaleString()}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => toast.info("Edit form coming soon!")}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => toast.info("Preview coming soon!")}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost text-error"
                    onClick={() => handleDelete(property.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className={`btn btn-sm ${
                      property.status === "active" ? "btn-error" : "btn-success"
                    }`}
                    onClick={() => handleStatusToggle(property.id)}
                  >
                    {property.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {getFilteredAndSortedProperties().length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-xl font-semibold text-gray-600">
            No properties found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters or add a new property
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => toast.info("Add Property form coming soon!")}
          >
            <FaPlus className="mr-2" /> Add New Property
          </button>
        </motion.div>
      )}
    </div>
  );
}

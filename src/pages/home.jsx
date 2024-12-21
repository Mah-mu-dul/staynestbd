import React, { useState } from "react";
import { FaHome, FaSearch, FaUsers, FaMinus, FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ViewDetails from "../components/View_details";
import popularDestinationsData from "../data/popularDestinations.json";
import featuredListingsData from "../data/featuredListings.json";
import navigationData from "../data/navigation.json";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomePage() {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const popularDestinations = popularDestinationsData.popularDestinations;
  const featuredListings = featuredListingsData.featuredListings;
  const navigationItems = navigationData.navigationItems;

  const handleSearch = (e) => {
    e.preventDefault();

    const formattedStartDate = startDate
      ? startDate.toISOString().split("T")[0]
      : "";
    const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : "";

    const searchParams = new URLSearchParams({
      location: location,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      guests:
        guestCounts.adults +
        guestCounts.children +
        guestCounts.infants +
        guestCounts.pets,
    });

    window.location.href = `/search-results?${searchParams.toString()}`;
  };

  const updateGuestCount = (type, increment) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="hero min-h-[600px] bg-cover bg-center relative"
        style={{ backgroundImage: "url(/hero-background.jpg)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full"
          >
            <div className="flex items-center bg-white rounded-full shadow-lg p-2 w-full">
              <div className="flex-1 flex flex-col px-4 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700 text-left">
                  Where
                </label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="w-full outline-none text-gray-600 text-base placeholder-gray-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="flex-1 flex flex-col px-4 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700 text-left">
                  Check in
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setDateRange([date, endDate])}
                  placeholderText="Add dates"
                  className="w-full outline-none text-gray-600 text-base placeholder-gray-400"
                  wrapperClassName="w-full"
                  calendarClassName="rounded-2xl border-none shadow-lg"
                  dayClassName={(date) =>
                    date.getDate() === 4 && date.getMonth() === 11
                      ? "rounded-full bg-black text-white"
                      : "rounded-full hover:bg-gray-100"
                  }
                  monthClassName="font-medium"
                  weekDayClassName="font-medium text-gray-400"
                  fixedHeight
                  showPopperArrow={false}
                />
              </div>
              <div className="flex-1 flex flex-col px-4 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700 text-left">
                  Check out
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setDateRange([startDate, date])}
                  placeholderText="Add dates"
                  className="w-full outline-none text-gray-600 text-base placeholder-gray-400"
                  wrapperClassName="w-full"
                  calendarClassName="rounded-2xl border-none shadow-lg"
                  dayClassName={(date) =>
                    date.getDate() === 4 && date.getMonth() === 11
                      ? "rounded-full bg-black text-white"
                      : "rounded-full hover:bg-gray-100"
                  }
                  monthClassName="font-medium"
                  weekDayClassName="font-medium text-gray-400"
                  fixedHeight
                  showPopperArrow={false}
                />
              </div>
              <div className="flex-1 flex flex-col px-4">
                <label
                  htmlFor="guests"
                  className="text-sm font-medium text-gray-700 text-left"
                >
                  Guests
                </label>
                <div className="relative">
                  <select
                    id="guests"
                    className="select select-bordered w-full max-w-xs"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select guests
                    </option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              <button
                className="bg-[#38d7ff] hover:bg-[#38d7ff]/90 text-white p-4 rounded-full flex items-center justify-center ml-2 transition-colors duration-200 ease-in-out hover:shadow-lg active:scale-95 transform"
                onClick={handleSearch}
              >
                <FaSearch className="text-lg" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <figure>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{dest.name}</h3>
                <p>{dest.description}</p>
                <div className="card-actions justify-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-primary btn-sm"
                  >
                    Explore
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredListings.map((listing, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <figure>
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{listing.title}</h3>
                <p>{listing.location}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-500 animate-pulse">⭐</span>
                    <span className="ml-1">{listing.rating}/5</span>
                  </div>
                  <div className="text-xl font-bold">
                    ${listing.price}/night
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                    onClick={() => {
                      document
                        .getElementById(`view_details_modal_${index}`)
                        .showModal();
                    }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {featuredListings.map((listing, index) => (
            <dialog
              key={index}
              id={`view_details_modal_${index}`}
              className="modal"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  e.currentTarget.close();
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="modal-box w-11/12 max-w-5xl"
              >
                <ViewDetails property={listing} />
                <div className="modal-action">
                  <form method="dialog">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn"
                    >
                      Close
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </dialog>
          ))}
        </div>
      </section>
    </div>
  );
}

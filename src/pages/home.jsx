import React, { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
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
  const [guests, setGuests] = useState(1);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
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
      guests: guests,
    });

    window.location.href = `/search-results?${searchParams.toString()}`;
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
            className="max-w-2xl"
          >
            <h1 className="mb-5 text-5xl font-bold text-white">
              Find Your Perfect Stay
            </h1>
            <div className="card bg-white shadow-xl p-6 w-fit hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="Where are you going?"
                  className="input input-bordered w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="relative w-full">
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    className="input input-bordered w-full hover:border-primary transition-colors"
                    placeholderText="Check-in & Check-out"
                    wrapperClassName="w-full"
                  />
                </div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="dropdown w-full"
                >
                  <label tabIndex={0} className="btn btn-outline w-full">
                    {guests} Guest{guests !== 1 ? "s" : ""}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <motion.li 
                        whileHover={{ backgroundColor: "#f0f0f0" }}
                        key={num} 
                        onClick={() => setGuests(num)}
                      >
                        <a>{num} Guest{num !== 1 ? "s" : ""}</a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-full mt-4"
                onClick={handleSearch}
              >
                <FaSearch className="mr-2" /> Search
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

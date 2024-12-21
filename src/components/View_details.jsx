import React, { useState, useEffect } from "react";
import { FaStar, FaWifi, FaParking, FaUtensils, FaDog } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaPersonSwimming } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewDetails = ({ property }) => {
  if (!property) {
    return <div>Loading...</div>;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guests, setGuests] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const images = property.images || [property.image];

  const amenities = [
    { icon: <FaWifi />, label: "Free Wi-Fi" },
    { icon: <FaParking />, label: "Parking" },
    { icon: <FaPersonSwimming />, label: "Pool" },
    { icon: <FaUtensils />, label: "Kitchen" },
    { icon: <FaDog />, label: "Pet-friendly" },
  ];

  useEffect(() => {
    const auth = getAuth();
    const userEmail = auth.currentUser ? auth.currentUser.email : ""; // Get email
    if (userEmail) {
      setUserEmail(userEmail); // Set the userId state
    }
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleBookNow = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // Validate dates
    if (!dates.checkIn || !dates.checkOut) {
      setError("Please select both check-in and check-out dates."); // Set error message if dates are not selected
      return;
    }
    if (new Date(dates.checkIn) < new Date(today)) {
      setError("Check-in date cannot be before today's date."); // Set error message
      return;
    }
    if (new Date(dates.checkIn) >= new Date(dates.checkOut)) {
      setError("Check-out date must be after check-in date."); // Set error message
      return;
    }
    setError(""); // Clear error if validation passes
    setLoading(true); // Set loading to true

    const bookingDetails = {
      propertyId: property.id,
      hostEmail: property.host.email,
      userEmail: userEmail,
      guests: guests,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut,
    };

    fetch(`https://staynestbd-bakend-git-main-wannabepros-projects.vercel.app/addBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Booking response: ", data);
        setLoading(false); // Set loading to false after response
        toast.success("Booking successful!"); // Show success toast
      })
      .catch((err) => {
        console.log("Booking error: ", err);
        setLoading(false); // Set loading to false on error
        toast.error("Booking failed. Please try again."); // Show error toast
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center text-gray-600">
          <MdLocationOn className="mr-1" />
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              property.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            {property.location}
          </a>
        </div>
      </div>

      <div className="mb-8">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-96 rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Property view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 && (
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-4"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover rounded cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-bold">{property.rating}/5</span>
              <span className="text-gray-600 ml-2">
                ({property.reviewCount} reviews)
              </span>
            </div>
            <button className="btn btn-secondary btn-sm">
              View All Reviews
            </button>
          </div>

          <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body">
              <h3 className="card-title">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-primary">{amenity.icon}</span>
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body">
              <h3 className="card-title">About this property</h3>
              <p className="text-gray-600">{property.description}</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <img
                  src={property.host.profilePicture}
                  alt={`${property.host.name}'s profile`}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-bold">{property.host.name}</h4>
                  <p className="text-gray-600">{property.host.tagline}</p>
                </div>
                <Link to={`/chat?hostId=${property?.host?.id}`}>
                  <button className="btn btn-accent ml-auto">
                    Contact Host
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg sticky top-4">
            <div className="card-body">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">
                  ${property.pricePerNight}/night
                </h3>
                <p className="text-gray-600 text-sm">
                  Additional fees may apply
                </p>
              </div>

              <div className="form-control mb-6">
                <label className="label">Check-in / Check-out</label>
                <div className="">
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setDates({ ...dates, checkIn: e.target.value })
                    }
                  />
                  <br />
                  <br />
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setDates({ ...dates, checkOut: e.target.value })
                    }
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </div>

              <div className="form-control mb-6">
                <label className="label">Guests</label>
                <div className="flex items-center justify-between border rounded-lg p-2">
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    -
                  </button>
                  <span className="font-bold">{guests}</span>
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="btn btn-primary w-full mb-2"
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
              <button className="btn btn-outline btn-secondary w-full">
                Save to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Location</h3>
        <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.9413104449627!2d90.47183614408523!3d23.816860601030434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c993d576bdcf%3A0x5db406570be99d8!2sN%20Block%20Bagan%20Bari!5e0!3m2!1sen!2sbd!4v1733210417571!5m2!1sen!2sbd"
            width="100%"
            height="350"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewDetails;

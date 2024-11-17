import React, { useState } from 'react';
import { FaStar, FaWifi, FaParking, FaUtensils, FaDog } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { FaPersonSwimming } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

const ViewDetails = ({ property }) => {
  if (!property) {
    return <div>Loading...</div>;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guests, setGuests] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = property.images || [property.image];

  const amenities = [
    { icon: <FaWifi />, label: 'Free Wi-Fi' },
    { icon: <FaParking />, label: 'Parking' },
    { icon: <FaPersonSwimming />, label: 'Pool' },
    { icon: <FaUtensils />, label: 'Kitchen' },
    { icon: <FaDog />, label: 'Pet-friendly' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center text-gray-600">
          <MdLocationOn className="mr-1" />
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(property.location)}`} 
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
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
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
              <span className="text-gray-600 ml-2">({property.reviewCount} reviews)</span>
            </div>
            <button className="btn btn-secondary btn-sm">View All Reviews</button>
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
                <button className="btn btn-accent ml-auto">Contact Host</button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg sticky top-4">
            <div className="card-body">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">${property.pricePerNight}/night</h3>
                <p className="text-gray-600 text-sm">Additional fees may apply</p>
              </div>

              <div className="form-control mb-4">
                <label className="label">Check-in / Check-out</label>
                <div className="">
                  <input type="date" className="input input-bordered w-full" />
                  <br />
                  <br />
                  <input type="date" className="input input-bordered w-full" />
                </div>
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

              <button className="btn btn-primary w-full mb-2">Book Now</button>
              <button className="btn btn-outline btn-secondary w-full">Save to Wishlist</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Location</h3>
        <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
          Interactive Map Placeholder
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;

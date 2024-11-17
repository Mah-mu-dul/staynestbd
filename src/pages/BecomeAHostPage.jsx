import React, { useState } from 'react';
import { 
  FaHome, 
  FaDollarSign, 
  FaCheckCircle, 
  FaWifi, 
  FaParking, 
  FaSnowflake, 
  FaDog,
  FaTshirt,
  FaCamera,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPercent,
  FaUpload,
  FaTrash
} from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BecomeAHostPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [availabilityDates, setAvailabilityDates] = useState([null, null]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    location: '',
    amenities: {
      wifi: false,
      parking: false,
      airConditioning: false,
      washerDryer: false,
      petFriendly: false
    },
    houseRules: '',
    pricePerNight: '',
    weeklyDiscount: '',
    monthlyDiscount: ''
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setImages([...images, ...newImages]);
    toast.success('Images uploaded successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    toast.info('Image removed', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleGetStarted = () => {
    setActiveStep(1);
    setFormProgress(33);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
    setFormProgress(step * 33);
  };

  const handleSubmit = () => {
    // Validate form data
    if (!formData.title || !formData.description || !formData.propertyType) {
      toast.error('Please fill in all required fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
      return;
    }

    // Submit form data to backend
    console.log('Submitting form data:', formData);
    console.log('Uploaded images:', images);
    console.log('Availability dates:', availabilityDates);

    // Reset form
    setFormData({
      title: '',
      description: '',
      propertyType: '',
      location: '',
      amenities: {
        wifi: false,
        parking: false,
        airConditioning: false,
        washerDryer: false,
        petFriendly: false
      },
      houseRules: '',
      pricePerNight: '',
      weeklyDiscount: '',
      monthlyDiscount: ''
    });
    setImages([]);
    setAvailabilityDates([null, null]);
    setActiveStep(1);
    setFormProgress(0);

    toast.success('Property listing submitted successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-16">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-4xl font-bold mb-4">Become a Host</h1>
          <p className="text-base md:text-lg text-base-content/70 mb-6 md:mb-8 px-4">
            List your property and start earning today!
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-md md:btn-lg rounded-full"
            onClick={handleGetStarted}
          >
            Get Started <FaCheckCircle className="ml-2" />
          </motion.button>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full bg-base-300 rounded-full h-3 md:h-4 mb-6 md:mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${formProgress}%` }}
            transition={{ duration: 0.5 }}
            className="bg-primary h-3 md:h-4 rounded-full"
          ></motion.div>
        </div>

        {/* Steps */}
        <div className="flex justify-between mb-8 md:mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-base-300 -translate-y-1/2 z-0"></div>
          {[1, 2, 3].map((step) => (
            <motion.div 
              key={step}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleStepClick(step)}
              className={`relative z-10 flex flex-col items-center bg-base-100 p-2 md:p-4 rounded-full cursor-pointer ${
                activeStep >= step ? 'text-primary' : 'text-base-content/50'
              }`}
            >
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold mb-1 md:mb-2 ${
                activeStep >= step ? 'bg-primary text-white' : 'bg-base-300'
              }`}>
                {step}
              </div>
              <span className="text-xs md:text-sm font-medium whitespace-nowrap hidden md:block">
                {step === 1 ? 'Property Details' : 
                 step === 2 ? 'Amenities & Rules' : 
                 'Pricing & Dates'}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Form Sections */}
        <div className="max-w-4xl mx-auto">
          {/* Property Details */}
          <div className="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="my-accordion-2" checked={activeStep === 1} onChange={() => handleStepClick(1)} /> 
            <div className="collapse-title text-xl font-medium bg-secondary text-secondary-content">
              <FaHome className="inline-block mr-2" /> Property Details
            </div>
            <div className="collapse-content">
              <div className="space-y-6 p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Property Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="E.g., Cozy Apartment in Downtown"
                    className="input input-bordered w-full"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Write a short description of your property and what makes it unique."
                    className="textarea textarea-bordered h-24"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Property Type</span>
                  </label>
                  <select 
                    name="propertyType"
                    className="select select-bordered w-full"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Upload Photos</span>
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileDrag={{ scale: 1.05, borderColor: "#570DF8" }}
                    animate={{ 
                      borderColor: ["#D1D5DB", "#570DF8", "#D1D5DB"],
                      transition: { duration: 1, repeat: Infinity }
                    }}
                    className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                      if (files.length > 0) {
                        const event = { target: { files } };
                        handleImageUpload(event);
                      }
                    }}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <motion.label 
                      htmlFor="image-upload" 
                      className="cursor-pointer"
                      whileDrag={{ scale: 1.1 }}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <FaCamera className="mx-auto text-4xl mb-4 text-primary" />
                      </motion.div>
                      <p>Drag and drop your images here or click to browse</p>
                    </motion.label>
                  </motion.div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {images.map((image, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <img
                            src={image.url}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                          >
                            <FaTrash />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Amenities & Rules Section */}
          <div className="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="my-accordion-2" checked={activeStep === 2} onChange={() => handleStepClick(2)} />
            <div className="collapse-title text-xl font-medium bg-secondary text-secondary-content">
              <FaWifi className="inline-block mr-2" /> Amenities & Rules
            </div>
            <div className="collapse-content">
              <div className="space-y-6 p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Available Amenities</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="wifi"
                        className="checkbox checkbox-primary"
                        checked={formData.amenities.wifi}
                        onChange={handleInputChange}
                      />
                      <span><FaWifi className="inline mr-2" /> WiFi</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        name="parking"
                        className="checkbox checkbox-primary"
                        checked={formData.amenities.parking}
                        onChange={handleInputChange}
                      />
                      <span><FaParking className="inline mr-2" /> Parking</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        name="airConditioning"
                        className="checkbox checkbox-primary"
                        checked={formData.amenities.airConditioning}
                        onChange={handleInputChange}
                      />
                      <span><FaSnowflake className="inline mr-2" /> Air Conditioning</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        name="washerDryer"
                        className="checkbox checkbox-primary"
                        checked={formData.amenities.washerDryer}
                        onChange={handleInputChange}
                      />
                      <span><FaTshirt className="inline mr-2" /> Washer/Dryer</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        name="petFriendly"
                        className="checkbox checkbox-primary"
                        checked={formData.amenities.petFriendly}
                        onChange={handleInputChange}
                      />
                      <span><FaDog className="inline mr-2" /> Pet Friendly</span>
                    </label>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">House Rules</span>
                  </label>
                  <textarea
                    name="houseRules"
                    placeholder="List any specific rules or guidelines for guests (e.g., no smoking, quiet hours, etc.)"
                    className="textarea textarea-bordered h-24"
                    value={formData.houseRules}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Availability Section */}
          <div className="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="my-accordion-2" checked={activeStep === 3} onChange={() => handleStepClick(3)} />
            <div className="collapse-title text-xl font-medium bg-secondary text-secondary-content">
              <FaDollarSign className="inline-block mr-2" /> Pricing & Availability
            </div>
            <div className="collapse-content">
              <div className="space-y-6 p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price per Night</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <FaDollarSign />
                    </span>
                    <input
                      type="number"
                      name="pricePerNight"
                      placeholder="Enter price per night"
                      className="input input-bordered w-full pl-10"
                      value={formData.pricePerNight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Weekly Discount (%)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaPercent />
                      </span>
                      <input
                        type="number"
                        name="weeklyDiscount"
                        placeholder="Weekly discount"
                        className="input input-bordered w-full pl-10"
                        value={formData.weeklyDiscount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Monthly Discount (%)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaPercent />
                      </span>
                      <input
                        type="number"
                        name="monthlyDiscount"
                        placeholder="Monthly discount"
                        className="input input-bordered w-full pl-10"
                        value={formData.monthlyDiscount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Availability Calendar</span>
                  </label>
                  <DatePicker
                    selectsRange={true}
                    startDate={availabilityDates[0]}
                    endDate={availabilityDates[1]}
                    onChange={(update) => {
                      setAvailabilityDates(update);
                    }}
                    className="input input-bordered w-full"
                    placeholderText="Select available dates"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
            >
              Submit Listing <FaCheckCircle className="ml-2" />
            </motion.button>
            <p className="mt-4 text-sm text-base-content/70">
              By listing your property, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
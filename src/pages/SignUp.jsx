import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Dummy signup - replace with actual signup logic
    console.log("Signup successful!", formData);
    navigate("/login");
  };

  return (
    <div className="min-h-screen  bg-base-200 flex items-center justify-center px-4 py-16 mt-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-base-content/60 mb-6">
            Join our AI platform today
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                <FaUser className="absolute top-1/2 right-3 -translate-y-1/2 text-base-content/40" />
              </div>
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="123-456-7890"
                className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.phone}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="label-text ml-2">I accept the terms and conditions</span>
              </label>
              {errors.acceptTerms && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.acceptTerms}</span>
                </label>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6">
              Sign Up
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-outline">
              <FaGoogle className="mr-2" /> Google
            </button>
            <button className="btn btn-outline">
              <FaFacebook className="mr-2" /> Facebook
            </button>
          </div>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 
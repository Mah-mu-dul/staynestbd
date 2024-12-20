import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import app from "../firebase/firebase.init";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added state for loader
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true); // Start loader

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Fetch user role from MongoDB
        return fetch(`https://staynestbd-bakend-git-main-wannabepros-projects.vercel.app/getuser?email=${user.email}`)
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false); // Stop loader
            navigate(`/dashboard`, { replace: true });
          });
      })
      .catch((error) => {
        setIsLoading(false); // Stop loader
        setErrors({ auth: "Invalid email or password" });
        signOut(auth);
      });
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true); // Start loader
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setIsLoading(false); // Stop loader
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsLoading(false); // Stop loader
        console.log(error);
        setErrors({ auth: "Google sign-in failed" });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-16">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-base-content/60 mb-6">
            Login to access your account
          </p>

          {errors.auth && (
            <div className="alert alert-error mb-4">
              <span>{errors.auth}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className={`input input-bordered ${
                  errors.email ? "input-error" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email}
                  </span>
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
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
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
                  <span className="label-text-alt text-error">
                    {errors.password}
                  </span>
                </label>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="label-text ml-2">Remember me</span>
              </label>
              <Link to="/forgot-password" className="link link-primary text-sm">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-6"
              disabled={isLoading}
            >
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="btn btn-outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FaGoogle className="mr-2" /> Google
            </button>
            <button className="btn btn-outline">
              <FaFacebook className="mr-2" /> Facebook
            </button>
          </div>

          <p className="text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

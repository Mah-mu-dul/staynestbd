import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebase/firebase.init";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset link sent to:", email);
        setError("Password reset link sent. Check your email.");
        navigate("/login");
      })
      .catch((error) => {
        setError("Failed to send password reset email. Try again later.");
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-16">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-2">
            Reset Password
          </h2>
          <p className="text-center text-base-content/60 mb-6">
            Enter your email to receive a password reset link
          </p>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className={`input input-bordered ${error ? "input-error" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6">
              Send Reset Link
            </button>
          </form>

          <p className="text-center mt-6">
            Remembered your password?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

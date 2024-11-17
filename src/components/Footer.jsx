import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
    alert("Thanks for subscribing!");
  };

  return (
    <footer className="footer p-6 md:p-10 bg-gradient-to-b from-base-200 to-base-300 text-base-content mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <span className="footer-title text-lg">Company</span>
            <a className="link link-hover hover:text-primary transition-all duration-300 flex items-center gap-2">
              <FaMapMarkerAlt /> Our Locations
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              About Us
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Careers
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Partner With Us
            </a>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <span className="footer-title text-lg">Support</span>
            <br />
            <br />
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Help Center
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Safety Information
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Cancellation Options
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300 flex items-center gap-2">
              <FaPhone /> Contact Support
            </a>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <span className="footer-title text-lg">Legal</span>
            <br />
            <br />
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Privacy Policy
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Terms of Service
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Cookie Settings
            </a>
            <a className="link link-hover hover:text-primary transition-all duration-300">
              Accessibility
            </a>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <span className="footer-title text-lg">Stay Connected</span>
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="form-control">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button className="btn btn-primary w-full sm:w-auto">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div>
              <span className="footer-title text-lg">Follow Us</span>
              <div className="flex flex-wrap gap-4 mt-4">
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <FaGithub />
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Additional Info */}
        <div className="text-center w-full flex  justify-center gap-5">
          <p>© {new Date().getFullYear()} StayNest. All rights reserved.</p>
          <div className="flex justify-center items-center gap-2">
            <FaEnvelope className="text-primary" />
            <span>support@staynest.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

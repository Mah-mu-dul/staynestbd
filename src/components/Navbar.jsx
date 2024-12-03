import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import navigationData from "../data/navigation.json";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigationItems = navigationData.navigationItems;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const filteredNavItems = navigationItems.filter(item => 
    isLoggedIn ? item.name !== "Login" && item.name !== "Sign Up"
    : item.name !== "Sign Out"
  );

  return (
    <div>
      <nav
        className="fixed top-0 left-0 right-0 z-50 navbar bg-white/90 shadow-md transition-all duration-300 ease-in-out"
        id="main-navbar"
      >
        <div className="flex-1">
          <a
            href="/"
            className="btn btn-ghost normal-case text-xl flex items-center hover:scale-105 transition-transform"
          >
            <FaHome className="mr-2 transition-transform" /> StayNest
          </a>
        </div>
        <div className="flex-none">
          {/* Desktop Navigation */}
          <ul className="menu menu-horizontal px-1 hidden md:flex">
            {filteredNavItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="hover:text-primary hover:underline transition-all duration-300 group relative"
                >
                  {item.name}
                  {item.name === "Become a Host" && (
                    <span className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full animate-pulse group-hover:animate-none"></span>
                  )}
                </a>
              </li>
            ))}
            {isLoggedIn && (
              <li>
                <button onClick={handleSignOut} className="hover:text-primary hover:underline transition-all duration-300">
                  Sign Out
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              className="btn btn-ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {!isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 right-0 bg-white/90 shadow-md z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="menu menu-vertical px-4 py-2">
          {filteredNavItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="hover:text-primary hover:underline transition-all duration-300 group relative py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
                {item.name === "Become a Host" && (
                  <span className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full animate-pulse group-hover:animate-none"></span>
                )}
              </a>
            </li>
          ))}
          {isLoggedIn && (
            <li>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="hover:text-primary hover:underline transition-all duration-300 py-3"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

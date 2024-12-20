import { getAuth, signOut } from "firebase/auth";
import React from "react";
import {
  FaBell,
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import app from "../../firebase/firebase.init";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Header({ toggleSidebar, loggedInUser }) {
  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <FaBars className="h-5 w-5" />
          </button>
          <Link
            to="/"
            className="ml-4 text-xl font-semibold hidden sm:block"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="ml-4 text-xl font-semibold hidden sm:block"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <h2></h2>
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FaBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn w-fit pr-5 bg-gray-100 btn-ghost btn-circle avatar flex items-center "
              >
                <div className="rounded-full bg-primary/10 p-2">
                  <FaUserCircle className="w-6 h-6" />
                </div>
                <h2 className="font-semibold ml-2">
                  {loggedInUser ? loggedInUser.displayName : "Guest"}
                </h2>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>
                    <FaUserCircle className="h-5 w-5" /> Profile
                  </a>
                </li>
                <li>
                  <a>
                    <FaCog className="h-5 w-5" /> Settings
                  </a>
                </li>
                <li>
                  <a>
                    <FaBell className="h-5 w-5" /> Notifications
                  </a>
                </li>
                <li>
                  <button onClick={handleSignOut}>
                    <FaSignOutAlt className="h-5 w-5" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

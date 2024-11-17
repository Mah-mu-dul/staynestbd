import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/home";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard.jsx";
import SearchResults from "./pages/search-results.jsx";
import Error from "./pages/Error.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import BecomeAHostPage from "./pages/BecomeAHostPage.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/become-host" element={<BecomeAHostPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
